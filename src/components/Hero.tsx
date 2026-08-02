"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  // Stagger children animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[550px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <video
        src="/videos/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-[#0b0c0e]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Decorative corner accents */}
      <div className="absolute top-20 left-6 w-16 h-16 border-l-2 border-t-2 border-[#fdb813]/20 pointer-events-none hidden md:block" />
      <div className="absolute top-20 right-6 w-16 h-16 border-r-2 border-t-2 border-[#fdb813]/20 pointer-events-none hidden md:block" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 text-center flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="inline-block px-5 py-2 rounded-full border border-[#fdb813]/30 bg-black/30 backdrop-blur-md mb-6 sm:mb-8">
          <span className="text-[#fdb813] text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase font-sans">
            Premium Dining Experience
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white capitalize tracking-tight leading-[1.05] mb-6 sm:mb-8 drop-shadow-2xl cursor-default"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          The Taste of <br />
          <motion.span
            animate={{
              textShadow: [
                "0 0 20px rgba(253,184,19,0.3)",
                "0 0 40px rgba(253,184,19,0.5)",
                "0 0 20px rgba(253,184,19,0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#fdb813] italic font-medium"
          >
            New York City
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-200/90 text-sm sm:text-lg md:text-xl font-light max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-12 drop-shadow-lg font-sans leading-relaxed"
        >
          Bold flavors, authentic recipes, and a world-class culinary experience right here in Kazhakuttam.
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            onClick={scrollToMenu}
            className="group flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#fdb813] text-black rounded-full font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(253,184,19,0.3)] hover:shadow-[0_0_60px_rgba(253,184,19,0.5)] transition-shadow duration-300 font-sans"
          >
            <span>Explore The Menu</span>
            <div className="bg-black/10 rounded-full p-1 group-hover:bg-black/20 transition-colors">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] sm:text-[9px] text-white/60 font-bold tracking-[0.3em] uppercase font-sans">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 sm:h-10 bg-gradient-to-b from-[#fdb813] to-transparent"
        />
      </motion.div>
    </section>
  );
}
