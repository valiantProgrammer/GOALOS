"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { ArtPanel } from "@/components/ui/ArtPanel";
import { HudPanel } from "@/components/ui/HudPanel";
import { SystemButton } from "@/components/ui/SystemButton";

const TABS = ["Overview", "Milestones", "Linked Quests", "Notes", "Analytics"];

const MILESTONES = [
  { id: "m-1", title: "Learn HTML, CSS, JS", status: "Completed", due: "Oct 10, 2026" },
  { id: "m-2", title: "Learn React", status: "Completed", due: "Oct 15, 2026" },
  { id: "m-3", title: "Learn Node.js", status: "In Progress", due: "Nov 01, 2026" },
  { id: "m-4", title: "Build 3 Projects", status: "In Progress", due: "Dec 01, 2026" },
  { id: "m-5", title: "Deploy Portfolio", status: "Not Started", due: "Dec 05, 2026" },
  { id: "m-6", title: "Prepare for Interviews", status: "Not Started", due: "Dec 20, 2026" },
];

export default function GoalDetailsPage() {
  const [activeTab, setActiveTab] = useState("Milestones");

  const getStatusChip = (s: string) => {
    switch (s) {
      case "Completed":
        return "bg-emerald-500/15 border-emerald-500 text-emerald-400";
      case "In Progress":
        return "bg-sky-500/15 border-sky-500 text-sky-400";
      default:
        return "bg-slate-700/20 border-slate-700 text-slate-400";
    }
  };

  return (
    <div className="flex h-screen bg-[#050814] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/goals" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopBar searchPlaceholder="Search goals, milestones..." />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Back Button */}
            <Link
              href="/goals"
              className="text-xs text-[#00d2ff] hover:underline flex items-center gap-1 font-semibold"
            >
              &larr; Back to Goals
            </Link>

            {/* Goal Header Card */}
            <HudPanel className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-white tracking-wide">
                      Become a Full Stack Developer
                    </h1>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-rose-500 bg-rose-500/15 text-rose-400 uppercase">
                      High Priority
                    </span>
                    <span className="text-xs text-slate-400">📅 Due Dec 31, 2026</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Learn, build and get placed in a good company
                  </p>

                  <div className="pt-2 flex items-center gap-4 max-w-lg">
                    <div className="flex-1 h-2 bg-[#050814] rounded-full overflow-hidden border border-[#142852]">
                      <div className="h-full bg-[#00d2ff]" style={{ width: "78%" }} />
                    </div>
                    <span className="text-xs font-bold text-[#00d2ff]">78%</span>
                    <span className="text-xs text-slate-400">11/15 milestones</span>
                  </div>
                </div>

                <SystemButton variant="primary" className="text-xs px-4 py-2">
                  Edit Goal
                </SystemButton>
              </div>
            </HudPanel>

            {/* Tabs */}
            <div className="flex gap-2 bg-[#0a1224] p-1.5 rounded-lg border border-[#142852] w-fit">
              {TABS.map((tab) => (
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

            {/* Main Milestones & Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Milestones Checklist */}
              <div className="lg:col-span-8 space-y-3">
                {MILESTONES.map((m) => (
                  <HudPanel
                    key={m.id}
                    className="p-4 flex items-center justify-between hover:border-[#3b6cf6]/60"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs ${
                          m.status === "Completed"
                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                            : m.status === "In Progress"
                            ? "border-sky-500 bg-sky-500/20 text-sky-400"
                            : "border-slate-600 bg-slate-800 text-slate-400"
                        }`}
                      >
                        {m.status === "Completed" ? "✓" : "○"}
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          m.status === "Completed" ? "text-slate-200" : "text-white"
                        }`}
                      >
                        {m.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400">{m.due}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getStatusChip(
                          m.status
                        )}`}
                      >
                        {m.status}
                      </span>
                    </div>
                  </HudPanel>
                ))}
              </div>

              {/* Goal Statistics Sidebar */}
              <div className="lg:col-span-4">
                <HudPanel className="p-5 space-y-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Goal Statistics
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-[#142852]">
                      <span className="text-slate-400">Total Milestones</span>
                      <span className="font-bold text-white">15</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#142852]">
                      <span className="text-slate-400">Completed</span>
                      <span className="font-bold text-[#10b981]">12</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#142852]">
                      <span className="text-slate-400">Remaining</span>
                      <span className="font-bold text-[#f59e0b]">3</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#142852]">
                      <span className="text-slate-400">Completion</span>
                      <span className="font-bold text-[#00d2ff]">78%</span>
                    </div>
                  </div>

                  <div className="flex justify-center pt-2">
                    <div className="w-24 h-24 rounded-full border-4 border-[#00d2ff] flex items-center justify-center font-bold text-lg text-white shadow-[0_0_15px_rgba(0,210,255,0.3)]">
                      78%
                    </div>
                  </div>
                </HudPanel>
              </div>
            </div>
          </main>

          {/* Right Art Panel */}
          <ArtPanel quote="DISCIPLINE TURNS GOALS INTO REALITY" />
        </div>
      </div>
    </div>
  );
}
