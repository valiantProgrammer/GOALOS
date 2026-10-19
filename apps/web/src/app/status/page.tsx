"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SidebarNav,
  TopBar,
  BottomNav,
  HudPanel,
  SystemButton,
  XpBar,
  RankBadge,
  StatBar,
} from "@/components/ui";
import { DEMO_HUNTER } from "@goalos/config";
import { Shield, Zap, Sparkles, Award, UserCheck, Flame } from "lucide-react";

export default function HunterStatusPage() {
  const [activeTab, setActiveTab] = useState("Attributes");
  const [hunter, setHunter] = useState(DEMO_HUNTER);

  const handleIncrease = (statKey: keyof typeof hunter.stats) => {
    if (hunter.unspentPoints <= 0) return;
    setHunter((prev) => ({
      ...prev,
      unspentPoints: prev.unspentPoints - 1,
      stats: {
        ...prev.stats,
        [statKey]: prev.stats[statKey] + 1,
      },
    }));
  };

  const tabs = ["Overview", "Attributes", "Stats History", "Titles"];

  return (
    <div className="flex min-h-screen bg-[#050814] text-[#f8fafc]">
      <SidebarNav className="hidden md:flex" />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="flex-1 p-6 lg:p-8 pb-24 md:pb-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <h1 className="font-heading text-2xl lg:text-3xl font-black text-white">
              Hunter Status & Attributes
            </h1>
            <p className="text-xs text-[#94a3b8] mt-1 font-medium">
              Allocate earned stat points to increase task performance and resistance.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0a1224] border border-[#142852] w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-[#3b6cf6] text-white shadow-[0_0_10px_rgba(59,108,246,0.4)]"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Status Card, Attributes, Profile Table */}
            <div className="lg:col-span-8 space-y-6">
              <HudPanel className="p-6 sm:p-8 space-y-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                {/* Hunter Portrait Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#142852]">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3b6cf6] via-[#1d4ed8] to-[#00d2ff] flex items-center justify-center font-heading text-3xl font-black text-white shadow-[0_0_25px_rgba(0,210,255,0.4)] border border-[#00d2ff]/40">
                      {hunter.hunterName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="font-heading text-2xl font-black text-white">
                          Lv. {hunter.level}
                        </h2>
                        <RankBadge rank={hunter.rank} size="sm" />
                      </div>
                      <p className="font-hud text-xs text-[#00d2ff] font-bold tracking-widest uppercase mt-1">
                        {hunter.class} Hunter • {hunter.equippedTitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[#050814] border border-[#142852] text-center">
                      <div className="text-xs font-hud text-[#94a3b8] uppercase">Unspent Points</div>
                      <div className="text-xl font-heading font-black text-[#00d2ff]">
                        {hunter.unspentPoints}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#050814] border border-[#142852] text-center">
                      <div className="text-xs font-hud text-[#94a3b8] uppercase">Skill Points</div>
                      <div className="text-xl font-heading font-black text-[#a78bfa]">
                        {hunter.skillPoints}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Level XP Bar */}
                <XpBar
                  currentXp={hunter.currentXp}
                  nextLevelXp={hunter.nextLevelXp}
                  showLabel
                />

                {/* 5 Core Attributes Grid with (+) Point Buttons */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                      Hunter Attributes
                    </h3>
                    {hunter.unspentPoints > 0 && (
                      <span className="text-xs text-[#00d2ff] font-bold font-hud animate-pulse">
                        ● {hunter.unspentPoints} STAT POINTS AVAILABLE
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 bg-[#050814] p-4 rounded-xl border border-[#142852]">
                    <StatBar
                      label="STR"
                      fullLabel="Strength"
                      value={hunter.stats.strength}
                      canIncrease={hunter.unspentPoints > 0}
                      onIncrease={() => handleIncrease("strength")}
                    />
                    <StatBar
                      label="AGI"
                      fullLabel="Agility"
                      value={hunter.stats.agility}
                      canIncrease={hunter.unspentPoints > 0}
                      onIncrease={() => handleIncrease("agility")}
                    />
                    <StatBar
                      label="INT"
                      fullLabel="Intelligence"
                      value={hunter.stats.intelligence}
                      canIncrease={hunter.unspentPoints > 0}
                      onIncrease={() => handleIncrease("intelligence")}
                    />
                    <StatBar
                      label="VIT"
                      fullLabel="Vitality"
                      value={hunter.stats.vitality}
                      canIncrease={hunter.unspentPoints > 0}
                      onIncrease={() => handleIncrease("vitality")}
                    />
                    <StatBar
                      label="LUK"
                      fullLabel="Luck"
                      value={hunter.stats.luck}
                      canIncrease={hunter.unspentPoints > 0}
                      onIncrease={() => handleIncrease("luck")}
                    />
                  </div>
                </div>

                {/* Profile Details Table matching DM-14 */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                    Hunter Profile
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-[#050814] p-4 rounded-xl border border-[#142852] text-xs">
                    <div>
                      <span className="text-[#64748b] font-hud uppercase block text-[10px]">Name</span>
                      <span className="font-bold text-white mt-0.5 block">{hunter.hunterName}</span>
                    </div>
                    <div>
                      <span className="text-[#64748b] font-hud uppercase block text-[10px]">Class</span>
                      <span className="font-bold text-[#00d2ff] mt-0.5 block capitalize">{hunter.class}</span>
                    </div>
                    <div>
                      <span className="text-[#64748b] font-hud uppercase block text-[10px]">Title</span>
                      <span className="font-bold text-white mt-0.5 block">{hunter.equippedTitle}</span>
                    </div>
                    <div>
                      <span className="text-[#64748b] font-hud uppercase block text-[10px]">Guild</span>
                      <span className="font-bold text-white mt-0.5 block">Solo</span>
                    </div>
                    <div>
                      <span className="text-[#64748b] font-hud uppercase block text-[10px]">Joined</span>
                      <span className="font-bold text-white mt-0.5 block">Oct 10, 2026</span>
                    </div>
                  </div>
                </div>
              </HudPanel>
            </div>

            {/* Right 4 Cols: Decorative Hunter Silhouette matching DM-14 */}
            <div className="lg:col-span-4">
              <div className="h-[520px] rounded-2xl overflow-hidden border border-[#142852] bg-gradient-to-b from-[#0a1835] via-[#060e20] to-[#02050e] relative flex flex-col justify-end p-6 shadow-[0_0_25px_rgba(0,210,255,0.15)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,210,255,0.25),_transparent)]" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-[#00d2ff]/20 blur-3xl pointer-events-none" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-64 border border-[#00d2ff]/30 rounded-t-full flex items-center justify-center">
                    <span className="font-heading text-5xl text-[#00d2ff] opacity-30">🛡</span>
                  </div>
                </div>

                <div className="relative z-10 text-right">
                  <h3 className="font-heading text-lg font-black text-white uppercase tracking-wider">
                    A STRONGER YOU
                  </h3>
                  <h3 className="font-heading text-lg font-black text-[#00d2ff] uppercase tracking-wider">
                    BUILDS A BRIGHTER TOMORROW
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
