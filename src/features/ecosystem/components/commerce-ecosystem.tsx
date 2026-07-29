"use client";

import React, { useState } from "react";
import { Typography } from "@/components/shared/typography";
import { Card } from "@/components/shared/card";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import {
  Users,
  ShoppingBag,
  MessageSquare,
  Zap,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface NodeItem {
  id: number;
  label: string;
  desc: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  color: string;
  shadow: string;
}

const NODES: NodeItem[] = [
  {
    id: 1,
    label: "Customer Connection",
    desc: "Buyers land on high-speed catalog storefronts directly through QR codes or ads.",
    icon: Users,
    color: "rgba(124, 58, 237, 0.4)", // Purple
    shadow: "rgba(124, 58, 237, 0.15)",
  },
  {
    id: 2,
    label: "Digital storefront",
    desc: "A responsive catalog app lets customers browse products, select specs, and pack carts.",
    icon: ShoppingBag,
    color: "rgba(0, 212, 255, 0.4)", // Cyan
    shadow: "rgba(0, 212, 255, 0.15)",
  },
  {
    id: 3,
    label: "WhatsApp Commerce",
    desc: "Carts format automatically into WhatsApp chat logs, preserving customer relationship numbers.",
    icon: MessageSquare,
    color: "rgba(37, 211, 102, 0.4)", // WhatsApp Green
    shadow: "rgba(37, 211, 102, 0.15)",
  },
  {
    id: 4,
    label: "Merchant Center",
    desc: "Incoming chat orders land live in the merchant dashboard, allowing instant order approvals.",
    icon: Zap,
    color: "rgba(124, 58, 237, 0.4)", // Purple
    shadow: "rgba(124, 58, 237, 0.15)",
  },
  {
    id: 5,
    label: "Live Analytics Sync",
    desc: "Approved orders update metrics counters, revenue sparklines, and active inventory levels.",
    icon: TrendingUp,
    color: "rgba(0, 212, 255, 0.4)", // Cyan
    shadow: "rgba(0, 212, 255, 0.15)",
  },
  {
    id: 6,
    label: "Growth Trigger",
    desc: "Triggers automated recovery scripts and increases bottom-line sales.",
    icon: Sparkles,
    color: "rgba(255, 215, 0, 0.4)", // Gold
    shadow: "rgba(255, 215, 0, 0.15)",
  },
];

export function CommerceEcosystem() {
  const [activeNode, setActiveNode] = useState<number>(3); // WhatsApp active by default

  return (
    <Section className="py-28 border-b border-border bg-background overflow-hidden" id="ecosystem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Title Heading */}
        <div className="space-y-6 max-w-3xl text-left">
          <Typography variant="h2" className="text-foreground font-bold tracking-tight text-4xl md:text-5xl lg:text-[56px] leading-tight">
            The Commerce Ecosystem. <br />Completely Connected.
          </Typography>
          <Typography variant="body" className="text-muted-foreground text-lg md:text-[20px] lg:text-[22px] leading-relaxed max-w-2xl">
            Watch how data and cash flow through the platform. Click on any node block to trace details.
          </Typography>
        </div>

        {/* Ecosystem visual map */}
        <div className="relative w-full py-16 flex flex-col md:flex-row justify-between items-center gap-8 z-10">
          
          {/* Animated connections SVG line backdrop (hidden on mobile layout stacks) */}
          <div className="absolute inset-0 w-full h-full hidden md:block z-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1000 120" preserveAspectRatio="none">
              {/* Static background path */}
              <path
                fill="none"
                stroke="currentColor"
                className="text-muted-foreground/10"
                strokeWidth="1.5"
                d="M 50,60 L 950,60"
              />
              {/* Glowing active path carrying data pulses */}
              <path
                fill="none"
                stroke="url(#glow-gradient)"
                strokeWidth="2"
                strokeDasharray="25 75"
                className="animate-glow-trail"
                d="M 50,60 L 950,60"
              />
              
              <defs>
                <linearGradient id="glow-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#25D366" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Node columns rendering */}
          {NODES.map((node) => {
            const Icon = node.icon;
            const isActive = activeNode === node.id;

            return (
              <div
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                className="relative z-10 flex flex-col items-center cursor-pointer group"
              >
                {/* Node glowing ring frame */}
                <div
                  className={cn(
                    "w-20 h-20 rounded-[24px] border flex items-center justify-center transition-all duration-500",
                    isActive
                      ? "bg-secondary border-border text-foreground"
                      : "bg-secondary/40 border-border text-muted-foreground group-hover:text-foreground group-hover:border-border"
                  )}
                  style={{
                    borderColor: isActive ? node.color : undefined,
                    boxShadow: isActive ? `0 0 30px ${node.shadow}` : undefined,
                  }}
                >
                  <Icon size={26} className={cn("transition-transform duration-300 group-hover:scale-110", isActive && "text-foreground")} />
                </div>

                {/* Node text identifier */}
                <span
                  className={cn(
                    "text-xs md:text-sm font-bold uppercase tracking-wider mt-4 transition-colors duration-300",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  {node.label.split(" ")[0]}
                </span>

                {/* Connector dot for mobile vertical layout stacks */}
                <div className="w-1.5 h-6 bg-border block md:hidden mt-2" />
              </div>
            );
          })}
        </div>

        {/* Selected Node Details Box (glowing card) */}
        <Card
          className="p-8 md:p-10 border border-border glass-card shadow-2xl relative overflow-hidden transition-all duration-500 max-w-2xl mx-auto rounded-[32px]"
          style={{
            borderColor: NODES[activeNode - 1].color,
            boxShadow: `0 0 45px ${NODES[activeNode - 1].shadow}`,
          }}
        >
          {/* Subtle background glow block inside card */}
          <div
            className="absolute top-[-50%] left-[-50%] w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none opacity-10 transition-all duration-500"
            style={{ backgroundColor: NODES[activeNode - 1].color }}
          />

          <div className="space-y-4 relative z-10 text-center">
            <Typography variant="body" className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
              Step 0{activeNode} of Ecosystem
            </Typography>
            <Typography variant="h3" className="text-foreground font-bold tracking-tight text-xl md:text-[24px] lg:text-[28px]">
              {NODES[activeNode - 1].label}
            </Typography>
            <Typography variant="body" className="text-foreground/80 text-sm md:text-[18px] leading-relaxed max-w-lg mx-auto">
              {NODES[activeNode - 1].desc}
            </Typography>
          </div>
        </Card>

      </div>

      {/* Global CSS injection for glowing ecosystem dash path lines */}
      <style jsx global>{`
        @keyframes glow-trail {
          0% { strokeDashoffset: 1000; }
          100% { strokeDashoffset: 0; }
        }
        .animate-glow-trail {
          animation: glow-trail 15s linear infinite;
        }
      `}</style>
    </Section>
  );
}
export default CommerceEcosystem;
