"use client";

import { useState } from "react";
import { MenuItem } from "../data/menuData";
import { X, Trash2, Plus, Minus, Send, Phone, ShoppingBag, Info } from "lucide-react";

export interface CartItem {
  item: MenuItem;
  selectedSize?: { label: string; price: number };
  quantity: number;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onClearCart: () => void;
}

export default function OrderDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
}: OrderDrawerProps) {
  const [orderType, setOrderType] = useState<"Delivery" | "Takeaway" | "Dine-In">("Delivery");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [addressOrTable, setAddressOrTable] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  const subtotal = cartItems.reduce((acc, curr) => {
    const itemPrice = curr.selectedSize ? curr.selectedSize.price : curr.item.price;
    return acc + itemPrice * curr.quantity;
  }, 0);

  const handleSendWhatsApp = () => {
    if (cartItems.length === 0) return;

    let message = `*NEW YORK CHICKEN - PREMIUM ORDER*\n`;
    message += `-----------------------------------\n`;
    
    cartItems.forEach((ci, idx) => {
      const sizeLabel = ci.selectedSize ? ` (${ci.selectedSize.label})` : "";
      const price = ci.selectedSize ? ci.selectedSize.price : ci.item.price;
      message += `${idx + 1}. *${ci.item.name}*${sizeLabel} x${ci.quantity} - ₹${price * ci.quantity}\n`;
    });

    message += `-----------------------------------\n`;
    message += `*Total Amount:* ₹${subtotal} (+ GST as applicable)\n`;
    message += `*Order Type:* ${orderType}\n`;
    if (customerName) message += `*Name:* ${customerName}\n`;
    if (customerPhone) message += `*Phone:* ${customerPhone}\n`;
    if (addressOrTable) message += `*${orderType === "Dine-In" ? "Table No" : "Address"}:* ${addressOrTable}\n`;
    if (orderNotes) message += `*Notes:* ${orderNotes}\n`;
    message += `-----------------------------------\n`;
    message += `Thank you! Sent from nychicken.in`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918111809991?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        
        <div className="w-screen max-w-md bg-[#111111] border-l border-[#fdb813]/15 shadow-[−30px_0_60px_rgba(253,184,19,0.03)] flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 pt-[max(1.5rem,env(safe-area-inset-top))] border-b border-gray-800 bg-[#0b0c0e] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#fdb813]" />
              <h2 className="text-lg font-black uppercase text-white tracking-widest">Order Tray</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fdb813] text-black font-bold uppercase tracking-widest">
                {cartItems.reduce((a, b) => a + b.quantity, 0)} Items
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Content / Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#111111]">
            
            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-16 h-16 text-gray-800 mx-auto mb-6" />
                <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-3">Your Tray is Empty</h3>
                <p className="text-sm text-gray-600 max-w-xs mx-auto font-light leading-relaxed">
                  Browse our premium menu and add items to begin your fine-dining experience at home.
                </p>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-800 pb-2">
                    <span>Selected Items</span>
                    <button
                      onClick={onClearCart}
                      className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear Tray
                    </button>
                  </div>

                  {cartItems.map((ci, index) => {
                    const price = ci.selectedSize ? ci.selectedSize.price : ci.item.price;
                    return (
                      <div
                        key={`${ci.item.id}-${ci.selectedSize?.label || "default"}`}
                        className="py-4 border-b border-gray-800 flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1 flex-1 min-w-0">
                          <h4 className="text-base font-bold text-white truncate">{ci.item.name}</h4>
                          {ci.selectedSize && (
                            <span className="text-[10px] text-[#fdb813] font-bold uppercase tracking-widest block">
                              {ci.selectedSize.label}
                            </span>
                          )}
                          <p className="text-sm text-gray-400 font-bold pt-1">₹{price * ci.quantity}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-black border border-gray-800 px-1 py-1 shrink-0 rounded-full">
                          <button
                            onClick={() => onUpdateQuantity(index, ci.quantity - 1)}
                            className="p-1.5 text-gray-500 hover:text-white transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm text-white w-4 text-center font-bold">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, ci.quantity + 1)}
                            className="p-1.5 text-gray-500 hover:text-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery / Order Details Form */}
                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#fdb813] border-b border-gray-800 pb-2">Details</h3>

                  {/* Order Type Tabs */}
                  <div className="grid grid-cols-3 gap-0 border border-gray-800 rounded-lg overflow-hidden">
                    {(["Delivery", "Takeaway", "Dine-In"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setOrderType(t)}
                        className={`py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                          orderType === t
                            ? "bg-[#fdb813] text-black"
                            : "bg-black text-gray-500 hover:bg-gray-900 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3.5 bg-black border border-gray-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#fdb813] transition-colors"
                    />

                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-3.5 bg-black border border-gray-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#fdb813] transition-colors"
                    />

                    <input
                      type="text"
                      placeholder={orderType === "Dine-In" ? "Table Number" : "Delivery Address / Landmark"}
                      value={addressOrTable}
                      onChange={(e) => setAddressOrTable(e.target.value)}
                      className="w-full px-4 py-3.5 bg-black border border-gray-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#fdb813] transition-colors"
                    />

                    <textarea
                      placeholder="Special instructions"
                      rows={2}
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full px-4 py-3.5 bg-black border border-gray-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#fdb813] transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2 text-[10px] font-bold text-gray-500 bg-black p-4 rounded-lg border border-gray-900">
                    <Info className="w-4 h-4 text-[#fdb813] shrink-0" />
                    <span className="leading-relaxed uppercase tracking-widest">Extra GST will be applicable on final bill.</span>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Footer Checkout Controls */}
          {cartItems.length > 0 && (
            <div className="p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] border-t border-gray-800 bg-[#0b0c0e] space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Subtotal</span>
                <span className="text-2xl font-black text-white">₹{subtotal}</span>
              </div>

              <button
                onClick={handleSendWhatsApp}
                className="w-full py-4 bg-[#fdb813] text-black text-sm uppercase tracking-[0.2em] font-black hover:bg-yellow-400 transition-colors flex items-center justify-center gap-3 rounded-full shadow-[0_0_20px_rgba(253,184,19,0.2)]"
              >
                <Send className="w-5 h-5 fill-black" />
                <span>Confirm Order via WhatsApp</span>
              </button>

              <div className="text-center pt-2">
                <a
                  href="tel:8111809991"
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 8111809991</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
