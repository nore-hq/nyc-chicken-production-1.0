"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function BrochureViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 14;

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  return (
    <section id="brochure" className="py-24 bg-black/40 backdrop-blur-sm relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[#fdb813] text-sm font-bold tracking-[0.2em] uppercase mb-4">Original Menu</p>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
          The Digital Brochure
        </h2>
        
        <p className="text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-10">
          Experience our original printed menu in its full visual glory. Flip through the pages just as you would at our Kazhakuttam restaurant.
        </p>

        <button
          onClick={() => setIsOpen(true)}
          className="px-8 py-4 bg-[#14161c] border border-gray-800 text-white font-bold text-sm uppercase tracking-[0.2em] hover:border-[#fdb813] hover:text-[#fdb813] rounded-full transition-all duration-300 shadow-xl"
        >
          View Original Menu
        </button>
      </div>

      {/* Brochure Lightbox */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors z-[70]"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-4xl h-[85vh] flex flex-col items-center justify-center">
            
            {/* Image Container */}
            <div className="relative w-full h-full shadow-2xl bg-[#0b0c0e] border border-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src={`/brochure/page_${currentPage}.png`}
                alt={`NYC Menu Page ${currentPage}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 sm:-mx-16 pointer-events-none">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="pointer-events-auto p-4 bg-gray-900/80 hover:bg-[#fdb813] text-white hover:text-black disabled:opacity-30 transition-all rounded-full border border-gray-700 shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="pointer-events-auto p-4 bg-gray-900/80 hover:bg-[#fdb813] text-white hover:text-black disabled:opacity-30 transition-all rounded-full border border-gray-700 shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.2em] text-gray-500">
              PAGE <span className="text-[#fdb813]">{currentPage}</span> OF {totalPages}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
