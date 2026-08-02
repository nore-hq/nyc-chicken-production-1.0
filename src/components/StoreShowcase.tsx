"use client";

import Image from "next/image";

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
    <section id="ambiance" className="relative py-24 bg-transparent border-t border-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <p className="text-[#fdb813] text-sm font-bold tracking-[0.2em] uppercase mb-4">The Atmosphere</p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
            Our Ambiance
          </h2>
          <p className="text-gray-400 font-light leading-relaxed">
            A refined space designed to elevate your dining experience. From our elegant indoor lounge to the tranquil outdoor garden seating, every detail is crafted for your comfort.
          </p>
        </div>

        {/* Minimalist Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((img) => (
            <div key={img.title} className="group relative flex flex-col space-y-4">
              <div className="relative h-[400px] w-full overflow-hidden rounded-3xl border border-gray-800 group-hover:border-[#fdb813] transition-colors duration-500">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[1500ms]"
                />
              </div>
              <div className="text-center pt-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">{img.title}</h3>
                <p className="text-xs text-[#fdb813] font-bold mt-1 uppercase tracking-wider">{img.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Global Presence */}
        <div className="mt-24 text-center max-w-2xl mx-auto bg-[#0b0c0e] border border-gray-900 p-12 rounded-[2.5rem]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#fdb813] mb-4">International Presence</p>
          <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-4">
            A Global Standard
          </h3>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            Expanding across Saudi Arabia, UAE, Qatar, Oman, Kuwait, Egypt, India, Malaysia, Indonesia, Kazakhstan, and the Philippines.
          </p>
        </div>

      </div>
    </section>
  );
}
