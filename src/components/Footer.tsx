"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Download } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-md text-white pt-20 pb-10 border-t border-gray-900/50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-gray-900">
          
          {/* Brand */}
          <div className="md:col-span-4 space-y-6">
            <div className="relative w-20 h-20">
              <Image
                src="/nyc_logo_latest.png"
                alt="New York Chicken Official Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xs">
              An authentic Taste of New York City in Kazhakuttam, Trivandrum. 100% Halal Certified.
            </p>
          </div>

          {/* Location */}
          <div id="location" className="md:col-span-4 space-y-6 scroll-mt-24">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#fdb813]">Location</h3>
            <ul className="space-y-4 text-sm text-gray-300 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-[#fdb813] flex-shrink-0" />
                <a 
                  href="https://maps.app.goo.gl/4P97Ckt9JysUgGSg6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#fdb813] transition-colors leading-relaxed"
                >
                  NYC Tower, OPP. Nippon Toyota Service Center, Kulathur, Kazhakuttam, Kerala
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#fdb813]" />
                <a href="tel:8111809991" className="hover:text-[#fdb813] font-bold transition-colors">
                  +91 8111809991
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#fdb813]">Explore</h3>
            <ul className="space-y-4 text-sm text-gray-300 font-light">
              <li>
                <Link href="#menu" className="hover:text-[#fdb813] font-bold transition-colors">Menu</Link>
              </li>
              <li>
                <Link href="#ambiance" className="hover:text-[#fdb813] font-bold transition-colors">Ambiance</Link>
              </li>
              <li>
                <a
                  href="/NYC_MENU_MAY_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#fdb813] font-bold transition-colors"
                >
                  <Download className="w-4 h-4 text-[#fdb813]" />
                  <span>Download Menu PDF</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/nyc_kerala/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#fdb813] font-bold transition-colors"
                >
                  <svg className="w-4 h-4 fill-current text-[#fdb813]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600 font-bold tracking-widest uppercase gap-4">
          <p>© {new Date().getFullYear()} New York Chicken. All Rights Reserved.</p>
          <p className="text-[#fdb813]">Elevated Dining Experience</p>
        </div>

      </div>
    </footer>
  );
}
