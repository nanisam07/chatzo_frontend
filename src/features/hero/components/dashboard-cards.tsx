"use client";

import React from "react";
import { useHeroStore } from "@/store/use-hero-store";
import { Card } from "@/components/shared/card";
import { Typography } from "@/components/shared/typography";
import { TrendingUp, MessageSquare, DollarSign, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardsProps {
  revenueRef?: React.RefObject<HTMLDivElement | null>;
  ordersRef?: React.RefObject<HTMLDivElement | null>;
  analyticsRef?: React.RefObject<HTMLDivElement | null>;
  aiRef?: React.RefObject<HTMLDivElement | null>;
}

export function DashboardCards({
  revenueRef,
  ordersRef,
  analyticsRef,
  aiRef,
}: DashboardCardsProps) {
  const { currentStep, isOrderAccepted, revenueProgress } = useHeroStore();

  // Scroll-synced metrics count-up
  const animatedRevenue = Math.floor(12450 + (12499 - 12450) * revenueProgress);
  const animatedOrders = Math.floor(384 + (385 - 384) * revenueProgress);

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      
      {/* 1. REVENUE CARD (Top Left) - Visible from step 8 */}
      <Card
        ref={revenueRef}
        className={cn(
          "absolute top-[10%] left-[-15%] w-[180px] p-4 border border-border shadow-2xl transition-all duration-500",
          currentStep >= 8
            ? "opacity-100 translate-y-0 scale-[1.03] border-whatsapp/30 shadow-[0_0_30px_rgba(37,211,102,0.1)] pointer-events-auto"
            : "opacity-0 translate-y-10 scale-95 pointer-events-none"
        )}
      >
        <div className="flex justify-between items-center text-muted-foreground">
          <Typography variant="small" className="text-[10px] tracking-wider font-semibold">Net Revenue</Typography>
          <div className="p-1 rounded-md bg-whatsapp/10 text-whatsapp">
            <DollarSign size={12} />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <Typography variant="h3" className="text-xl font-bold tracking-tight text-foreground">
            ${animatedRevenue.toLocaleString()}
          </Typography>
          <span className="text-[9px] text-whatsapp font-medium flex items-center">
            +18.4%
          </span>
        </div>
        <div className="mt-2 h-1 w-full bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-whatsapp rounded-full transition-all duration-1000" style={{ width: currentStep >= 8 ? "85%" : "70%" }} />
        </div>
      </Card>

      {/* 2. LIVE ORDERS CARD (Bottom Left) - Visible from step 7 */}
      <Card
        ref={ordersRef}
        className={cn(
          "absolute bottom-[8%] left-[-20%] w-[210px] p-4 border border-border shadow-2xl transition-all duration-500",
          currentStep >= 7
            ? "opacity-100 translate-y-0 scale-[1.02] border-purple-accent/40 shadow-[0_0_30px_rgba(124,58,237,0.1)] pointer-events-auto"
            : "opacity-0 translate-y-10 scale-95 pointer-events-none"
        )}
      >
        <div className="flex justify-between items-center border-b border-border pb-2 mb-2 text-muted-foreground">
          <Typography variant="small" className="text-[10px] tracking-wider font-semibold">Active Checkout Router</Typography>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-accent"></span>
          </span>
        </div>

        <div className="space-y-2">
          {/* Incoming Order Notification Alert */}
          {currentStep >= 7 && (
            <div className={cn(
              "p-2 rounded-xl border flex items-center justify-between transition-all duration-500 animate-slide-up",
              isOrderAccepted ? "bg-whatsapp/10 border-whatsapp/20 text-whatsapp" : "bg-purple-accent/10 border-purple-accent/20 text-purple-accent"
            )}>
              <div className="flex items-center gap-1.5 text-[9px]">
                <MessageSquare size={10} />
                <span className="font-medium truncate max-w-[80px]">Order #CZ-3849</span>
              </div>
              <span className="text-[8px] uppercase tracking-wider font-bold">
                {isOrderAccepted ? "Accepted" : "Incoming"}
              </span>
            </div>
          )}

          {/* Static Order List */}
          <div className="flex items-center justify-between text-[10px] opacity-60">
            <span className="text-foreground">Order #CZ-3848</span>
            <span className="text-muted-foreground font-medium">Completed</span>
          </div>
          <div className="flex items-center justify-between text-[10px] opacity-60">
            <span className="text-foreground">Order #CZ-3847</span>
            <span className="text-muted-foreground font-medium">Completed</span>
          </div>
        </div>
      </Card>

      {/* 3. ANALYTICS CHART CARD (Top Right) - Visible from step 8 */}
      <Card
        ref={analyticsRef}
        className={cn(
          "absolute top-[18%] right-[-18%] w-[190px] p-4 border border-border shadow-2xl transition-all duration-500",
          currentStep >= 8
            ? "opacity-100 translate-y-0 scale-100 border-cyan-accent/30 shadow-[0_0_30px_rgba(0,212,255,0.1)] pointer-events-auto"
            : "opacity-0 translate-y-10 scale-95 pointer-events-none"
        )}
      >
        <div className="flex justify-between items-center text-muted-foreground">
          <Typography variant="small" className="text-[10px] tracking-wider font-semibold">Total Conversions</Typography>
          <div className="p-1 rounded-md bg-cyan-accent/10 text-cyan-accent">
            <TrendingUp size={12} />
          </div>
        </div>
        <div className="mt-1">
          <Typography variant="h3" className="text-lg font-bold text-foreground">{animatedOrders}</Typography>
        </div>

        {/* Mock Sparkline SVG */}
        <div className="mt-3 h-10 w-full">
          <svg className="w-full h-full" viewBox="0 0 100 40">
            <defs>
              <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Background path fill */}
            <path
              className="fill-[url(#chart-glow)] transition-all duration-300"
              style={{ opacity: revenueProgress }}
              d="M0,35 Q15,25 30,30 T60,20 T80,10 T100,5 L100,40 L0,40 Z"
            />
            {/* Sparkline path */}
            <path
              fill="none"
              stroke="#00D4FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={150}
              strokeDashoffset={150 - revenueProgress * 150}
              className="transition-all duration-300"
              d="M0,35 Q15,25 30,30 T60,20 T80,10 T100,5"
            />
            {/* Glowing endpoint dot */}
            <circle
              cx="100"
              cy="5"
              r="3"
              fill="#00D4FF"
              className="transition-opacity duration-300"
              style={{ opacity: revenueProgress >= 0.95 ? 1 : 0 }}
            />
          </svg>
        </div>
      </Card>

      {/* 4. AI INSIGHTS CARD (Bottom Right) - Visible from step 8 */}
      <Card
        ref={aiRef}
        className={cn(
          "absolute bottom-[15%] right-[-15%] w-[200px] p-4 border border-border shadow-2xl transition-all duration-500",
          currentStep >= 8
            ? "opacity-100 translate-y-0 scale-100 border-purple-accent/30 shadow-[0_0_35px_rgba(124,58,237,0.15)] pointer-events-auto"
            : "opacity-0 translate-y-10 scale-95 pointer-events-none"
        )}
      >
        <div className="flex gap-2 items-start">
          <div className="p-1 rounded bg-purple-accent/15 text-purple-accent mt-0.5">
            <Brain size={12} className="animate-pulse" />
          </div>
          <div className="space-y-1">
            <Typography variant="small" className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">AI Conversion Optimization</Typography>
            <Typography variant="body" className="text-[10px] text-foreground font-medium leading-tight">
              {currentStep >= 8
                ? "Insight: Store checkout conversion increased by +3.4% this session."
                : "Checkout dropouts detected. Automated WhatsApp recovery triggered."}
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default DashboardCards;
