"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Circle,
  Loader2,
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
} from "lucide-react";
import { cn } from "@/lib/utils";

type ConnectionStatus = "idle" | "connecting" | "connected" | "error";

interface WhatsAppConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FLOW_STEPS = [
  { id: 1, label: "Meta Business Manager", icon: <ShieldCheck size={14} />, desc: "Authorize CHATZO" },
  { id: 2, label: "WhatsApp Business Platform", icon: <MessageSquare size={14} />, desc: "Platform access grant" },
  { id: 3, label: "Cloud API Connection", icon: <Zap size={14} />, desc: "API credentials sync" },
  { id: 4, label: "Webhook Verification", icon: <RefreshCw size={14} />, desc: "Event stream binding" },
  { id: 5, label: "Phone Number Registration", icon: <Smartphone size={14} />, desc: "Number verification" },
  { id: 6, label: "Catalog Synchronization", icon: <Package size={14} />, desc: "Product catalog sync" },
  { id: 7, label: "Commerce Enabled", icon: <Store size={14} />, desc: "Ready to sell" },
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
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const handleConnect = () => {
    setStatus("connecting");
    setActiveStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setActiveStep(step);
      if (step >= FLOW_STEPS.length) {
        clearInterval(interval);
        setStatus("connected");
      }
    }, 600);
  };

  const handleReset = () => {
    setStatus("idle");
    setActiveStep(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-8 py-5 rounded-t-3xl flex items-start justify-between z-10">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/25">
              <MessageSquare size={20} className="text-white fill-white/20" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 tracking-tight">
                Connect WhatsApp Business
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Powered by Meta WhatsApp Business Platform
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-8 py-7 space-y-8">
          {/* Status Banner */}
          {status === "idle" && (
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                <Circle size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Not Connected</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5 leading-relaxed">
                  Connect your WhatsApp Business account via Meta's secure OAuth flow to enable commerce features.
                </p>
              </div>
            </div>
          )}

          {status === "connecting" && (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                <Loader2 size={18} className="text-amber-500 animate-spin" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-800">Connecting to Meta…</p>
                <p className="text-xs text-amber-600 font-medium mt-0.5">
                  Authorizing your business account. Please wait.
                </p>
              </div>
            </div>
          )}

          {status === "connected" && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
                <CheckCircle2 size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-800">Connected Successfully! 🎉</p>
                <p className="text-xs text-emerald-600 font-medium mt-0.5">
                  WhatsApp Commerce is now active. You can start receiving orders via WhatsApp.
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="rounded-2xl bg-red-50 border border-red-200 p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center shadow-sm shrink-0">
                <X size={18} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-red-800">Connection Error</p>
                <p className="text-xs text-red-600 font-medium mt-0.5">
                  Could not connect to Meta Business Manager. Please try again.
                </p>
              </div>
            </div>
          )}

          {/* Connection Flow */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Connection Flow
            </h3>
            <div className="space-y-2">
              {FLOW_STEPS.map((step, idx) => {
                const isDone = status === "connecting" ? idx < activeStep : status === "connected";
                const isCurrent = status === "connecting" && idx === activeStep;

                return (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-center gap-3.5 p-3.5 rounded-xl border transition-all duration-300",
                      isDone
                        ? "bg-emerald-50/60 border-emerald-200 text-emerald-800"
                        : isCurrent
                        ? "bg-amber-50 border-amber-200 text-amber-800"
                        : "bg-gray-50/50 border-gray-100 text-gray-500"
                    )}
                  >
                    {/* Step number/icon */}
                    <div
                      className={cn(
                        "h-7 w-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-all",
                        isDone
                          ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                          : isCurrent
                          ? "bg-amber-400 text-white"
                          : "bg-gray-200 text-gray-500"
                      )}
                    >
                      {isDone ? (
                        <CheckCircle2 size={13} />
                      ) : isCurrent ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : (
                        step.id
                      )}
                    </div>

                    {/* Step info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn("font-bold text-sm", isDone ? "text-emerald-800" : isCurrent ? "text-amber-800" : "text-gray-600")}>
                          {step.label}
                        </span>
                        <span className={cn("shrink-0", isDone ? "text-emerald-500" : isCurrent ? "text-amber-500" : "text-gray-300")}>
                          {step.icon}
                        </span>
                      </div>
                      <p className={cn("text-xs font-medium mt-0.5", isDone ? "text-emerald-600" : isCurrent ? "text-amber-600" : "text-gray-400")}>
                        {step.desc}
                      </p>
                    </div>

                    {/* Arrow */}
                    {idx < FLOW_STEPS.length - 1 && (
                      <ArrowRight size={14} className={cn("shrink-0", isDone ? "text-emerald-400" : "text-gray-300")} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features */}
          {status !== "connecting" && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {status === "connected" ? "Active Features" : "What You Unlock"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FEATURES.map((feat, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border",
                      status === "connected"
                        ? "bg-emerald-50/40 border-emerald-100 text-emerald-700"
                        : "bg-gray-50/60 border-gray-100 text-gray-600"
                    )}
                  >
                    <div
                      className={cn(
                        "h-7 w-7 rounded-lg flex items-center justify-center shrink-0",
                        status === "connected" ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"
                      )}
                    >
                      {feat.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{feat.label}</p>
                      <p className="text-[11px] font-medium text-gray-400 mt-0.5">{feat.desc}</p>
                    </div>
                    {status === "connected" && (
                      <CheckCircle2 size={14} className="text-emerald-500 ml-auto shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer note */}
          <p className="text-[11px] text-gray-400 font-medium text-center leading-relaxed">
            CHATZO uses Meta's official WhatsApp Business Cloud API. Your data is processed securely and never shared with third parties.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-8 py-5 rounded-b-3xl flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
          >
            {status === "connected" ? "Done" : "Cancel"}
          </button>

          {status === "idle" && (
            <button
              onClick={handleConnect}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-95"
            >
              <MessageSquare size={15} />
              Connect via Meta OAuth
            </button>
          )}

          {status === "connecting" && (
            <button
              disabled
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-100 text-emerald-500 font-bold text-sm cursor-not-allowed"
            >
              <Loader2 size={15} className="animate-spin" />
              Connecting…
            </button>
          )}

          {status === "connected" && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
              >
                Reconnect
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all"
              >
                Go to Dashboard
                <ArrowRight size={15} />
              </button>
            </div>
          )}

          {status === "error" && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-all"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
