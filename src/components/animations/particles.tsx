"use client";

import React, { useEffect, useRef } from "react";
import { useHeroStore } from "@/store/use-hero-store";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
  alpha: number;
  decay: number;
  gravity: number;
}

export function ParticleEmitter() {
  const { isOrderAccepted } = useHeroStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Reset trigger if order is not accepted
    if (!isOrderAccepted) {
      hasTriggeredRef.current = false;
      particlesRef.current = [];
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      return;
    }

    // Only burst once per checkout transaction
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to cover viewport
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Color palette: emerald green, gold, and vibrant purple
    const colors = ["#25D366", "#7C3AED", "#FFD700", "#00D4FF", "#10B981"];

    // Initialize 100 particles near the right center (around the phone area)
    const centerX = window.innerWidth * 0.7; // Approx phone position on desktop
    const centerY = window.innerHeight * 0.5;
    const count = 90;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 8;
      particlesRef.current.push({
        x: centerX + (Math.random() - 0.5) * 40,
        y: centerY + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2, // Upward bias
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: 1 + Math.random() * 3.5,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.015,
        gravity: 0.12,
      });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += p.gravity; // Apply gravity
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (particles.length > 0) {
        animationFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOrderAccepted]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-30"
    />
  );
}
export default ParticleEmitter;
