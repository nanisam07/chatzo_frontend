"use client";

import React from "react";
import Link from "next/link";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { PhoneMockup } from "./phone-mockup";
import { DashboardCards } from "./dashboard-cards";
import { ParticleEmitter } from "@/components/animations/particles";
import { useMagnetic } from "@/hooks/use-magnetic";
import { useHeroAnimation } from "@/hooks/use-hero-animation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroLayout() {
  const {
    containerRef,
    triggerRef,
    bgBrandingRef,
    chaptersRef,
    phoneRef,
    revenueCardRef,
    ordersCardRef,
    analyticsCardRef,
    aiCardRef,
  } = useHeroAnimation();

  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX - innerWidth / 2) / (innerWidth / 2)) * 15;
      const y = ((e.clientY - innerHeight / 2) / (innerHeight / 2)) * -15;
      setTilt({ x: y, y: x });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const primaryBtnRef = useMagnetic<HTMLButtonElement>();
  const secondaryBtnRef = useMagnetic<HTMLButtonElement>();

  return (
    // containerRef = outer hero div. GSAP ScrollTrigger watches this as the trigger zone.
    <div
      ref={containerRef}
      className="relative w-full bg-background text-foreground z-10"
      id="home"
    >
      {/* triggerRef = pinned viewport */}
      <div
        ref={triggerRef}
        className="w-full h-screen flex items-center justify-center overflow-hidden z-10 relative transition-colors duration-500"
      >
        {/* Canvas particles burst container */}
        <ParticleEmitter />

        {/* Dynamic auroras ambient lights */}
        <div
          className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[140px] pointer-events-none animate-aurora-1 opacity-20 transition-colors duration-500"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 80%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full blur-[120px] pointer-events-none animate-aurora-2 opacity-15 transition-colors duration-500"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 80%)",
          }}
        />

        {/* Tech Grid overlay */}
        <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

        {/* ==================== 1. OVERSIZED BACKGROUND PARALLAX BRANDING ==================== */}
        <div
          ref={bgBrandingRef}
          className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 overflow-hidden will-change-transform"
        >
          <div className="absolute text-[24vw] font-black tracking-tighter leading-none dark:text-white/[0.01] text-slate-900/[0.02] uppercase top-[20%] select-none">
            CHATZO
          </div>
        </div>

        {/* ==================== 2. FOREGROUND TWO-COLUMN DECK ==================== */}
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row gap-8 lg:gap-16 justify-between items-center px-6 sm:px-10 z-10 relative">
          
          {/* FLOATING GLASS COPY CAPSULE (Left Side) */}
          <div className="w-full max-w-[500px] p-6 sm:p-8 md:p-10 rounded-[32px] glass-card z-30 select-none shrink-0 self-center border border-border/80 shadow-2xl transition-all duration-500 bg-background/60 backdrop-blur-xl">
            <div ref={chaptersRef} className="w-full min-h-[460px] lg:min-h-[500px] relative flex flex-col justify-center">
              
              {/* SCENE 1: Discover */}
              <div className="absolute inset-0 flex flex-col justify-center space-y-5 text-left pointer-events-auto">
                <Typography
                  variant="h2"
                  className="font-extrabold tracking-tight leading-[1.08] flex flex-col gap-1 text-[36px] sm:text-[44px] lg:text-[52px]"
                  style={{ color: "var(--foreground)" }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                  >
                    Transform Chats
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.15,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                  >
                    Into{" "}
                    <span className="bg-gradient-to-r from-whatsapp via-emerald-400 to-cyan-accent bg-clip-text text-transparent animate-gradient-scroll text-glow-green">
                      Live Sales.
                    </span>
                  </motion.span>
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                >
                  Transform customer conversations into instant sales. Set up
                  digital storefronts, capture orders, manage payments and grow
                  your business—all through WhatsApp.
                </Typography>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/signup" passHref className="w-full sm:w-auto">
                    <Button
                      ref={primaryBtnRef}
                      variant="primary"
                      size="lg"
                      className="group text-sm md:text-base py-3 px-6 rounded-[14px] w-full flex items-center justify-center gap-2"
                    >
                      <span>Start Free Trial</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Button>
                  </Link>
                  <Link href="/book-demo" passHref className="w-full sm:w-auto">
                    <Button
                      ref={secondaryBtnRef}
                      variant="glass"
                      size="lg"
                      className="text-sm md:text-base py-3 px-6 rounded-[14px] w-full flex items-center justify-center gap-2"
                    >
                      <span>Book Demo</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* SCENE 2: Browse */}
              <div className="absolute inset-0 flex flex-col justify-center space-y-5 text-left opacity-0 pointer-events-none">
                <Typography
                  variant="h3"
                  className="text-foreground font-bold leading-tight text-2xl md:text-[28px] lg:text-[32px] tracking-tight"
                >
                  Explore Premium <br />
                  Catalogs Natively.
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                >
                  Buyers navigate high-speed store catalogs rendered cleanly on
                  their phones. Zero latency, rich designs, and zero friction.
                </Typography>
              </div>

              {/* SCENE 3: Choose */}
              <div className="absolute inset-0 flex flex-col justify-center space-y-5 text-left opacity-0 pointer-events-none">
                <Typography
                  variant="h3"
                  className="text-foreground font-bold leading-tight text-2xl md:text-[28px] lg:text-[32px] tracking-tight"
                >
                  Select Specifications <br />
                  and Quantities.
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                >
                  Enable customers to configure product options, sizes, and
                  quantities in one tap. Intuitive selectors package their
                  preferences.
                </Typography>
              </div>

              {/* SCENE 4: Cart */}
              <div className="absolute inset-0 flex flex-col justify-center space-y-5 text-left opacity-0 pointer-events-none">
                <Typography
                  variant="h3"
                  className="text-foreground font-bold leading-tight text-2xl md:text-[28px] lg:text-[32px] tracking-tight"
                >
                  Shopping Bags <br />
                  Update in Real Time.
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                >
                  Adding to cart triggers visual cues. The local invoice
                  compiles instantly, guiding customers to checkout.
                </Typography>
              </div>

              {/* SCENE 5: Checkout */}
              <div className="absolute inset-0 flex flex-col justify-center space-y-5 text-left opacity-0 pointer-events-none">
                <Typography
                  variant="h3"
                  className="text-foreground font-bold leading-tight text-2xl md:text-[28px] lg:text-[32px] tracking-tight"
                >
                  One-Tap WhatsApp <br />
                  Invoice Dispatch.
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                >
                  Tapping checkout formats items, totals, and delivery data,
                  preparing a structured messaging request.
                </Typography>
              </div>

              {/* SCENE 6: WhatsApp Conversation */}
              <div className="absolute inset-0 flex flex-col justify-center space-y-5 text-left opacity-0 pointer-events-none">
                <Typography
                  variant="h3"
                  className="text-foreground font-bold leading-tight text-2xl md:text-[28px] lg:text-[32px] tracking-tight"
                >
                  Seamless Transition <br />
                  into Chat.
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                >
                  The storefront morphs directly into a WhatsApp conversation.
                  The order message is composed dynamically with typing feedback.
                </Typography>
              </div>

              {/* SCENE 7: Merchant Dashboard */}
              <div className="absolute inset-0 flex flex-col justify-center space-y-5 text-left opacity-0 pointer-events-none">
                <Typography
                  variant="h3"
                  className="text-foreground font-bold leading-tight text-2xl md:text-[28px] lg:text-[32px] tracking-tight"
                >
                  Incoming Orders <br />
                  Intercepted Live.
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                >
                  Outside the phone, your merchant center dashboard intercepts
                  the incoming WhatsApp order request in real time.
                </Typography>
              </div>

              {/* SCENE 8: Analytics Update */}
              <div className="absolute inset-0 flex flex-col justify-center space-y-5 text-left opacity-0 pointer-events-none">
                <Typography
                  variant="h3"
                  className="text-foreground font-bold leading-tight text-2xl md:text-[28px] lg:text-[32px] tracking-tight"
                >
                  Watch Net Revenue <br />
                  Scale Up Live.
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                >
                  Watch revenue meters and order trackers tick up on your
                  dashboard. Customer analytics update instantly.
                </Typography>
              </div>

              {/* SCENE 9: Analytics Growth */}
              <div className="absolute inset-0 flex flex-col justify-center space-y-5 text-left opacity-0 pointer-events-none">
                <Typography
                  variant="h3"
                  className="text-foreground font-bold leading-tight text-2xl md:text-[28px] lg:text-[32px] tracking-tight"
                >
                  Dynamic Conversion <br />
                  Curve Graphing.
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                >
                  Sparkline graphs draw conversion peaks instantly, confirming
                  order completion rates and sales performance trends.
                </Typography>
              </div>

              {/* SCENE 10: Complete Success */}
              <div className="absolute inset-0 flex flex-col justify-center space-y-5 text-left opacity-0 pointer-events-none">
                <Typography
                  variant="h3"
                  className="text-foreground font-bold leading-tight text-2xl md:text-[28px] lg:text-[32px] tracking-tight"
                >
                  Accept and Lock In <br />
                  the Complete Sale.
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                >
                  The merchant clicks accept, locking in the sale. The phone
                  screen receives confirmation while metrics settle into a
                  completed state.
                </Typography>
                <div className="flex gap-4 pt-2">
                  <Link href="/signup" passHref className="w-full">
                    <Button
                      variant="primary"
                      size="lg"
                      className="text-sm md:text-base py-3 px-6 rounded-[14px] w-full flex items-center justify-center gap-2"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* VOLUMETRIC SMARTPHONE & FLOATING CARDS PERSPECTIVE TILT DECK (Centered Right) */}
          <div className="flex-1 flex justify-center items-center relative min-h-[640px] max-w-[550px] z-20">
            <div
              ref={phoneRef}
              className="relative w-full max-w-[310px] flex items-center justify-center will-change-transform"
            >
              <div
                className="relative w-full flex items-center justify-center transition-transform duration-700 ease-out"
                style={{
                  transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Smartphone Mockup */}
                <PhoneMockup />

                {/* Floating Glass Dashboard Indicators */}
                <DashboardCards
                  revenueRef={revenueCardRef}
                  ordersRef={ordersCardRef}
                  analyticsRef={analyticsCardRef}
                  aiRef={aiCardRef}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HeroLayout;