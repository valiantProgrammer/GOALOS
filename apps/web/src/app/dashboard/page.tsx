"use client";

import React, { useEffect, useState } from "react";
import { AppShell } from "@/components/ui";
import {
  Target,
  CheckCircle2,
  Flame,
  Timer,
  Dumbbell,
  Code2,
  BookOpen,
  Droplet,
  Brain,
  Leaf,
  RotateCcw,
  Hexagon,
  Sparkles,
  SlidersHorizontal,
  LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  EDIT EVERYTHING HERE – the whole screen renders from this data     */
/* ------------------------------------------------------------------ */
const HUNTER = {
  name: "Hunter",
  level: 32,
  title: "Shadow Hunter",
  xp: 2430,
  xpMax: 5000,
  avatar: "/avatars/hunter.png", // swap for your own image
  rank: "D-Rank",
  nextRank: "C-Rank",
  xpToNextRank: 2570,
};

interface StatItem {
  id: string;
  icon: LucideIcon;
  value: string;
  unit: string;
  label: string;
  tone: "emerald" | "amber";
}

const STATS: StatItem[] = [
  { id: "quests", icon: Target, value: "12", unit: "", label: "Quests", tone: "emerald" },
  { id: "habits", icon: CheckCircle2, value: "4/8", unit: "", label: "Habits", tone: "emerald" },
  { id: "streak", icon: Flame, value: "12", unit: "Days", label: "Streak", tone: "amber" },
  { id: "focus", icon: Timer, value: "120", unit: "min", label: "Focus", tone: "amber" },
];

export interface QuestItem {
  id: number;
  title: string;
  xp: number;
  status: "completed" | "progress" | "todo";
  icon: LucideIcon;
  color: string;
  edge: string;
}

const INITIAL_QUESTS: QuestItem[] = [
  { id: 1, title: "Morning Workout", xp: 80, status: "completed", icon: Dumbbell, color: "from-emerald-500 to-emerald-700", edge: "bg-amber-500" },
  { id: 2, title: "Study DSA (1 hour)", xp: 150, status: "progress", icon: Code2, color: "from-indigo-500 to-violet-700", edge: "bg-blue-500" },
  { id: 3, title: "Read a Book", xp: 50, status: "todo", icon: BookOpen, color: "from-amber-400 to-orange-500", edge: "bg-slate-600" },
  { id: 4, title: "Drink 2L Water", xp: 40, status: "todo", icon: Droplet, color: "from-sky-400 to-blue-600", edge: "bg-slate-600" },
  { id: 5, title: "Meditate (10 min)", xp: 50, status: "todo", icon: Brain, color: "from-violet-500 to-fuchsia-600", edge: "bg-slate-600" },
];

const QUOTE = "Small steps every day create massive results.";
const DEFAULT_FOCUS_MINUTES = 25;

/* ------------------------------------------------------------------ */

const TONES: Record<"emerald" | "amber", { ring: string; dot: string; glow: string; text: string }> = {
  emerald: { ring: "border-emerald-400", dot: "bg-emerald-400", glow: "shadow-[0_0_12px_rgba(52,211,153,0.6)]", text: "text-emerald-300" },
  amber: { ring: "border-amber-400", dot: "bg-amber-400", glow: "shadow-[0_0_12px_rgba(251,191,36,0.6)]", text: "text-amber-300" },
};

const formatTimer = (s: number) => {
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  if (hrs > 0) {
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

// High-tech synthesizer alarm chime using Web Audio API
const playTimerAlarm = () => {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    [0, 0.22, 0.44].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now + delay);
      osc.frequency.exponentialRampToValueAtTime(1320, now + delay + 0.15);
      gain.gain.setValueAtTime(0.2, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.16);
    });
  } catch {
    // browser policy may silence before first user gesture
  }
};

function HudPanel({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-2xl bg-[rgba(8,16,38,0.75)] backdrop-blur-[12px] border border-[rgba(59,130,246,0.18)] shadow-[0_0_25px_rgba(0,0,0,0.5)] ${className}`}
    >
      {children}
    </div>
  );
}

function StatTile({ stat }: { stat: StatItem }) {
  const t = TONES[stat.tone];
  const Icon = stat.icon;
  return (
    <HudPanel className="p-3 flex flex-col items-start gap-2 !rounded-xl">
      <div className="flex items-center gap-2">
        <span className={`w-6 h-6 rounded-full border-2 ${t.ring} flex items-center justify-center ${t.text}`}>
          <Icon size={12} />
        </span>
        <span className="text-xl font-semibold text-white">
          {stat.value}
          {stat.unit && <span className="text-sm font-normal text-[#c3cde6] ml-1">{stat.unit}</span>}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-5 h-5 rounded-full ${t.dot} ${t.glow}`} />
        <span className="text-sm text-[#8fa3c7]">{stat.label}</span>
      </div>
    </HudPanel>
  );
}

