"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video - highly optimized */}
      <video
        src="/videos/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        disablePictureInPicture
        disableRemotePlayback
      />
      
      {/* Lighter Gradient Overlays so video is visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0b0c0e]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center mt-16">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block px-5 py-2 rounded-full border border-[#fdb813]/30 bg-black/30 backdrop-blur-md mb-8"
        >
          <span className="text-[#fdb813] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase font-sans">
            Premium Dining Experience
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          whileHover={{ 
            y: [-5, 5, -5], 
            transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
          className="text-5xl sm:text-7xl md:text-8xl font-black text-white capitalize tracking-tight leading-[1.1] mb-8 drop-shadow-2xl cursor-default"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          The Taste of <br />
          <span className="text-[#fdb813] italic font-medium">New York City</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-gray-200 text-base sm:text-lg md:text-2xl font-light max-w-2xl mx-auto mb-12 drop-shadow-lg font-sans"
        >
          Bold flavors, authentic recipes, and a world-class culinary experience right here in Kazhakuttam.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToMenu}
          className="group flex items-center gap-3 px-8 py-4 bg-[#fdb813] text-black rounded-full font-bold text-sm sm:text-base uppercase tracking-widest transition-all duration-300 shadow-[0_0_40px_rgba(253,184,19,0.3)] hover:shadow-[0_0_60px_rgba(253,184,19,0.5)] font-sans"
        >
          <span>Explore The Menu</span>
          <div className="bg-black/10 rounded-full p-1 group-hover:bg-black/20 transition-colors">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </motion.button>
      </div>

      {/* Floating scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce"
      >
        <span className="text-[9px] text-white/70 font-bold tracking-[0.3em] uppercase font-sans">Scroll to Discover</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#fdb813] to-transparent" />
      </motion.div>
    </section>
  );
}
