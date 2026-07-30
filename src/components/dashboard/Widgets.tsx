"use client";

import React, { useState, useEffect } from "react";
import { CategoryConfig } from "@/lib/config/categories";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { ProductItem } from "@/lib/api/products";
import { SupportTicket, PrinterDevice } from "@/lib/types/merchant";
import {
  TrendingUp,
  ShoppingCart,
  Users,
  MessageSquare,
  DollarSign,
  Percent,
  Clock,
  Briefcase,
  Activity,
  Plus,
  Send,
  Zap,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Inbox,
  User,
  ShieldCheck,
  Star,
  Download,
  AlertCircle,
  Printer,
  Upload,
  Layers,
  Check,
  Megaphone,
  Store,
  Sun,
  CloudSun,
  Moon,
  Search,
  Trash2,
  Info,
  MapPin,
  SlidersHorizontal,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppConnectModal } from "@/components/dashboard/WhatsAppConnectModal";
import { EmptyState } from "@/components/dashboard/EmptyState";

interface WidgetTabProps {
  category: string;
  config: CategoryConfig;
}

const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
  useWorkspaceStore.getState().showToast(message, type);
};

/* ───────────────────────────────────────────────────────── */
/* ─── THEME ACCENT COLOR HELPERS ────────────────────────── */
/* ───────────────────────────────────────────────────────── */
const getCategoryColors = (category: string) => {
  switch (category) {
    case "retail":
      return { primary: "bg-blue-600 hover:bg-blue-700 text-white", text: "text-blue-600", border: "border-blue-200", bg: "bg-blue-50/70", fill: "#2563EB" };
    case "restaurant":
      return { primary: "bg-orange-600 hover:bg-orange-700 text-white", text: "text-orange-600", border: "border-orange-200", bg: "bg-orange-50/70", fill: "#EA580C" };
    case "bakery":
      return { primary: "bg-amber-800 hover:bg-amber-900 text-white", text: "text-amber-800", border: "border-amber-200", bg: "bg-amber-50/70", fill: "#78350F" };
    case "grocery":
      return { primary: "bg-lime-600 hover:bg-lime-700 text-white", text: "text-lime-700", border: "border-lime-200", bg: "bg-lime-50/70", fill: "#65A30D" };
    case "electronics":
      return { primary: "bg-cyan-600 hover:bg-cyan-700 text-white", text: "text-cyan-600", border: "border-cyan-200", bg: "bg-cyan-50/70", fill: "#0891B2" };
    case "hospital":
      return { primary: "bg-emerald-600 hover:bg-emerald-700 text-white", text: "text-emerald-600", border: "border-emerald-200", bg: "bg-emerald-50/70", fill: "#059669" };
    case "pharmacy":
      return { primary: "bg-teal-600 hover:bg-teal-700 text-white", text: "text-teal-600", border: "border-teal-200", bg: "bg-teal-50/70", fill: "#0D9488" };
    case "salon":
      return { primary: "bg-pink-600 hover:bg-pink-700 text-white", text: "text-pink-600", border: "border-pink-200", bg: "bg-pink-50/70", fill: "#DB2777" };
    case "fashion":
      return { primary: "bg-purple-600 hover:bg-purple-700 text-white", text: "text-purple-600", border: "border-purple-200", bg: "bg-purple-50/70", fill: "#7C3AED" };
    case "education":
      return { primary: "bg-indigo-600 hover:bg-indigo-700 text-white", text: "text-indigo-600", border: "border-indigo-200", bg: "bg-indigo-50/70", fill: "#4F46E5" };
    case "services":
      return { primary: "bg-slate-800 hover:bg-slate-900 text-white", text: "text-slate-800", border: "border-slate-300", bg: "bg-slate-100/70", fill: "#1E293B" };
    default:
      return { primary: "bg-emerald-600 hover:bg-emerald-700 text-white", text: "text-emerald-600", border: "border-emerald-200", bg: "bg-emerald-50/70", fill: "#059669" };
  }
};

const getKPIIcon = (name: string, colorClass: string) => {
  const props = { size: 18, className: colorClass };
  switch (name) {
    case "TrendingUp": return <TrendingUp {...props} />;
    case "ShoppingCart": return <ShoppingCart {...props} />;
    case "Users": return <Users {...props} />;
    case "MessageSquare": return <MessageSquare {...props} />;
    case "DollarSign": return <DollarSign {...props} />;
    case "Percent": return <Percent {...props} />;
    case "Clock": return <Clock {...props} />;
    case "Calendar": return <Calendar {...props} />;
    case "ShieldCheck": return <ShieldCheck {...props} />;
    case "User": return <User {...props} />;
    case "FileText": return <FileText {...props} />;
    default: return <Activity {...props} />;
  }
};

