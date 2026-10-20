"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SidebarNav,
  TopBar,
  BottomNav,
  HudPanel,
  SystemButton,
} from "@/components/ui";
import {
  Flame,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface HabitRow {
  id: string;
  title: string;
  iconBg: string;
  iconText: string;
  days: boolean[]; // Mon to Sun
}

export default function HabitsTrackerPage() {
  const [viewMode, setViewMode] = useState<"Day" | "Week" | "Month">("Week");

  const [habits, setHabits] = useState<HabitRow[]>([
    { id: "h1", title: "Morning Exercise", iconBg: "bg-blue-600", iconText: "🏃", days: [true, true, true, true, true, false, true] },
    { id: "h2", title: "Drink 2L Water", iconBg: "bg-cyan-600", iconText: "💧", days: [true, true, true, true, true, true, false] },
    { id: "h3", title: "Meditation", iconBg: "bg-purple-600", iconText: "🧘", days: [true, false, true, true, true, true, false] },
    { id: "h4", title: "Read a Book", iconBg: "bg-amber-600", iconText: "📖", days: [true, true, false, true, true, true, true] },
    { id: "h5", title: "Healthy Food", iconBg: "bg-emerald-600", iconText: "🥗", days: [true, true, true, false, true, true, false] },
    { id: "h6", title: "No Social Media", iconBg: "bg-rose-600", iconText: "📵", days: [false, true, true, true, false, true, true] },
    { id: "h7", title: "Sleep Early", iconBg: "bg-indigo-600", iconText: "🌙", days: [false, false, true, true, true, true, false] },
  ]);

  const daysHeader = [
    { day: "Mon", date: "14" },
    { day: "Tue", date: "15" },
    { day: "Wed", date: "16" },
    { day: "Thu", date: "17" },
    { day: "Fri", date: "18" },
    { day: "Sat", date: "19" },
    { day: "Sun", date: "20" },
  ];

  const toggleHabitDay = (habitId: string, dayIndex: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const updatedDays = [...h.days];
          updatedDays[dayIndex] = !updatedDays[dayIndex];
          return { ...h, days: updatedDays };
        }
        return h;
      })
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#050814] text-[#f8fafc]">
      <SidebarNav className="hidden md:flex shrink-0" />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar className="shrink-0" />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8 pb-24 md:pb-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl lg:text-3xl font-black text-white">
                Habits
              </h1>
              <p className="text-xs text-[#94a3b8] mt-1 font-medium">
                Oct 14 - Oct 20, 2026
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Day / Week / Month Pill Selector */}
              <div className="flex items-center p-1 rounded-xl bg-[#0a1224] border border-[#142852]">
                {(["Day", "Week", "Month"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      viewMode === mode
                        ? "bg-[#3b6cf6] text-white shadow-[0_0_10px_rgba(59,108,246,0.4)]"
                        : "text-[#94a3b8] hover:text-white"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <SystemButton variant="primary" size="md" className="gap-2 shadow-[0_0_15px_rgba(59,108,246,0.4)]">
                <Plus size={16} /> Add Habit
              </SystemButton>
            </div>
          </div>

          {/* Main Grid: Weekly Habit Matrix (Left 8 Cols) + Streaks & Completion Ring (Right 4 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Weekly Habit Matrix Table */}
            <div className="lg:col-span-8">
              <HudPanel className="p-6 overflow-x-auto shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                <div className="min-w-[500px]">
                  {/* Days Header */}
                  <div className="grid grid-cols-12 gap-2 pb-4 border-b border-[#142852] text-center text-xs font-hud font-bold">
                    <div className="col-span-5 text-left text-[#64748b] tracking-wider uppercase pl-2">
                      Habit Name
                    </div>
                    {daysHeader.map((d, idx) => (
                      <div key={idx} className="col-span-1">
                        <span className="text-[#94a3b8] block text-[10px]">{d.day}</span>
                        <span className="text-white text-xs">{d.date}</span>
                      </div>
                    ))}
                  </div>

                  {/* Habit Rows */}
                  <div className="divide-y divide-[#142852]/50">
                    {habits.map((habit) => (
                      <div
                        key={habit.id}
                        className="grid grid-cols-12 gap-2 py-3.5 items-center hover:bg-[#0d1933]/50 transition-colors rounded-lg px-2"
                      >
                        <div className="col-span-5 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#050814] border border-[#142852] flex items-center justify-center text-sm shadow-inner">
                            {habit.iconText}
                          </div>
                          <span className="text-xs font-semibold text-white tracking-wide">
                            {habit.title}
                          </span>
                        </div>

                        {/* 7 Check States */}
                        {habit.days.map((isDone, dayIdx) => (
                          <div key={dayIdx} className="col-span-1 flex justify-center">
                            <button
                              onClick={() => toggleHabitDay(habit.id, dayIdx)}
                              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                isDone
                                  ? "bg-[#10b981] text-white shadow-[0_0_8px_rgba(16,185,129,0.5)] border border-[#10b981]"
                                  : "border border-[#142852] bg-[#050814] hover:border-[#00d2ff]"
                              }`}
                            >
                              {isDone && <Check size={12} strokeWidth={3} />}
                            </button>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </HudPanel>
            </div>

            {/* Streaks & Completion Ring Panel matching DM-07 */}
            <div className="lg:col-span-4 space-y-6">
              <HudPanel className="p-6 space-y-6 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                <div>
                  <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                    Streaks
                  </h3>
                </div>

                {/* 12 Days Current Streak Tile */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#050814] border border-[#142852]">
                  <div className="w-12 h-12 rounded-xl bg-[#f5a623]/20 border border-[#f5a623]/40 flex items-center justify-center shadow-[0_0_15px_rgba(245,166,35,0.3)]">
                    <Flame size={24} className="fill-[#f5a623] text-[#f5a623]" />
                  </div>
                  <div>
                    <div className="font-heading text-xl font-black text-white">12 Days</div>
                    <div className="text-[11px] font-hud text-[#94a3b8] uppercase tracking-wider mt-0.5">
                      Current Streak
                    </div>
                  </div>
                </div>

                {/* Completion Rate Ring (75%) */}
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        stroke="#142852"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        stroke="#00d2ff"
                        strokeWidth="8"
                        strokeDasharray={377}
                        strokeDashoffset={377 * 0.25}
                        strokeLinecap="round"
                        fill="transparent"
                        className="drop-shadow-[0_0_12px_#00d2ff]"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="font-heading text-2xl font-black text-white">75%</span>
                      <span className="text-[10px] font-hud font-bold text-[#00d2ff] uppercase tracking-wider">
                        Completion Rate
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#142852] text-center">
                  <p className="text-xs text-[#94a3b8] italic">
                    &ldquo;Good habits today, greater results tomorrow.&rdquo;
                  </p>
                </div>
              </HudPanel>
            </div>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
