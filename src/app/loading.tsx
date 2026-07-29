import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] text-white">
      <div className="relative flex flex-col items-center gap-4">
        {/* Glassmorphic pulse ring */}
        <div className="absolute w-20 h-20 rounded-full border border-whatsapp/10 animate-ping pointer-events-none" />
        {/* Spinner */}
        <div className="w-12 h-12 rounded-full border-2 border-white/5 border-t-whatsapp animate-spin" />
        <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase animate-pulse pt-2">
          Loading Chatzo
        </span>
      </div>
    </div>
  );
}
