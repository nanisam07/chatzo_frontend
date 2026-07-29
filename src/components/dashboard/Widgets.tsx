"use client";

import React, { useState, useEffect } from "react";
import { CategoryConfig } from "@/lib/config/categories";
import { useWorkspaceStore, ItemRecord, OrderRecord, CustomerRecord, ChatMessage, RepairTicket, PrescriptionTicket, CouponRecord, ReviewRecord, TransactionRecord, PayoutRecord } from "@/store/useWorkspaceStore";
import { BranchRecord, StaffRecord, PrinterDevice, SupportTicket, DeliveryZone, ComboProduct, StaffShiftLog } from "@/lib/types/merchant";
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
  Settings,
  BookOpen,
  PlusCircle,
  Utensils,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  RefreshCw,
  Sliders,
  Database,
  Inbox,
  User,
  ShieldCheck,
  Phone,
  ArrowRight,
  ChevronRight,
  Sparkles,
  MapPin,
  Mail,
  Globe,
  Share2,
  Star,
  Download,
  AlertCircle,
  Eye,
  SlidersHorizontal,
  Printer,
  ChevronDown,
  Upload,
  Layers,
  ArrowUpRight,
  Info,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WidgetTabProps {
  category: string;
  config: CategoryConfig;
}

/* ────────────────────────────────────────────────────────── */
/* ─── THEME ACCENT COLOR HELPERS ────────────────────────── */
/* ────────────────────────────────────────────────────────── */
const getCategoryColors = (category: string) => {
  switch (category) {
    case "retail": return { primary: "bg-blue-600 hover:bg-blue-700", text: "text-blue-600", border: "border-blue-200", bg: "bg-blue-50/50", fill: "#2563EB" };
    case "restaurant": return { primary: "bg-orange-600 hover:bg-orange-700", text: "text-orange-600", border: "border-orange-200", bg: "bg-orange-50/50", fill: "#EA580C" };
    case "bakery": return { primary: "bg-amber-800 hover:bg-amber-900", text: "text-amber-800", border: "border-amber-200", bg: "bg-amber-50/50", fill: "#78350F" };
    case "grocery": return { primary: "bg-lime-600 hover:bg-lime-700", text: "text-lime-700", border: "border-lime-200", bg: "bg-lime-50/50", fill: "#65A30D" };
    case "electronics": return { primary: "bg-cyan-600 hover:bg-cyan-700", text: "text-cyan-600", border: "border-cyan-200", bg: "bg-cyan-50/50", fill: "#0891B2" };
    case "hospital": return { primary: "bg-green-600 hover:bg-green-700", text: "text-green-600", border: "border-green-200", bg: "bg-green-50/50", fill: "#16A34A" };
    case "pharmacy": return { primary: "bg-teal-600 hover:bg-teal-700", text: "text-teal-600", border: "border-teal-200", bg: "bg-teal-50/50", fill: "#0D9488" };
    case "salon": return { primary: "bg-pink-600 hover:bg-pink-700", text: "text-pink-600", border: "border-pink-200", bg: "bg-pink-50/50", fill: "#DB2777" };
    case "fashion": return { primary: "bg-purple-600 hover:bg-purple-700", text: "text-purple-600", border: "border-purple-200", bg: "bg-purple-50/50", fill: "#7C3AED" };
    case "education": return { primary: "bg-indigo-600 hover:bg-indigo-700", text: "text-indigo-600", border: "border-indigo-200", bg: "bg-indigo-50/50", fill: "#4F46E5" };
    case "services": return { primary: "bg-slate-700 hover:bg-slate-800", text: "text-slate-700", border: "border-slate-300", bg: "bg-slate-50/50", fill: "#475569" };
    default: return { primary: "bg-blue-600 hover:bg-blue-700", text: "text-blue-600", border: "border-blue-200", bg: "bg-blue-50/50", fill: "#2563EB" };
  }
};

