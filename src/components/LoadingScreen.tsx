"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for window to load or timeout after a few seconds
    const handleLoad = () => {
      // Add a slight delay to ensure smooth transition
      setTimeout(() => setIsLoading(false), 800); 
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Fallback timeout in case 'load' takes too long (e.g. slow network for videos)
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-32 h-32 md:w-40 md:h-40 mb-8"
          >
            <Image
              src="/nyc_logo_latest.png"
              alt="New York Chicken Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Progress Bar Container */}
          <div className="w-48 h-1 bg-gray-900 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{
                duration: 2.5,
                ease: "easeOut",
              }}
              className="absolute inset-y-0 left-0 right-0 bg-[#fdb813] origin-left"
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-[#fdb813] text-xs font-bold tracking-[0.3em] uppercase font-sans"
          >
            Preparing Experience...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
