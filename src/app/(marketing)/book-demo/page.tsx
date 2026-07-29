"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  Building,
  User,
  Globe,
  Calendar,
  Clock,
  MessageSquare,
  Check,
  ArrowRight,
  Star,
  Users,
  Zap,
  Target,
  BarChart3,
  Rocket,
  CreditCard,
} from "lucide-react";

/* ─── Types ────────────────────────────────────────────── */
interface BookingForm {
  fullName: string;
  businessEmail: string;
  whatsappNumber: string;
  businessName: string;
  businessCategory: string;
  companySize: string;
  country: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

/* ─── Options ─────────────────────────────────────────── */
const CATEGORIES = [
  { value: "retail", label: "Retail" },
  { value: "food", label: "Food & Beverage" },
  { value: "fashion", label: "Fashion & Apparel" },
  { value: "electronics", label: "Electronics" },
  { value: "services", label: "Professional Services" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

const COMPANY_SIZES = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "200+", label: "200+ employees" },
];

const COUNTRIES = [
  { value: "in", label: "🇮🇳 India" },
  { value: "us", label: "🇺🇸 United States" },
  { value: "gb", label: "🇬🇧 United Kingdom" },
  { value: "ae", label: "🇦🇪 UAE" },
  { value: "sg", label: "🇸🇬 Singapore" },
  { value: "au", label: "🇦🇺 Australia" },
  { value: "other", label: "Other" },
];

const TIME_SLOTS = [
  { value: "morning", label: "Morning (9:00 – 12:00)" },
  { value: "afternoon", label: "Afternoon (12:00 – 17:00)" },
  { value: "evening", label: "Evening (17:00 – 20:00)" },
];

/* ─── Reusable field ─────────────────────────────────── */
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  required?: boolean;
  error?: string;
}

function InputField({ id, label, type = "text", placeholder, value, onChange, icon, required, error }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
        {label}{required && <span className="text-[#25D366] ml-0.5">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full py-3 rounded-xl border bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300",
            icon ? "pl-11 pr-4" : "px-4",
            error
              ? "border-red-400/60 focus:border-red-400/80 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.1)]"
              : "border-border focus:border-[#25D366]/60 focus:shadow-[0_0_0_3px_rgba(37,211,102,0.1)]"
          )}
        />
      </div>
      {error && <p className="text-[11px] text-red-400 font-medium">{error}</p>}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  icon?: React.ReactNode;
  required?: boolean;
  error?: string;
}

function SelectField({ id, label, value, onChange, options, icon, required, error }: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
        {label}{required && <span className="text-[#25D366] ml-0.5">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
            {icon}
          </span>
        )}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full py-3 rounded-xl border bg-secondary text-sm text-foreground focus:outline-none transition-all duration-300 cursor-pointer appearance-none",
            icon ? "pl-11 pr-4" : "px-4",
            error
              ? "border-red-400/60 focus:border-red-400/80"
              : "border-border focus:border-[#25D366]/60 focus:shadow-[0_0_0_3px_rgba(37,211,102,0.1)]"
          )}
        >
          <option value="">Select...</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      {error && <p className="text-[11px] text-red-400 font-medium">{error}</p>}
    </div>
  );
}

/* ─── What to Expect timeline ────────────────────────── */
const TIMELINE = [
  { icon: Target, label: "Personalized for your business type" },
  { icon: MessageSquare, label: "Live WhatsApp storefront demo" },
  { icon: CreditCard, label: "Payment flow walkthrough" },
  { icon: BarChart3, label: "Analytics & insights preview" },
  { icon: Rocket, label: "Launch roadmap for your business" },
];

/* ─── Trust badges ───────────────────────────────────── */
const TRUST = [
  { icon: Users, value: "500+", label: "Businesses" },
  { icon: Clock, value: "30 min", label: "Demo Length" },
  { icon: Zap, value: "Free", label: "No Credit Card" },
];

/* ─── Businesses ─────────────────────────────────────── */
const BUSINESSES = [
  { initials: "BC", name: "Brew & Co.", category: "F&B" },
  { initials: "FM", name: "FashionMart", category: "Fashion" },
  { initials: "HE", name: "HealthEdge", category: "Healthcare" },
];

