"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api/client";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import {
  Mail,
  Lock,
  Building,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  User,
} from "lucide-react";

/* ─── Social Icons ─────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ─── Custom Floating Glass Input ──────────────────────── */
interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  rightEl?: React.ReactNode;
  error?: string;
}

function FloatingInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  rightEl,
  error,
}: InputProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-foreground/80 tracking-wide"
      >
        {label}
      </label>
      <div className="relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-[#25D366]">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full pl-11 pr-4 py-3 rounded-2xl border bg-background/50 backdrop-blur-md text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all duration-300",
            error
              ? "border-red-500/80 focus:ring-2 focus:ring-red-500/20"
              : "border-border focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/10"
          )}
        />
        {rightEl && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightEl}
          </div>
        )}
      </div>
      {error && (
        <p className="text-[11px] text-red-400 font-medium pl-1">{error}</p>
      )}
    </div>
  );
}

/* ─── Password Strength Evaluator ───────────────────────── */
function getPasswordStrength(pass: string) {
  if (!pass) return { score: 0, label: "", color: "bg-border" };
  let score = 0;
  if (pass.length >= 8) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "bg-red-500" };
  if (score === 2) return { score: 2, label: "Fair", color: "bg-amber-500" };
  if (score === 3) return { score: 3, label: "Good", color: "bg-blue-500" };
  return { score: 4, label: "Strong", color: "bg-[#25D366]" };
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    businessName: "",
    password: "",
    confirmPassword: "",
  });

  const setField = (field: string) => (val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<Record<string, string>> = {};
    if (!form.fullName) errs.fullName = "Full name is required";
    if (!form.businessName) errs.businessName = "Business name is required";
    if (!form.email) {
      errs.email = "Business email is required";
    } else if (!form.email.includes("@") || !form.email.includes(".")) {
      errs.email = "Enter a valid email address";
    }
    if (!form.password) {
      errs.password = "Password is required";
    } else if (form.password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    }
    if (form.password !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);
    setLoadingText("Creating your account...");

    try {
      const response = await api.post("/auth/signup", {
        fullName: form.fullName,
        businessName: form.businessName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Redirect to /signup/verify page
      window.location.href = `/signup/verify?email=${encodeURIComponent(form.email)}`;
    } catch (error) {
      console.error(error);
      const msg = error instanceof Error ? error.message : "Unable to create account";
      useWorkspaceStore.getState().showToast(msg, "error");
    } finally {
      setIsLoading(false);
      setLoadingText("");
    }
  };

  const strength = getPasswordStrength(form.password);

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
            <span className="text-[#0a0a12] font-black text-lg">O</span>
          </div>
          <span className="text-xl font-black tracking-wider text-foreground">
            OFFSHIFT
          </span>
        </div>

        {/* Live Dynamic Left Panel Content */}
        <div className="my-12 space-y-6 max-w-[420px]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>Enterprise Security</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Create Your Merchant Account
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
                  <h4 className="text-xs font-bold">Enterprise Security</h4>
                  <p className="text-[11px] text-muted-foreground">Encrypted workspace initialization</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-muted-foreground">
          Need help setting up? Contact{" "}
          <a
            href="mailto:support@offshift.io"
            className="text-foreground font-semibold hover:underline"
          >
            support@offshift.io
          </a>
        </div>
      </div>

      {/* ─── RIGHT: FORM WIDGET PANEL ─── */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 z-10">
        <div className="w-full max-w-[460px]">
          {/* Form Deck Frame */}
          <div className="p-8 rounded-[32px] border border-border/80 bg-background/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.form
                key="signup-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSignupSubmit}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl font-black tracking-tight">
                    Create Your Account
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Get started with your WhatsApp Business store
                  </p>
                </div>

                <div className="max-h-[380px] overflow-y-auto pr-1 space-y-3.5 custom-scrollbar">
                  <FloatingInput
                    id="fullName"
                    label="Full Name"
                    placeholder="Enter your name"
                    value={form.fullName}
                    onChange={setField("fullName")}
                    icon={<User size={16} />}
                    error={errors.fullName}
                  />

                  <FloatingInput
                    id="bizName"
                    label="Business Name"
                    placeholder="Enter your business name"
                    value={form.businessName}
                    onChange={setField("businessName")}
                    icon={<Building size={16} />}
                    error={errors.businessName}
                  />

                  <FloatingInput
                    id="email"
                    label="Business Email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={setField("email")}
                    icon={<Mail size={16} />}
                    error={errors.email}
                  />

                  <div className="space-y-2">
                    <FloatingInput
                      id="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={form.password}
                      onChange={setField("password")}
                      icon={<Lock size={16} />}
                      error={errors.password}
                      rightEl={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer animate-none bg-transparent border-0"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      }
                    />

                    {form.password && (
                      <div className="space-y-1 px-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-muted-foreground">Strength:</span>
                          <span className="font-bold text-foreground">
                            {strength.label}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1 h-1">
                          {[1, 2, 3, 4].map((barIndex) => (
                            <div
                              key={barIndex}
                              className={cn(
                                "h-full rounded-full transition-all duration-300",
                                barIndex <= strength.score
                                  ? strength.color
                                  : "bg-border/60"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <FloatingInput
                      id="confirmPassword"
                      label="Confirm Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={form.confirmPassword}
                      onChange={setField("confirmPassword")}
                      icon={<Lock size={16} />}
                      error={errors.confirmPassword}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl font-bold text-black bg-[#25D366] hover:bg-[#22c35e] shadow-lg shadow-[#25D366]/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      <span>{loadingText}</span>
                    </div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-muted-foreground pt-1">
                  Already registered?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-[#25D366] hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}