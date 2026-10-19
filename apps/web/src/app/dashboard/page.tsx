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
  QuestCard,
  DifficultyChip,
  StatusChip,
} from "@/components/ui";
import { DEMO_HUNTER } from "@goalos/config";
import { TaskDifficulty, TaskStatus } from "@goalos/types";
import {
  CheckSquare,
  Flame,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Activity,
} from "lucide-react";

interface DashboardQuest {
  id: string;
  title: string;
  category: string;
  difficulty: TaskDifficulty;
  xpReward: number;
  status: TaskStatus;
  completed: boolean;
}

export default function MainDashboardPage() {
  const [hunter, setHunter] = useState(DEMO_HUNTER);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);

  const [quests, setQuests] = useState<DashboardQuest[]>([
    {
      id: "q-1",
      title: "Morning Workout",
      category: "health",
      difficulty: "medium" as const,
      xpReward: 80,
      status: "completed" as const,
      completed: true,
    },
    {
      id: "q-2",
      title: "Study DSA (1 hour)",
      category: "study",
      difficulty: "medium" as const,
      xpReward: 100,
      status: "in_progress" as const,
      completed: false,
    },
    {
      id: "q-3",
      title: "Read a Book",
      category: "study",
      difficulty: "easy" as const,
      xpReward: 50,
      status: "start" as const,
      completed: false,
    },
    {
      id: "q-4",
      title: "Drink 2L Water",
      category: "health",
      difficulty: "easy" as const,
      xpReward: 50,
      status: "start" as const,
      completed: false,
    },
    {
      id: "q-5",
      title: "Meditate (10 min)",
      category: "personal",
      difficulty: "easy" as const,
      xpReward: 50,
      status: "start" as const,
      completed: false,
    },
    {
      id: "q-6",
      title: "Plan Tomorrow",
      category: "work",
      difficulty: "easy" as const,
      xpReward: 40,
      status: "locked" as const,
      completed: false,
    },
  ]);

  const toggleQuest = async (id: string) => {
    // Optimistic toggle
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const nextCompleted = !q.completed;
          return {
            ...q,
            completed: nextCompleted,
            status: nextCompleted ? "completed" : "in_progress",
          };
        }
        return q;
      })
    );

    // Call server completion endpoint
    try {
      await fetch("/api/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: id,
          localDate: "2026-10-14",
          idempotencyKey: `idem-${Date.now()}`,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex min-h-screen bg-[#050814] text-[#f8fafc]">
      {/* Desktop Sidebar Chrome */}
      <SidebarNav className="hidden md:flex" />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        {/* Scrollable Dashboard Body matching DM-04 */}
        <main className="flex-1 p-6 lg:p-8 pb-24 md:pb-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Row: Greeting & Date */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="font-heading text-2xl lg:text-3xl font-black text-white">
                Good Morning, Hunter
              </h1>
              <p className="text-xs text-[#94a3b8] mt-1 font-medium">
                Discipline today, a stronger tomorrow.
              </p>
            </div>
            <div className="font-hud text-xs font-bold text-[#00d2ff] tracking-wider uppercase bg-[#0a1224] border border-[#142852] px-3.5 py-1.5 rounded-lg self-start sm:self-auto">
              Tue, Oct 14, 2026
            </div>
          </div>

          {/* Top Section: Hunter Level Card (Left) + Focus Timer Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Hunter Level Card & Stats Grid (Left 8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              <HudPanel className="p-6 space-y-5">
                {/* Profile Header & Rank Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3b6cf6] to-[#00d2ff] flex items-center justify-center font-heading text-2xl font-black text-white shadow-[0_0_20px_rgba(0,210,255,0.4)]">
                      {hunter.hunterName[0]}
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-white">Lv. {hunter.level}</h2>
                      <p className="font-hud text-xs text-[#00d2ff] uppercase tracking-wider font-bold mt-0.5">
                        {hunter.class} Hunter
                      </p>
                    </div>
                  </div>

                  {/* Rank Card */}
                  <div className="bg-[#050814] border border-[#142852] rounded-xl px-4 py-2.5 text-right">
                    <div className="text-xs font-hud font-extrabold text-[#60a5fa] tracking-wider">
                      D-RANK
                    </div>
                    <div className="text-[11px] text-[#94a3b8] mt-0.5">
                      Next: C-Rank <span className="text-[#00d2ff] font-bold">2,570 XP</span>
                    </div>
                  </div>
                </div>

                {/* Level XP Progress Bar */}
                <XpBar
                  currentXp={hunter.currentXp}
                  nextLevelXp={hunter.nextLevelXp}
                  showLabel
                />

                {/* 4 Stat Tiles */}
                <div className="pt-2 border-t border-[#142852] grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#050814] border border-[#142852] rounded-xl p-3 text-center">
                    <div className="text-lg font-heading font-black text-white">12</div>
                    <div className="text-[11px] font-hud text-[#94a3b8] uppercase tracking-wider mt-0.5">
                      Quests
                    </div>
                  </div>

                  <div className="bg-[#050814] border border-[#142852] rounded-xl p-3 text-center">
                    <div className="text-lg font-heading font-black text-white">4/8</div>
                    <div className="text-[11px] font-hud text-[#94a3b8] uppercase tracking-wider mt-0.5">
                      Habits
                    </div>
                  </div>

                  <div className="bg-[#050814] border border-[#142852] rounded-xl p-3 text-center">
                    <div className="text-lg font-heading font-black text-[#f5a623] flex items-center justify-center gap-1">
                      <Flame size={18} className="fill-[#f5a623]" /> 12 Days
                    </div>
                    <div className="text-[11px] font-hud text-[#94a3b8] uppercase tracking-wider mt-0.5">
                      Streak
                    </div>
                  </div>

                  <div className="bg-[#050814] border border-[#142852] rounded-xl p-3 text-center">
                    <div className="text-lg font-heading font-black text-[#00d2ff] flex items-center justify-center gap-1">
                      <Clock size={16} /> 120 min
                    </div>
                    <div className="text-[11px] font-hud text-[#94a3b8] uppercase tracking-wider mt-0.5">
                      Focus
                    </div>
                  </div>
                </div>
              </HudPanel>
            </div>

            {/* Focus Timer Preview Card (Right 4 Cols) */}
            <div className="lg:col-span-4">
              <HudPanel className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                <span className="text-xs font-hud font-bold text-[#94a3b8] uppercase tracking-widest">
                  Focus Timer
                </span>

                {/* Circular Neon Timer Ring */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#142852"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#00d2ff"
                      strokeWidth="6"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (440 * (timerSeconds / (25 * 60)))}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-300 drop-shadow-[0_0_10px_#00d2ff]"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="font-heading text-2xl font-black text-white">
                      {formatTimer(timerSeconds)}
                    </span>
                    <span className="text-[10px] font-hud font-bold text-[#00d2ff] uppercase tracking-wider">
                      Focus Time
                    </span>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="w-full space-y-2">
                  <SystemButton
                    variant="primary"
                    size="md"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="w-full shadow-[0_0_15px_rgba(59,108,246,0.4)]"
                  >
                    {isTimerRunning ? "Pause" : "Start"}
                  </SystemButton>
                </div>

                <p className="text-[11px] text-[#64748b] italic">
                  &ldquo;Small steps every day create massive results.&rdquo;
                </p>
              </HudPanel>
            </div>
          </div>

          {/* Today's Quests Full Section */}
          <HudPanel className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                  <CheckSquare size={16} className="text-[#00d2ff]" />
                  Today&apos;s Quests
                </h3>
              </div>
              <Link
                href="/quests"
                className="text-xs font-hud font-bold text-[#00d2ff] hover:underline flex items-center gap-1"
              >
                View All <ChevronRight size={14} />
              </Link>
            </div>

            <div className="space-y-2.5">
              {quests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  {...quest}
                  onToggleComplete={() => toggleQuest(quest.id)}
                />
              ))}
            </div>
          </HudPanel>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
