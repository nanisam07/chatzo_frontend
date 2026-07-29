"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Typography } from "@/components/shared/typography";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import { Check, Sparkles, ArrowRight } from "lucide-react";

interface FeatureRow {
  name: string;
  starter: string | boolean;
  growth: string | boolean;
  enterprise: string | boolean;
}

const COMPARISONS: FeatureRow[] = [
  { name: "Active WhatsApp Numbers", starter: "1 Number", growth: "2 Numbers", enterprise: "Unlimited" },
  { name: "Product Catalogs", starter: "5 Catalogs", growth: "25 Catalogs", enterprise: "Unlimited" },
  { name: "Completed Orders / mo", starter: "500 Orders", growth: "2,500 Orders", enterprise: "Unlimited" },
  { name: "AI Assistant Autopilot", starter: false, growth: "Standard Bot", enterprise: "Custom Trained AI" },
  { name: "Stripe & ERP integrations", starter: "Manual", growth: "Standard Sync", enterprise: "Direct Sync" },
  { name: "Support Channels", starter: "Email Support", growth: "Priority Queue", enterprise: "Dedicated Engineer" },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");

  return (
    <div className="w-full bg-background text-foreground transition-colors duration-500">
      
      {/* 1. PRICING HERO & CARDS */}
      <Section className="py-24 text-center relative overflow-hidden">
        <div className="absolute top-[-30%] w-[600px] h-[600px] rounded-full bg-whatsapp/5 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-whatsapp/30 bg-whatsapp/10 text-whatsapp text-xs font-bold uppercase tracking-wider mx-auto">
            <Sparkles size={12} />
            <span>Honest Pricing</span>
          </div>
          <Typography variant="h1" className="text-foreground font-extrabold tracking-tight text-5xl md:text-7xl lg:text-[72px] leading-tight">
            Plans Built for <br />
            <span className="bg-gradient-to-r from-whatsapp via-emerald-400 to-cyan-accent bg-clip-text text-transparent animate-gradient-scroll text-glow-green">
              Every Scale of Business.
            </span>
          </Typography>
          <Typography variant="body" className="text-muted-foreground text-lg md:text-[20px] lg:text-[22px] max-w-2xl mx-auto leading-relaxed">
            Deploy your storefront catalog connection in under 10 minutes. Toggle billing interval to save.
          </Typography>

          {/* Interactive billing cycle toggle capsule */}
          <div className="relative p-1.5 rounded-full bg-secondary border border-border flex items-center gap-1 w-fit mx-auto mt-6">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer select-none",
                billingPeriod === "monthly"
                  ? "bg-background text-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer select-none flex items-center gap-1.5",
                billingPeriod === "yearly"
                  ? "bg-whatsapp text-black shadow-lg shadow-whatsapp/15"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>Yearly Saver</span>
              <span className="bg-black/10 text-[10px] px-1.5 py-0.5 rounded-full font-black uppercase">
                -30%
              </span>
            </button>
          </div>
        </div>
      </Section>

      {/* 2. PLANS CARDS GRID */}
      <Section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto relative z-10">
          
          {/* Plan 1: Starter */}
          <div className="relative flex flex-col justify-between p-8 md:p-10 rounded-[32px] border border-border bg-secondary/30 glass-card hover:border-purple-accent/20 transition-all duration-500">
            <div className="space-y-6">
              <Typography variant="body" className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Starter</Typography>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl md:text-5xl lg:text-[60px] font-black text-foreground">${billingPeriod === "monthly" ? 39 : 27}</span>
                <span className="text-xs text-muted-foreground">/ mo</span>
              </div>
              <p className="text-muted-foreground text-sm md:text-[18px]">For local storefronts launching conversational checkouts.</p>
              <ul className="space-y-4 pt-6 border-t border-border text-foreground/90 text-sm md:text-[16px]">
                <li className="flex items-center gap-3"><Check size={14} className="text-purple-accent" /> 1 WhatsApp Number</li>
                <li className="flex items-center gap-3"><Check size={14} className="text-purple-accent" /> 5 Product Catalogs</li>
                <li className="flex items-center gap-3"><Check size={14} className="text-purple-accent" /> 500 Completed Orders</li>
              </ul>
            </div>
            <Link href="/signup" className="pt-8 block">
              <Button variant="glass" size="lg" className="w-full text-sm md:text-[18px] py-3.5 border-border bg-secondary text-muted-foreground hover:text-foreground">Deploy Starter</Button>
            </Link>
          </div>

          {/* Plan 2: Growth */}
          <div className="relative flex flex-col justify-between p-8 md:p-10 rounded-[32px] border border-whatsapp/30 bg-secondary/30 glass-card shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
            <div className="absolute inset-0 rounded-[32px] border-[1.5px] border-transparent bg-gradient-to-r from-whatsapp via-purple-accent to-whatsapp bg-[size:200%_auto] animate-gradient-scroll opacity-40 -z-10" />
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <Typography variant="body" className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Growth</Typography>
                <span className="bg-whatsapp/15 text-whatsapp border border-whatsapp/20 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={10} /> Popular
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl md:text-5xl lg:text-[60px] font-black text-foreground">${billingPeriod === "monthly" ? 89 : 62}</span>
                <span className="text-xs text-muted-foreground">/ mo</span>
              </div>
              <p className="text-muted-foreground text-sm md:text-[18px]">For scaling storefronts managing heavy order volumes.</p>
              <ul className="space-y-4 pt-6 border-t border-border text-foreground/90 text-sm md:text-[16px]">
                <li className="flex items-center gap-3"><Check size={14} className="text-whatsapp" /> 2 WhatsApp Numbers</li>
                <li className="flex items-center gap-3"><Check size={14} className="text-whatsapp" /> 25 Product Catalogs</li>
                <li className="flex items-center gap-3"><Check size={14} className="text-whatsapp" /> 2,500 Completed Orders</li>
              </ul>
            </div>
            <Link href="/signup" className="pt-8 block">
              <Button variant="primary" size="lg" className="w-full text-sm md:text-[18px] py-3.5 text-black font-black">Scale Growth</Button>
            </Link>
          </div>

          {/* Plan 3: Enterprise */}
          <div className="relative flex flex-col justify-between p-8 md:p-10 rounded-[32px] border border-border bg-secondary/30 glass-card hover:border-purple-accent/20 transition-all duration-500">
            <div className="space-y-6">
              <Typography variant="body" className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Enterprise</Typography>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl md:text-5xl lg:text-[60px] font-black text-foreground">${billingPeriod === "monthly" ? 249 : 179}</span>
                <span className="text-xs text-muted-foreground">/ mo</span>
              </div>
              <p className="text-muted-foreground text-sm md:text-[18px]">For high-volume retail hubs requiring custom integrations.</p>
              <ul className="space-y-4 pt-6 border-t border-border text-foreground/90 text-sm md:text-[16px]">
                <li className="flex items-center gap-3"><Check size={14} className="text-purple-accent" /> Unlimited Numbers</li>
                <li className="flex items-center gap-3"><Check size={14} className="text-purple-accent" /> Unlimited Catalogs</li>
                <li className="flex items-center gap-3"><Check size={14} className="text-purple-accent" /> Direct Stripe Sync</li>
              </ul>
            </div>
            <Link href="/signup" className="pt-8 block">
              <Button variant="glass" size="lg" className="w-full text-sm md:text-[18px] py-3.5 border-border bg-secondary text-muted-foreground hover:text-foreground">Deploy Enterprise</Button>
            </Link>
          </div>

        </div>
      </Section>

      {/* 3. DETAILED FEATURES COMPARISON GRID */}
      <Section className="py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <Typography variant="h2" className="text-foreground font-bold text-center text-3xl md:text-4xl lg:text-[48px] tracking-tight">Compare Feature Details</Typography>
          
          <div className="border border-border rounded-[24px] bg-secondary/30 glass-card overflow-hidden shadow-2xl transition-all duration-500">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary text-muted-foreground font-bold uppercase tracking-wider text-[10px] md:text-xs">
                  <th className="p-5 md:p-6">Feature Profile</th>
                  <th className="p-5 md:p-6">Starter</th>
                  <th className="p-5 md:p-6">Growth</th>
                  <th className="p-5 md:p-6">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground/80 font-medium">
                {COMPARISONS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-secondary/40 transition-colors">
                    <td className="p-5 md:p-6 font-semibold text-foreground">{row.name}</td>
                    <td className="p-5 md:p-6">{typeof row.starter === "boolean" ? (row.starter ? "✓" : "-") : row.starter}</td>
                    <td className="p-5 md:p-6 text-whatsapp font-bold">{typeof row.growth === "boolean" ? (row.growth ? "✓" : "-") : row.growth}</td>
                    <td className="p-5 md:p-6">{typeof row.enterprise === "boolean" ? (row.enterprise ? "✓" : "-") : row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* 4. CONCLUDING PRICE CTA */}
      <Section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-8">
          <Typography variant="h2" className="text-foreground font-bold tracking-tight text-3xl md:text-5xl lg:text-[56px] leading-tight">
            Ready to Connect?
          </Typography>
          <div className="flex justify-center pt-2">
            <Link href="/signup" passHref>
              <Button variant="primary" size="lg" className="group text-sm md:text-[18px] py-3.5 px-7 rounded-2xl flex items-center gap-2 font-bold shadow-lg">
                <span>Start Free Trial</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>

    </div>
  );
}
