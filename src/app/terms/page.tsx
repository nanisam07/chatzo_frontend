import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | OFFSHIFT",
  description: "Terms of Service governing the use of OFFSHIFT conversational commerce platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-6 sm:px-12 lg:px-24 max-w-4xl mx-auto space-y-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: August 12, 2026
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the <strong>OFFSHIFT</strong> platform, storefront tools, dashboard, or WhatsApp commerce automation services (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree with these Terms, please do not access or use our Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">2. Description of Service</h2>
          <p>
            OFFSHIFT provides a conversational commerce platform that allows merchants to create digital storefronts, manage product catalogs, and route orders directly via messaging networks including the WhatsApp Business Platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">3. Account Registration & Responsibilities</h2>
          <p>
            To utilize OFFSHIFT services, merchants must register for an account and provide accurate, current, and complete business information. You are solely responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintaining the confidentiality of your account credentials.</li>
            <li>All activities and transactions occurring under your account.</li>
            <li>Ensuring compliance with local laws, tax regulations, and Meta/WhatsApp Business policies.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">4. Acceptable Use Policy</h2>
          <p>
            You agree not to use the Service for any illegal, unauthorized, or prohibited activities. Prohibited products and activities include, but are not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Selling counterfeit goods, illegal substances, weapons, or regulated items prohibited by WhatsApp Commerce Policy.</li>
            <li>Sending unsolicited bulk commercial messages (spam) or violating customer messaging consent rules.</li>
            <li>Attempting to interfere with, compromise, or breach platform infrastructure security.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">5. Orders, Payments & Payouts</h2>
          <p>
            OFFSHIFT operates as a commerce technology facilitator and router. OFFSHIFT charges 0% platform commission on standard storefront transactions. Merchants settle customer transactions directly via agreed payment methods (Cash on Delivery, UPI/Stripe, or external gateways). OFFSHIFT is not liable for buyer-seller disputes or unpaid customer invoices.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">6. Intellectual Property</h2>
          <p>
            All intellectual property rights in the OFFSHIFT software, logo, design system, and proprietary algorithms remain the exclusive property of OFFSHIFT Technologies Inc. Merchants retain ownership of all catalog assets, logos, and custom media uploaded to their store.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, OFFSHIFT Technologies Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or loss of profits or revenues resulting from platform downtime or third-party service outages (including Meta Business Cloud API unavailability).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">8. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account access at our discretion without prior notice if you breach these Terms or engage in activities that violate Meta WhatsApp Commerce Guidelines.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">9. Contact & Support</h2>
          <p>
            For questions or support regarding these Terms of Service, please contact our legal and support team:
          </p>
          <p className="font-semibold text-foreground">
            Email: <a href="mailto:support@offshift.io" className="underline">support@offshift.io</a>
          </p>
        </section>
      </div>
    </div>
  );
}
