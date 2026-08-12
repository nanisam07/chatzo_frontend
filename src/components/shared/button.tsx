import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", size = "md", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 font-medium rounded-full cursor-pointer transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 select-none whitespace-nowrap";

    const variantClasses = {
      primary:
        "bg-whatsapp text-black hover:bg-[#20bd5a] hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] shadow-[0_4px_12px_rgba(37,211,102,0.15)]",
      secondary:
        "bg-white text-black hover:bg-neutral-100 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]",
      ghost:
        "bg-transparent text-white hover:bg-white/5 border border-transparent",
      glass:
        "bg-white/[0.03] backdrop-blur-md text-white border border-white/10 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        suppressHydrationWarning
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
