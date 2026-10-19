"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { ArtPanel } from "@/components/ui/ArtPanel";
import { HudPanel } from "@/components/ui/HudPanel";
import { SystemButton } from "@/components/ui/SystemButton";

const STATUS_TABS = ["Active (5)", "Completed (12)", "Archived (2)"];
const CATEGORIES = ["All", "Study", "Work", "Health", "Personal", "Finance"];

const GOALS = [
  {
    id: "g-1",
    title: "Become a Full Stack Developer",
    desc: "Learn, build and get placed in a top engineering firm",
    progress: 78,
    milestones: "11/15 milestones",
    priority: "High",
    due: "Dec 31, 2026",
    icon: "💻",
    color: "#3b6cf6",
  },
  {
    id: "g-2",
    title: "Improve Physical Health",
    desc: "Workout, eat clean, stay fit and build endurance",
    progress: 45,
    milestones: "2/5 milestones",
    priority: "Medium",
    due: "Jun 20, 2027",
    icon: "🛡️",
    color: "#10b981",
  },
  {
    id: "g-3",
    title: "Read 50 Books",
    desc: "Expand knowledge, mindset and mental models",
    progress: 20,
    milestones: "10/50 books",
    priority: "Low",
    due: "Dec 31, 2027",
    icon: "📚",
    color: "#ec4899",
  },
  {
    id: "g-4",
    title: "Build Personal Brand",
    desc: "Create content, share technical learnings and grow audience",
    progress: 10,
    milestones: "2/20 milestones",
    priority: "Medium",
    due: "Mar 15, 2027",
    icon: "📢",
    color: "#f59e0b",
  },
];

export default function GoalsDashboardPage() {
  const [activeTab, setActiveTab] = useState("Active (5)");
  const [activeCategory, setActiveCategory] = useState("All");

  const getPriorityStyle = (p: string) => {
    switch (p) {
      case "High":
        return "bg-rose-500/15 border-rose-500 text-rose-400";
      case "Medium":
        return "bg-amber-500/15 border-amber-500 text-amber-400";
      default:
        return "bg-emerald-500/15 border-emerald-500 text-emerald-400";
    }
  };

  return (
    <div className="flex h-screen bg-[#050814] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/goals" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopBar searchPlaceholder="Search goals, habits..." />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Goals Area */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Top Row with Header and Action */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-white tracking-wide">Goals</h1>
                <p className="text-xs text-slate-400 mt-1">Track long term hunter ambitions and milestones</p>
              </div>
              <SystemButton variant="primary" className="text-xs px-4 py-2">
                + New Goal
              </SystemButton>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 bg-[#0a1224] p-1.5 rounded-lg border border-[#142852] w-fit">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wider transition-all ${
                    activeTab === tab
                      ? "bg-[#3b6cf6] text-white shadow-[0_0_12px_rgba(59,108,246,0.5)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Category Pills */}
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    activeCategory === cat
                      ? "bg-[#00d2ff]/15 border-[#00d2ff] text-[#00d2ff]"
                      : "bg-[#0a1224] border-[#142852] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Goals List */}
            <div className="space-y-4">
              {GOALS.map((goal) => (
                <Link
                  key={goal.id}
                  href={`/goals/${goal.id}`}
                  className="block transition-transform hover:-translate-y-0.5"
                >
                  <HudPanel className="p-5 flex items-center justify-between gap-6 hover:border-[#3b6cf6]/60">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border"
                        style={{
                          backgroundColor: `${goal.color}20`,
                          borderColor: goal.color,
                        }}
                      >
                        {goal.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="text-sm font-bold text-white truncate">
                            {goal.title}
                          </h3>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getPriorityStyle(
                              goal.priority
                            )}`}
                          >
                            {goal.priority}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-1">{goal.desc}</p>
                        <div className="mt-3 flex items-center gap-4">
                          <div className="flex-1 max-w-xs h-2 bg-[#050814] rounded-full overflow-hidden border border-[#142852]">
                            <div
                              className="h-full bg-[#00d2ff]"
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-[#00d2ff]">
                            {goal.progress}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {goal.milestones}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400">Due Date</div>
                      <div className="text-xs font-bold text-slate-200 mt-1">{goal.due}</div>
                    </div>
                  </HudPanel>
                </Link>
              ))}
            </div>
          </main>

          {/* Right Art Panel */}
          <ArtPanel quote="BIG GOALS CREATE A BIGGER YOU" />
        </div>
      </div>
    </div>
  );
}