const getKPIIcon = (name: string, colorClass: string) => {
  const props = { size: 20, className: colorClass };
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

/* ────────────────────────────────────────────────────────── */
/* ─── SKELETON SCREEN LOADER ─────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
function SkeletonLoader() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-200 rounded-lg"></div>
          <div className="h-4.5 w-80 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white border border-gray-150 rounded-2xl p-6 space-y-3">
            <div className="flex justify-between"><div className="h-4.5 w-24 bg-gray-200 rounded"></div><div className="h-6 w-6 bg-gray-200 rounded"></div></div>
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
      <div className="h-60 bg-white border border-gray-150 rounded-2xl"></div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── PAGE WRAPPER ───────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
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
    <div className="space-y-8 text-gray-900 font-sans antialiased">
      {/* Header Info */}
      <div className="space-y-1">
        <h2 className="text-[28px] md:text-[32px] font-extrabold text-gray-900 tracking-tight leading-tight">{title}</h2>
        <p className="text-[14px] md:text-[15px] text-gray-500 font-medium">{description}</p>
      </div>

      {/* KPI Cards Grid */}
      {kpis && kpis.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="rounded-2xl border border-gray-150 bg-white p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 ease-out relative overflow-hidden group">
              {/* Category-specific accent color border top */}
              <div className={cn("absolute top-0 left-0 right-0 h-1.5", theme.primary)} />
              
              <div className="flex items-center justify-between pt-1">
                <span className="text-[15px] md:text-[16px] font-bold text-gray-400 uppercase tracking-widest">{kpi.title}</span>
                <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110 duration-305", theme.bg)}>
                  {getKPIIcon(kpi.icon, theme.text)}
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-[32px] md:text-[38px] font-extrabold text-gray-900 tracking-tight leading-none">{kpi.value}</h3>
                <div className="flex items-center gap-1.5 text-[12px] font-bold">
                  <span className={cn(
                    "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider",
                    kpi.trend === "down" ? "bg-red-50 text-red-650 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"
                  )}>
                    {kpi.change}
                  </span>
                  <span className="text-gray-400">vs yesterday</span>
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

/* ────────────────────────────────────────────────────────── */
/* ─── 1. OVERVIEW TAB ────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
/* ─── 1. OVERVIEW TAB (COMMAND CENTER) ───────────────────── */
/* ────────────────────────────────────────────────────────── */
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
    campaigns,
    transactions,
  } = useWorkspaceStore();

  const colors = getCategoryColors(category);

  // States for interactive mocks
  const [activeDeliveries, setActiveDeliveries] = useState<
    { id: string; riderName: string; status: string; progress: number }[]
  >([
    { id: "ORD-90812", riderName: "Rahul Sharma", status: "Delivering", progress: 45 },
    { id: "ORD-90811", riderName: "Amit Verma", status: "Out for Delivery", progress: 10 },
  ]);

  const [riders, setRiders] = useState([
    { id: "R-101", name: "Rahul Sharma", status: "Available" as const, battery: 92, vehicle: "Bike" },
    { id: "R-102", name: "Amit Verma", status: "Busy" as const, battery: 78, vehicle: "Electric Scooter" },
    { id: "R-103", name: "Priya Singh", status: "Offline" as const, battery: 45, vehicle: "Electric Scooter" },
  ]);

  const categoryProducts = products[category] || [];
  const categoryOrders = orders[category] || [];
  const activeChats = chats[category] || [];

  // Derived variables
  const revenueValue = categoryOrders
    .filter((o) =>
      ["Paid", "Completed", "Shipped", "Preparing", "Scheduled", "Enrolled", "Dispensed", "Verified"].includes(o.status)
    )
    .reduce((sum, o) => sum + o.total, 0);

  const activeOrdersList = categoryOrders.filter((o) =>
    ["Pending", "Preparing", "Shipped", "Processing", "Accepted"].includes(o.status)
  );

  const pendingDues = 8400;

  // Onboarding Items definition
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

  return (
    <div className="space-y-8 font-sans">
      
      {/* SECTION 1: Greeting Header */}
      <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.01)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <h2 className="text-[26px] md:text-[30px] font-black text-gray-900 tracking-tight leading-tight">
              Good Afternoon, {profile.ownerName}
            </h2>
            <span className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border",
              profile.businessStatus === "Online" ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200"
            )}>
              <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", profile.businessStatus === "Online" ? "bg-green-600 animate-pulse" : "bg-gray-400")} />
              {profile.businessStatus === "Online" ? "Workspace Open" : "Workspace Closed"}
            </span>
          </div>
          <p className="text-[14px] text-gray-400 font-bold uppercase tracking-wider">
            Workspace Command Center • {profile.businessName}
          </p>
        </div>

        {/* Status Switches and Notifications */}
        <div className="w-full md:w-auto flex flex-wrap items-center gap-4.5 pt-4 md:pt-0 border-t md:border-none border-gray-100">
          {/* Notification Bell */}
          <div className="relative p-2.5 rounded-xl bg-gray-50 border border-gray-150 hover:bg-gray-100 transition-colors cursor-pointer group">
            <AlertCircle size={18} className="text-gray-600" />
            <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-sm">
              {activeChats.reduce((sum, c) => sum + c.unread, 0) || 3}
            </span>
          </div>

          {/* Accepting Orders Status Toggle */}
          <div className="flex items-center gap-3 border border-gray-150 rounded-xl px-4 py-2 bg-gray-50/50">
            <div className="text-left">
              <p className="text-xs font-bold text-gray-900 leading-none">Accepting Orders</p>
              <p className="text-[10px] text-gray-400 font-semibold mt-1">Live customer checkouts</p>
            </div>
            <button
              onClick={() => {
                const nextStatus = profile.businessStatus === "Online" ? "Offline" : "Online";
                updateProfile({ businessStatus: nextStatus });
                alert(`Store status changed to: ${nextStatus}`);
              }}
              className={cn(
                "relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                profile.businessStatus === "Online" ? colors.primary : "bg-gray-200"
              )}
            >
              <span className={cn(
                "pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                profile.businessStatus === "Online" ? "translate-x-5.5" : "translate-x-0"
              )} />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: Onboarding Setup Checklist */}
      <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.01)] space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
          <div className="space-y-1">
            <h3 className="text-[20px] font-bold text-gray-900 tracking-tight">Onboarding Configuration Checklist</h3>
            <p className="text-xs text-gray-400 font-medium">Verify channels config to begin merchant operations</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-black text-gray-800">{checklistProgress}% Setup Done</span>
            <div className="h-2 w-28 bg-gray-100 rounded-full overflow-hidden border border-gray-150">
              <div className={cn("h-full transition-all duration-500 ease-out", colors.primary)} style={{ width: `${checklistProgress}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {onboardingSteps.map((step) => {
            const isDone = completedSteps.includes(step);
            return (
              <button
                key={step}
                onClick={() => toggleOnboardingStep(category, step)}
                className={cn(
                  "flex items-center justify-between p-4.5 rounded-xl border text-left transition-all duration-300 ease-out cursor-pointer hover:shadow-sm",
                  isDone
                    ? "border-green-200 bg-green-50/40 text-green-800"
                    : "border-gray-150 bg-gray-50/30 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <span className="text-[13px] font-bold truncate pr-2 leading-tight">{step}</span>
                {isDone ? (
                  <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                ) : (
                  <div className="h-4.5 w-4.5 rounded-full border-2 border-gray-200 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI: Today's Orders */}
        <div className="rounded-2xl border border-gray-150 bg-white p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative overflow-hidden group">
          <div className={cn("absolute top-0 left-0 right-0 h-1", colors.primary)} />
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">Today&apos;s Orders</span>
            <div className={cn("p-2.5 rounded-xl", colors.bg)}>
              <ShoppingCart size={18} className={colors.text} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-[30px] font-black text-gray-900 tracking-tight leading-none">
              {categoryOrders.length} Checkouts
            </h3>
            <p className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 inline-block">
              +12.4% vs yesterday
            </p>
          </div>
        </div>

        {/* KPI: Today's Revenue */}
        <div className="rounded-2xl border border-gray-150 bg-white p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative overflow-hidden group">
          <div className={cn("absolute top-0 left-0 right-0 h-1", colors.primary)} />
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">Today&apos;s Revenue</span>
            <div className={cn("p-2.5 rounded-xl", colors.bg)}>
              <DollarSign size={18} className={colors.text} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-[30px] font-black text-gray-900 tracking-tight leading-none">
              ₹{revenueValue.toLocaleString()}
            </h3>
            <p className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 inline-block">
              +18.2% vs yesterday
            </p>
          </div>
        </div>

        {/* KPI: Active Orders */}
        <div className="rounded-2xl border border-gray-150 bg-white p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative overflow-hidden group">
          <div className={cn("absolute top-0 left-0 right-0 h-1", colors.primary)} />
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">Active Orders</span>
            <div className={cn("p-2.5 rounded-xl", colors.bg)}>
              <Clock size={18} className={colors.text} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-[30px] font-black text-gray-900 tracking-tight leading-none">
              {activeOrdersList.length} Pending
            </h3>
            <p className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 inline-block">
              Requires verification
            </p>
          </div>
        </div>

        {/* KPI: Pending Dues */}
        <div className="rounded-2xl border border-gray-150 bg-white p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative overflow-hidden group">
          <div className={cn("absolute top-0 left-0 right-0 h-1", colors.primary)} />
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">Pending Dues</span>
            <div className={cn("p-2.5 rounded-xl", colors.bg)}>
              <ShieldCheck size={18} className={colors.text} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-[30px] font-black text-gray-900 tracking-tight leading-none">
              ₹{pendingDues.toLocaleString()}
            </h3>
            <p className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block">
              Settles tomorrow
            </p>
          </div>
        </div>

      </div>

      {/* SECTION 4: Order Pipeline */}
      <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.015)] space-y-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2.5 font-sans">
          Order Processing Pipeline
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Pending", count: activeOrdersList.filter(o => o.status === "Pending").length, color: "border-l-yellow-500", bg: "bg-yellow-50/50" },
            { label: "Accepted", count: activeOrdersList.filter(o => o.status === "Accepted").length, color: "border-l-blue-500", bg: "bg-blue-50/30" },
            { label: "Preparing", count: activeOrdersList.filter(o => o.status === "Preparing").length + 2, color: "border-l-orange-500", bg: "bg-orange-50/30" },
            { label: "Ready", count: activeOrdersList.filter(o => o.status === "Ready").length + 1, color: "border-l-indigo-500", bg: "bg-indigo-50/30" },
            { label: "Out For Delivery", count: activeOrdersList.filter(o => o.status === "Shipped").length, color: "border-l-green-500", bg: "bg-green-50/30" },
          ].map((stage) => (
            <div
              key={stage.label}
              onClick={() => alert(`Navigating to filtered orders segment: ${stage.label}`)}
              className={cn(
                "border-l-4 rounded-xl p-4 cursor-pointer hover:shadow-md hover:bg-white transition-all border border-gray-150 flex flex-col justify-between h-28 relative group",
                stage.color,
                stage.bg
              )}
            >
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stage.label}</span>
                <h4 className="text-[28px] font-black text-gray-900 mt-1">{stage.count}</h4>
              </div>
              <div className="flex justify-end pt-1">
                <ChevronRight size={15} className="text-gray-400 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: 5. Live Order Map & 6. Active Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SECTION 5: Live Order Map */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.015)] flex flex-col justify-between min-h-[360px]">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 leading-tight">Live Delivery Map</h3>
              <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Realtime dispatcher tracking routes</p>
            </div>
            <button
              onClick={() => {
                setActiveDeliveries(activeDeliveries.length > 0 ? [] : [
                  { id: "ORD-90812", riderName: "Rahul Sharma", status: "Delivering", progress: 45 },
                ]);
              }}
              className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-150 px-2.5 py-1 rounded-lg uppercase tracking-wider cursor-pointer"
            >
              Toggle Map Empty State
            </button>
          </div>

          {activeDeliveries.length === 0 ? (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-8 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:16px_16px]">
              <MapPin size={34} className="text-gray-300 mb-2 animate-bounce" />
              <h4 className="text-[14px] font-bold text-gray-900">No Active Deliveries</h4>
              <p className="text-xs text-gray-400 font-medium max-w-xs mt-1">
                Start dispatching orders with delivery riders to preview realtime path maps.
              </p>
            </div>
          ) : (
            <div className="flex-1 relative bg-gray-50 border border-gray-150 rounded-xl overflow-hidden mt-4 p-4 min-h-[220px] flex flex-col justify-between">
              {/* Dotted Grid Layout */}
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none" />
              
              {/* Mock Map graphics */}
              <div className="relative w-full h-full flex flex-col justify-between z-10">
                {/* Store Hub */}
                <div className="absolute left-1/4 top-1/3 flex flex-col items-center">
                  <div className="h-6 w-6 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-md animate-pulse">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <span className="text-[9px] font-bold bg-blue-900 text-white px-1.5 py-0.5 rounded shadow mt-1">Store Hub</span>
                </div>

                {/* Rider Route Line 1 */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path d="M 90,80 L 190,140" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="5,5" fill="none" className="animate-[dash_10s_linear_infinite]" />
                  <path d="M 90,80 L 280,60" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="5,5" fill="none" />
                </svg>

                {/* Rider Markers */}
                <div className="absolute left-[135px] top-[105px] flex items-center gap-1.5">
                  <div className="h-5 w-5 bg-blue-600 rounded-full border border-white flex items-center justify-center shadow">
                    <span className="text-[9px] text-white font-bold">R1</span>
                  </div>
                  <span className="text-[8px] bg-white border border-gray-200 px-1 rounded font-mono font-bold">ORD-90812</span>
                </div>

                <div className="absolute left-[200px] top-[65px] flex items-center gap-1.5">
                  <div className="h-5 w-5 bg-green-600 rounded-full border border-white flex items-center justify-center shadow">
                    <span className="text-[9px] text-white font-bold">R2</span>
                  </div>
                  <span className="text-[8px] bg-white border border-gray-200 px-1 rounded font-mono font-bold">ORD-90811</span>
                </div>
              </div>

              {/* Status footer info */}
              <div className="z-10 bg-white border border-gray-150 p-2.5 rounded-lg text-[11px] font-semibold text-gray-705 flex justify-between items-center shadow-sm">
                <span>{activeDeliveries.length} riders tracking dispatch route paths</span>
                <span className="font-mono text-blue-600 font-bold">Meta-API Sync: OK</span>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 6: Active Orders */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.015)] flex flex-col justify-between min-h-[360px]">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 leading-tight">Active Incoming Orders</h3>
              <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Orders requiring validation or prep dispatch</p>
            </div>
            <span className="text-xs text-gray-400 font-bold font-mono">{activeOrdersList.length} active</span>
          </div>

          {activeOrdersList.length === 0 ? (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-8 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:16px_16px]">
              <Inbox size={34} className="text-gray-300 mb-2" />
              <h4 className="text-[14px] font-bold text-gray-900">No Active Orders</h4>
              <p className="text-xs text-gray-400 font-medium max-w-xs mt-1">
                All checkout tickets have been validated and delivered to customers.
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-3 mt-4 custom-scrollbar max-h-[240px] pr-1.5">
              {activeOrdersList.map((o) => (
                <div key={o.id} className="p-4 border border-gray-150 rounded-xl bg-white hover:bg-gray-50/20 transition-all flex justify-between items-center group shadow-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-600">{o.id}</span>
                      <span className="px-2 py-0.5 bg-yellow-50 text-yellow-750 border border-yellow-100 rounded text-[9px] font-bold uppercase tracking-wider">{o.status}</span>
                    </div>
                    <p className="text-xs font-bold text-gray-900">{o.customer}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{o.phone} • {o.date}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-xs font-black text-gray-900">₹{o.total}</p>
                    <button
                      onClick={() => {
                        updateOrderStatus(category, o.id, "Completed");
                        alert(`Order ${o.id} marked as Completed.`);
                      }}
                      className="px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white font-bold text-[10px] rounded-lg transition-colors cursor-pointer"
                    >
                      Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Grid: 7. Delivery Riders & 8. Last 7 Days Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SECTION 7: Delivery Riders */}
        <div className="lg:col-span-1 bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.015)] flex flex-col justify-between min-h-[380px]">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 leading-tight">Riders Availability</h3>
              <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Fleet battery status & vehicles</p>
            </div>
            <button
              onClick={() => {
                setRiders(riders.length > 0 ? [] : [
                  { id: "R-101", name: "Rahul Sharma", status: "Available" as const, battery: 92, vehicle: "Bike" },
                ]);
              }}
              className="text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-150 px-2 py-0.5 rounded uppercase tracking-wider cursor-pointer"
            >
              Toggle Empty
            </button>
          </div>

          {riders.length === 0 ? (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:16px_16px]">
              <Users size={32} className="text-gray-300 mb-2 animate-pulse" />
              <h4 className="text-[14px] font-bold text-gray-900">No Riders Available</h4>
              <p className="text-xs text-gray-400 mt-1 max-w-xs font-medium">
                Add staff members with driver credentials inside the staff workspace configurations.
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-3.5 mt-4 custom-scrollbar">
              {riders.map((r) => (
                <div key={r.id} className="p-3.5 border border-gray-150 rounded-xl bg-gray-50/50 flex justify-between items-center text-xs">
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-900">{r.name}</h4>
                    <p className="text-[10px] text-gray-400 font-mono">{r.vehicle} • {r.id}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className={cn(
                      "px-2 py-0.5 rounded font-black text-[9px] uppercase tracking-wider border",
                      r.status === "Available"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : r.status === "Busy"
                        ? "bg-orange-50 text-orange-700 border-orange-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    )}>
                      {r.status}
                    </span>
                    <p className="text-[10px] text-gray-405 font-mono font-bold pt-0.5 font-sans">🔋 {r.battery}% battery</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 8: Last 7 Days Analytics */}
        <div className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.015)] space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 leading-tight">Last 7 Days Analytics</h3>
              <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Settled metrics and gross weekly volumes</p>
            </div>
            <div className="flex gap-2 font-sans">
              <span className="text-[10px] font-black text-green-600 bg-green-50 border border-green-150 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                Average Basket: ₹1,420
              </span>
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-150 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                +14.8% growth
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Orders chart (Bar SVG) */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-sans">Daily Orders volume</span>
              <div className="h-32 flex items-end justify-between border-b border-gray-100 pb-2">
                {[14, 18, 12, 24, 28, 15, categoryOrders.length + 8].map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1 mx-1.5 group">
                    <div
                      className={cn("w-full rounded-t-lg transition-all group-hover:opacity-80", colors.primary)}
                      style={{ height: `${(val / 32) * 96}px` }}
                    />
                    <span className="text-[9px] font-mono font-bold text-gray-400 mt-2">D-{7 - idx}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue chart (Line Spline SVG) */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-sans">Daily Revenue Splines</span>
              <div className="h-32 flex flex-col justify-end pt-2">
                <svg viewBox="0 0 240 80" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="gradient-last7" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={colors.fill} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={colors.fill} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0,70 C 40,40 80,60 120,20 C 160,50 200,10 240,30 L 240,80 L 0,80 Z" fill="url(#gradient-last7)" />
                  <path d="M 0,70 C 40,40 80,60 120,20 C 160,50 200,10 240,30" fill="none" stroke={colors.fill} strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="120" cy="20" r="4" fill={colors.fill} stroke="#ffffff" strokeWidth="2" />
                  <circle cx="200" cy="10" r="4" fill={colors.fill} stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Grid: 9. Top Selling Products & 10. Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
        
        {/* SECTION 9: Top Selling Products */}
        <div className="lg:col-span-1 bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.015)] space-y-5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">
            Top catalog performance
          </h3>

          {categoryProducts.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-xs">No catalog segments configured.</div>
          ) : (
            <div className="space-y-4">
              
              {/* Top Selling Today */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Top Selling Today</span>
                <div className="p-3 border border-gray-150 rounded-xl bg-gray-50/50 flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-900">{categoryProducts[0]?.name || "Catalog Product"}</span>
                  <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded font-mono border border-green-100">18 sold</span>
                </div>
              </div>

              {/* Most Viewed Products */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Most Viewed Catalog Items</span>
                <div className="p-3 border border-gray-150 rounded-xl bg-gray-50/50 flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-900">{categoryProducts[1]?.name || "Catalog Product"}</span>
                  <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono border border-blue-100">284 views</span>
                </div>
              </div>

              {/* Low Selling Products */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Low Selling Products</span>
                <div className="p-3 border border-gray-150 rounded-xl bg-gray-50/50 flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-900">{categoryProducts[categoryProducts.length - 1]?.name || "Catalog Product"}</span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono border border-amber-100">Restock recommended</span>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* SECTION 10: Recent Activity Logs */}
        <div className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.015)] space-y-5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">
            Workspace Activity Streams
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-1">
            
            {/* Recent Orders */}
            <div className="space-y-3 border-r border-gray-100 last:border-none pr-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Recent Orders</span>
              <div className="space-y-2.5 text-xs">
                {categoryOrders.slice(0, 2).map((o) => (
                  <div key={o.id} className="space-y-0.5">
                    <span className="font-bold text-gray-900 block truncate">{o.customer}</span>
                    <span className="text-[10px] text-gray-400 font-mono font-bold text-blue-600 block">{o.id} • ₹{o.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Activity */}
            <div className="space-y-3 border-r border-gray-100 last:border-none pr-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Customer Activity</span>
              <div className="space-y-2.5 text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-gray-900 block leading-tight">Sarah Jenkins</span>
                  <span className="text-[9px] text-gray-400 block font-semibold">Initiated WhatsApp Chat • 12m ago</span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-gray-900 block leading-tight">Vikram Malhotra</span>
                  <span className="text-[9px] text-gray-400 block font-semibold">Downloaded menu catalog • 40m ago</span>
                </div>
              </div>
            </div>

            {/* Recent Payments */}
            <div className="space-y-3 border-r border-gray-100 last:border-none pr-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Settlement Payments</span>
              <div className="space-y-2.5 text-xs">
                {transactions.slice(0, 2).map((t) => (
                  <div key={t.id} className="space-y-0.5">
                    <span className="font-bold text-gray-900 block font-mono">₹{t.amount.toLocaleString()}</span>
                    <span className="text-[9px] text-gray-400 font-semibold block">{t.type} • {t.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Broadcasts */}
            <div className="space-y-3 border-r border-gray-100 last:border-none pr-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Recent Broadcasts</span>
              <div className="space-y-2.5 text-xs">
                {campaigns[category]?.slice(0, 2).map((c, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="font-bold text-gray-900 block truncate">{c.name}</span>
                    <span className="text-[9px] text-green-600 block font-bold">{c.readRate}% read delivery</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 2. MY SHOP TAB ─────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
/* ─── 2. MY SHOP TAB (COMMAND WORKSPACE) ────────────────── */
/* ────────────────────────────────────────────────────────── */
export function MyShopTab({ category }: WidgetTabProps) {
  const { profile, updateProfile, orders, products, deliveryZones, addDeliveryZone, addItem } = useWorkspaceStore();
  const colors = getCategoryColors(category);

  // Sub-tab Navigation
  const [activeSubTab, setActiveSubTab] = useState<"home" | "products" | "catalog" | "storefront" | "location" | "settings">("home");

  // Forms States
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

  // Recent Orders State (Interactive Empty State simulation)
  const [ordersEmptyState, setOrdersEmptyState] = useState(false);
  const categoryOrders = orders[category] || [];

  // Menu & Products States
  const categoryProducts = products[category] || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState<"all" | "in-stock" | "out-of-stock">("all");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, secondary: "", stock: 10 });

  // Settings State
  const [invoiceLogo, setInvoiceLogo] = useState(profile.invoiceLogo || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80");
  const [invoiceColor, setInvoiceColor] = useState(profile.invoiceColor || "#2563EB");
  const [taxRate, setTaxRate] = useState(profile.productTaxPercent || 5);
  const [taxEnabled, setTaxEnabled] = useState(true);

  // Notification / Alert trigger helper
  const triggerSaveNotification = (msg: string) => {
    alert(msg);
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(detailsForm);
    setIsEditingDetails(false);
    triggerSaveNotification("Business Details saved to store successfully.");
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
      alert("Please provide valid product name and price.");
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
    <div className="space-y-8 font-sans antialiased text-gray-900">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-1">
          <h1 className="text-[28px] md:text-[32px] font-black text-gray-900 tracking-tight leading-tight">My Shop</h1>
          <p className="text-[14px] text-gray-400 font-medium">Manage your shop profile, storefront, products and business settings.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveSubTab("settings")}
            className="px-4 py-2 border border-gray-150 rounded-xl hover:bg-gray-50 text-gray-700 font-bold text-xs transition-all cursor-pointer"
          >
            Edit Shop
          </button>
          <button
            onClick={() => alert("Banner file selector opened.")}
            className="px-4 py-2 border border-gray-150 rounded-xl hover:bg-gray-50 text-gray-700 font-bold text-xs transition-all cursor-pointer"
          >
            Change Banner
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(profile.website);
              alert("Store link copied: " + profile.website);
            }}
            className={cn("px-4 py-2 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm", colors.primary)}
          >
            Share Store
          </button>
        </div>
      </div>

      {/* SECTION 1: SHOP PROFILE HERO */}
      <div className="relative rounded-3xl overflow-hidden border border-gray-150 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_12px_24px_-4px_rgba(0,0,0,0.01)] bg-white">
        {/* Cover Banner */}
        <div className="h-48 w-full bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url(" + profile.businessBanner + ")" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="p-6 md:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
            {/* Logo */}
            <img
              src={profile.businessLogo}
              alt="Logo"
              className="h-24 w-24 rounded-2xl border-4 border-white bg-gray-155 shadow-md object-cover sm:-mt-14 relative z-10"
            />
            <div className="text-center sm:text-left space-y-1.5 pt-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-[22px] md:text-[25px] font-black text-gray-900 tracking-tight leading-tight">
                  {profile.businessName}
                </h2>
                {profile.businessVerificationStatus === "Verified" && (
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-150 rounded-lg text-[9px] font-black tracking-wide flex items-center gap-1">
                    <ShieldCheck size={11} className="fill-current" /> VERIFIED
                  </span>
                )}
              </div>
              <p className="text-[12px] text-gray-400 font-bold uppercase tracking-wider">
                {"@" + (profile.storeUsername || "merchant") + " • " + profile.businessCategory}
              </p>
              
              {/* Ratings and Link */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={14} className="fill-current" />
                  <span className="text-gray-900 font-bold">{profile.storeRating}</span>
                  <span className="text-gray-400">({profile.ordersCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                  <span className="text-gray-450 font-mono truncate max-w-xs">{profile.website}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(profile.website);
                      alert("Store URL copied!");
                    }}
                    className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-150 px-2 py-0.5 rounded"
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Status Controls */}
          <div className="w-full lg:w-auto flex flex-wrap items-center justify-between sm:justify-end gap-5 border-t lg:border-none pt-4 lg:pt-0">
            <div className="text-left lg:text-right">
              <span className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 border",
                profile.businessStatus === "Online" ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-55 text-gray-500 border-gray-200"
              )}>
                <span className={cn("h-2 w-2 rounded-full", profile.businessStatus === "Online" ? "bg-green-600 animate-pulse" : "bg-gray-400")} />
                {profile.businessStatus === "Online" ? "Store Open" : "Store Offline"}
              </span>
              <p className="text-[10px] text-gray-400 font-medium mt-1">Accepting orders schedule</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const nextStatus = profile.businessStatus === "Online" ? "Offline" : "Online";
                  updateProfile({ businessStatus: nextStatus });
                }}
                className={cn(
                  "px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-55",
                  profile.businessStatus === "Offline" && "bg-gray-50 text-gray-400 pointer-events-none"
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
                  "relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                  profile.businessStatus === "Online" ? colors.primary : "bg-gray-200"
                )}
              >
                <span className={cn(
                  "pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  profile.businessStatus === "Online" ? "translate-x-5.5" : "translate-x-0"
                )} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: BUSINESS METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {[
          { title: "Today's Orders", val: "14 Sales", change: "+12%", color: "text-blue-600" },
          { title: "Total Orders", val: profile.ordersCount, change: "All time", color: "text-gray-900" },
          { title: "Revenue Today", val: "₹18,400", change: "+15%", color: "text-green-600" },
          { title: "Products Count", val: profile.productsCount, change: "Catalog", color: "text-purple-600" },
          { title: "Active Customers", val: "428 unique", change: "+6%", color: "text-indigo-600" },
          { title: "Avg Store Rating", val: "⭐ " + profile.storeRating, change: "High Trust", color: "text-amber-600" },
          { title: "Avg Basket Value", val: "₹1,420", change: "+2%", color: "text-cyan-600" },
          { title: "Pending Orders", val: "3 tickets", change: "Action req.", color: "text-orange-600" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-gray-150 rounded-xl p-4.5 space-y-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block truncate">{item.title}</span>
            <h4 className={cn("text-[17px] font-black tracking-tight", item.color)}>{item.val}</h4>
            <span className="text-[9px] font-bold text-gray-400 block">{item.change}</span>
          </div>
        ))}
      </div>

      {/* SECTION 7: INTERNAL NAVIGATION TABS */}
      <div className="flex border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-none gap-2 font-sans pt-1">
        {(["home", "products", "catalog", "storefront", "location", "settings"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={cn(
              "px-5 py-3.5 border-b-2 font-bold text-sm tracking-tight transition-all duration-150 capitalize cursor-pointer",
              activeSubTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-300"
            )}
          >
            {tab === "storefront" ? "Storefront & QR" : tab === "settings" ? "Settings Workspace" : tab}
          </button>
        ))}
      </div>

      {/* ACTIVE SUB-TAB CONTAINER */}
      <div className="space-y-8">
        
        {/* TABS 1: HOME */}
        {activeSubTab === "home" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Business Overview info card */}
              <div className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <h3 className="text-[18px] font-bold text-gray-900">Workspace Health & Performance</h3>
                  <span className="text-[11px] font-bold text-green-700 bg-green-50 border border-green-150 px-2.5 py-0.5 rounded">HEALTHY</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
                  <div className="p-4 border border-gray-155 rounded-xl bg-gray-50/50 space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-sans font-bold block">Page Load Latency</span>
                    <span className="text-[14px] font-black text-gray-900">1.2s average</span>
                    <span className="text-[9px] text-green-600 block">Fast Compliance</span>
                  </div>
                  <div className="p-4 border border-gray-155 rounded-xl bg-gray-55/50 space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-sans font-bold block">Meta API uptime</span>
                    <span className="text-[14px] font-black text-gray-900">99.98% uptime</span>
                    <span className="text-[9px] text-blue-600 block">Sync online</span>
                  </div>
                  <div className="p-4 border border-gray-155 rounded-xl bg-gray-55/50 space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-sans font-bold block">Customer Response</span>
                    <span className="text-[14px] font-black text-gray-900">&lt; 3 mins ETA</span>
                    <span className="text-[9px] text-green-600 block">SLA Compliant</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block font-sans">Quick Shortcuts</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button onClick={() => setActiveSubTab("settings")} className="p-3 border border-gray-150 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-800 text-center transition-colors">Setup API</button>
                    <button onClick={() => setActiveSubTab("products")} className="p-3 border border-gray-150 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-800 text-center transition-colors">Add Catalog</button>
                    <button onClick={() => setActiveSubTab("storefront")} className="p-3 border border-gray-150 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-800 text-center transition-colors">QR Prints</button>
                    <button onClick={() => alert("Report exported.")} className="p-3 border border-gray-150 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-800 text-center transition-colors">Export Logs</button>
                  </div>
                </div>
              </div>

              {/* Side Info: Workspace Details */}
              <div className="lg:col-span-1 bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-55 pb-2.5">Shop Health Indexes</h3>
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center"><span className="text-gray-550 font-medium">Merchant Account ID</span><span className="font-mono font-bold text-gray-900">{profile.merchantId}</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-550 font-medium">Active Workspace</span><span className="font-mono font-bold text-gray-900">{profile.workspaceId}</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-550 font-medium">Linked Category</span><span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-bold uppercase text-[9px]">{profile.businessCategory}</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-555 font-medium">Subscription tier</span><span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md font-bold uppercase text-[9px]">{profile.subscriptionPlan}</span></div>
                </div>
              </div>

            </div>

            {/* SECTION 3: BUSINESS DETAILS */}
            <div className="bg-white border border-gray-155 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">Business Profile Details</h3>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">Corporate identities and contact records</p>
                </div>
                <button
                  onClick={() => setIsEditingDetails(!isEditingDetails)}
                  className="px-3.5 py-1.5 border border-gray-150 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-55 transition-all"
                >
                  {isEditingDetails ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              <form onSubmit={handleSaveDetails} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Business Name</label>
                  <input
                    type="text"
                    disabled={!isEditingDetails}
                    value={detailsForm.businessName}
                    onChange={(e) => setDetailsForm({ ...detailsForm, businessName: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50/50 disabled:text-gray-500 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Owner Full Name</label>
                  <input
                    type="text"
                    disabled={!isEditingDetails}
                    value={detailsForm.ownerName}
                    onChange={(e) => setDetailsForm({ ...detailsForm, ownerName: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50/50 disabled:text-gray-500 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Store Username</label>
                  <input
                    type="text"
                    disabled={!isEditingDetails}
                    value={detailsForm.storeUsername || ""}
                    onChange={(e) => setDetailsForm({ ...detailsForm, storeUsername: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-55/50 disabled:text-gray-500 transition-all font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Business Email</label>
                  <input
                    type="email"
                    disabled={!isEditingDetails}
                    value={detailsForm.email}
                    onChange={(e) => setDetailsForm({ ...detailsForm, email: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50/50 disabled:text-gray-500 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Support Phone Number</label>
                  <input
                    type="text"
                    disabled={!isEditingDetails}
                    value={detailsForm.phone}
                    onChange={(e) => setDetailsForm({ ...detailsForm, phone: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50/50 disabled:text-gray-500 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">WhatsApp Business API Number</label>
                  <input
                    type="text"
                    disabled={!isEditingDetails}
                    value={detailsForm.phone}
                    onChange={(e) => setDetailsForm({ ...detailsForm, phone: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50/50 disabled:text-gray-500 transition-all font-semibold"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Business Address</label>
                  <input
                    type="text"
                    disabled={!isEditingDetails}
                    value={detailsForm.address}
                    onChange={(e) => setDetailsForm({ ...detailsForm, address: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-55/50 disabled:text-gray-500 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">City</label>
                  <input
                    type="text"
                    disabled={!isEditingDetails}
                    value="New Delhi"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50/50 disabled:text-gray-500 transition-all font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">State</label>
                  <input
                    type="text"
                    disabled={!isEditingDetails}
                    value="Delhi"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50/50 disabled:text-gray-500 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Country</label>
                  <input
                    type="text"
                    disabled={!isEditingDetails}
                    value={detailsForm.country}
                    onChange={(e) => setDetailsForm({ ...detailsForm, country: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50/50 disabled:text-gray-500 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">GST Number (GSTIN)</label>
                  <input
                    type="text"
                    disabled={!isEditingDetails}
                    value={detailsForm.gstNumber}
                    onChange={(e) => setDetailsForm({ ...detailsForm, gstNumber: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50/50 disabled:text-gray-500 transition-all font-semibold font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Corporate License Number</label>
                  <input
                    type="text"
                    disabled={!isEditingDetails}
                    value={detailsForm.licenseNumber}
                    onChange={(e) => setDetailsForm({ ...detailsForm, licenseNumber: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50/50 disabled:text-gray-500 transition-all font-semibold font-mono"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Business Description</label>
                  <textarea
                    disabled={!isEditingDetails}
                    value={detailsForm.businessDescription}
                    onChange={(e) => setDetailsForm({ ...detailsForm, businessDescription: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50/50 disabled:text-gray-500 transition-all font-semibold min-h-[80px]"
                  />
                </div>

                {isEditingDetails && (
                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className={cn("px-5 py-2.5 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition-colors", colors.primary)}
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Grid for Operating Hours & Delivery Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* SECTION 4: OPERATING HOURS */}
              <div className="bg-white border border-gray-155 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-[18px] font-bold text-gray-900">Operating Hours</h3>
                    <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Define slots and holiday closures</p>
                  </div>
                  <button
                    onClick={() => setIsEditingHours(!isEditingHours)}
                    className="px-3 py-1.5 border border-gray-150 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {isEditingHours ? "Cancel" : "Edit Hours"}
                  </button>
                </div>

                <form onSubmit={handleSaveHours} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Opening Time</label>
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
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-900 font-semibold disabled:bg-gray-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Closing Time</label>
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
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-900 font-semibold disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Working Days Schedule</span>
                    <div className="flex flex-wrap gap-2 text-xs font-bold text-gray-650">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <span key={day} className="px-3 py-1.5 bg-gray-50 border border-gray-150 rounded-lg flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-green-600 shrink-0" />
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3.5 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-600">
                    <div className="flex justify-between items-center">
                      <span>Holiday settings (Force Offline)</span>
                      <span className="px-2 py-0.5 bg-gray-50 text-gray-550 rounded border border-gray-155 text-[9px] font-bold uppercase">Disabled</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Temporary closure overrides</span>
                      <span className="px-2 py-0.5 bg-gray-50 text-gray-555 rounded border border-gray-155 text-[9px] font-bold uppercase">None Active</span>
                    </div>
                  </div>

                  {isEditingHours && (
                    <div className="flex justify-end pt-2">
                      <button type="submit" className={cn("px-4 py-2 text-white font-bold text-xs rounded-xl shadow cursor-pointer", colors.primary)}>
                        Save Hours
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* SECTION 5: DELIVERY SETTINGS */}
              <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-[18px] font-bold text-gray-900">Delivery Configuration</h3>
                    <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Set fees, limits and service radii</p>
                  </div>
                  <button
                    onClick={() => setIsEditingDelivery(!isEditingDelivery)}
                    className="px-3 py-1.5 border border-gray-150 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {isEditingDelivery ? "Cancel" : "Edit Config"}
                  </button>
                </div>

                <form onSubmit={handleSaveDelivery} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase block">Delivery Charge (₹)</label>
                      <input
                        type="number"
                        disabled={!isEditingDelivery}
                        value={deliveryForm.deliveryCharges}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, deliveryCharges: Number(e.target.value) })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-900 font-bold disabled:bg-gray-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase block">Free Delivery Min Threshold (₹)</label>
                      <input
                        type="number"
                        disabled={!isEditingDelivery}
                        value={deliveryForm.freeDeliveryThreshold}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, freeDeliveryThreshold: Number(e.target.value) })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-900 font-bold disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase block">Delivery ETA (Time)</label>
                      <input
                        type="text"
                        disabled={!isEditingDelivery}
                        value={deliveryForm.deliveryTime}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, deliveryTime: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-900 font-semibold disabled:bg-gray-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase block">Delivery Radius (km)</label>
                      <input
                        type="number"
                        disabled={!isEditingDelivery}
                        value={deliveryForm.deliveryRadius}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, deliveryRadius: Number(e.target.value) })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-900 font-semibold disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 text-xs font-semibold text-gray-600 pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-green-600" />
                      Pickup Available
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-green-600" />
                      Delivery Available
                    </span>
                  </div>

                  {isEditingDelivery && (
                    <div className="flex justify-end pt-2">
                      <button type="submit" className={cn("px-4 py-2 text-white font-bold text-xs rounded-xl shadow cursor-pointer", colors.primary)}>
                        Save Settings
                      </button>
                    </div>
                  )}
                </form>
              </div>

            </div>

            {/* SECTION 6: RECENT ORDERS */}
            <div className="bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex flex-wrap justify-between items-center bg-white gap-4">
                <div>
                  <h3 className="text-[17px] font-bold text-gray-900">Recent Workspace Orders</h3>
                  <p className="text-xs text-gray-455 mt-0.5">Audit log of customer checkouts</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setOrdersEmptyState(!ordersEmptyState)}
                    className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-150 px-2.5 py-1.5 rounded-lg uppercase tracking-wider cursor-pointer"
                  >
                    Toggle Empty State
                  </button>
                  <button onClick={() => alert("Navigating to orders page.")} className="px-3.5 py-1.5 border border-gray-155 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors">
                    View All
                  </button>
                </div>
              </div>

              {ordersEmptyState || categoryOrders.length === 0 ? (
                <div className="flex flex-col justify-center items-center text-center p-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:16px_16px]">
                  <Inbox size={38} className="text-gray-300 mb-2 animate-bounce" />
                  <h4 className="text-[14px] font-bold text-gray-900">No Recent Transactions</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs font-medium">
                    Workspace checkout logs are empty. When orders are received via storefront catalog links, they will be listed here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-455 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-6">ID</th>
                        <th className="py-3 px-6">Customer</th>
                        <th className="py-3 px-6">Total Amount</th>
                        <th className="py-3 px-6">Order Status</th>
                        <th className="py-3 px-6">Payment Mode</th>
                        <th className="py-3 px-6">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryOrders.slice(0, 4).map((o) => (
                        <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors font-semibold font-sans">
                          <td className="py-3.5 px-6 font-mono font-bold text-blue-600">{o.id}</td>
                          <td className="py-3.5 px-6 font-bold text-gray-900">{o.customer}</td>
                          <td className="py-3.5 px-6 font-black text-gray-950">₹{o.total}</td>
                          <td className="py-3.5 px-6">
                            <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-green-50 text-green-700 border border-green-200 font-sans">
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-gray-500 font-mono">Razorpay Online</td>
                          <td className="py-3.5 px-6 text-gray-400 font-mono">{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* RECENT ACTIVITY TIMELINE */}
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-5">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Workspace Activity Audit Trail</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-medium">
                <div className="p-4 border border-gray-100 bg-gray-50/40 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Settings Changes</span>
                  <p className="text-gray-900 font-bold leading-snug">Delivery charges changed to ₹{profile.deliveryCharges || 0}</p>
                  <span className="text-[9px] text-gray-400 font-mono block">12 mins ago</span>
                </div>
                <div className="p-4 border border-gray-100 bg-gray-50/40 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Product Updates</span>
                  <p className="text-gray-900 font-bold leading-snug">Inventory updated for Top selling items</p>
                  <span className="text-[9px] text-gray-400 font-mono block">2 hours ago</span>
                </div>
                <div className="p-4 border border-gray-100 bg-gray-50/40 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Recent Logins</span>
                  <p className="text-gray-900 font-bold leading-snug">Session authorized from chrome Windows</p>
                  <span className="text-[9px] text-gray-400 font-mono block">4 hours ago</span>
                </div>
                <div className="p-4 border border-gray-100 bg-gray-50/40 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Recent Orders</span>
                  <p className="text-gray-900 font-bold leading-snug">{"Order " + (categoryOrders[0]?.id || "None") + " completed"}</p>
                  <span className="text-[9px] text-gray-400 font-mono block">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MENU & PRODUCTS */}
        {activeSubTab === "products" && (
          <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
              <div>
                <h3 className="text-[18px] font-bold text-gray-900">Products Catalog Workspace</h3>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Toggle availability and stock counts</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className={cn("px-4 py-2 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-colors cursor-pointer", colors.primary)}
                >
                  <Plus size={14} /> Add Product
                </button>
              </div>
            </div>

            {/* Filter Dashboard Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-72">
                <Search size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search catalog products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all font-semibold"
                />
              </div>
              <div className="flex gap-2.5 text-xs font-bold text-gray-600 w-full sm:w-auto overflow-x-auto">
                <button onClick={() => setStockFilter("all")} className={cn("px-3.5 py-2 border rounded-lg transition-all", stockFilter === "all" ? "bg-gray-100 text-gray-900 border-gray-300" : "border-gray-200 hover:bg-gray-50")}>{"All (" + categoryProducts.length + ")"}</button>
                <button onClick={() => setStockFilter("in-stock")} className={cn("px-3.5 py-2 border rounded-lg transition-all", stockFilter === "in-stock" ? "bg-gray-100 text-gray-900 border-gray-300" : "border-gray-200 hover:bg-gray-50")}>In Stock</button>
                <button onClick={() => setStockFilter("out-of-stock")} className={cn("px-3.5 py-2 border rounded-lg transition-all", stockFilter === "out-of-stock" ? "bg-gray-100 text-gray-900 border-gray-300" : "border-gray-200 hover:bg-gray-50")}>Out of Stock</button>
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts
                .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .filter((p) => {
                  if (stockFilter === "in-stock") return p.status === "Available";
                  if (stockFilter === "out-of-stock") return p.status === "Out of Stock";
                  return true;
                })
                .map((product) => (
                  <div key={product.id} className="p-5 border border-gray-150 rounded-2xl bg-white shadow-sm flex flex-col justify-between h-44 relative hover:shadow-md transition-shadow">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-gray-400 font-bold pr-2">{product.id}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border",
                          product.status === "Available" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                        )}>
                          {product.status}
                        </span>
                      </div>
                      <h4 className="text-[15px] font-bold text-gray-900 truncate">{product.name}</h4>
                      <p className="text-[11px] text-gray-400 font-semibold">{product.secondary}</p>
                    </div>

                    <div className="flex justify-between items-end border-t border-gray-50 pt-3">
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase tracking-wider font-bold">Catalog Price</span>
                        <span className="text-[16px] font-black text-gray-950">₹{product.price}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* Interactive toggle */}
                        <button
                          onClick={() => {
                            alert("Stock availability changed for: " + product.name);
                          }}
                          className={cn(
                            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 focus:outline-none",
                            product.status === "Available" ? colors.primary : "bg-gray-200"
                          )}
                        >
                          <span className={cn(
                            "inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200",
                            product.status === "Available" ? "translate-x-4" : "translate-x-0"
                          )} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Simulated Add Product Drawer Modal */}
            {isAddProductOpen && (
              <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs">
                <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6">
                  <div>
                    <h3 className="text-[20px] font-black text-gray-900">Add New Product</h3>
                    <p className="text-xs text-gray-450 mt-1">Configure metadata specifications for storefront catalogs</p>
                  </div>
                  <form onSubmit={handleAddProductSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase block">Product Name</label>
                      <input
                        type="text"
                        required
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 font-semibold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase block">Catalog Description / Category</label>
                      <input
                        type="text"
                        value={newProduct.secondary}
                        onChange={(e) => setNewProduct({ ...newProduct, secondary: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 font-semibold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase block">Price (₹)</label>
                        <input
                          type="number"
                          required
                          value={newProduct.price || ""}
                          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 font-bold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase block">Opening Stock Qty</label>
                        <input
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 font-bold"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsAddProductOpen(false)}
                        className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={cn("px-5 py-2 text-white font-bold text-xs rounded-xl shadow cursor-pointer", colors.primary)}
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

        {/* TAB 3: CATALOG */}
        {activeSubTab === "catalog" && (
          <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6">
            <div>
              <h3 className="text-[18px] font-bold text-gray-900 border-b border-gray-100 pb-4">Digital Store Catalog Sync</h3>
              <p className="text-xs text-gray-400 mt-1">Configure automated broadcasts and visibility parameters</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* WhatsApp catalog card */}
              <div className="p-5 border border-gray-155 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[15px] font-black text-gray-900">WhatsApp Catalog Sync</h4>
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded text-[9px] font-bold">READY</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  Connect and push active storefront catalog collections directly to the Meta API catalog directory. Allow customers to browse via chat lists.
                </p>
                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-gray-455 font-bold">Autosync catalogs</span>
                  <button onClick={() => alert("WhatsApp catalog autosync toggled.")} className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 rounded-xl font-bold transition-all">Toggle Enabled</button>
                </div>
              </div>

              {/* Featured segment settings */}
              <div className="p-5 border border-gray-155 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[15px] font-black text-gray-900">Storefront Featured Section</h4>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[9px] font-bold">ACTIVE</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  Highlight key high-selling products at the top overlay sections of the digital web menu.
                </p>
                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-gray-455 font-bold">Display catalog badge overlays</span>
                  <button onClick={() => alert("Badge display configuration adjusted.")} className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 rounded-xl font-bold transition-all">Adjust Visibility</button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: STOREFRONT & QR */}
        {activeSubTab === "storefront" && (
          <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-8">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-[18px] font-bold text-gray-900">Theme Customizations & QR Codes</h3>
                <p className="text-xs text-gray-400 mt-0.5">Brand themes and printable checkout codes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* QR Printing options */}
              <div className="lg:col-span-1 border border-gray-155 rounded-2xl p-5 space-y-5 text-center flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-sans">Printable Shop QR</span>
                  <div className="my-4 flex justify-center">
                    <div className="h-36 w-36 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center p-3">
                      {/* Dotted Grid placeholder simulating QR */}
                      <div className="h-full w-full bg-[radial-gradient(#000_2px,transparent_2px)] bg-[size:8px_8px] opacity-90" />
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900">QR Version: v2.4 (Static)</h4>
                  <p className="text-[10.5px] text-gray-400 mt-1 max-w-xs mx-auto">Customers scan to launch web menu catalogs on phones.</p>
                </div>

                <div className="space-y-2 pt-4">
                  <button onClick={() => alert("Downloading PDF poster package...")} className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 font-bold text-xs text-gray-800 rounded-xl transition-colors">Download Poster PDF</button>
                  <button onClick={() => alert("Regenerated store link codes.")} className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 font-bold text-xs text-gray-800 rounded-xl transition-colors">Regenerate QR Code</button>
                </div>
              </div>

              {/* Theme Preview controls */}
              <div className="lg:col-span-2 border border-gray-155 rounded-2xl p-5 space-y-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Storefront Web Theme</h4>
                  <p className="text-xs text-gray-550 font-medium mt-1">Adjust color palettes and typography defaults on customer web pages.</p>
                  
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    {[
                      { name: "Minimalist Light", colors: "bg-slate-100 border-slate-300", tag: "Clean style" },
                      { name: "Neon Dark Mode", colors: "bg-slate-900 border-slate-700 text-white", tag: "Cool style" },
                      { name: "Pastel Mint", colors: "bg-emerald-50 border-emerald-200", tag: "Cozy style" }
                    ].map((themeOpt) => (
                      <div
                        key={themeOpt.name}
                        onClick={() => alert("Theme applied: " + themeOpt.name)}
                        className={cn("p-4 border rounded-xl cursor-pointer text-center text-xs font-bold transition-all hover:scale-102", themeOpt.colors)}
                      >
                        {themeOpt.name}
                        <span className="text-[9px] text-gray-400 font-bold block pt-1.5 font-sans">{themeOpt.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-155 rounded-xl p-4 bg-gray-50/50 space-y-2 text-xs font-semibold">
                  <div className="flex justify-between items-center"><span className="text-gray-500">Global Font-family:</span><span className="font-mono text-gray-900">Plus Jakarta Sans</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-550">Accent highlight:</span><span className="font-mono text-blue-600">{colors.fill}</span></div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: LOCATION */}
        {activeSubTab === "location" && (
          <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-[18px] font-bold text-gray-900">Branch Location & Delivery zones</h3>
              <p className="text-xs text-gray-450 mt-0.5">Configure spatial coverage parameters</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Maps Placeholder Graphic */}
              <div className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden min-h-[300px] p-6 relative flex flex-col justify-between">
                {/* Dotted map grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] bg-[size:20px_20px] opacity-35" />
                
                {/* Simulated Map Pins */}
                <div className="relative w-full h-full flex flex-col justify-center items-center z-10 text-center">
                  <MapPin size={38} className="text-red-500 mb-2 animate-bounce" />
                  <h4 className="text-sm font-bold text-gray-900">Store GPS Coordinates Connected</h4>
                  <p className="text-xs text-gray-400 font-mono mt-1 pr-1 font-bold">Lat: 28.6139° N, Lon: 77.2090° E</p>
                </div>

                <div className="z-10 bg-white border border-gray-155 p-3 rounded-xl flex justify-between items-center text-xs font-semibold">
                  <span>Google Maps Embed Status</span>
                  <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">CONNECTED</span>
                </div>
              </div>

              {/* Delivery Zone records list */}
              <div className="lg:col-span-1 border border-gray-150 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-gray-450 uppercase tracking-widest">Active Delivery Zones</h4>
                  <button
                    onClick={() => {
                      const name = prompt("Enter delivery zone name:");
                      const fee = Number(prompt("Enter delivery charge (₹):") || 0);
                      if (name) {
                        addDeliveryZone({ name, charges: fee, minAmount: 500 });
                        alert("Zone added successfully!");
                      }
                    }}
                    className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-150 px-2 py-0.5 rounded uppercase"
                  >
                    Add Zone
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[220px] overflow-y-auto custom-scrollbar font-sans font-bold">
                  {deliveryZones.map((z) => (
                    <div key={z.id} className="p-3 border border-gray-100 bg-gray-50/50 rounded-xl flex justify-between items-center text-xs font-semibold font-sans">
                      <div>
                        <span className="text-gray-900 font-bold block">{z.name}</span>
                        <span className="text-[10px] text-gray-400 block font-normal">{ "Min. Order: ₹" + z.minAmount }</span>
                      </div>
                      <span className="font-mono font-bold text-gray-900">{ "₹" + z.charges + " fee" }</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeSubTab === "settings" && (
          <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-8">
            
            {/* Sub-Header settings */}
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-[20px] font-black text-gray-900">Settings Workspace</h3>
              <p className="text-xs text-gray-450 mt-1">Configure integrations, invoice branding, taxes and transaction routes</p>
            </div>

            {/* 1. WHATSAPP BUSINESS CONNECTIONS */}
            <div className="p-6 border border-gray-150 rounded-2xl bg-slate-50/20 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-[15px] font-bold text-gray-900">WhatsApp Business API Link</h4>
                  <p className="text-xs text-gray-500 font-medium">Handle automated customer notifications and catalog broadcasts.</p>
                </div>
                <span className={cn(
                  "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border",
                  profile.whatsappStatus === "Connected" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                )}>
                  {profile.whatsappStatus === "Connected" ? "Connected" : "Disconnected"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold pt-2">
                <div className="p-3 border border-gray-100 bg-white rounded-xl flex justify-between items-center">
                  <span>Webhook Receiver:</span>
                  <span className="font-mono text-green-600 text-[10px]">Active (v15.0)</span>
                </div>
                <div className="p-3 border border-gray-100 bg-white rounded-xl flex justify-between items-center">
                  <span>Connection ID:</span>
                  <span className="font-mono text-gray-500 text-[10px]">{profile.whatsappBusinessId || "None"}</span>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button onClick={() => alert("Webhook reconnected.")} className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-bold text-gray-700 transition-colors">Reconnect API</button>
                <button onClick={() => updateProfile({ whatsappStatus: "Disconnected" })} className="px-3 py-1.5 border border-red-200 hover:bg-red-50 rounded-lg text-xs font-bold text-red-650 transition-colors">Disconnect</button>
              </div>
            </div>

            {/* 2. STORE SETTINGS & CUSTOM URL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Store metadata */}
              <div className="p-5 border border-gray-150 rounded-2xl space-y-4">
                <h4 className="text-[14px] font-bold text-gray-900 border-b border-gray-50 pb-2">Store Settings</h4>
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-550 font-medium">Default Language</span>
                    <span className="font-bold text-gray-900">English (India)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-550 font-medium">Billing Currency</span>
                    <span className="font-bold text-gray-900">{profile.currency}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-550 font-medium">Workspace Timezone</span>
                    <span className="font-bold text-gray-900">{profile.timezone}</span>
                  </div>
                </div>
              </div>

              {/* Custom Store URL setup */}
              <div className="p-5 border border-gray-155 rounded-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 border-b border-gray-50 pb-2">Custom URL Configuration</h4>
                  <p className="text-xs text-gray-500 font-medium mt-1">Configure white-labeled domain routes for storefront checkout menus.</p>
                  <div className="pt-3">
                    <input
                      type="text"
                      disabled
                      value={profile.website}
                      className="w-full bg-gray-55 border border-gray-200 rounded-xl px-4 py-2 text-xs font-mono text-gray-450 font-bold"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-3">
                  <button onClick={() => alert("Custom domain mapping wizard opened.")} className="px-3.5 py-1.5 border border-gray-200 hover:bg-gray-55 rounded-xl text-xs font-bold text-gray-755 transition-colors">Configure Custom Domain</button>
                </div>
              </div>

            </div>

            {/* 3. INVOICE BRANDING SETTINGS */}
            <div className="p-6 border border-gray-150 rounded-2xl space-y-6">
              <h4 className="text-[15px] font-bold text-gray-900 border-b border-gray-100 pb-3">Invoice Branding</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Invoice Logo URL</label>
                  <input
                    type="text"
                    value={invoiceLogo}
                    onChange={(e) => setInvoiceLogo(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-900 font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Invoice Primary Accent Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={invoiceColor}
                      onChange={(e) => setInvoiceColor(e.target.value)}
                      className="h-8.5 w-12 border border-gray-200 rounded-xl cursor-pointer bg-white"
                    />
                    <input
                      type="text"
                      value={invoiceColor}
                      onChange={(e) => setInvoiceColor(e.target.value)}
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-900 font-mono font-bold"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Invoice Footer Terms & Conditions</label>
                  <textarea
                    defaultValue="Invoice generated automatically. Thank you for your business!"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-900 font-semibold min-h-[60px]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    updateProfile({ invoiceLogo, invoiceColor });
                    triggerSaveNotification("Invoice branding settings saved.");
                  }}
                  className={cn("px-4 py-2 text-white font-bold text-xs rounded-xl shadow cursor-pointer", colors.primary)}
                >
                  Save Invoice Settings
                </button>
              </div>
            </div>

            {/* 4. TAX & FLOW CONFIGURATIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Tax configuration */}
              <div className="p-5 border border-gray-150 rounded-2xl space-y-4">
                <h4 className="text-[14px] font-bold text-gray-900 border-b border-gray-55 pb-2">Tax Settings</h4>
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-xs font-semibold text-gray-655">
                    <span>Enable Global Tax charges</span>
                    <button
                      type="button"
                      onClick={() => setTaxEnabled(!taxEnabled)}
                      className={cn(
                        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                        taxEnabled ? colors.primary : "bg-gray-200"
                      )}
                    >
                      <span className={cn("inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200", taxEnabled ? "translate-x-4" : "translate-x-0")} />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase block">Global Tax Rate (%)</label>
                    <input
                      type="number"
                      value={taxRate}
                      disabled={!taxEnabled}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-950 font-bold disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* Order Confirmation flow */}
              <div className="p-5 border border-gray-155 rounded-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 border-b border-gray-55 pb-2">Flow Configurations</h4>
                  <p className="text-xs text-gray-500 font-medium mt-1">Configure automated dispatch notifications.</p>
                  
                  <div className="flex justify-between items-center text-xs font-semibold text-gray-655 pt-3">
                    <span>Auto Confirmation Mode</span>
                    <button
                      onClick={() => {
                        const next = (profile.flowConfirmationMode === "Auto" ? "Manual" : "Auto");
                        updateProfile({ flowConfirmationMode: next });
                        alert("Confirmation Flow configured to: " + next);
                      }}
                      className="px-3 py-1 border border-gray-200 hover:bg-gray-50 font-bold rounded-lg transition-colors"
                    >
                      {profile.flowConfirmationMode || "Auto"}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* 5. PAYMENT GATEWAY & SETTLEMENTS */}
            <div className="p-6 border border-gray-150 rounded-2xl bg-gray-50/20 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-[15px] font-bold text-gray-900">Payment Gateway Setup</h4>
                  <p className="text-xs text-gray-500 font-medium">Verify KYC credentials to settle customer checkout transactions.</p>
                </div>
                <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg text-[9px] font-black uppercase">KYC APPROVED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                <div className="p-4 border border-gray-155 bg-white rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Settlement Bank Account</span>
                  <p className="text-gray-900 font-bold">HDFC BANK LTD •••• 9081</p>
                  <p className="text-[10px] text-gray-400 font-mono font-normal">IFSC: HDFC0000045</p>
                </div>
                <div className="p-4 border border-gray-155 bg-white rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Active Gateway Integrations</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded text-[9px] font-bold">UPI / Cards</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[9px] font-bold">COD Enabled</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 3. BRANCHES TAB ────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
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
    alert("Branch logged.");
  };

  return (
    <PageWrapper
      title="Branches Directory"
      description="Register physical branch outlets and view mapping channels"
      category={category}
    >
      <div className="bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight">Branch Locations</h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs font-bold bg-blue-600 text-white px-3.5 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Branch</span>
          </button>
        </div>

        {isOpen && (
          <form onSubmit={handleSubmit} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Branch Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <input
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <button type="submit" className="sm:col-span-3 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer">
              Save Branch
            </button>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px] md:text-[15px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-6">ID</th>
                <th className="py-3 px-6">Branch Name</th>
                <th className="py-3 px-6">Address</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {branches.map(b => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-blue-600">{b.id}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">{b.name}</td>
                  <td className="py-4 px-6 text-gray-500">{b.address}</td>
                  <td className="py-4 px-6 text-gray-500 font-mono">{b.phone || "N/A"}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-200">
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

/* ────────────────────────────────────────────────────────── */
/* ─── 4. STAFF TAB ───────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function StaffTab({ category }: WidgetTabProps) {
  const { staff, addStaff, loginLogs } = useWorkspaceStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-add-staff", handleOpen);
    return () => window.removeEventListener("open-add-staff", handleOpen);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return;
    addStaff({ name, role, email, phone, status: "Active" });
    setName("");
    setRole("");
    setEmail("");
    setPhone("");
    setIsOpen(false);
    alert("Staff member logged.");
  };

  return (
    <PageWrapper
      title="Staff Roster Workspace"
      description="Manage merchant employees, authorization roles, and audit shift login histories"
      category={category}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Roster & Add Form (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight font-sans">Active Employees</h3>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs font-bold bg-blue-600 text-white px-3.5 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Member</span>
            </button>
          </div>

          {isOpen && (
            <form onSubmit={handleSubmit} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none"
              />
              <input
                type="text"
                placeholder="Role (e.g. Cashier)"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none"
              />
              <button type="submit" className="sm:col-span-2 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer">
                Save Member
              </button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] md:text-[15px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-6">Staff ID</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Role</th>
                  <th className="py-3 px-6">Contact</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {staff.map(s => (
                  <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-blue-600">{s.id}</td>
                    <td className="py-4 px-6 font-bold text-gray-900">{s.name}</td>
                    <td className="py-4 px-6 text-gray-500 font-semibold">{s.role}</td>
                    <td className="py-4 px-6 text-gray-500">
                      <p className="font-mono">{s.phone}</p>
                      <p className="text-[11px] text-gray-400">{s.email}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-200">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Sessions History (1 col) */}
        <div className="lg:col-span-1 bg-white border border-gray-155 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Shift Login History</h3>
          <div className="space-y-4 text-xs font-medium">
            {loginLogs.map(log => (
              <div key={log.id} className="p-3 border border-gray-150 rounded-xl bg-gray-50/50 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">{log.staffName}</span>
                  <span className="text-[10px] font-mono text-gray-400">{log.loginTime}</span>
                </div>
                <p className="text-[10px] text-gray-500 font-mono">IP: {log.ipAddress} • {log.device}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 5. HOURS TAB ───────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function HoursTab({ category }: WidgetTabProps) {
  const { profile, updateProfile } = useWorkspaceStore();
  const [hours, setHours] = useState({ ...profile.businessHours });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ businessHours: hours });
    setIsEditing(false);
    alert("Hours updated in state.");
  };

  return (
    <PageWrapper
      title="Business Operating Hours"
      description="Configure weekly operating hours schedules pushed to WhatsApp customer cards"
      category={category}
    >
      <div className="bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 md:p-8 max-w-xl space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight">Weekly Schedule</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors"
          >
            {isEditing ? "Cancel" : "Edit Hours"}
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {Object.keys(hours).map(day => {
            return (
              <div key={day} className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700 uppercase tracking-wider w-24">{day}</span>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={hours[day as keyof typeof hours]}
                  onChange={(e) => {
                    const nextHours = { ...hours };
                    (nextHours as unknown as Record<string, string>)[day] = e.target.value;
                    setHours(nextHours);
                  }}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50 disabled:text-gray-500 w-48 text-right font-mono"
                />
              </div>
            );
          })}
          {isEditing && (
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Save Schedule
            </button>
          )}
        </form>
      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── HARDWARE TAB (NEW) ─────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
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
    addPrinter({ name, type, ipAddress, paperWidth });
    setName("");
    setIpAddress("");
    setIsOpen(false);
    alert("Printer configuration registered.");
  };

  const handleTestPrint = (pName: string) => {
    alert(`Test print job submitted to: ${pName}. Thermal print test complete.`);
  };

  return (
    <PageWrapper
      title="Hardware & Printing Configuration"
      description="Register local thermal printer devices, view device status details, and run diagnostic prints"
      category={category}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Device Settings Panel (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight font-sans">Connected Devices</h3>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs font-bold bg-blue-600 text-white px-3.5 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus size={14} />
              <span>Link Printer</span>
            </button>
          </div>

          {isOpen && (
            <form onSubmit={handleSubmit} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Printer Nickname (e.g. Receipt Main)"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none"
              />
              <input
                type="text"
                placeholder="IP Address (e.g. 192.168.1.180)"
                required
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none font-mono"
              />
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Printer Type</span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as PrinterDevice["type"])}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="Receipt">Billing Receipt Printer</option>
                  <option value="Kitchen">Kitchen Order Ticket (KOT)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Paper Width Size</span>
                <select
                  value={paperWidth}
                  onChange={(e) => setPaperWidth(e.target.value as PrinterDevice["paperWidth"])}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="80mm">80 mm Standard</option>
                  <option value="58mm">58 mm Compact</option>
                </select>
              </div>
              <button type="submit" className="sm:col-span-2 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer">
                Save Device Configuration
              </button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-6">Device ID</th>
                  <th className="py-3 px-6">Nickname</th>
                  <th className="py-3 px-6">IP Endpoint</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Test Print</th>
                </tr>
              </thead>
              <tbody>
                {printers.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4.5 px-6 font-mono font-bold text-blue-600">{p.id}</td>
                    <td className="py-4.5 px-6">
                      <p className="font-bold text-gray-900">{p.name}</p>
                      <p className="text-[10px] text-gray-400 font-semibold">{p.type} • {p.paperWidth}</p>
                    </td>
                    <td className="py-4.5 px-6 font-mono text-gray-500">{p.ipAddress}</td>
                    <td className="py-4.5 px-6">
                      <button
                        onClick={() => togglePrinter(p.id)}
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer",
                          p.status === "Online" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                        )}
                      >
                        {p.status}
                      </button>
                    </td>
                    <td className="py-4.5 px-6">
                      <button
                        onClick={() => handleTestPrint(p.name)}
                        className="p-1 px-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-[10px] font-bold text-gray-700 cursor-pointer"
                      >
                        Test print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hardware Diagnostics logs (1 col) */}
        <div className="lg:col-span-1 bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Hardware Diagnostics Log</h3>
          <div className="space-y-3.5 text-xs text-gray-600 font-medium">
            <div className="flex gap-2">
              <span className="text-[10px] font-mono text-gray-400">14:12</span>
              <p className="text-gray-900"><span className="font-bold">Receipt Printer</span> - Dispatched print invoice INV-90812 success (latency 12ms).</p>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] font-mono text-gray-400">12:30</span>
              <p className="text-gray-900"><span className="font-bold">Kitchen printer</span> - IP ping handshake OK (latency 24ms).</p>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] font-mono text-gray-400">Yesterday</span>
              <p className="text-amber-600 font-semibold">Automatic printer cutter calibration completed.</p>
            </div>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 6. ORDERS TAB ──────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function OrdersTab({ category }: WidgetTabProps) {
  const { orders, updateOrderStatus } = useWorkspaceStore();
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchVal, setSearchVal] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const categoryOrders = orders[category] || [];

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table & Filters (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-155 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-5 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Search orders by name or ID..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 font-bold">
              {["All", "Paid", "Completed", "Preparing", "Scheduled"].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={cn(
                    "px-3.5 py-2 text-xs rounded-xl border transition-all cursor-pointer shrink-0",
                    filterStatus === st
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px] md:text-[15px] border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-6">Order ID</th>
                    <th className="py-3.5 px-6">Customer</th>
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6">Total</th>
                    <th className="py-3.5 px-6">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(o => (
                    <tr
                      key={o.id}
                      onClick={() => setSelectedOrderId(o.id)}
                      className={cn(
                        "border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer",
                        selectedOrderId === o.id ? "bg-blue-50/25" : ""
                      )}
                    >
                      <td className="py-4.5 px-6 font-mono font-bold text-blue-600">{o.id}</td>
                      <td className="py-4.5 px-6 font-bold text-gray-900">{o.customer}</td>
                      <td className="py-4.5 px-6 text-gray-500">{o.date}</td>
                      <td className="py-4.5 px-6 font-black text-gray-900">₹{o.total}</td>
                      <td className="py-4.5 px-6">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          ["Paid", "Completed"].includes(o.status) ? "bg-green-50 text-green-700 border border-green-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                        )}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white text-[13px] font-medium text-gray-500">
              <span>Showing {filtered.length} of {categoryOrders.length} entries</span>
              <div className="flex gap-2">
                <button className="px-3.5 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold transition-all disabled:opacity-40" disabled>Previous</button>
                <button className="px-3.5 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold transition-all disabled:opacity-40" disabled>Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Details Panel (1 col) */}
        <div className="lg:col-span-1">
          {selectedOrder ? (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order diagnostic details</p>
                <h4 className="text-base font-black text-gray-900 pt-1 font-mono">{selectedOrder.id}</h4>
              </div>

              {/* Timeline Stepper */}
              <div className="space-y-4 pl-2 text-xs font-medium">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pipeline Stepper</p>
                <div className="relative border-l-2 border-blue-100 pl-4 space-y-4">
                  <div className="relative">
                    <span className="absolute left-[-21px] top-[1.5px] h-3 w-3 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100" />
                    <span className="font-bold text-gray-900">Received (Paid)</span>
                  </div>
                  <div className="relative">
                    <span className={cn(
                      "absolute left-[-21px] top-[1.5px] h-3 w-3 rounded-full border-2 border-white ring-2",
                      ["Completed", "Preparing", "Shipped"].includes(selectedOrder.status) ? "bg-blue-600 ring-blue-100" : "bg-gray-200 ring-gray-100"
                    )} />
                    <span className={cn("font-bold", ["Completed", "Preparing", "Shipped"].includes(selectedOrder.status) ? "text-gray-900" : "text-gray-400")}>In Preparation</span>
                  </div>
                  <div className="relative">
                    <span className={cn(
                      "absolute left-[-21px] top-[1.5px] h-3 w-3 rounded-full border-2 border-white ring-2",
                      selectedOrder.status === "Completed" ? "bg-green-600 ring-green-100" : "bg-gray-200 ring-gray-100"
                    )} />
                    <span className={cn("font-bold", selectedOrder.status === "Completed" ? "text-gray-900" : "text-gray-400")}>Completed & Dispatched</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 text-xs border-t border-gray-100 pt-5">
                <div className="flex justify-between"><span className="text-gray-500">Buyer:</span><span className="font-bold text-gray-900">{selectedOrder.customer}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Contact:</span><span className="font-bold text-gray-900 font-mono">{selectedOrder.phone}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Invoice total:</span><span className="font-black text-gray-900">₹{selectedOrder.total}</span></div>
              </div>

              {/* Pipeline Actions */}
              <div className="pt-6 border-t border-gray-100 space-y-2.5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Update Pipeline Status</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      updateOrderStatus(category, selectedOrder.id, "Completed");
                      alert("Marked Completed");
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-green-600 text-white font-bold text-xs hover:bg-green-700 cursor-pointer text-center shadow-md shadow-green-500/10"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => {
                      updateOrderStatus(category, selectedOrder.id, "Cancelled");
                      alert("Marked Cancelled");
                    }}
                    className="py-2.5 px-3 rounded-xl border border-red-200 text-red-650 hover:bg-red-50 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400 h-64 flex flex-col justify-center items-center">
              <Inbox size={28} className="text-gray-300 mb-2" />
              <p className="text-xs">Select an order row to view transaction timeline diagnostics.</p>
            </div>
          )}
        </div>

      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 7. PRODUCTS TAB ────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function ProductsTab({ category, config }: WidgetTabProps) {
  const { products, addItem, deleteItem, combos } = useWorkspaceStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [secondary, setSecondary] = useState("");
  const [stock, setStock] = useState("");

  const categoryProducts = products[category] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    addItem(category, {
      name,
      price: Number(price),
      secondary: secondary || "General",
      status: "Available",
      stock: stock ? Number(stock) : undefined
    });
    setName("");
    setPrice("");
    setSecondary("");
    setStock("");
    setIsOpen(false);
    alert("Item added.");
  };

  return (
    <PageWrapper
      title={`${config.catalogLabel} Catalog`}
      description={`Maintain active menu products, variant configurations, combo products, and stock levels`}
      category={category}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Product List & Variants (2 cols) */}
        <div className="lg:col-span-2 space-y-8 bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight font-sans">Active catalog items</h3>
            <div className="flex gap-2 font-bold">
              <button onClick={() => alert("Importing product CSV file...")} className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-xs rounded-lg transition-colors cursor-pointer">Import CSV</button>
              <button onClick={() => alert("Exporting product CSV sheet...")} className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-xs rounded-lg transition-colors cursor-pointer">Export CSV</button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-xs bg-blue-600 text-white px-3.5 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          {isOpen && (
            <form onSubmit={handleSubmit} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 grid grid-cols-1 sm:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Item Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price (₹)"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none"
              />
              <input
                type="text"
                placeholder="Category Segment"
                value={secondary}
                onChange={(e) => setSecondary(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none"
              />
              <input
                type="number"
                placeholder="Stock Count"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none"
              />
              <button type="submit" className="sm:col-span-4 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer">
                Save Item
              </button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-6">ID</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Variant / Addon</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6">Availability</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoryProducts.map(p => {
                  const stockVal = p.stock !== undefined ? p.stock : 14;
                  return (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-gray-400">{p.id}</td>
                      <td className="py-4 px-6 font-bold text-gray-900">{p.name}</td>
                      <td className="py-4 px-6 text-gray-500 text-xs">
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-mono font-bold uppercase tracking-wider text-[9px] mr-1">Standard</span>
                        <span className="text-[10px] text-gray-400">No Addon</span>
                      </td>
                      <td className="py-4 px-6 font-black text-gray-900">₹{p.price}</td>
                      <td className="py-4 px-6">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          stockVal < 5 ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"
                        )}>
                          {stockVal < 5 ? `Low (${stockVal})` : "In Stock"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => { deleteItem(category, p.id); alert("Deleted."); }}
                          className="p-1 text-gray-400 hover:text-red-650 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Combos catalog (1 col) */}
        <div className="lg:col-span-1 bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] space-y-5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Combo Offers Catalog</h3>
          <div className="space-y-4">
            {combos.map(c => (
              <div key={c.id} className="p-4 border border-gray-150 rounded-2xl bg-gray-50/40 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">{c.name}</h4>
                  <span className="font-black text-xs text-gray-900">₹{c.price}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.items.map((i, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 border border-blue-100 text-[9px] font-bold text-blue-600 leading-none">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => alert("Submit new combo item layout config.")}
              className="w-full py-2.5 rounded-xl border border-dashed border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus size={14} />
              <span>Create Combo Offer</span>
            </button>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 8. CATEGORIES TAB ──────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function CategoriesTab({ category }: WidgetTabProps) {
  const [list] = useState([
    { name: "Starter Appetizers", count: 8, status: "Active" },
    { name: "Executive Main Courses", count: 14, status: "Active" },
    { name: "Artisan Dessert Trays", count: 6, status: "Active" },
  ]);

  return (
    <PageWrapper
      title="Catalog Categories"
      description="Create logical categories for catalog navigation structures in WhatsApp menus"
      category={category}
    >
      <div className="bg-white border border-gray-155 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 space-y-6">
        <h3 className="text-[20px] font-semibold text-gray-900 border-b border-gray-100 pb-4">Menu Groups</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {list.map((c, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-gray-100 bg-white space-y-2 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category Segment</span>
              <h4 className="text-[16px] font-bold text-gray-900">{c.name}</h4>
              <p className="text-xs text-blue-600 font-bold">{c.count} items configured</p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 9. INVENTORY TAB ───────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function InventoryTab({ category }: WidgetTabProps) {
  const { products } = useWorkspaceStore();
  const list = products[category] || [];

  return (
    <PageWrapper
      title="Inventory Ledger"
      description="Monitor physical stock counts, trigger quick restocking orders, and track SKU alerts"
      category={category}
    >
      <div className="bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight">SKU Ledger</h3>
          <button
            onClick={() => alert("Low stock replenishment queued in system logs.")}
            className="text-xs font-bold bg-blue-600 text-white px-3.5 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus size={14} />
            <span>Restock All Low SKUs</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-6">SKU ID</th>
                <th className="py-3 px-6">Item Name</th>
                <th className="py-3 px-6">Warehouse Stock</th>
                <th className="py-3 px-6">Ledger alert</th>
              </tr>
            </thead>
            <tbody>
              {list.map(p => {
                const stockVal = p.stock !== undefined ? p.stock : 24;
                const isAlert = stockVal < 5;
                return (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-gray-400">{p.id}</td>
                    <td className="py-4 px-6 font-bold text-gray-900">{p.name}</td>
                    <td className="py-4 px-6 font-mono font-bold text-gray-900">{stockVal} units</td>
                    <td className="py-4 px-6">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        isAlert ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"
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

/* ────────────────────────────────────────────────────────── */
/* ─── 10. CUSTOMERS TAB ──────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function CustomersTab({ category, config }: WidgetTabProps) {
  const { customers } = useWorkspaceStore();
  const [selectedCustId, setSelectedCustId] = useState<string | null>(null);

  const list = customers[category] || [];
  const selectedCustomer = list.find(c => c.id === selectedCustId);

  return (
    <PageWrapper
      title={`${config.customersLabel} Directory`}
      description={`Review patient diagnostics history, VIP labels, and lifetime value segments`}
      category={category}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CRM Customers list (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-white">
            <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight">CRM Client Directory</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-6">Client ID</th>
                  <th className="py-3 px-6">Full Name</th>
                  <th className="py-3 px-6">WhatsApp Address</th>
                  <th className="py-3 px-6">LTV spend</th>
                  <th className="py-3 px-6">Tags</th>
                </tr>
              </thead>
              <tbody>
                {list.map(c => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCustId(c.id)}
                    className={cn(
                      "border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer",
                      selectedCustId === c.id ? "bg-blue-50/25" : ""
                    )}
                  >
                    <td className="py-4 px-6 font-mono font-bold text-gray-400">{c.id}</td>
                    <td className="py-4 px-6 font-bold text-gray-900">{c.name}</td>
                    <td className="py-4 px-6 text-gray-500 font-mono">{c.phone}</td>
                    <td className="py-4 px-6 font-black text-gray-900">₹{c.totalSpend}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {c.tags.map((t, idx) => (
                          <span key={idx} className="px-2.5 py-0.5 rounded bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-600">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Detail Sheet (1 col) */}
        <div className="lg:col-span-1">
          {selectedCustomer ? (
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] space-y-6">
              <div className="border-b border-gray-100 pb-4 text-center">
                <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full border border-blue-200 mx-auto flex items-center justify-center text-xl font-extrabold shadow-sm">
                  {selectedCustomer.name[0]}
                </div>
                <h4 className="text-base font-black text-gray-900 pt-3">{selectedCustomer.name}</h4>
                <span className="font-mono text-xs text-gray-400">{selectedCustomer.phone}</span>
              </div>

              {/* Purchase History */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between"><span className="text-gray-500 font-medium">Lifetime value:</span><span className="font-black text-gray-900">₹{selectedCustomer.totalSpend}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 font-medium">Orders Count:</span><span className="font-bold text-gray-900">{selectedCustomer.ordersCount} checkouts</span></div>
                <div className="flex justify-between"><span className="text-gray-500 font-medium">Account status:</span><span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded font-bold uppercase text-[9px]">Verified</span></div>
              </div>

              {/* WhatsApp Message Log preview */}
              <div className="border-t border-gray-100 pt-5 space-y-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">WhatsApp Message Log</p>
                <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 text-xs text-gray-600">
                  <p className="font-bold text-gray-905">System Notification:</p>
                  <p className="italic leading-normal">&quot;Invoice INV-90812 delivered successfully. Customer read receipt verified.&quot;</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400 h-64 flex flex-col justify-center items-center">
              <Users size={28} className="text-gray-300 mb-2" />
              <p className="text-xs">Select a customer row to view LTV, purchase segments, and notes.</p>
            </div>
          )}
        </div>

      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 11. COUPONS TAB ────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
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
    alert("Coupon added.");
  };

  return (
    <PageWrapper
      title="Coupons & Discount Codes"
      description="Configure WhatsApp broad discount campaigns and checkout coupon codes"
      category={category}
    >
      <div className="bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight font-sans">Discount Rules</h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs font-bold bg-blue-600 text-white px-3.5 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus size={14} />
            <span>Create Coupon</span>
          </button>
        </div>

        {isOpen && (
          <form onSubmit={handleSubmit} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Promo Code (e.g. FLAT20)"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none"
            />
            <input
              type="text"
              placeholder="Discount (e.g. 20% OFF)"
              required
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none"
            />
            <input
              type="text"
              placeholder="Expiry Date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none"
            />
            <button type="submit" className="sm:col-span-3 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer">
              Save Promo Coupon
            </button>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-6">Coupon Code</th>
                <th className="py-3 px-6">Discount Rate</th>
                <th className="py-3 px-6">Expiry</th>
                <th className="py-3 px-6">Uses Count</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(c => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-blue-600">{c.code}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">{c.discount}</td>
                  <td className="py-4 px-6 text-gray-500">{c.expiry}</td>
                  <td className="py-4 px-6 text-gray-500 font-semibold">{c.usage} times</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-200">
                      {c.status}
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

/* ────────────────────────────────────────────────────────── */
/* ─── 12. CAMPAIGNS TAB ──────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function CampaignsTab({ category }: WidgetTabProps) {
  const [templates] = useState([
    { name: "Monsoon Clearance Blast", template: "monsoon_clearance_50", channel: "WhatsApp API", cost: "₹0.82 / delivery" },
    { name: "Festival Season Warmup", template: "diwali_festival_greet", channel: "WhatsApp API", cost: "₹0.82 / delivery" },
  ]);

  return (
    <PageWrapper
      title="Marketing Campaigns"
      description="Create bulk notification templates and schedule Meta Cloud api campaigns"
      category={category}
    >
      <div className="bg-white border border-gray-155 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 space-y-6">
        <h3 className="text-[20px] font-semibold text-gray-900 border-b border-gray-100 pb-4">Templates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {templates.map((t, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-gray-100 bg-white space-y-4 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider">{t.channel}</span>
              <h4 className="text-[16px] font-bold text-gray-900 pt-1 leading-tight">{t.name}</h4>
              <p className="text-xs text-gray-500">Meta Template ID: <span className="font-mono text-gray-700 font-semibold">{t.template}</span></p>
              <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                <span className="text-gray-400 font-medium">{t.cost}</span>
                <button onClick={() => alert("Monsoon campaign queued.")} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">Queue Blast &rarr;</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 13. BROADCASTS TAB ─────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function BroadcastsTab({ category }: WidgetTabProps) {
  const { campaigns } = useWorkspaceStore();
  const list = campaigns[category] || [];

  return (
    <PageWrapper
      title="Broadcast Delivery Logs"
      description="Inspect delivery logs, delivery telemetry, and click-through rates from Meta API streams"
      category={category}
    >
      <div className="bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 space-y-6">
        <h3 className="text-[20px] font-semibold text-gray-900 border-b border-gray-100 pb-4">Broadcast Archives</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-6">Campaign Name</th>
                <th className="py-3 px-6">Template ID</th>
                <th className="py-3 px-6">Volume Sent</th>
                <th className="py-3 px-6">Open Rate</th>
                <th className="py-3 px-6">Dispatched Date</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-900">{c.name}</td>
                  <td className="py-4 px-6 font-mono text-gray-500">{c.template}</td>
                  <td className="py-4 px-6 text-gray-900 font-semibold">{c.sent.toLocaleString()} list</td>
                  <td className="py-4 px-6 font-bold text-green-600">{c.readRate}% Read</td>
                  <td className="py-4 px-6 text-gray-500">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 14. CHATS TAB (INBOX) ──────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
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
      <div className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] grid grid-cols-1 lg:grid-cols-3 h-[520px]">
        
        {/* Left Side: Threads List */}
        <div className="border-r border-gray-150 flex flex-col h-full bg-gray-50/15">
          <div className="p-5 border-b border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Recent Threads</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search inbox..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
            {activeChats.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveChatId(c.id)}
                className={cn(
                  "w-full flex items-start gap-3.5 p-3.5 rounded-2xl transition-all duration-205 text-left border border-transparent",
                  activeChatId === c.id ? "bg-blue-50/50 border-blue-100 shadow-[0_2px_6px_rgba(37,99,235,0.04)]" : "hover:bg-gray-50/50"
                )}
              >
                <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-150 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-bold text-gray-900 truncate">{c.name}</span>
                    <span className="text-[10px] text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5 leading-normal">{c.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center/Right: Thread Panel */}
        <div className="lg:col-span-2 flex flex-col h-full bg-white">
          {activeChat ? (
            <>
              <div className="p-5 border-b border-gray-100 bg-gray-50/20 flex justify-between items-center">
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 leading-tight">{activeChat.name}</h4>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">{activeChat.phone}</p>
                </div>
                <span className="text-[10px] font-bold bg-green-50 text-green-700 border border-green-150 px-2.5 py-0.5 rounded-full">WhatsApp Active</span>
              </div>

              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-gray-50/10">
                {activeChat.messages.map((m, idx) => {
                  const isMerchant = m.sender === "merchant" || m.sender === "bot";
                  return (
                    <div key={idx} className={cn("flex flex-col max-w-[75%]", isMerchant ? "ml-auto items-end" : "mr-auto items-start")}>
                      <div className={cn(
                        "rounded-2xl px-4 py-2.5 text-xs text-left shadow-sm border",
                        m.sender === "merchant"
                          ? "bg-blue-600 text-white border-blue-600 rounded-tr-none"
                          : m.sender === "bot"
                          ? "bg-blue-50 text-blue-800 border-blue-100 rounded-tr-none"
                          : "bg-white text-gray-800 border-gray-200 rounded-tl-none"
                      )}>
                        {m.text}
                      </div>
                      <span className="text-[9px] text-gray-400 mt-1 px-1 font-semibold">{m.time}</span>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white flex gap-2">
                <input
                  type="text"
                  placeholder="Type WhatsApp reply message..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-1 bg-white border border-gray-250 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                />
                <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors cursor-pointer">
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-400 p-8 text-center bg-gray-50/5">
              <MessageSquare size={32} className="opacity-20 mb-2" />
              <p className="text-xs">Select a client conversation thread from the sidebar.</p>
            </div>
          )}
        </div>

      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 15. REVIEWS TAB ────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function ReviewsTab({ category }: WidgetTabProps) {
  const { reviews } = useWorkspaceStore();

  return (
    <PageWrapper
      title="Customer Reviews"
      description="Inspect client ratings, comments, and dispatch feedback links"
      category={category}
    >
      <div className="bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 space-y-6">
        <h3 className="text-[20px] font-semibold text-gray-900 border-b border-gray-100 pb-4">Client Feedback</h3>
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r.id} className="p-5 rounded-2xl border border-gray-155 space-y-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-gray-900">{r.customer}</h4>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{r.date}</p>
                </div>
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed">&quot;{r.comment}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 16. REVENUE TAB ────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function RevenueTab({ category }: WidgetTabProps) {
  return (
    <PageWrapper
      title="Revenue Analytics"
      description="Monitor income transaction graphs and track gross margins"
      category={category}
    >
      <div className="bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight">Gross Sales Analytics</h3>
            <p className="text-[13px] text-gray-400 font-medium">Weekly revenue statistics</p>
          </div>
          <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-150 px-3 py-1 rounded-lg">₹29,997 cleared</span>
        </div>

        {/* SVG Spline Area Revenue Chart */}
        <div className="h-48 flex flex-col justify-end pt-4">
          <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="60" x2="500" y2="60" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
            <path d="M 0,100 C 50,70 100,50 150,90 C 200,40 250,80 300,30 C 350,70 400,20 450,55 C 475,30 500,40 L 500,100 L 0,100 Z" fill="url(#revGradient)" />
            <path d="M 0,100 C 50,70 100,50 150,90 C 200,40 250,80 300,30 C 350,70 400,20 450,55 C 475,30 500,40" fill="none" stroke="#2563EB" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="300" cy="30" r="5" fill="#2563EB" stroke="#ffffff" strokeWidth="2.5" className="drop-shadow cursor-pointer transition-all hover:scale-125" />
            <circle cx="400" cy="20" r="5" fill="#2563EB" stroke="#ffffff" strokeWidth="2.5" className="drop-shadow cursor-pointer transition-all hover:scale-125" />
          </svg>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 17. TRANSACTIONS TAB ───────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function TransactionsTab({ category }: WidgetTabProps) {
  const { transactions } = useWorkspaceStore();

  return (
    <PageWrapper
      title="Transactions Log"
      description="Inspect chronological logs of payments, settlements, and refund requests"
      category={category}
    >
      <div className="bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight">Settled Ledger</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-6">TXN ID</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-blue-600">{t.id}</td>
                  <td className="py-4 px-6 text-gray-650 font-semibold">{t.type}</td>
                  <td className="py-4 px-6 font-black text-gray-900">₹{t.amount.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-505">{t.date}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-200">
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

/* ────────────────────────────────────────────────────────── */
/* ─── 18. INVOICES TAB ───────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
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
      <div className="bg-white border border-gray-155 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight">Invoices List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-6">Invoice Number</th>
                <th className="py-3.5 px-6">Billed Client</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Download</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-blue-600">{inv.id}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">{inv.client}</td>
                  <td className="py-4 px-6 font-black text-gray-900">₹{inv.total}</td>
                  <td className="py-4 px-6 text-gray-500">{inv.date}</td>
                  <td className="py-4 px-6">
                    <button onClick={() => alert("Downloading PDF Invoice...")} className="p-1 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer">
                      <Download size={14} />
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

/* ────────────────────────────────────────────────────────── */
/* ─── 19. PAYOUTS TAB ────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function PayoutsTab({ category }: WidgetTabProps) {
  const { payouts } = useWorkspaceStore();

  const handleRequestPayout = () => {
    alert("Payout request submitted. Settlement will process in 24 business hours.");
  };

  return (
    <PageWrapper
      title="Payout Settlements"
      description="Inspect payment balance transfer dates and setup direct merchant bank linkages"
      category={category}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Request Payout Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] space-y-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-55 pb-2">Settlement Balance</h3>
            <div className="space-y-1">
              <h2 className="text-[34px] font-extrabold text-gray-900 tracking-tight leading-none">₹8,400</h2>
              <p className="text-[12px] text-gray-400">Unsettled Merchant Capital</p>
            </div>
            <button
              onClick={handleRequestPayout}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer mt-4"
            >
              Request Transfer to Bank
            </button>
          </div>
        </div>

        {/* Right: History */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight">Payout Archives</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px] border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-6">Transfer Reference</th>
                    <th className="py-3 px-6">Settled Bank Account</th>
                    <th className="py-3 px-6">Amount</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Transfer Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-blue-600">{p.id}</td>
                      <td className="py-4 px-6 text-gray-600">{p.bankAccount}</td>
                      <td className="py-4 px-6 font-black text-gray-900">₹{p.amount.toLocaleString()}</td>
                      <td className="py-4 px-6 text-gray-505">{p.date}</td>
                      <td className="py-4 px-6">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          p.status === "Transferred" ? "bg-green-50 text-green-700 border border-green-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                        )}>
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

/* ────────────────────────────────────────────────────────── */
/* ─── 20. AI ASSISTANT TAB ───────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function AiAssistantTab({ category }: WidgetTabProps) {
  const { products, orders, chats } = useWorkspaceStore();
  const [aiOutput, setAiOutput] = useState<string>("");
  const [chatQuery, setChatQuery] = useState("");
  const [chatLog, setChatLog] = useState<{ query: string; reply: string }[]>([]);

  const categoryProducts = products[category] || [];
  const categoryOrders = orders[category] || [];
  const categoryChats = chats[category] || [];

  const revenueValue = categoryOrders
    .filter((o) => ["Paid", "Completed", "Shipped", "Preparing", "Scheduled", "Enrolled", "Dispensed", "Verified"].includes(o.status))
    .reduce((sum, o) => sum + o.total, 0);

  const pendingChats = categoryChats.reduce((sum, c) => sum + c.unread, 0);
  const lowStock = categoryProducts.filter(p => (p.stock || 0) < 5).length;
  const outOfStock = categoryProducts.filter(p => p.stock === 0).length;

  const triggerAiAction = (actionType: string) => {
    switch (actionType) {
      case "campaign":
        setAiOutput(
          `[Generated Broadcaster Template]\n\n"Hi! 🌟 We notice you loved our catalog items. Unlock 15% off your next purchase using code WELCOME15 at checkout! Click details: chatzo.io/checkout/cp1"`
        );
        break;
      case "discount":
        setAiOutput(
          `[Suggested Discount Rule]\n\n"Code: AI-BOOST-10\nType: Percentage (10% OFF)\nCondition: Min cart value ₹2,000\nRecommended Audience: Returning Customers Segment"`
        );
        break;
      case "description":
        setAiOutput(
          `[Suggested Product Copy]\n\n"Crafted with organically certified raw materials, designed for style and durability. Elevate your daily routine with our signature item. Shop now."`
        );
        break;
      case "bundle":
        setAiOutput(
          `[Smart Bundle Recommendation]\n\n"Bundle: 'The Workspace Pack'\nContains: '${categoryProducts[0]?.name || "Item 1"}' + '${categoryProducts[1]?.name || "Item 2"}'\nBundle Price: ₹${Math.floor(((categoryProducts[0]?.price || 100) + (categoryProducts[1]?.price || 100)) * 0.85)} (Save 15%)"`
        );
        break;
      case "marketing":
        setAiOutput(
          `[Strategic Workspace Campaign Plan]\n\n"1. Segment: Inactive clients with LTV > ₹5,000\n2. Trigger Date: Saturday 10:00 AM\n3. Template: 'Re-engage custom discount'\n4. Estimated Conversion: 18.2%"`
        );
        break;
      default:
        setAiOutput("Select an advisor tool above to generate templates.");
    }
  };

  const handleChatSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;

    let response = "";
    const cleanQ = chatQuery.toLowerCase();

    if (cleanQ.includes("sales") || cleanQ.includes("revenue")) {
      response = `Today's gross sales volume is ₹${revenueValue.toLocaleString()} settled.`;
    } else if (cleanQ.includes("least") || cleanQ.includes("worst") || cleanQ.includes("lowest")) {
      response = `Our inventory dashboard indicates '${categoryProducts[categoryProducts.length - 1]?.name || "N/A"}' is the lowest selling item this week.`;
    } else if (cleanQ.includes("predict")) {
      response = `Based on historical logs, next week's sales forecast models indicate ₹${Math.floor(revenueValue * 1.15).toLocaleString()} volume (+15% growth).`;
    } else if (cleanQ.includes("restock") || cleanQ.includes("stock") || cleanQ.includes("inventory")) {
      response = `We have found ${lowStock} items running low, with ${outOfStock} SKUs out of stock. Suggested action: trigger bulk restock orders.`;
    } else if (cleanQ.includes("campaign") || cleanQ.includes("broadcast")) {
      response = `AI advises launching a weekend promo template targeted at returning VIP segments. Click 'Generate Campaign' to review.`;
    } else {
      response = `Search query logged. OpenAI integration endpoint is reserved.`;
    }

    setChatLog(prev => [...prev, { query: chatQuery, reply: response }]);
    setChatQuery("");
  };

  return (
    <PageWrapper
      title="AI Operations Workspace"
      description="Monitor sales models, check stock forecasts, and auto-generate WhatsApp marketing templates"
      category={category}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Intelligences Analytics (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main business summary + health */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Business Summary</h3>
              <h4 className="text-[20px] font-semibold text-gray-900 tracking-tight leading-tight">Operating Health Score: 94%</h4>
              <p className="text-xs text-gray-500 leading-relaxed pt-1">
                Your workspace is operating efficiently. Low-stock lines and inbox response delays represent the only minor optimization segments this morning.
              </p>
            </div>
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 flex flex-col justify-between items-center text-center">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Health Rating</span>
              <div className="flex items-baseline gap-1.5 pt-2">
                <span className="text-[34px] font-black text-blue-700 leading-none">94</span>
                <span className="text-xs text-blue-500 font-bold">/ 100</span>
              </div>
            </div>
          </div>

          {/* Intelligences Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Sales & Revenue */}
            <div className="bg-white border border-gray-150 rounded-2xl p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)]">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={16} className="text-green-600" /> Sales Trends
              </h4>
              <div className="space-y-2.5 text-xs pt-1">
                <div className="flex justify-between"><span className="text-gray-500">Revenue Insights:</span><span className="font-bold text-gray-900">₹{revenueValue.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-505">Today&apos;s Orders:</span><span className="font-bold text-gray-900">{categoryOrders.length} checkouts</span></div>
                <div className="flex justify-between"><span className="text-gray-505">Top Product:</span><span className="font-bold text-blue-600">{categoryProducts[0]?.name || "N/A"}</span></div>
                <div className="flex justify-between"><span className="text-gray-505">Least Product:</span><span className="font-bold text-red-500">{categoryProducts[categoryProducts.length - 1]?.name || "N/A"}</span></div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white border border-gray-150 rounded-2xl p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)]">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" /> Inventory Alerts
              </h4>
              <div className="space-y-2.5 text-xs pt-1">
                <div className="flex justify-between"><span className="text-gray-505">SKUs Low Stock:</span><span className="font-bold text-amber-600">{lowStock} lines</span></div>
                <div className="flex justify-between"><span className="text-gray-505">Out of Stock:</span><span className="font-bold text-red-500">{outOfStock} SKUs</span></div>
                <div className="flex justify-between"><span className="text-gray-505">Forecasting:</span><span className="font-bold text-gray-900">Restocks Required</span></div>
              </div>
            </div>

            {/* WhatsApp Inbox */}
            <div className="bg-white border border-gray-150 rounded-2xl p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)]">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <MessageSquare size={16} className="text-blue-600" /> WhatsApp Insights
              </h4>
              <div className="space-y-2.5 text-xs pt-1">
                <div className="flex justify-between"><span className="text-gray-505">Pending Messages:</span><span className="font-bold text-gray-900">{pendingChats} unread</span></div>
                <div className="flex justify-between"><span className="text-gray-505">Response Speed:</span><span className="font-bold text-green-600">48 seconds</span></div>
                <div className="flex justify-between"><span className="text-gray-505">Customer Behaviour:</span><span className="font-bold text-gray-900">High Active</span></div>
              </div>
            </div>

            {/* Campaigns */}
            <div className="bg-white border border-gray-150 rounded-2xl p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)]">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-purple-600" /> Marketing Suggestions
              </h4>
              <div className="space-y-2.5 text-xs pt-1">
                <div className="flex justify-between"><span className="text-gray-505">Suggested Campaign:</span><span className="font-bold text-gray-900">VIP Discount Link</span></div>
                <div className="flex justify-between"><span className="text-gray-555">Estimated Reach:</span><span className="font-bold text-purple-600">1,250 numbers</span></div>
              </div>
            </div>

          </div>

          {/* AI Generator Panel */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] space-y-4">
            <div>
              <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight flex items-center gap-2">
                <Sparkles size={16} className="text-blue-600 animate-pulse" /> Quick AI Actions
              </h3>
              <p className="text-xs text-gray-500">Select an action node to generate WhatsApp copies and discounts</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => triggerAiAction("campaign")}
                className="px-4 py-2.5 text-xs font-bold rounded-xl border border-gray-250 bg-white hover:bg-gray-50 text-gray-700 transition-all cursor-pointer shadow-sm"
              >
                Generate WhatsApp Campaign
              </button>
              <button
                onClick={() => triggerAiAction("discount")}
                className="px-4 py-2.5 text-xs font-bold rounded-xl border border-gray-250 bg-white hover:bg-gray-50 text-gray-700 transition-all cursor-pointer shadow-sm"
              >
                Generate Discount
              </button>
              <button
                onClick={() => triggerAiAction("description")}
                className="px-4 py-2.5 text-xs font-bold rounded-xl border border-gray-250 bg-white hover:bg-gray-50 text-gray-700 transition-all cursor-pointer shadow-sm"
              >
                Generate Product Description
              </button>
              <button
                onClick={() => triggerAiAction("bundle")}
                className="px-4 py-2.5 text-xs font-bold rounded-xl border border-gray-250 bg-white hover:bg-gray-50 text-gray-700 transition-all cursor-pointer shadow-sm"
              >
                Generate Product Bundle
              </button>
              <button
                onClick={() => triggerAiAction("marketing")}
                className="px-4 py-2.5 text-xs font-bold rounded-xl border border-gray-250 bg-white hover:bg-gray-50 text-gray-700 transition-all cursor-pointer shadow-sm"
              >
                Generate Marketing Plan
              </button>
            </div>

            {aiOutput && (
              <pre className="p-4 rounded-xl border border-blue-100 bg-blue-50/20 text-xs text-blue-900 font-mono leading-relaxed whitespace-pre-wrap">
                {aiOutput}
              </pre>
            )}
          </div>

        </div>

        {/* Right Side: Natural Language Chat Interface (1 col) */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-150 rounded-3xl h-[580px] shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] flex flex-col justify-between overflow-hidden">
            
            <div className="p-5 border-b border-gray-100 bg-gray-50/20 flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-gray-900">Natural Language Chat Area</h3>
                <p className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5">Powered by OpenAI API</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </div>

            {/* Chat Log Viewport */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-gray-50/5">
              <div className="text-center p-4 rounded-2xl border border-gray-150 bg-gray-50/50 text-[11px] text-gray-400 leading-normal">
                ⚠️ Reserve chat area for future OpenAI integration.
              </div>

              {chatLog.map((log, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex max-w-[80%] ml-auto justify-end">
                    <div className="rounded-2xl px-4 py-2.5 bg-blue-600 text-white text-xs text-left shadow-sm">
                      {log.query}
                    </div>
                  </div>
                  <div className="flex max-w-[80%] mr-auto justify-start">
                    <div className="rounded-2xl px-4 py-2.5 bg-white border border-gray-205 text-gray-800 text-xs text-left shadow-sm font-mono">
                      {log.reply}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleChatSearch} className="p-4 border-t border-gray-200 bg-white flex gap-2">
              <input
                type="text"
                placeholder="Ask sales values, inventory restocks..."
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                className="flex-1 bg-white border border-gray-205 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
              />
              <button type="submit" className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer">
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── 21. SETTINGS TAB ───────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */
export function SettingsTab({ category }: WidgetTabProps) {
  const { apiSyncStatus, profile } = useWorkspaceStore();

  return (
    <PageWrapper
      title="Platform & Settings"
      description="Configure Meta Cloud API credentials, payment links, and employee authorization roles"
      category={category}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* API Info */}
        <div className="bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 space-y-6">
          <h3 className="text-[20px] font-semibold text-gray-900 border-b border-gray-100 pb-4">WhatsApp Cloud API</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Webhook Sync:</span>
              <span className="font-mono text-gray-900 font-bold">chatzo.io/webhook/meta/{category}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">API Latency Status:</span>
              <span className="text-green-600 font-bold">48ms Delay (Connected)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Endpoint:</span>
              <span className="text-blue-600 font-bold font-mono">{apiSyncStatus}</span>
            </div>
          </div>
        </div>

        {/* Roles & Integrations */}
        <div className="bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 space-y-6">
          <h3 className="text-[20px] font-semibold text-gray-900 border-b border-gray-100 pb-4">Integrations & Security</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Payment Gateways:</span>
              <span className="font-bold text-gray-900">Razorpay (Active), Stripe</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">API Credentials Sync:</span>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 font-bold uppercase text-[9px]">Verified</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Active Session:</span>
              <span className="font-mono text-gray-500">{profile.timezone}</span>
            </div>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ─── REPORT AN ISSUE TAB (NEW) ──────────────────────────── */
/* ────────────────────────────────────────────────────────── */
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
    addTicket({ category: cat, priority, subject, description: desc });
    setSubject("");
    setDesc("");
    setIsOpen(false);
    alert("Support ticket logged successfully.");
  };

  return (
    <PageWrapper
      title="Report an Issue & Support Desk"
      description="Create platform support tickets, track diagnostics progress, and contact engineering teams"
      category={category}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Ticket List Panel (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight font-sans">Previous Support Tickets</h3>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs font-bold bg-blue-600 text-white px-3.5 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus size={14} />
              <span>Create Ticket</span>
            </button>
          </div>

          {isOpen && (
            <form onSubmit={handleSubmit} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Issue Category</span>
                  <select
                    value={cat}
                    onChange={(e) => setCat(e.target.value as SupportTicket["category"])}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="WhatsApp API">WhatsApp API</option>
                    <option value="Hardware">Hardware & Printing</option>
                    <option value="Billing">Settlements & Billing</option>
                    <option value="Software Bug">Software Bug</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Priority Rating</span>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as SupportTicket["priority"])}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <input
                type="text"
                placeholder="Brief Subject Summary"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
              />
              <textarea
                placeholder="Detailed description of issue diagnostics..."
                required
                rows={3}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none resize-none"
              />
              
              {/* Attachment Mock */}
              <div className="border border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-100/50 transition-colors">
                <Upload size={18} className="mx-auto text-gray-400 mb-1" />
                <span className="text-[10px] text-gray-505 font-bold block">Mock Attach Screenshots (Max 5MB)</span>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer">
                Submit Support Ticket
              </button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-6">Ticket ID</th>
                  <th className="py-3 px-6">Category</th>
                  <th className="py-3 px-6">Subject</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(t => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4.5 px-6 font-mono font-bold text-blue-600">{t.id}</td>
                    <td className="py-4.5 px-6 text-gray-500 font-semibold">{t.category}</td>
                    <td className="py-4.5 px-6 font-bold text-gray-900">
                      <p className="leading-tight">{t.subject}</p>
                      <p className="text-[10px] text-gray-400 font-medium font-sans truncate max-w-xs">{t.description}</p>
                    </td>
                    <td className="py-4.5 px-6 text-gray-550">{t.createdAt}</td>
                    <td className="py-4.5 px-6">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        t.status === "Open" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-green-50 text-green-700 border border-green-200"
                      )}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Support Service SLA Widget (1 col) */}
        <div className="lg:col-span-1 bg-white border border-gray-155 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_12px_24px_-4px_rgba(0,0,0,0.015)] space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Support SLA Metrics</h3>
          <div className="space-y-4 text-xs font-medium">
            <div className="flex justify-between items-center">
              <span className="text-gray-505 font-medium">Average response SLA:</span>
              <span className="font-bold text-gray-900">12 mins</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-555 font-medium">Average resolution latency:</span>
              <span className="font-bold text-gray-900">4.5 hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-505 font-medium">Engineering status:</span>
              <span className="text-green-600 font-bold">All Systems Operational</span>
            </div>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
