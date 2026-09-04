"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuPreview from "@/components/MenuPreview";
import MenuBrowser from "@/components/MenuBrowser";
import InstagramReelsWidget from "@/components/InstagramReelsWidget";
import BrochureViewer from "@/components/BrochureViewer";
import OrderDrawer, { CartItem } from "@/components/OrderDrawer";
import StoreShowcase from "@/components/StoreShowcase";
import Footer from "@/components/Footer";
import { MenuItem } from "@/data/menuData";

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);

  const handleAddToCart = (
    item: MenuItem,
    selectedSize?: { label: string; price: number }
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.item.id === item.id &&
          ci.selectedSize?.label === selectedSize?.label
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { item, selectedSize, quantity: 1 }];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((_, idx) => idx !== index));
    } else {
      setCartItems((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartItemIds = cartItems.map((ci) => ci.item.id);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-[#fdb813] selection:text-black relative">
      
      {/* Global Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          src="/videos/chicken-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
          disablePictureInPicture
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#fdb813]/[0.03] to-black/50 pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        {/* Navbar */}
        <Navbar 
          cartCount={cartCount} 
          onOpenCart={() => setIsCartOpen(true)}
          onOpenMenu={() => {
            setIsMenuExpanded(true);
            setTimeout(() => {
              document.getElementById('menu-full')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />

      {/* Main Landing Sections */}
      <main className="flex-grow">
        <Hero />
        
        {/* Menu Interaction Flow */}
        <div id="menu">
          <MenuPreview 
            isExpanded={isMenuExpanded} 
            onExpand={() => {
              setIsMenuExpanded(true);
              setTimeout(() => {
                document.getElementById('menu-full')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} 
          />
          {/* Full Menu Expansion */}
          {isMenuExpanded && (
            <div className="relative">
              <MenuBrowser 
                onAddToCart={handleAddToCart}
                cartItemIds={cartItemIds}
                onClose={() => {
                  setIsMenuExpanded(false);
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              <div className="flex justify-center pb-24 -mt-12 relative z-20">
                <button
                  onClick={() => setIsMenuExpanded(false)}
                  className="px-8 py-3 bg-[#111111] border border-gray-800 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:border-[#fdb813] hover:text-[#fdb813] transition-colors shadow-lg"
                >
                  Collapse Menu ↑
                </button>
              </div>
            </div>
          )}

          {/* Social Proof / Instagram */}
        </div>

        <BrochureViewer />
        <InstagramReelsWidget />
        <StoreShowcase />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Cart / WhatsApp Order Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />
      </div>
    </div>
  );
}
