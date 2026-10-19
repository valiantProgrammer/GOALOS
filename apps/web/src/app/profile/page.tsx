"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SidebarNav,
  TopBar,
  BottomNav,
  HudPanel,
  SystemButton,
  RankBadge,
  XpBar,
  StatBar,
} from "@/components/ui";
import { DEMO_HUNTER } from "@goalos/config";
import {
  Shield,
  Award,
  Zap,
  Flame,
  CheckCircle,
  Share2,
  Edit3,
  Calendar,
} from "lucide-react";

export default function HunterProfilePage() {
  const hunter = DEMO_HUNTER;

  return (
    <div className="flex min-h-screen bg-[#050814] text-[#f8fafc]">
      <SidebarNav className="hidden md:flex" />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="flex-1 p-6 lg:p-8 pb-24 md:pb-8 space-y-6 max-w-5xl mx-auto w-full">
          <div>
            <h1 className="font-heading text-2xl lg:text-3xl font-black text-white">
              Hunter Profile
            </h1>
            <p className="text-xs text-[#94a3b8] mt-1 font-medium">
              Public hunter card and verified credentials.
            </p>
          </div>

          <HudPanel className="p-8 space-y-6 shadow-[0_0_35px_rgba(0,0,0,0.6)]">
            {/* Header / Hero Banner */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#142852]">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#3b6cf6] via-[#1d4ed8] to-[#00d2ff] flex items-center justify-center font-heading text-4xl font-black text-white shadow-[0_0_30px_rgba(0,210,255,0.4)] border-2 border-[#00d2ff]">
                {hunter.hunterName[0]}
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <h2 className="text-2xl font-black text-white">{hunter.hunterName}</h2>
                  <RankBadge rank={hunter.rank} size="md" />
                </div>
                <p className="font-hud text-sm text-[#00d2ff] font-bold tracking-wider uppercase">
                  {hunter.class} Hunter • {hunter.equippedTitle}
                </p>
                <p className="text-xs text-[#94a3b8] italic">
                  &ldquo;{hunter.motto}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link href="/account">
                  <SystemButton variant="secondary" size="sm" className="gap-1.5">
                    <Edit3 size={14} /> Edit Profile
                  </SystemButton>
                </Link>
              </div>
            </div>

            {/* Level & XP Bar */}
            <XpBar
              level={hunter.level}
              currentXp={hunter.currentXp}
              nextLevelXp={hunter.nextLevelXp}
              showLabel
            />

            {/* Lifetime Stats & Consistency Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#050814] border border-[#142852] text-center">
                <div className="text-xs font-hud text-[#94a3b8] uppercase">Lifetime XP</div>
                <div className="font-heading text-xl font-black text-white mt-1">
                  {hunter.lifetimeXp.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#050814] border border-[#142852] text-center">
                <div className="text-xs font-hud text-[#94a3b8] uppercase">Current Streak</div>
                <div className="font-heading text-xl font-black text-[#f5a623] mt-1 flex items-center justify-center gap-1">
                  <Flame size={18} className="fill-[#f5a623]" /> {hunter.currentStreak} Days
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#050814] border border-[#142852] text-center">
                <div className="text-xs font-hud text-[#94a3b8] uppercase">Best Streak</div>
                <div className="font-heading text-xl font-black text-[#00d2ff] mt-1">
                  {hunter.bestStreak} Days
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#050814] border border-[#142852] text-center">
                <div className="text-xs font-hud text-[#94a3b8] uppercase">Coin Vault</div>
                <div className="font-heading text-xl font-black text-[#f5a623] mt-1">
                  🪙 {hunter.coins.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Attributes Matrix */}
            <div className="space-y-3 pt-2">
              <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                Hunter Attributes (Game Mechanics)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#050814] p-5 rounded-xl border border-[#142852]">
                <StatBar label="STR" fullLabel="Strength" value={hunter.stats.strength} />
                <StatBar label="AGI" fullLabel="Agility" value={hunter.stats.agility} />
                <StatBar label="INT" fullLabel="Intelligence" value={hunter.stats.intelligence} />
                <StatBar label="VIT" fullLabel="Vitality" value={hunter.stats.vitality} />
                <StatBar label="LUK" fullLabel="Luck" value={hunter.stats.luck} />
              </div>
            </div>
          </HudPanel>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
