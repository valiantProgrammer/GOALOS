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
  showBrandLogo?: boolean;
  onLogoClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  hunterName = "Hunter",
  level = 32,
  className,
  searchPlaceholder = "Search quests, habits, or commands...",
  showBrandLogo = false,
  onLogoClick,
}) => {
  return (
    <header
      className={clsx(
        "h-16 px-6 border-b border-[rgba(59,130,246,0.15)] bg-[rgba(5,11,26,0.65)] backdrop-blur-[12px] flex items-center justify-between gap-4 select-none shrink-0 z-20",
        className
      )}
    >
      {/* Brand Logo on Left (if explicitly requested) */}
      {showBrandLogo && (
        <button
          type="button"
          onClick={onLogoClick}
          aria-label="Navigation Menu"
          className="cursor-pointer group flex items-center justify-center shrink-0 hover:brightness-125 transition-all outline-none"
        >
          <svg
            viewBox="0 0 40 40"
            className="w-9 h-9 text-[#00d2ff] drop-shadow-[0_0_12px_rgba(0,210,255,0.9)] group-hover:scale-105 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M28 8 C22 4, 12 6, 8 14 C4 22, 6 32, 14 36 C22 40, 32 36, 35 27 C37 21, 35 15, 30 12 C24 8, 16 11, 15 18 C14 24, 18 28, 24 27 C28 26, 30 22, 28 18" />
          </svg>
        </button>
      )}

      {/* Global Search Bar (Pill style matching mockup) */}
      <div className="flex-1 max-w-xl relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full bg-[rgba(5,10,24,0.65)] border border-[rgba(59,130,246,0.22)] focus:border-[#00d2ff] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#f8fafc] placeholder-[#64748b] outline-none transition-colors shadow-inner"
        />
      </div>

      {/* Right Actions: Profile Chip */}
      <div className="flex items-center gap-4">
        {/* Hunter Chip: Text on Left, Avatar on Right */}
        <Link
          href="/profile"
          className="flex items-center gap-3 py-1 rounded-full transition-all cursor-pointer group"
        >
          <div className="text-right">
            <div className="text-xs font-bold text-white leading-tight group-hover:text-[#00d2ff] transition-colors">
              {hunterName}
            </div>
            <div className="text-[11px] font-bold text-[#00d2ff] tracking-wide mt-0.5">
              Lv. {level}
            </div>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#00d2ff] shadow-[0_0_12px_rgba(0,210,255,0.8)] shrink-0 bg-[#040814]">
            <img
              src="/hunter-avatar.png"
              alt="Hunter Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>
    </header>
  );
};
