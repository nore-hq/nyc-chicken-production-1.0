"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles, ArrowRight, Tag, Flame, ShieldCheck } from "lucide-react";
import { Billboard } from "@/data/menuData";

interface BillboardModalProps {
  // Optional override for admin live preview
  previewBillboard?: Billboard | null;
  onClosePreview?: () => void;
  onClaimOffer?: () => void;
  isHeroOverlay?: boolean;
}

export default function BillboardModal({
  previewBillboard,
  onClosePreview,
  onClaimOffer,
  isHeroOverlay,
}: BillboardModalProps) {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // If in admin preview mode
  const isPreview = !!previewBillboard;
  // Hero overlay mode vs standalone fixed modal (preview or external)
  const isOverlay = isPreview ? false : (isHeroOverlay ?? true);

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
            // Entrance delay after website has loaded and settled (~1.2s)
            const timer = setTimeout(() => {
              setIsOpen(true);
            }, 1200);
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
    }, 6000);

    return () => clearInterval(interval);
  }, [isOpen, billboards.length, hasInteracted]);

  // Support closing with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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
    <>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 md:p-8 pointer-events-none overflow-y-auto">
          {/* Backdrop Scrim - Soft cinematic dim over hero so site is visible around and behind */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2.5px] pointer-events-auto cursor-pointer"
          />

          {/* 90% Hero Banner / Ad Page Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative pointer-events-auto w-[93%] sm:w-[90%] max-w-6xl h-[86%] sm:h-[88%] max-h-[640px] md:max-h-[580px] bg-gradient-to-br from-[#15161b] via-[#0f1013] to-[#0a0a0d] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(253,184,19,0.12)] overflow-hidden flex flex-col md:flex-row z-[80] text-white my-auto"
          >
            {/* Image Banner Section */}
            <div
              className="relative w-full md:w-[46%] lg:w-[48%] h-[40%] sm:h-[45%] md:h-full bg-black/80 overflow-hidden group cursor-pointer flex-shrink-0"
              onClick={() => handleActionClick(current)}
            >
              <img
                src={current.image_url}
                alt={current.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Ambient Gradients for smooth blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1013] via-transparent to-black/30 md:bg-gradient-to-r md:from-transparent md:to-[#0f1013]/60 pointer-events-none" />

              {/* Floating Featured Offer Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fdb813] text-black font-black text-[11px] sm:text-xs tracking-wider uppercase shadow-xl">
                <Sparkles className="w-3.5 h-3.5 fill-black" />
                <span>Special Offer</span>
              </div>

              {/* Multi-banner Prev/Next overlays on image */}
              {billboards.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous billboard"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-transform active:scale-90 shadow-lg z-20 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 pointer-events-none" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next billboard"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-transform active:scale-90 shadow-lg z-20 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 pointer-events-none" />
                  </button>
                </>
              )}
            </div>

            {/* Content & Action Area */}
            <div className="w-full md:w-[54%] lg:w-[52%] flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">
              <div className="space-y-3 sm:space-y-4">
                {/* Header Sub-bar */}
                <div className="flex items-center justify-between gap-2 pr-12">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#fdb813] animate-ping" />
                    <span className="text-[#fdb813] text-[10px] sm:text-xs font-black tracking-[0.25em] uppercase">
                      NYC Billboard Showcase
                    </span>
                  </div>
                  {billboards.length > 1 && (
                    <span className="text-[11px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                      {currentIndex + 1} / {billboards.length}
                    </span>
                  )}
                </div>

                {/* Billboard Main Title */}
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-md pr-8">
                  {current.title}
                </h2>

                {/* Subtitle / Offer Details */}
                {current.subtitle && (
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm md:text-base text-gray-300 font-light leading-relaxed">
                    <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-[#fdb813] flex-shrink-0 mt-0.5" />
                    <p className="line-clamp-3 sm:line-clamp-4">{current.subtitle}</p>
                  </div>
                )}

                {/* Value Tags / Micro-features */}
                <div className="hidden sm:flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300">
                    <Flame className="w-3 h-3 text-[#fdb813]" /> Hot & Fresh
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300">
                    <Sparkles className="w-3 h-3 text-[#fdb813]" /> Limited Time
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300">
                    <ShieldCheck className="w-3 h-3 text-[#fdb813]" /> Authentic Recipe
                  </span>
                </div>
              </div>

              {/* Bottom Actions Area */}
              <div className="pt-3 sm:pt-6 space-y-3">
                {/* Carousel Dots */}
                {billboards.length > 1 && (
                  <div className="flex items-center gap-1.5 pb-1">
                    {billboards.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setHasInteracted(true);
                          setCurrentIndex(idx);
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentIndex
                            ? "w-8 bg-[#fdb813]"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => handleActionClick(current)}
                    className="flex-1 py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-[#fdb813] via-[#ffc738] to-[#e5a00d] text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(253,184,19,0.35)] hover:shadow-[0_0_40px_rgba(253,184,19,0.55)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>{current.cta_text || "Claim Offer"}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="py-3 sm:py-3.5 px-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold transition-all text-center cursor-pointer"
                  >
                    Continue to Site
                  </button>
                </div>
              </div>
            </div>

            {/* Top Close Button (RENDERED LAST IN DOM TO GUARANTEE HIGHEST STACKING AND CLICKABILITY) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleClose();
              }}
              aria-label="Close billboard banner"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[100] w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/85 hover:bg-[#fdb813] text-gray-200 hover:text-black flex items-center justify-center backdrop-blur-md border border-white/25 transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xl group cursor-pointer"
            >
              <X className="w-5 h-5 pointer-events-none transition-transform group-hover:rotate-90 duration-200" />
            </button>
          </motion.div>
        </div>
      )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
