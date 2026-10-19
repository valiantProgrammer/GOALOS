import React from "react";
import clsx from "clsx";
import { HunterRank } from "@goalos/types";

export interface RankBadgeProps {
  rank: HunterRank;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const RankBadge: React.FC<RankBadgeProps> = ({ rank, size = "md", className }) => {
  const rankColors: Record<HunterRank, { bg: string; text: string; border: string; glow: string }> = {
    E: { bg: "bg-[#1e293b]/50", text: "text-[#94a3b8]", border: "border-[#475569]", glow: "" },
    D: { bg: "bg-[#0c1e40]/70", text: "text-[#60a5fa]", border: "border-[#2563eb]/50", glow: "shadow-[0_0_12px_rgba(37,99,235,0.3)]" },
    C: { bg: "bg-[#064e3b]/50", text: "text-[#34d399]", border: "border-[#10b981]/50", glow: "shadow-[0_0_12px_rgba(16,185,129,0.3)]" },
    B: { bg: "bg-[#1e1b4b]/60", text: "text-[#a78bfa]", border: "border-[#8b5cf6]/50", glow: "shadow-[0_0_15px_rgba(139,92,246,0.35)]" },
    A: { bg: "bg-[#4c0519]/60", text: "text-[#f87171]", border: "border-[#ef4444]/50", glow: "shadow-[0_0_15px_rgba(239,68,68,0.35)]" },
    S: { bg: "bg-[#451a03]/70", text: "text-[#fbbf24]", border: "border-[#f59e0b]/60", glow: "shadow-[0_0_20px_rgba(245,158,11,0.5)]" },
    National: { bg: "bg-gradient-to-r from-[#451a03] to-[#4c0519]", text: "text-[#fef08a]", border: "border-[#fde047]", glow: "shadow-[0_0_25px_rgba(253,224,71,0.6)]" },
  };

  const current = rankColors[rank] || rankColors.E;

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-bold",
    md: "px-3 py-1 text-sm font-bold",
    lg: "px-4 py-1.5 text-base font-extrabold tracking-wider",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-lg border font-hud uppercase tracking-wider",
        current.bg,
        current.text,
        current.border,
        current.glow,
        sizeStyles[size],
        className
      )}
    >
      {rank}-RANK
    </span>
  );
};
