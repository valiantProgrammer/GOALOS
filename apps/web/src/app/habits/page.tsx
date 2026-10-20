"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppShell,
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

export type HabitDayState = "green" | "cyan" | "blue" | "unchecked" | "unchecked-purple" | "empty";

interface HabitRow {
  id: string;
  title: string;
  iconBg: string;
  iconType: "muscle" | "water" | "meditation" | "book" | "food" | "social" | "sleep";
  days: HabitDayState[];
}

// Custom crisp SVG icons matching the mockup
function MuscleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.5 7.5c-.8-1.5-2.2-2.5-4-2.5-1.5 0-3 1-3.5 2.5l-.5 1.5-2-.5C7 8 5.5 9 5 11c-.5 2 0 4 1.5 5.5L8 18h7l2.5-3 1-4.5c.3-1-.2-2.2-1-3z" />
      <path d="M12 9c-.8 0-1.5.5-1.5 1.5s.5 1.5 1.5 2" />
    </svg>
  );
}

function WaterJugIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2h8v2H8z" />
      <path d="M7 6h10a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2z" />
      <path d="M9 10h6M9 14h6M9 18h6" />
    </svg>
  );
}

function LotusMeditationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="2.5" />
      <path d="M12 11.5c-2.8 0-4.8 1.5-5.5 3.5L5 18c0 1.2 1.2 1.8 2.5 1.8h9c1.3 0 2.5-.6 2.5-1.8l-1.5-3c-.7-2-2.7-3.5-5.5-3.5z" />
      <circle cx="6" cy="18.5" r="1.5" />
      <circle cx="18" cy="18.5" r="1.5" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
      <path d="M6 2v20" />
      <path d="M11 2v6l2-1.5L15 8V2" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c1 2 2 3 3 3M12 5c-3-2-6 0-6 4 0 5 4 8 6 10 2-2 6-5 6-10 0-4-3-6-6-4z" />
      <path d="M15 2c-1 0-2 1-2 2" />
    </svg>
  );
}

function ProhibitIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6l12.8 12.8" />
      <path d="M18.4 5.6l-12.8 12.8" />
    </svg>
  );
}

function SleepMoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      <path d="M9 10h.01M13 13h.01" />
      <path d="M15 8l1 1-1 1M18 5l1 1-1 1" />
    </svg>
  );
}

