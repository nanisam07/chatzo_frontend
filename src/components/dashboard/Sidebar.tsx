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
} from "lucide-react";

interface SidebarProps {
  currentCategory: string;
  currentTab: string;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const getCategoryThemeStyles = (category: string) => {
  switch (category) {
    case "retail": return { text: "text-blue-600", bg: "bg-blue-50/70 border-l-2 border-blue-600 font-extrabold shadow-[0_2px_6px_rgba(37,99,235,0.06)]", dot: "bg-blue-600" };
    case "restaurant": return { text: "text-orange-600", bg: "bg-orange-50/70 border-l-2 border-orange-600 font-extrabold shadow-[0_2px_6px_rgba(234,88,12,0.06)]", dot: "bg-orange-600" };
    case "bakery": return { text: "text-amber-800", bg: "bg-amber-50/70 border-l-2 border-amber-800 font-extrabold shadow-[0_2px_6px_rgba(120,53,15,0.06)]", dot: "bg-amber-800" };
    case "grocery": return { text: "text-lime-700", bg: "bg-lime-50/70 border-l-2 border-lime-700 font-extrabold shadow-[0_2px_6px_rgba(101,163,13,0.06)]", dot: "bg-lime-700" };
    case "electronics": return { text: "text-cyan-600", bg: "bg-cyan-50/70 border-l-2 border-cyan-600 font-extrabold shadow-[0_2px_6px_rgba(8,145,178,0.06)]", dot: "bg-cyan-600" };
    case "hospital": return { text: "text-green-600", bg: "bg-green-50/70 border-l-2 border-green-600 font-extrabold shadow-[0_2px_6px_rgba(22,163,74,0.06)]", dot: "bg-green-600" };
    case "pharmacy": return { text: "text-teal-600", bg: "bg-teal-50/70 border-l-2 border-teal-600 font-extrabold shadow-[0_2px_6px_rgba(13,148,136,0.06)]", dot: "bg-teal-600" };
    case "salon": return { text: "text-pink-600", bg: "bg-pink-50/70 border-l-2 border-pink-600 font-extrabold shadow-[0_2px_6px_rgba(219,39,119,0.06)]", dot: "bg-pink-600" };
    case "fashion": return { text: "text-purple-600", bg: "bg-purple-50/70 border-l-2 border-purple-600 font-extrabold shadow-[0_2px_6px_rgba(124,58,237,0.06)]", dot: "bg-purple-600" };
    case "education": return { text: "text-indigo-600", bg: "bg-indigo-50/70 border-l-2 border-indigo-600 font-extrabold shadow-[0_2px_6px_rgba(79,70,229,0.06)]", dot: "bg-indigo-600" };
    case "services": return { text: "text-slate-700", bg: "bg-slate-50/70 border-l-2 border-slate-700 font-extrabold shadow-[0_2px_6px_rgba(71,85,105,0.06)]", dot: "bg-slate-700" };
    default: return { text: "text-blue-600", bg: "bg-blue-50/70 border-l-2 border-blue-600 font-extrabold shadow-[0_2px_6px_rgba(37,99,235,0.06)]", dot: "bg-blue-600" };
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

  // Accordion Expand/Collapse State
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    business: true,
    catalog: true,
    marketing: true,
    finance: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Compute Unread chat badge
  const categoryChats = chats[currentCategory] || [];
  const unreadCount = categoryChats.reduce((sum, c) => sum + c.unread, 0);

  // Compute Pending orders badge
  const categoryOrders = orders[currentCategory] || [];
  const pendingOrders = categoryOrders.filter((o) =>
    ["Pending", "Preparing", "Scheduled", "Enrolled", "Processing"].includes(o.status)
  ).length;

  const handleLinkClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  const renderSectionHeader = (title: string, icon: React.ReactNode, isExpanded: boolean, onToggle: () => void) => (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider hover:text-gray-900 transition-colors"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </div>
      <ChevronDown
        size={14}
        className={cn(
          "transition-transform duration-200 text-gray-400",
          isExpanded ? "rotate-180" : ""
        )}
      />
    </button>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-gray-200 bg-white text-gray-800 transition-transform duration-300 lg:static lg:translate-x-0 shadow-sm",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header branding */}
        <div className="flex h-16 items-center gap-3 border-b border-gray-100 px-6 shrink-0 bg-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-500/10">
            <MessageSquare size={16} className="text-white fill-none" />
          </div>
          <span className="text-base font-black tracking-widest text-gray-900">
            CHATZO
          </span>
        </div>

        {/* Business workspace profile info */}
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3 shrink-0">
          <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl font-bold border border-gray-200 shrink-0 shadow-sm">
            {activeCategoryConfig.emoji}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black text-gray-900 truncate">{profile.businessName}</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{activeCategoryConfig.label} Workspace</p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4 custom-scrollbar bg-white">
          
          {/* Main Dashboard item */}
          <div className="space-y-0.5">
            <Link
              href={`/dashboard/${currentCategory}/overview`}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all hover:bg-gray-50",
                currentTab === "overview"
                  ? theme.bg + " " + theme.text
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <LayoutDashboard size={15} />
              <span>Command Center</span>
            </Link>
          </div>

          {/* Section: My Business */}
          <div className="space-y-1">
            {renderSectionHeader(
              "My Business",
              <Briefcase size={13} />,
              expandedSections.business,
              () => toggleSection("business")
            )}
            {expandedSections.business && (
              <div className="space-y-0.5 pl-4 border-l border-gray-100 ml-5 mt-1">
                {[
                  { id: "my-shop", label: "My Shop" },
                  { id: "branches", label: "Branches" },
                  { id: "staff", label: "Staff" },
                  { id: "hours", label: "Business Hours" },
                  { id: "hardware", label: "Hardware & Printing" }
                ].map(sub => (
                  <Link
                    key={sub.id}
                    href={`/dashboard/${currentCategory}/${sub.id}`}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:bg-gray-50",
                      currentTab === sub.id
                        ? theme.text + " font-bold"
                        : "text-gray-500 hover:text-gray-900"
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", currentTab === sub.id ? theme.dot : "bg-transparent")} />
                    <span>{sub.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Section: Orders & Catalog */}
          <div className="space-y-1">
            {renderSectionHeader(
              "Orders & Catalog",
              <ShoppingCart size={13} />,
              expandedSections.catalog,
              () => toggleSection("catalog")
            )}
            {expandedSections.catalog && (
              <div className="space-y-0.5 pl-4 border-l border-gray-100 ml-5 mt-1">
                <Link
                  href={`/dashboard/${currentCategory}/orders`}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:bg-gray-50",
                    currentTab === "orders" ? theme.text + " font-bold" : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", currentTab === "orders" ? theme.dot : "bg-transparent")} />
                    <span>Orders</span>
                  </div>
                  {pendingOrders > 0 && (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-black text-blue-600 border border-blue-100">
                      {pendingOrders}
                    </span>
                  )}
                </Link>
                {[
                  { id: "products", label: activeCategoryConfig.catalogLabel },
                  { id: "categories", label: "Categories" },
                  { id: "inventory", label: "Inventory" },
                  { id: "customers", label: "Customers" },
                  { id: "coupons", label: "Coupons" }
                ].map(sub => (
                  <Link
                    key={sub.id}
                    href={`/dashboard/${currentCategory}/${sub.id}`}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:bg-gray-50",
                      currentTab === sub.id
                        ? theme.text + " font-bold"
                        : "text-gray-500 hover:text-gray-900"
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", currentTab === sub.id ? theme.dot : "bg-transparent")} />
                    <span>{sub.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Section: Marketing */}
          <div className="space-y-1">
            {renderSectionHeader(
              "Marketing",
              <Megaphone size={13} />,
              expandedSections.marketing,
              () => toggleSection("marketing")
            )}
            {expandedSections.marketing && (
              <div className="space-y-0.5 pl-4 border-l border-gray-100 ml-5 mt-1">
                {[
                  { id: "campaigns", label: "Campaigns" },
                  { id: "broadcasts", label: "Broadcasts" }
                ].map(sub => (
                  <Link
                    key={sub.id}
                    href={`/dashboard/${currentCategory}/${sub.id}`}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:bg-gray-50",
                      currentTab === sub.id
                        ? theme.text + " font-bold"
                        : "text-gray-500 hover:text-gray-900"
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", currentTab === sub.id ? theme.dot : "bg-transparent")} />
                    <span>{sub.label}</span>
                  </Link>
                ))}
                
                {/* Inbox with Badge */}
                <Link
                  href={`/dashboard/${currentCategory}/chats`}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:bg-gray-50",
                    currentTab === "chats" ? theme.text + " font-bold" : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", currentTab === "chats" ? theme.dot : "bg-transparent")} />
                    <span>WhatsApp Inbox</span>
                  </div>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-[9px] font-black text-green-600 border border-green-100">
                      {unreadCount}
                    </span>
                  )}
                </Link>

                <Link
                  href={`/dashboard/${currentCategory}/reviews`}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:bg-gray-50",
                    currentTab === "reviews" ? theme.text + " font-bold" : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", currentTab === "reviews" ? theme.dot : "bg-transparent")} />
                  <span>Reviews</span>
                </Link>
              </div>
            )}
          </div>

          {/* Section: Finance */}
          <div className="space-y-1">
            {renderSectionHeader(
              "Finance",
              <DollarSign size={13} />,
              expandedSections.finance,
              () => toggleSection("finance")
            )}
            {expandedSections.finance && (
              <div className="space-y-0.5 pl-4 border-l border-gray-100 ml-5 mt-1">
                {[
                  { id: "revenue", label: "Revenue" },
                  { id: "transactions", label: "Transactions" },
                  { id: "invoices", label: "Invoices" },
                  { id: "payouts", label: "Payouts" }
                ].map(sub => (
                  <Link
                    key={sub.id}
                    href={`/dashboard/${currentCategory}/${sub.id}`}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:bg-gray-50",
                      currentTab === sub.id
                        ? theme.text + " font-bold"
                        : "text-gray-500 hover:text-gray-900"
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", currentTab === sub.id ? theme.dot : "bg-transparent")} />
                    <span>{sub.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Dedicated AI Assistant item */}
          <div className="space-y-0.5 pt-2 border-t border-gray-100">
            <Link
              href={`/dashboard/${currentCategory}/ai-assistant`}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all hover:bg-gray-50",
                currentTab === "ai-assistant"
                  ? theme.bg + " " + theme.text
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Sparkles size={15} />
              <span>AI Assistant</span>
            </Link>

            <Link
              href={`/dashboard/${currentCategory}/settings`}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all hover:bg-gray-50",
                currentTab === "settings"
                  ? theme.bg + " " + theme.text
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Settings size={15} />
              <span>Settings</span>
            </Link>

            <Link
              href={`/dashboard/${currentCategory}/report-issue`}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all hover:bg-gray-50",
                currentTab === "report-issue"
                  ? theme.bg + " " + theme.text
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <AlertCircle size={15} />
              <span>Report an Issue</span>
            </Link>
          </div>

        </nav>

        {/* Footer profile segment */}
        <div className="border-t border-gray-100 p-4 shrink-0 bg-white">
          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3 border border-gray-100">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative h-9 w-9 shrink-0 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600 border border-blue-200 text-xs">
                {profile.ownerName.split(" ").map(n => n[0]).join("")}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate leading-tight">{profile.ownerName}</p>
                <p className="text-[10px] text-gray-500 truncate leading-none mt-0.5">{profile.subscriptionPlan} Plan</p>
              </div>
            </div>
            <button
              onClick={() => {
                window.location.href = "/login";
              }}
              title="Sign Out"
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-red-600 transition-all cursor-pointer"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
