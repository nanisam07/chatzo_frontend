"use client";

import React from "react";
import { CATEGORIES_CONFIG } from "@/lib/config/categories";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import {
  Menu,
  Bell,
  Plus,
  Send,
  Zap,
  Search,
  MessageSquare,
  Wifi,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TopbarProps {
  currentCategory: string;
  currentTab: string;
  onToggleMobile: () => void;
  onActionTrigger?: (actionType: string) => void;
}

export function Topbar({
  currentCategory,
  currentTab,
  onToggleMobile,
  onActionTrigger,
}: TopbarProps) {
  const activeCategoryConfig = CATEGORIES_CONFIG[currentCategory] || CATEGORIES_CONFIG.retail;
  const { apiSyncStatus, profile } = useWorkspaceStore();

  const isConnected = apiSyncStatus === "Connected";

  const getTabTitle = () => {
    switch (currentTab) {
      case "overview":
        return "Dashboard";
      case "my-shop":
        return "My Shop";
      case "branches":
        return "Branches";
      case "staff":
        return "Staff";
      case "hours":
        return "Business Hours";
      case "hardware":
        return "Hardware & Printing";
      case "orders":
        return "Orders";
      case "products":
        return activeCategoryConfig.catalogLabel;
      case "categories":
        return "Categories";
      case "inventory":
        return "Inventory";
      case "customers":
        return activeCategoryConfig.customersLabel;
      case "coupons":
        return "Coupons & Discounts";
      case "campaigns":
        return "Campaigns";
      case "broadcasts":
        return "Broadcasts";
      case "chats":
        return "WhatsApp Inbox";
      case "reviews":
        return "Reviews";
      case "revenue":
        return "Revenue";
      case "transactions":
        return "Transactions";
      case "invoices":
        return "Invoices";
      case "payouts":
        return "Payouts";
      case "ai-assistant":
        return "AI Assistant";
      case "settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  const getQuickAction = () => {
    switch (currentTab) {
      case "overview":
        return { label: "Send Broadcast", action: "send_broadcast", icon: <Send size={13} /> };
      case "products":
        return {
          label: `Add ${activeCategoryConfig.catalogLabel.replace(/s$/, "") || "Item"}`,
          action: "add_catalog",
          icon: <Plus size={13} />,
        };
      case "customers":
        return {
          label: `Add ${activeCategoryConfig.customersLabel?.replace(/s$/, "") || "Customer"}`,
          action: "add_customer",
          icon: <Plus size={13} />,
        };
      case "staff":
        return {
          label: "Add Staff Member",
          action: "add_staff",
          icon: <Plus size={13} />,
        };
      case "settings":
        return { label: "Sync API Keys", action: "sync_api", icon: <Zap size={13} /> };
      default:
        return null;
    }
  };

  const quickAction = getQuickAction();

  const ownerInitials = profile.ownerName
    ? profile.ownerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <header className="flex h-[62px] shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/95 backdrop-blur-md px-5 sticky top-0 z-20 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      {/* Left — hamburger + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden transition-all cursor-pointer"
          title="Open Menu"
        >
          <Menu size={19} />
        </button>

        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
            <span>Dashboard</span>
            {currentTab !== "overview" && (
              <>
                <span className="text-slate-300">/</span>
                <span>{getTabTitle()}</span>
              </>
            )}
          </div>
          <h1 className="text-[15px] font-black text-slate-900 leading-tight tracking-tight">
            {getTabTitle()}
          </h1>
        </div>
        <h1 className="text-sm font-black text-slate-900 sm:hidden">{getTabTitle()}</h1>
      </div>

      {/* Center — search */}
      <div className="hidden md:flex relative max-w-[240px] w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
        <input
          type="text"
          placeholder="Search workspace…"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 focus:bg-white transition-all font-medium"
        />
      </div>

      {/* Right — status + actions */}
      <div className="flex items-center gap-2.5">
        {/* WhatsApp connection status */}
        <div
          className={cn(
            "hidden md:flex items-center gap-2 rounded-xl px-3 py-1.5 border text-[10px] font-black uppercase tracking-wider transition-all",
            isConnected
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-600"
          )}
        >
          <div className="relative flex h-2 w-2 shrink-0">
            {isConnected && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
            )}
            <span
              className={cn(
                "relative inline-flex rounded-full h-2 w-2",
                isConnected ? "bg-emerald-500" : "bg-red-500"
              )}
            />
          </div>
          {isConnected ? (
            <>
              <Wifi size={11} />
              <span>WhatsApp Live</span>
            </>
          ) : (
            <>
              <WifiOff size={11} />
              <span>Offline</span>
            </>
          )}
        </div>

        {/* Quick Action CTA */}
        {quickAction && (
          <button
            onClick={() => onActionTrigger?.(quickAction.action)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 px-3.5 py-2 text-[12px] font-bold transition-all hover:shadow-lg hover:shadow-emerald-500/20 cursor-pointer active:scale-95"
          >
            {quickAction.icon}
            <span className="hidden sm:inline">{quickAction.label}</span>
          </button>
        )}

        {/* Notification bell + avatar */}
        <div className="flex items-center gap-1.5 border-l border-slate-200 pl-2.5">
          <button className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer">
            <Bell size={16} />
          </button>

          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-black text-white text-[11px] shadow-sm ring-2 ring-white cursor-pointer">
            {ownerInitials}
          </div>
        </div>
      </div>
    </header>
  );
}
