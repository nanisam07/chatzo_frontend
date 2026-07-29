"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CATEGORIES_CONFIG } from "@/lib/config/categories";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import {
  LayoutDashboard,
  Briefcase,
  ShoppingCart,
  Megaphone,
  DollarSign,
  Sparkles,
  Settings,
  LogOut,
  ChevronDown,
  MessageSquare,
  AlertCircle,
  Store,
} from "lucide-react";

interface SidebarProps {
  currentCategory: string;
  currentTab: string;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const getCategoryThemeStyles = (category: string) => {
  switch (category) {
    case "restaurant":
      return {
        bg: "bg-orange-500/10 text-orange-950 font-bold shadow-sm border border-orange-500/20",
        dot: "bg-orange-500",
      };
    default:
      return {
        bg: "bg-emerald-500/10 text-emerald-950 font-bold shadow-sm border border-emerald-500/20",
        dot: "bg-emerald-500",
      };
  }
};

export function Sidebar({
  currentCategory,
  currentTab,
  isMobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const router = useRouter();
  const { chats, orders, profile } = useWorkspaceStore();

  const activeCategoryConfig = CATEGORIES_CONFIG[currentCategory] || CATEGORIES_CONFIG.retail;
  const theme = getCategoryThemeStyles(currentCategory);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    business: true,
    catalog: true,
    marketing: false,
    finance: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const categoryChats = chats[currentCategory] || [];
  const unreadCount = categoryChats.reduce((sum, c) => sum + c.unread, 0);

  const categoryOrders = orders[currentCategory] || [];
  const pendingOrders = categoryOrders.filter((o) =>
    ["Pending", "Preparing", "Scheduled", "Enrolled", "Processing"].includes(o.status)
  ).length;

  const handleLinkClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  const ownerInitials = profile.ownerName
    ? profile.ownerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  const renderSectionHeader = (
    title: string,
    icon: React.ReactNode,
    isExpanded: boolean,
    onToggle: () => void
  ) => (
    <button
      onClick={onToggle}
      className="group flex w-full items-center justify-between px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.12em] hover:text-emerald-700 transition-all duration-200 rounded-lg hover:bg-emerald-500/5 mt-1"
    >
      <div className="flex items-center gap-2.5">
        <span className="text-slate-400 group-hover:text-emerald-600 transition-colors duration-200">
          {icon}
        </span>
        <span>{title}</span>
      </div>
      <ChevronDown
        size={14}
        className={cn(
          "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-slate-300 group-hover:text-emerald-500",
          isExpanded ? "rotate-180" : ""
        )}
      />
    </button>
  );

  const renderNavItem = (
    href: string,
    label: string,
    isActive: boolean,
    badge?: number | null
  ) => (
    <Link
      href={href}
      onClick={handleLinkClick}
      className={cn(
        "group flex items-center justify-between rounded-xl px-3 py-2.5 text-[13.5px] font-semibold apple-transition active:scale-[0.98] select-none",
        isActive
          ? theme.bg
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0 transition-all duration-200",
            isActive ? theme.dot : "bg-transparent group-hover:bg-slate-300"
          )}
        />
        <span className="truncate">{label}</span>
      </div>
      {badge != null && badge > 0 && (
        <span className="ml-2 shrink-0 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-black text-white leading-none">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </Link>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          "apple-transition fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col border-r border-slate-200/80 bg-white/96 backdrop-blur-2xl text-slate-800 lg:static lg:translate-x-0 shadow-[2px_0_24px_rgba(0,0,0,0.04)]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* ── Logo / Brand ─────────────────────────── */}
        <div className="flex h-[62px] items-center gap-3 border-b border-slate-100 px-5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 shadow-md shadow-emerald-500/25 ring-1 ring-white/40">
            <MessageSquare size={17} className="text-white fill-white/20" />
          </div>
          <div>
            <span className="text-[20px] font-black tracking-tight text-slate-900 leading-none">
              CHATZO
            </span>
            <p className="text-[9px] font-bold text-emerald-600 tracking-[0.12em] uppercase leading-none mt-0.5">
              WhatsApp Commerce
            </p>
          </div>
        </div>

        {/* ── Business Profile Pill ──────────────────── */}
        <div className="mx-3 my-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/60 border border-emerald-100/80 p-3 flex items-center gap-3 shrink-0">
          <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm ring-1 ring-emerald-100 shrink-0">
            {activeCategoryConfig.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-slate-900 truncate leading-tight">
              {profile.businessName || "Your Business"}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <p className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider truncate">
                {activeCategoryConfig.label}
              </p>
            </div>
          </div>
          <Store size={14} className="text-emerald-400 shrink-0" />
        </div>

        {/* ── Navigation ──────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5 custom-scrollbar">

          {/* Dashboard (main) */}
          <div className="pt-1 pb-2">
            <Link
              href={`/dashboard/${currentCategory}/overview`}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-bold apple-transition active:scale-[0.98]",
                currentTab === "overview"
                  ? theme.bg
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/70"
              )}
            >
              <div className={cn(
                "h-7 w-7 rounded-lg flex items-center justify-center shrink-0",
                currentTab === "overview" ? "bg-emerald-500/20" : "bg-slate-100"
              )}>
                <LayoutDashboard size={15} className={currentTab === "overview" ? "text-emerald-700" : "text-slate-500"} />
              </div>
              <span>Dashboard</span>
            </Link>
          </div>

          {/* ── Section: My Business ────────────────── */}
          <div className="space-y-0.5">
            {renderSectionHeader(
              "My Business",
              <Briefcase size={12} />,
              expandedSections.business,
              () => toggleSection("business")
            )}
            <div className={cn("apple-accordion", expandedSections.business && "open")}>
              <div className="apple-accordion-inner space-y-0.5 pl-2 mt-1">
                {[
                  { id: "my-shop", label: "My Shop" },
                  { id: "branches", label: "Branches" },
                  { id: "staff", label: "Staff" },
                  { id: "hours", label: "Business Hours" },
                  { id: "hardware", label: "Hardware & Printing" },
                ].map((sub) =>
                  renderNavItem(
                    `/dashboard/${currentCategory}/${sub.id}`,
                    sub.label,
                    currentTab === sub.id
                  )
                )}
              </div>
            </div>
          </div>

          {/* ── Section: Orders & Catalog ────────────── */}
          <div className="space-y-0.5 pt-1">
            {renderSectionHeader(
              "Orders & Catalog",
              <ShoppingCart size={12} />,
              expandedSections.catalog,
              () => toggleSection("catalog")
            )}
            <div className={cn("apple-accordion", expandedSections.catalog && "open")}>
              <div className="apple-accordion-inner space-y-0.5 pl-2 mt-1">
                {renderNavItem(
                  `/dashboard/${currentCategory}/orders`,
                  "Orders",
                  currentTab === "orders",
                  pendingOrders > 0 ? pendingOrders : null
                )}
                {[
                  { id: "products", label: activeCategoryConfig.catalogLabel },
                  { id: "categories", label: "Categories" },
                  { id: "inventory", label: "Inventory" },
                  { id: "customers", label: "Customers" },
                  { id: "coupons", label: "Coupons" },
                ].map((sub) =>
                  renderNavItem(
                    `/dashboard/${currentCategory}/${sub.id}`,
                    sub.label,
                    currentTab === sub.id
                  )
                )}
              </div>
            </div>
          </div>

          {/* ── Section: Marketing ──────────────────── */}
          <div className="space-y-0.5 pt-1">
            {renderSectionHeader(
              "Marketing",
              <Megaphone size={12} />,
              expandedSections.marketing,
              () => toggleSection("marketing")
            )}
            <div className={cn("apple-accordion", expandedSections.marketing && "open")}>
              <div className="apple-accordion-inner space-y-0.5 pl-2 mt-1">
                {renderNavItem(
                  `/dashboard/${currentCategory}/campaigns`,
                  "Campaigns",
                  currentTab === "campaigns"
                )}
                {renderNavItem(
                  `/dashboard/${currentCategory}/broadcasts`,
                  "Broadcasts",
                  currentTab === "broadcasts"
                )}
                {renderNavItem(
                  `/dashboard/${currentCategory}/chats`,
                  "WhatsApp Inbox",
                  currentTab === "chats",
                  unreadCount > 0 ? unreadCount : null
                )}
                {renderNavItem(
                  `/dashboard/${currentCategory}/reviews`,
                  "Reviews",
                  currentTab === "reviews"
                )}
              </div>
            </div>
          </div>

          {/* ── Section: Finance ────────────────────── */}
          <div className="space-y-0.5 pt-1">
            {renderSectionHeader(
              "Finance",
              <DollarSign size={12} />,
              expandedSections.finance,
              () => toggleSection("finance")
            )}
            <div className={cn("apple-accordion", expandedSections.finance && "open")}>
              <div className="apple-accordion-inner space-y-0.5 pl-2 mt-1">
                {[
                  { id: "revenue", label: "Revenue" },
                  { id: "transactions", label: "Transactions" },
                  { id: "invoices", label: "Invoices" },
                  { id: "payouts", label: "Payouts" },
                ].map((sub) =>
                  renderNavItem(
                    `/dashboard/${currentCategory}/${sub.id}`,
                    sub.label,
                    currentTab === sub.id
                  )
                )}
              </div>
            </div>
          </div>

          {/* ── Utility Links ──────────────────────── */}
          <div className="pt-3 border-t border-slate-100 mt-3 space-y-0.5">
            <Link
              href={`/dashboard/${currentCategory}/ai-assistant`}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-bold apple-transition active:scale-[0.98]",
                currentTab === "ai-assistant"
                  ? theme.bg
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/70"
              )}
            >
              <div className={cn(
                "h-7 w-7 rounded-lg flex items-center justify-center shrink-0",
                currentTab === "ai-assistant" ? "bg-emerald-500/20" : "bg-slate-100"
              )}>
                <Sparkles size={15} className="text-emerald-600" />
              </div>
              <span>AI Assistant</span>
            </Link>

            <Link
              href={`/dashboard/${currentCategory}/settings`}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-bold apple-transition active:scale-[0.98]",
                currentTab === "settings"
                  ? theme.bg
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/70"
              )}
            >
              <div className={cn(
                "h-7 w-7 rounded-lg flex items-center justify-center shrink-0",
                currentTab === "settings" ? "bg-emerald-500/20" : "bg-slate-100"
              )}>
                <Settings size={15} className="text-slate-500" />
              </div>
              <span>Settings</span>
            </Link>

