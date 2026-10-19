"use client";

import React, { useState } from "react";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { ArtPanel } from "@/components/ui/ArtPanel";
import { HudPanel } from "@/components/ui/HudPanel";
import { SystemButton } from "@/components/ui/SystemButton";

const TABS = ["Summary", "Achievements", "Goals", "Habits", "Focus", "Insights"];

const KEY_ACHIEVEMENTS = [
  { id: "1", title: "Completed 7 Day Streak", desc: "Maintained active workout habit", icon: "🔥" },
  { id: "2", title: "Finished Study DSA Module", desc: "Completed all binary tree and graph tasks", icon: "📖" },
  { id: "3", title: "Reached Level 32", desc: "+500 XP bonus awarded", icon: "⭐" },
  { id: "4", title: "Top 10% Productivity", desc: "Compared to last month activity", icon: "🏆" },
];

export default function WeeklyReviewPage() {
  const [activeTab, setActiveTab] = useState("Summary");
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="flex h-screen bg-[#050814] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/review" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopBar searchPlaceholder="Search weekly review, summary..." />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Review Area */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Header with Navigation and AI Trigger */}
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-white tracking-wide">
                  Weekly Review
                </h1>
                <div className="flex items-center gap-2 bg-[#0a1224] px-3 py-1.5 rounded-lg border border-[#142852]">
                  <button className="text-xs text-slate-400 hover:text-white">&lt;</button>
                  <span className="text-xs font-semibold text-white">Oct 14 - 20, 2026</span>
                  <button className="text-xs text-slate-400 hover:text-white">&gt;</button>
                </div>
              </div>

              <button
                onClick={() => setIsGenerating(!isGenerating)}
                className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white px-4 py-2 rounded-lg text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all flex items-center gap-2"
              >
                <span>✨</span>
                <span>{isGenerating ? "Analyzing with AI..." : "Generate with AI"}</span>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 bg-[#0a1224] p-1.5 rounded-lg border border-[#142852] w-fit flex-wrap">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wider transition-all ${
                    activeTab === tab
                      ? "bg-[#3b6cf6] text-white shadow-[0_0_12px_rgba(59,108,246,0.5)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Hero Celebration Banner */}
            <HudPanel className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#3b6cf6] flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_15px_rgba(59,108,246,0.4)]">
                  R
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Great Week, Hunter!</h2>
                  <p className="text-xs text-slate-400">
                    You were consistent and completed 21 out of 28 tasks.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#050814] p-3.5 rounded-xl border border-[#142852] text-center">
                  <div className="text-lg font-bold text-white font-mono">21 / 28</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Tasks Completed</div>
                </div>
                <div className="bg-[#050814] p-3.5 rounded-xl border border-[#142852] text-center">
                  <div className="text-lg font-bold text-[#f59e0b] font-mono">12 Days</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Current Streak</div>
                </div>
                <div className="bg-[#050814] p-3.5 rounded-xl border border-[#142852] text-center">
                  <div className="text-lg font-bold text-[#00d2ff] font-mono">+2,450</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">XP Gained</div>
                </div>
                <div className="bg-[#050814] p-3.5 rounded-xl border border-[#142852] text-center">
                  <div className="text-lg font-bold text-[#10b981] font-mono">8 / 10</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Habit Score</div>
                </div>
              </div>
            </HudPanel>

            {/* Key Achievements & Focus Areas Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Key Achievements */}
              <HudPanel className="lg:col-span-7 p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Key Achievements
                </h3>
                <div className="space-y-3">
                  {KEY_ACHIEVEMENTS.map((ach) => (
                    <div
                      key={ach.id}
                      className="p-3 bg-[#050814] rounded-xl border border-[#142852] flex items-center gap-3"
                    >
                      <span className="text-2xl">{ach.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-white">{ach.title}</div>
                        <div className="text-[11px] text-slate-400">{ach.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </HudPanel>

              {/* Focus Areas & Next Week */}
              <div className="lg:col-span-5 space-y-6">
                <HudPanel className="p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Focus Areas
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Study</span>
                      <span className="font-bold text-white">45%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#050814] rounded-full overflow-hidden">
                      <div className="h-full bg-[#3b6cf6]" style={{ width: "45%" }} />
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="text-slate-300">Work</span>
                      <span className="font-bold text-white">25%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#050814] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00d2ff]" style={{ width: "25%" }} />
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="text-slate-300">Health</span>
                      <span className="font-bold text-white">15%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#050814] rounded-full overflow-hidden">
                      <div className="h-full bg-[#10b981]" style={{ width: "15%" }} />
                    </div>
                  </div>
                </HudPanel>

                <HudPanel className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white">Next Week Plan</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Complete DSA Chapter 2, maintain workout</p>
                  </div>
                  <SystemButton variant="primary" className="text-xs px-3 py-1.5">
                    Set Goals
                  </SystemButton>
                </HudPanel>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
