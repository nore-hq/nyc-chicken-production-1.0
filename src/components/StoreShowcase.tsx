"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function StoreShowcase() {
  const images = [
    {
      src: "/store_exterior.jpg",
      title: "Store Exterior & Branding",
      subtitle: "NYC Tower, Kazhakuttam",
    },
    {
      src: "/store_interior.jpg",
      title: "Indoor Dining Lounge",
      subtitle: "Modern Ambiance",
    },
    {
      src: "/outdoor_dining.jpg",
      title: "Outdoor Garden Dining",
      subtitle: "Alfresco Experience",
    },
  ];

  return (
    <section id="ambiance" className="relative py-20 md:py-24 bg-transparent border-t border-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-16"
        >
          <p className="text-[#fdb813] text-xs font-bold tracking-[0.3em] uppercase mb-4 font-sans">
            The Atmosphere
          </p>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl text-white capitalize tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Our Ambiance
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed max-w-lg mx-auto font-sans">
            A refined space designed to elevate your dining experience.
          </p>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {images.map((img, idx) => (
            <motion.div
              key={img.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col space-y-4"
            >
              <div className="relative h-[280px] sm:h-[350px] md:h-[400px] w-full overflow-hidden rounded-3xl border border-gray-800 group-hover:border-[#fdb813]/50 transition-colors duration-500 shadow-xl">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[1200ms]"
                />
                {/* Subtle gradient overlay for polish */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="text-center pt-2">
                <h3
                  className="text-sm font-bold uppercase tracking-widest text-white"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  {img.title}
                </h3>
                <p className="text-xs text-[#fdb813] font-bold mt-1 uppercase tracking-wider font-sans">
                  {img.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Presence */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-24 text-center max-w-2xl mx-auto bg-black/40 backdrop-blur-sm border border-gray-900 p-8 sm:p-12 rounded-[2rem] sm:rounded-[2.5rem]"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#fdb813] mb-4 font-sans">
            International Presence
          </p>
          <h3
            className="text-xl sm:text-2xl text-white tracking-tight mb-4"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            A Global Standard
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed font-sans">
            Expanding across Saudi Arabia, UAE, Qatar, Oman, Kuwait, Egypt, India, Malaysia, Indonesia, Kazakhstan, and the Philippines.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
