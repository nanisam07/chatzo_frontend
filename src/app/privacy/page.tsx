import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | OFFSHIFT",
  description: "Privacy Policy for OFFSHIFT conversational commerce platform.",
};

export default function PrivacyPolicyPage() {
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
        <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: August 12, 2026
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
          <p>
            Welcome to <strong>OFFSHIFT</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;). We respect your privacy and are committed to protecting the personal data of our merchants, customers, and website visitors. This Privacy Policy outlines how we collect, use, store, and process your information when you interact with our platform, website, and WhatsApp commerce services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">2. Information We Collect</h2>
          <p>
            We collect information that enables us to provide conversational storefront and order processing services, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Merchant Information:</strong> Business name, email, phone number, GST/Business registration details, catalog items, and payout preferences.</li>
            <li><strong>Customer Data:</strong> Phone number, order details, delivery address, and messaging logs submitted via WhatsApp checkout flows.</li>
            <li><strong>Technical Data:</strong> IP address, device specs, browser type, and usage telemetry.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">3. How We Use Your Information</h2>
          <p>
            We use collected data solely for operating and enhancing our services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To process and route WhatsApp orders between buyers and merchants.</li>
            <li>To integrate with WhatsApp Business Cloud APIs and Meta Services.</li>
            <li>To provide merchant analytics, customer support, and system security.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">4. Data Sharing & Third Parties</h2>
          <p>
            We do not sell your personal data. Data is only shared with trusted service providers necessary for operation (such as Meta / WhatsApp Cloud API for message routing, hosting infrastructure, and payment gateways configured by merchants).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">5. Data Security & Retention</h2>
          <p>
            We maintain industry-standard administrative, physical, and technical security measures to safeguard your information against unauthorized access, loss, or misuse.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">6. Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy or your data, please contact us at:
          </p>
          <p className="font-semibold text-foreground">
            Email: <a href="mailto:support@offshift.io" className="underline">support@offshift.io</a>
          </p>
        </section>
      </div>
    </div>
  );
}
