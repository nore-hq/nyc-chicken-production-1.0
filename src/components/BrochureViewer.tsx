"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrochureViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 14;

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <section id="brochure" className="py-20 md:py-24 bg-black/40 backdrop-blur-sm relative overflow-hidden">
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 bg-gray-900/80 rounded-full text-gray-400 hover:text-white hover:bg-[#fdb813] hover:text-black transition-all z-[70]"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl h-[80vh] sm:h-[85vh] flex flex-col items-center justify-center"
            >
              {/* Image Container */}
              <div className="relative w-full h-full shadow-2xl bg-[#0b0c0e] border border-gray-900 rounded-2xl sm:rounded-lg flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={`/brochure/page_${currentPage}.png`}
                      alt={`NYC Menu Page ${currentPage}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-1 sm:-mx-14 pointer-events-none">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="pointer-events-auto p-3 sm:p-4 bg-gray-900/80 hover:bg-[#fdb813] text-white hover:text-black disabled:opacity-30 transition-all rounded-full border border-gray-700 shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="pointer-events-auto p-3 sm:p-4 bg-gray-900/80 hover:bg-[#fdb813] text-white hover:text-black disabled:opacity-30 transition-all rounded-full border border-gray-700 shadow-lg"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              {/* Page indicator */}
              <div className="mt-4 sm:mt-6 text-xs font-bold tracking-[0.2em] text-gray-500 font-sans">
                PAGE <span className="text-[#fdb813]">{currentPage}</span> OF{" "}
                {totalPages}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
