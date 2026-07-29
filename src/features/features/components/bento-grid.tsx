"use client";

import React, { useState, useEffect } from "react";
import { Typography } from "@/components/shared/typography";
import { Card } from "@/components/shared/card";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  Rocket,
  MessageSquare,
  Layers,
  TrendingUp,
  Brain,
  CheckCircle,
} from "lucide-react";

export function BentoGrid() {
  // 1. Commission slide state
  const [orderValue, setOrderValue] = useState(150);
  const shopifyFee = (orderValue * 0.12).toFixed(2);
  const amazonFee = (orderValue * 0.15).toFixed(2);

  // 2. Setup progress steps check loops
  const [setupStep, setSetupStep] = useState(1);
  const setupProgress = setupStep === 1 ? 33 : setupStep === 2 ? 66 : 100;

  // 3. AI assistant typing script loops
  const [aiMsg, setAiMsg] = useState("");
  const [aiTyping, setAiTyping] = useState(true);

  useEffect(() => {
    const fullMsg = "Automating checkout flow. Custom discount token dispatched to buyer.";
    let charIndex = 0;
    setAiTyping(true);
    setAiMsg("");

    const interval = setInterval(() => {
      if (charIndex < fullMsg.length) {
        setAiMsg((prev) => prev + fullMsg.charAt(charIndex));
        charIndex++;
      } else {
        setAiTyping(false);
        clearInterval(interval);
        // Loop back after delay
        setTimeout(() => {
          charIndex = 0;
          setAiMsg("");
          setAiTyping(true);
        }, 4000);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section className="py-28 border-b border-border bg-background" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Title Block */}
        <div className="space-y-6 max-w-3xl text-left">
          <Typography variant="h2" className="text-foreground font-bold tracking-tight text-4xl md:text-5xl lg:text-[56px] leading-tight">
            Why Choose Chatzo?
          </Typography>
          <Typography variant="body" className="text-muted-foreground text-lg md:text-[20px] lg:text-[22px] leading-relaxed max-w-2xl">
            A premium alternative to complex checkout systems. Tap on calculator inputs and checklist selectors to see how they work.
          </Typography>
        </div>

        {/* 3x2 Bento grid container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. Zero Commission Card */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-whatsapp/20 transition-all duration-500 group select-none">
            <div className="space-y-2.5 z-10">
              <div className="flex items-center gap-3 text-whatsapp">
                <DollarSign size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Zero Commission</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Save on platforms cuts. Keep 100% of order totals. Slide to compare fees.
              </Typography>
            </div>

            {/* Interactive fee calculator */}
            <div className="bg-secondary border border-border p-4 rounded-2xl space-y-3 z-10 text-xs font-mono">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Order Value: <span className="text-foreground font-bold">${orderValue}</span></span>
                <input
                  type="range"
                  min="20"
                  max="500"
                  value={orderValue}
                  onChange={(e) => setOrderValue(Number(e.target.value))}
                  className="w-28 accent-whatsapp h-1 bg-border rounded-lg cursor-pointer"
                />
              </div>
              <div className="space-y-1.5 border-t border-border pt-2">
                <div className="flex justify-between text-red-400">
                  <span>Shopify Cut (12%):</span>
                  <span>-${shopifyFee}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Amazon Cut (15%):</span>
                  <span>-${amazonFee}</span>
                </div>
                <div className="flex justify-between text-whatsapp font-bold border-t border-border pt-1.5 mt-1.5">
                  <span>Chatzo Fee (0%):</span>
                  <span>$0.00 Saved!</span>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-whatsapp/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

          {/* 2. Launch in Minutes Card */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-purple-accent/20 transition-all duration-500 group select-none">
            <div className="space-y-2.5 z-10">
              <div className="flex items-center gap-3 text-purple-accent">
                <Rocket size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Launch in Minutes</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Connect and configure in clicks. Tap steps to simulate launch pipeline.
              </Typography>
            </div>

            {/* Steps checklist simulator */}
            <div className="bg-secondary border border-border p-4 rounded-2xl space-y-3 z-10 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Launch Pipeline:</span>
                <span className="text-purple-accent font-bold">{setupProgress}% Complete</span>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-border">
                <button
                  onClick={() => setSetupStep(1)}
                  className={cn(
                    "w-full p-2 rounded-lg text-left flex items-center justify-between border cursor-pointer transition-all",
                    setupStep >= 1 ? "bg-purple-accent/10 border-purple-accent/20 text-foreground" : "border-border bg-transparent text-muted-foreground"
                  )}
                >
                  <span>1. Connect Business API</span>
                  {setupStep >= 1 && <CheckCircle size={10} />}
                </button>
                <button
                  onClick={() => setSetupStep(2)}
                  className={cn(
                    "w-full p-2 rounded-lg text-left flex items-center justify-between border cursor-pointer transition-all",
                    setupStep >= 2 ? "bg-purple-accent/10 border-purple-accent/20 text-foreground" : "border-border bg-transparent text-muted-foreground"
                  )}
                >
                  <span>2. Upload Storefront CSV</span>
                  {setupStep >= 2 && <CheckCircle size={10} />}
                </button>
                <button
                  onClick={() => setSetupStep(3)}
                  className={cn(
                    "w-full p-2 rounded-lg text-left flex items-center justify-between border cursor-pointer transition-all",
                    setupStep >= 3 ? "bg-purple-accent/10 border-purple-accent/20 text-foreground" : "border-border bg-transparent text-muted-foreground"
                  )}
                >
                  <span>3. Dispatch Chat Link</span>
                  {setupStep >= 3 && <CheckCircle size={10} />}
                </button>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

          {/* 3. Your Own WhatsApp Card */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-whatsapp/20 transition-all duration-500 group select-none">
            <div className="space-y-2.5 z-10">
              <div className="flex items-center gap-3 text-whatsapp">
                <MessageSquare size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Your Own WhatsApp</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Retain customer relationships on your number. Verified business integrations.
              </Typography>
            </div>

            {/* Mock chat header and profile card */}
            <div className="bg-secondary border border-border p-4 rounded-2xl flex gap-3.5 items-center z-10">
              <div className="w-10 h-10 rounded-full bg-whatsapp/10 border border-whatsapp/20 flex items-center justify-center text-whatsapp font-bold text-xs shrink-0 animate-pulse">
                CS
              </div>
              <div className="space-y-1 truncate text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-foreground">Coffee Store</span>
                  <span className="w-3.5 h-3.5 bg-whatsapp rounded-full flex items-center justify-center text-black text-[8px] font-bold">✓</span>
                </div>
                <div className="text-[10px] text-muted-foreground truncate">Official Business Number Connected</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-whatsapp/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

          {/* 4. Live Dashboard Card */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-cyan-accent/20 transition-all duration-500 group select-none">
            <div className="space-y-2.5 z-10">
              <div className="flex items-center gap-3 text-cyan-accent">
                <Layers size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Live Dashboard</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Manage orders, configure stock limits, and accept checkouts in real time.
              </Typography>
            </div>

            {/* Mini active orders queue indicator */}
            <div className="bg-secondary border border-border p-3.5 rounded-2xl space-y-2 z-10 text-xs font-mono">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Incoming Queue:</span>
                <span className="w-2 h-2 rounded-full bg-whatsapp animate-ping" />
              </div>
              <div className="p-2 rounded-lg bg-border border border-border flex items-center justify-between text-foreground">
                <span>Order #8426</span>
                <span className="text-whatsapp font-bold">$49.00</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

          {/* 5. Smart Analytics Card */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-cyan-accent/20 transition-all duration-500 group select-none">
            <div className="space-y-2.5 z-10">
              <div className="flex items-center gap-3 text-cyan-accent">
                <TrendingUp size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Smart Analytics</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Graph metrics, checkout leakages, and track active conversion rates.
              </Typography>
            </div>

            {/* Radial circular conversion chart */}
            <div className="flex items-center justify-between bg-secondary border border-border p-4 rounded-2xl z-10">
              <div className="space-y-1">
                <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">Conversion</span>
                <div className="text-sm font-bold text-foreground">98.4% Peak</div>
              </div>
              
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full -rotate-95" viewBox="0 0 36 36">
                  <path
                    className="text-muted-foreground/10"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-cyan-accent stroke-dasharray transition-all duration-1000 ease-out"
                    strokeWidth="3.5"
                    strokeDasharray="98, 100"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-[9px] font-bold text-foreground">98%</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

          {/* 6. AI Assisted Commerce Card */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-purple-accent/20 transition-all duration-500 group select-none">
            <div className="space-y-2.5 z-10">
              <div className="flex items-center gap-3 text-purple-accent">
                <Brain size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">AI Assisted Commerce</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Automated catalog recommendations and checkout recovery alerts.
              </Typography>
            </div>

            {/* AI message bubble simulation */}
            <div className="bg-secondary border border-border p-3 rounded-2xl space-y-1.5 z-10 text-xs font-mono text-left">
              <div className="text-purple-accent font-bold">AI assistant:</div>
              <div className="text-foreground min-h-[40px] leading-relaxed text-[11px]">
                {aiMsg}
                {aiTyping && <span className="animate-pulse">|</span>}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

        </div>
      </div>
    </Section>
  );
}
export default BentoGrid;
