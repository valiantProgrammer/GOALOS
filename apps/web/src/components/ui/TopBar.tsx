"use client";

import React from "react";
import clsx from "clsx";
import { Search, Bell, Flame } from "lucide-react";
import Link from "next/link";
import { DEMO_HUNTER } from "@goalos/config";

export interface TopBarProps {
  hunterName?: string;
  level?: number;
  streak?: number;
  className?: string;
  searchPlaceholder?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  hunterName = DEMO_HUNTER.hunterName,
  level = DEMO_HUNTER.level,
  streak = DEMO_HUNTER.currentStreak,
  className,
  searchPlaceholder = "Search quests, habits, or commands... (Ctrl+K)",
}) => {
  return (
    <header
      className={clsx(
        "h-16 px-6 border-b border-[#142852] bg-[#070d1c]/80 backdrop-blur-md flex items-center justify-between gap-4 select-none",
        className
      )}
    >
      {/* Global Search Bar */}
      <div className="flex-1 max-w-md relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full bg-[#0a1224] border border-[#142852] focus:border-[#00d2ff] rounded-xl pl-9 pr-4 py-2 text-xs text-[#f8fafc] placeholder-[#64748b] outline-none transition-colors"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3.5">
        {/* Streak Flame Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f5a623]/10 border border-[#f5a623]/30 text-[#f5a623] text-xs font-bold font-hud">
          <Flame size={15} className="fill-[#f5a623]" />
          <span>{streak} DAYS</span>
        </div>

        {/* Notifications */}
        <Link
          href="/notifications"
          className="w-9 h-9 rounded-xl bg-[#0a1224] border border-[#142852] hover:border-[#204899] flex items-center justify-center text-[#94a3b8] hover:text-[#00d2ff] transition-colors relative"
        >
          <Bell size={17} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ef4444] shadow-[0_0_6px_#ef4444]" />
        </Link>

        {/* Hunter Chip */}
        <Link
          href="/profile"
          className="flex items-center gap-2.5 pl-2 pr-3.5 py-1 rounded-xl bg-[#0a1224] border border-[#142852] hover:border-[#00d2ff]/50 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b6cf6] to-[#00d2ff] flex items-center justify-center font-heading font-black text-xs text-white shadow-[0_0_8px_rgba(0,210,255,0.4)]">
            {hunterName[0]}
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-white leading-tight">{hunterName}</div>
            <div className="text-[10px] font-hud font-bold text-[#00d2ff] tracking-wider">
              LV. {level}
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};
