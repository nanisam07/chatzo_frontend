"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api/client";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  TrendingUp,
  Package,
  MessageSquare,
  Zap,
} from "lucide-react";

/* ─── Google SVG ──────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
      <path d="M0 0h11v11H0z" fill="#f25022" />
      <path d="M12 0h11v11H12z" fill="#7fba00" />
      <path d="M0 12h11v11H0z" fill="#00a4ef" />
      <path d="M12 12h11v11H12z" fill="#ffb900" />
    </svg>
  );
}

/* ─── Floating preview cards ─────────────────────────── */
function RevenueCard() {
  const bars = [40, 60, 45, 80, 55, 90, 70];
  return (
    <div
      className="absolute top-[14%] right-[6%] w-[210px] rounded-2xl p-4 border border-white/10 backdrop-blur-xl select-none"
      style={{
        background: "rgba(10,10,18,0.82)",
        animation: "authFloat1 6s ease-in-out infinite alternate",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp size={12} className="text-emerald-400" />
        <span className="text-[10px] text-white/50 uppercase tracking-wider">Revenue Today</span>
      </div>
      <div className="text-[22px] font-black text-white">₹1,24,382</div>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="text-[10px] font-bold text-emerald-400">↑ 24.8%</span>
        <span className="text-[10px] text-white/35">vs yesterday</span>
      </div>
      <div className="flex items-end gap-1 mt-3 h-8">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background: `linear-gradient(to top, rgba(37,211,102,0.8), rgba(37,211,102,0.15))`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function WhatsAppCard() {
  return (
    <div
      className="absolute left-[5%] top-[38%] w-[230px] rounded-2xl p-4 border border-white/10 backdrop-blur-xl select-none"
      style={{
        background: "rgba(10,10,18,0.82)",
        animation: "authFloat2 7.5s ease-in-out infinite alternate",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#25D366] to-emerald-400 flex items-center justify-center shrink-0">
          <span className="text-[10px] font-black text-black">S</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-bold text-white">Customer</div>
          <div className="text-[9px] text-white/40">Just now · WhatsApp</div>
        </div>
        <div className="w-2 h-2 rounded-full bg-[#25D366]" style={{ animation: "pulse 2s ease-in-out infinite" }} />
      </div>
      <div className="space-y-1.5">
        <div className="bg-white/8 rounded-xl rounded-tl-sm px-3 py-1.5 text-[10px] text-white/80 max-w-[82%]">
          I&apos;d like 2x Espresso ☕
        </div>
        <div className="bg-[#25D366]/20 rounded-xl rounded-tr-sm px-3 py-1.5 text-[10px] text-[#25D366] ml-auto max-w-[88%] text-right border border-[#25D366]/20">
          Order confirmed! 🎉
        </div>
      </div>
    </div>
  );
}

function OrderCard() {
  return (
    <div
      className="absolute bottom-[20%] right-[8%] w-[196px] rounded-2xl p-3.5 border border-white/10 backdrop-blur-xl select-none"
      style={{
        background: "rgba(10,10,18,0.82)",
        animation: "authFloat1 5s ease-in-out infinite alternate-reverse",
      }}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-[#25D366]/15 flex items-center justify-center shrink-0 border border-[#25D366]/20">
          <Package size={14} className="text-[#25D366]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold text-white/90 truncate">New Order #1,247</div>
          <div className="text-[13px] font-black text-[#25D366]">₹3,490</div>
        </div>
        <div className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" />
      </div>
    </div>
  );
}

function AIInsightCard() {
  return (
    <div
      className="absolute top-[62%] left-[8%] w-[200px] rounded-2xl p-3.5 border border-purple-500/20 backdrop-blur-xl select-none"
      style={{
        background: "rgba(10,10,18,0.82)",
        animation: "authFloat2 8s ease-in-out infinite alternate",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <Zap size={10} className="text-purple-400" />
        </div>
        <span className="text-[10px] font-bold text-purple-300">AI Insight</span>
      </div>
      <div className="text-[11px] text-white/70 leading-relaxed">
        Peak orders: <span className="text-white font-bold">7–9 PM</span>. Schedule your next flash sale now.
      </div>
    </div>
  );
}

/* ─── Styled input ────────────────────────────────────── */
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  rightEl?: React.ReactNode;
  autoComplete?: string;
}

function InputField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  rightEl,
  autoComplete,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:border-[#25D366]/60 focus:shadow-[0_0_0_3px_rgba(37,211,102,0.1)] focus:outline-none transition-all duration-300"
        />
        {rightEl && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightEl}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────── */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email || !password) { setErrorMsg("Please fill in all fields."); return; }
    if (!email.includes("@")) { setErrorMsg("Please enter a valid email address."); return; }
    setIsLoading(true);
    try {
      const response = await api.post("/api/v1/auth/login", { email, password });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials.");
      }
      if (data.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
        window.location.href = "/dashboard";
      } else {
        throw new Error("Authentication failed.");
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes authFloat1 {
          from { transform: translateY(0px) rotate(-0.8deg); }
          to   { transform: translateY(-16px) rotate(1deg); }
        }
        @keyframes authFloat2 {
          from { transform: translateY(-6px) rotate(0.5deg); }
          to   { transform: translateY(10px) rotate(-0.5deg); }
        }
        @keyframes authFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
      `}</style>

      {/* Break out of auth layout centering with fixed positioning */}
      <div className="fixed inset-0 z-50 flex overflow-hidden">

        {/* ═══════ LEFT PANEL — always dark, 55% ═══════ */}
        <div className="hidden lg:flex lg:w-[55%] relative flex-col overflow-hidden"
          style={{ background: "linear-gradient(135deg, #050508 0%, #080812 50%, #04040a 100%)" }}
        >
          {/* Aurora blobs */}
          <div
            className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-25"
            style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)", animation: "aurora-1 22s infinite alternate ease-in-out" }}
          />
          <div
            className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-20"
            style={{ background: "radial-gradient(circle, #25D366 0%, transparent 70%)", animation: "aurora-2 28s infinite alternate ease-in-out" }}
          />
          <div
            className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-10"
            style={{ background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)" }}
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)", backgroundSize: "4rem 4rem" }}
          />

          {/* Giant watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[22vw] font-black tracking-tighter text-white/[0.015] uppercase">CHATZO</span>
          </div>

          {/* Floating preview cards */}
          <RevenueCard />
          <WhatsAppCard />
          <OrderCard />
          <AIInsightCard />

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center px-12 relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10" style={{ animation: "authFadeUp 0.8s ease-out both" }}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#25D366] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-[#25D366]/20">
                <MessageSquare size={18} className="text-white" />
              </div>
              <span className="text-xl font-black tracking-[0.15em] text-white">CHATZO</span>
            </div>

            {/* Headline */}
            <div className="text-center max-w-[420px]" style={{ animation: "authFadeUp 0.8s 0.1s ease-out both" }}>
              <h1 className="text-[40px] font-black text-white leading-[1.08] tracking-tight">
                Transform Chats Into{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #25D366, #00D4FF)" }}
                >
                  Live Sales.
                </span>
              </h1>
              <p className="mt-4 text-white/50 text-base leading-relaxed">
                The complete WhatsApp commerce platform for modern businesses.
              </p>
            </div>

            {/* Trust indicators */}
            <div
              className="flex items-center gap-6 mt-12"
              style={{ animation: "authFadeUp 0.8s 0.25s ease-out both" }}
            >
              {[
                { value: "500+", label: "Businesses" },
                { value: "4.9★", label: "App Rating" },
                { value: "99.9%", label: "Uptime" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-base font-black text-white">{item.value}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom branding */}
          <div className="px-12 pb-8 relative z-10">
            <p className="text-[11px] text-white/25">
              © 2026 Chatzo. All rights reserved.
            </p>
          </div>
        </div>

        {/* ═══════ RIGHT PANEL — theme adaptive, 45% ═══════ */}
        <div className="flex-1 lg:w-[45%] flex flex-col items-center justify-center overflow-y-auto bg-background px-6 py-12">
          
          {/* Mobile logo (shown only on mobile where left panel is hidden) */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#25D366] to-[#7C3AED] flex items-center justify-center">
              <MessageSquare size={16} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-widest text-foreground">CHATZO</span>
          </div>

          {/* Auth card */}
          <div
            className="w-full max-w-[420px] rounded-[28px] border border-border p-8 md:p-10 space-y-6"
            style={{ background: "var(--glass-bg)", backdropFilter: "blur(24px)", boxShadow: "0 24px 64px 0 var(--glass-shadow)" }}
          >
            {/* Header */}
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-foreground tracking-tight">Welcome back</h2>
              <p className="text-sm text-muted-foreground">Sign in to your Chatzo workspace</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                id="email"
                label="Email Address"
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={setEmail}
                icon={<Mail size={15} />}
                autoComplete="email"
              />

              <InputField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={setPassword}
                icon={<Lock size={15} />}
                autoComplete="current-password"
                rightEl={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />

              {/* Remember + Forgot row */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div className={cn(
                    "w-4 h-4 rounded-md border flex items-center justify-center transition-all duration-200",
                    rememberMe
                      ? "bg-[#25D366]/20 border-[#25D366]"
                      : "border-border bg-secondary group-hover:border-[#25D366]/40"
                  )}>
                    {rememberMe && <span className="text-[8px] font-black text-[#25D366]">✓</span>}
                  </div>
                  <span className="text-xs text-muted-foreground select-none">Remember me</span>
                </button>
                <Link href="#" className="text-xs font-semibold text-[#7C3AED] hover:text-[#7C3AED]/80 transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Error */}
              {errorMsg && (
                <div className="text-xs font-semibold text-red-400 bg-red-400/8 border border-red-400/20 rounded-xl px-4 py-2.5 text-center">
                  {errorMsg}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-sm font-black text-black bg-[#25D366] hover:bg-[#20bd5a] hover:shadow-[0_0_28px_rgba(37,211,102,0.45)] shadow-[0_4px_16px_rgba(37,211,102,0.2)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 border-t border-border" />
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">or</span>
              <div className="flex-1 border-t border-border" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-xs font-semibold text-foreground transition-all duration-200 cursor-pointer hover:border-border/80">
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-xs font-semibold text-foreground transition-all duration-200 cursor-pointer hover:border-border/80">
                <MicrosoftIcon />
                <span>Microsoft</span>
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-bold text-[#25D366] hover:underline inline-flex items-center gap-0.5">
                Create Workspace <ArrowRight size={10} />
              </Link>
            </p>
          </div>

          <p className="mt-6 text-[10px] text-muted-foreground text-center">
            By signing in, you agree to Chatzo&apos;s{" "}
            <Link href="#" className="hover:underline">Terms</Link> &amp;{" "}
            <Link href="#" className="hover:underline">Privacy Policy</Link>.
          </p>
        </div>

      </div>
    </>
  );
}
