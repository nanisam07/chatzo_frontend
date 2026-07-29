import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] text-white overflow-hidden select-none">
      {/* Dynamic ambient background light blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full bg-purple-accent/10 blur-[130px] pointer-events-none animate-aurora-1 z-0" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[450px] h-[450px] rounded-full bg-whatsapp/5 blur-[120px] pointer-events-none animate-aurora-2 z-0" />
      
      {/* Volumetric Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none z-10" />

      {/* Content wrapper */}
      <main className="w-full relative z-20 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
