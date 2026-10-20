"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SidebarNav,
  TopBar,
  BottomNav,
  HudPanel,
  SystemButton,
  StatusChip,
} from "@/components/ui";
import {
  Award,
  Flame,
  Sun,
  BookOpen,
  Dumbbell,
  Users,
  Sword,
  GraduationCap,
  Sparkles,
  CheckCircle,
} from "lucide-react";

interface AchievementCardData {
  id: string;
  title: string;
  desc: string;
  status: "unlocked" | "in_progress" | "locked";
  icon: React.ElementType;
}

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const achievements: AchievementCardData[] = [
    { id: "1", title: "First Step", desc: "Complete your first ever hunter quest", status: "unlocked", icon: Sparkles },
    { id: "2", title: "7 Day Streak", desc: "Maintain habit consistency for 7 days", status: "unlocked", icon: Flame },
    { id: "3", title: "Early Bird", desc: "Complete morning routine before 8:00 AM", status: "unlocked", icon: Sun },
    { id: "4", title: "Book Reader", desc: "Read 20 pages across 5 consecutive days", status: "in_progress", icon: BookOpen },
    { id: "5", title: "Fitness Master", desc: "Complete 30 workout training sessions", status: "unlocked", icon: Dumbbell },
    { id: "6", title: "Social Butterfly", desc: "Join 3 party quests with hunters", status: "in_progress", icon: Users },
    { id: "7", title: "Dungeon Explorer", desc: "Clear your first boss dungeon tier", status: "unlocked", icon: Sword },
    { id: "8", title: "Knowledge Seeker", desc: "Complete 50 study and research quests", status: "in_progress", icon: GraduationCap },
  ];

  const recentList = [
    { title: "Early Bird", time: "1 hour ago", icon: Sun, color: "text-amber-400" },
    { title: "Level Up! (Lv. 32)", time: "10 hours ago", icon: Sparkles, color: "text-[#00d2ff]" },
    { title: "7 Day Streak", time: "1 day ago", icon: Flame, color: "text-orange-400" },
    { title: "Quest Completed!", time: "2 days ago", icon: CheckCircle, color: "text-emerald-400" },
    { title: "New Title Unlocked", time: "3 days ago", icon: Award, color: "text-purple-400" },
  ];

  const tabs = ["All", "Unlocked (18)", "Locked (20)", "Titles"];

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
                Achievements & Titles
              </h1>
              <p className="text-xs text-[#94a3b8] mt-1 font-medium">
                Milestones unlocked through persistent daily training and quest completion.
              </p>
            </div>

            {/* Total Progress */}
            <div className="flex items-center gap-3 bg-[#0a1224] border border-[#142852] px-4 py-2 rounded-xl">
              <span className="text-xs font-hud font-bold text-[#94a3b8] uppercase">
                Total Progress
              </span>
              <span className="font-heading text-base font-black text-[#00d2ff]">
                38%
              </span>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0a1224] border border-[#142852] w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-[#3b6cf6] text-white shadow-[0_0_10px_rgba(59,108,246,0.4)]"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main Grid: Achievements Grid (Left 8 Cols) + Recent Achievements (Right 4 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Achievements 8 Cols */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((ach) => {
                  const Icon = ach.icon;
                  const isUnlocked = ach.status === "unlocked";

                  return (
                    <HudPanel
                      key={ach.id}
                      className={`p-5 flex flex-col items-center text-center space-y-3 transition-all duration-200 hover:-translate-y-1 ${
                        isUnlocked
                          ? "border-[#204899] shadow-[0_0_20px_rgba(0,210,255,0.1)]"
                          : "border-[#142852] opacity-75"
                      }`}
                    >
                      {/* Hexagonal Badge Crest */}
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                          isUnlocked
                            ? "bg-gradient-to-br from-[#132c66] to-[#0d1933] border-[#00d2ff] text-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                            : "bg-[#050814] border-[#142852] text-[#64748b]"
                        }`}
                      >
                        <Icon size={24} />
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white font-heading">{ach.title}</h4>
                        <p className="text-[10px] text-[#94a3b8] mt-1 leading-tight line-clamp-2">
                          {ach.desc}
                        </p>
                      </div>

                      <div className="pt-1 w-full">
                        <StatusChip status={ach.status === "unlocked" ? "completed" : "in_progress"} />
                      </div>
                    </HudPanel>
                  );
                })}
              </div>
            </div>

            {/* Recent Achievements List 4 Cols matching DM-16 */}
            <div className="lg:col-span-4">
              <HudPanel className="p-6 space-y-4 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                  Recent Achievements
                </h3>

                <div className="space-y-3">
                  {recentList.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3.5 p-3 rounded-xl bg-[#050814] border border-[#142852] hover:border-[#204899] transition-all"
                      >
                        <div className={`p-2 rounded-lg bg-[#0d1933] ${item.color}`}>
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-white truncate">{item.title}</div>
                          <div className="text-[10px] text-[#64748b] mt-0.5">{item.time}</div>
                        </div>
                      </div>
                    );
                  })}
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