            <Link
              href={`/dashboard/${currentCategory}/report-issue`}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-bold apple-transition active:scale-[0.98]",
                currentTab === "report-issue"
                  ? theme.bg
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/70"
              )}
            >
              <div className={cn(
                "h-7 w-7 rounded-lg flex items-center justify-center shrink-0",
                currentTab === "report-issue" ? "bg-emerald-500/20" : "bg-slate-100"
              )}>
                <AlertCircle size={15} className="text-slate-500" />
              </div>
              <span>Report an Issue</span>
            </Link>
          </div>
        </nav>

        {/* ── Footer Profile ────────────────────────── */}
        <div className="border-t border-slate-100 p-3 shrink-0">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 hover:bg-slate-100/80 p-3 border border-slate-100 apple-transition group cursor-default">
            <div className="flex items-center gap-3 min-w-0">
              {/* Avatar */}
              <div className="relative h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-black text-white text-xs shadow-md ring-1 ring-white/40">
                {ownerInitials}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 shadow-sm" />
              </div>

              <div className="min-w-0">
                <p className="text-[13px] font-bold text-slate-900 truncate leading-tight">
                  {profile.ownerName || "Merchant"}
                </p>
                <p className="text-[10px] text-emerald-700 font-semibold truncate mt-0.5 uppercase tracking-wider">
                  {profile.subscriptionPlan || "Free"} Plan
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                router.push("/login");
              }}
              title="Sign Out"
              className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 apple-transition cursor-pointer active:scale-90 opacity-0 group-hover:opacity-100"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}