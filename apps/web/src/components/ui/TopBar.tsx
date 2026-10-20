import React from "react";
import clsx from "clsx";
import { Search, Lock, Minus, Square, X } from "lucide-react";
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
  hunterName = "Hunter",
  level = 32,
  className,
  searchPlaceholder = "Search quests, habits, or commands...",
}) => {
  return (
    <header
      className={clsx(
        "h-16 px-6 border-b border-[rgba(59,130,246,0.15)] bg-[rgba(5,11,26,0.65)] backdrop-blur-[12px] flex items-center justify-between gap-4 select-none shrink-0 z-20",
        className
      )}
    >
      {/* Global Search Bar (Pill style matching mockup) */}
      <div className="flex-1 max-w-md relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full bg-[rgba(5,10,24,0.65)] border border-[rgba(59,130,246,0.22)] focus:border-[#00d2ff] rounded-full pl-9 pr-4 py-2 text-xs text-[#f8fafc] placeholder-[#64748b] outline-none transition-colors"
        />
      </div>

      {/* Right Actions: Profile Chip + Window Controls */}
      <div className="flex items-center gap-4">
        {/* Hunter Chip */}
        <Link
          href="/profile"
          className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#00d2ff] shadow-[0_0_10px_rgba(0,210,255,0.5)] shrink-0 bg-[#040814]">
            <img
              src="/hunter-avatar.png"
              alt="Hunter Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-white leading-tight group-hover:text-[#00d2ff] transition-colors">
              {hunterName}
            </div>
            <div className="text-[11px] font-bold text-[#00d2ff] tracking-wide">
              Lv. {level}
            </div>
          </div>
        </Link>


      </div>
    </header>
  );
};
