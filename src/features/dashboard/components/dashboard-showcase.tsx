"use client";

import React, { useState, useEffect } from "react";
import { Typography } from "@/components/shared/typography";
import { Card } from "@/components/shared/card";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Brain,
  Check,
  Zap,
  ArrowUpRight,
  Sparkles,
  Play,
  RotateCcw,
} from "lucide-react";

interface Order {
  id: string;
  name: string;
  items: string;
  amount: number;
  status: "incoming" | "approved";
  time: string;
}

export function DashboardShowcase() {
  const [revenue, setRevenue] = useState(12499);
  const [ordersCount, setOrdersCount] = useState(385);
  const [conversionRate, setConversionRate] = useState(94.2);
  const [aiActive, setAiActive] = useState(false);
  const [liveOrders, setLiveOrders] = useState<Order[]>([
    { id: "O-8426", name: "Sarah Connor", items: "1x Minimalist Flask", amount: 49.0, status: "incoming", time: "Just now" },
    { id: "O-8425", name: "David M.", items: "2x Nordic Coffee Cup", amount: 48.0, status: "approved", time: "3m ago" },
    { id: "O-8424", name: "Emily R.", items: "1x Matte Tumbler", amount: 35.0, status: "approved", time: "12m ago" },
  ]);

  // Simulate new incoming orders arriving automatically
  useEffect(() => {
    const names = ["Marcus A.", "Elena Rostova", "John Doe", "Sophia L.", "Kenji Tanaka"];
    const items = ["1x Minimalist Flask", "1x Nordic Coffee Cup", "2x Ceramic Mug", "1x Matte Tumbler"];
    const prices = [49.0, 24.0, 32.0, 35.0];

    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * names.length);
      const randomItemIdx = Math.floor(Math.random() * items.length);
      const newOrder: Order = {
        id: `O-${Math.floor(1000 + Math.random() * 9000)}`,
        name: names[randomIdx],
        items: items[randomItemIdx],
        amount: prices[randomItemIdx],
        status: "incoming",
        time: "Just now",
      };

      setLiveOrders((prev) => [newOrder, ...prev.slice(0, 4)]);
    }, 9000); // Trigger every 9 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle order approval and metric incrementing
  const approveOrder = (id: string, amount: number) => {
    setLiveOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "approved" as const, time: "Approved" } : o))
    );
    setRevenue((prev) => prev + amount);
    setOrdersCount((prev) => prev + 1);
    setConversionRate((prev) => Math.min(prev + 0.15, 99.8));
  };

  // Reset simulator stats
  const resetSimulator = () => {
    setRevenue(12499);
    setOrdersCount(385);
    setConversionRate(94.2);
    setAiActive(false);
    setLiveOrders([
      { id: "O-8426", name: "Sarah Connor", items: "1x Minimalist Flask", amount: 49.0, status: "incoming", time: "Just now" },
      { id: "O-8425", name: "David M.", items: "2x Nordic Coffee Cup", amount: 48.0, status: "approved", time: "3m ago" },
      { id: "O-8424", name: "Emily R.", items: "1x Matte Tumbler", amount: 35.0, status: "approved", time: "12m ago" },
    ]);
  };

  return (
    <Section className="py-28 border-b border-border bg-background" id="commerce">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl text-left">
            <Typography variant="h2" className="text-foreground font-bold tracking-tight text-4xl md:text-5xl lg:text-[56px] leading-tight">
              The Merchant Center. <br />Built for Real-Time Speed.
            </Typography>
            <Typography variant="body" className="text-muted-foreground text-lg md:text-[20px] lg:text-[22px] leading-relaxed">
              Explore your live dashboard simulator. Click **Approve** on incoming WhatsApp order requests to confirm checkout details and see metrics update.
            </Typography>
          </div>

          <div className="flex gap-3">
            <Button
              variant="glass"
              size="sm"
              onClick={resetSimulator}
              className="text-xs font-semibold flex items-center gap-1.5 hover:text-foreground border-border bg-secondary"
            >
              <RotateCcw size={12} />
              <span>Reset Sim</span>
            </Button>
          </div>
        </div>

        {/* Dashboard Frame (volumetric layout) */}
        <div className="relative w-full rounded-3xl border border-border glass-card shadow-2xl p-6 md:p-8 space-y-8 overflow-hidden transition-all duration-500">
          
          {/* Spotlight aura inside frame */}
          <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-purple-accent/[0.02] blur-[80px] pointer-events-none z-0" />
          
          {/* Dashboard Header Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {/* Stat 1: Revenue */}
            <Card className="p-5 border border-border space-y-2 hover:border-whatsapp/10 transition-all duration-300">
              <div className="flex justify-between items-center text-muted-foreground">
                <Typography variant="body" className="text-[10px] uppercase font-bold tracking-wider">Total Net Revenue</Typography>
                <div className="p-1 rounded bg-whatsapp/15 text-whatsapp"><TrendingUp size={12} /></div>
              </div>
              <div className="flex items-baseline gap-2">
                <Typography variant="h3" className="text-foreground font-bold tracking-tight">
                  ${revenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
                <span className="text-[10px] text-whatsapp font-bold flex items-center gap-0.5">
                  <ArrowUpRight size={10} /> +12.4%
                </span>
              </div>
            </Card>

            {/* Stat 2: Orders Count */}
            <Card className="p-5 border border-border space-y-2 hover:border-purple-accent/10 transition-all duration-300">
              <div className="flex justify-between items-center text-muted-foreground">
                <Typography variant="body" className="text-[10px] uppercase font-bold tracking-wider">Completed Orders</Typography>
                <div className="p-1 rounded bg-purple-accent/15 text-purple-accent"><ShoppingBag size={12} /></div>
              </div>
              <div className="flex items-baseline gap-2">
                <Typography variant="h3" className="text-foreground font-bold tracking-tight">
                  {ordersCount}
                </Typography>
                <span className="text-[10px] text-whatsapp font-bold flex items-center gap-0.5">
                  <ArrowUpRight size={10} /> +8.2%
                </span>
              </div>
            </Card>

            {/* Stat 3: Conversions */}
            <Card className="p-5 border border-border space-y-2 hover:border-cyan-accent/10 transition-all duration-300">
              <div className="flex justify-between items-center text-muted-foreground">
                <Typography variant="body" className="text-[10px] uppercase font-bold tracking-wider">Conversion Rate</Typography>
                <div className="p-1 rounded bg-cyan-accent/15 text-cyan-accent"><Typography variant="body" className="hidden">Users</Typography><Users size={12} /></div>
              </div>
              <div className="flex items-baseline gap-2">
                <Typography variant="h3" className="text-foreground font-bold tracking-tight">
                  {conversionRate.toFixed(2)}%
                </Typography>
                <span className="text-[10px] text-whatsapp font-bold flex items-center gap-0.5">
                  <ArrowUpRight size={10} /> +1.45%
                </span>
              </div>
            </Card>

            {/* Stat 4: AI Conversion recovery */}
            <Card className="p-5 border border-border space-y-2 hover:border-purple-accent/10 transition-all duration-300">
              <div className="flex justify-between items-center text-muted-foreground">
                <Typography variant="body" className="text-[10px] uppercase font-bold tracking-wider">AI Cart Recovery</Typography>
                <div className="p-1 rounded bg-purple-accent/15 text-purple-accent"><Brain size={12} /></div>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <Typography variant="body" className="text-[11px] font-semibold text-foreground">
                  {aiActive ? "Recovery Active" : "18 Abandoned detected"}
                </Typography>
                <button
                  onClick={() => setAiActive((prev) => !prev)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[9px] font-bold flex items-center gap-1 cursor-pointer transition-colors duration-300 border",
                    aiActive
                      ? "bg-purple-accent/20 border-purple-accent text-purple-accent shadow-[0_0_12px_rgba(124,58,237,0.2)]"
                      : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Zap size={10} />
                  <span>{aiActive ? "Running" : "Automate"}</span>
                </button>
              </div>
            </Card>
          </div>

          {/* Main Dashboard Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            {/* Left: Orders Pipeline simulation (Col span 7) */}
            <div className="lg:col-span-7 space-y-4">
              <Typography variant="body" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Live Incoming Checkout Pipeline</Typography>
              
              <div className="space-y-3">
                {liveOrders.map((order) => (
                  <Card
                    key={order.id}
                    className={cn(
                      "p-4 border flex items-center justify-between gap-4 transition-all duration-500",
                      order.status === "incoming"
                        ? "bg-whatsapp/[0.02] border-whatsapp/20 shadow-[0_4px_16px_rgba(37,211,102,0.02)]"
                        : "bg-secondary/40 border-border opacity-75"
                    )}
                  >
                    <div className="flex items-center gap-4 truncate">
                      {/* Active Status indicator */}
                      <div className="relative flex">
                        <span className={cn(
                          "w-2.5 h-2.5 rounded-full",
                          order.status === "incoming" ? "bg-whatsapp animate-ping" : "bg-neutral-600"
                        )} />
                        <span className={cn(
                          "absolute w-2.5 h-2.5 rounded-full",
                          order.status === "incoming" ? "bg-whatsapp" : "bg-neutral-600"
                        )} />
                      </div>

                      <div className="space-y-0.5 truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-foreground">{order.name}</span>
                          <span className="text-[8px] text-muted-foreground font-mono">{order.id}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate">{order.items}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs font-bold text-foreground">${order.amount.toFixed(2)}</span>
                      
                      {order.status === "incoming" ? (
                        <button
                          onClick={() => approveOrder(order.id, order.amount)}
                          className="px-3.5 py-1.5 rounded-xl bg-whatsapp hover:bg-[#20bd5a] text-black text-[9px] font-black cursor-pointer shadow-lg flex items-center gap-1 transition-colors duration-300"
                        >
                          <Play size={8} className="fill-black" />
                          <span>Approve</span>
                        </button>
                      ) : (
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1 bg-secondary border border-border px-2.5 py-1 rounded-lg">
                          <Check size={8} className="text-whatsapp" /> Approved
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right: Live Conversion Performance (Col span 5) */}
            <div className="lg:col-span-5 space-y-4">
              <Typography variant="body" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Live Sales Analytics</Typography>
              
              <Card className="p-6 border border-border space-y-6 flex flex-col justify-between h-[300px]">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <Typography variant="body" className="text-[10px] text-muted-foreground">Checkout Success Rate</Typography>
                    <Typography variant="h3" className="text-foreground font-bold leading-none">{conversionRate.toFixed(2)}%</Typography>
                  </div>
                  <span className="text-[8px] text-whatsapp font-bold bg-whatsapp/10 border border-whatsapp/15 px-2 py-0.5 rounded-lg flex items-center gap-0.5">
                    <Sparkles size={8} /> Optimal
                  </span>
                </div>

                {/* Conversion Performance chart */}
                <div className="h-32 w-full relative mt-4">
                  <svg className="w-full h-full" viewBox="0 0 200 80">
                    <defs>
                      <linearGradient id="db-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#25D366" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#25D366" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Fill */}
                    <path
                      fill="url(#db-glow)"
                      d="M0,70 Q40,65 80,60 T140,40 T200,20 L200,80 L0,80 Z"
                    />

                    {/* Chart line */}
                    <path
                      fill="none"
                      stroke="#25D366"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-1000"
                      d="M0,70 Q40,65 80,60 T140,40 T200,20"
                    />
                    
                    {/* Glowing coordinate dot */}
                    <circle cx="200" cy="20" r="3.5" fill="#25D366" className="animate-pulse" />
                  </svg>
                </div>

                <div className="text-[9px] text-muted-foreground text-center leading-relaxed">
                  Real-time synchronization between checkout events and analytics curves is active.
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
export default DashboardShowcase;
