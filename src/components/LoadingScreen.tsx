"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate a smooth progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        // Accelerate toward the end
        const increment = prev < 60 ? 2 : prev < 85 ? 3 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    const handleLoad = () => {
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => setIsLoading(false), 500);
      }, 300);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 500);
    }, 3500);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Animated radial glow behind logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.15, scale: 1.2 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-[500px] h-[500px] rounded-full bg-[#fdb813] blur-[120px] pointer-events-none"
          />

          {/* Decorative top line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fdb813] to-transparent origin-center"
          />

          {/* Logo with pulse ring */}
          <div className="relative mb-10">
            {/* Pulse ring */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border border-[#fdb813]/40"
              style={{ margin: "-20px" }}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-28 h-28 sm:w-36 sm:h-36"
            >
              <Image
                src="/nyc_logo_latest.png"
                alt="New York Chicken Logo"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(253,184,19,0.3)]"
                priority
              />
            </motion.div>
          </div>

          {/* Brand Name */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl sm:text-2xl text-white mb-2 tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            New York Chicken
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-[10px] sm:text-xs text-gray-500 font-bold tracking-[0.3em] uppercase mb-10 font-sans"
          >
            Premium Dining Experience
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 sm:w-56 h-[3px] bg-gray-900 rounded-full overflow-hidden relative">
            <motion.div
              style={{ width: `${progress}%` }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#fdb813] to-[#f5a623] rounded-full shadow-[0_0_10px_rgba(253,184,19,0.5)]"
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress number */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-[10px] text-gray-600 font-bold tracking-[0.3em] uppercase font-sans tabular-nums"
          >
            {progress}%
          </motion.p>

          {/* Decorative bottom line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fdb813]/50 to-transparent origin-center"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
