"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api/client";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import {
  Mail,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  // OTP State
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  /* OTP Countdown Timer */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  /* Focus first OTP input on mount */
  useEffect(() => {
    setTimeout(() => {
      otpInputsRef.current[0]?.focus();
    }, 100);
  }, []);

  /* Resend OTP handler */
  const handleResendOtp = async () => {
    if (!canResend) return;
    setIsLoading(true);
    setLoadingText("Sending a new verification code...");

    try {
      const response = await api.post("/auth/resend-otp", {
        email,
        type: "EMAIL_VERIFICATION",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      setTimer(30);
      setCanResend(false);
      setOtp(Array(6).fill(""));
      setErrors({});
      otpInputsRef.current[0]?.focus();
      useWorkspaceStore.getState().showToast("A new verification code has been sent successfully!", "success");
    } catch (error) {
      console.error(error);
      const msg = error instanceof Error ? error.message : "Unable to resend OTP";
      useWorkspaceStore.getState().showToast(msg, "error");
    } finally {
      setIsLoading(false);
      setLoadingText("");
    }
  };

  /* OTP Input change handlers */
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setErrors((prev) => ({ ...prev, otp: "" }));

    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        otpInputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    setErrors((prev) => ({ ...prev, otp: "" }));

    const nextFocusIndex = Math.min(pastedData.length, 5);
    otpInputsRef.current[nextFocusIndex]?.focus();
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return;

    setIsLoading(true);
    setLoadingText("Verifying code...");

    try {
      const response = await api.post("/auth/verify-otp", {
        email,
        otp: code,
        type: "EMAIL_VERIFICATION",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      // Store tokens on success
      const tokenData = data.data || data;
      if (tokenData.accessToken) {
        localStorage.setItem("accessToken", tokenData.accessToken);
      }
      if (tokenData.refreshToken) {
        localStorage.setItem("refreshToken", tokenData.refreshToken);
      }

      setErrors({});
      window.location.href = "/dashboard";
    } catch (err) {
      setErrors({
        otp: err instanceof Error ? err.message : "Verification failed",
      });
    } finally {
      setIsLoading(false);
      setLoadingText("");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleVerifyOtpSubmit}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-black tracking-tight">
          Verify your Email
        </h2>
        <p className="text-xs text-muted-foreground">
          We sent a 6-digit verification code to
        </p>
        <p className="text-xs font-bold text-foreground">
          {email || "your email address"}
        </p>
      </div>

      {/* 6 OTP Boxes */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                otpInputsRef.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(idx, e)}
              onPaste={handleOtpPaste}
              className={cn(
                "w-11 h-13 sm:w-12 sm:h-14 text-center text-lg font-bold rounded-2xl border bg-background/50 backdrop-blur-md focus:outline-none transition-all duration-300",
                errors.otp
                  ? "border-red-500/80 focus:ring-2 focus:ring-red-500/20"
                  : digit
                  ? "border-[#25D366] bg-[#25D366]/5"
                  : "border-border focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/10"
              )}
            />
          ))}
        </div>

        {errors.otp && (
          <p className="text-[11px] text-red-400 font-medium pl-1 text-center">
            {errors.otp}
          </p>
        )}
      </div>

      {/* Resend Countdown */}
      <div className="text-center">
        {canResend ? (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:underline cursor-pointer disabled:opacity-50 border-0 bg-transparent"
          >
            <RefreshCw size={13} />
            <span>Resend Verification Code</span>
          </button>
        ) : (
          <p className="text-xs text-muted-foreground font-medium">
            Resend code in{" "}
            <span className="font-bold text-foreground font-mono">
              {timer}s
            </span>
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Link
          href="/signup"
          className="px-4 py-3.5 rounded-2xl border border-border hover:bg-secondary/60 text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <ArrowLeft size={16} />
          <span className="text-xs font-bold">Back</span>
        </Link>

        <button
          type="submit"
          disabled={otp.join("").length !== 6 || isLoading}
          className="flex-1 py-3.5 rounded-2xl font-bold text-black bg-[#25D366] hover:bg-[#22c35e] shadow-lg shadow-[#25D366]/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              <span>{loadingText}</span>
            </div>
          ) : (
            <>
              <span>Verify Email</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background text-foreground relative overflow-hidden">
      {/* ── Background Ambient Light Glows ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full blur-[140px] bg-[#25D366]/15 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full blur-[140px] bg-emerald-500/10 pointer-events-none" />

      {/* ─── LEFT: LIVE INTERACTIVE PREVIEW PANEL ─── */}
      <div className="w-full lg:w-[45%] p-8 lg:p-16 flex flex-col justify-between relative z-10 border-b lg:border-b-0 lg:border-r border-border/60 bg-gradient-to-b from-background/80 via-background/40 to-background/90 backdrop-blur-2xl">
        {/* Brand Bar */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#25D366] to-emerald-400 flex items-center justify-center shadow-lg shadow-[#25D366]/20">
            <span className="text-[#0a0a12] font-black text-lg">C</span>
          </div>
          <span className="text-xl font-black tracking-wider text-foreground">
            CHATZO
          </span>
        </div>

        {/* Live Dynamic Left Panel Content */}
        <div className="my-12 space-y-6 max-w-[420px]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>Identity Verification</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              One Step Closer to Your Workspace
            </h1>

            <div className="p-6 rounded-3xl border border-border/80 bg-secondary/40 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Secure Email Verification</h4>
                  <p className="text-[11px] text-muted-foreground">Domain level identity validation</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold">OTP Authentication</h4>
                  <p className="text-[11px] text-muted-foreground">Instant 2FA one-time passcode</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                  <Zap size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Workspace Ready</h4>
                  <p className="text-[11px] text-muted-foreground">Initialize your WhatsApp platform immediately after validation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-muted-foreground">
          Need help setting up? Contact{" "}
          <a
            href="mailto:support@chatzo.io"
            className="text-foreground font-semibold hover:underline"
          >
            support@chatzo.io
          </a>
        </div>
      </div>

      {/* ─── RIGHT: FORM WIDGET PANEL ─── */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 z-10">
        <div className="w-full max-w-[460px]">
          {/* Form Deck Frame */}
          <div className="p-8 rounded-[32px] border border-border/80 bg-background/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <Suspense fallback={<div className="text-xs text-muted-foreground text-center">Loading verification settings...</div>}>
              <VerifyEmailForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
