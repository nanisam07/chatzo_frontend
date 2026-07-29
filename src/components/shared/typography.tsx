import React from "react";
import { cn } from "@/lib/utils";

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "lead" | "body" | "small";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
}

export function Typography({
  children,
  className,
  variant = "body",
  as,
  ...props
}: TypographyProps) {
  // Determine standard tag name based on variant
  const getDefaultComponent = (): React.ElementType => {
    if (variant === "small") return "span";
    if (variant === "lead") return "p";
    if (variant === "body") return "p";
    return variant as React.ElementType;
  };

  const Component = as || getDefaultComponent();

  const variantClasses: Record<TypographyVariant, string> = {
    h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]",
    h2: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.2]",
    h3: "text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground",
    h4: "text-xl sm:text-2xl font-semibold tracking-tight text-foreground",
    lead: "text-lg sm:text-xl md:text-2xl text-muted-foreground font-normal leading-[1.5]",
    body: "text-base text-muted-foreground font-normal leading-[1.6]",
    small: "text-xs sm:text-sm text-muted-foreground font-medium tracking-wide uppercase",
  };

  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  );
}
