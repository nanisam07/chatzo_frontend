"use client";

import React, { useState, useEffect } from "react";
import { Typography } from "@/components/shared/typography";
import { Card } from "@/components/shared/card";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import {
  Utensils,
  ChefHat,
  HeartPulse,
  ShoppingBag,
  ShoppingCart,
  Flame,
  Scissors,
  Shirt,
  Smartphone,
  Check,
} from "lucide-react";

export function BuiltForEveryBusiness() {
  // 1. Medical booking state
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);

  // 2. Retail stock decrementer
  const [stock, setStock] = useState(14);
  useEffect(() => {
    const interval = setInterval(() => {
      setStock((prev) => (prev > 5 ? prev - 1 : 14));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // 3. Grocery checkbox states
  const [groceryItems, setGroceryItems] = useState([
    { id: 1, text: "Organic Milk (1L)", checked: true },
    { id: 2, text: "Sourdough Loaf", checked: false },
    { id: 3, text: "Greek Yogurt (500g)", checked: false },
  ]);
  const toggleGrocery = (id: number) => {
    setGroceryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // 4. Bakery oven timer
  const [ovenTimer, setOvenTimer] = useState(12);
  useEffect(() => {
    const interval = setInterval(() => {
      setOvenTimer((prev) => (prev > 1 ? prev - 1 : 12));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 5. Fashion swatch toggle
  const [activeColor, setActiveColor] = useState("whatsapp");

  // 6. Electronics serial scanner
  const [serialVerified, setSerialVerified] = useState(false);
  const [scanning, setScanning] = useState(false);

  const triggerScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setSerialVerified(true);
    }, 1500);
  };

  return (
    <Section className="py-28 border-b border-border bg-background overflow-hidden" id="resources">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Title Heading */}
        <div className="space-y-6 max-w-3xl text-left">
          <Typography variant="h2" className="text-foreground font-bold tracking-tight text-4xl md:text-5xl lg:text-[56px] leading-tight">
            Built for Every Business.
          </Typography>
          <Typography variant="body" className="text-muted-foreground text-lg md:text-[20px] lg:text-[22px] leading-relaxed max-w-2xl">
            Deploy specialized transactional pipelines matching your industry&apos;s requirements. Tap components to interact.
          </Typography>
        </div>

        {/* 3x3 Grid Layout of Business Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. Restaurants */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-whatsapp/20 transition-all duration-500 group select-none">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-whatsapp">
                <Utensils size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Restaurants</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Scan QR codes at tables to browse visual catalogs and order natively.
              </Typography>
            </div>

            {/* Table order ticket UI */}
            <div className="bg-secondary border border-border p-4 rounded-2xl space-y-3 mt-6">
              <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                <span>Table 04 Ticket</span>
                <span className="text-whatsapp font-bold animate-pulse">Kitchen [Preparing]</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono border-t border-border pt-2.5 text-foreground">
                <div className="flex justify-between">
                  <span>1x Truffle Carbonara</span>
                  <span>$24.00</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-[10px]">
                  <span>- Extra Parmesan cheese</span>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-whatsapp/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

          {/* 2. Cloud Kitchens */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-purple-accent/20 transition-all duration-500 group select-none">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-purple-accent">
                <ChefHat size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Cloud Kitchens</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Centralize high-volume deliveries. Auto-route slips to courier networks.
              </Typography>
            </div>

            {/* Delivery dispatch UI */}
            <div className="bg-secondary border border-border p-4 rounded-2xl space-y-3 mt-6 text-xs font-mono">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Order #9342 Dispatch</span>
                <span className="text-purple-accent font-bold">Courier Assigned</span>
              </div>
              <div className="flex gap-2.5 justify-between pt-2.5 border-t border-border text-muted-foreground text-[10px]">
                <span className="text-foreground">Received</span>
                <span>&rarr;</span>
                <span className="text-foreground">Baking</span>
                <span>&rarr;</span>
                <span className="text-purple-accent font-bold animate-pulse">Out for Delivery</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

          {/* 3. Medical */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-cyan-accent/20 transition-all duration-500 group select-none">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-cyan-accent">
                <HeartPulse size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Medical & Clinics</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Book checkups, configure slots, and receive confirmations instantly.
              </Typography>
            </div>

            {/* Interactive booking slots widget */}
            <div className="bg-secondary border border-border p-4 rounded-2xl space-y-2.5 mt-6 text-xs font-mono">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Doctor: Dr. Clara Dubois</span>
                <span>Slots:</span>
              </div>
              <div className="flex gap-2 pt-2 border-t border-border">
                {["10:00 AM", "2:30 PM", "4:00 PM"].map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setBookedSlot(slot)}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg text-center border text-[10px] cursor-pointer transition-colors",
                      bookedSlot === slot
                        ? "bg-cyan-accent/20 border-cyan-accent text-cyan-accent font-bold"
                        : "border-border bg-transparent text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {bookedSlot && (
                <div className="text-[10px] text-whatsapp font-bold text-center animate-pulse pt-1">
                  Slot {bookedSlot} Booked! Check WhatsApp.
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

          {/* 4. Retail */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-whatsapp/20 transition-all duration-500 group select-none">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-whatsapp">
                <ShoppingBag size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Retail Brands</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Connect stock, manage product listings, and accept digital purchases.
              </Typography>
            </div>

            {/* Inventory count ticking widget */}
            <div className="bg-secondary border border-border p-4 rounded-2xl space-y-2.5 mt-6 text-xs font-mono">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Product Stock Ledger</span>
                <span className="text-whatsapp font-bold">Active Sales</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border text-foreground">
                <span>Matte Titanium Flask</span>
                <span className="text-foreground font-bold bg-secondary px-2.5 py-1 rounded-lg border border-border animate-pulse">
                  {stock} units left
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-whatsapp/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

          {/* 5. Grocery */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-purple-accent/20 transition-all duration-500 group select-none">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-purple-accent">
                <ShoppingCart size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Grocery Stores</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Provide checklist carts. Allow easy items verification.
              </Typography>
            </div>

            {/* Clickable checklist widget */}
            <div className="bg-secondary border border-border p-3.5 rounded-2xl space-y-1.5 mt-6 text-xs font-mono">
              {groceryItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleGrocery(item.id)}
                  className="flex items-center gap-2.5 cursor-pointer py-0.5 select-none"
                >
                  <div className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                    item.checked ? "bg-purple-accent/20 border-purple-accent text-purple-accent" : "border-border bg-transparent"
                  )}>
                    {item.checked && <Check size={10} />}
                  </div>
                  <span className={cn(item.checked ? "text-muted-foreground line-through" : "text-foreground")}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

          {/* 6. Bakery */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-cyan-accent/20 transition-all duration-500 group select-none">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-cyan-accent">
                <Flame size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Baking & Kitchens</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Trigger alerts when items are ready. Maintain preparation queues.
              </Typography>
            </div>

            {/* Baking queue timer widget */}
            <div className="bg-secondary border border-border p-4 rounded-2xl space-y-2.5 mt-6 text-xs font-mono">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Oven Queue Status</span>
                <span className="text-cyan-accent font-bold animate-pulse">Baking</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border text-foreground">
                <span>Sourdough Batard</span>
                <span className="text-foreground font-bold">
                  {ovenTimer}m remaining
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

          {/* 7. Salons */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-whatsapp/20 transition-all duration-500 group select-none">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-whatsapp">
                <Scissors size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Salons & Spas</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Connect bookings, manage schedules, and process service checkout.
              </Typography>
            </div>

            {/* Booking schedule ticket */}
            <div className="bg-secondary border border-border p-4 rounded-2xl space-y-2.5 mt-6 text-xs font-mono">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Appointment Slip</span>
                <span className="text-whatsapp font-bold">Confirmed</span>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-border text-foreground">
                <div className="flex justify-between">
                  <span>Hair Cut & Styling</span>
                  <span>4:30 PM</span>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-whatsapp/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

          {/* 8. Fashion */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-purple-accent/20 transition-all duration-500 group select-none">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-purple-accent">
                <Shirt size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Fashion Stores</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Enable color swatch triggers and sizing parameter updates.
              </Typography>
            </div>

            {/* Interactive swatches and details card */}
            <div className="bg-secondary border border-border p-3.5 rounded-2xl space-y-2 mt-6 text-xs font-mono">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Onyx Cardigan</span>
                <span className="text-foreground font-bold capitalize">{activeColor}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Swatches:</span>
                <div className="flex gap-2">
                  {["whatsapp", "purple", "cyan"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setActiveColor(color)}
                      className={cn(
                        "w-5 h-5 rounded-full border cursor-pointer transition-transform",
                        activeColor === color ? "scale-110 border-foreground" : "border-transparent",
                        color === "whatsapp" ? "bg-whatsapp" : color === "purple" ? "bg-purple-accent" : "bg-cyan-accent"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

          {/* 9. Electronics */}
          <Card className="p-8 border border-border glass-card relative overflow-hidden flex flex-col justify-between hover:border-cyan-accent/20 transition-all duration-500 group select-none">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-cyan-accent">
                <Smartphone size={20} className="shrink-0" />
                <Typography variant="body" className="text-foreground font-bold text-lg md:text-[24px] lg:text-[26px]">Electronics</Typography>
              </div>
              <Typography variant="body" className="text-muted-foreground text-sm md:text-[18px] leading-relaxed">
                Check serial numbers, verify warranty parameters, and log checks.
              </Typography>
            </div>

            {/* Clickable serial scanner UI */}
            <div className="bg-secondary border border-border p-3.5 rounded-2xl space-y-2 mt-6 text-xs font-mono">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Warranty Check</span>
                <span className="text-muted-foreground">SN-9248-X</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                {scanning ? (
                  <span className="text-purple-accent font-bold animate-pulse text-[11px]">Scanning database...</span>
                ) : serialVerified ? (
                  <span className="text-whatsapp font-bold flex items-center gap-1.5 text-[11px]">
                    <Check size={10} /> Verified: 12m Warranty
                  </span>
                ) : (
                  <button
                    onClick={triggerScan}
                    className="w-full py-1.5 rounded-lg bg-secondary border border-border text-center text-foreground cursor-pointer hover:border-foreground/20 text-xs"
                  >
                    Click to Verify Serial
                  </button>
                )}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
          </Card>

        </div>
      </div>
    </Section>
  );
}
export default BuiltForEveryBusiness;
