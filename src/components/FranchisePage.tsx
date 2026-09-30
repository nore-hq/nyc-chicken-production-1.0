"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FranchisePageProps {
  isOpen: boolean;
  onClose: () => void;
}

const FRANCHISE_IMAGES = [
  {
    src: "/franchise/page1.png",
    alt: "NYC Franchise — Brand Overview & Opportunity",
  },
  {
    src: "/franchise/page2.png",
    alt: "NYC Franchise — Why Choose & Development Methods",
  },
];

export default function FranchisePage({ isOpen, onClose }: FranchisePageProps) {
  return (
    <>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-3 pt-16 backdrop-blur-md sm:p-8"
              >
                <motion.div
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.98, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-full min-h-0 w-full max-w-4xl flex-col"
                >
                  {/* Header row */}
                  <div className="mb-3 flex shrink-0 items-center justify-between px-1">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                      Franchise Opportunity
                    </span>
                    <span className="text-xs font-medium text-gray-400">
                      {FRANCHISE_IMAGES.length} pages
                    </span>
                  </div>

                  {/* Scrollable image container */}
                  <div
                    aria-label="Franchise pages"
                    className="min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-2xl border border-gray-800 bg-[#0b0c0e] p-2 shadow-2xl sm:rounded-3xl sm:p-4"
                  >
                    <div className="space-y-3 sm:space-y-5">
                      {FRANCHISE_IMAGES.map((img, idx) => (
                        <div
                          key={idx}
                          className="overflow-hidden rounded-xl border border-white/10 bg-white shadow-lg sm:rounded-2xl"
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={800}
                            height={1100}
                            sizes="(max-width: 768px) 100vw, 896px"
                            priority={idx === 0}
                            unoptimized
                            className="block h-auto w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={onClose}
                  aria-label="Close franchise"
                  className="absolute right-4 top-4 z-[70] rounded-full border border-gray-700 bg-gray-900/90 p-2.5 text-white shadow-lg transition-colors hover:border-[#fdb813] hover:bg-[#fdb813] hover:text-black sm:right-6 sm:top-6"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
