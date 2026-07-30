"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { CATEGORIES_CONFIG } from "@/lib/config/categories";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
  toast,
  showToast,
  clearToast,
} = useWorkspaceStore();

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
      showToast(`[Workspace Trigger]: ${actionType} executed in ${activeCategory} console.`, "info");
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        clearToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);

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

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-slate-200/80 rounded-2xl px-5 py-4 shadow-xl shadow-black/5 animate-fade-in max-w-sm">
          <div className={cn(
            "h-8 w-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm border",
            toast.type === "success" ? "bg-emerald-50 text-emerald-600 border-emerald-250" :
            toast.type === "error" ? "bg-red-50 text-red-600 border-red-250" :
            "bg-blue-50 text-blue-600 border-blue-250"
          )}>
            {toast.type === "success" && <CheckCircle2 size={16} />}
            {toast.type === "error" && <AlertCircle size={16} />}
            {toast.type === "info" && <Info size={16} />}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-900 leading-tight">
              {toast.type === "success" ? "Success" : toast.type === "error" ? "Error" : "Info"}
            </p>
            <p className="text-[11px] text-gray-500 font-semibold mt-0.5 leading-snug">{toast.message}</p>
          </div>
          <button
            onClick={clearToast}
            className="rounded-lg p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
