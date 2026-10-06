"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";

interface MenuPreviewProps {
  onExpand: () => void;
  isExpanded: boolean;
}

// Hardcoded signature dishes for the "Taste The Menu" section
const SIGNATURE_DISHES = [
  {
    id: "sig-1",
    name: "Brooklyn Double Burger",
    description:
      "Double portion of crispy chicken breast topped with fresh lettuce, tomato, NYC signature sauce & cheese slice",
    price: 299,
    video: "/videos/burger-video.mp4",
  },
  {
    id: "sig-2",
    name: "Char Grilled Peri Peri Fries",
    description:
      "Peri Peri loaded fries topped generously with spicy char-grilled chicken pieces",
    price: 299,
    video: "/videos/chicken-video.mp4",
  },
  {
    id: "sig-3",
    name: "Fried Chicken Boneless",
    description:
      "Manhattan style signature boneless crispy fried chicken strips, perfectly seasoned",
    price: 189,
    video: "/videos/hero-video.mp4",
  },
  {
    id: "sig-4",
    name: "Fried Chicken Rice Bowl",
    description:
      "Rice cooked with pure ghee, mixed fresh vegetables, NYC spice mix & topped with grilled chicken steak",
    price: 249,
    video: "/videos/chicken-bowl.mp4",
  },
];

export default function MenuPreview({ onExpand, isExpanded }: MenuPreviewProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="py-20 md:py-24 bg-transparent relative overflow-hidden">
      {/* Ambient Yellow Glows */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#fdb813]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#fdb813]/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[#fdb813] text-xs font-bold tracking-[0.3em] uppercase mb-4 font-sans">
            Signature Selection
          </p>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl text-white capitalize tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Taste The Menu
          </h2>
        </motion.div>

        {/* Video Cards — Desktop (2-col on md, 4-col on xl) */}
        {hasMounted && !isMobile && (
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
            {SIGNATURE_DISHES.map((dish, idx) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-[#111111] rounded-3xl overflow-hidden border border-[#fdb813]/20 hover:border-[#fdb813] transition-all duration-500 shadow-[0_0_30px_rgba(253,184,19,0.1)] hover:shadow-[0_0_40px_rgba(253,184,19,0.3)] cursor-pointer"
              >
                {/* Video background */}
                <div className="relative h-64 w-full bg-black overflow-hidden">
                  <video
                    src={dish.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent opacity-90" />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                    <Play className="w-3 h-3 text-[#fdb813] fill-[#fdb813]" />
                    <span className="text-[10px] text-white uppercase font-bold tracking-widest font-sans">
                      Feature
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="relative p-5 -mt-10 z-20">
                  <div className="bg-[#111111]/90 backdrop-blur-md p-5 rounded-2xl border border-gray-800 shadow-xl group-hover:border-[#fdb813]/50 transition-colors duration-300">
                    <h3
                      className="text-lg text-white mb-2 leading-snug"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {dish.name}
                    </h3>
                    <p className="text-gray-400 text-xs font-light line-clamp-2 leading-relaxed font-sans">
                      {dish.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
                      <span className="text-[#fdb813] font-bold tracking-widest text-sm font-sans">
                        ₹{dish.price}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile — Simple text list */}
        {hasMounted && isMobile && (
          <div className="space-y-6 mb-12">
            {SIGNATURE_DISHES.map((dish, idx) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-center justify-between p-5 bg-black/40 backdrop-blur-sm rounded-2xl border border-[#fdb813]/20 hover:border-[#fdb813]/50 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(253,184,19,0.05)]"
              >
                <div className="flex-1 min-w-0 pr-4">
                  <h3
                    className="text-base text-white mb-1 truncate"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {dish.name}
                  </h3>
                  <p className="text-gray-500 text-xs font-light line-clamp-1 font-sans">
                    {dish.description}
                  </p>
                </div>
                <span className="text-[#fdb813] font-bold tracking-wide text-sm font-sans whitespace-nowrap">
                  ₹{dish.price}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.button
              onClick={onExpand}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="group flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-transparent border border-[#fdb813]/50 text-white rounded-full font-bold text-sm sm:text-base uppercase tracking-widest hover:border-[#fdb813] hover:bg-[#fdb813] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(253,184,19,0.15)] hover:shadow-[0_0_30px_rgba(253,184,19,0.3)] font-sans"
            >
              <span>Explore Full Menu</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
