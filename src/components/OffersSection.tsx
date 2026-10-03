"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Sparkles, ArrowRight, Flame, Tag, ChevronRight } from "lucide-react";
import { Billboard } from "@/data/menuData";

interface OffersSectionProps {
  onClaimOffer?: () => void;
}

// Bento layout patterns — cycles through for visual variety
const BENTO_SIZES = [
  "md:col-span-2 md:row-span-2", // big featured card
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-2 md:row-span-1",
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function OfferCard({
  billboard,
  index,
  isFeatured,
  onClaim,
}: {
  billboard: Billboard;
  index: number;
  isFeatured: boolean;
  onClaim: (b: Billboard) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClaim(billboard)}
      className={`
        relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer group
        border border-white/10 bg-[#0f0f12]
        shadow-[0_4px_30px_rgba(0,0,0,0.5)]
        hover:border-[#fdb813]/40 hover:shadow-[0_8px_40px_rgba(253,184,19,0.15)]
        transition-all duration-500
        ${isFeatured ? "min-h-[340px] sm:min-h-[380px]" : "min-h-[200px] sm:min-h-[220px]"}
      `}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={billboard.image_url}
          alt={billboard.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            hovered ? "scale-110" : "scale-100"
          }`}
        />
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isFeatured
              ? "bg-gradient-to-t from-black/90 via-black/50 to-black/20"
              : "bg-gradient-to-t from-black/85 via-black/40 to-transparent"
          }`}
        />
        {/* Gold glow on hover */}
        <div
          className={`absolute inset-0 bg-[#fdb813]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
      </div>

      {/* Special Offer Badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fdb813] text-black font-black text-[10px] tracking-wider uppercase shadow-lg">
        <Sparkles className="w-3 h-3 fill-black" />
        <span>Special Offer</span>
      </div>

      {/* Animated ping dot */}
      <div className="absolute top-3.5 right-3.5 z-10">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fdb813] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#fdb813]" />
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
        {isFeatured && (
          <div className="flex items-center gap-1.5 mb-2">
            <Flame className="w-3.5 h-3.5 text-[#fdb813]" />
            <span className="text-[#fdb813] text-[10px] font-black uppercase tracking-[0.2em]">
              Featured Deal
            </span>
          </div>
        )}

        <h3
          className={`font-black text-white leading-tight tracking-tight drop-shadow-md ${
            isFeatured ? "text-xl sm:text-2xl md:text-3xl" : "text-base sm:text-lg"
          }`}
        >
          {billboard.title}
        </h3>

        {billboard.subtitle && (
          <div className="flex items-start gap-1.5 mt-1.5">
            <Tag className="w-3.5 h-3.5 text-[#fdb813] flex-shrink-0 mt-0.5" />
            <p
              className={`text-gray-300 leading-snug line-clamp-2 ${
                isFeatured ? "text-sm" : "text-xs"
              }`}
            >
              {billboard.subtitle}
            </p>
          </div>
        )}

        {/* CTA row */}
        <div
          className={`mt-3 flex items-center gap-2 transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1"
          }`}
        >
          <span
            className={`flex items-center gap-1.5 font-black uppercase tracking-wider text-black bg-[#fdb813] rounded-xl shadow-md
              ${isFeatured ? "px-4 py-2 text-xs sm:text-sm" : "px-3 py-1.5 text-[11px]"}
            `}
          >
            {billboard.cta_text || "Claim Offer"}
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function OffersSection({ onClaimOffer }: OffersSectionProps) {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`/api/billboards?t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          setBillboards(data.billboards || []);
        } else {
          // API not available (e.g. next dev without pages:dev) — show empty state
          setBillboards([]);
        }
      } catch {
        // Network error or route doesn't exist in this mode
        setBillboards([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const handleClaim = (billboard: Billboard) => {
    if (onClaimOffer) {
      onClaimOffer();
    } else if (billboard.link_url) {
      if (billboard.link_url.startsWith("#")) {
        document.querySelector(billboard.link_url)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = billboard.link_url;
      }
    } else {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <section
      id="offers"
      className="relative z-10 w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
      >
        <div>
          {/* Eyebrow label */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-[#fdb813]" />
            <span className="text-[#fdb813] text-xs font-black uppercase tracking-[0.3em]">
              Limited Time
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
            Today&apos;s{" "}
            <span className="text-[#fdb813]">Offers</span>
          </h2>
          <p className="mt-2 text-gray-400 text-sm sm:text-base max-w-md">
            Exclusive deals freshly crafted — available for a limited time only.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-gray-300 hover:border-[#fdb813]/50 hover:text-[#fdb813] hover:bg-[#fdb813]/5 transition-all duration-300 self-start sm:self-auto"
        >
          View Full Menu
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Loading skeleton */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl sm:rounded-3xl bg-white/5 animate-pulse ${
                  i === 0 ? "min-h-[340px]" : "min-h-[200px]"
                }`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bento Grid */}
      {!loading && billboards.length > 0 && (
        <div
          className={`
            grid gap-3 sm:gap-4
            grid-cols-1
            sm:grid-cols-2
            ${billboards.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}
            auto-rows-auto
          `}
        >
          {billboards.map((billboard, index) => {
            const bentoClass = BENTO_SIZES[index % BENTO_SIZES.length];
            const isFeatured = index === 0;
            return (
              <div
                key={billboard.id}
                className={`${isFeatured && billboards.length >= 3 ? bentoClass : ""}`}
              >
                <OfferCard
                  billboard={billboard}
                  index={index}
                  isFeatured={isFeatured}
                  onClaim={handleClaim}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Empty state — no active offers */}
      {!loading && billboards.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0f0f12] p-10 sm:p-14 text-center"
        >
          {/* Background pulse */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full bg-[#fdb813]/5 blur-3xl animate-pulse" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#fdb813]/10 border border-[#fdb813]/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#fdb813]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-1">Big Deals Coming Soon</h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">
                Our next exclusive offer is being prepared. Check back soon or explore our full menu below.
              </p>
            </div>
            <button
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fdb813] text-black font-black text-sm uppercase tracking-wider hover:bg-[#ffc738] transition-colors shadow-lg"
            >
              Explore Menu
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Bottom scroll hint (only if there are offers) */}
      {!loading && billboards.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={() =>
              document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-[#fdb813] transition-colors duration-300 group"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">
              Explore Menu
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <ChevronRight className="w-5 h-5 rotate-90 group-hover:text-[#fdb813]" />
            </motion.div>
          </button>
        </motion.div>
      )}
    </section>
  );
}
