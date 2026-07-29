import React from "react";
import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white px-4 text-center">
      <div className="space-y-6 max-w-md p-8 glass-card">
        <Typography variant="small" className="text-whatsapp font-bold">
          404 - Void
        </Typography>
        <Typography variant="h2" className="text-white">
          Page Not Found
        </Typography>
        <Typography variant="body" className="text-neutral-400 text-sm">
          The resources you are attempting to access do not exist. Please check the URL or return to safety using the button below.
        </Typography>
        <div className="pt-4">
          <Link href="/" passHref legacyBehavior>
            <Button variant="primary">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
