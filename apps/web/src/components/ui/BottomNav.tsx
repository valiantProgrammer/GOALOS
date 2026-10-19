"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Home, CheckSquare, Flame, Clock, MoreHorizontal } from "lucide-react";

export interface BottomNavProps {
  className?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ className }) => {
  const pathname = usePathname();

  const items = [
    { label: "Home", href: "/dashboard", icon: Home },
    { label: "Quests", href: "/quests", icon: CheckSquare },
    { label: "Habits", href: "/habits", icon: Flame },
    { label: "Focus", href: "/focus", icon: Clock },
    { label: "More", href: "/more", icon: MoreHorizontal },
  ];

  return (
    <nav
      className={clsx(
        "fixed bottom-0 left-0 right-0 h-16 bg-[#070d1c]/95 backdrop-blur-lg border-t border-[#142852] flex items-center justify-around px-2 z-50 md:hidden",
        className
      )}
    >
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex flex-col items-center justify-center gap-1 w-14 py-1 transition-all select-none",
              isActive ? "text-[#00d2ff]" : "text-[#64748b] hover:text-[#94a3b8]"
            )}
          >
            <Icon size={20} className={clsx(isActive && "drop-shadow-[0_0_8px_#00d2ff]")} />
            <span className="text-[10px] font-semibold tracking-wider font-hud uppercase">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
