"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/constants";
import {
  Home,
  MessageSquare,
  Sparkles,
  Tag,
  BookOpen,
  LogIn,
  Calendar,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/use-magnetic";

interface NavItem {
  label: string;
  href: string;
  sectionId: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

const DOCK_LINKS: NavItem[] = [
  { label: "Home", href: "/", sectionId: "#home", icon: Home },
  { label: "Commerce", href: "/#commerce", sectionId: "#commerce", icon: MessageSquare },
  { label: "Features", href: "/features", sectionId: "#features", icon: Sparkles },
  { label: "Pricing", href: "/pricing", sectionId: "#pricing", icon: Tag },
  { label: "Resources", href: "/resources", sectionId: "#resources", icon: BookOpen },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("/");
  const dockRef = useMagnetic<HTMLDivElement>();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active state based on route
  React.useEffect(() => {
    setActiveItem(pathname || "/");
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (pathname === "/") {
      // Smooth scroll if we are already on homepage
      e.preventDefault();
      const targetElement = document.querySelector(item.sectionId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        setActiveItem(item.href);
      } else if (item.sectionId === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveItem(item.href);
      }
    }
  };

  return (
    <aside
      ref={dockRef}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-50 pointer-events-auto select-none hidden lg:block"
    >
      <div
        className={cn(
          "w-16 hover:w-56 p-3 rounded-[32px] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col gap-8 justify-between border glass-card group/dock shadow-[0_30px_70px_rgba(0,0,0,0.8)]",
          scrolled ? "scale-[0.92] opacity-80 hover:opacity-100" : "scale-100",
          "origin-left border-border hover:border-border hover:shadow-[0_40px_80px_rgba(124,58,237,0.1)]"
        )}
      >
        {/* Dock Top: Brand Icon */}
        <div className="flex items-center gap-3 px-1.5 py-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-whatsapp to-purple-accent flex items-center justify-center shadow-lg shrink-0 group-hover/dock:rotate-12 transition-transform duration-500">
            <MessageSquare size={18} className="text-black" />
          </div>
          <span className="text-sm font-bold tracking-wider text-foreground opacity-0 group-hover/dock:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {BRAND.name}
          </span>
        </div>

        {/* Dock Middle: Main Navigation links */}
        <nav className="flex flex-col gap-1.5">
          {DOCK_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                  "relative flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group/item",
                  isActive
                    ? "bg-secondary text-whatsapp shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-border"
                    : "text-muted-foreground hover:text-foreground dark:hover:bg-secondary hover:bg-secondary border border-transparent"
                )}
              >
                {/* Active side-border glow bar */}
                {isActive && (
                  <span className="absolute left-0 w-[3px] h-6 bg-whatsapp rounded-r-full shadow-[0_0_12px_rgba(37,211,102,0.8)]" />
                )}
                
                <Icon size={18} className={cn("shrink-0 transition-transform duration-300 group-hover/item:scale-110", isActive && "text-whatsapp")} />
                
                <span className="text-xs font-semibold opacity-0 group-hover/dock:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Dock Bottom: Actions */}
        <div className="flex flex-col gap-1 border-t border-border pt-4">
          
          {/* Login Link */}
          <Link
            href="/login"
            className="flex items-center gap-3 p-3 rounded-2xl text-muted-foreground hover:text-foreground dark:hover:bg-secondary hover:bg-secondary transition-all group/login"
          >
            <LogIn size={18} className="shrink-0 group-hover/login:translate-x-0.5 transition-transform" />
            <span className="text-xs font-semibold opacity-0 group-hover/dock:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Login
            </span>
          </Link>

          {/* Book Demo Action */}
          <Link
            href="/book-demo"
            className="flex items-center gap-3 p-3 rounded-2xl text-muted-foreground hover:text-foreground dark:hover:bg-secondary hover:bg-secondary transition-all group/demo"
          >
            <Calendar size={18} className="shrink-0 group-hover/demo:rotate-3 transition-transform" />
            <span className="text-xs font-semibold opacity-0 group-hover/dock:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Book Demo
            </span>
          </Link>

          {/* Launch Store Button */}
          <Link
            href="/signup"
            className="flex items-center gap-3 p-3 rounded-2xl bg-whatsapp text-black hover:bg-[#20bd5a] transition-all shadow-[0_4px_12px_rgba(37,211,102,0.2)] group/launch"
          >
            <Rocket size={18} className="shrink-0 group-hover/launch:-translate-y-0.5 group-hover/launch:translate-x-0.5 transition-transform" />
            <span className="text-xs font-bold opacity-0 group-hover/dock:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Launch Store
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
export default Header;
