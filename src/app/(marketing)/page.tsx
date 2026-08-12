import React from "react";
import HeroLayout from "@/features/hero/components/hero-layout";
import TrustedBusinesses from "@/features/trusted/components/trusted-businesses";
import BentoGrid from "@/features/features/components/bento-grid";
import DashboardShowcase from "@/features/dashboard/components/dashboard-showcase";
import CommerceEcosystem from "@/features/ecosystem/components/commerce-ecosystem";
import BuiltForEveryBusiness from "@/features/testimonials/components/floating-testimonials";
import PricingTiers from "@/features/pricing/components/pricing-tiers";
import FaqAccordion from "@/features/faq/components/faq-accordion";
import FinalCta from "@/features/cta/components/final-cta";

export default function MarketingPage() {
  return (
    <div className="relative w-full">
      {/* Cinematic Hero & Scroll Showcase */}
      <HeroLayout />

      {/* Section 1: Trusted by Businesses stats node map */}
      <TrustedBusinesses />

      {/* Section 2: Why Offshift interactive Bento Grid */}
      <BentoGrid />

      {/* Section 3: Business Dashboard Showcase live simulator */}
      <DashboardShowcase />

      {/* Section 4: Commerce Ecosystem flow traces */}
      <CommerceEcosystem />

      {/* Section 5: Built for Every Business industry workflows */}
      <BuiltForEveryBusiness />

      {/* Section 6: Conic Pricing Plans */}
      <PricingTiers />

      {/* Section 7: FAQ Accordion expansions */}
      <FaqAccordion />

      {/* Section 8: Final concluding CTA */}
      <FinalCta />
    </div>
  );
}
