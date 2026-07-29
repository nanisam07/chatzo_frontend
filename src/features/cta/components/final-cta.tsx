"use client";

import React from "react";
import Link from "next/link";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { Section } from "@/components/layout/section";
import { useMagnetic } from "@/hooks/use-magnetic";
import { ArrowRight, MessageSquare, Rocket } from "lucide-react";

export function FinalCta() {
  const launchBtnRef = useMagnetic<HTMLButtonElement>();
  const demoBtnRef = useMagnetic<HTMLButtonElement>();

  return (
    <Section className="py-32 border-b border-border bg-background overflow-hidden relative flex items-center justify-center text-center">
      {/* Background visual components */}
      <div className="absolute top-[-30%] w-[600px] h-[600px] rounded-full bg-purple-accent/5 blur-[120px] pointer-events-none animate-aurora-1 z-0" />
      <div className="absolute bottom-[-30%] w-[500px] h-[500px] rounded-full bg-whatsapp/5 blur-[100px] pointer-events-none animate-aurora-2 z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Oversized concluding branding badge */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-whatsapp to-purple-accent flex items-center justify-center shadow-lg mx-auto mb-6 animate-pulse">
          <MessageSquare size={26} className="text-black" />
        </div>

        {/* Headline */}
        <div className="space-y-6">
          <Typography variant="h2" className="tracking-tight text-foreground leading-tight text-5xl md:text-7xl lg:text-[72px] font-extrabold">
            Ready to Transform Chats <br />
            Into{" "}
            <span className="bg-gradient-to-r from-whatsapp via-emerald-400 to-cyan-accent bg-clip-text text-transparent animate-gradient-scroll text-glow-green">
              Live Sales?
            </span>
          </Typography>
          <Typography variant="body" className="text-muted-foreground text-lg md:text-[20px] lg:text-[22px] max-w-2xl mx-auto leading-relaxed">
            Set up your storefront in minutes. Capture invoices natively, automate recovery alerts, and scale merchant revenue on WhatsApp today.
          </Typography>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6">
          <Link href="/signup" passHref className="w-full sm:w-auto">
            <Button
              ref={launchBtnRef}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto font-black text-black text-sm md:text-[18px] py-4 px-8 flex items-center justify-center gap-2 group shadow-2xl rounded-2xl"
            >
              <Rocket size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
              <span>Launch Your Store</span>
            </Button>
          </Link>
          <Link href="/book-demo" passHref className="w-full sm:w-auto">
            <Button
              ref={demoBtnRef}
              variant="glass"
              size="lg"
              className="w-full sm:w-auto text-sm md:text-[18px] py-4 px-8 flex items-center justify-center gap-2 border-border bg-secondary text-muted-foreground hover:text-foreground rounded-2xl"
            >
              <span>Book Calendar Demo</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5 shrink-0" />
            </Button>
          </Link>
        </div>

      </div>
    </Section>
  );
}
export default FinalCta;
