import React from "react";
import Image from "next/image";

export default function AboutUs() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-black/50 backdrop-blur-sm border-y border-white/5">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#fdb813]/5 to-transparent pointer-events-none" />
      <div className="absolute -left-32 -top-32 w-64 h-64 bg-[#fdb813]/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-[#fdb813]"></div>
                <span className="text-[#fdb813] font-bold tracking-widest uppercase text-sm">Our Story</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                Born in the USA,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Raised for the World.</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
              <p>
                New York Chicken has its roots in the United States and the brand reflects the cosmopolitan and multiculturalism of New York City. From the hustle and bustle of Midtown Manhattan to the chaos of the Bronx and Queen's, the city's flavors are captured in New York Chicken's menu.
              </p>
              <p>
                The menu features fried and grilled chicken, burgers, wraps and a variety of sides which all have a touch of the different flavors of the city.
              </p>
              <div className="p-6 bg-white/5 border-l-4 border-[#fdb813] rounded-r-2xl">
                <p className="text-white/90 font-medium">
                  Internationally, New York Chicken started expansion in 2018 with a focus on the markets of Asia and started its first international outlet in Bahrain.
                </p>
                <p className="mt-3 text-sm text-gray-400">
                  The master franchise rights are held by Pizza Development Company of Bahrain whom has given particular attention to the market of India given the mammoth size of the market and vast opportunities.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <p className="text-3xl font-black text-white mb-1">2018</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Global Start</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#fdb813] mb-1">NYC</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Authentic Roots</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white mb-1">Global</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Expansion</p>
              </div>
            </div>
          </div>
          
          {/* Visual Content */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1496442226666-8d4d0e2815cb?q=80&w=2070&auto=format&fit=crop" 
                alt="New York City vibe" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <Image src="/nyc_logo_latest.png" alt="NYC Logo" width={80} height={80} className="mb-4 drop-shadow-xl" />
                <p className="text-white font-bold text-xl uppercase tracking-widest drop-shadow-lg">The Flavor of<br/>The City</p>
              </div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -bottom-8 -left-8 bg-[#111111] p-6 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md hidden md:block animate-pulse-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#fdb813]/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <p className="text-white font-bold">Now Expanding</p>
                  <p className="text-xs text-[#fdb813] uppercase tracking-wider font-bold">Across India</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
