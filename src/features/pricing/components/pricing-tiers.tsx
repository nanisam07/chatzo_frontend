"use client";

import React, { useState } from "react";
import { Typography } from "@/components/shared/typography";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";
import { useMagnetic } from "@/hooks/use-magnetic";

interface PriceItem {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  desc: string;
  features: string[];
  cta: string;
  popular?: boolean;
  accent?: string;
  glow?: string;
}

const PLANS: PriceItem[] = [
  {
    name: "Starter",
    monthlyPrice: 39,
    yearlyPrice: 27,
    desc: "For local storefronts launching conversational checkouts.",
    features: [
      "1 WhatsApp Number Connected",
      "5 Product Catalogs",
      "500 Completed Orders / mo",
      "Basic AI Cart Auto-Recovery",
      "Standard Conversion Charts",
      "Email support",
    ],
    cta: "Deploy Starter",
    accent: "border-purple-accent/20",
    glow: "rgba(124,58,237,0.08)",
  },
  {
    name: "Growth",
    monthlyPrice: 89,
    yearlyPrice: 62,
    desc: "For scaling storefronts and teams managing heavy volumes.",
    features: [
      "2 WhatsApp Numbers Connected",
      "25 Product Catalogs",
      "2,500 Completed Orders / mo",
      "Smart AI Assistant Chatbot Autopilot",
      "Advanced Live Conversion Charts",
      "Custom Branding & Domains",
    ],
    cta: "Scale Growth",
    popular: true,
    accent: "border-whatsapp/30",
    glow: "rgba(37,211,102,0.08)",
  },
  {
    name: "Enterprise",
    monthlyPrice: 249,
    yearlyPrice: 179,
    desc: "For high-volume retail hubs requiring custom systems and support.",
    features: [
      "Unlimited Catalogs",
      "Unlimited Orders",
      "Multi-agent Chat Dispatch Center",
      "Custom AI Insight Training",
      "Direct ERP & Stripe Ledger Syncs",
      "Dedicated account engineer",
    ],
    cta: "Deploy Enterprise",
    accent: "border-purple-accent/20",
    glow: "rgba(124,58,237,0.08)",
  },
];

export function PricingTiers() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");
  const starterBtnRef = useMagnetic<HTMLButtonElement>();
  const growthBtnRef = useMagnetic<HTMLButtonElement>();
  const enterpriseBtnRef = useMagnetic<HTMLButtonElement>();

  const getButtonRef = (name: string) => {
    if (name === "Starter") return starterBtnRef;
    if (name === "Growth") return growthBtnRef;
    return enterpriseBtnRef;
  };

  return (
    <Section className="py-28 border-b border-border bg-background overflow-hidden" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section Heading & Interactive Switch */}
        <div className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto">
          <div className="space-y-6">
            <Typography variant="h2" className="text-foreground font-bold tracking-tight text-4xl md:text-5xl lg:text-[56px] leading-tight">
              Honest Plans. Scaled for Velocity.
            </Typography>
            <Typography variant="body" className="text-muted-foreground text-lg md:text-[20px] lg:text-[22px] leading-relaxed">
              Deploy your conversational commerce storefront in under 10 minutes. Select your billing interval.
            </Typography>
          </div>

          {/* Interactive billing cycle toggle capsule */}
          <div className="relative p-1.5 rounded-full bg-secondary border border-border flex items-center gap-1 transition-all duration-300">
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

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto relative z-10">
          {PLANS.map((plan) => {
            const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            const btnRef = getButtonRef(plan.name);

            return (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col justify-between p-8 md:p-10 rounded-[32px] border bg-secondary/30 glass-card shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group",
                  plan.popular ? "border-whatsapp/30 shadow-[0_20px_50px_rgba(37,211,102,0.06)]" : "border-border"
                )}
              >
                {/* Spin border gradient animation for popular tier */}
                {plan.popular && (
                  <div className="absolute inset-0 rounded-[32px] border-[1.5px] border-transparent bg-gradient-to-r from-whatsapp via-purple-accent to-whatsapp bg-[size:200%_auto] animate-gradient-scroll opacity-40 -z-10" />
                )}

                {/* Internal card ambient spotlight glow */}
                <div
                  className="absolute top-[-25%] left-[-25%] w-[200px] h-[200px] rounded-full blur-[80px] pointer-events-none opacity-5 transition-all duration-500"
                  style={{ backgroundColor: plan.popular ? "#25D366" : "#7C3AED" }}
                />

                <div className="space-y-6 relative z-10">
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Typography variant="body" className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{plan.name}</Typography>
                      <p className="text-muted-foreground text-sm md:text-[18px] leading-relaxed max-w-[240px]">{plan.desc}</p>
                    </div>
                    {plan.popular && (
                      <span className="bg-whatsapp/15 text-whatsapp border border-whatsapp/20 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider flex items-center gap-1">
                        <Sparkles size={10} /> Popular
                      </span>
                    )}
                  </div>

                  {/* Pricing metrics counter (smooth text change) */}
                  <div className="flex items-baseline gap-1.5">
                    <Typography variant="h2" className="text-foreground font-black tracking-tight select-none text-4xl md:text-5xl lg:text-[60px]">
                      ${price}
                    </Typography>
                    <span className="text-sm text-muted-foreground font-semibold select-none">
                      / month
                    </span>
                  </div>

                  {/* Feature Checklists */}
                  <ul className="space-y-4 pt-6 border-t border-border">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-foreground/90 text-sm md:text-[16px]">
                        <div className={cn(
                          "w-5 h-5 rounded-md flex items-center justify-center shrink-0 border border-border",
                          plan.popular ? "bg-whatsapp/10 text-whatsapp border-whatsapp/10" : "bg-secondary text-muted-foreground"
                        )}>
                          <Check size={10} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary action trigger */}
                <div className="pt-8 mt-auto relative z-10">
                  <Button
                    ref={btnRef}
                    variant={plan.popular ? "primary" : "glass"}
                    size="lg"
                    className={cn(
                      "w-full text-sm md:text-[18px] py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2",
                      !plan.popular && "border-border bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span>{plan.cta}</span>
                  </Button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </Section>
  );
}
export default PricingTiers;
