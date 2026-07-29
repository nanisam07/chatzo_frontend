"use client";

import React, { useState, useEffect, useRef } from "react";
import { Typography } from "@/components/shared/typography";
import { Card } from "@/components/shared/card";
import { useInView } from "framer-motion";
import { Section } from "@/components/layout/section";
import { Globe, Users, DollarSign, MessageSquare, Award } from "lucide-react";

interface StatItem {
  id: string;
  label: string;
  endValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

const STATS: StatItem[] = [
  { id: "stores", label: "Active Stores", endValue: 8420, suffix: "+", icon: Globe },
  { id: "volume", label: "Volume Processed", endValue: 14.2, decimals: 1, prefix: "$", suffix: "M+", icon: DollarSign },
  { id: "conversion", label: "Avg Conversion", endValue: 94.2, suffix: "%", icon: Award },
  { id: "chats", label: "Satisfied Customers", endValue: 4.95, decimals: 2, suffix: "/5", icon: Users },
  { id: "network", label: "Global Node Hubs", endValue: 48, suffix: "+", icon: MessageSquare },
];

export function TrustedBusinesses() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [counts, setCounts] = useState<{ [key: string]: number }>({
    stores: 0,
    volume: 0,
    conversion: 0,
    chats: 0,
    network: 0,
  });

  // 1. Ticking Counter animation loop
  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quad
      const ease = progress * (2 - progress);

      const nextCounts: { [key: string]: number } = {};
      STATS.forEach((stat) => {
        nextCounts[stat.id] = stat.endValue * ease;
      });

      setCounts(nextCounts);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Clamp to exact end values
        const finalCounts: { [key: string]: number } = {};
        STATS.forEach((stat) => {
          finalCounts[stat.id] = stat.endValue;
        });
        setCounts(finalCounts);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView]);

  // 2. Pulsing Sales Network background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Coordinate nodes mapping representing global commerce hubs
    const nodes: { x: number; y: number; r: number; alpha: number; pulseDir: number; isFlashing: boolean; flashTimer: number }[] = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.5 + Math.random() * 2,
        alpha: 0.1 + Math.random() * 0.3,
        pulseDir: Math.random() > 0.5 ? 1 : -1,
        isFlashing: false,
        flashTimer: 0,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render lines connecting close coordinate nodes
      ctx.strokeStyle = "var(--border)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Render coordinate nodes pulsing
      nodes.forEach((n) => {
        // Chance to trigger a random flash checkout pulse
        if (!n.isFlashing && Math.random() < 0.001) {
          n.isFlashing = true;
          n.flashTimer = 0;
        }

        if (n.isFlashing) {
          n.flashTimer += 0.02;
          if (n.flashTimer >= Math.PI) {
            n.isFlashing = false;
            n.flashTimer = 0;
          }

          const pulse = Math.sin(n.flashTimer);
          ctx.save();
          ctx.globalAlpha = 0.2 + pulse * 0.8;
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#25D366";
          ctx.fillStyle = "#25D366";
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + pulse * 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Standard low opacity pulse
          n.alpha += n.pulseDir * 0.003;
          if (n.alpha >= 0.4) n.pulseDir = -1;
          if (n.alpha <= 0.1) n.pulseDir = 1;

          ctx.save();
          ctx.globalAlpha = n.alpha;
          ctx.fillStyle = "currentColor";
          ctx.strokeStyle = "transparent";
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <Section className="relative border-y border-border py-28 bg-background overflow-hidden" id="trusted">
      {/* Network Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 text-muted-foreground/10" />

      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center space-y-20">
        
        {/* Section Heading */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <Typography variant="h2" className="text-foreground font-bold tracking-tight text-4xl md:text-5xl lg:text-[56px] leading-tight">
            Trusted by Thousands of Hyper-Growth Stores.
          </Typography>
          <Typography variant="body" className="text-muted-foreground text-lg md:text-[20px] lg:text-[22px] leading-relaxed max-w-2xl mx-auto">
            Chatzo operates live node networks spanning across messaging channels, checkout pipelines, and merchant accounts. See the scale of operations.
          </Typography>
        </div>

        {/* 5-Column Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            const displayVal = counts[stat.id];
            
            return (
              <Card
                key={stat.id}
                className="p-8 border border-border glass-card shadow-xl flex flex-col items-center justify-center space-y-6 hover:border-whatsapp/20 transition-all duration-500 group"
              >
                {/* Glowing Circle Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center text-muted-foreground group-hover:text-whatsapp group-hover:border-whatsapp/30 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.15)] transition-all duration-500">
                  <Icon size={24} />
                </div>

                <div className="space-y-2 text-center">
                  <Typography variant="h3" className="text-foreground font-black tracking-tight select-none text-2xl md:text-3xl lg:text-[36px] xl:text-[40px] leading-none">
                    {stat.prefix}
                    {displayVal.toFixed(stat.decimals || 0)}
                    {stat.suffix}
                  </Typography>
                  <Typography variant="body" className="text-muted-foreground text-sm md:text-[16px] font-bold uppercase tracking-wider select-none leading-none pt-1">
                    {stat.label}
                  </Typography>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
export default TrustedBusinesses;
