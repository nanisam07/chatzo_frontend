"use client";

import React, { useState, useEffect } from "react";
import {
  X,
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
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

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
  { icon: <ShoppingCart size={15} />, label: "WhatsApp Commerce", desc: "Sell directly via chat" },
  { icon: <Package size={15} />, label: "Product Catalog", desc: "Meta catalog sync" },
  { icon: <Bot size={15} />, label: "AI Chatbot", desc: "24/7 automated replies" },
  { icon: <Store size={15} />, label: "Order Management", desc: "Real-time order tracking" },
  { icon: <Send size={15} />, label: "Broadcast Messaging", desc: "Bulk WhatsApp campaigns" },
  { icon: <MessageSquare size={15} />, label: "Customer Support", desc: "Live inbox management" },
];

export function WhatsAppConnectModal({ isOpen, onClose }: WhatsAppConnectModalProps) {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const { whatsappStatusDetails, connectWhatsApp, disconnectWhatsApp } = useWorkspaceStore();

  useEffect(() => {
    // Read NEXT_PUBLIC_META_APP_ID strictly without fallbacks
    const appId = process.env.NEXT_PUBLIC_META_APP_ID;

    // Load Facebook SDK only if appId exists
    const win = window as unknown as {
      FB?: {
        init: (config: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
        login: (
          callback: (response: { authResponse?: { code?: string } }) => void,
          options: {
            config_id?: string;
            response_type: string;
            override_default_response_type: boolean;
            extras?: {
              setup: Record<string, unknown>;
              featureType: string;
              sessionInfoVersion: string;
            };
          }
        ) => void;
      };
      fbAsyncInit?: () => void;
    };

    if (typeof window !== "undefined" && !win.FB && isOpen) {
      if (!appId) {
        console.error("[Meta SDK] NEXT_PUBLIC_META_APP_ID is missing. FB.init() was prevented.");
        return;
      }

      console.log("[Meta SDK] Loading Facebook SDK script...");
      win.fbAsyncInit = function () {
        console.log("[Meta SDK] Initializing Facebook SDK v26.0");
        win.FB?.init({
          appId: appId,
          cookie: true,
          xfbml: false,
          version: "v26.0",
        });
      };

      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnectClick = () => {
    const appId = process.env.NEXT_PUBLIC_META_APP_ID;
    const configId = process.env.NEXT_PUBLIC_META_CONFIG_ID;

    if (!appId || !configId) {
      console.error("[Meta SDK] NEXT_PUBLIC_META_APP_ID or NEXT_PUBLIC_META_CONFIG_ID is missing.");
      alert("Configuration Error: Missing required Meta App ID or Configuration ID. Facebook SDK call aborted.");
      return;
    }

    const win = window as unknown as {
      FB?: {
        login: (
          callback: (response: { authResponse?: { code?: string } }) => void,
          options: {
            config_id?: string;
            response_type: string;
            override_default_response_type: boolean;
            extras?: {
              setup: Record<string, unknown>;
              version?: string;
              featureType?: string;
              sessionInfoVersion?: string;
            };
          }
        ) => void;
      };
    };

    if (typeof window !== "undefined" && win.FB) {
      console.log("[Meta SDK] Launching FB.login() for WhatsApp Business onboarding");
      console.log("Config ID:", configId);
      win.FB.login(
        function (response) {
          if (response.authResponse) {
            const code = response.authResponse.code;
            console.log("Authorization Code:", code?.substring(0, 20));
            if (code) {
              console.log("[Embedded Signup] FB.login() succeeded. Authorization code received.");
              connectWhatsApp(code).catch((err) => {
                console.error("[Embedded Signup] Connection failed inside dashboard store:", err);
              });
            } else {
              console.error("[Embedded Signup] Authorization code missing in FB.login response.");
            }
          } else {
            console.warn("[Embedded Signup] User cancelled login or did not fully authorize.");
          }
        },
        {
          config_id: configId,
          response_type: "code",
          override_default_response_type: true,
          extras: {
            setup: {},
            version: "v4",
          },
        }
      );
    } else {
      console.warn("[Meta SDK] Facebook SDK not loaded. Triggering Sandbox option.");
      const confirmMock = window.confirm(
        "Facebook SDK failed to load (possibly due to an ad-blocker). Do you want to connect using Sandbox Demo Mode?"
      );
      if (confirmMock) {
        console.log("[Embedded Signup] Sandbox Demo Mode selected.");
        connectWhatsApp("test_code").catch(() => {});
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-100 flex flex-col z-10 font-sans animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xs">
              <MessageSquare size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Connect WhatsApp Business
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Meta Developer Onboarding Flow
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {whatsappStatusDetails?.connected ? (
            <div className="space-y-6">
              {/* Connected Alert Box */}
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3.5 shadow-2xs">
                <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 text-white shadow-xs">
                  <ShieldCheck size={16} />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">Connected</p>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-200 text-[9px] font-bold text-emerald-800 uppercase">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 font-semibold leading-relaxed">
                    Your store is successfully connected to the official Meta WhatsApp Business Cloud API.
                  </p>
                </div>
              </div>

              {/* Status Details */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-2">
                  Cloud API Credentials & Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Business Name</span>
                    <span className="text-slate-800 font-bold text-[13px]">{whatsappStatusDetails.businessName || "OFFSHIFT Shop"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Phone Number</span>
                    <span className="text-slate-800 font-bold text-[13px]">{whatsappStatusDetails.displayPhoneNumber || "N/A"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">WhatsApp Status</span>
                    <span className="text-emerald-600 font-bold text-[13px]">Connected</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Webhook Status</span>
                    <span className="text-emerald-600 font-bold text-[13px]">{whatsappStatusDetails.webhookStatus || "Verified"}</span>
                  </div>
                  <div className="space-y-1 col-span-1 md:col-span-2">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Cloud API Status</span>
                    <span className="text-emerald-600 font-bold text-[13px]">{whatsappStatusDetails.cloudApiStatus || "Connected"}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Onboarding steps details */}
              <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-4 flex items-start gap-3.5 shadow-2xs">
                <div className="h-9 w-9 rounded-xl bg-amber-500 flex items-center justify-center shrink-0 text-white shadow-xs">
                  <AlertTriangle size={16} />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">Awaiting Backend Integration</p>
                    <span className="px-2 py-0.5 rounded-md bg-amber-100/80 border border-amber-200 text-[9px] font-bold text-amber-900 uppercase">
                      Pending Server Setup
                    </span>
                  </div>
                  <p className="text-xs text-amber-800/90 font-medium leading-relaxed">
                    The Meta Business Suite integration requires the backend server and webhooks to be fully deployed. Once backend configuration goes live, this wizard will initiate Meta&apos;s OAuth flow.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left Side: Onboarding Steps */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Onboarding Steps
                    </h3>
                    <span className="text-[10px] text-slate-400 font-semibold">Select step to view specs</span>
                  </div>
                  
                  <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                    {FLOW_STEPS.map((step) => {
                      const isSelected = selectedStep === step.id;
                      return (
                        <button
                          key={step.id}
                          onClick={() => setSelectedStep(isSelected ? null : step.id)}
                          className={cn(
                            "w-full flex items-start gap-3 p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer group",
                            isSelected
                              ? "bg-slate-50 border-slate-300 shadow-2xs"
                              : "bg-white border-slate-100 hover:bg-slate-50/60 hover:border-slate-200"
                          )}
                        >
                          <div className="h-5 w-5 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-600 shrink-0 mt-0.5">
                            {step.id}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-slate-800 group-hover:text-slate-900">
                                {step.label}
                              </span>
                              <span className="text-slate-400 group-hover:text-slate-600 shrink-0">
                                {step.icon}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                              {step.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Step Specs */}
                <div className="lg:col-span-5 flex flex-col">
                  <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4 flex-1 flex flex-col justify-between min-h-[200px]">
                    {selectedStep ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80">
                          <div className="h-6 w-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200/60">
                            {selectedStep}
                          </div>
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            {FLOW_STEPS[selectedStep - 1].label} Specs
                          </h4>
                        </div>

                        <div className="space-y-2 text-[11px] font-medium text-slate-600 leading-relaxed">
                          <p className="font-bold text-slate-900">
                            {FLOW_STEPS[selectedStep - 1].desc}
                          </p>
                          {selectedStep === 1 && (
                            <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200/60">
                              <span className="text-[9px] font-bold text-slate-400 uppercase block">Permissions Scope</span>
                              <ul className="list-disc pl-4 space-y-0.5 text-slate-500 text-[10px]">
                                <li>manage_whatsapp_businesses</li>
                                <li>whatsapp_business_messaging</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 my-auto text-center py-4">
                        <Info size={18} className="mx-auto text-slate-400" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Technical Specs
                          </h4>
                          <p className="text-[11px] text-slate-400 font-medium mt-1 max-w-[180px] mx-auto leading-relaxed">
                            Click on any step to inspect requirements.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 text-[10px] text-slate-400 font-bold text-center uppercase tracking-wider flex items-center justify-center gap-1">
                      <Lock size={10} className="text-amber-500" />
                      Meta Sandbox Available
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Commerce Features Unlock */}
          <div className="space-y-2 pt-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Integration Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {FEATURES.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200/60 bg-slate-50/30 text-slate-700"
                >
                  <div className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0 bg-slate-100 text-slate-600">
                    {feat.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{feat.label}</p>
                    <p className="text-[10px] font-medium text-slate-400">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-4 rounded-b-3xl flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close
          </button>

          {whatsappStatusDetails?.connected ? (
            <button
              onClick={() => disconnectWhatsApp()}
              className="h-9 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer transition-colors"
            >
              Disconnect WhatsApp
            </button>
          ) : (
            <button
              onClick={handleConnectClick}
              className="h-9 flex items-center gap-1.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer transition-colors"
            >
              Connect WhatsApp Business
            </button>
          )}
        </div>
      </div>
    </div>
  );
}