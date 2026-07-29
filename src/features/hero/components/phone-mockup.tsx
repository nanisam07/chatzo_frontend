"use client";

import React from "react";
import { useHeroStore } from "@/store/use-hero-store";
import { MessageSquare, ShoppingCart, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock products
const PRODUCTS = [
  {
    id: 1,
    name: "Minimalist Flask",
    price: 49.00,
    category: "Drinkware",
    desc: "Double-walled matte titanium container designed to preserve optimal temperature.",
    bg: "dark:from-purple-accent/20 dark:to-neutral-900 from-purple-accent/10 to-slate-50",
    glow: "rgba(124, 58, 237, 0.2)",
  },
  {
    id: 2,
    name: "Nordic Coffee Cup",
    price: 24.00,
    category: "Lifestyle",
    desc: "Handcrafted ceramic mug featuring insulated grip and volcanic gray finish.",
    bg: "dark:from-cyan-accent/20 dark:to-neutral-900 from-cyan-accent/10 to-slate-50",
    glow: "rgba(0, 212, 255, 0.1)",
  }
];

export function PhoneMockup() {
  const { currentStep, cartCount, isOrderAccepted, whatsappProgress } = useHeroStore();
  
  const fullText = "Hey! I would like to order the Minimalist Flask ($49.00). Please confirm details.";
  const typedMessage = fullText.slice(0, Math.floor(whatsappProgress * fullText.length));

  return (
    <div className="relative mx-auto w-[310px] h-[630px] rounded-[48px] border-[10px] dark:border-neutral-900 border-slate-300 dark:bg-[#0a0a0a] bg-slate-100 ring-4 dark:ring-neutral-800 ring-slate-200 shadow-[0_30px_70px_rgba(0,0,0,0.9)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.9)] shadow-[0_30px_70px_rgba(15,23,42,0.1)] overflow-hidden transition-all duration-700 select-none">
      
      {/* Dynamic Island / Hardware notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 dark:bg-black bg-slate-800 rounded-full z-40 flex items-center justify-between px-3">
        <div className="w-1.5 h-1.5 rounded-full dark:bg-neutral-900 bg-slate-900" />
        <div className="w-10 h-1 dark:bg-neutral-900 bg-slate-900 rounded-full" />
      </div>

      {/* Screen Glare reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.015] to-white/[0.04] pointer-events-none z-30" />

      {/* Internal Screen Area */}
      <div className="relative w-full h-full p-4 flex flex-col z-10 pt-11 dark:bg-neutral-950 bg-white dark:text-white text-slate-800 font-sans text-xs transition-colors duration-500">
        
        {/* ==================== 1. CATALOG SCREEN (Step 0 & 1) ==================== */}
        {currentStep <= 1 && (
          <div className="flex-1 flex flex-col justify-between h-full animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center dark:border-white/5 border-slate-100 border-b pb-3">
              <div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Storefront</p>
                <h3 className="text-sm font-bold tracking-tight dark:text-white text-slate-900">Nordic Design Co.</h3>
              </div>
              <div className="relative p-2 rounded-full dark:bg-white/5 bg-slate-50 border dark:border-white/5 border-slate-200">
                <ShoppingCart size={14} className="dark:text-neutral-300 text-slate-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-whatsapp text-black text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>

            {/* Banner */}
            <div className="my-3 p-3 rounded-2xl dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950 bg-slate-50 border dark:border-white/5 border-slate-200">
              <span className="px-2 py-0.5 rounded-md bg-whatsapp/15 text-[9px] text-whatsapp font-medium border border-whatsapp/10">
                WhatsApp Enabled
              </span>
              <p className="mt-2 text-[10px] dark:text-neutral-400 text-slate-500">Order premium essentials instantly via chat.</p>
            </div>

            {/* Catalog Grid */}
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-0.5">
              {PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className={cn(
                    "p-3 rounded-2xl bg-gradient-to-br border dark:border-white/5 border-slate-200 flex gap-3 transition-all duration-300",
                    prod.bg,
                    currentStep === 1 && prod.id === 1 ? "border-purple-accent/40 shadow-lg scale-[1.02]" : ""
                  )}
                >
                  {/* Mock Image Box */}
                  <div className="w-16 h-16 rounded-xl dark:bg-neutral-950 bg-slate-100 flex items-center justify-center border dark:border-white/5 border-slate-200 relative overflow-hidden shrink-0">
                    <div className="absolute w-8 h-8 rounded-full bg-purple-accent/20 blur-md" />
                    <span className="text-[9px] text-neutral-500 font-bold">1:1</span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[9px] text-neutral-400">{prod.category}</p>
                      <h4 className="font-semibold dark:text-white text-slate-900 mt-0.5">{prod.name}</h4>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold dark:text-neutral-200 text-slate-800">${prod.price.toFixed(2)}</span>
                      <span className="text-[10px] text-whatsapp flex items-center gap-1 font-medium">
                        View Item <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 2. PRODUCT DETAIL SCREEN (Step 2) ==================== */}
        {currentStep === 2 && (
          <div className="flex-1 flex flex-col justify-between h-full animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-2 dark:border-white/5 border-slate-100 border-b pb-2">
              <span className="text-neutral-400">&larr; Store</span>
              <span className="font-bold text-[10px] truncate max-w-[150px]">Product Details</span>
            </div>

            {/* Product visual container */}
            <div className="my-3 aspect-[4/3] rounded-3xl bg-gradient-to-br dark:from-purple-accent/15 dark:to-neutral-900 from-purple-accent/10 to-slate-50 border dark:border-white/5 border-slate-200 flex items-center justify-center relative overflow-hidden">
              <div className="absolute w-24 h-24 rounded-full bg-purple-accent/30 blur-2xl animate-pulse" />
              <div className="w-20 h-28 rounded-2xl dark:bg-neutral-950 bg-white border dark:border-white/10 border-slate-200 flex flex-col justify-between p-3 shadow-2xl relative z-10">
                <span className="text-[7px] text-neutral-400 uppercase font-bold tracking-widest">Flask</span>
                <div className="w-full h-12 rounded bg-neutral-500/10 animate-pulse" />
                <span className="text-[8px] font-bold dark:text-neutral-300 text-slate-700">$49.00</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold dark:text-white text-slate-900">Minimalist Flask</h3>
              <p className="font-bold dark:text-neutral-200 text-slate-700 text-sm">$49.00</p>
              <p className="text-[10px] dark:text-neutral-400 text-slate-500 leading-relaxed">
                Premium double-walled matte titanium container designed to preserve optimal temperature. Extremely lightweight and durable.
              </p>
            </div>

            {/* Add to Cart button */}
            <button className="w-full mt-4 py-3 rounded-2xl dark:bg-white dark:text-black bg-slate-900 text-white font-semibold dark:hover:bg-neutral-200 hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <ShoppingCart size={13} />
              <span>Add to Cart</span>
            </button>
          </div>
        )}

        {/* ==================== 3. CART & CHECKOUT (Step 3 & 4) ==================== */}
        {(currentStep === 3 || currentStep === 4) && (
          <div className="flex-1 flex flex-col justify-between h-full animate-fade-in">
            <h3 className="text-sm font-bold dark:border-white/5 border-slate-100 border-b pb-2 dark:text-white text-slate-900">Shopping Bag</h3>

            <div className="flex-1 flex flex-col justify-center py-4">
              <div className="p-3 rounded-2xl dark:bg-white/[0.02] bg-slate-50 border dark:border-white/5 border-slate-200 flex gap-3 items-center">
                <div className="w-12 h-12 rounded-xl dark:bg-neutral-900 bg-slate-100 border dark:border-white/5 border-slate-200 flex items-center justify-center">
                  <div className="w-6 h-8 rounded bg-purple-accent/20 border border-purple-accent/30" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold dark:text-white text-slate-900">Minimalist Flask</h4>
                  <p className="text-[10px] text-neutral-400">Qty: 1 &bull; Matte Titanium</p>
                </div>
                <span className="font-bold dark:text-neutral-200 text-slate-800">$49.00</span>
              </div>

              {/* Subtotal summary */}
              <div className="mt-6 dark:border-t dark:border-white/5 border-t border-slate-100 pt-4 space-y-2">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>$49.00</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Delivery</span>
                  <span className="text-whatsapp">FREE</span>
                </div>
                <div className="flex justify-between dark:text-white text-slate-900 font-bold text-sm pt-2">
                  <span>Total</span>
                  <span>$49.00</span>
                </div>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              className={cn(
                "w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer",
                currentStep === 4
                  ? "bg-whatsapp text-black animate-pulse"
                  : "dark:bg-white dark:text-black bg-slate-900 text-white hover:bg-slate-800"
              )}
            >
              <MessageSquare size={13} />
              <span>Checkout via WhatsApp</span>
            </button>
          </div>
        )}

        {/* ==================== 4. WHATSAPP CONVERSATION SCREEN (Step 5, 6, 7) ==================== */}
        {(currentStep === 5 || currentStep === 6 || currentStep === 7) && (
          <div className="flex-1 flex flex-col justify-between h-full dark:bg-[#0b141a] bg-[#efeae2] rounded-3xl border dark:border-white/5 border-slate-200 overflow-hidden animate-fade-in transition-colors duration-500">
            {/* WhatsApp Header */}
            <div className="bg-[#075e54] p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Profile Pic */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-whatsapp to-purple-accent flex items-center justify-center text-[10px] font-bold text-black border border-white/20">
                  CZ
                </div>
                <div>
                  <h4 className="font-bold text-white text-[11px] leading-tight">Chatzo Store</h4>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-whatsapp animate-ping" />
                    <span className="text-[8px] text-whatsapp font-medium">online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 flex flex-col justify-end">
              {/* Recipient Welcome Bubble */}
              <div className="p-2.5 rounded-2xl rounded-tl-none dark:bg-neutral-900 bg-white dark:text-white text-slate-800 max-w-[85%] self-start border dark:border-white/5 border-slate-200 text-[10px] leading-relaxed shadow-sm">
                👋 Hello! Welcome to Nordic Design Co. Send us your order request and our system will confirm it instantly!
              </div>

              {/* Message Typing / Sent Bubble */}
              {(currentStep >= 6 || typedMessage) && (
                <div className="p-2.5 rounded-2xl rounded-tr-none bg-[#d9fdd3] text-[#111b21] max-w-[85%] self-end font-normal text-[10px] leading-relaxed shadow-sm animate-slide-up flex flex-col">
                  <span>{currentStep === 6 ? typedMessage : "Hey! I would like to order the Minimalist Flask ($49.00). Please confirm details."}</span>
                  <div className="self-end flex items-center gap-0.5 mt-1 text-[8px] text-[#667781]">
                    <span>11:38 AM</span>
                    {currentStep >= 7 && <span className="text-[#53bdeb] font-bold">✓✓</span>}
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-2 dark:bg-[#1f2c34] bg-[#f0f2f5] border-t dark:border-white/5 border-slate-200 flex items-center gap-2">
              <div className="flex-1 py-1.5 px-3 rounded-full dark:bg-[#2a3942] bg-white border dark:border-white/5 border-slate-200 dark:text-neutral-300 text-slate-600 text-[10px] truncate">
                {currentStep === 6 && typedMessage ? typedMessage : "Type a message..."}
              </div>
              <button
                className={cn(
                  "p-2 rounded-full transition-colors shrink-0 cursor-pointer",
                  currentStep >= 7 ? "bg-whatsapp text-black" : "dark:bg-neutral-800 bg-slate-200 text-slate-400"
                )}
              >
                <Send size={12} />
              </button>
            </div>
          </div>
        )}

        {/* ==================== 5. SUCCESS CONFIRMATION (Step 8 & 9) ==================== */}
        {currentStep >= 8 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center h-full space-y-4 animate-fade-in">
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700",
              isOrderAccepted ? "bg-whatsapp/10 text-whatsapp scale-110" : "bg-purple-accent/15 text-purple-accent"
            )}>
              <CheckCircle2 size={36} className={cn(isOrderAccepted && "animate-pulse")} />
            </div>

            <div>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Checkout Complete</p>
              <h3 className="text-sm font-bold dark:text-white text-slate-900 mt-1">Order Confirmed!</h3>
              <p className="text-[10px] dark:text-neutral-400 text-slate-500 max-w-[200px] mx-auto mt-2 leading-relaxed">
                {isOrderAccepted
                  ? "Nordic Design Co. accepted your order. A digital invoice has been dispatched via WhatsApp."
                  : "Processing your order via Chatzo commerce router..."}
              </p>
            </div>

            {/* Digital receipt box */}
            <div className="p-3 rounded-2xl dark:bg-white/[0.02] bg-slate-50 border dark:border-white/5 border-slate-200 w-full space-y-1.5 text-left text-[9px] dark:text-neutral-400 text-slate-500">
              <div className="flex justify-between">
                <span>Receipt Number:</span>
                <span className="dark:text-white text-slate-800 font-mono">#CZ-3849</span>
              </div>
              <div className="flex justify-between">
                <span>Item:</span>
                <span className="dark:text-white text-slate-800 font-medium">Minimalist Flask (Matte)</span>
              </div>
              <div className="flex justify-between">
                <span>Payment:</span>
                <span className={cn("font-bold transition-colors duration-500", isOrderAccepted ? "text-whatsapp" : "text-purple-accent")}>
                  {isOrderAccepted ? "Paid / Confirmed" : "Pending Accept"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default PhoneMockup;
