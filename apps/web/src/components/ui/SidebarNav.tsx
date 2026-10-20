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
  Box,
} from "lucide-react";
import Image from "next/image";
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
  { label: "Shop", href: "/shop", icon: Box },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Admin", href: "/admin", icon: Shield, adminOnly: true },
];

export interface SidebarNavProps {
  isAdmin?: boolean;
  className?: string;
  activeRoute?: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ isAdmin = false, className, activeRoute }) => {
  const currentPathname = usePathname();
  const pathname = activeRoute || currentPathname;

  return (
    <aside
      className={clsx(
        "w-60 h-screen bg-[rgba(5,11,26,0.78)] backdrop-blur-[14px] border-r border-[rgba(59,130,246,0.18)] flex flex-col justify-between py-5 px-4 select-none shrink-0 overflow-y-auto",
        className
      )}
    >
      <div>
        {/* Top Window Dots */}

        {/* Brand Header */}
        <div className="px-1 mb-6">
          <Link href="/dashboard" className="block">
            <h1 className="font-heading text-2xl font-black tracking-wider text-[#00d2ff] flex items-center gap-1.5 drop-shadow-[0_0_15px_rgba(0,210,255,0.7)]">
              GOALOS
            </h1>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            if (item.adminOnly && !isAdmin) return null;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group",
                  isActive
                    ? "bg-[#1d4ed8] text-white shadow-[0_0_18px_rgba(29,78,216,0.65)] font-bold"
                    : "text-[#8fa3c7] hover:text-white hover:bg-[#0c1a38]"
                )}
              >
                <Icon
                  size={18}
                  className={clsx(
                    "transition-colors",
                    isActive ? "text-white" : "text-[#7084a8] group-hover:text-white"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
