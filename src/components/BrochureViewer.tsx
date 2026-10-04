"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrochureViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const totalPages = 20;

  return (
    <section id="brochure" className="py-20 md:py-24 bg-black/40 backdrop-blur-sm relative overflow-hidden border-t border-[#fdb813]/10">
      {/* Subtle yellow ambient glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fdb813]/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#fdb813] text-xs font-bold tracking-[0.3em] uppercase mb-4 font-sans">
            Original Menu
          </p>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl text-white capitalize tracking-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            The Digital Brochure
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-sans">
            Experience our original printed menu in its full visual glory. Flip through the pages just as you would at our Kazhakuttam restaurant.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            onClick={() => setIsOpen(true)}
            className="px-7 sm:px-8 py-3.5 sm:py-4 bg-[#14161c] border border-gray-800 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.2em] hover:border-[#fdb813] hover:text-[#fdb813] rounded-full transition-all duration-300 shadow-xl font-sans"
          >
            View Original Menu
          </motion.button>
        </motion.div>
      </div>

      {/* Brochure Lightbox */}
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
                <div className="mb-3 flex shrink-0 items-center justify-between px-1">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                    Original Menu
                  </span>
                  <span className="text-xs font-medium text-gray-400">
                    {totalPages} pages
                  </span>
                </div>
                <div
                  aria-label="Brochure pages"
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-2xl border border-gray-800 bg-[#0b0c0e] p-2 shadow-2xl sm:rounded-3xl sm:p-4"
                >
                  <div className="space-y-3 sm:space-y-5">
                    {Array.from({ length: totalPages }, (_, index) => {
                      const page = index + 1;
                      return (
                        <div
                          key={page}
                          className="overflow-hidden rounded-xl border border-white/10 bg-white shadow-lg sm:rounded-2xl"
                        >
                          <Image
                            src={`/brochure/page_${page}.jpeg`}
                            alt={`NYC Menu brochure page ${page}`}
                            width={1241}
                            height={1754}
                            sizes="(max-width: 768px) 100vw, 896px"
                            priority={page === 1}
                            className="block h-auto w-full"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close brochure"
                  className="absolute right-4 top-4 z-[70] rounded-full border border-gray-700 bg-gray-900/90 p-2.5 text-white shadow-lg transition-colors hover:border-[#fdb813] hover:bg-[#fdb813] hover:text-black sm:right-6 sm:top-6"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
