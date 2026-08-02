"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

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
        scrolled ? "bg-black/90 backdrop-blur-md py-4 border-b border-gray-900" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center transition-transform hover:scale-105">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 drop-shadow-2xl">
                <Image
                  src="/nyc_logo_latest.png"
                  alt="New York Chicken Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="#menu" className="group text-base font-bold tracking-[0.2em] uppercase text-white transition-colors" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
              <motion.span whileHover={{ y: -4 }} className="group-hover:text-[#fdb813] inline-block transition-colors duration-300">Menu</motion.span>
            </Link>
            <Link href="#brochure" className="group text-base font-bold tracking-[0.2em] uppercase text-white transition-colors" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
              <motion.span whileHover={{ y: -4 }} className="group-hover:text-[#fdb813] inline-block transition-colors duration-300">Brochure</motion.span>
            </Link>
            <Link href="#ambiance" className="group text-base font-bold tracking-[0.2em] uppercase text-white transition-colors" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
              <motion.span whileHover={{ y: -4 }} className="group-hover:text-[#fdb813] inline-block transition-colors duration-300">Ambiance</motion.span>
            </Link>
            <Link href="#location" className="group text-base font-bold tracking-[0.2em] uppercase text-white transition-colors" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
              <motion.span whileHover={{ y: -4 }} className="group-hover:text-[#fdb813] inline-block transition-colors duration-300">Location</motion.span>
            </Link>
          </div>

          {/* Right Side (Reserve & Cart) */}
          <div className="flex items-center gap-6">
            <a
              href="tel:8111809991"
              className="hidden lg:flex items-center gap-2 text-sm font-bold tracking-widest text-[#fdb813] hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>RESERVE</span>
            </a>

            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 text-white hover:text-[#fdb813] transition-colors group"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#fdb813] text-black text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-[#fdb813]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0b0c0e] border-t border-gray-900 px-6 py-8 shadow-2xl flex flex-col items-center space-y-6">
          <Link href="#menu" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold tracking-widest uppercase text-white hover:text-[#fdb813]">Menu</Link>
          <Link href="#brochure" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold tracking-widest uppercase text-white hover:text-[#fdb813]">Brochure</Link>
          <Link href="#ambiance" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold tracking-widest uppercase text-white hover:text-[#fdb813]">Ambiance</Link>
          <Link href="#location" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold tracking-widest uppercase text-white hover:text-[#fdb813]">Location</Link>
          <div className="pt-4 flex flex-col items-center gap-4 w-full">
            <a href="tel:8111809991" className="text-base font-bold tracking-widest text-[#fdb813] border-b-2 border-[#fdb813] pb-1 hover:text-white hover:border-white transition-colors">
              CALL: 8111809991
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
