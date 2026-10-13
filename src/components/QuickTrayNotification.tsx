"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Check, Plus, ArrowRight, X, ShoppingBag } from "lucide-react";
import { MenuItem } from "@/data/menuData";

export interface QuickTrayItem {
  item: MenuItem;
  selectedSize?: { label: string; price: number };
  price: number;
  timestamp: number;
}

interface QuickTrayNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteOrder: () => void;
  addedItem: QuickTrayItem | null;
  cartCount: number;
  cartTotal: number;
}

const desktopVariants: Variants = {
  hidden: { x: "120%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 28,
      mass: 0.8,
    },
  },
  exit: {
    x: "120%",
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: "easeInOut",
    },
  },
};

const mobileVariants: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 420,
      damping: 30,
    },
  },
  exit: {
    y: "115%",
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

export default function QuickTrayNotification({
  isOpen,
  onClose,
  onCompleteOrder,
  addedItem,
  cartCount,
  cartTotal,
}: QuickTrayNotificationProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Auto-dismiss after 6.5s unless hovered on desktop
  useEffect(() => {
    if (!isOpen || isHovered) return;

    const timer = setTimeout(() => {
      onClose();
    }, 6500);

    return () => clearTimeout(timer);
  }, [isOpen, isHovered, addedItem?.timestamp, onClose]);

  if (!addedItem) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ──────────────── Desktop View: Small window from the right ──────────────── */}
          <motion.div
            key="desktop-tray-card"
            variants={desktopVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="hidden md:block fixed right-6 bottom-8 z-50 w-[380px] bg-[#0c0d10]/95 backdrop-blur-2xl border border-[#fdb813]/40 rounded-2xl p-5 shadow-[0_16px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(253,184,19,0.2)] font-sans"
          >
            {/* Header / Status row */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                  Added To Tray
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                title="Dismiss"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dish Info with micro-pop animation */}
            <motion.div
              key={addedItem.timestamp}
              initial={{ scale: 0.96, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3.5 my-3.5"
            >
              {addedItem.item.image ? (
                <img
                  src={addedItem.item.image}
                  alt={addedItem.item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#fdb813]/30 bg-black/60 flex-shrink-0 shadow-md"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 flex-shrink-0">
                  <ShoppingBag className="w-7 h-7 text-[#fdb813]/80" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4
                  className="text-white text-base font-bold leading-tight truncate"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {addedItem.item.name}
                </h4>
                {addedItem.selectedSize && (
                  <span className="text-[11px] text-gray-400 block mt-0.5">
                    Size: {addedItem.selectedSize.label}
                  </span>
                )}
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-[#fdb813] font-black text-lg tracking-wide">
                    ₹{addedItem.price}
                  </span>
                  {cartCount > 1 && (
                    <span className="text-[11px] text-gray-400 truncate">
                      • Total in tray: {cartCount} items (₹{cartTotal})
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Two CTAs: Strongly highlight "Add More Dishes" */}
            <div className="flex flex-col gap-2 mt-4 pt-1">
              {/* PRIMARY HIGHLIGHT: Add More Dishes */}
              <button
                onClick={onClose}
                className="group w-full py-3 px-4 rounded-xl bg-[#fdb813] text-black font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(253,184,19,0.35)] hover:shadow-[0_0_35px_rgba(253,184,19,0.6)] hover:bg-[#ffc334] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#fdb813]"
              >
                <Plus className="w-4 h-4 stroke-[3] group-hover:rotate-90 transition-transform" />
                <span>Add More Dishes</span>
              </button>

              {/* SECONDARY: Complete Order & Pay */}
              <button
                onClick={onCompleteOrder}
                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-gray-700 hover:border-[#fdb813]/60 text-gray-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Complete Order & Pay</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#fdb813]" />
              </button>
            </div>
          </motion.div>

          {/* ──────────────── Mobile View: Bottom section window / sheet ──────────────── */}
          <motion.div
            key="mobile-tray-card"
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 pb-[max(1rem,env(safe-area-inset-bottom))] font-sans"
          >
            <div className="bg-[#0c0d10]/95 backdrop-blur-2xl border border-[#fdb813]/40 rounded-2xl p-4 shadow-[0_-12px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(253,184,19,0.2)]">
              {/* Mobile Header + Dismiss */}
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold border border-emerald-500/30">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
                    Added To Tray
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white p-1 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Dish Info */}
              <motion.div
                key={addedItem.timestamp}
                initial={{ scale: 0.96, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                {addedItem.item.image ? (
                  <img
                    src={addedItem.item.image}
                    alt={addedItem.item.name}
                    className="w-12 h-12 rounded-lg object-cover border border-[#fdb813]/20 bg-black/60 flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 flex-shrink-0">
                    <ShoppingBag className="w-5 h-5 text-[#fdb813]" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4
                      className="text-white text-sm font-bold truncate leading-snug"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {addedItem.item.name}
                    </h4>
                    <span className="text-[#fdb813] font-black text-base whitespace-nowrap">
                      ₹{addedItem.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mt-0.5">
                    <span>{addedItem.selectedSize?.label || "Added dish"}</span>
                    <span>Tray: {cartCount} items</span>
                  </div>
                </div>
              </motion.div>

              {/* Two CTAs on Mobile */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-1">
                {/* Complete Order */}
                <button
                  onClick={onCompleteOrder}
                  className="py-3 px-2 rounded-xl bg-white/[0.08] active:bg-white/[0.15] border border-gray-700 text-gray-200 font-bold text-[11px] uppercase tracking-wider active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Complete Order</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#fdb813]" />
                </button>

                {/* Add More (Highlighted!) */}
                <button
                  onClick={onClose}
                  className="py-3 px-2 rounded-xl bg-[#fdb813] active:bg-[#ffc334] text-black font-black text-[11px] uppercase tracking-wider shadow-[0_0_20px_rgba(253,184,19,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#fdb813]"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Add More</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
