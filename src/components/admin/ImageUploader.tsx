"use client";

import React, { useState, useRef } from "react";
import { ImagePlus, Loader2, X, RefreshCw, AlertCircle, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploaderProps {
  imageUrl?: string;
  onImageChange: (url: string) => void;
  className?: string;
}

export default function ImageUploader({
  imageUrl = "",
  onImageChange,
  className = "",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tempPreview, setTempPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "xdxtq8lm";
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "nyc_chicken_menu";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image type
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 10MB.");
      return;
    }

    // Set local instant preview while uploading
    const objectUrl = URL.createObjectURL(file);
    setTempPreview(objectUrl);
    setIsUploading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to upload image to Cloudinary.");
      }

      const uploadedUrl = data.secure_url || data.url;
      onImageChange(uploadedUrl);
      setTempPreview(null);
    } catch (err: any) {
      console.error("Cloudinary upload error:", err);
      setErrorMessage(err.message || "Upload failed. Please try again.");
      setTempPreview(null);
    } finally {
      setIsUploading(false);
      // Reset input value so re-selecting same file triggers change
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageChange("");
    setTempPreview(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerSelect = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const currentDisplayUrl = tempPreview || imageUrl;

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={triggerSelect}
        className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer group flex flex-col items-center justify-center text-center select-none ${
          errorMessage
            ? "border-red-500/60 bg-red-500/10"
            : currentDisplayUrl
            ? "border-white/10 hover:border-[#fdb813]/60 bg-black/40"
            : "border-dashed border-white/20 hover:border-[#fdb813] bg-black/50 hover:bg-black/80"
        }`}
      >
        {/* Uploading State */}
        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center gap-1.5 p-2"
            >
              <Loader2 className="w-6 h-6 text-[#fdb813] animate-spin" />
              <span className="text-[11px] font-medium text-white/90">Uploading...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Display Image Preview */}
        {currentDisplayUrl ? (
          <div className="relative w-full h-full group">
            <img
              src={currentDisplayUrl}
              alt="Item preview"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay controls on hover / touch */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
              <button
                type="button"
                onClick={triggerSelect}
                title="Replace image"
                className="p-1.5 bg-[#fdb813] text-black rounded-lg hover:bg-yellow-400 transition-transform active:scale-95 shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                title="Remove image"
                className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-transform active:scale-95 shadow-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Success indicator badge */}
            {!isUploading && !errorMessage && (
              <div className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-md text-emerald-400 p-1 rounded-full border border-emerald-500/30">
                <Check className="w-3 h-3" />
              </div>
            )}
          </div>
        ) : (
          /* Empty / Upload Prompt State */
          <div className="flex flex-col items-center justify-center p-3 gap-1.5 text-gray-400 group-hover:text-[#fdb813] transition-colors">
            <div className="p-2 rounded-xl bg-white/5 group-hover:bg-[#fdb813]/10 transition-colors">
              <ImagePlus className="w-6 h-6 text-gray-400 group-hover:text-[#fdb813] transition-colors" />
            </div>
            <span className="text-xs font-medium">Add Image</span>
            <span className="text-[10px] text-gray-500 group-hover:text-gray-400">
              Direct Upload
            </span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1 max-w-xs">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="line-clamp-2">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
