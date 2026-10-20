"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HudPanel,
  AppShell,
} from "@/components/ui";
import {
  Check,
  Clock,
  BookOpen,
  Droplet,
  Sparkles,
  Flame,
  Shield,
  MoreVertical,
  Target,
  Compass,
} from "lucide-react";

interface DashboardQuest {
  id: string;
  title: string;
  category: string;
  xpReward: number;
  status: "completed" | "in_progress" | "start";
  iconType: "workout" | "dsa" | "book" | "water" | "meditate";
}

export default function MainDashboardPage() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);

  const [quests, setQuests] = useState<DashboardQuest[]>([
    {
      id: "q-1",
      title: "Morning Workout",
      category: "Health",
      xpReward: 80,
      status: "completed",
      iconType: "workout",
    },
    {
      id: "q-2",
      title: "Study DSA (1 hour)",
      category: "Study",
      xpReward: 100,
      status: "in_progress",
      iconType: "dsa",
    },
    {
      id: "q-3",
      title: "Read a Book",
      category: "Study",
      xpReward: 50,
      status: "start",
      iconType: "book",
    },
    {
      id: "q-4",
      title: "Drink 2L Water",
      category: "Health",
      xpReward: 50,
      status: "start",
      iconType: "water",
    },
    {
      id: "q-5",
      title: "Meditate (10 min)",
      category: "Personal",
      xpReward: 30,
      status: "start",
      iconType: "meditate",
    },
  ]);

  const toggleQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const nextStatus =
            q.status === "completed"
              ? "start"
              : q.status === "start"
              ? "in_progress"
              : "completed";
          return { ...q, status: nextStatus };
        }
        return q;
      })
    );
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AppShell activeRoute="/dashboard">
      <main className="p-5 lg:p-6 pb-20 md:pb-6 space-y-4 max-w-[1340px] mx-auto w-full relative z-10 font-sans">
        {/* Header Row: Greeting & Date */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1">
          <div>
            <h1 className="text-2xl lg:text-[26px] font-bold text-white tracking-tight">
              Good Morning, Hunter
            </h1>
            <p className="text-xs text-[#8fa3c7] mt-0.5 font-normal">
              Discipline today, a stronger tomorrow.
            </p>
          </div>
          <div className="text-xs font-medium text-[#8fa3c7] self-start sm:self-auto">
            Tue, Oct 14, 2026
          </div>
        </div>

        {/* Main Grid: Left 8 Cols (Profile & Quests) + Right 4 Cols (Rank & Timer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Hunter Profile & Today's Quests */}
          <div className="lg:col-span-8 space-y-4">
            {/* Hunter Level Card & Stats */}
            <HudPanel className="p-5 rounded-2xl bg-[rgba(8,16,38,0.75)] backdrop-blur-[12px] border border-[rgba(59,130,246,0.18)]">
              {/* Profile Top Row */}
              <div className="flex items-center gap-5">
                {/* Circular Hunter Avatar with Blue Glow */}
                <div className="w-[76px] h-[76px] rounded-full overflow-hidden border-2 border-[#00d2ff] shadow-[0_0_18px_rgba(0,210,255,0.45)] shrink-0 bg-[#040814]">
                  <img
                    src="/hunter-avatar.png"
                    alt="Hunter Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Level, Title & XP Bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      Lv. 32
                    </h2>
                    <span className="text-xs text-[#8fa3c7] font-normal">
                      2,430 / 5,000 XP
                    </span>
                  </div>

                  <p className="text-xs text-[#00d2ff] font-medium mt-0.5">
                    Shadow Hunter
                  </p>

                  {/* Gradient XP Progress Bar */}
                  <div className="h-2.5 w-full rounded-full bg-[#070e1f] border border-[#1a2d54]/60 overflow-hidden relative mt-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] shadow-[0_0_12px_rgba(139,92,246,0.6)]"
                      style={{ width: "48.6%" }}
                    />
                  </div>
                </div>
              </div>

              {/* 4 Stat Tiles */}
              <div className="pt-4 mt-4 border-t border-[rgba(59,130,246,0.12)] grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Quests */}
                <div className="bg-[rgba(5,10,24,0.65)] border border-[rgba(59,130,246,0.16)] rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#059669]/20 border border-[#10b981]/50 flex items-center justify-center text-[#10b981] shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-base font-bold text-white leading-none">12</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    <span className="text-[11px] text-[#8fa3c7] font-medium">Quests</span>
                  </div>
                </div>

                {/* 2. Habits */}
                <div className="bg-[rgba(5,10,24,0.65)] border border-[rgba(59,130,246,0.16)] rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#0284c7]/20 border border-[#38bdf8]/50 flex items-center justify-center text-[#38bdf8] shrink-0">
                      <Target size={12} />
                    </div>
                    <span className="text-base font-bold text-white leading-none">4/8</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                    <span className="text-[11px] text-[#8fa3c7] font-medium">Habits</span>
                  </div>
                </div>

                {/* 3. Streak */}
                <div className="bg-[rgba(5,10,24,0.65)] border border-[rgba(59,130,246,0.16)] rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#d97706]/20 border border-[#f59e0b]/50 flex items-center justify-center text-[#f59e0b] shrink-0">
                      <Flame size={12} className="fill-[#f59e0b]" />
                    </div>
                    <span className="text-base font-bold text-white leading-none">12 Days</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                    <span className="text-[11px] text-[#8fa3c7] font-medium">Streak</span>
                  </div>
                </div>

                {/* 4. Focus */}
                <div className="bg-[rgba(5,10,24,0.65)] border border-[rgba(59,130,246,0.16)] rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#b45309]/20 border border-[#fbbf24]/50 flex items-center justify-center text-[#fbbf24] shrink-0">
                      <Clock size={12} />
                    </div>
                    <span className="text-base font-bold text-white leading-none">120 min</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                    <span className="text-[11px] text-[#8fa3c7] font-medium">Focus</span>
                  </div>
                </div>
              </div>
            </HudPanel>

            {/* Today's Quests Card */}
            <HudPanel className="p-5 rounded-2xl bg-[rgba(8,16,38,0.75)] backdrop-blur-[12px] border border-[rgba(59,130,246,0.18)]">
              <h3 className="text-base font-bold text-white mb-3">
                Today&apos;s Quests
              </h3>

              <div className="space-y-2">
                {quests.map((quest) => {
                  return (
                    <div
                      key={quest.id}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[rgba(5,10,24,0.65)] border border-[rgba(59,130,246,0.14)] hover:border-[rgba(59,130,246,0.28)] transition-all"
                    >
                      {/* Left Icon + Title/XP */}
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Custom Category Icon Box */}
                        {quest.iconType === "workout" && (
                          <div className="w-8 h-8 rounded-lg bg-[#064e3b]/30 border border-[#10b981]/40 flex items-center justify-center text-[#10b981] shrink-0">
                            <Check size={15} strokeWidth={3} />
                          </div>
                        )}
                        {quest.iconType === "dsa" && (
                          <div className="w-8 h-8 rounded-lg bg-[#312e81]/30 border border-[#6366f1]/40 flex items-center justify-center text-[#818cf8] shrink-0">
                            <Clock size={15} />
                          </div>
                        )}
                        {quest.iconType === "book" && (
                          <div className="w-8 h-8 rounded-lg bg-[#78350f]/30 border border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b] shrink-0">
                            <BookOpen size={15} />
                          </div>
                        )}
                        {quest.iconType === "water" && (
                          <div className="w-8 h-8 rounded-lg bg-[#0c4a6e]/30 border border-[#0284c7]/40 flex items-center justify-center text-[#38bdf8] shrink-0">
                            <Droplet size={15} />
                          </div>
                        )}
                        {quest.iconType === "meditate" && (
                          <div className="w-8 h-8 rounded-lg bg-[#581c87]/30 border border-[#a855f7]/40 flex items-center justify-center text-[#c084fc] shrink-0">
                            <Sparkles size={15} />
                          </div>
                        )}

                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                            {quest.title}
                          </h4>
                          <span className="text-[11px] text-[#00d2ff] font-medium font-sans">
                            +{quest.xpReward} XP
                          </span>
                        </div>
                      </div>

                      {/* Right Action Button & Indicators */}
                      <div className="flex items-center gap-3 shrink-0">
                        {quest.status === "completed" && (
                          <button
                            type="button"
                            onClick={() => toggleQuest(quest.id)}
                            className="px-3.5 py-1 rounded-md border border-[#10b981] bg-[#064e3b]/30 text-[#10b981] text-xs font-medium hover:bg-[#064e3b]/50 transition-all cursor-pointer"
                          >
                            Completed
                          </button>
                        )}
                        {quest.status === "in_progress" && (
                          <button
                            type="button"
                            onClick={() => toggleQuest(quest.id)}
                            className="px-3.5 py-1 rounded-md border border-[#3b82f6] bg-[#1e40af]/30 text-[#60a5fa] text-xs font-medium hover:bg-[#1e40af]/50 transition-all cursor-pointer"
                          >
                            In Progress
                          </button>
                        )}
                        {quest.status === "start" && (
                          <button
                            type="button"
                            onClick={() => toggleQuest(quest.id)}
                            className="px-4 py-1 rounded-md border border-[#4338ca] bg-[#1e1b4b]/60 text-[#c7d2fe] text-xs font-medium hover:bg-[#312e81]/60 transition-all cursor-pointer"
                          >
                            Start
                          </button>
                        )}

                        {/* Status badge */}
                        <div className="w-6 h-6 rounded-full bg-[#064e3b]/30 border border-[#10b981]/40 flex items-center justify-center text-[#10b981]">
                          <Shield size={11} />
                        </div>

                        {/* 3-dots menu */}
                        <button
                          type="button"
                          className="text-[#64748b] hover:text-white transition-colors"
                        >
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </HudPanel>
          </div>

          {/* Right Column: D-Rank Card + Focus Timer Card */}
          <div className="lg:col-span-4 space-y-4">
            {/* D-Rank Card */}
            <HudPanel className="p-4 rounded-2xl bg-[rgba(8,16,38,0.75)] backdrop-blur-[12px] border border-[rgba(59,130,246,0.18)] flex items-center gap-4">
              {/* Hexagon Crest Badge */}
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full text-purple-500/70 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                  <polygon
                    points="50 3, 90 25, 90 75, 50 97, 10 75, 10 25"
                    fill="rgba(88, 28, 135, 0.25)"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <polygon
                    points="50 22, 75 36, 75 64, 50 78, 25 64, 25 36"
                    fill="none"
                    stroke="#c084fc"
                    strokeWidth="3"
                  />
                  <circle cx="50" cy="50" r="6" fill="#e9d5ff" />
                </svg>
              </div>

              <div>
                <div className="text-base font-bold text-white tracking-wide">
                  D-Rank
                </div>
                <div className="text-xs text-[#8fa3c7] mt-0.5">
                  Next: C-Rank
                </div>
                <div className="text-xs font-semibold text-[#8fa3c7] mt-0.5">
                  2,570 XP
                </div>
              </div>
            </HudPanel>

            {/* Focus Timer Card */}
            <HudPanel className="p-5 rounded-2xl bg-[rgba(8,16,38,0.75)] backdrop-blur-[12px] border border-[rgba(59,130,246,0.18)] flex flex-col items-center justify-between text-center space-y-4">
              <span className="text-sm font-bold text-white self-start">
                Focus Timer
              </span>

              {/* Glowing Neon Circular Progress Ring */}
              <div className="relative w-40 h-40 flex items-center justify-center my-1">
                <svg className="w-full h-full -rotate-90">
                  <defs>
                    <linearGradient id="timerGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="60%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#00d2ff" />
                    </linearGradient>
                  </defs>
                  {/* Background Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r="64"
                    stroke="rgba(30, 58, 138, 0.3)"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  {/* Neon Glow Layer */}
                  <circle
                    cx="80"
                    cy="80"
                    r="64"
                    stroke="url(#timerGradient)"
                    strokeWidth="6"
                    strokeDasharray={402}
                    strokeDashoffset={402 - (402 * (timerSeconds / (25 * 60)))}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-300 drop-shadow-[0_0_12px_rgba(0,210,255,0.75)]"
                  />
                </svg>

                {/* Inner Digits */}
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold text-white tracking-normal font-sans">
                    {formatTimer(timerSeconds)}
                  </span>
                  <span className="text-xs font-medium text-[#8fa3c7] tracking-wide mt-0.5">
                    Focus Time
                  </span>
                </div>
              </div>

              {/* Start Button */}
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#6366f1] to-[#2563eb] text-white font-bold text-sm tracking-wide shadow-[0_0_18px_rgba(99,102,241,0.5)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                {isTimerRunning ? "Pause" : "Start"}
              </button>

              {/* Motivational Quote at bottom */}
              <div className="flex items-start gap-1.5 justify-center pt-1 text-[11px] text-[#8fa3c7] italic tracking-wide">
                <span className="text-[#00d2ff] not-italic font-bold">✦</span>
                <p>
                  &ldquo;Small steps every day<br />create massive results.&rdquo;
                </p>
              </div>
            </HudPanel>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
