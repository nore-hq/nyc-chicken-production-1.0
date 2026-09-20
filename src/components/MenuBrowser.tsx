"use client";

import { useState, useMemo } from "react";
import { MenuItem } from "../data/menuData";
import { useMenuData } from "../context/MenuContext";
import { Search, Flame, Leaf, Sparkles, Plus, Check, X, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuBrowserProps {
  onAddToCart: (item: MenuItem, selectedSize?: { label: string; price: number }) => void;
  cartItemIds: string[];
  onClose?: () => void;
}

export default function MenuBrowser({ onAddToCart, cartItemIds, onClose }: MenuBrowserProps) {
  const { items: MENU_ITEMS, categories: MENU_CATEGORIES } = useMenuData();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [spicyOnly, setSpicyOnly] = useState<boolean>(false);
  const [grilledOnly, setGrilledOnly] = useState<boolean>(false);

  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (vegOnly && !item.isVeg) return false;
      if (spicyOnly && !item.isSpicy) return false;
      if (grilledOnly && !item.isGrilled) return false;

      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description?.toLowerCase().includes(query) || false;
        const matchSub = item.subcategory?.toLowerCase().includes(query) || false;
        return matchName || matchDesc || matchSub;
      }
      return true;
    });
  }, [activeCategory, searchQuery, vegOnly, spicyOnly, grilledOnly]);

  const handleCardClick = (item: MenuItem) => {
    if (item.prices && item.prices.length > 0) {
      setSelectedItemForModal(item);
      setSelectedSizeIndex(0);
    } else {
      onAddToCart(item);
    }
  };

  const handleModalAdd = () => {
    if (selectedItemForModal && selectedItemForModal.prices) {
      const chosenPrice = selectedItemForModal.prices[selectedSizeIndex];
      onAddToCart(selectedItemForModal, chosenPrice);
      setSelectedItemForModal(null);
    }
  };

  return (
    <section id="menu-full" className="relative py-24 bg-[#0b0c0e] overflow-hidden">
      {/* Transparent yellow gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fdb813]/15 via-[#0b0c0e]/80 to-[#0b0c0e]" />
      <div className="absolute top-0 left-0 right-0 h-2 bg-checkerboard z-0 opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Sticky Close Button */}
        {onClose && (
          <div className="sticky top-[max(6rem,env(safe-area-inset-top))] z-40 flex justify-end mb-4 -mt-16">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 bg-black/90 border border-gray-800 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:border-[#fdb813] hover:text-[#fdb813] transition-colors shadow-2xl backdrop-blur-md"
            >
              <span>Close Menu</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <p className="text-[#fdb813] text-xs font-bold tracking-[0.3em] uppercase font-sans">Full Menu</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white capitalize tracking-tight" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            The Collection
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light tracking-wide pt-4 max-w-lg mx-auto font-sans leading-relaxed">
            A meticulously curated selection of our finest offerings, combining fresh ingredients with bold NYC flavors.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="mb-12 border-b border-gray-900 pb-8 space-y-8 font-sans relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 bg-transparent border-b border-[#fdb813]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#fdb813] transition-all text-sm rounded-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gray-500">
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`transition-colors ${vegOnly ? "text-[#fdb813]" : "hover:text-white"}`}
              >
                Vegetarian
              </button>
              <span className="text-gray-800">|</span>
              <button
                onClick={() => setSpicyOnly(!spicyOnly)}
                className={`transition-colors ${spicyOnly ? "text-[#fdb813]" : "hover:text-white"}`}
              >
                Spicy
              </button>
              <span className="text-gray-800">|</span>
              <button
                onClick={() => setGrilledOnly(!grilledOnly)}
                className={`transition-colors ${grilledOnly ? "text-[#fdb813]" : "hover:text-white"}`}
              >
                Char-Grilled
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pt-2 pb-2">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "text-[#fdb813] after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-full after:h-[2px] after:bg-[#fdb813]"
                      : "text-gray-500 hover:text-[#fdb813]/70"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <motion.div layout className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {filteredItems.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 bg-[#111111]/80 backdrop-blur-md rounded-3xl border border-gray-900"
              >
                <Info className="w-8 h-8 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 font-light text-sm sm:text-base font-sans">No offerings match your refined selection.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
              >
                {filteredItems.map((item, idx) => {
                  const isInCart = cartItemIds.includes(item.id);
                  const hasMultiplePrices = item.prices && item.prices.length > 0;

                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx > 10 ? 0 : idx * 0.05 }}
                      key={item.id} 
                      className="group relative flex flex-col justify-between bg-[#111111]/80 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(253,184,19,0.1)] border border-gray-900 hover:border-[#fdb813]/40"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-2 mb-1">
                            {item.subcategory && (
                              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#fdb813] bg-[#fdb813]/10 px-2.5 py-1 rounded-full font-sans">
                                {item.subcategory}
                              </span>
                            )}
                            {item.isBestSeller && (
                              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-black bg-[#fdb813] px-2.5 py-1 rounded-full font-sans">
                                Best Seller
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="text-xl sm:text-2xl text-white tracking-wide" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                          {item.name}
                        </h3>
                        
                        {item.description && (
                          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed font-sans">
                            {item.description}
                          </p>
                        )}

                        <div className="flex items-center gap-2 pt-1 opacity-60">
                          {item.isVeg && <span title="Vegetarian"><Leaf className="w-3.5 h-3.5 text-green-500" /></span>}
                          {item.isSpicy && <span title="Spicy"><Flame className="w-3.5 h-3.5 text-red-500" /></span>}
                          {item.isGrilled && <span title="Char-Grilled"><Sparkles className="w-3.5 h-3.5 text-[#fdb813]" /></span>}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-8">
                        <div>
                          {hasMultiplePrices ? (
                            <span className="text-base sm:text-lg text-white font-bold tracking-wide font-sans">
                              <span className="text-gray-600 text-xs mr-1 font-light">From</span>₹{item.prices![0].price}
                            </span>
                          ) : (
                            <span className="text-base sm:text-lg text-white font-bold tracking-wide font-sans">
                              ₹{item.price}
                            </span>
                          )}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCardClick(item)}
                          className={`flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-colors border px-5 py-2.5 rounded-full font-sans ${
                            isInCart
                              ? "border-[#fdb813] text-[#fdb813] bg-[#fdb813]/10"
                              : "border-gray-700 text-gray-400 hover:border-[#fdb813] hover:text-[#fdb813] hover:bg-[#fdb813]/5"
                          }`}
                        >
                          {isInCart ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>{hasMultiplePrices ? "Select Size" : "Add"}</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItemForModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#111111] border border-gray-800 p-8 sm:p-10 rounded-[2rem] shadow-2xl relative scrollbar-hide"
            >
              
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="absolute top-6 right-6 p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-10 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#fdb813] block mb-3 font-sans">Refine Selection</span>
                <h3 className="text-3xl font-medium text-white capitalize tracking-tight" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {selectedItemForModal.name}
                </h3>
              </div>

              <div className="space-y-4 mb-10 font-sans">
                {selectedItemForModal.prices?.map((p, idx) => (
                  <button
                    key={p.label}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                      selectedSizeIndex === idx
                        ? "border-[#fdb813] bg-[#fdb813]/10 scale-[1.02]"
                        : "border-gray-900 hover:border-gray-700 bg-gray-900/30"
                    }`}
                  >
                    <span className={`text-xs sm:text-sm font-bold tracking-widest uppercase ${selectedSizeIndex === idx ? 'text-[#fdb813]' : 'text-gray-400'}`}>
                      {p.label}
                    </span>
                    <span className="text-lg font-black text-white">₹{p.price}</span>
                  </button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleModalAdd}
                className="w-full py-4 bg-[#fdb813] text-black text-xs sm:text-sm uppercase tracking-[0.2em] font-bold hover:bg-yellow-400 transition-colors shadow-lg rounded-2xl font-sans"
              >
                Add to Order • ₹{selectedItemForModal.prices![selectedSizeIndex].price}
              </motion.button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
