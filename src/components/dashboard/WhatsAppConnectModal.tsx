"use client";

import React, { useState } from "react";
import {
  X,
  Circle,
  ArrowRight,
  Smartphone,
  ShoppingCart,
  Bot,
  Package,
  Send,
  MessageSquare,
  RefreshCw,
  Store,
  Zap,
  ShieldCheck,
  Briefcase,
  Lock,
  AlertTriangle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FLOW_STEPS = [
  { id: 1, label: "Meta Business Login", icon: <ShieldCheck size={14} />, desc: "Secure OAuth identification & developer account binding." },
  { id: 2, label: "Business Manager", icon: <Briefcase size={14} />, desc: "Select Meta Business Suite organization profile." },
  { id: 3, label: "WhatsApp Business Account", icon: <MessageSquare size={14} />, desc: "Create or select your official business profile." },
  { id: 4, label: "Phone Number", icon: <Smartphone size={14} />, desc: "Register number with Meta Cloud API and complete OTP check." },
  { id: 5, label: "Cloud API", icon: <Zap size={14} />, desc: "Activate real-time message exchange credentials." },
  { id: 6, label: "Webhook", icon: <RefreshCw size={14} />, desc: "Receive incoming chats and order status triggers instantly." },
  { id: 7, label: "Catalog Sync", icon: <Package size={14} />, desc: "Publish storefront inventory items to Meta Commerce Catalog." },
  { id: 8, label: "Connected", icon: <Store size={14} />, desc: "WhatsApp Commerce successfully active and ready to process orders." },
];

const FEATURES = [
  { icon: <ShoppingCart size={16} />, label: "WhatsApp Commerce", desc: "Sell directly via chat" },
  { icon: <Package size={16} />, label: "Product Catalog", desc: "Meta catalog sync" },
  { icon: <Bot size={16} />, label: "AI Chatbot", desc: "24/7 automated replies" },
  { icon: <Store size={16} />, label: "Order Management", desc: "Real-time order tracking" },
  { icon: <Send size={16} />, label: "Broadcast Messaging", desc: "Bulk WhatsApp campaigns" },
  { icon: <MessageSquare size={16} />, label: "Customer Support", desc: "Live inbox management" },
];

export function WhatsAppConnectModal({ isOpen, onClose }: WhatsAppConnectModalProps) {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-100 flex flex-col z-10 animate-fade-in font-sans">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 px-8 py-5 rounded-t-3xl flex items-start justify-between z-10">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/25">
              <MessageSquare size={20} className="text-white fill-white/20" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">
                Connect WhatsApp Business
              </h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5 uppercase tracking-wider">
                Meta Developer Onboarding Flow
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-8 py-7 space-y-7 flex-1">
          
          {/* Awaiting Backend Integration Alert Box */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/30 border border-amber-200/70 p-5 flex items-start gap-4 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0 text-white animate-pulse">
              <AlertTriangle size={18} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-black text-amber-900 uppercase tracking-wide">Awaiting Backend Integration</p>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-[9px] font-bold text-amber-800 uppercase tracking-wider">
                  Pending Server Setup
                </span>
              </div>
              <p className="text-xs text-amber-800/80 font-medium leading-relaxed">
                The Meta Business Suite integration requires the backend server and webhooks to be fully deployed. Once backend configuration goes live, this wizard will initiate Meta&apos;s secure OAuth flow to link your Business Manager, register your phone number, bind event hooks, and sync product catalogs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Side: Onboarding Checklist */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Onboarding Steps
                </h3>
                <span className="text-[10px] text-slate-400 font-bold">Select step to view specs</span>
              </div>
              
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
                {FLOW_STEPS.map((step) => {
                  const isSelected = selectedStep === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setSelectedStep(isSelected ? null : step.id)}
                      className={cn(
                        "w-full flex items-start gap-3.5 p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer group",
                        isSelected
                          ? "bg-slate-50 border-slate-300 shadow-sm"
                          : "bg-white border-slate-100 hover:bg-slate-50/50 hover:border-slate-200"
                      )}
                    >
                      <div className="h-6 w-6 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center text-xs font-black text-slate-500 shrink-0 mt-0.5">
                        {step.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[13px] text-slate-800 group-hover:text-slate-950">
                            {step.label}
                          </span>
                          <span className="text-slate-400 group-hover:text-slate-600 shrink-0">
                            {step.icon}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Step Specs or General Checklist Details */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 flex-1 flex flex-col justify-between min-h-[220px]">
                {selectedStep ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
                      <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-100">
                        {selectedStep}
                      </div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                        {FLOW_STEPS[selectedStep - 1].label} Specifications
                      </h4>
                    </div>

                    <div className="space-y-3 text-[11px] font-semibold text-slate-600 leading-relaxed">
                      <p className="text-[12px] font-bold text-slate-900">
                        {FLOW_STEPS[selectedStep - 1].desc}
                      </p>
                      {selectedStep === 1 && (
                        <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-150">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Permissions Scope</span>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-500">
                            <li>manage_whatsapp_businesses</li>
                            <li>whatsapp_business_messaging</li>
                            <li>catalog_management</li>
                          </ul>
                        </div>
                      )}
                      {selectedStep === 2 && (
                        <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-150">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Manager Requirements</span>
                          <span className="text-slate-500 block">Verified Meta Business Manager profile in good standing under the developer app.</span>
                        </div>
                      )}
                      {selectedStep === 4 && (
                        <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-150">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Number Regulations</span>
                          <span className="text-slate-500 block">Must not be currently linked to a standard WhatsApp or WhatsApp Business mobile app.</span>
                        </div>
                      )}
                      {selectedStep === 6 && (
                        <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-150">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Webhooks Subscriptions</span>
                          <span className="text-slate-500 block">Configured to handle `messages`, `message_templates`, and `template_performance` events.</span>
                        </div>
                      )}
                      <p className="text-slate-400 font-medium italic mt-2.5">
                        * Ready for integration once the API endpoints are active.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 my-auto text-center py-6">
                    <div className="h-10 w-10 rounded-full bg-slate-200/70 flex items-center justify-center mx-auto text-slate-500">
                      <Info size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                        Technical Scope & Specs
                      </h4>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1.5 max-w-[200px] mx-auto leading-relaxed">
                        Click on any onboarding step to inspect developer scopes, webhook triggers, and Meta requirements.
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-3.5 border-t border-slate-200 text-[10px] text-slate-400 font-bold text-center uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Lock size={10} className="text-amber-500" />
                  Meta Sandbox Available
                </div>
              </div>
            </div>

          </div>

          {/* Commerce Features Unlock */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Integration Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {FEATURES.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/30 text-slate-700"
                >
                  <div className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0 bg-slate-100 text-slate-500">
                    {feat.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{feat.label}</p>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-8 py-5 rounded-b-3xl flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            Close Flow
          </button>

          <button
            disabled
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-400 border border-slate-200/60 font-bold text-xs cursor-not-allowed uppercase tracking-wider"
          >
            <Lock size={12} className="text-slate-400" />
            Available After Backend Deployment
          </button>
        </div>
      </div>
    </div>
  );
}
