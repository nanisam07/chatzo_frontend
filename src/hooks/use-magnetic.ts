import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      
      // Calculate relative cursor coordinate from center of button
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      
      // Calculate distance to center
      const distance = Math.hypot(relX, relY);
      
      // Pull strength boundary
      const magnetStrength = 0.35;
      const pullRadius = rect.width * 0.8; // Active radius scales with button width

      if (distance < pullRadius) {
        gsap.to(el, {
          x: relX * magnetStrength,
          y: relY * magnetStrength,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1.1, 0.4)",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1.1, 0.4)",
      });
    };

    // Listen globally for cursor movement so pull is smooth when entering bounds
    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return ref;
}
