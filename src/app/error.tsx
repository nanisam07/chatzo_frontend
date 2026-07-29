"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime App Error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white px-4 text-center">
      <div className="space-y-6 max-w-md p-8 glass-card border-red-500/20">
        <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto text-xl font-bold">
          !
        </div>
        <Typography variant="h3" className="text-white">
          Application Error
        </Typography>
        <Typography variant="body" className="text-neutral-400 text-sm">
          Something went wrong while rendering this page. You can attempt to retry the action below or refresh the window.
        </Typography>
        <div className="pt-4 flex gap-3 justify-center">
          <Button variant="primary" size="sm" onClick={() => reset()}>
            Retry Action
          </Button>
          <Button variant="glass" size="sm" onClick={() => window.location.reload()}>
            Reload Window
          </Button>
        </div>
      </div>
    </div>
  );
}
