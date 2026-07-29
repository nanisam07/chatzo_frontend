"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Synchronize ScrollTrigger with Lenis
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Synchronize GSAP ticker with Lenis raf
    const updateGsapTicker = (time: number) => {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis expects milliseconds
    };
    
    gsap.ticker.add(updateGsapTicker);

    // Configure ScrollTrigger config
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    return () => {
      gsap.ticker.remove(updateGsapTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
