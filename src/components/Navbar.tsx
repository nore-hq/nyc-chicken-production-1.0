"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const navLinks = [
  { href: "#menu", label: "Menu" },
  { href: "#brochure", label: "Brochure" },
  { href: "#ambiance", label: "Ambiance" },
  { href: "#location", label: "Location" },
];

export default function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/90 backdrop-blur-md py-3 border-b border-gray-900" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.08, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative w-16 h-16 sm:w-20 sm:h-20 drop-shadow-2xl"
              >
                <Image
                  src="/nyc_logo_latest.png"
                  alt="New York Chicken Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-base font-bold tracking-[0.2em] uppercase text-white/90 hover:text-white"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                <motion.span
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  className="inline-block"
                >
                  {link.label}
                </motion.span>
                {/* Underline animation */}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#fdb813] group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-5">
            {/* Reserve Button */}
            <motion.a
              href="tel:8111809991"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full border border-[#fdb813]/40 text-[#fdb813] text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#fdb813] hover:text-black hover:border-[#fdb813] transition-colors duration-300"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Reserve</span>
            </motion.a>

            {/* Cart Button */}
            <motion.button
              onClick={onOpenCart}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="relative flex items-center text-white hover:text-[#fdb813] transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-2 -right-2.5 bg-[#fdb813] text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-black"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 90 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="md:hidden text-white hover:text-[#fdb813] transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-900 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col items-center space-y-1">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-lg font-bold tracking-[0.2em] uppercase text-white active:text-[#fdb813] active:scale-95 transition-all"
                    style={{ fontFamily: "var(--font-cinzel), serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="pt-6 w-full"
              >
                <a
                  href="tel:8111809991"
                  className="block text-center py-3 px-6 rounded-full bg-[#fdb813] text-black font-bold text-sm uppercase tracking-[0.2em] active:scale-95 transition-transform"
                >
                  Call Now: 8111809991
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
