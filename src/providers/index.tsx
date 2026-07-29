"use client";

import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { SmoothScrollProvider } from "./lenis-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
