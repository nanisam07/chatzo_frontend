import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OFFSHIFT | Every WhatsApp Chat Is a New Storefront.",
  description:
    "Transform conversations into sales with intelligent storefronts, seamless ordering, and powerful business management—all connected to WhatsApp.",
  keywords: [
    "Conversational Commerce",
    "WhatsApp Store",
    "SaaS Commerce",
    "WhatsApp Commerce",
    "Offshift",
    "E-commerce",
  ],
  authors: [{ name: "OFFSHIFT Team" }],
  openGraph: {
    title: "OFFSHIFT - Every WhatsApp Chat Is a New Storefront",
    description:
      "Transform conversations into sales with intelligent storefronts, seamless ordering, and powerful business management—all connected to WhatsApp.",
    url: "https://offshift.com",
    siteName: "OFFSHIFT",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OFFSHIFT - Every WhatsApp Chat Is a New Storefront",
    description:
      "Transform conversations into sales with intelligent storefronts, seamless ordering, and powerful business management—all connected to WhatsApp.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
