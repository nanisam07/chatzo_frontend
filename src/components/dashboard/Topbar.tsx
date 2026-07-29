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
  Calendar,
  FileText,
  Search,
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

  // Map dynamic tab IDs to user-friendly titles
  const getTabTitle = () => {
    switch (currentTab) {
      case "overview":
        return "Command Center";
      case "my-shop":
        return "Business Profile";
      case "branches":
        return "Branches Directory";
      case "staff":
        return "Staff Roster";
      case "hours":
        return "Business Operating Hours";
      case "orders":
        return "Orders Management";
      case "products":
        return activeCategoryConfig.catalogLabel;
      case "categories":
        return "Catalog Categories";
      case "inventory":
        return "Inventory Ledger";
      case "customers":
        return activeCategoryConfig.customersLabel;
      case "coupons":
        return "Coupons & Discounts";
      case "campaigns":
        return "Marketing Campaigns";
      case "broadcasts":
        return "Broadcast Logs";
      case "chats":
        return "WhatsApp Inbox";
      case "reviews":
        return "Customer Reviews";
      case "revenue":
        return "Revenue Analytics";
      case "transactions":
        return "Transactions Log";
      case "invoices":
        return "Invoices Ledger";
      case "payouts":
        return "Payout Settlements";
      case "ai-assistant":
        return "AI Operations Workspace";
      case "settings":
        return "Platform Settings";
      default:
        return "Dashboard";
    }
  };

  // Determine context-based Quick Action button
  const getQuickAction = () => {
    switch (currentTab) {
      case "overview":
        return { label: "Trigger Broadcast", action: "send_broadcast", icon: <Send size={13} /> };
      case "products":
        return {
          label: `Add ${activeCategoryConfig.catalogLabel.slice(0, -1) || "Item"}`,
          action: "add_catalog",
          icon: <Plus size={13} />,
        };
      case "customers":
        return {
          label: `Add ${activeCategoryConfig.customersLabel.slice(0, -1) || "Client"}`,
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

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 sticky top-0 z-20 text-[#111827] shadow-sm">
      {/* Left section: Hamburger + Dynamic breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobile}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:hidden cursor-pointer"
          title="Open Menu"
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
            <span>Workspace</span>
            <span>/</span>
            <span>{profile.businessName}</span>
          </div>
          <h1 className="text-sm font-black text-gray-900">{getTabTitle()}</h1>
        </div>
        <h1 className="text-xs font-black text-gray-900 sm:hidden">{getTabTitle()}</h1>
      </div>

      {/* Center Search Box */}
      <div className="hidden md:flex relative max-w-xs w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
        <input
          type="text"
          placeholder="Search workspace..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white transition-all font-medium"
        />
      </div>

      {/* Right section: sync stats + context actions */}
      <div className="flex items-center gap-3">
        {/* WhatsApp sync indicator */}
        <div className="hidden md:flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-1.5 border border-gray-200">
          <div className="relative flex h-2 w-2">
            <span className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              apiSyncStatus === "Connected" ? "bg-green-500" : "bg-red-500"
            )}></span>
            <span className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              apiSyncStatus === "Connected" ? "bg-green-500" : "bg-red-500"
            )}></span>
          </div>
          <span className={cn(
            "text-[9px] font-black tracking-wider uppercase",
            apiSyncStatus === "Connected" ? "text-green-600" : "text-red-500"
          )}>
            {apiSyncStatus === "Connected" ? "WhatsApp Connected" : "Connection Offline"}
          </span>
        </div>

        {/* Dynamic Context Button */}
        {quickAction && (
          <button
            onClick={() => onActionTrigger?.(quickAction.action)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 px-3.5 py-1.5 text-xs font-bold transition-all hover:shadow-[0_2px_8px_rgba(37,99,235,0.2)] cursor-pointer active:scale-95"
          >
            {quickAction.icon}
            <span>{quickAction.label}</span>
          </button>
        )}

        {/* Standard controls icons */}
        <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
          <button className="relative rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all cursor-pointer">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
          </button>

          <div className="relative h-8 w-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-600 text-xs shadow-inner">
            {profile.ownerName.split(" ").map(n => n[0]).join("")}
          </div>
        </div>
      </div>
    </header>
  );
}
