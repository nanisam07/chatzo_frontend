"use client";

import React, { useState } from "react";
import { Typography } from "@/components/shared/typography";
import { Card } from "@/components/shared/card";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Do I need a WhatsApp Business API account to use Offshift?",
    answer: "No! Offshift integrates directly with standard personal or business numbers. If you require massive high-volume automation, you can connect your official Meta Business API with one-click from the setup board.",
  },
  {
    question: "How do transaction payouts and checkout commissions work?",
    answer: "We believe in direct commerce. We take 0% commission on orders. Tapping checkout routes checkout baskets directly to your WhatsApp business chat, allowing you to settle payments using cash, credit, Stripe, or localized QR codes.",
  },
  {
    question: "Is there a limit to how many items can be in a catalog?",
    answer: "Starter plans support up to 50 active inventory items. Growth and Enterprise plans support unlimited products, variants (color, sizing parameters), and deep stock tracking logs.",
  },
  {
    question: "What is AI Cart Abandonment Recovery?",
    answer: "If a customer accesses your storefront link but drops out before sending the final WhatsApp order request, Offshift tracks the checkout leakage and can automatically trigger a localized WhatsApp recovery notification with a custom discount offer.",
  },
];

export function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // Open first by default

  const toggleIdx = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <Section className="py-28 border-b border-border bg-background overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Title block */}
        <div className="space-y-6 text-center max-w-2xl mx-auto">
          <Typography variant="h2" className="text-foreground font-bold tracking-tight text-4xl md:text-5xl lg:text-[56px] leading-tight">
            Frequently Asked Questions
          </Typography>
          <Typography variant="body" className="text-muted-foreground text-lg md:text-[20px] lg:text-[22px] leading-relaxed">
            Everything you need to know about Offshift storefront catalogs, merchant center tracking, and pricing layers.
          </Typography>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            
            return (
              <Card
                key={idx}
                className={cn(
                  "border bg-secondary/50 glass-card transition-all duration-500 overflow-hidden cursor-pointer rounded-2xl",
                  isOpen ? "border-whatsapp/20 shadow-[0_10px_30px_rgba(37,211,102,0.03)]" : "border-border hover:border-foreground/10"
                )}
                onClick={() => toggleIdx(idx)}
              >
                {/* Accordion Trigger Header */}
                <div className="p-6 md:p-8 flex justify-between items-center gap-6">
                  <div className="flex items-center gap-4 text-left">
                    <HelpCircle size={20} className={cn("shrink-0 transition-colors", isOpen ? "text-whatsapp" : "text-muted-foreground")} />
                    <Typography variant="body" className={cn("text-base md:text-[20px] font-bold transition-colors leading-tight", isOpen ? "text-foreground" : "text-foreground/80")}>
                      {faq.question}
                    </Typography>
                  </div>
                  <div className="shrink-0 text-muted-foreground">
                    {isOpen ? <Minus size={18} className="text-whatsapp" /> : <Plus size={18} />}
                  </div>
                </div>

                {/* Accordion Expandable Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 text-left border-t border-border">
                        <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                          {faq.answer}
                        </Typography>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
export default FaqAccordion;