function QuestRow({ quest, onAction }: { quest: QuestItem; onAction: (id: number) => void }) {
  const Icon = quest.icon;
  const badge =
    quest.status === "completed" ? (
      <span className="px-4 py-1 rounded-md text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-400/60">
        Completed
      </span>
    ) : quest.status === "progress" ? (
      <button
        type="button"
        onClick={() => onAction(quest.id)}
        className="px-4 py-1 rounded-md text-sm text-blue-200 bg-blue-600/20 border border-blue-400/70 hover:brightness-125 transition cursor-pointer"
      >
        In Progress
      </button>
    ) : (
      <button
        type="button"
        onClick={() => onAction(quest.id)}
        className="px-6 py-1.5 rounded-md text-sm text-[#c3cde6] bg-[rgba(30,27,75,0.7)] border border-[rgba(99,102,241,0.35)] hover:brightness-125 active:scale-[0.97] transition cursor-pointer"
      >
        Start
      </button>
    );

  return (
    <div className="relative flex items-center gap-3 pl-4 pr-2 py-2 rounded-lg bg-[rgba(8,16,38,0.75)] border border-[rgba(59,130,246,0.14)] overflow-hidden">
      <span className={`absolute left-0 top-0 bottom-0 w-[3px] ${quest.edge}`} />
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${quest.color} flex items-center justify-center text-white shadow-lg`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-semibold text-white truncate">{quest.title}</p>
        <p className="text-xs text-[#8fa3c7]">+{quest.xp} XP</p>
      </div>
      <div className="w-28 flex justify-center">{badge}</div>
      <button
        type="button"
        className="w-11 h-11 rounded-lg bg-[rgba(8,16,38,0.9)] border border-[rgba(59,130,246,0.18)] flex items-center justify-center text-emerald-400 hover:brightness-125 cursor-pointer"
        aria-label="Quest reward"
      >
        <Leaf size={18} />
      </button>
      <button
        type="button"
        className="w-11 h-11 rounded-lg bg-[rgba(8,16,38,0.9)] border border-[rgba(59,130,246,0.18)] flex items-center justify-center text-[#8fa3c7] hover:text-white cursor-pointer"
        aria-label="Reset quest"
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
}

export default function Dashboard() {
  const [quests, setQuests] = useState<QuestItem[]>(INITIAL_QUESTS);

  // Real clock/timer state
  const [totalSeconds, setTotalSeconds] = useState(DEFAULT_FOCUS_MINUTES * 60);
  const [timerSeconds, setTimerSeconds] = useState(DEFAULT_FOCUS_MINUTES * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [editMinutes, setEditMinutes] = useState(String(DEFAULT_FOCUS_MINUTES));
  const [editSeconds, setEditSeconds] = useState("00");
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    if (!isTimerRunning) return;
    const id = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          setTimerFinished(true);
          playTimerAlarm();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isTimerRunning]);

  // Apply custom time given by the user
  const applyCustomTime = (mins: number, secs: number = 0) => {
    const clampedMins = Math.max(0, Math.min(mins, 999));
    const clampedSecs = Math.max(0, Math.min(secs, 59));
    const total = clampedMins * 60 + clampedSecs;
    if (total <= 0) return;
    setIsTimerRunning(false);
    setTimerFinished(false);
    setTotalSeconds(total);
    setTimerSeconds(total);
    setEditMinutes(String(clampedMins));
    setEditSeconds(String(clampedSecs).padStart(2, "0"));
    setIsEditingTime(false);
  };

  const handleSaveEdit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const mins = parseInt(editMinutes, 10) || 0;
    const secs = parseInt(editSeconds, 10) || 0;
    applyCustomTime(mins, secs);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerFinished(false);
    setTimerSeconds(totalSeconds);
  };

  const adjustMinutes = (delta: number) => {
    const currentMins = Math.floor(timerSeconds / 60);
    const currentSecs = timerSeconds % 60;
    const newMins = Math.max(1, currentMins + delta);
    applyCustomTime(newMins, currentSecs);
  };

  // Start -> In Progress -> Completed
  const advanceQuest = (id: number) =>
    setQuests((qs) =>
      qs.map((q) =>
        q.id !== id
          ? q
          : { ...q, status: q.status === "todo" ? "progress" : q.status === "progress" ? "completed" : q.status }
      )
    );

  const xpPct = (HUNTER.xp / HUNTER.xpMax) * 100;
  const R = 80;
  const C = 2 * Math.PI * R;
  const timerProgress = totalSeconds > 0 ? timerSeconds / totalSeconds : 0;

  return (
    <AppShell activeRoute="/dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 px-6 py-3">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-5">
          <HudPanel className="p-5 flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <img
                src={HUNTER.avatar}
                alt=""
                className="w-28 h-28 rounded-full object-cover border-2 border-[rgba(99,102,241,0.7)] shadow-[0_0_20px_rgba(99,102,241,0.45)]"
              />
              <div className="flex-1">
                <p className="text-3xl font-bold">Lv. {HUNTER.level}</p>
                <div className="flex items-end justify-between">
                  <p className="text-base text-violet-300">{HUNTER.title}</p>
                  <p className="text-xs text-[#c3cde6]">
                    {HUNTER.xp.toLocaleString()} / {HUNTER.xpMax.toLocaleString()} XP
                  </p>
                </div>
                <div className="mt-2 h-3 rounded-full bg-[rgba(30,58,138,0.35)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] shadow-[0_0_14px_rgba(139,92,246,0.8)] transition-all duration-300"
                    style={{ width: `${xpPct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {STATS.map((s) => (
                <StatTile key={s.id} stat={s} />
              ))}
            </div>
          </HudPanel>

          <div>
            <h2 className="text-xl font-semibold mb-3">Today&apos;s Quests</h2>
            <div className="flex flex-col gap-1.5">
              {quests.map((q) => (
                <QuestRow key={q.id} quest={q} onAction={advanceQuest} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-5">
          {/* Rank */}
          <HudPanel className="p-5 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl border border-violet-400/70 bg-[rgba(76,29,149,0.35)] shadow-[0_0_18px_rgba(139,92,246,0.5)] flex items-center justify-center text-violet-200">
              <Hexagon size={30} />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold">{HUNTER.rank}</p>
              <p className="text-sm text-[#8fa3c7]">Next: {HUNTER.nextRank}</p>
              <p className="text-sm text-[#c3cde6]">{HUNTER.xpToNextRank.toLocaleString()} XP</p>
            </div>
          </HudPanel>

          {/* Focus Timer */}
          <HudPanel className="p-5 flex flex-col items-center justify-between text-center space-y-3">
            <div className="w-full flex items-center justify-between">
              <span className="text-sm font-bold text-white">Focus Timer</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  title="Adjust / Set custom time"
                  onClick={() => setIsEditingTime(!isEditingTime)}
                  className={`p-1.5 rounded-lg border transition cursor-pointer ${
                    isEditingTime
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,210,255,0.4)]"
                      : "bg-[rgba(8,16,38,0.7)] border-[rgba(59,130,246,0.18)] text-[#8fa3c7] hover:text-white hover:border-cyan-400/50"
                  }`}
                  aria-label="Set custom time"
                >
                  <SlidersHorizontal size={14} />
                </button>
                <button
                  type="button"
                  title="Reset timer"
                  onClick={resetTimer}
                  className="p-1.5 rounded-lg bg-[rgba(8,16,38,0.7)] border border-[rgba(59,130,246,0.18)] text-[#8fa3c7] hover:text-white hover:border-cyan-400/50 transition cursor-pointer"
                  aria-label="Reset timer"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="w-full flex items-center justify-center gap-1.5">
              {[15, 25, 45, 60].map((mins) => {
                const isActive = totalSeconds === mins * 60;
                return (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => applyCustomTime(mins, 0)}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/30 border border-cyan-400/60 text-cyan-300 shadow-[0_0_10px_rgba(0,210,255,0.4)]"
                        : "bg-[rgba(8,16,38,0.6)] border border-[rgba(59,130,246,0.15)] text-[#8fa3c7] hover:text-white hover:border-[rgba(59,130,246,0.35)]"
                    }`}
                  >
                    {mins}m
                  </button>
                );
              })}
            </div>

            {/* Glowing Neon Circular Progress Gauge */}
            <div className="relative w-60 h-60 flex items-center justify-center my-1">
              <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
                <defs>
                  <linearGradient id="timerGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="45%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#00d2ff" />
                  </linearGradient>
                </defs>
                <circle cx="90" cy="90" r={R} stroke="rgba(30, 58, 138, 0.35)" strokeWidth="6" fill="transparent" />
                <circle
                  cx="90"
                  cy="90"
                  r={R}
                  stroke="url(#timerGradient)"
                  strokeWidth="6.5"
                  strokeDasharray={C}
                  strokeDashoffset={C - C * timerProgress}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-300 drop-shadow-[0_0_15px_rgba(0,210,255,0.9)]"
                />
              </svg>

              {/* Center Content: Either Live Digits or Inline Edit Form */}
              <div className="absolute flex flex-col items-center">
                {isEditingTime ? (
                  <form onSubmit={handleSaveEdit} className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">Set Custom Time</span>
                    <div className="flex items-center gap-1">
                      <div className="flex flex-col items-center">
                        <input
                          type="number"
                          min="0"
                          max="999"
                          value={editMinutes}
                          onChange={(e) => setEditMinutes(e.target.value)}
                          className="w-14 px-1 py-0.5 text-center text-2xl font-bold bg-[#0c1836] border border-cyan-400/60 rounded-md text-white outline-none focus:border-cyan-300"
                          autoFocus
                        />
                        <span className="text-[9px] text-[#8fa3c7] mt-0.5">min</span>
                      </div>
                      <span className="text-2xl font-bold text-cyan-400 pb-3">:</span>
                      <div className="flex flex-col items-center">
                        <input
                          type="number"
                          min="0"
                          max="59"
                          value={editSeconds}
                          onChange={(e) => setEditSeconds(e.target.value)}
                          className="w-14 px-1 py-0.5 text-center text-2xl font-bold bg-[#0c1836] border border-cyan-400/60 rounded-md text-white outline-none focus:border-cyan-300"
                        />
                        <span className="text-[9px] text-[#8fa3c7] mt-0.5">sec</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <button
                        type="submit"
                        className="px-3 py-1 rounded-md text-xs font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition cursor-pointer"
                      >
                        Set
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingTime(false)}
                        className="px-2 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => !isTimerRunning && setIsEditingTime(true)}
                      title={!isTimerRunning ? "Click to set custom time" : undefined}
                      className={`text-3xl font-bold tracking-wider font-sans transition ${
                        timerFinished
                          ? "text-emerald-400 animate-pulse"
                          : !isTimerRunning
                            ? "text-white hover:text-cyan-300 cursor-pointer"
                            : "text-white"
                      }`}
                    >
                      {formatTimer(timerSeconds)}
                    </button>
                    <span className="text-xs font-medium text-[#8fa3c7] tracking-wide mt-1">
                      {timerFinished ? "Session Finished!" : isTimerRunning ? "Focusing..." : "Focus Time"}
                    </span>
                    {!isTimerRunning && (
                      <span
                        className="text-[10px] text-[#627798] hover:text-cyan-400 transition cursor-pointer mt-0.5"
                        onClick={() => setIsEditingTime(true)}
                      >
                        click time to edit
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Quick +/- Increments */}
            <div className="w-full flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => adjustMinutes(-5)}
                disabled={isTimerRunning || timerSeconds <= 300}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[rgba(8,16,38,0.7)] border border-[rgba(59,130,246,0.18)] text-[#8fa3c7] hover:text-white hover:border-cyan-400/40 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
              >
                -5m
              </button>
              <button
                type="button"
                onClick={() => adjustMinutes(-1)}
                disabled={isTimerRunning || timerSeconds <= 60}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[rgba(8,16,38,0.7)] border border-[rgba(59,130,246,0.18)] text-[#8fa3c7] hover:text-white hover:border-cyan-400/40 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
              >
                -1m
              </button>
              <button
                type="button"
                onClick={() => adjustMinutes(1)}
                disabled={isTimerRunning}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[rgba(8,16,38,0.7)] border border-[rgba(59,130,246,0.18)] text-[#8fa3c7] hover:text-white hover:border-cyan-400/40 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
              >
                +1m
              </button>
              <button
                type="button"
                onClick={() => adjustMinutes(5)}
                disabled={isTimerRunning}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[rgba(8,16,38,0.7)] border border-[rgba(59,130,246,0.18)] text-[#8fa3c7] hover:text-white hover:border-cyan-400/40 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
              >
                +5m
              </button>
            </div>

            {/* Start / Pause / Reset button */}
            <button
              type="button"
              onClick={() => {
                if (timerFinished) {
                  resetTimer();
                } else {
                  setIsTimerRunning(!isTimerRunning);
                }
              }}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#6366f1] via-[#3b82f6] to-[#0ea5e9] text-white font-bold text-sm tracking-wide shadow-[0_0_22px_rgba(59,130,246,0.7)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              {timerFinished ? "Start New Session" : isTimerRunning ? "Pause" : "Start"}
            </button>
          </HudPanel>

          {/* Quote */}
          <HudPanel className="p-5 flex items-center justify-center gap-3 text-center relative">
            <Sparkles size={14} className="text-[#8fa3c7] shrink-0" />
            <p className="text-sm text-[#c3cde6]">{QUOTE}</p>
          </HudPanel>
        </div>
      </div>
    </AppShell>
  );
}
