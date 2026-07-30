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
    sm: { wrapper: "py-8 px-4", icon: "h-10 w-10 mb-2.5", title: "text-xs font-extrabold", desc: "text-[11px]", btn: "h-8 text-xs px-3" },
    md: { wrapper: "py-12 px-6", icon: "h-12 w-12 mb-3.5", title: "text-sm font-extrabold", desc: "text-xs", btn: "h-9 text-xs px-4" },
    lg: { wrapper: "py-16 px-8", icon: "h-16 w-16 mb-4", title: "text-base font-extrabold", desc: "text-xs", btn: "h-10 text-xs px-5" },
  };

  const s = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-slate-200/80 bg-slate-50/40",
        s.wrapper,
        className
      )}
    >
      {/* Icon container */}
      <div
        className={cn(
          "rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shadow-2xs shrink-0",
          s.icon
        )}
      >
        {icon}
      </div>

      {/* Text */}
      <h3 className={cn("text-slate-900 tracking-tight", s.title)}>
        {title}
      </h3>
      <p className={cn("text-slate-500 font-medium mt-1 max-w-xs leading-relaxed", s.desc)}>
        {description}
      </p>

      {/* CTA */}
      {action && (
        <button
          onClick={action.onClick}
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 text-white font-bold shadow-xs transition-all hover:bg-emerald-700 active:scale-98 cursor-pointer",
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