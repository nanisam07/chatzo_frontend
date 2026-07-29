import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Section({
  children,
  className,
  containerSize = "lg",
  ...props
}: SectionProps) {
  const containerClasses = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[90rem]",
    full: "max-w-none",
  };

  return (
    <section
      className={cn(
        "relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center overflow-hidden",
        className
      )}
      {...props}
    >
      <div className={cn("w-full mx-auto flex flex-col items-center", containerClasses[containerSize])}>
        {children}
      </div>
    </section>
  );
}
