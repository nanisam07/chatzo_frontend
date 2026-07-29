import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hoverEffect = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-2xl glass-card overflow-hidden transition-all duration-500",
          hoverEffect && "hover:border-slate-300 dark:hover:border-white/15 hover:shadow-[0_20px_50px_rgba(124,58,237,0.05)]",
          className
        )}
        {...props}
      >
        {/* Dynamic top gradient gloss highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

Card.displayName = "Card";
