"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Layers,
  Brain,
  ShoppingBag,
  TrendingUp,
  Sliders,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface FeatureDetail {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  accentColor: string;
}

const DETAILS: FeatureDetail[] = [
  { id: "chat", title: "Conversation Commerce", desc: "Browse products, configure variants, and checkout natively—all inside WhatsApp chat conversations.", icon: MessageSquare, accentColor: "text-whatsapp" },
  { id: "dash", title: "Merchant Dashboard", desc: "Manage incoming WhatsApp order requests in real time. Approve details, sync logs, and track sales.", icon: Layers, accentColor: "text-purple-accent" },
  { id: "ai", title: "AI Assistant Autopilot", desc: "Automate catalog inquiries, recommend items based on buyer preferences, and recover abandoned carts.", icon: Brain, accentColor: "text-cyan-accent" },
  { id: "catalog", title: "WhatsApp Catalogs", desc: "Create high-speed visual catalogs connected directly to your business inventory stock levels.", icon: ShoppingBag, accentColor: "text-whatsapp" },
  { id: "analytics", title: "Sales Analytics", desc: "Track conversions, net revenue growth curves, and catalog click rates reactively.", icon: TrendingUp, accentColor: "text-purple-accent" },
  { id: "inventory", title: "Merchant Inventory", desc: "Verify serial numbers, manage stock limits, and automate re-order alerts.", icon: Sliders, accentColor: "text-cyan-accent" },
];

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState("chat");

  const activeDetail = DETAILS.find((f) => f.id === selectedFeature) || DETAILS[0];

  return (
    <div className="w-full bg-background text-foreground transition-colors duration-500">
      
      {/* 1. FEATURES HERO */}
      <Section className="py-24 text-center relative overflow-hidden">
        <div className="absolute top-[-30%] w-[600px] h-[600px] rounded-full bg-purple-accent/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-accent/30 bg-purple-accent/10 text-purple-accent text-xs font-bold uppercase tracking-wider mx-auto">
            <Sparkles size={12} />
            <span>Capability Center</span>
          </div>
          <Typography variant="h1" className="text-foreground font-extrabold tracking-tight text-5xl md:text-7xl lg:text-[72px] leading-tight">
            Features Built for <br />
            <span className="bg-gradient-to-r from-whatsapp via-emerald-400 to-cyan-accent bg-clip-text text-transparent animate-gradient-scroll text-glow-green">
              High-Velocity Commerce.
            </span>
          </Typography>
          <Typography variant="body" className="text-muted-foreground text-lg md:text-[20px] lg:text-[22px] max-w-2xl mx-auto leading-relaxed">
            From conversational checkout links to AI recovery, explore how Chatzo optimizes transaction performance.
          </Typography>
        </div>
      </Section>

      {/* 2. INTERACTIVE FEATURE OVERVIEW */}
      <Section className="py-16 border-y border-border bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: List Selector */}
          <div className="lg:col-span-5 space-y-4">
            {DETAILS.map((f) => {
              const Icon = f.icon;
              const isSelected = selectedFeature === f.id;

              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFeature(f.id)}
                  className={cn(
                    "w-full p-6 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 cursor-pointer",
                    isSelected
                      ? "bg-secondary border-border text-foreground"
                      : "border-transparent bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  )}
                >
                  <Icon size={22} className={cn("mt-0.5 shrink-0", isSelected ? f.accentColor : "text-muted-foreground")} />
                  <div className="space-y-1">
                    <Typography variant="body" className="font-bold text-base md:text-[18px]">{f.title}</Typography>
                    <Typography variant="body" className="text-xs text-muted-foreground leading-relaxed">{f.desc.slice(0, 80)}...</Typography>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Preview Card */}
          <div className="lg:col-span-7">
            <Card className="p-8 md:p-10 border border-border glass-card rounded-[32px] space-y-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
              
              {/* Decorative background glow */}
              <div className="absolute top-[-40%] left-[-40%] w-[300px] h-[300px] rounded-full bg-whatsapp/5 blur-[80px] pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-whatsapp shadow">
                    {React.createElement(activeDetail.icon, { size: 20 })}
                  </div>
                  <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">
                    {activeDetail.title}
                  </Typography>
                </div>
                <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                  {activeDetail.desc}
                </Typography>
              </div>

              {/* Dynamic UI Previews based on selection */}
              <div className="bg-secondary border border-border p-5 rounded-2xl space-y-3 z-10 text-xs font-mono">
                {selectedFeature === "chat" && (
                  <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2 text-muted-foreground border-b border-border pb-1.5">
                      <span className="w-2 h-2 rounded-full bg-whatsapp animate-ping" />
                      <span>WhatsApp Checkout Flow</span>
                    </div>
                    <div className="space-y-1.5 text-[11px] text-foreground/90">
                      <div><span className="text-whatsapp">Customer:</span> I want the Matte Black flask.</div>
                      <div><span className="text-purple-accent">AI:</span> Selected Matte Black. Invoice sent to your cart link.</div>
                      <div className="p-1.5 rounded bg-background border border-border flex justify-between">
                        <span>Invoice #843</span>
                        <span className="text-whatsapp font-bold">$49.00</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedFeature === "dash" && (
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center text-muted-foreground border-b border-border pb-1.5">
                      <span>Live Order Interceptor</span>
                      <span className="text-purple-accent font-bold">Active</span>
                    </div>
                    <div className="p-1.5 rounded bg-purple-accent/5 border border-purple-accent/10 flex justify-between items-center text-foreground/90">
                      <span>Order #9382 Connor</span>
                      <button className="bg-whatsapp text-black px-2 py-0.5 rounded font-black text-[9px] cursor-pointer">APPROVE</button>
                    </div>
                  </div>
                )}

                {selectedFeature === "ai" && (
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center text-muted-foreground border-b border-border pb-1.5">
                      <span>Cart Abandonment Recovery</span>
                      <span className="text-cyan-accent font-bold">Alert Triggered</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground italic">
                      &ldquo;Automatic invoice recovery check: 10% coupon dispatched to buyer chat.&rdquo;
                    </div>
                  </div>
                )}

                {selectedFeature === "catalog" && (
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center text-muted-foreground border-b border-border pb-1.5">
                      <span>High-Speed Catalog Preview</span>
                      <span className="text-whatsapp font-bold">Sync: Ok</span>
                    </div>
                    <div className="flex gap-2">
                      {["Lilac", "Onyx", "Opal"].map((c) => (
                        <div key={c} className="flex-1 py-1 text-center bg-background border border-border rounded text-[10px] text-foreground">
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedFeature === "analytics" && (
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center text-muted-foreground border-b border-border pb-1.5">
                      <span>Analytics Metrics</span>
                      <span className="text-whatsapp font-bold">+12% Conversion</span>
                    </div>
                    <div className="w-full h-8 flex items-end gap-1 pt-1.5">
                      {[30, 45, 60, 40, 80, 95, 70].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-whatsapp to-purple-accent rounded-t" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                )}

                {selectedFeature === "inventory" && (
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center text-muted-foreground border-b border-border pb-1.5">
                      <span>Inventory Limits</span>
                      <span className="text-red-400 font-bold">Refill Alert</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Coffee Drip Cups</span>
                      <span className="text-red-400 font-bold font-mono">4 items left</span>
                    </div>
                  </div>
                )}

              </div>
            </Card>
          </div>

        </div>
      </Section>

      {/* 3. CAPABILITY CONVERT CTA */}
      <Section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-8">
          <Typography variant="h2" className="text-foreground font-bold tracking-tight text-3xl md:text-5xl lg:text-[56px] leading-tight">
            Ready to Connect?
          </Typography>
          <Typography variant="body" className="text-muted-foreground text-lg md:text-[20px] lg:text-[22px] leading-relaxed">
            Set up your high-speed WhatsApp storefront connection catalog in under 10 minutes.
          </Typography>
          <div className="flex justify-center pt-2">
            <Link href="/signup" passHref>
              <Button variant="primary" size="lg" className="group text-sm md:text-[18px] py-3.5 px-7 rounded-2xl flex items-center gap-2 font-bold shadow-lg">
                <span>Configure Workspace</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>

    </div>
  );
}
