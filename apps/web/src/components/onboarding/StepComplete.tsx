import React from "react";
import { Check, Crown } from "lucide-react";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export function StepComplete() {
  const {
    hunterName,
    interests,
    theme,
    notificationsEnabled,
  } = useOnboardingStore();

  const summaryRows = [
    {
      title: "Profile Created",
      detail: hunterName || "Rupayan",
      isBlue: true,
    },
    {
      title: "Goals & Interests Set",
      detail: `${interests.length} interests selected`,
      isBlue: false,
    },
    {
      title: "Schedule Configured",
      detail: "Daily routine set",
      isBlue: false,
    },
    {
      title: "Preferences Saved",
      detail: `${theme === "dark" ? "Dark theme" : theme === "light" ? "Light theme" : "System theme"}, notifications ${
        notificationsEnabled ? "on" : "off"
      }`,
      isBlue: false,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center h-full max-w-[460px] mx-auto py-2">
      {/* Glowing Blue Crown Emblem in Hexagonal/Circular Ring with Floating Shards */}
      <div className="relative mb-4 flex items-center justify-center">
        {/* Ambient Ring Glow */}
        <div className="absolute w-28 h-28 rounded-full bg-[#3b82f6]/25 blur-xl pointer-events-none animate-pulse" />

        {/* Outer Ring with Shards */}
        <div className="relative w-20 h-20 rounded-full border-2 border-[#38bdf8]/50 flex items-center justify-center bg-[#0d1c3e]/80 shadow-[0_0_25px_rgba(56,189,248,0.45)]">
          {/* Floating glowing shards (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 80 80">
            <polygon points="40,2 43,8 37,8" fill="#38bdf8" opacity="0.9" />
            <polygon points="78,40 72,43 72,37" fill="#38bdf8" opacity="0.9" />
            <polygon points="40,78 37,72 43,72" fill="#38bdf8" opacity="0.9" />
            <polygon points="2,40 8,37 8,43" fill="#38bdf8" opacity="0.9" />
            <polygon points="12,12 18,14 15,19" fill="#60a5fa" opacity="0.8" />
            <polygon points="68,12 65,19 62,14" fill="#60a5fa" opacity="0.8" />
            <polygon points="12,68 15,61 18,66" fill="#60a5fa" opacity="0.8" />
            <polygon points="68,68 62,66 65,61" fill="#60a5fa" opacity="0.8" />
          </svg>

          {/* Central Blue Crown */}
          <Crown className="w-9 h-9 text-[#38bdf8] fill-[#38bdf8]/20 drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
        </div>
      </div>

      {/* Title & Subtitle */}
      <h1 className="text-2xl sm:text-[26px] font-bold text-white tracking-wide">
        You&apos;re All Set!
      </h1>
      <p className="text-[13px] text-[#8fa3c7] mt-1">
        Your hunter profile is ready.
      </p>

      {/* Summary Card with 4 rows */}
      <div className="w-full bg-[#0a1224]/90 border border-[#233b6e]/40 rounded-xl p-3.5 mt-5 flex flex-col gap-2.5 text-left">
        {summaryRows.map((row, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between text-[12px] py-1 border-b border-[#1b2d54]/30 last:border-b-0"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  row.isBlue
                    ? "bg-[#2563eb] text-white shadow-[0_0_8px_rgba(37,99,235,0.8)]"
                    : "bg-[#10b981] text-white shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                }`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="font-semibold text-white tracking-wide">
                {row.title}
              </span>
            </div>
            <span className="text-[#869ab8] font-medium">{row.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