export default function HabitsTrackerPage() {
  const [viewMode, setViewMode] = useState<"Day" | "Week" | "Month">("Week");

  // Click map matching the exact reference image
  const [habits, setHabits] = useState<HabitRow[]>([
    {
      id: "h1",
      title: "Morning Exercise",
      iconBg: "bg-[#064e3b]/35 border-[#10b981]/50 text-[#10b981]",
      iconType: "muscle",
      days: ["green", "unchecked", "blue", "green", "green", "unchecked", "unchecked-purple"],
    },
    {
      id: "h2",
      title: "Drink 2L Water",
      iconBg: "bg-[#0c4a6e]/40 border-[#0284c7]/50 text-[#38bdf8]",
      iconType: "water",
      days: ["green", "green", "unchecked", "green", "green", "green", "unchecked"],
    },
    {
      id: "h3",
      title: "Meditation",
      iconBg: "bg-[#881337]/35 border-[#f43f5e]/50 text-[#fb7185]",
      iconType: "meditation",
      days: ["unchecked", "unchecked", "unchecked", "empty", "green", "green", "unchecked-purple"],
    },
    {
      id: "h4",
      title: "Read a Book",
      iconBg: "bg-[#581c87]/35 border-[#a855f7]/50 text-[#c084fc]",
      iconType: "book",
      days: ["unchecked", "unchecked", "green", "green", "empty", "empty", "cyan"],
    },
    {
      id: "h5",
      title: "Healthy Food",
      iconBg: "bg-[#064e3b]/35 border-[#10b981]/50 text-[#34d399]",
      iconType: "food",
      days: ["empty", "unchecked", "empty", "green", "unchecked", "cyan", "blue"],
    },
    {
      id: "h6",
      title: "No Social Media",
      iconBg: "bg-[#78350f]/35 border-[#f59e0b]/50 text-[#fbbf24]",
      iconType: "social",
      days: ["empty", "empty", "empty", "unchecked", "green", "empty", "cyan"],
    },
    {
      id: "h7",
      title: "Sleep Early",
      iconBg: "bg-[#312e81]/35 border-[#6366f1]/50 text-[#a5b4fc]",
      iconType: "sleep",
      days: ["empty", "empty", "empty", "empty", "green", "green", "unchecked-purple"],
    },
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

  // Interactive toggle cycling through states on click
  const toggleHabitDay = (habitId: string, dayIndex: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const nextCycle: Record<HabitDayState, HabitDayState> = {
            empty: "unchecked",
            unchecked: "green",
            "unchecked-purple": "green",
            green: "cyan",
            cyan: "blue",
            blue: "empty",
          };
          const updatedDays = [...h.days];
          updatedDays[dayIndex] = nextCycle[updatedDays[dayIndex]] || "green";
          return { ...h, days: updatedDays };
        }
        return h;
      })
    );
  };

  const renderIcon = (type: HabitRow["iconType"]) => {
    switch (type) {
      case "muscle":
        return <MuscleIcon className="w-5 h-5" />;
      case "water":
        return <WaterJugIcon className="w-5 h-5" />;
      case "meditation":
        return <LotusMeditationIcon className="w-5 h-5" />;
      case "book":
        return <BookIcon className="w-5 h-5" />;
      case "food":
        return <AppleIcon className="w-5 h-5" />;
      case "social":
        return <ProhibitIcon className="w-5 h-5" />;
      case "sleep":
        return <SleepMoonIcon className="w-5 h-5" />;
    }
  };

  return (
    <AppShell activeRoute="/habits">
      <main className="p-6 lg:p-8 pb-24 md:pb-8 space-y-6 max-w-7xl mx-auto w-full">
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
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === mode
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

        {/* Main Grid: Weekly Habit Click Map Matrix (Left 8 Cols) + Streaks (Right 4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Weekly Habit Matrix Table */}
          <div className="lg:col-span-8">
            <HudPanel className="p-0 overflow-x-auto rounded-2xl bg-[rgba(8,16,38,0.75)] backdrop-blur-[12px] border border-[rgba(59,130,246,0.18)] shadow-[0_0_25px_rgba(0,0,0,0.5)]">
              <div className="min-w-[620px] select-none">
                {/* Header Row */}
                <div className="flex items-stretch border-b border-[rgba(59,130,246,0.14)]">
                  {/* Empty left title space */}
                  <div className="w-56 shrink-0 border-r border-[rgba(59,130,246,0.14)]" />

                  {/* 7 Days Columns */}
                  <div className="flex-1 grid grid-cols-7">
                    {daysHeader.map((d, idx) => (
                      <div
                        key={idx}
                        className="py-3 flex flex-col items-center justify-center border-r border-[rgba(59,130,246,0.14)] last:border-r-0 text-center"
                      >
                        <span className="text-xs font-semibold text-[#8fa3c7]">
                          {d.day}
                        </span>
                        <span className="text-xs font-bold text-white mt-0.5">
                          {d.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Habit Rows */}
                <div className="divide-y divide-[rgba(59,130,246,0.14)]">
                  {habits.map((habit, rIdx) => {
                    return (
                      <div
                        key={habit.id}
                        className="flex items-stretch hover:bg-[#0c1836]/40 transition-colors"
                      >
                        {/* Left Habit Cell: Icon + Name */}
                        <div className="w-56 shrink-0 px-4 py-3 flex items-center gap-3.5 border-r border-[rgba(59,130,246,0.14)]">
                          <div
                            className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-inner shrink-0 ${habit.iconBg}`}
                          >
                            {renderIcon(habit.iconType)}
                          </div>
                          <span className="text-sm font-semibold text-white tracking-wide truncate">
                            {habit.title}
                          </span>
                        </div>

                        {/* 7 Clickable Matrix Cells */}
                        <div className="flex-1 grid grid-cols-7">
                          {habit.days.map((state, dayIdx) => {
                            const isLastRowSun = rIdx === 6 && dayIdx === 6;

                            return (
                              <div
                                key={dayIdx}
                                className="border-r border-[rgba(59,130,246,0.14)] last:border-r-0 flex items-center justify-center p-2"
                              >
                                <button
                                  type="button"
                                  onClick={() => toggleHabitDay(habit.id, dayIdx)}
                                  className="group relative flex items-center justify-center outline-none"
                                >
                                  {/* Green Filled Check */}
                                  {state === "green" && (
                                    <div className="w-7 h-7 rounded-full bg-[#10b981] border border-[#34d399]/70 flex items-center justify-center shadow-[0_0_14px_rgba(16,185,129,0.95)] transition-all transform hover:scale-110">
                                      <Check size={14} strokeWidth={3.5} className="text-[#042c18]" />
                                    </div>
                                  )}

                                  {/* Cyan Filled Check */}
                                  {state === "cyan" && (
                                    <div className="w-7 h-7 rounded-full bg-[#00d2ff] border border-[#67e8f9]/70 flex items-center justify-center shadow-[0_0_14px_rgba(0,210,255,0.95)] transition-all transform hover:scale-110">
                                      <Check size={14} strokeWidth={3.5} className="text-[#042e3d]" />
                                    </div>
                                  )}

                                  {/* Blue Filled Check */}
                                  {state === "blue" && (
                                    <div className="w-7 h-7 rounded-full bg-[#2563eb] border border-[#60a5fa]/70 flex items-center justify-center shadow-[0_0_14px_rgba(37,99,235,0.95)] transition-all transform hover:scale-110">
                                      <Check size={14} strokeWidth={3.5} className="text-[#0a1b40]" />
                                    </div>
                                  )}

                                  {/* Unchecked Blue Ring */}
                                  {state === "unchecked" && (
                                    <div className="w-7 h-7 rounded-full border border-[#1e3a5f] bg-[#071329]/40 hover:border-[#38bdf8] transition-all transform hover:scale-110" />
                                  )}

                                  {/* Unchecked Purple Ring */}
                                  {state === "unchecked-purple" && (
                                    <div className="flex items-center">
                                      <div className="w-7 h-7 rounded-full border border-[#581c87]/80 bg-[#1e0e38]/30 hover:border-[#a855f7] transition-all transform hover:scale-110" />

                                    </div>
                                  )}

                                  {/* Empty Cell */}
                                  {state === "empty" && (
                                    <div className="w-7 h-7 rounded-full border border-transparent hover:border-[#1e3a5f]/40 transition-all" />
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </HudPanel>
          </div>

          {/* Streaks & Completion Ring Panel */}
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
    </AppShell>
  );
}
