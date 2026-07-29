"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES_CONFIG } from "@/lib/config/categories";

export default function DashboardRootPage() {
  const router = useRouter();

  useEffect(() => {
    let category = localStorage.getItem("chatzo_merchant_category") || "retail";
    
    // Map signup category "food" to configuration "restaurant"
    if (category === "food") {
      category = "restaurant";
    }

    // Fallback validation
    if (!CATEGORIES_CONFIG[category]) {
      category = "retail";
    }

    router.replace(`/dashboard/${category}/overview`);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        <p className="text-xs text-slate-500 font-bold tracking-wider uppercase">Loading Workspace...</p>
      </div>
    </div>
  );
}
