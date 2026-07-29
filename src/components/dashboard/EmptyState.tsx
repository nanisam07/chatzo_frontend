"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  size = "md",
  className,
}: EmptyStateProps) {
  const sizeClasses = {
    sm: { wrapper: "py-8 px-4", icon: "h-10 w-10 mb-3", title: "text-sm", desc: "text-xs", btn: "text-xs px-3 py-1.5" },
    md: { wrapper: "py-14 px-6", icon: "h-14 w-14 mb-4", title: "text-base", desc: "text-sm", btn: "text-sm px-4 py-2" },
    lg: { wrapper: "py-20 px-8", icon: "h-18 w-18 mb-5", title: "text-lg", desc: "text-sm", btn: "text-sm px-5 py-2.5" },
  };

  const s = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        s.wrapper,
        className
      )}
    >
      {/* Icon container */}
      <div
        className={cn(
          "rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100/60 flex items-center justify-center text-emerald-500 shadow-sm",
          s.icon
        )}
      >
        {icon}
      </div>

      {/* Text */}
      <h3 className={cn("font-bold text-gray-900 tracking-tight", s.title)}>
        {title}
      </h3>
      <p className={cn("text-gray-400 font-medium mt-1 max-w-xs leading-relaxed", s.desc)}>
        {description}
      </p>

      {/* CTA */}
      {action && (
        <button
          onClick={action.onClick}
          className={cn(
            "mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white font-bold transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95",
            s.btn
          )}
        >
          {action.icon}
          {action.label}
        </button>
      )}
    </div>
  );
}
