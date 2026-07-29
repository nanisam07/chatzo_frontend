"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeroStore } from "@/store/use-hero-store";

export function useHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  
  // Refs for the dashboard cards
  const revenueCardRef = useRef<HTMLDivElement>(null);
  const ordersCardRef = useRef<HTMLDivElement>(null);
  const analyticsCardRef = useRef<HTMLDivElement>(null);
  const aiCardRef = useRef<HTMLDivElement>(null);
  
  // Refs for the text chapters
  const chaptersRef = useRef<HTMLDivElement>(null);

  // Ref for the oversized background branding parallax
  const bgBrandingRef = useRef<HTMLDivElement>(null);

  const {
    setStep,
    setCartCount,
    setWhatsappProgress,
    setRevenueProgress,
    setDashboardNotified,
    setOrderAccepted,
  } = useHeroStore();

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const trigger = triggerRef.current;
    const phone = phoneRef.current;
    
    const revCard = revenueCardRef.current;
    const ordCard = ordersCardRef.current;
    const alyCard = analyticsCardRef.current;
    const aiCard = aiCardRef.current;
    const chapters = chaptersRef.current;
    const bgBranding = bgBrandingRef.current;

    if (!container || !trigger || !phone) return;

    // --- 1. INFINITE FLOATING IDLE ANIMATION ---
    const phoneChild = phone.firstElementChild;
    let floatTween: gsap.core.Tween | null = null;
    
    if (phoneChild) {
      floatTween = gsap.to(phoneChild, {
        y: "+=10",
        x: "+=3",
        rotationZ: "+=0.8",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Dynamic drifting floats for individual dashboard cards
    const floatCards = [revCard, ordCard, alyCard, aiCard];
    const cardTweens = floatCards.map((card, index) => {
      if (!card) return null;
      return gsap.to(card, {
        y: `+=${6 + index * 1.5}`,
        x: `+=${index % 2 === 0 ? 3 : -3}`,
        duration: 2.8 + index * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.25,
      });
    });

    // --- 2. CINEMATIC SCROLL TIMELINE CREATION ---
    // GSAP pins `trigger` (the h-screen viewport div) using position:fixed — immune to ancestor
    // overflow:hidden. `container` (outer hero div) is the scroll trigger zone.
    // pinSpacing:true (default) inserts GSAP’s own spacer = no manual h-[650vh] wrapper needed.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: trigger,
        start: "top top",
        end: () => "+=" + window.innerHeight * 5.5,
        scrub: 0.5,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
    });

    // Dummy state object to tween parameters
    const stateObj = {
      step: 0,
      whatsapp: 0,
      revenue: 0,
    };

    // --- STEP TWEEN IN TIMELINE ---
    tl.to(stateObj, {
      step: 9,
      roundProps: "step",
      ease: "none",
      duration: 10,
      onUpdate: () => {
        const stepVal = Math.round(stateObj.step);
        setStep(stepVal);
        
        if (stepVal < 3) {
          setCartCount(0);
        } else if (stepVal >= 3 && stepVal < 7) {
          setCartCount(1);
        }
        
        if (stepVal < 7) {
          setDashboardNotified(false);
          setOrderAccepted(false);
        } else if (stepVal === 7 || stepVal === 8) {
          setDashboardNotified(true);
          setOrderAccepted(false);
        } else if (stepVal >= 9) {
          setDashboardNotified(true);
          setOrderAccepted(true);
        }
      },
    }, 0);

    // --- TWEEN WHATSAPP PROGRESS DIRECTLY ---
    tl.to(stateObj, {
      whatsapp: 1,
      ease: "none",
      onUpdate: () => {
        setWhatsappProgress(stateObj.whatsapp);
      },
    }, 5.1).to(stateObj, {
      whatsapp: 1,
      duration: 0.1,
    });

    // --- TWEEN REVENUE PROGRESS DIRECTLY ---
    tl.to(stateObj, {
      revenue: 1,
      ease: "power2.out",
      onUpdate: () => {
        setRevenueProgress(stateObj.revenue);
      },
    }, 7.2).to(stateObj, {
      revenue: 1,
      duration: 0.1,
    });

    // --- 3. HARDWARE & CARD DIRECT DOM ANIMATIONS (GPU optimized) ---
    gsap.set(phone, { transformPerspective: 1200, rotationY: -12, rotationX: 6, z: 0, x: 0 });
    gsap.set([revCard, ordCard, alyCard, aiCard], { opacity: 0, y: 40, scale: 0.9 });

    // Scene 0 -> 1: Discover -> Browse
    tl.to(phone, {
      rotationY: 4,
      rotationX: 10,
      z: 10,
      ease: "power1.inOut",
      duration: 1,
    }, 0);

    // Scene 1 -> 2: Browse -> Choose
    tl.to(phone, {
      scale: 1.06,
      rotationY: 0,
      rotationX: 0,
      z: 60,
      ease: "power2.out",
      duration: 1,
    }, 1);

    // Scene 2 -> 3: Choose -> Add to Cart
    tl.to(phone, {
      x: -45,
      rotationY: -14,
      rotationX: 4,
      z: 20,
      scale: 1.02,
      ease: "power2.inOut",
      duration: 1,
    }, 2);

    // Scene 3 -> 4: Cart -> Checkout
    tl.to(phone, {
      x: 0,
      scale: 1,
      rotationY: 0,
      rotationX: 0,
      z: 0,
      ease: "power2.inOut",
      duration: 1,
    }, 3);

    // Scene 4 -> 5: Checkout -> WhatsApp Morph
    tl.to(phone, {
      rotationY: 180,
      scale: 0.95,
      z: -50,
      ease: "back.inOut(1.2)",
      duration: 1,
    }, 4);
    tl.to(phone, {
      rotationY: 345,
      scale: 1,
      z: 10,
      ease: "back.out(1.1)",
      duration: 1,
    }, 5);

    // Scene 5 -> 6: WhatsApp typing
    tl.to(phone, {
      rotationY: 350,
      rotationX: -6,
      ease: "sine.inOut",
      duration: 1,
    }, 6);

    // Scene 6 -> 7: WhatsApp Sent -> Dashboard Notification Pop
    tl.to(phone, {
      x: 80,
      scale: 0.88,
      rotationY: 335,
      rotationX: 8,
      z: -20,
      ease: "power2.inOut",
      duration: 1.2,
    }, 6.5);
    tl.to(ordCard, {
      opacity: 1,
      y: 0,
      scale: 1.03,
      ease: "back.out(1.3)",
      duration: 1,
    }, 6.7);

    // Scene 7 -> 8: Notification -> Revenue metrics count-up
    tl.to(revCard, {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "back.out(1.2)",
      duration: 1,
    }, 7.4);

    // Scene 8 -> 9: Stats -> Charts and AI insights draw
    tl.to(alyCard, {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "back.out(1.2)",
      duration: 1,
    }, 8.4);
    tl.to(aiCard, {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "back.out(1.2)",
      duration: 1,
    }, 8.4);

    // Final layout resolution
    tl.to(phone, {
      x: 0,
      scale: 0.95,
      rotationY: -10,
      rotationX: 5,
      z: 0,
      ease: "power3.out",
      duration: 1.5,
    }, 9.2);
    tl.to([revCard, ordCard, alyCard, aiCard], {
      opacity: 1,
      scale: 1,
      ease: "power3.out",
      duration: 1.2,
    }, 9.2);

    // --- 4. BACKGROUND BRANDING PARALLAX DRIFT ---
    if (bgBranding) {
      tl.to(bgBranding, {
        y: -120, // Drift background text upward slowly
        ease: "none",
        duration: 10,
      }, 0);
    }

    // --- 5. TEXT CHAPTERS TRANSITIONS (declarative pointer-events) ---
    if (chapters) {
      const textBlocks = chapters.children;
      Array.from(textBlocks).forEach((block, index) => {
        if (index > 0) {
          gsap.set(block, { opacity: 0, y: 30, pointerEvents: "none" });
        } else {
          gsap.set(block, { opacity: 1, y: 0, pointerEvents: "auto" });
        }
      });

      for (let i = 0; i < 9; i++) {
        const currentBlock = textBlocks[i];
        const nextBlock = textBlocks[i + 1];

        if (currentBlock && nextBlock) {
          tl.to(currentBlock, {
            opacity: 0,
            y: -30,
            pointerEvents: "none",
            duration: 0.8,
            ease: "power2.inOut",
          }, i + 0.1);
          
          tl.to(nextBlock, {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.8,
            ease: "power2.out",
          }, i + 0.85);
        }
      }
    }

    return () => {
      // Cleanup all tweens and ScrollTrigger instances
      if (floatTween) floatTween.kill();
      cardTweens.forEach((tween) => tween && tween.kill());
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    setStep,
    setCartCount,
    setWhatsappProgress,
    setRevenueProgress,
    setDashboardNotified,
    setOrderAccepted,
  ]);

  return {
    containerRef,
    triggerRef,
    phoneRef,
    revenueCardRef,
    ordersCardRef,
    analyticsCardRef,
    aiCardRef,
    chaptersRef,
    bgBrandingRef,
  };
}
export default useHeroAnimation;
