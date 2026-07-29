"use client";

import React, { useState } from "react";
import { Typography } from "@/components/shared/typography";
import { Card } from "@/components/shared/card";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import { Search, BookOpen, Terminal, Sparkles, Video, ArrowUpRight, HelpCircle } from "lucide-react";

interface ResourceItem {
  title: string;
  category: "docs" | "api" | "guides" | "cases" | "videos";
  categoryLabel: string;
  desc: string;
  readTime: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  accentColor: string;
}

const RESOURCES: ResourceItem[] = [
  {
    title: "Catalog Synchronization Protocol",
    category: "docs",
    categoryLabel: "Documentation",
    desc: "Connect inventory items database with webhook notifications directly to WhatsApp catalogs.",
    readTime: "8 min read",
    icon: BookOpen,
    accentColor: "text-purple-accent",
  },
  {
    title: "WhatsApp Checkout Ledger API Reference",
    category: "api",
    categoryLabel: "API Reference",
    desc: "Endpoints mapping parameters for cart metadata integrations, invoice triggers, and payment states.",
    readTime: "12 min read",
    icon: Terminal,
    accentColor: "text-cyan-accent",
  },
  {
    title: "How to Build a High-Converting QR Menu",
    category: "guides",
    categoryLabel: "Developer Guide",
    desc: "Step-by-step tutorial on generating localized QR layouts, tables mappings, and cart setups.",
    readTime: "6 min read",
    icon: Sparkles,
    accentColor: "text-whatsapp",
  },
  {
    title: "CoffeeBrand Inc scales WhatsApp revenue 40%",
    category: "cases",
    categoryLabel: "Case Study",
    desc: "How a multi-outlet coffee brand used AI recovery and catalog carts to bypass checkout leakage.",
    readTime: "5 min read",
    icon: ArrowUpRight,
    accentColor: "text-whatsapp",
  },
  {
    title: "Building AI Autopilot flows in under 5 minutes",
    category: "videos",
    categoryLabel: "Video Tutorial",
    desc: "A screen share walkthrough on configuring chatbot rules, slot bookings, and auto recoveries.",
    readTime: "4 min watch",
    icon: Video,
    accentColor: "text-purple-accent",
  },
  {
    title: "Stripe & Razorpay WhatsApp Integrations",
    category: "api",
    categoryLabel: "API Reference",
    desc: "Settle invoice checkout links directly inside buyer threads using standard payment gateway hooks.",
    readTime: "10 min read",
    icon: Terminal,
    accentColor: "text-cyan-accent",
  },
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredResources = RESOURCES.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-background text-foreground transition-colors duration-500">
      
      {/* 1. RESOURCES HERO & SEARCH */}
      <Section className="py-24 text-center relative overflow-hidden">
        <div className="absolute top-[-30%] w-[600px] h-[600px] rounded-full bg-cyan-accent/5 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-accent/30 bg-cyan-accent/10 text-cyan-accent text-xs font-bold uppercase tracking-wider mx-auto">
            <HelpCircle size={12} />
            <span>Resource Hub</span>
          </div>
          <Typography variant="h1" className="text-foreground font-extrabold tracking-tight text-5xl md:text-7xl lg:text-[72px] leading-tight">
            Knowledge Center. <br />
            <span className="bg-gradient-to-r from-whatsapp via-emerald-400 to-cyan-accent bg-clip-text text-transparent animate-gradient-scroll text-glow-green">
              Built for Developers.
            </span>
          </Typography>
          <Typography variant="body" className="text-muted-foreground text-lg md:text-[20px] lg:text-[22px] max-w-2xl mx-auto leading-relaxed">
            Browse documentation tutorials, API specs, developer guides, case studies, and checkout integrations.
          </Typography>

          {/* Interactive Search Bar Widget */}
          <div className="max-w-xl mx-auto relative flex items-center mt-8">
            <Search className="absolute left-4.5 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search guides, endpoints, or case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-secondary text-sm text-foreground placeholder-muted-foreground focus:border-cyan-accent/50 focus:shadow-[0_0_20px_rgba(0,212,255,0.15)] focus:outline-none transition-all duration-300"
            />
          </div>
        </div>
      </Section>

      {/* 2. FILTER TABS */}
      <Section className="py-4 border-y border-border bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-2">
          {[
            { id: "all", label: "All Resources" },
            { id: "docs", label: "Documentation" },
            { id: "api", label: "API References" },
            { id: "guides", label: "Developer Guides" },
            { id: "cases", label: "Case Studies" },
            { id: "videos", label: "Video Tutorials" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer select-none border",
                activeCategory === cat.id
                  ? "bg-background border-border text-foreground shadow-lg"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </Section>

      {/* 3. RESOURCES GRID DECK */}
      <Section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredResources.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={idx}
                    className="p-8 border border-border bg-secondary/30 glass-card rounded-[32px] relative overflow-hidden flex flex-col justify-between hover:border-foreground/15 transition-all duration-500 group cursor-pointer"
                  >
                    {/* Corner category indicator badge */}
                    <div className="flex justify-between items-center pb-6">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-secondary border border-border px-3 py-1 rounded-full">
                        {item.categoryLabel}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground font-mono">
                        {item.readTime}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                          <Icon size={16} className={item.accentColor} />
                        </div>
                        <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">
                          {item.title}
                        </Typography>
                      </div>
                      <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                        {item.desc}
                      </Typography>
                    </div>

                    {/* Bottom arrow hover reveal indicator */}
                    <div className="flex items-center gap-1 text-[11px] font-bold text-purple-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-6">
                      <span>Read Document</span>
                      <ArrowUpRight size={10} />
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 space-y-3">
              <Typography variant="body" className="text-muted-foreground text-lg font-bold">No resources found</Typography>
              <Typography variant="body" className="text-muted-foreground/60 text-sm">Try resetting filters or adjusting search queries.</Typography>
            </div>
          )}
        </div>
      </Section>

    </div>
  );
}
