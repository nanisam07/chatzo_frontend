"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { Typography } from "@/components/shared/typography";
import { cn } from "@/lib/utils";
import { MessageSquare, ArrowRight, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-background border-t border-border pt-20 pb-12 relative overflow-hidden select-none transition-colors duration-500">
      
      {/* Light gradient highlight on footer top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Info (Col span 4) */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-whatsapp to-purple-accent flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <MessageSquare size={16} className="text-black" />
              </div>
              <span className="font-bold tracking-wider text-foreground text-base">
                {BRAND.name}
              </span>
            </Link>
            <Typography variant="body" className="text-muted-foreground text-xs leading-relaxed max-w-sm">
              Connecting chat messaging directly with inventory storefront catalogs. Turn conversations into revenue.
            </Typography>
            
            {/* Social Links */}
            <div className="flex gap-4 text-muted-foreground">
              <Link href="#" aria-label="Twitter X" className="hover:text-foreground transition-colors duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link href="#" aria-label="Github" className="hover:text-foreground transition-colors duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </Link>
              <Link href="#" aria-label="LinkedIn" className="hover:text-foreground transition-colors duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Links Columns (Col span 4) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            {/* Navigation */}
            <div className="space-y-4 text-left">
              <Typography variant="body" className="text-[10px] text-foreground font-bold uppercase tracking-widest">Product</Typography>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li><Link href="#commerce" className="hover:text-foreground transition-colors">Commerce</Link></li>
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#dashboard" className="hover:text-foreground transition-colors">Merchant Center</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4 text-left">
              <Typography variant="body" className="text-[10px] text-foreground font-bold uppercase tracking-widest">Resources</Typography>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li><Link href="#resources" className="hover:text-foreground transition-colors">Faq & Help</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Developers API</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Legal Terms</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Input (Col span 4) */}
          <div className="md:col-span-4 space-y-4 text-left">
            <Typography variant="body" className="text-[10px] text-foreground font-bold uppercase tracking-widest">Ecosystem Updates</Typography>
            <Typography variant="body" className="text-muted-foreground text-xs leading-relaxed">
              Subscribe to receive updates on WhatsApp Business APIs, features releases, and commerce guides.
            </Typography>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                className="flex-1 px-4 py-2 text-xs rounded-xl bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-whatsapp/30 focus:shadow-[0_0_15px_rgba(37,211,102,0.05)] transition-all duration-300 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={subscribed}
                className={cn(
                  "p-2 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer select-none",
                  subscribed
                    ? "bg-whatsapp/15 border-whatsapp/20 text-whatsapp"
                    : "bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-foreground/10"
                )}
              >
                {subscribed ? <Check size={14} /> : <ArrowRight size={14} />}
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom (Credits) */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} OFFSHIFT Technologies Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
export default Footer;
