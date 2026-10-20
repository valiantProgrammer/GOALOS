"use client";

import React, { useState } from "react";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { BottomNav } from "@/components/ui/BottomNav";
import { DEMO_HUNTER, SKILLS_DATA } from "@goalos/config";
import {
  Sparkles,
  Shield,
  Clock,
  Target,
  Zap,
  Flame,
  Droplet,
  Crown,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState("offense");
  const [selectedSkillId, setSelectedSkillId] = useState("focus-mastery");
  const [skillPoints, setSkillPoints] = useState(DEMO_HUNTER.skillPoints);
  const [skills, setSkills] = useState(SKILLS_DATA);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedSkill = skills.find((s) => s.id === selectedSkillId) || skills[0];

  const handleUnlock = async () => {
    if (selectedSkill.level >= selectedSkill.maxLevel) {
      setToastMessage("Skill is already at maximum level.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    if (skillPoints < selectedSkill.requirements.skillPoints) {
      setToastMessage("Insufficient Skill Points.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setIsUnlocking(true);
    try {
      const res = await fetch("/api/skills/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId: selectedSkill.id }),
      });
      const data = await res.json();
      if (data.success) {
        setSkillPoints(data.remainingSkillPoints);
        setSkills((prev) =>
          prev.map((s) =>
            s.id === selectedSkill.id
              ? { ...s, level: data.newLevel, unlocked: true }
              : s
          )
        );
        setToastMessage(`SYSTEM: ${selectedSkill.name} upgraded to Level ${data.newLevel}!`);
      } else {
        setToastMessage(data.error || "Failed to unlock skill.");
      }
    } catch {
      // Local fallback for offline mode
      setSkillPoints((prev) => prev - selectedSkill.requirements.skillPoints);
      setSkills((prev) =>
        prev.map((s) =>
          s.id === selectedSkill.id
            ? { ...s, level: s.level + 1, unlocked: true }
            : s
        )
      );
      setToastMessage(`SYSTEM: ${selectedSkill.name} upgraded!`);
    } finally {
      setIsUnlocking(false);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleReset = () => {
    setSkillPoints(DEMO_HUNTER.skillPoints + 2);
    setSkills(SKILLS_DATA);
    setToastMessage("All skill points have been reset to pool.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex h-screen overflow-hidden w-full bg-transparent text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/goals" className="hidden md:flex shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <TopBar searchPlaceholder="Search goals, habits..." className="shrink-0" />

        {toastMessage && (
          <div className="absolute top-16 right-8 z-50 bg-[#0d1b30] border border-cyan-400 text-cyan-200 px-4 py-2 rounded-lg shadow-lg shadow-cyan-950/50 flex items-center gap-2 text-xs font-semibold animate-pulse">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Title & Skill Points Bar */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-wide text-white">Skill Tree</h1>

            <div className="flex items-center gap-4">
              <div className="bg-[#0b1528] border border-blue-900/60 rounded-xl px-4 py-2 flex items-center gap-3">
                <span className="text-xs text-slate-400 font-medium">Skill Points</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 to-teal-400 flex items-center justify-center text-[10px] text-black font-bold">
                    *
                  </div>
                  <span className="text-sm font-bold text-white">{skillPoints}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="bg-[#0b1528] hover:bg-[#11203b] border border-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2">
            {[
              { id: "offense", label: "Offense" },
              { id: "defense", label: "Defense" },
              { id: "utility", label: "Utility" },
              { id: "special", label: "Special" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-[#0b1528] text-slate-400 hover:text-slate-200 border border-slate-800/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Hexagonal Constellation Area */}
            <div className="lg:col-span-8 bg-[#070e1c] border border-blue-900/40 rounded-2xl p-6 relative min-h-[460px] flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Background ambient light */}
              <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-2xl" />
              </div>

              {/* Hexagonal Interactive SVG Constellation */}
              <div className="relative w-full h-[360px] flex items-center justify-center">
                {/* SVG Connecting Lines with glowing paths */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Center to Top */}
                  <line x1="50" y1="55" x2="50" y2="20" stroke="#3b82f6" strokeWidth="0.6" strokeDasharray="1.5 1.5" className="opacity-70" />
                  {/* Center to Right-Top */}
                  <line x1="50" y1="55" x2="76" y2="38" stroke="#3b82f6" strokeWidth="0.6" className="opacity-70" />
                  {/* Center to Left-Top */}
                  <line x1="50" y1="55" x2="24" y2="38" stroke="#10b981" strokeWidth="0.6" className="opacity-70" />
                  {/* Center to Bottom */}
                  <line x1="50" y1="55" x2="50" y2="88" stroke="#a855f7" strokeWidth="0.8" className="opacity-80" />
                  {/* Left-Top to Left-Bottom */}
                  <line x1="24" y1="38" x2="22" y2="72" stroke="#10b981" strokeWidth="0.6" strokeDasharray="1.5 1.5" className="opacity-60" />
                  {/* Right-Top to Right-Bottom */}
                  <line x1="76" y1="38" x2="78" y2="72" stroke="#06b6d4" strokeWidth="0.6" className="opacity-60" />
                  {/* Center to Left-Bottom */}
                  <line x1="50" y1="55" x2="22" y2="72" stroke="#10b981" strokeWidth="0.5" className="opacity-40" />
                  {/* Center to Right-Bottom */}
                  <line x1="50" y1="55" x2="78" y2="72" stroke="#06b6d4" strokeWidth="0.5" className="opacity-40" />
                  {/* Bottom to Right-Bottom */}
                  <line x1="50" y1="88" x2="78" y2="72" stroke="#3b82f6" strokeWidth="0.6" className="opacity-60" />
                  {/* Bottom to Left-Bottom */}
                  <line x1="50" y1="88" x2="22" y2="72" stroke="#10b981" strokeWidth="0.6" className="opacity-60" />

                  {/* Central Node Pulse Ring */}
                  <circle cx="50" cy="38" r="1.5" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
                  <circle cx="50" cy="72" r="1.5" fill="none" stroke="#c084fc" strokeWidth="0.5" />
                </svg>

                {/* Hex Nodes positioned identically to mockup */}
                {/* 1. Top Node: Time Control */}
                <button
                  onClick={() => setSelectedSkillId("time-control")}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-14 h-16 flex items-center justify-center transition-all ${
                    selectedSkillId === "time-control" ? "scale-110 drop-shadow-[0_0_15px_#3b82f6]" : "hover:scale-105"
                  }`}
                  style={{ left: "50%", top: "20%" }}
                >
                  <HexagonShape color="#3b82f6" active={selectedSkillId === "time-control"} icon={<Clock className="w-5 h-5 text-sky-200" />} />
                </button>

                {/* 2. Left-Top Node: Shadow Surge */}
                <button
                  onClick={() => setSelectedSkillId("shadow-surge")}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-14 h-16 flex items-center justify-center transition-all ${
                    selectedSkillId === "shadow-surge" ? "scale-110 drop-shadow-[0_0_15px_#10b981]" : "hover:scale-105"
                  }`}
                  style={{ left: "24%", top: "38%" }}
                >
                  <HexagonShape color="#10b981" active={selectedSkillId === "shadow-surge"} icon={<Zap className="w-5 h-5 text-emerald-200" />} />
                </button>

                {/* 3. Center Node: Focus Mastery */}
                <button
                  onClick={() => setSelectedSkillId("focus-mastery")}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-18 flex items-center justify-center transition-all ${
                    selectedSkillId === "focus-mastery" ? "scale-115 drop-shadow-[0_0_20px_#a855f7]" : "hover:scale-105"
                  }`}
                  style={{ left: "50%", top: "55%" }}
                >
                  <HexagonShape color="#a855f7" active={selectedSkillId === "focus-mastery"} icon={<Target className="w-6 h-6 text-purple-200" />} />
                </button>

                {/* 4. Right-Top Node: Mental Fortitude */}
                <button
                  onClick={() => setSelectedSkillId("mental-fortitude")}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-14 h-16 flex items-center justify-center transition-all ${
                    selectedSkillId === "mental-fortitude" ? "scale-110 drop-shadow-[0_0_15px_#3b82f6]" : "hover:scale-105"
                  }`}
                  style={{ left: "76%", top: "38%" }}
                >
                  <HexagonShape color="#3b82f6" active={selectedSkillId === "mental-fortitude"} icon={<Shield className="w-5 h-5 text-blue-200" />} />
                </button>

                {/* 5. Left-Bottom Node: Discipline Core */}
                <button
                  onClick={() => setSelectedSkillId("discipline-core")}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-13 h-15 flex items-center justify-center transition-all ${
                    selectedSkillId === "discipline-core" ? "scale-110 drop-shadow-[0_0_15px_#10b981]" : "hover:scale-105"
                  }`}
                  style={{ left: "22%", top: "72%" }}
                >
                  <HexagonShape color="#10b981" active={selectedSkillId === "discipline-core"} icon={<Flame className="w-4 h-4 text-emerald-300" />} />
                </button>

                {/* 6. Right-Bottom Node: Iron Will */}
                <button
                  onClick={() => setSelectedSkillId("iron-will")}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-13 h-15 flex items-center justify-center transition-all ${
                    selectedSkillId === "iron-will" ? "scale-110 drop-shadow-[0_0_15px_#06b6d4]" : "hover:scale-105"
                  }`}
                  style={{ left: "78%", top: "72%" }}
                >
                  <HexagonShape color="#06b6d4" active={selectedSkillId === "iron-will"} icon={<Droplet className="w-4 h-4 text-cyan-200" />} />
                </button>

                {/* 7. Bottom Node: Monarch Awakening */}
                <button
                  onClick={() => setSelectedSkillId("monarch-awakening")}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-14 h-16 flex items-center justify-center transition-all ${
                    selectedSkillId === "monarch-awakening" ? "scale-110 drop-shadow-[0_0_15px_#3b82f6]" : "hover:scale-105"
                  }`}
                  style={{ left: "50%", top: "88%" }}
                >
                  <HexagonShape color="#3b82f6" active={selectedSkillId === "monarch-awakening"} icon={<Crown className="w-5 h-5 text-sky-200" />} />
                </button>

                {/* Mini satellites on the bottom right as drawn in mockup */}
                <div className="absolute right-[16%] bottom-[12%] w-6 h-6 rounded-full border border-cyan-500/60 flex items-center justify-center bg-[#071328]">
                  <Flame className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="absolute right-[8%] bottom-[12%] w-6 h-6 rounded-full border border-purple-500/60 flex items-center justify-center bg-[#071328]">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                </div>
              </div>

              {/* Motto at bottom left */}
              <div className="text-[11px] font-black tracking-widest text-slate-400/80 uppercase leading-snug select-none">
                DISCIPLINE<br />
                UNLOCKS<br />
                HIDDEN<br />
                POTENTIAL
              </div>
            </div>

            {/* Right Skill Detail Card */}
            <div className="lg:col-span-4 bg-[#070e1c] border border-blue-900/40 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-2xl">
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedSkill.name}</h2>
                  <p className="text-xs text-slate-400 mt-1">{selectedSkill.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-300">Level</span>
                  <span className="text-xs font-bold text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded">
                    {selectedSkill.level}/{selectedSkill.maxLevel}
                  </span>
                  {selectedSkill.level > 0 && (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  )}
                </div>

                {/* Effects Section */}
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Effects:</span>
                  <div className="space-y-1.5">
                    {selectedSkill.effects.map((effect, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-blue-400 mt-0.5">◆</span>
                        <span>{effect}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements Section */}
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Requirements:</span>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="text-blue-400">◆</span>
                      <span>Level {selectedSkill.requirements.minLevel}+</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="text-blue-400">◆</span>
                      <span>{selectedSkill.requirements.skillPoints} Skill Points</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unlock Action Button */}
              <button
                onClick={handleUnlock}
                disabled={isUnlocking}
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {selectedSkill.level >= selectedSkill.maxLevel
                    ? "Max Level Reached"
                    : isUnlocking
                    ? "Unlocking..."
                    : "Unlock Skill"}
                </span>
              </button>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

// Custom Hexagon Shape with SVG border
function HexagonShape({
  color,
  active,
  icon,
}: {
  color: string;
  active: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <polygon
          points="50 3, 90 25, 90 75, 50 97, 10 75, 10 25"
          fill="#0a1426"
          stroke={color}
          strokeWidth={active ? "4" : "2.5"}
          className="transition-all"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{icon}</div>
    </div>
  );
}
