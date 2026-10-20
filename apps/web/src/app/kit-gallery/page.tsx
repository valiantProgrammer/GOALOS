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
  QuestCard,
  DifficultyChip,
  StatusChip,
  Tabs,
  ArtPanel,
} from "@/components/ui";
import { HunterRank, TaskDifficulty, TaskStatus } from "@goalos/types";
import { ArrowLeft, Sparkles, Layers } from "lucide-react";

export default function KitGalleryPage() {
  const [activeTab, setActiveTab] = useState("buttons");
  const [str, setStr] = useState(28);

  const ranks: HunterRank[] = ["E", "D", "C", "B", "A", "S", "National"];
  const difficulties: TaskDifficulty[] = ["easy", "medium", "hard", "hardcore"];
  const statuses: TaskStatus[] = ["completed", "in_progress", "start", "locked"];

  return (
    <div className="flex h-screen overflow-hidden bg-[#050814] text-[#f8fafc]">
      <SidebarNav className="hidden md:flex shrink-0" />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar className="shrink-0" />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8 pb-24 md:pb-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-[#00d2ff] font-hud font-bold tracking-wider hover:underline"
              >
                <ArrowLeft size={14} /> BACK TO SYSTEM
              </Link>
              <h1 className="font-heading text-2xl lg:text-3xl font-black text-white flex items-center gap-2.5">
                <Layers className="text-[#00d2ff]" size={28} />
                SHARED COMPONENT KIT GALLERY
              </h1>
              <p className="text-xs text-[#94a3b8]">
                Visual design system tokens & components extracted directly from the canonical mockups.
              </p>
            </div>
          </div>

          {/* Section: Panels & Surfaces */}
          <section className="space-y-3">
            <h2 className="font-hud text-xs font-bold text-[#00d2ff] tracking-[0.2em] uppercase">
              01 • HUD PANELS & GLASS SURFACES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <HudPanel variant="default" className="p-5">
                <span className="text-xs font-hud font-bold text-[#94a3b8] uppercase">Default Panel</span>
                <p className="text-sm text-[#f8fafc] mt-1 font-semibold">Background #0a1224 with 1px #142852 border</p>
              </HudPanel>
              <HudPanel variant="surface" className="p-5">
                <span className="text-xs font-hud font-bold text-[#94a3b8] uppercase">Elevated Surface</span>
                <p className="text-sm text-[#f8fafc] mt-1 font-semibold">Background #0d1933 with #1a3366 border</p>
              </HudPanel>
              <HudPanel variant="glass" glow className="p-5">
                <span className="text-xs font-hud font-bold text-[#00d2ff] uppercase">Glow Glass Panel</span>
                <p className="text-sm text-[#f8fafc] mt-1 font-semibold">Backdrop blur with neon cyan shadow</p>
              </HudPanel>
            </div>
          </section>

          {/* Section: System Buttons */}
          <section className="space-y-3">
            <h2 className="font-hud text-xs font-bold text-[#00d2ff] tracking-[0.2em] uppercase">
              02 • SYSTEM BUTTONS
            </h2>
            <HudPanel className="p-6">
              <div className="flex flex-wrap items-center gap-4">
                <SystemButton variant="primary">Desktop Primary (Blue)</SystemButton>
                <SystemButton variant="gradient">Mobile Primary (Gradient)</SystemButton>
                <SystemButton variant="secondary">Secondary Dark</SystemButton>
                <SystemButton variant="outline">Outline Cyan</SystemButton>
                <SystemButton variant="danger">Danger Red</SystemButton>
                <SystemButton variant="primary" glow>Glowing Primary</SystemButton>
              </div>
            </HudPanel>
          </section>

          {/* Section: Ranks & Badges */}
          <section className="space-y-3">
            <h2 className="font-hud text-xs font-bold text-[#00d2ff] tracking-[0.2em] uppercase">
              03 • RANK TIERS & BADGES
            </h2>
            <HudPanel className="p-6">
              <div className="flex flex-wrap items-center gap-3">
                {ranks.map((r) => (
                  <RankBadge key={r} rank={r} size="md" />
                ))}
              </div>
            </HudPanel>
          </section>

          {/* Section: Chips (Difficulty & Status) */}
          <section className="space-y-3">
            <h2 className="font-hud text-xs font-bold text-[#00d2ff] tracking-[0.2em] uppercase">
              04 • DIFFICULTY & STATUS CHIPS
            </h2>
            <HudPanel className="p-6 space-y-4">
              <div>
                <span className="text-xs font-hud text-[#94a3b8] block mb-2 font-bold uppercase">Difficulty Tiers</span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {difficulties.map((d) => (
                    <DifficultyChip key={d} difficulty={d} />
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-[#142852]">
                <span className="text-xs font-hud text-[#94a3b8] block mb-2 font-bold uppercase">Task Statuses</span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {statuses.map((s) => (
                    <StatusChip key={s} status={s} />
                  ))}
                </div>
              </div>
            </HudPanel>
          </section>

          {/* Section: Progression XP Bars */}
          <section className="space-y-3">
            <h2 className="font-hud text-xs font-bold text-[#00d2ff] tracking-[0.2em] uppercase">
              05 • XP PROGRESSION BARS
            </h2>
            <HudPanel className="p-6 space-y-4">
              <XpBar level={32} currentXp={2430} nextLevelXp={5000} />
              <XpBar level={5} currentXp={280} nextLevelXp={300} />
              <XpBar level={100} currentXp={8500} nextLevelXp={10000} />
            </HudPanel>
          </section>

          {/* Section: Attribute Bars */}
          <section className="space-y-3">
            <h2 className="font-hud text-xs font-bold text-[#00d2ff] tracking-[0.2em] uppercase">
              06 • HUNTER ATTRIBUTES
            </h2>
            <HudPanel className="p-6 max-w-xl space-y-2">
              <StatBar
                label="STR"
                fullLabel="Strength"
                value={str}
                canIncrease
                onIncrease={() => setStr((v) => v + 1)}
              />
              <StatBar label="AGI" fullLabel="Agility" value={24} />
              <StatBar label="INT" fullLabel="Intelligence" value={20} />
              <StatBar label="VIT" fullLabel="Vitality" value={26} />
              <StatBar label="LUK" fullLabel="Luck" value={22} />
            </HudPanel>
          </section>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
