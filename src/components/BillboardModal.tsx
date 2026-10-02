"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles, ArrowRight, Tag } from "lucide-react";
import { Billboard } from "@/data/menuData";

interface BillboardModalProps {
  // Optional override for admin live preview
  previewBillboard?: Billboard | null;
  onClosePreview?: () => void;
  onClaimOffer?: () => void;
}

export default function BillboardModal({
  previewBillboard,
  onClosePreview,
  onClaimOffer,
}: BillboardModalProps) {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // If in admin preview mode
  const isPreview = !!previewBillboard;

  useEffect(() => {
    if (isPreview && previewBillboard) {
      setBillboards([previewBillboard]);
      setCurrentIndex(0);
      setIsOpen(true);
      return;
    }

    // Normal visitor mode
    const fetchLiveBillboards = async () => {
      // Check if dismissed in this session
      const dismissed = typeof window !== "undefined" && sessionStorage.getItem("nyc_billboard_dismissed");
      if (dismissed) return;

      try {
        const res = await fetch(`/api/billboards?t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.billboards && data.billboards.length > 0) {
            setBillboards(data.billboards);
            // Sweet entrance delay so user sees initial page load nicely
            const timer = setTimeout(() => {
              setIsOpen(true);
            }, 800);
            return () => clearTimeout(timer);
          }
        }
      } catch (err) {
        console.error("Failed to load billboards popup:", err);
      }
    };

    fetchLiveBillboards();
  }, [isPreview, previewBillboard]);

  // Auto-advance if multiple billboards and user hasn't manually interacted
  useEffect(() => {
    if (!isOpen || billboards.length <= 1 || hasInteracted) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % billboards.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isOpen, billboards.length, hasInteracted]);

  const handleClose = () => {
    setIsOpen(false);
    if (isPreview && onClosePreview) {
      onClosePreview();
    } else {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("nyc_billboard_dismissed", "true");
      }
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setHasInteracted(true);
    setCurrentIndex((prev) => (prev + 1) % billboards.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setHasInteracted(true);
    setCurrentIndex((prev) => (prev - 1 + billboards.length) % billboards.length);
  };

  const handleActionClick = (current: Billboard) => {
    handleClose();
    if (onClaimOffer) {
      onClaimOffer();
    } else if (current.link_url) {
      if (current.link_url.startsWith("#")) {
        const targetElement = document.querySelector(current.link_url);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.href = current.link_url;
      }
    } else {
      // Default: scroll to menu
      const menuEl = document.getElementById("menu");
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (!isOpen || billboards.length === 0) return null;

  const current = billboards[currentIndex] || billboards[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#111215] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/80 z-10 my-auto text-white flex flex-col"
          >
            {/* Top Close Button (Sticky & always easy to tap) */}
            <button
              onClick={handleClose}
              aria-label="Close offer popup"
              className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/75 hover:bg-black text-gray-300 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-lg group"
            >
              <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200" />
            </button>

            {/* Offer Banner Image with Navigation */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-black/60 overflow-hidden group cursor-pointer"
                 onClick={() => handleActionClick(current)}>
              <img
                src={current.image_url}
                alt={current.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Scrim for readable badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-transparent to-black/30 pointer-events-none" />

              {/* Deal Tag */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdb813] text-black font-extrabold text-xs tracking-wider uppercase shadow-lg">
                <Sparkles className="w-3.5 h-3.5 fill-black" />
                <span>Special Offer</span>
              </div>

              {/* Left / Right Carousel Controls if multiple */}
              {billboards.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous offer"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-transform active:scale-90"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next offer"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-transform active:scale-90"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Content & Actions */}
            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {current.title}
                </h3>
                {current.subtitle && (
                  <div className="mt-2 flex items-start gap-2 text-sm text-gray-300">
                    <Tag className="w-4 h-4 text-[#fdb813] flex-shrink-0 mt-0.5" />
                    <p className="line-clamp-2">{current.subtitle}</p>
                  </div>
                )}
              </div>

              {/* Carousel Indicators */}
              {billboards.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  {billboards.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setHasInteracted(true);
                        setCurrentIndex(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? "w-6 bg-[#fdb813]"
                          : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => handleActionClick(current)}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#fdb813] to-[#e5a00d] text-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#fdb813]/25 transition-all active:scale-[0.98]"
                >
                  <span>{current.cta_text || "Claim Offer"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  Continue to Site
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