/* ───────────────────────────────────────────────────────── */
/* ─── SKELETON SCREEN LOADER ────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
function SkeletonLoader() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-200 rounded-lg"></div>
          <div className="h-4 w-80 bg-slate-100 rounded-lg"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-slate-200 rounded"></div>
              <div className="h-8 w-8 bg-slate-100 rounded-xl"></div>
            </div>
            <div className="h-8 w-28 bg-slate-200 rounded-md"></div>
          </div>
        ))}
      </div>
      <div className="h-64 bg-white border border-slate-200/80 rounded-2xl"></div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── PAGE WRAPPER ──────────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
interface PageWrapperProps {
  title: string;
  description: string;
  category: string;
  kpis?: { title: string; value: string | number; change: string; icon: string; trend?: "up" | "down" }[];
  children: React.ReactNode;
}

function PageWrapper({ title, description, category, kpis, children }: PageWrapperProps) {
  const { isLoading, setLoading } = useWorkspaceStore();
  const theme = getCategoryColors(category);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, [title, setLoading]);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="space-y-6 text-slate-900 font-sans antialiased">
      {/* Header Info */}
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">{title}</h2>
        <p className="text-sm text-slate-500 font-medium">{description}</p>
      </div>

      {/* KPI Cards Grid */}
      {kpis && kpis.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.map((kpi, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              <div className={cn("absolute top-0 left-0 right-0 h-1", theme.primary)} />
              
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.title}</span>
                <div className={cn("p-2 rounded-xl transition-transform group-hover:scale-105 duration-200 shrink-0", theme.bg)}>
                  {getKPIIcon(kpi.icon, theme.text)}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-none">{kpi.value}</h3>
                <div className="flex items-center gap-2 text-xs font-medium">
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide",
                    kpi.trend === "down" ? "bg-red-50 text-red-700 border border-red-200/60" : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  )}>
                    {kpi.change}
                  </span>
                  <span className="text-slate-400">vs yesterday</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 1. OVERVIEW TAB ───────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function OverviewTab({ category, config }: WidgetTabProps) {
  const {
    products,
    orders,
    onboardingChecklists,
    toggleOnboardingStep,
    chats,
    profile,
    updateProfile,
    updateOrderStatus,
    transactions,
  } = useWorkspaceStore();

  const [showWAModal, setShowWAModal] = useState(false);

  const categoryProducts = products[category] || [];
  const categoryOrders = orders[category] || [];
  const activeChats = chats[category] || [];

  // Dynamic greeting with Lucide Icons
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good Morning", icon: <Sun className="h-5 w-5 text-amber-500" /> };
    if (hour < 17) return { text: "Good Afternoon", icon: <CloudSun className="h-5 w-5 text-amber-500" /> };
    return { text: "Good Evening", icon: <Moon className="h-5 w-5 text-indigo-400" /> };
  };

  const greeting = getGreeting();

  const revenueValue = categoryOrders
    .filter((o) =>
      ["Paid", "Completed", "Shipped", "Preparing", "Scheduled", "Enrolled", "Dispensed", "Verified"].includes(o.status)
    )
    .reduce((sum, o) => sum + o.total, 0);

  const activeOrdersList = categoryOrders.filter((o) =>
    ["Pending", "Preparing", "Shipped", "Processing", "Accepted"].includes(o.status)
  );

  const unreadChats = activeChats.reduce((sum, c) => sum + c.unread, 0);

  const onboardingSteps = [
    "Connect WhatsApp",
    "Add Category",
    "Add Product",
    "Configure Operating Hours",
    "Enable Accept Orders",
  ];
  const completedSteps = onboardingChecklists[category] || [];
  const checklistProgress = Math.round(
    (onboardingSteps.filter((s) => completedSteps.includes(s)).length / onboardingSteps.length) * 100
  );

  const isWhatsAppConnected = profile.whatsappStatus === "Connected";

  return (
    <div className="space-y-6 font-sans">
      {/* HERO SECTION */}
      <div className="relative rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/60 p-6 md:p-8 shadow-xs overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            {/* Greeting */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-emerald-200/60 backdrop-blur-xs">
              {greeting.icon}
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                {greeting.text}
              </span>
            </div>

            {/* Business name */}
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {profile.businessName || "Your Business"}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
                  <span>{config.emoji}</span>
                  <span>{config.label}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-100/80 border border-emerald-200/80 text-xs font-bold text-emerald-900">
                  <Sparkles size={12} className="text-emerald-700" />
                  {profile.subscriptionPlan || "Free"} Plan
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold",
                    isWhatsAppConnected
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-amber-50 border-amber-200 text-amber-800"
                  )}
                >
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full shrink-0",
                      isWhatsAppConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-400"
                    )}
                  />
                  {isWhatsAppConnected ? "WhatsApp Connected" : "WhatsApp Not Connected"}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 font-medium">
              Welcome back, <span className="text-slate-900 font-bold">{profile.ownerName || "Merchant"}</span>. Here is your business overview for today.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
            {!isWhatsAppConnected && (
              <button
                onClick={() => setShowWAModal(true)}
                className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all active:scale-98 cursor-pointer"
              >
                <MessageSquare size={16} />
                Connect WhatsApp
              </button>
            )}
            <button
              onClick={() => {
                const nextStatus = profile.businessStatus === "Online" ? "Offline" : "Online";
                updateProfile({ businessStatus: nextStatus });
              }}
              className={cn(
                "inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl font-bold text-xs transition-all active:scale-98 border cursor-pointer",
                profile.businessStatus === "Online"
                  ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  : "bg-emerald-600 text-white border-transparent hover:bg-emerald-700 shadow-sm"
              )}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full shrink-0",
                  profile.businessStatus === "Online" ? "bg-emerald-500 animate-pulse" : "bg-slate-300"
                )}
              />
              {profile.businessStatus === "Online" ? "Store Open" : "Open Store"}
            </button>
            {unreadChats > 0 && (
              <div className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                <AlertCircle size={15} className="text-amber-600 shrink-0" />
                {unreadChats} unread message{unreadChats !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>
      </div>

      <WhatsAppConnectModal isOpen={showWAModal} onClose={() => setShowWAModal(false)} />

      {/* SETUP CHECKLIST */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Setup Checklist</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Complete these steps to start accepting orders</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-extrabold text-slate-900">{checklistProgress}%</span>
            <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${checklistProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {onboardingSteps.map((step) => {
            const isDone = completedSteps.includes(step);
            const isWA = step === "Connect WhatsApp";
            return (
              <button
                key={step}
                onClick={() => {
                  if (isWA && !isDone) {
                    setShowWAModal(true);
                  } else {
                    toggleOnboardingStep(category, step);
                  }
                }}
                className={cn(
                  "flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer group",
                  isDone
                    ? "border-emerald-200 bg-emerald-50/60 text-emerald-900"
                    : "border-slate-200/80 bg-slate-50/50 text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900"
                )}
              >
                <span className="text-xs font-semibold truncate pr-2">{step}</span>
                {isDone ? (
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-slate-300 group-hover:border-slate-400 shrink-0 transition-colors" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="dashboard-card flex flex-col justify-between h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500 rounded-t-2xl" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <ShoppingCart size={18} className="text-emerald-600" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
              {categoryOrders.length}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-2">
              {categoryOrders.length === 0 ? "No orders yet" : `${activeOrdersList.length} active orders`}
            </p>
          </div>
        </div>

        <div className="dashboard-card flex flex-col justify-between h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-blue-500 rounded-t-2xl" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue</span>
            <div className="h-9 w-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <DollarSign size={18} className="text-blue-600" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
              ₹{revenueValue.toLocaleString()}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-2">
              {revenueValue === 0 ? "No revenue yet" : "Confirmed payments"}
            </p>
          </div>
        </div>

        <div className="dashboard-card flex flex-col justify-between h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-purple-500 rounded-t-2xl" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Products</span>
            <div className="h-9 w-9 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
              <Layers size={18} className="text-purple-600" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
              {categoryProducts.length}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-2">
              {categoryProducts.length === 0 ? "No products yet" : `${categoryProducts.filter(p => p.status === "Available").length} in stock`}
            </p>
          </div>
        </div>

        <div className="dashboard-card flex flex-col justify-between h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500 rounded-t-2xl" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">WA Chats</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <MessageSquare size={18} className="text-emerald-600" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
              {activeChats.length}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-2">
              {unreadChats > 0 ? `${unreadChats} unread messages` : "No unread messages"}
            </p>
          </div>
        </div>
      </div>

      {/* ORDER PIPELINE */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Order Pipeline</h3>
          <span className="text-xs text-slate-500 font-medium">{activeOrdersList.length} active orders</span>
        </div>
        {categoryOrders.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart size={24} />}
            title="No orders received yet"
            description="Orders placed through your WhatsApp store will appear here in real-time."
            size="sm"
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: "Pending", count: activeOrdersList.filter(o => o.status === "Pending").length, border: "border-amber-400 bg-amber-50/30" },
              { label: "Accepted", count: activeOrdersList.filter(o => o.status === "Accepted").length, border: "border-blue-400 bg-blue-50/30" },
              { label: "Preparing", count: activeOrdersList.filter(o => o.status === "Preparing").length, border: "border-orange-400 bg-orange-50/30" },
              { label: "Ready", count: activeOrdersList.filter(o => o.status === "Ready").length, border: "border-indigo-400 bg-indigo-50/30" },
              { label: "Delivering", count: activeOrdersList.filter(o => o.status === "Shipped").length, border: "border-emerald-400 bg-emerald-50/30" },
            ].map((stage) => (
              <div
                key={stage.label}
                className={cn("border-l-4 rounded-xl p-4 border border-slate-200/60 flex flex-col justify-between h-22", stage.border)}
              >
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stage.label}</span>
                <h4 className="text-2xl font-black text-slate-900">{stage.count}</h4>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACTIVE ORDERS + WHATSAPP INBOX */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Orders */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col min-h-[320px]">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Active Orders</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Requiring action</p>
            </div>
            <span className="text-xs text-slate-500 font-bold">{activeOrdersList.length} total</span>
          </div>

          {activeOrdersList.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon={<Inbox size={22} />}
                title="All clear!"
                description="No pending orders. New orders will appear here in real-time."
                size="sm"
              />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-2.5 custom-scrollbar pr-1">
              {activeOrdersList.map((o) => (
                <div key={o.id} className="p-4 border border-slate-200/80 rounded-xl bg-slate-50/30 hover:bg-white transition-all flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-600">{o.id}</span>
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200/60 rounded-md text-[10px] font-bold uppercase">{o.status}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900">{o.customer}</p>
                    <p className="text-[11px] text-slate-500 font-mono">{o.phone}</p>
                  </div>
                  <div className="text-right space-y-2 shrink-0">
                    <p className="text-sm font-black text-slate-900">₹{o.total}</p>
                    <button
                      onClick={() => {
                        updateOrderStatus(category, o.id, "Completed");
                        showToast(`Order ${o.id} marked as Completed.`, "success");
                      }}
                      className="h-8 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WhatsApp Inbox */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col min-h-[320px]">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">WhatsApp Inbox</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Recent customer conversations</p>
            </div>
            {unreadChats > 0 && (
              <span className="px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-black rounded-full">
                {unreadChats} unread
              </span>
            )}
          </div>
          {activeChats.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon={<MessageSquare size={22} />}
                title="No conversations yet"
                description="Connect your WhatsApp to start receiving customer messages."
                size="sm"
              />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-2.5 custom-scrollbar pr-1">
              {activeChats.slice(0, 5).map((chat) => (
                <div key={chat.id} className="p-3.5 border border-slate-200/80 rounded-xl bg-slate-50/30 hover:bg-white transition-all flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs">
                      {chat.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{chat.name}</p>
                      <p className="text-[11px] text-slate-500 truncate font-medium">{chat.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-slate-400 font-medium">{chat.time}</p>
                    {chat.unread > 0 && (
                      <span className="mt-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-emerald-600 text-white text-[10px] font-black">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <EmptyState
            icon={<DollarSign size={24} />}
            title="No transactions yet"
            description="Completed order payments will appear here."
            size="sm"
          />
        ) : (
          <div className="space-y-2.5">
            {transactions.slice(0, 4).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3.5 border border-slate-200/80 rounded-xl bg-slate-50/30">
                <div>
                  <p className="text-xs font-bold text-slate-900">₹{t.amount.toLocaleString()}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{t.type} • {t.date}</p>
                </div>
                <span className={cn(
                  "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                  t.status === "Settled" ? "bg-emerald-50 text-emerald-800 border-emerald-200/60" :
                  t.status === "Processing" ? "bg-amber-50 text-amber-800 border-amber-200/60" :
                  "bg-red-50 text-red-800 border-red-200/60"
                )}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 2. MY SHOP TAB ────────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function MyShopTab({ category }: WidgetTabProps) {
  const { profile, updateProfile, orders, products, deliveryZones, addDeliveryZone, addItem } = useWorkspaceStore();
  const colors = getCategoryColors(category);

  const [activeSubTab, setActiveSubTab] = useState<"home" | "products" | "catalog" | "storefront" | "location" | "settings">("home");

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [detailsForm, setDetailsForm] = useState({ ...profile });

  const [isEditingHours, setIsEditingHours] = useState(false);
  const [hoursForm, setHoursForm] = useState({ ...profile.businessHours });

  const [isEditingDelivery, setIsEditingDelivery] = useState(false);
  const [deliveryForm, setDeliveryForm] = useState({
    deliveryCharges: profile.deliveryCharges || 0,
    freeDeliveryThreshold: profile.freeDeliveryThreshold || 0,
    deliveryTime: profile.deliveryTime || "30-45 mins",
    deliveryRadius: profile.deliveryRadius || 5,
  });

  const [ordersEmptyState, setOrdersEmptyState] = useState(false);
  const categoryOrders = orders[category] || [];

  const categoryProducts = products[category] || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState<"all" | "in-stock" | "out-of-stock">("all");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, secondary: "", stock: 10 });

  const [invoiceLogo, setInvoiceLogo] = useState(profile.invoiceLogo || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80");
  const [invoiceColor, setInvoiceColor] = useState(profile.invoiceColor || "#2563EB");
  const [taxRate, setTaxRate] = useState(profile.productTaxPercent || 5);
  const [taxEnabled, setTaxEnabled] = useState(true);

  const triggerSaveNotification = (msg: string) => {
    showToast(msg, "info");
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(detailsForm);
    setIsEditingDetails(false);
    triggerSaveNotification("Business Details saved successfully.");
  };

  const handleSaveHours = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ businessHours: hoursForm });
    setIsEditingHours(false);
    triggerSaveNotification("Operating Hours updated successfully.");
  };

  const handleSaveDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(deliveryForm);
    setIsEditingDelivery(false);
    triggerSaveNotification("Delivery Configurations updated successfully.");
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.price <= 0) {
      showToast("Please provide valid product name and price.", "error");
      return;
    }
    addItem(category, {
      name: newProduct.name,
      price: newProduct.price,
      secondary: newProduct.secondary || "Standard Catalog Item",
      status: newProduct.stock > 0 ? "Available" : "Out of Stock",
      stock: newProduct.stock,
    });
    setIsAddProductOpen(false);
    setNewProduct({ name: "", price: 0, secondary: "", stock: 10 });
    triggerSaveNotification("Product added successfully to workspace catalog.");
  };

  return (
    <div className="space-y-6 font-sans antialiased text-slate-900">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/80 pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">My Shop</h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium">Manage your shop profile, storefront, products and business settings.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveSubTab("settings")}
            className="h-9 px-3.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Edit Shop
          </button>
          <button
            onClick={() => showToast("Banner file selector opened.", "info")}
            className="h-9 px-3.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Change Banner
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(profile.website);
              showToast("Store link copied to clipboard!", "success");
            }}
            className={cn("h-9 px-3.5 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs", colors.primary)}
          >
            Share Store
          </button>
        </div>
      </div>

      {/* SHOP PROFILE HERO */}
      <div className="rounded-3xl border border-slate-200/80 shadow-xs bg-white overflow-hidden">
        {/* Cover Banner */}
        <div className="h-40 md:h-48 w-full bg-slate-100 bg-cover bg-center relative" style={{ backgroundImage: "url(" + profile.businessBanner + ")" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content Section */}
        <div className="px-6 pb-6 pt-0 md:px-8 md:pb-8 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-12 sm:-mt-14 relative z-10 w-full sm:w-auto">
            {/* Logo */}
            <img
              src={profile.businessLogo}
              alt="Logo"
              className="h-24 w-24 rounded-2xl border-4 border-white bg-slate-100 shadow-md object-cover shrink-0"
            />
            <div className="text-center sm:text-left space-y-2 pt-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  {profile.businessName}
                </h2>
                {profile.businessVerificationStatus === "Verified" && (
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200/60 rounded-md text-[10px] font-extrabold tracking-wider flex items-center gap-1">
                    <ShieldCheck size={12} className="text-blue-600" /> VERIFIED
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                {"@" + (profile.storeUsername || "merchant") + " • " + profile.businessCategory}
              </p>

              {/* Ratings and Link */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/60">
                  <Star size={14} className="fill-amber-400 text-amber-500" />
                  <span className="text-slate-900 font-extrabold">
                    {profile.storeRating ? profile.storeRating : "No ratings yet"}
                  </span>
                  {profile.storeRating && <span className="text-slate-400">({profile.ordersCount} reviews)</span>}
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60 max-w-xs">
                  <span className="text-slate-600 font-mono text-[11px] truncate">{profile.website}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(profile.website);
                      showToast("Store URL copied to clipboard!", "success");
                    }}
                    className="p-1 hover:bg-slate-200/60 rounded text-slate-500 transition-colors"
                    title="Copy URL"
                  >
                    <Copy size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Status Controls */}
          <div className="w-full lg:w-auto flex flex-wrap items-center justify-between sm:justify-end gap-4 border-t lg:border-none pt-4 lg:pt-0">
            <div className="text-left lg:text-right">
              <span className={cn(
                "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border",
                profile.businessStatus === "Online" ? "bg-emerald-50 text-emerald-800 border-emerald-200/60" : "bg-slate-100 text-slate-600 border-slate-200"
              )}>
                <span className={cn("h-2 w-2 rounded-full", profile.businessStatus === "Online" ? "bg-emerald-500 animate-pulse" : "bg-slate-400")} />
                {profile.businessStatus === "Online" ? "Store Open" : "Store Offline"}
              </span>
              <p className="text-[11px] text-slate-400 font-medium mt-1">Accepting orders schedule</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const nextStatus = profile.businessStatus === "Online" ? "Offline" : "Online";
                  updateProfile({ businessStatus: nextStatus });
                  triggerSaveNotification("Store Status switched to: " + nextStatus);
                }}
                className={cn(
                  "h-8 px-3 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer",
                  profile.businessStatus === "Offline" && "bg-slate-100 text-slate-400 pointer-events-none"
                )}
              >
                Go Offline
              </button>
              <button
                onClick={() => {
                  const nextStatus = profile.businessStatus === "Online" ? "Offline" : "Online";
                  updateProfile({ businessStatus: nextStatus });
                  triggerSaveNotification("Store Status switched to: " + nextStatus);
                }}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                  profile.businessStatus === "Online" ? colors.primary : "bg-slate-200"
                )}
              >
                <span className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out",
                  profile.businessStatus === "Online" ? "translate-x-5" : "translate-x-0"
                )} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BUSINESS METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Orders", val: categoryOrders.length, note: categoryOrders.length === 0 ? "No orders yet" : "All time", color: "text-slate-900" },
          { title: "Products", val: categoryProducts.length, note: categoryProducts.length === 0 ? "No products" : "In catalog", color: "text-purple-600" },
          { title: "Store Rating", val: profile.storeRating ? profile.storeRating : "No ratings yet", note: "Customer rating", color: "text-amber-600" },
          { title: "Pending Orders", val: categoryOrders.filter(o => ["Pending","Processing"].includes(o.status)).length, note: "Requires action", color: "text-orange-600" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-1.5 shadow-xs hover:shadow-sm transition-shadow">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">{item.title}</span>
            <h4 className={cn("text-xl font-black tracking-tight", item.color)}>{item.val}</h4>
            <span className="text-[11px] font-medium text-slate-500 block">{item.note}</span>
          </div>
        ))}
      </div>

      {/* SUB TABS NAVIGATION */}
      <div className="flex border-b border-slate-200 overflow-x-auto whitespace-nowrap scrollbar-none gap-2 font-sans pt-1">
        {(["home", "products", "catalog", "storefront", "location", "settings"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={cn(
              "px-4 py-3 border-b-2 font-bold text-xs md:text-sm transition-all duration-150 capitalize cursor-pointer",
              activeSubTab === tab
                ? "border-emerald-600 text-emerald-600"
                : "border-transparent text-slate-400 hover:text-slate-900 hover:border-slate-300"
            )}
          >
            {tab === "storefront" ? "Storefront & QR" : tab === "settings" ? "Settings Workspace" : tab}
          </button>
        ))}
      </div>

      {/* SUB-TAB CONTENTS */}
      <div className="space-y-6">
        {activeSubTab === "home" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Workspace Health & Performance</h3>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-md">HEALTHY</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
                  <div className="p-4 border border-slate-200/60 rounded-xl bg-slate-50/50 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Page Load Latency</span>
                    <span className="text-sm font-black text-slate-900">1.2s average</span>
                    <span className="text-[10px] text-emerald-600 block">Fast Compliance</span>
                  </div>
                  <div className="p-4 border border-slate-200/60 rounded-xl bg-slate-50/50 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Meta API uptime</span>
                    <span className="text-sm font-black text-slate-900">99.98% uptime</span>
                    <span className="text-[10px] text-blue-600 block">Sync online</span>
                  </div>
                  <div className="p-4 border border-slate-200/60 rounded-xl bg-slate-50/50 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Customer Response</span>
                    <span className="text-sm font-black text-slate-900">&lt; 3 mins ETA</span>
                    <span className="text-[10px] text-emerald-600 block">SLA Compliant</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Quick Shortcuts</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button onClick={() => setActiveSubTab("settings")} className="h-9 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-center transition-colors cursor-pointer">Setup API</button>
                    <button onClick={() => setActiveSubTab("products")} className="h-9 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-center transition-colors cursor-pointer">Add Catalog</button>
                    <button onClick={() => setActiveSubTab("storefront")} className="h-9 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-center transition-colors cursor-pointer">QR Prints</button>
                    <button onClick={() => showToast("Report logs exported successfully.", "success")} className="h-9 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-center transition-colors cursor-pointer">Export Logs</button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-3">Shop Health Indexes</h3>
                <div className="space-y-3 text-xs font-medium">
                  <div className="flex justify-between items-center"><span className="text-slate-500">Merchant Account ID</span><span className="font-mono font-bold text-slate-900">{profile.merchantId}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500">Active Workspace</span><span className="font-mono font-bold text-slate-900">{profile.workspaceId}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500">Linked Category</span><span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-bold uppercase text-[10px]">{profile.businessCategory}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500">Subscription tier</span><span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md font-bold uppercase text-[10px]">{profile.subscriptionPlan}</span></div>
                </div>
              </div>
            </div>

            {/* BUSINESS PROFILE DETAILS */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Business Profile Details</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Corporate identities and contact records</p>
                </div>
                <button
                  onClick={() => setIsEditingDetails(!isEditingDetails)}
                  className="h-8 px-3 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {isEditingDetails ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              {isEditingDetails ? (
                <form onSubmit={handleSaveDetails} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Business Name</label>
                    <input
                      type="text"
                      value={detailsForm.businessName}
                      onChange={(e) => setDetailsForm({ ...detailsForm, businessName: e.target.value })}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Owner Full Name</label>
                    <input
                      type="text"
                      value={detailsForm.ownerName}
                      onChange={(e) => setDetailsForm({ ...detailsForm, ownerName: e.target.value })}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Business Email</label>
                    <input
                      type="email"
                      value={detailsForm.email}
                      onChange={(e) => setDetailsForm({ ...detailsForm, email: e.target.value })}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Support Phone Number</label>
                    <input
                      type="text"
                      value={detailsForm.phone}
                      onChange={(e) => setDetailsForm({ ...detailsForm, phone: e.target.value })}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Country</label>
                    <input
                      type="text"
                      value={detailsForm.country}
                      onChange={(e) => setDetailsForm({ ...detailsForm, country: e.target.value })}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Timezone</label>
                    <input
                      type="text"
                      value={detailsForm.timezone}
                      onChange={(e) => setDetailsForm({ ...detailsForm, timezone: e.target.value })}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-semibold"
                    />
                  </div>
                  <div className="sm:col-span-3 flex justify-end pt-2">
                    <button
                      type="submit"
                      className={cn("h-9 px-5 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-colors", colors.primary)}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="h-20 w-20 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shadow-xs shrink-0">
                    {profile.businessLogo ? (
                      <img src={profile.businessLogo} alt="Logo" className="h-full w-full object-cover" />
                    ) : (
                      <Store className="h-8 w-8 text-slate-400" />
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 w-full text-xs">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Business Name</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-900 font-bold text-sm">{profile.businessName || "—"}</span>
                        {profile.businessVerificationStatus === "Verified" && (
                          <span className="inline-flex items-center justify-center bg-emerald-50 text-emerald-600 border border-emerald-200/60 rounded-full p-0.5" title="Verified">
                            <Check size={10} className="stroke-[3]" />
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Business Category</span>
                      <span className="text-slate-800 font-bold uppercase">{profile.businessCategory || "—"}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Owner Name</span>
                      <span className="text-slate-800 font-bold">{profile.ownerName || "—"}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</span>
                      <span className="text-slate-800 font-medium">{profile.email || "—"}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Phone Number</span>
                      <span className="text-slate-800 font-medium">{profile.phone || "—"}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Country / Currency</span>
                      <span className="text-slate-800 font-bold">{(profile.country || "—") + " (" + (profile.currency || "—") + ")"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* OPERATING HOURS & DELIVERY CONFIG */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Operating Hours */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Operating Hours</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Define schedule and closures</p>
                  </div>
                  <button
                    onClick={() => setIsEditingHours(!isEditingHours)}
                    className="h-8 px-3 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {isEditingHours ? "Cancel" : "Edit Hours"}
                  </button>
                </div>

                <form onSubmit={handleSaveHours} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Opening Time</label>
                      <input
                        type="time"
                        disabled={!isEditingHours}
                        value={hoursForm.monday.split(" - ")[0] || "09:00"}
                        onChange={(e) => {
                          const endTime = hoursForm.monday.split(" - ")[1] || "22:00";
                          const formatted = e.target.value + " - " + endTime;
                          setHoursForm({
                            monday: formatted, tuesday: formatted, wednesday: formatted,
                            thursday: formatted, friday: formatted, saturday: formatted, sunday: formatted
                          });
                        }}
                        className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 font-semibold disabled:bg-slate-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Closing Time</label>
                      <input
                        type="time"
                        disabled={!isEditingHours}
                        value={hoursForm.monday.split(" - ")[1] || "22:00"}
                        onChange={(e) => {
                          const startTime = hoursForm.monday.split(" - ")[0] || "09:00";
                          const formatted = startTime + " - " + e.target.value;
                          setHoursForm({
                            monday: formatted, tuesday: formatted, wednesday: formatted,
                            thursday: formatted, friday: formatted, saturday: formatted, sunday: formatted
                          });
                        }}
                        className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 font-semibold disabled:bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Working Days</span>
                    <div className="flex flex-wrap gap-1.5 text-xs font-bold text-slate-700">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <span key={day} className="px-2.5 py-1 bg-slate-50 border border-slate-200/60 rounded-lg flex items-center gap-1">
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>

                  {isEditingHours && (
                    <div className="flex justify-end pt-2">
                      <button type="submit" className={cn("h-9 px-4 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer", colors.primary)}>
                        Save Hours
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* Delivery Settings */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Delivery Configuration</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Set fees, limits and service radii</p>
                  </div>
                  <button
                    onClick={() => setIsEditingDelivery(!isEditingDelivery)}
                    className="h-8 px-3 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {isEditingDelivery ? "Cancel" : "Edit Config"}
                  </button>
                </div>

                <form onSubmit={handleSaveDelivery} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase block">Delivery Charge (₹)</label>
                      <input
                        type="number"
                        disabled={!isEditingDelivery}
                        value={deliveryForm.deliveryCharges}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, deliveryCharges: Number(e.target.value) })}
                        className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 font-bold disabled:bg-slate-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase block">Free Delivery Min (₹)</label>
                      <input
                        type="number"
                        disabled={!isEditingDelivery}
                        value={deliveryForm.freeDeliveryThreshold}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, freeDeliveryThreshold: Number(e.target.value) })}
                        className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 font-bold disabled:bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase block">Delivery ETA</label>
                      <input
                        type="text"
                        disabled={!isEditingDelivery}
                        value={deliveryForm.deliveryTime}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, deliveryTime: e.target.value })}
                        className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 font-semibold disabled:bg-slate-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase block">Radius (km)</label>
                      <input
                        type="number"
                        disabled={!isEditingDelivery}
                        value={deliveryForm.deliveryRadius}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, deliveryRadius: Number(e.target.value) })}
                        className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 font-semibold disabled:bg-slate-50"
                      />
                    </div>
                  </div>

                  {isEditingDelivery && (
                    <div className="flex justify-end pt-2">
                      <button type="submit" className={cn("h-9 px-4 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer", colors.primary)}>
                        Save Settings
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* RECENT ORDERS TABLE */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Workspace Orders</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Audit log of customer checkouts</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOrdersEmptyState(!ordersEmptyState)}
                    className="h-8 px-3 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200/60 rounded-lg hover:bg-blue-100/50 transition-colors cursor-pointer"
                  >
                    Toggle Empty State
                  </button>
                </div>
              </div>

              {ordersEmptyState || categoryOrders.length === 0 ? (
                <EmptyState
                  icon={<Inbox size={28} />}
                  title="No Recent Transactions"
                  description="Workspace checkout logs are empty. Orders placed through storefront catalog links will appear here."
                  size="md"
                />
              ) : (
                <div className="overflow-x-auto max-h-[350px] relative">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-5 bg-slate-50">ID</th>
                        <th className="py-3 px-5 bg-slate-50">Customer</th>
                        <th className="py-3 px-5 bg-slate-50">Total Amount</th>
                        <th className="py-3 px-5 bg-slate-50">Order Status</th>
                        <th className="py-3 px-5 bg-slate-50">Payment Mode</th>
                        <th className="py-3 px-5 bg-slate-50">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {categoryOrders.slice(0, 4).map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50/50 transition-colors font-medium">
                          <td className="py-3.5 px-5 font-mono font-bold text-blue-600">{o.id}</td>
                          <td className="py-3.5 px-5 font-bold text-slate-900">{o.customer}</td>
                          <td className="py-3.5 px-5 font-black text-slate-900">₹{o.total}</td>
                          <td className="py-3.5 px-5">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-slate-500 font-mono">Razorpay Online</td>
                          <td className="py-3.5 px-5 text-slate-400 font-mono">{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRODUCTS SUB TAB */}
        {activeSubTab === "products" && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Products Catalog Workspace</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Toggle availability and stock counts</p>
              </div>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className={cn("h-9 px-4 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer", colors.primary)}
              >
                <Plus size={15} /> Add Product
              </button>
            </div>

            {/* Filter Dashboard Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-72">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search catalog products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 text-xs focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>
              <div className="flex gap-2 text-xs font-bold text-slate-600 w-full sm:w-auto">
                <button onClick={() => setStockFilter("all")} className={cn("h-8 px-3 border rounded-lg transition-all cursor-pointer", stockFilter === "all" ? "bg-slate-100 text-slate-900 border-slate-300" : "border-slate-200 hover:bg-slate-50")}>{"All (" + categoryProducts.length + ")"}</button>
                <button onClick={() => setStockFilter("in-stock")} className={cn("h-8 px-3 border rounded-lg transition-all cursor-pointer", stockFilter === "in-stock" ? "bg-slate-100 text-slate-900 border-slate-300" : "border-slate-200 hover:bg-slate-50")}>In Stock</button>
                <button onClick={() => setStockFilter("out-of-stock")} className={cn("h-8 px-3 border rounded-lg transition-all cursor-pointer", stockFilter === "out-of-stock" ? "bg-slate-100 text-slate-900 border-slate-300" : "border-slate-200 hover:bg-slate-50")}>Out of Stock</button>
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryProducts
                .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .filter((p) => {
                  if (stockFilter === "in-stock") return p.status === "Available";
                  if (stockFilter === "out-of-stock") return p.status === "Out of Stock";
                  return true;
                })
                .map((product) => (
                  <div key={product.id} className="p-5 border border-slate-200/80 rounded-2xl bg-white shadow-xs flex flex-col justify-between h-44 relative hover:shadow-md transition-shadow">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-slate-400 font-bold">{product.id}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider border",
                          product.status === "Available" ? "bg-emerald-50 text-emerald-800 border-emerald-200/60" : "bg-red-50 text-red-800 border-red-200/60"
                        )}>
                          {product.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate">{product.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{product.secondary}</p>
                    </div>

                    <div className="flex justify-between items-end border-t border-slate-100 pt-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Catalog Price</span>
                        <span className="text-base font-black text-slate-900">₹{product.price}</span>
                      </div>
                      <button
                        onClick={() => {
                          showToast("Stock status updated for " + product.name, "success");
                        }}
                        className={cn(
                          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 focus:outline-none",
                          product.status === "Available" ? colors.primary : "bg-slate-200"
                        )}
                      >
                        <span className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200",
                          product.status === "Available" ? "translate-x-4" : "translate-x-0"
                        )} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Add Product Modal */}
            {isAddProductOpen && (
              <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Add New Product</h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Configure metadata specifications for storefront catalogs</p>
                  </div>
                  <form onSubmit={handleAddProductSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase block">Product Name</label>
                      <input
                        type="text"
                        required
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-semibold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase block">Category / Description</label>
                      <input
                        type="text"
                        value={newProduct.secondary}
                        onChange={(e) => setNewProduct({ ...newProduct, secondary: e.target.value })}
                        className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-semibold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase block">Price (₹)</label>
                        <input
                          type="number"
                          required
                          value={newProduct.price || ""}
                          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                          className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-bold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase block">Opening Stock Qty</label>
                        <input
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                          className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-bold"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsAddProductOpen(false)}
                        className="h-9 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={cn("h-9 px-5 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer", colors.primary)}
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 3. BRANCHES TAB ───────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function BranchesTab({ category }: WidgetTabProps) {
  const { branches, addBranch } = useWorkspaceStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;
    addBranch({ name, address, phone, isActive: true });
    setName("");
    setAddress("");
    setPhone("");
    setIsOpen(false);
    showToast("Branch registered successfully!", "success");
  };

  return (
    <PageWrapper
      title="Branches Directory"
      description="Register physical branch outlets and view mapping channels"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900">Branch Locations</h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="h-9 px-3.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Branch</span>
          </button>
        </div>

        {isOpen && (
          <form onSubmit={handleSubmit} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Branch Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none focus:border-emerald-500 font-medium"
            />
            <input
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none focus:border-emerald-500 font-medium"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none focus:border-emerald-500 font-medium"
            />
            <button type="submit" className="sm:col-span-3 h-9 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-700">
              Save Branch
            </button>
          </form>
        )}

        <div className="overflow-x-auto max-h-[400px] relative">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-5 bg-slate-50">ID</th>
                <th className="py-3 px-5 bg-slate-50">Branch Name</th>
                <th className="py-3 px-5 bg-slate-50">Address</th>
                <th className="py-3 px-5 bg-slate-50">Phone</th>
                <th className="py-3 px-5 bg-slate-50">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {branches.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors font-medium">
                  <td className="py-3.5 px-5 font-mono font-bold text-blue-600">{b.id}</td>
                  <td className="py-3.5 px-5 font-bold text-slate-900">{b.name}</td>
                  <td className="py-3.5 px-5 text-slate-500">{b.address}</td>
                  <td className="py-3.5 px-5 text-slate-500 font-mono">{b.phone || "N/A"}</td>
                  <td className="py-3.5 px-5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 4. STAFF TAB ──────────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function StaffTab({ category }: WidgetTabProps) {
  const { staff, addStaff, loginLogs } = useWorkspaceStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return;
    addStaff({ name, role, email, phone, status: "Active" });
    setName("");
    setRole("");
    setEmail("");
    setPhone("");
    setIsOpen(false);
    showToast("Staff member registered successfully!", "success");
  };

  return (
    <PageWrapper
      title="Staff Roster Workspace"
      description="Manage merchant employees, authorization roles, and audit shift login histories"
      category={category}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">Active Employees</h3>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="h-9 px-3.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus size={15} />
              <span>Add Member</span>
            </button>
          </div>

          {isOpen && (
            <form onSubmit={handleSubmit} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
              />
              <input
                type="text"
                placeholder="Role (e.g. Cashier)"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
              />
              <button type="submit" className="sm:col-span-2 h-9 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-700">
                Save Member
              </button>
            </form>
          )}

          {staff.length === 0 ? (
            <EmptyState
              icon={<Users size={22} />}
              title="No Staff Registered"
              description="Register your employee roles to grant dashboard access controls."
              action={{
                label: "Add Member",
                onClick: () => setIsOpen(true)
              }}
              size="sm"
            />
          ) : (
            <div className="overflow-x-auto max-h-[400px] relative">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-5 bg-slate-50">Staff ID</th>
                    <th className="py-3 px-5 bg-slate-50">Name</th>
                    <th className="py-3 px-5 bg-slate-50">Role</th>
                    <th className="py-3 px-5 bg-slate-50">Contact</th>
                    <th className="py-3 px-5 bg-slate-50">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {staff.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors font-medium">
                      <td className="py-3.5 px-5 font-mono font-bold text-blue-600">{s.id}</td>
                      <td className="py-3.5 px-5 font-bold text-slate-900">{s.name}</td>
                      <td className="py-3.5 px-5 text-slate-600 font-semibold">{s.role}</td>
                      <td className="py-3.5 px-5 text-slate-500">
                        <p className="font-mono">{s.phone}</p>
                        <p className="text-[11px] text-slate-400">{s.email}</p>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-3">Shift Login History</h3>
          <div className="space-y-3 text-xs font-medium">
            {loginLogs.map(log => (
              <div key={log.id} className="p-3 border border-slate-200/60 rounded-xl bg-slate-50/50 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{log.staffName}</span>
                  <span className="text-[10px] font-mono text-slate-400">{log.loginTime}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">IP: {log.ipAddress} • {log.device}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 5. HOURS TAB ──────────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function HoursTab({ category }: WidgetTabProps) {
  const { profile, updateProfile } = useWorkspaceStore();
  const [hours, setHours] = useState({ ...profile.businessHours });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ businessHours: hours });
    setIsEditing(false);
    showToast("Business operating hours updated.", "success");
  };

  return (
    <PageWrapper
      title="Business Operating Hours"
      description="Configure weekly operating hours schedules pushed to WhatsApp customer cards"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 md:p-8 max-w-xl space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900">Weekly Schedule</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="h-8 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
          >
            {isEditing ? "Cancel" : "Edit Hours"}
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3">
          {Object.keys(hours).map(day => (
            <div key={day} className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider w-24">{day}</span>
              <input
                type="text"
                disabled={!isEditing}
                value={hours[day as keyof typeof hours]}
                onChange={(e) => {
                  const nextHours = { ...hours };
                  (nextHours as unknown as Record<string, string>)[day] = e.target.value;
                  setHours(nextHours);
                }}
                className="h-8 bg-white border border-slate-200 rounded-lg px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 disabled:bg-slate-50 disabled:text-slate-500 w-48 text-right font-mono"
              />
            </div>
          ))}
          {isEditing && (
            <button
              type="submit"
              className="w-full h-9 mt-4 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer hover:bg-emerald-700 transition-colors"
            >
              Save Schedule
            </button>
          )}
        </form>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 6. HARDWARE TAB ───────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function HardwareTab({ category }: WidgetTabProps) {
  const { printers, addPrinter, togglePrinter } = useWorkspaceStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<"Kitchen" | "Receipt">("Receipt");
  const [ipAddress, setIpAddress] = useState("");
  const [paperWidth, setPaperWidth] = useState<"58mm" | "80mm">("80mm");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ipAddress) return;
    addPrinter({ name, type, ipAddress, paperWidth, latency: 0 });
    setName("");
    setIpAddress("");
    setIsOpen(false);
    showToast("Printer device configuration saved.", "success");
  };

  return (
    <PageWrapper
      title="Hardware & Printing Configuration"
      description="Register local thermal printer devices, view device status details, and run diagnostic prints"
      category={category}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">Connected Devices</h3>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="h-9 px-3.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus size={15} />
              <span>Link Printer</span>
            </button>
          </div>

          {isOpen && (
            <form onSubmit={handleSubmit} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Printer Nickname"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
              />
              <input
                type="text"
                placeholder="IP Address"
                required
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none font-mono"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PrinterDevice["type"])}
                className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
              >
                <option value="Receipt">Billing Receipt Printer</option>
                <option value="Kitchen">Kitchen Order Ticket (KOT)</option>
              </select>
              <select
                value={paperWidth}
                onChange={(e) => setPaperWidth(e.target.value as PrinterDevice["paperWidth"])}
                className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
              >
                <option value="80mm">80 mm Standard</option>
                <option value="58mm">58 mm Compact</option>
              </select>
              <button type="submit" className="sm:col-span-2 h-9 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-700">
                Save Device Configuration
              </button>
            </form>
          )}

          {printers.length === 0 ? (
            <EmptyState
              icon={<Printer size={22} />}
              title="No Printers Configured"
              description="Link thermal receipt printers or kitchen print stations via IP network endpoints."
              action={{
                label: "Link Printer",
                onClick: () => setIsOpen(true)
              }}
              size="sm"
            />
          ) : (
            <div className="overflow-x-auto max-h-[400px] relative">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-5 bg-slate-50">Device ID</th>
                    <th className="py-3 px-5 bg-slate-50">Nickname</th>
                    <th className="py-3 px-5 bg-slate-50">IP Endpoint</th>
                    <th className="py-3 px-5 bg-slate-50">Status</th>
                    <th className="py-3 px-5 bg-slate-50">Test Print</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {printers.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-5 font-mono font-bold text-blue-600">{p.id}</td>
                      <td className="py-3.5 px-5">
                        <p className="font-bold text-slate-900">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-semibold">{p.type} • {p.paperWidth}</p>
                      </td>
                      <td className="py-3.5 px-5 font-mono text-slate-500">{p.ipAddress}</td>
                      <td className="py-3.5 px-5">
                        <button
                          onClick={() => togglePrinter(p.id)}
                          className={cn(
                            "px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border cursor-pointer",
                            p.status === "Online" ? "bg-emerald-50 text-emerald-800 border-emerald-200/60" : "bg-red-50 text-red-800 border-red-200/60"
                          )}
                        >
                          {p.status}
                        </button>
                      </td>
                      <td className="py-3.5 px-5">
                        <button
                          onClick={() => showToast(`Test print job submitted to ${p.name}.`, "info")}
                          className="h-7 px-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-[11px] font-bold text-slate-700 cursor-pointer"
                        >
                          Test
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-3">Diagnostics Log</h3>
          <div className="space-y-3 text-xs text-slate-600 font-medium">
            <div className="flex gap-2">
              <span className="text-[10px] font-mono text-slate-400">14:12</span>
              <p className="text-slate-900"><span className="font-bold">Receipt Printer</span> - Invoice INV-90812 success (12ms).</p>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] font-mono text-slate-400">12:30</span>
              <p className="text-slate-900"><span className="font-bold">Kitchen printer</span> - IP handshake OK (24ms).</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 7. ORDERS TAB ─────────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function OrdersTab({ category }: WidgetTabProps) {
  const { orders, updateOrderStatus } = useWorkspaceStore();
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchVal, setSearchVal] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const categoryOrders = orders[category] || [];

  if (categoryOrders.length === 0) {
    return (
      <PageWrapper
        title="Orders Board"
        description="Track transaction statuses, view timelines, and dispatch tracking confirmations"
        category={category}
      >
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
          <EmptyState
            icon={<ShoppingCart size={28} />}
            title="No Orders Received Yet"
            description="Orders placed through your WhatsApp store will appear here in real-time."
          />
        </div>
      </PageWrapper>
    );
  }

  const filtered = categoryOrders.filter(o => {
    const matchesSearch = o.customer.toLowerCase().includes(searchVal.toLowerCase()) || o.id.toLowerCase().includes(searchVal.toLowerCase());
    const matchesFilter = filterStatus === "All" || o.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const selectedOrder = categoryOrders.find(o => o.id === selectedOrderId);

  return (
    <PageWrapper
      title="Orders Board"
      description="Track transaction statuses, view timelines, and dispatch tracking confirmations"
      category={category}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                placeholder="Search orders by customer or ID..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {["All", "Paid", "Completed", "Preparing", "Scheduled"].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={cn(
                    "h-9 px-3 text-xs rounded-xl border font-bold transition-all cursor-pointer shrink-0",
                    filterStatus === st
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto max-h-[420px] relative">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-5 bg-slate-50">Order ID</th>
                    <th className="py-3 px-5 bg-slate-50">Customer</th>
                    <th className="py-3 px-5 bg-slate-50">Date</th>
                    <th className="py-3 px-5 bg-slate-50">Total</th>
                    <th className="py-3 px-5 bg-slate-50">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(o => (
                    <tr
                      key={o.id}
                      onClick={() => setSelectedOrderId(o.id)}
                      className={cn(
                        "hover:bg-slate-50/50 transition-colors cursor-pointer font-medium",
                        selectedOrderId === o.id ? "bg-emerald-50/30" : ""
                      )}
                    >
                      <td className="py-3.5 px-5 font-mono font-bold text-blue-600">{o.id}</td>
                      <td className="py-3.5 px-5 font-bold text-slate-900">{o.customer}</td>
                      <td className="py-3.5 px-5 text-slate-500">{o.date}</td>
                      <td className="py-3.5 px-5 font-black text-slate-900">₹{o.total}</td>
                      <td className="py-3.5 px-5">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border",
                          ["Paid", "Completed"].includes(o.status) ? "bg-emerald-50 text-emerald-800 border-emerald-200/60" : "bg-amber-50 text-amber-800 border-amber-200/60"
                        )}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 border-t border-slate-100 flex items-center justify-between bg-white text-xs font-medium text-slate-500">
              <span>Showing {filtered.length} of {categoryOrders.length} entries</span>
              <div className="flex gap-2">
                <button className="h-8 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold disabled:opacity-40" disabled>Previous</button>
                <button className="h-8 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold disabled:opacity-40" disabled>Next</button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          {selectedOrder ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Order Details</p>
                <h4 className="text-base font-black text-slate-900 font-mono mt-0.5">{selectedOrder.id}</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between"><span className="text-slate-500 font-medium">Buyer:</span><span className="font-bold text-slate-900">{selectedOrder.customer}</span></div>
                <div className="flex justify-between"><span className="text-slate-500 font-medium">Contact:</span><span className="font-bold text-slate-900 font-mono">{selectedOrder.phone}</span></div>
                <div className="flex justify-between"><span className="text-slate-500 font-medium">Invoice total:</span><span className="font-black text-slate-900">₹{selectedOrder.total}</span></div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Update Status</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      updateOrderStatus(category, selectedOrder.id, "Completed");
                      showToast("Order marked as Completed.", "success");
                    }}
                    className="flex-1 h-9 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 cursor-pointer shadow-xs"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => {
                      updateOrderStatus(category, selectedOrder.id, "Cancelled");
                      showToast("Order marked as Cancelled.", "error");
                    }}
                    className="h-9 px-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-400 min-h-[220px] flex flex-col justify-center items-center">
              <Inbox size={24} className="text-slate-300 mb-2" />
              <p className="text-xs font-medium">Select an order row to view transaction timeline diagnostics.</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 8. PRODUCTS TAB ───────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
/* ─── 8. PRODUCTS TAB ───────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function ProductsTab({ category, config }: WidgetTabProps) {
  const { products, fetchProducts, addItem, updateItem, deleteItem } = useWorkspaceStore();
  
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductItem | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [secondary, setSecondary] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetchProducts(category);
  }, [category, fetchProducts]);

  const categoryProducts = products[category] || [];

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setName("");
    setPrice("");
    setSecondary("");
    setStock("");
    setIsOpen(true);
  };

  const handleOpenEditModal = (item: ProductItem) => {
    setEditingItem(item);
    setName(item.name);
    setPrice(String(item.price));
    setSecondary(item.secondary || "");
    setStock(item.stock !== undefined ? String(item.stock) : "");
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    try {
      if (editingItem) {
        await updateItem(category, editingItem.id, {
          name,
          price: Number(price),
          secondary: secondary || "General",
          stock: stock ? Number(stock) : undefined,
          status: stock && Number(stock) <= 0 ? "Out of Stock" : "Available",
        });
        showToast("Catalog item updated successfully!", "success");
      } else {
        await addItem(category, {
          name,
          price: Number(price),
          secondary: secondary || "General",
          status: stock && Number(stock) <= 0 ? "Out of Stock" : "Available",
          stock: stock ? Number(stock) : undefined,
        });
        showToast("Catalog item added successfully!", "success");
      }

      setName("");
      setPrice("");
      setSecondary("");
      setStock("");
      setEditingItem(null);
      setIsOpen(false);
    } catch (err) {
      // Toast notification is dispatched from workspace store error handling
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(category, id);
      showToast("Catalog item deleted successfully.", "success");
    } catch (err) {
      // Toast notification is dispatched from workspace store error handling
    }
  };

  return (
    <PageWrapper
      title={`${config.catalogLabel} Catalog`}
      description="Maintain active menu products, variant configurations, combo products, and stock levels"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900">Active catalog items</h3>
          <button
            onClick={handleOpenAddModal}
            className="h-9 px-3.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Item</span>
          </button>
        </div>

        {isOpen && (
          <form onSubmit={handleSubmit} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Item Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
            />
            <input
              type="number"
              placeholder="Price (₹)"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
            />
            <input
              type="text"
              placeholder="Category Segment"
              value={secondary}
              onChange={(e) => setSecondary(e.target.value)}
              className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
            />
            <input
              type="number"
              placeholder="Stock Count"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
            />
            <div className="sm:col-span-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-9 px-4 border border-slate-200 rounded-xl hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button type="submit" className="h-9 px-4 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-700 transition-colors">
                {editingItem ? "Update Item" : "Save Item"}
              </button>
            </div>
          </form>
        )}

        {categoryProducts.length === 0 ? (
          <EmptyState
            icon={<Layers size={22} />}
            title="Catalog is Empty"
            description={`You haven't added any items to your ${config.catalogLabel} catalog yet.`}
            action={{
              label: "Add First Item",
              onClick: handleOpenAddModal
            }}
            size="sm"
          />
        ) : (
          <div className="overflow-x-auto max-h-[420px] relative">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-5 bg-slate-50">ID</th>
                  <th className="py-3 px-5 bg-slate-50">Name</th>
                  <th className="py-3 px-5 bg-slate-50">Segment</th>
                  <th className="py-3 px-5 bg-slate-50">Price</th>
                  <th className="py-3 px-5 bg-slate-50">Availability</th>
                  <th className="py-3 px-5 bg-slate-50">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categoryProducts.map(p => {
                  const stockVal = p.stock !== undefined ? p.stock : 14;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors font-medium">
                      <td className="py-3.5 px-5 font-mono font-bold text-slate-400">{p.id}</td>
                      <td className="py-3.5 px-5 font-bold text-slate-900">{p.name}</td>
                      <td className="py-3.5 px-5 text-slate-500">{p.secondary}</td>
                      <td className="py-3.5 px-5 font-black text-slate-900">₹{p.price}</td>
                      <td className="py-3.5 px-5">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border",
                          stockVal < 5 ? "bg-red-50 text-red-800 border-red-200/60" : "bg-emerald-50 text-emerald-800 border-emerald-200/60"
                        )}>
                          {stockVal < 5 ? `Low (${stockVal})` : "In Stock"}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="px-2 py-1 text-slate-600 hover:text-emerald-600 font-bold text-[11px] transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 9. CATEGORIES TAB ─────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function CategoriesTab({ category }: WidgetTabProps) {
  const [list] = useState([
    { name: "Starter Appetizers", count: 8 },
    { name: "Executive Main Courses", count: 14 },
    { name: "Artisan Dessert Trays", count: 6 },
  ]);

  return (
    <PageWrapper
      title="Catalog Categories"
      description="Create logical categories for catalog navigation structures in WhatsApp menus"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-6">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Menu Groups</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {list.map((c, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-slate-200/80 bg-white space-y-1.5 shadow-xs hover:-translate-y-0.5 hover:shadow-sm transition-all">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Category Segment</span>
              <h4 className="text-sm font-bold text-slate-900">{c.name}</h4>
              <p className="text-xs text-emerald-600 font-bold">{c.count} items configured</p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 10. INVENTORY TAB ─────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function InventoryTab({ category }: WidgetTabProps) {
  const { products } = useWorkspaceStore();
  const list = products[category] || [];

  return (
    <PageWrapper
      title="Inventory Ledger"
      description="Monitor physical stock counts, trigger quick restocking orders, and track SKU alerts"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900">SKU Ledger</h3>
          <button
            onClick={() => showToast("Stock replenishment request logged.", "info")}
            className="h-9 px-3.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus size={15} />
            <span>Restock All Low SKUs</span>
          </button>
        </div>

        <div className="overflow-x-auto max-h-[400px] relative">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-5 bg-slate-50">SKU ID</th>
                <th className="py-3 px-5 bg-slate-50">Item Name</th>
                <th className="py-3 px-5 bg-slate-50">Warehouse Stock</th>
                <th className="py-3 px-5 bg-slate-50">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map(p => {
                const stockVal = p.stock !== undefined ? p.stock : 24;
                const isAlert = stockVal < 5;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors font-medium">
                    <td className="py-3.5 px-5 font-mono font-bold text-slate-400">{p.id}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900">{p.name}</td>
                    <td className="py-3.5 px-5 font-mono font-bold text-slate-900">{stockVal} units</td>
                    <td className="py-3.5 px-5">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border",
                        isAlert ? "bg-red-50 text-red-800 border-red-200/60" : "bg-emerald-50 text-emerald-800 border-emerald-200/60"
                      )}>
                        {isAlert ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 11. CUSTOMERS TAB ─────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function CustomersTab({ category, config }: WidgetTabProps) {
  const { customers } = useWorkspaceStore();
  const list = customers[category] || [];

  return (
    <PageWrapper
      title={`${config.customersLabel} Directory`}
      description="Review patient diagnostics history, VIP labels, and lifetime value segments"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-6">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Client Directory</h3>
        {list.length === 0 ? (
          <EmptyState
            icon={<Users size={24} />}
            title={`No ${config.customersLabel} Yet`}
            description="Customer details logged during purchase flows on WhatsApp will populate here automatically."
            size="sm"
          />
        ) : (
          <div className="overflow-x-auto max-h-[400px] relative">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-5 bg-slate-50">Client ID</th>
                  <th className="py-3 px-5 bg-slate-50">Full Name</th>
                  <th className="py-3 px-5 bg-slate-50">WhatsApp Phone</th>
                  <th className="py-3 px-5 bg-slate-50">LTV spend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {list.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors font-medium">
                    <td className="py-3.5 px-5 font-mono font-bold text-slate-400">{c.id}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900">{c.name}</td>
                    <td className="py-3.5 px-5 text-slate-500 font-mono">{c.phone}</td>
                    <td className="py-3.5 px-5 font-black text-slate-900">₹{c.totalSpend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 12. COUPONS TAB ───────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function CouponsTab({ category }: WidgetTabProps) {
  const { coupons, addCoupon } = useWorkspaceStore();
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !discount) return;
    addCoupon({ code, discount, expiry });
    setCode("");
    setDiscount("");
    setExpiry("");
    setIsOpen(false);
    showToast("Promo coupon added successfully!", "success");
  };

  return (
    <PageWrapper
      title="Coupons & Discount Codes"
      description="Configure WhatsApp broad discount campaigns and checkout coupon codes"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900">Discount Rules</h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="h-9 px-3.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus size={15} />
            <span>Create Coupon</span>
          </button>
        </div>

        {isOpen && (
          <form onSubmit={handleSubmit} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Promo Code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
            />
            <input
              type="text"
              placeholder="Discount (e.g. 20% OFF)"
              required
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
            />
            <input
              type="text"
              placeholder="Expiry Date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
            />
            <button type="submit" className="sm:col-span-3 h-9 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-700">
              Save Coupon
            </button>
          </form>
        )}

        {coupons.length === 0 ? (
          <EmptyState
            icon={<Percent size={22} />}
            title="No Active Coupons"
            description="Create promotional discount rules to share with WhatsApp buyers during checkout flows."
            action={{
              label: "Create Coupon",
              onClick: () => setIsOpen(true)
            }}
            size="sm"
          />
        ) : (
          <div className="overflow-x-auto max-h-[400px] relative">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-5 bg-slate-50">Coupon Code</th>
                  <th className="py-3 px-5 bg-slate-50">Discount Rate</th>
                  <th className="py-3 px-5 bg-slate-50">Expiry</th>
                  <th className="py-3 px-5 bg-slate-50">Uses Count</th>
                  <th className="py-3 px-5 bg-slate-50">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coupons.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors font-medium">
                    <td className="py-3.5 px-5 font-mono font-bold text-blue-600">{c.code}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900">{c.discount}</td>
                    <td className="py-3.5 px-5 text-slate-500">{c.expiry}</td>
                    <td className="py-3.5 px-5 text-slate-500 font-semibold">{c.usage} times</td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 13. CAMPAIGNS TAB ─────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function CampaignsTab({ category }: WidgetTabProps) {
  return (
    <PageWrapper
      title="Marketing Campaigns"
      description="Create bulk notification templates and schedule Meta Cloud API campaigns"
      category={category}
    >
      <div className="space-y-4">
        <div className="rounded-2xl bg-amber-50 border border-amber-200/80 p-4 flex items-start gap-3 shadow-xs">
          <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">Awaiting Backend Integration</p>
            <p className="text-xs text-amber-800/90 font-medium leading-relaxed mt-0.5">
              WhatsApp Broadcast campaigns and template queue options are disabled until your Meta Business Cloud API profile is activated by the administrator.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 14. BROADCASTS TAB ────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function BroadcastsTab({ category }: WidgetTabProps) {
  return (
    <PageWrapper
      title="Broadcast Delivery Logs"
      description="Inspect delivery logs, delivery telemetry, and click-through rates from Meta API streams"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6">
        <EmptyState
          icon={<Megaphone size={22} />}
          title="No Broadcast Logs"
          description="Campaign broadcast history and delivery telemetry records will populate here once campaigns are active."
          size="sm"
        />
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 15. CHATS TAB ─────────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function ChatsTab({ category }: WidgetTabProps) {
  const { chats, addMessageToChat } = useWorkspaceStore();
  const [activeChatId, setActiveChatId] = useState("");
  const [inputVal, setInputVal] = useState("");

  const activeChats = chats[category] || [];

  useEffect(() => {
    if (activeChats.length > 0 && !activeChatId) {
      setActiveChatId(activeChats[0].id);
    }
  }, [activeChats, activeChatId]);

  const activeChat = activeChats.find(c => c.id === activeChatId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || !activeChatId) return;
    addMessageToChat(category, activeChatId, {
      sender: "merchant",
      text: inputVal,
      time: "Just now",
    });
    setInputVal("");
  };

  return (
    <PageWrapper
      title="WhatsApp Live Chat Inbox"
      description="Respond to incoming client conversations and trigger dynamic catalog item links"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-3 h-[520px]">
        <div className="border-r border-slate-100 flex flex-col h-full bg-slate-50/30">
          <div className="p-4 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Threads</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Search inbox..."
                className="w-full pl-8 pr-3 h-8 text-xs border border-slate-200 rounded-xl focus:outline-none bg-white font-medium"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {activeChats.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveChatId(c.id)}
                className={cn(
                  "w-full flex items-start gap-3 p-3 rounded-2xl transition-all text-left cursor-pointer",
                  activeChatId === c.id ? "bg-emerald-50/60 border border-emerald-200/60" : "hover:bg-slate-100/50"
                )}
              >
                <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-900 truncate">{c.name}</span>
                    <span className="text-[10px] text-slate-400">{c.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{c.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col h-full bg-white">
          {activeChat ? (
            <>
              <div className="p-4 border-b border-slate-100 bg-slate-50/20 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{activeChat.name}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">{activeChat.phone}</p>
                </div>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">WhatsApp Active</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-slate-50/10">
                {activeChat.messages.map((m, idx) => {
                  const isMerchant = m.sender === "merchant" || m.sender === "bot";
                  return (
                    <div key={idx} className={cn("flex flex-col max-w-[75%]", isMerchant ? "ml-auto items-end" : "mr-auto items-start")}>
                      <div className={cn(
                        "rounded-2xl px-3.5 py-2 text-xs shadow-2xs border",
                        m.sender === "merchant"
                          ? "bg-emerald-600 text-white border-emerald-600 rounded-tr-none"
                          : m.sender === "bot"
                          ? "bg-emerald-50 text-emerald-900 border-emerald-200/60 rounded-tr-none"
                          : "bg-white text-slate-800 border-slate-200 rounded-tl-none"
                      )}>
                        {m.text}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 px-1 font-medium">{m.time}</span>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white flex gap-2">
                <input
                  type="text"
                  placeholder="Type WhatsApp reply..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 h-9 text-xs focus:outline-none focus:border-emerald-500 font-medium"
                />
                <button type="submit" className="h-9 px-4 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer flex items-center gap-1">
                  <Send size={13} />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-slate-400 p-8 text-center">
              <MessageSquare size={28} className="opacity-20 mb-2" />
              <p className="text-xs font-medium">Select a client conversation thread from the sidebar.</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 16. REVIEWS TAB ───────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function ReviewsTab({ category }: WidgetTabProps) {
  const { reviews } = useWorkspaceStore();

  return (
    <PageWrapper
      title="Customer Reviews"
      description="Inspect client ratings, comments, and dispatch feedback links"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-6">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Client Feedback</h3>
        <div className="space-y-3">
          {reviews.map(r => (
            <div key={r.id} className="p-4 rounded-2xl border border-slate-200/80 space-y-2 bg-white shadow-2xs">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{r.customer}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">{r.date}</p>
                </div>
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">&quot;{r.comment}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 17. REVENUE TAB ───────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function RevenueTab({ category }: WidgetTabProps) {
  return (
    <PageWrapper
      title="Revenue Analytics"
      description="Monitor income transaction graphs and track gross margins"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Gross Sales Analytics</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Weekly revenue statistics</p>
          </div>
          <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-lg">₹29,997 cleared</span>
        </div>

        <div className="h-44 flex flex-col justify-end pt-4">
          <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="60" x2="500" y2="60" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
            <path d="M 0,100 C 50,70 100,50 150,90 C 200,40 250,80 300,30 C 350,70 400,20 450,55 C 475,30 500,40 L 500,100 L 0,100 Z" fill="url(#revGradient)" />
            <path d="M 0,100 C 50,70 100,50 150,90 C 200,40 250,80 300,30 C 350,70 400,20 450,55 C 475,30 500,40" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 18. TRANSACTIONS TAB ──────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function TransactionsTab({ category }: WidgetTabProps) {
  const { transactions } = useWorkspaceStore();

  return (
    <PageWrapper
      title="Transactions Log"
      description="Inspect chronological logs of payments, settlements, and refund requests"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Settled Ledger</h3>
        </div>
        <div className="overflow-x-auto max-h-[400px] relative">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-5 bg-slate-50">TXN ID</th>
                <th className="py-3 px-5 bg-slate-50">Type</th>
                <th className="py-3 px-5 bg-slate-50">Amount</th>
                <th className="py-3 px-5 bg-slate-50">Date</th>
                <th className="py-3 px-5 bg-slate-50">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors font-medium">
                  <td className="py-3.5 px-5 font-mono font-bold text-blue-600">{t.id}</td>
                  <td className="py-3.5 px-5 text-slate-600">{t.type}</td>
                  <td className="py-3.5 px-5 font-black text-slate-900">₹{t.amount.toLocaleString()}</td>
                  <td className="py-3.5 px-5 text-slate-500">{t.date}</td>
                  <td className="py-3.5 px-5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 19. INVOICES TAB ──────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function InvoicesTab({ category }: WidgetTabProps) {
  const [invoices] = useState([
    { id: "INV-90812", client: "Vikram Malhotra", total: 800, date: "Today" },
    { id: "INV-90811", client: "Sarah Jenkins", total: 2499, date: "Yesterday" },
  ]);

  return (
    <PageWrapper
      title="Invoices Ledger"
      description="Generate customer invoice registries and download printable tax receipts"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Invoices List</h3>
        </div>
        <div className="overflow-x-auto max-h-[400px] relative">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-5 bg-slate-50">Invoice Number</th>
                <th className="py-3 px-5 bg-slate-50">Billed Client</th>
                <th className="py-3 px-5 bg-slate-50">Amount</th>
                <th className="py-3 px-5 bg-slate-50">Date</th>
                <th className="py-3 px-5 bg-slate-50">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors font-medium">
                  <td className="py-3.5 px-5 font-mono font-bold text-blue-600">{inv.id}</td>
                  <td className="py-3.5 px-5 font-bold text-slate-900">{inv.client}</td>
                  <td className="py-3.5 px-5 font-black text-slate-900">₹{inv.total}</td>
                  <td className="py-3.5 px-5 text-slate-500">{inv.date}</td>
                  <td className="py-3.5 px-5">
                    <button onClick={() => showToast("Downloading invoice...", "info")} className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                      <Download size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 20. PAYOUTS TAB ───────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function PayoutsTab({ category }: WidgetTabProps) {
  const { payouts } = useWorkspaceStore();

  return (
    <PageWrapper
      title="Payout Settlements"
      description="Inspect payment balance transfer dates and setup direct merchant bank linkages"
      category={category}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Settlement Balance</h3>
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">₹8,400</h2>
              <p className="text-xs text-slate-400">Unsettled Merchant Capital</p>
            </div>
            <button
              onClick={() => showToast("Payout request submitted.", "info")}
              className="w-full h-9 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              Request Transfer
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Payout Archives</h3>
            </div>
            <div className="overflow-x-auto max-h-[400px] relative">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-5 bg-slate-50">Reference</th>
                    <th className="py-3 px-5 bg-slate-50">Bank Account</th>
                    <th className="py-3 px-5 bg-slate-50">Amount</th>
                    <th className="py-3 px-5 bg-slate-50">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payouts.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors font-medium">
                      <td className="py-3.5 px-5 font-mono font-bold text-blue-600">{p.id}</td>
                      <td className="py-3.5 px-5 text-slate-600">{p.bankAccount}</td>
                      <td className="py-3.5 px-5 font-black text-slate-900">₹{p.amount.toLocaleString()}</td>
                      <td className="py-3.5 px-5">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 21. AI ASSISTANT TAB ──────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function AiAssistantTab({ category }: WidgetTabProps) {
  const { products, orders } = useWorkspaceStore();
  const [aiOutput, setAiOutput] = useState<string>("");

  const categoryProducts = products[category] || [];
  const categoryOrders = orders[category] || [];

  const revenueValue = categoryOrders
    .filter((o) => ["Paid", "Completed", "Shipped", "Preparing", "Scheduled", "Enrolled", "Dispensed", "Verified"].includes(o.status))
    .reduce((sum, o) => sum + o.total, 0);

  const triggerAiAction = (actionType: string) => {
    switch (actionType) {
      case "campaign":
        setAiOutput(
          `[Broadcaster Template]\n\n"Hi! We noticed you loved our catalog items. Unlock 15% off your next purchase using code WELCOME15 at checkout!"`
        );
        break;
      case "discount":
        setAiOutput(
          `[Suggested Discount Rule]\n\nCode: AI-BOOST-10\nType: Percentage (10% OFF)\nCondition: Min cart value ₹2,000`
        );
        break;
      default:
        setAiOutput("Select an advisor tool above to generate templates.");
    }
  };

  return (
    <PageWrapper
      title="AI Operations Workspace"
      description="Monitor sales models, check stock forecasts, and auto-generate WhatsApp marketing templates"
      category={category}
    >
      <div className="space-y-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Quick AI Actions</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => triggerAiAction("campaign")}
              className="h-9 px-3.5 text-xs font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all cursor-pointer"
            >
              Generate WhatsApp Campaign
            </button>
            <button
              onClick={() => triggerAiAction("discount")}
              className="h-9 px-3.5 text-xs font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all cursor-pointer"
            >
              Generate Discount
            </button>
          </div>

          {aiOutput && (
            <pre className="p-4 rounded-xl border border-emerald-200/60 bg-emerald-50/30 text-xs text-emerald-950 font-mono leading-relaxed whitespace-pre-wrap mt-3">
              {aiOutput}
            </pre>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 22. SETTINGS TAB ──────────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function SettingsTab({ category }: WidgetTabProps) {
  const { apiSyncStatus, profile } = useWorkspaceStore();

  return (
    <PageWrapper
      title="Platform & Settings"
      description="Configure Meta Cloud API credentials, payment links, and employee authorization roles"
      category={category}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">WhatsApp Cloud API</h3>
          <div className="space-y-3 text-xs font-medium">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">Webhook Sync:</span>
              <span className="font-mono text-slate-900 font-bold">chatzo.io/webhook/meta/{category}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">API Status:</span>
              <span className="text-emerald-600 font-bold">48ms Delay (Connected)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">Endpoint:</span>
              <span className="text-blue-600 font-bold font-mono">{apiSyncStatus}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Integrations & Security</h3>
          <div className="space-y-3 text-xs font-medium">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">Gateways:</span>
              <span className="font-bold text-slate-900">Razorpay (Active), Stripe</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">Timezone:</span>
              <span className="font-mono text-slate-600">{profile.timezone}</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ───────────────────────────────────────────────────────── */
/* ─── 23. REPORT ISSUE TAB ──────────────────────────────── */
/* ───────────────────────────────────────────────────────── */
export function ReportIssueTab({ category }: WidgetTabProps) {
  const { tickets, addTicket } = useWorkspaceStore();
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState<SupportTicket["category"]>("WhatsApp API");
  const [priority, setPriority] = useState<SupportTicket["priority"]>("Medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !desc) return;
    addTicket({ category: cat, priority, subject, description: desc, createdAt: new Date().toISOString() });
    setSubject("");
    setDesc("");
    setIsOpen(false);
    showToast("Support ticket logged successfully.", "success");
  };

  return (
    <PageWrapper
      title="Report an Issue & Support Desk"
      description="Create platform support tickets, track diagnostics progress, and contact engineering teams"
      category={category}
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900">Support Tickets</h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="h-9 px-3.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus size={15} />
            <span>Create Ticket</span>
          </button>
        </div>

        {isOpen && (
          <form onSubmit={handleSubmit} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value as SupportTicket["category"])}
                className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
              >
                <option value="WhatsApp API">WhatsApp API</option>
                <option value="Hardware">Hardware & Printing</option>
                <option value="Billing">Settlements & Billing</option>
                <option value="Software Bug">Software Bug</option>
                <option value="Other">Other</option>
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as SupportTicket["priority"])}
                className="h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Subject Summary"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 text-xs focus:outline-none"
            />
            <textarea
              placeholder="Detailed description..."
              required
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none resize-none"
            />
            <button type="submit" className="w-full h-9 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-700">
              Submit Ticket
            </button>
          </form>
        )}

        {tickets.length === 0 ? (
          <EmptyState
            icon={<AlertCircle size={22} />}
            title="No Support Tickets"
            description="Create a support ticket to report platform bugs or service disruptions."
            size="sm"
          />
        ) : (
          <div className="overflow-x-auto max-h-[400px] relative">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-5 bg-slate-50">Ticket ID</th>
                  <th className="py-3 px-5 bg-slate-50">Category</th>
                  <th className="py-3 px-5 bg-slate-50">Subject</th>
                  <th className="py-3 px-5 bg-slate-50">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tickets.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition-colors font-medium">
                    <td className="py-3.5 px-5 font-mono font-bold text-blue-600">{t.id}</td>
                    <td className="py-3.5 px-5 text-slate-600">{t.category}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900">{t.subject}</td>
                    <td className="py-3.5 px-5">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border",
                        t.status === "Open" ? "bg-amber-50 text-amber-800 border-amber-200/60" : "bg-emerald-50 text-emerald-800 border-emerald-200/60"
                      )}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}