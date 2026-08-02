"use client";

import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function InstagramReelsWidget() {
  const reels = [
    {
      id: "1",
      videoSrc: "/videos/hero-video.mp4",
      url: "https://www.instagram.com/reel/DZw9WItCUZv/",
      title: "The Ultimate NYC Experience ✨",
      likes: "1,240",
      views: "14.2K",
    },
    {
      id: "2",
      videoSrc: "/videos/hero-video.mp4",
      url: "https://www.instagram.com/reel/DbYUiMrypjR/",
      title: "Best Burgers in TVM 🍔🔥",
      likes: "3,110",
      views: "28.5K",
    },
    {
      id: "3",
      videoSrc: "/videos/hero-video.mp4",
      url: "https://www.instagram.com/reel/DbgA034jquH/",
      title: "Crispy Golden Fried Chicken 🍗",
      likes: "2,050",
      views: "19.8K",
    },
  ];

  return (
    <section className="py-24 bg-black/50 backdrop-blur-sm border-t border-gray-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Follow Our <span className="text-[#fdb813] italic">Vibe</span>
          </h2>
          <p className="text-gray-400 text-sm font-light max-w-2xl mx-auto font-sans">
            Catch the latest moments and mouth-watering dishes straight from our Instagram.
          </p>
        </motion.div>

        {/* Reels Grid */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 lg:gap-8">
          {reels.map((reel, idx) => (
            <motion.div 
              key={reel.id} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -10 }}
              className="relative w-full max-w-[320px] aspect-[9/16] rounded-[32px] overflow-hidden border border-gray-800 group hover:border-[#fdb813]/60 transition-all duration-500 shadow-2xl"
            >
              {/* Background Video */}
              <video
                src={reel.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90 pointer-events-none" />

              {/* Top Bar (Handle & Views) */}
              <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10 font-sans">
                <a 
                  href="https://www.instagram.com/nyc_kerala/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 fill-current text-white m-0.5" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </div>
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">@nyc_kerala</span>
                </a>
                
                <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[10px] font-bold">
                  <Play className="w-3 h-3 fill-white" />
                  <span>{reel.views}</span>
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <a 
                href={reel.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-20 flex items-center justify-center group-hover:bg-black/10 transition-colors"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-[#fdb813] transition-all duration-300 shadow-xl"
                >
                  <Play className="w-6 h-6 text-white fill-white ml-1 group-hover:text-black group-hover:fill-black" />
                </motion.div>
              </a>

              {/* Bottom Info */}
              <div className="absolute bottom-6 left-5 right-5 z-10 font-sans">
                <h3 className="text-white font-medium text-lg mb-3 leading-tight drop-shadow-md" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {reel.title}
                </h3>
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1.5 text-white">
                    <span className="text-[#fdb813] text-sm">❤</span>
                    {reel.likes}
                  </div>
                  <a 
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#fdb813] transition-colors"
                  >
                    Watch on IG →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
