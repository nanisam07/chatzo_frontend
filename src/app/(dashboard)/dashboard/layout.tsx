"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { CATEGORIES_CONFIG } from "@/lib/config/categories";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { hydrateWorkspace, currentCategory } = useWorkspaceStore();

  // Hydrate workspace state from backend APIs
  useEffect(() => {
    hydrateWorkspace();
  }, [currentCategory, hydrateWorkspace]);

  // Extract category and tab parameters from route path
  const category = (params?.category as string) || "retail";
  const tab = (params?.tab as string) || "overview";

  // Validate active category
  const activeCategory = CATEGORIES_CONFIG[category] ? category : "retail";

  const handleActionTrigger = (actionType: string) => {
    // Intercept standard triggers and redirect or emit event alerts
    if (actionType === "add_catalog") {
      window.dispatchEvent(new CustomEvent("open-add-catalog"));
    } else if (actionType === "add_customer") {
      window.dispatchEvent(new CustomEvent("open-add-customer"));
    } else if (actionType === "add_staff") {
      window.dispatchEvent(new CustomEvent("open-add-staff"));
    } else if (actionType === "add_repair") {
      window.dispatchEvent(new CustomEvent("open-add-repair"));
    } else if (actionType === "add_table_slot") {
      window.dispatchEvent(new CustomEvent("open-add-table-slot"));
    } else if (actionType === "scan_rx") {
      window.dispatchEvent(new CustomEvent("open-scan-rx"));
    } else {
      alert(`[Workspace Trigger]: ${actionType} executed in ${activeCategory} console.`);
    }
  };

  return (
    <div className="light subtle-grid text-[#111827] min-h-screen flex">
      {/* Dynamic Responsive Sidebar */}
      <Sidebar
        currentCategory={activeCategory}
        currentTab={tab}
        isMobileOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {/* Main Viewport Content Area */}
      <div className="flex flex-1 flex-col min-w-0 bg-transparent text-[#111827] relative">
        <Topbar
          currentCategory={activeCategory}
          currentTab={tab}
          onToggleMobile={() => setIsSidebarOpen(true)}
          onActionTrigger={handleActionTrigger}
        />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
