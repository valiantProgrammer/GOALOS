"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Home,
  CheckSquare,
  Flame,
  Calendar,
  Target,
  Clock,
  BarChart2,
  Users,
  ShoppingBag,
  Settings,
  Shield,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Quests", href: "/quests", icon: CheckSquare },
  { label: "Habits", href: "/habits", icon: Flame },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "Goals", href: "/goals", icon: Target },
  { label: "Focus", href: "/focus", icon: Clock },
  { label: "Analytics", href: "/analytics", icon: BarChart2 },
  { label: "Community", href: "/community", icon: Users },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Admin", href: "/admin", icon: Shield, adminOnly: true },
];

export interface SidebarNavProps {
  isAdmin?: boolean;
  className?: string;
  activeRoute?: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ isAdmin = true, className, activeRoute }) => {
  const currentPathname = usePathname();
  const pathname = activeRoute || currentPathname;

  return (
    <aside
      className={clsx(
        "w-60 h-screen bg-[#070d1c] border-r border-[#142852] flex flex-col justify-between py-6 px-3.5 select-none shrink-0",
        className
      )}
    >
      <div>
        {/* Brand Header */}
        <div className="px-3 mb-8">
          <Link href="/dashboard" className="block">
            <h1 className="font-heading text-2xl font-black tracking-wider text-white flex items-center gap-1">
              GOALOS
              <span className="w-2 h-2 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
            </h1>
            <p className="font-hud text-[10px] tracking-[0.25em] text-[#00d2ff] uppercase mt-0.5 font-bold">
              Level Up Your Life
            </p>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            if (item.adminOnly && !isAdmin) return null;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group",
                  isActive
                    ? "bg-[#132c66] text-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.2)] border border-[#204899]/60 font-bold"
                    : "text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#0d1933]"
                )}
              >
                <Icon
                  size={18}
                  className={clsx(
                    "transition-colors",
                    isActive ? "text-[#00d2ff]" : "text-[#64748b] group-hover:text-[#94a3b8]"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status strip */}
      <div className="px-3 py-3 rounded-xl bg-[#0a1224] border border-[#142852] text-xs">
        <div className="flex items-center justify-between text-[#94a3b8]">
          <span className="font-hud text-[11px] tracking-wider text-[#00d2ff]">SYSTEM v1.0</span>
          <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]" />
        </div>
        <div className="text-[11px] text-[#64748b] mt-1">Hunter Sync Active</div>
      </div>
    </aside>
  );
};
