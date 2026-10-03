"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Phone, Mail, Globe, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface FranchisePageProps {
  isOpen: boolean;
  onClose: () => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" },
  }),
};

const WHY_ITEMS = [
  "International American-style chicken brand",
  "Established QSR business model",
  "Multiple franchise formats",
  "Standardized recipes and operating systems",
  "Focus on freshness, hygiene and product quality",
  "Marketing and operational support",
  "Opportunity to expand through multiple locations",
  "Menu covering fried chicken, grilled chicken, burgers, wraps and sides",
];

const JOURNEY_STEPS = [
  "Territory Evaluation",
  "Agreement",
  "Site Development",
  "Equipment Setup",
  "Staff Training",
  "Soft Launch",
  "Grand Opening",
  "Ongoing Support",
];

const FORMATS = [
  { label: "Full Dine-In", icon: "🍽️" },
  { label: "Food Court", icon: "🏬" },
  { label: "Quick Service", icon: "⚡" },
  { label: "Virtual / Cloud Kitchen", icon: "☁️" },
];

export default function FranchisePage({ isOpen, onClose }: FranchisePageProps) {
  return (
    <>
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
                  {/* Header row */}
                  <div className="mb-3 flex shrink-0 items-center justify-between px-1">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                      Franchise Opportunity
                    </span>
                    <span className="text-xs font-medium text-gray-400">
                      New York Chicken
                    </span>
                  </div>

                  {/* Scrollable content container */}
                  <div
                    aria-label="Franchise information"
                    className="min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-2xl border border-gray-800 bg-[#0b0c0e] shadow-2xl sm:rounded-3xl"
                  >
                    {/* ── Hero Banner (page1.png) ── */}
                    <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0b0c0e]" />
                      <Image
                        src="/franchise/page1.png"
                        alt="New York Chicken – Brand Overview & Franchise Opportunity"
                        width={800}
                        height={1100}
                        sizes="(max-width: 768px) 100vw, 896px"
                        priority
                        unoptimized
                        className="block h-auto w-full"
                      />
                    </div>

                    {/* ── Main Content ── */}
                    <div className="px-5 pb-10 pt-2 sm:px-10">

                      {/* International Expansion */}
                      <motion.section
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        className="mb-10 mt-4"
                      >
                        <p className="text-sm leading-7 text-gray-300 sm:text-base">
                          In 2018, New York Chicken opened its first international outlet in Bahrain, with{" "}
                          <span className="font-semibold text-[#fdb813]">
                            Pizza Development Company (PDC), Bahrain
                          </span>
                          , holding the master franchise rights. The brand has since focused on international
                          expansion across Asia and the Middle East.
                        </p>
                      </motion.section>

                      {/* NYC in Kerala */}
                      <motion.section
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={1}
                        className="mb-10"
                      >
                        <h2 className="mb-4 text-lg font-bold uppercase tracking-widest text-[#fdb813] sm:text-xl">
                          New York Chicken in Kerala
                        </h2>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                          <p className="mb-4 text-sm leading-7 text-gray-300 sm:text-base">
                            <span className="font-semibold text-white">A FLOT Private Limited (FLOT)</span> operates
                            New York Chicken in Kerala under the master franchise rights granted through PDC. Based in
                            Thiruvananthapuram, FLOT is responsible for developing and expanding the brand across Kerala
                            through company-operated outlets and sub-franchise partnerships.
                          </p>
                          <p className="text-sm leading-7 text-gray-300 sm:text-base">
                            The first New York Chicken outlet in Kerala was launched in Thiruvananthapuram, establishing
                            the brand&apos;s presence in the state. The Kerala expansion plan focuses on building a strong
                            regional network, with{" "}
                            <span className="font-semibold text-[#fdb813]">14 outlets planned across Kerala</span>{" "}
                            before further expansion into other Indian markets.
                          </p>
                        </div>
                      </motion.section>

                      {/* Divider image (page2.png) */}
                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={2}
                        className="mb-10 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-lg"
                      >
                        <Image
                          src="/franchise/page2.png"
                          alt="New York Chicken – Why Choose & Development Methods"
                          width={800}
                          height={1100}
                          sizes="(max-width: 768px) 100vw, 896px"
                          unoptimized
                          className="block h-auto w-full"
                        />
                      </motion.div>

                      {/* Franchise Opportunity */}
                      <motion.section
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={3}
                        className="mb-10"
                      >
                        <h2 className="mb-4 text-lg font-bold uppercase tracking-widest text-[#fdb813] sm:text-xl">
                          Our Franchise Opportunity
                        </h2>
                        <p className="mb-6 text-sm leading-7 text-gray-300 sm:text-base">
                          New York Chicken offers multiple franchise formats designed for different investment levels
                          and locations. Our franchise model is supported by standardized operations, training, marketing
                          support, quality systems and an established brand concept.
                        </p>

                        {/* Formats grid */}
                        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                          {FORMATS.map((f) => (
                            <div
                              key={f.label}
                              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-5 text-center transition-colors hover:border-[#fdb813]/40 hover:bg-[#fdb813]/5"
                            >
                              <span className="text-2xl">{f.icon}</span>
                              <span className="text-xs font-semibold text-gray-200">{f.label}</span>
                            </div>
                          ))}
                        </div>

                        {/* Journey steps */}
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                          Franchise Journey
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          {JOURNEY_STEPS.map((step, i) => (
                            <div key={step} className="flex items-center gap-2">
                              <span className="rounded-full bg-[#fdb813]/10 px-3 py-1 text-xs font-medium text-[#fdb813] ring-1 ring-[#fdb813]/30">
                                {step}
                              </span>
                              {i < JOURNEY_STEPS.length - 1 && (
                                <ChevronRight className="h-3 w-3 shrink-0 text-gray-600" />
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.section>

                      {/* Why Partner */}
                      <motion.section
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={4}
                        className="mb-10"
                      >
                        <h2 className="mb-5 text-lg font-bold uppercase tracking-widest text-[#fdb813] sm:text-xl">
                          Why Partner with New York Chicken?
                        </h2>
                        <ul className="space-y-3">
                          {WHY_ITEMS.map((item, i) => (
                            <motion.li
                              key={item}
                              variants={fadeUp}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              custom={i}
                              className="flex items-start gap-3"
                            >
                              <span className="mt-0.5 shrink-0 text-[#fdb813]">✦</span>
                              <span className="text-sm leading-6 text-gray-300">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.section>

                      {/* CTA Banner */}
                      <motion.section
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={5}
                        className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-[#fdb813] to-[#e8a200] p-6 sm:p-8"
                      >
                        <h2 className="mb-2 text-xl font-extrabold tracking-tight text-black sm:text-2xl">
                          Build the Next Chapter of New York Chicken in Kerala
                        </h2>
                        <p className="text-sm font-medium text-black/70">
                          Join New York Chicken as a franchise partner and be part of the brand&apos;s growing Kerala network.
                        </p>
                      </motion.section>

                      {/* Contact */}
                      <motion.section
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={6}
                      >
                        <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                          Franchise Enquiries
                        </h3>
                        <div className="flex flex-col gap-3">
                          <a
                            href="tel:+919645739207"
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200 transition-colors hover:border-[#fdb813]/40 hover:text-[#fdb813]"
                          >
                            <Phone className="h-4 w-4 shrink-0 text-[#fdb813]" />
                            96457 39207
                          </a>
                          <a
                            href="mailto:newyorkchickenkerala@gmail.com"
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200 transition-colors hover:border-[#fdb813]/40 hover:text-[#fdb813]"
                          >
                            <Mail className="h-4 w-4 shrink-0 text-[#fdb813]" />
                            newyorkchickenkerala@gmail.com
                          </a>
                          <a
                            href="https://thenychicken.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200 transition-colors hover:border-[#fdb813]/40 hover:text-[#fdb813]"
                          >
                            <Globe className="h-4 w-4 shrink-0 text-[#fdb813]" />
                            thenychicken.com
                          </a>
                        </div>
                      </motion.section>
                    </div>
                  </div>
                </motion.div>

                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={onClose}
                  aria-label="Close franchise"
                  className="absolute right-4 top-4 z-[70] rounded-full border border-gray-700 bg-gray-900/90 p-2.5 text-white shadow-lg transition-colors hover:border-[#fdb813] hover:bg-[#fdb813] hover:text-black sm:right-6 sm:top-6"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