/* ─── Main Page ───────────────────────────────────────── */
export default function BookDemoPage() {
  const [form, setForm] = useState<BookingForm>({
    fullName: "",
    businessEmail: "",
    whatsappNumber: "",
    businessName: "",
    businessCategory: "",
    companySize: "",
    country: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof BookingForm) => (val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof BookingForm, string>> = {};
    if (!form.fullName) errs.fullName = "Full name is required";
    if (!form.businessEmail) errs.businessEmail = "Email is required";
    else if (!form.businessEmail.includes("@")) errs.businessEmail = "Enter a valid email";
    if (!form.whatsappNumber) errs.whatsappNumber = "WhatsApp number is required";
    if (!form.businessName) errs.businessName = "Business name is required";
    if (!form.businessCategory) errs.businessCategory = "Select a category";
    if (!form.companySize) errs.companySize = "Select company size";
    if (!form.country) errs.country = "Select a country";
    if (!form.preferredDate) errs.preferredDate = "Select a preferred date";
    if (!form.preferredTime) errs.preferredTime = "Select a preferred time";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setSubmitted(true); }, 2000);
  };

  return (
    <>
      <style>{`
        @keyframes demoFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
        @keyframes demoCheckPop {
          0%   { transform: scale(0) rotate(-45deg); opacity: 0; }
          70%  { transform: scale(1.15) rotate(6deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes demoSuccessPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.4); }
          50%       { box-shadow: 0 0 0 24px rgba(37,211,102,0); }
        }
      `}</style>

      <div className="relative min-h-screen w-full bg-background">

        {/* ─── Ambient background ───────── */}
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-[0.07] -z-0"
          style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-0 right-[5%] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-[0.06] -z-0"
          style={{ background: "radial-gradient(circle, #25D366 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 opacity-[0.015] -z-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)", backgroundSize: "4rem 4rem" }}
        />

        {/* ─── Hero ────────────────────────────────── */}
        <section className="relative pt-28 pb-16 px-6 text-center z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/5 text-[#25D366] text-xs font-semibold mb-6"
            style={{ animation: "demoFadeUp 0.6s ease-out both" }}
          >
            <Zap size={12} />
            <span>Free 30-Minute Personalized Demo</span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.05] mb-5"
            style={{ animation: "demoFadeUp 0.6s 0.08s ease-out both" }}
          >
            Book a{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #25D366 0%, #00D4FF 100%)" }}>
              Personalized
            </span>{" "}
            Demo
          </h1>

          <p
            className="text-lg text-muted-foreground max-w-[560px] mx-auto leading-relaxed"
            style={{ animation: "demoFadeUp 0.6s 0.16s ease-out both" }}
          >
            See exactly how Chatzo transforms your WhatsApp into a live sales engine — tailored to your business.
          </p>

          {/* Trust badges */}
          <div
            className="flex items-center justify-center gap-8 mt-10 flex-wrap"
            style={{ animation: "demoFadeUp 0.6s 0.24s ease-out both" }}
          >
            {TRUST.map((t) => (
              <div key={t.label} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <t.icon size={14} className="text-[#25D366]" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-black text-foreground">{t.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Main two-column section ──────────────── */}
        <section className="relative z-10 max-w-[1200px] mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">

          {/* ── LEFT: Form card ── */}
          <div
            className="rounded-[28px] border border-border p-8 md:p-10"
            style={{ background: "var(--glass-bg)", backdropFilter: "blur(24px)", boxShadow: "0 24px 64px 0 var(--glass-shadow)" }}
          >
            {submitted ? (
              /* ─── Success state ─── */
              <div
                className="text-center space-y-6 py-6"
                style={{ animation: "demoFadeUp 0.6s ease-out both" }}
              >
                <div className="flex justify-center">
                  <div
                    className="w-24 h-24 rounded-full bg-[#25D366]/15 border-2 border-[#25D366] flex items-center justify-center"
                    style={{ animation: "demoSuccessPulse 2s ease-in-out infinite" }}
                  >
                    <Check size={42} strokeWidth={3} className="text-[#25D366]" style={{ animation: "demoCheckPop 0.6s cubic-bezier(0.16,1,0.3,1) both" }} />
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-black text-foreground tracking-tight">Thank You! 🎉</h2>
                  <p className="text-base text-muted-foreground mt-2 max-w-[400px] mx-auto">
                    Our team will contact you within <span className="font-bold text-foreground">24 hours</span> to confirm your demo time.
                  </p>
                  {form.businessEmail && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Check <span className="font-semibold text-foreground">{form.businessEmail}</span> for your confirmation.
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {[
                    "Demo confirmed & scheduled",
                    "Calendar invite sent to your email",
                    "Demo resources shared in advance",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-left max-w-sm mx-auto">
                      <div className="w-5 h-5 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center shrink-0">
                        <Check size={10} strokeWidth={3} className="text-[#25D366]" />
                      </div>
                      <span className="text-sm text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-black text-black bg-[#25D366] hover:bg-[#20bd5a] hover:shadow-[0_0_28px_rgba(37,211,102,0.4)] shadow-[0_4px_14px_rgba(37,211,102,0.2)] transition-all duration-300"
                >
                  Back to Home <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              /* ─── Booking form ─── */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-foreground tracking-tight">Schedule Your Demo</h2>
                  <p className="text-sm text-muted-foreground mt-1">Our team responds within 2 hours</p>
                </div>

                {/* Row 1: Full Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    id="demo-name"
                    label="Full Name"
                    placeholder="Enter your name"
                    value={form.fullName}
                    onChange={setField("fullName")}
                    icon={<User size={15} />}
                    required
                    error={errors.fullName}
                  />
                  <InputField
                    id="demo-email"
                    label="Business Email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.businessEmail}
                    onChange={setField("businessEmail")}
                    icon={<Mail size={15} />}
                    required
                    error={errors.businessEmail}
                  />
                </div>

                {/* Row 2: WhatsApp + Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    id="demo-whatsapp"
                    label="WhatsApp Number"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.whatsappNumber}
                    onChange={setField("whatsappNumber")}
                    icon={<Phone size={15} />}
                    required
                    error={errors.whatsappNumber}
                  />
                  <InputField
                    id="demo-biz"
                    label="Business Name"
                    placeholder="Connor Coffee Co."
                    value={form.businessName}
                    onChange={setField("businessName")}
                    icon={<Building size={15} />}
                    required
                    error={errors.businessName}
                  />
                </div>

                {/* Row 3: Category + Company size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectField
                    id="demo-category"
                    label="Business Category"
                    value={form.businessCategory}
                    onChange={setField("businessCategory")}
                    options={CATEGORIES}
                    icon={<Building size={15} />}
                    required
                    error={errors.businessCategory}
                  />
                  <SelectField
                    id="demo-size"
                    label="Company Size"
                    value={form.companySize}
                    onChange={setField("companySize")}
                    options={COMPANY_SIZES}
                    icon={<Users size={15} />}
                    required
                    error={errors.companySize}
                  />
                </div>

                {/* Country */}
                <SelectField
                  id="demo-country"
                  label="Country"
                  value={form.country}
                  onChange={setField("country")}
                  options={COUNTRIES}
                  icon={<Globe size={15} />}
                  required
                  error={errors.country}
                />

                {/* Row 4: Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    id="demo-date"
                    label="Preferred Date"
                    type="date"
                    placeholder=""
                    value={form.preferredDate}
                    onChange={setField("preferredDate")}
                    icon={<Calendar size={15} />}
                    required
                    error={errors.preferredDate}
                  />
                  <SelectField
                    id="demo-time"
                    label="Preferred Time"
                    value={form.preferredTime}
                    onChange={setField("preferredTime")}
                    options={TIME_SLOTS}
                    icon={<Clock size={15} />}
                    required
                    error={errors.preferredTime}
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="demo-message" className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Message <span className="text-muted-foreground/50 normal-case">(optional)</span>
                  </label>
                  <textarea
                    id="demo-message"
                    rows={4}
                    placeholder="Tell us a bit about your business and what you'd like to see in the demo..."
                    value={form.message}
                    onChange={(e) => setField("message")(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:border-[#25D366]/60 focus:shadow-[0_0_0_3px_rgba(37,211,102,0.1)] focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                {/* CTA */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl text-base font-black text-black bg-[#25D366] hover:bg-[#20bd5a] hover:shadow-[0_0_32px_rgba(37,211,102,0.45)] shadow-[0_4px_20px_rgba(37,211,102,0.25)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    ) : (
                      <>
                        Book My Demo <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-muted-foreground">
                    Free 30-minute personalized demo · No commitment · No credit card
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ── RIGHT: Benefits sidebar ── */}
          <div className="space-y-6 lg:pt-4">

            {/* What to expect */}
            <div className="rounded-[24px] border border-border p-6" style={{ background: "var(--glass-bg)", backdropFilter: "blur(16px)" }}>
              <h3 className="text-base font-black text-foreground mb-5">What to Expect</h3>
              <div className="space-y-4">
                {TIMELINE.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0 mt-0.5 border border-[#25D366]/15">
                      <item.icon size={14} className="text-[#25D366]" />
                    </div>
                    <span className="text-sm text-foreground font-medium leading-relaxed">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="rounded-[24px] border border-[#25D366]/20 p-6" style={{ background: "linear-gradient(135deg, rgba(37,211,102,0.04) 0%, rgba(0,212,255,0.04) 100%)" }}>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <blockquote className="text-sm text-foreground font-medium leading-relaxed mb-4">
                &ldquo;Chatzo helped us close 3× more orders in the first week. The WhatsApp storefront is incredible.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#25D366] to-[#00D4FF] flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-black text-black">PS</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Priya Sharma</div>
                  <div className="text-[11px] text-muted-foreground">Founder, Bloom Boutique</div>
                </div>
              </div>
            </div>

            {/* Businesses using Chatzo */}
            <div className="rounded-[24px] border border-border p-6" style={{ background: "var(--glass-bg)", backdropFilter: "blur(16px)" }}>
              <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-4">Businesses on Chatzo</h4>
              <div className="space-y-3">
                {BUSINESSES.map((b) => (
                  <div key={b.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C3AED]/20 to-[#25D366]/20 flex items-center justify-center border border-border shrink-0">
                      <span className="text-[9px] font-black text-foreground">{b.initials}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{b.name}</div>
                      <div className="text-[10px] text-muted-foreground">{b.category}</div>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full bg-[#25D366]" />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border text-[11px] text-muted-foreground text-center">
                + 497 more businesses live on WhatsApp
              </div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}
