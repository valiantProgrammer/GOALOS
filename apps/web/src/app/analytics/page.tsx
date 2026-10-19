"use client";

import React, { useState } from "react";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { ArtPanel } from "@/components/ui/ArtPanel";
import { HudPanel } from "@/components/ui/HudPanel";

const TABS = ["Overview", "Productivity", "Habits", "Goals", "Focus", "Time", "Comparisons"];

const HABITS_HEATMAP = [
  { name: "Workout", days: [1, 1, 1, 0, 1, 1, 1] },
  { name: "Study", days: [1, 1, 1, 1, 1, 0, 1] },
  { name: "Reading", days: [0, 1, 0, 1, 1, 1, 0] },
  { name: "Meditation", days: [1, 1, 1, 1, 1, 1, 1] },
  { name: "Healthy Food", days: [1, 0, 1, 1, 0, 1, 1] },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex h-screen bg-[#050814] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/analytics" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopBar searchPlaceholder="Search analytics, progress, habits..." />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Analytics Content */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Header Controls */}
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-xl font-bold text-white tracking-wide">
                  Analytics & Progress
                </h1>
                <p className="text-xs text-slate-400 mt-1">Review your XP velocity, streak consistency, and time investment</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#0a1224] border border-[#142852] px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300">
                  Last 30 Days ▾
                </div>
              </div>
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

            {/* 4 KPI Tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <HudPanel className="p-4 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Total XP</span>
                  <span className="text-[#10b981] font-bold">+12%</span>
                </div>
                <div className="text-2xl font-bold text-white font-mono">25,450</div>
              </HudPanel>

              <HudPanel className="p-4 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Tasks Completed</span>
                  <span className="text-[#10b981] font-bold">+8%</span>
                </div>
                <div className="text-2xl font-bold text-white font-mono">186</div>
              </HudPanel>

              <HudPanel className="p-4 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Habit Streak</span>
                  <span className="text-[#10b981] font-bold">+50%</span>
                </div>
                <div className="text-2xl font-bold text-[#f59e0b] font-mono">12 Days</div>
              </HudPanel>

              <HudPanel className="p-4 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Focus Time</span>
                  <span className="text-[#10b981] font-bold">+18%</span>
                </div>
                <div className="text-2xl font-bold text-[#00d2ff] font-mono">42h 30m</div>
              </HudPanel>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* XP Progress Line Graph */}
              <HudPanel className="lg:col-span-8 p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    XP Progress
                  </h3>
                  <span className="text-xs font-bold text-[#00d2ff]">+2,450 XP this month</span>
                </div>

                {/* Stylized SVG Sparkline/Wave */}
                <div className="h-44 w-full flex items-end pt-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                    <defs>
                      <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b6cf6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3b6cf6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 130 Q 80 110 140 90 T 260 70 T 380 40 T 500 20 L 500 150 L 0 150 Z"
                      fill="url(#xpGrad)"
                    />
                    <path
                      d="M 0 130 Q 80 110 140 90 T 260 70 T 380 40 T 500 20"
                      fill="none"
                      stroke="#00d2ff"
                      strokeWidth="3"
                    />
                    <circle cx="500" cy="20" r="5" fill="#00d2ff" />
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Oct 1</span><span>Oct 7</span><span>Oct 14</span><span>Oct 21</span><span>Oct 28</span>
                </div>
              </HudPanel>

              {/* Task Completion Donut */}
              <HudPanel className="lg:col-span-4 p-5 space-y-4 flex flex-col justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Task Completion Rate
                </h3>
                <div className="flex items-center justify-center py-2">
                  <div className="relative w-32 h-32 rounded-full border-8 border-[#3b6cf6] flex items-center justify-center font-bold text-2xl text-white shadow-[0_0_20px_rgba(59,108,246,0.3)]">
                    78%
                  </div>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#3b6cf6]" /> Completed
                    </span>
                    <span className="font-bold text-white">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00d2ff]" /> In Progress
                    </span>
                    <span className="font-bold text-white">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-600" /> Not Started
                    </span>
                    <span className="font-bold text-white">7%</span>
                  </div>
                </div>
              </HudPanel>
            </div>

            {/* Bottom Row: Habit Heatmap & Time Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Habit Consistency Heatmap */}
              <HudPanel className="lg:col-span-7 p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Habit Consistency Heatmap
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-8 gap-2 text-[10px] text-slate-500 font-semibold">
                    <span>Habit</span>
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                  {HABITS_HEATMAP.map((h) => (
                    <div key={h.name} className="grid grid-cols-8 gap-2 items-center text-xs">
                      <span className="text-slate-300 font-medium truncate">{h.name}</span>
                      {h.days.map((done, i) => (
                        <div
                          key={i}
                          className={`h-6 rounded flex items-center justify-center ${
                            done
                              ? "bg-[#00d2ff]/30 border border-[#00d2ff]/60"
                              : "bg-[#070d1c] border border-[#142852]/50"
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </HudPanel>

              {/* Time Distribution */}
              <HudPanel className="lg:col-span-5 p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Time Distribution (42h 30m)
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Study DSA & Engineering</span>
                    <span className="font-bold text-white">45%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#050814] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3b6cf6]" style={{ width: "45%" }} />
                  </div>

                  <div className="flex justify-between text-slate-300 pt-1">
                    <span>Work & Projects</span>
                    <span className="font-bold text-white">25%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#050814] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00d2ff]" style={{ width: "25%" }} />
                  </div>

                  <div className="flex justify-between text-slate-300 pt-1">
                    <span>Health & Workout</span>
                    <span className="font-bold text-white">15%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#050814] rounded-full overflow-hidden">
                    <div className="h-full bg-[#10b981]" style={{ width: "15%" }} />
                  </div>

                  <div className="flex justify-between text-slate-300 pt-1">
                    <span>Personal Growth</span>
                    <span className="font-bold text-white">10%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#050814] rounded-full overflow-hidden">
                    <div className="h-full bg-[#ec4899]" style={{ width: "10%" }} />
                  </div>
                </div>
              </HudPanel>
            </div>
          </main>

          {/* Right Art Panel */}
          <ArtPanel quote="TRACK IMPROVE EVOLVE" />
        </div>
      </div>
    </div>
  );
}
