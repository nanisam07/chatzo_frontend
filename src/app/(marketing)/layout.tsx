import React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Dynamic ambient background light blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-cyan-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] rounded-full bg-whatsapp/5 blur-[120px] pointer-events-none" />

      {/* Shared Vertical Left Dock Navigation */}
      <Header />

      {/* Content wrapper */}
      <main className="flex-1 w-full flex flex-col relative z-10">{children}</main>

      {/* Shared Layout Footer */}
      <Footer />
    </div>
  );
}
