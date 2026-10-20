"use client";

import React, { useState } from "react";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { HudPanel } from "@/components/ui/HudPanel";
import { SystemButton } from "@/components/ui/SystemButton";

const TABS = ["Daily", "Weekly", "Monthly", "All Tasks"];

const TASKS = [
  { id: "t-1", title: "Morning Workout", time: "8:00 AM - 9:00 AM", priority: "High" },
  { id: "t-2", title: "Study DSA (1 hour)", time: "9:00 AM - 10:00 AM", priority: "High" },
  { id: "t-3", title: "Attend Classes", time: "11:00 AM - 1:00 PM", priority: "Medium" },
  { id: "t-4", title: "Project Work", time: "2:00 PM - 4:00 PM", priority: "Low" },
  { id: "t-5", title: "Read a Book", time: "7:00 PM - 8:00 PM", priority: "Medium" },
  { id: "t-6", title: "Meditation", time: "8:00 PM - 8:30 PM", priority: "Low" },
];

export default function PlannerPage() {
  const [activeTab, setActiveTab] = useState("Daily");

  const getPriorityChip = (p: string) => {
    switch (p) {
      case "High":
        return "bg-rose-500/15 border-rose-500 text-rose-400";
      case "Medium":
        return "bg-amber-500/15 border-amber-500 text-amber-400";
      default:
        return "bg-sky-500/15 border-sky-500 text-sky-400";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#050814] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/planner" className="hidden md:flex shrink-0" />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar searchPlaceholder="Search tasks, planner..." className="shrink-0" />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Planner Content */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Header Controls */}
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-white tracking-wide">
                  Planner & Schedule
                </h1>
                <div className="flex bg-[#0a1224] p-1 rounded-lg border border-[#142852]">
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                        activeTab === tab
                          ? "bg-[#3b6cf6] text-white shadow-[0_0_10px_rgba(59,108,246,0.5)]"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#0a1224] px-3 py-1.5 rounded-lg border border-[#142852]">
                  <button className="text-xs text-slate-400 hover:text-white">&lt;</button>
                  <span className="text-xs font-semibold text-white">Tue, Oct 14, 2026</span>
                  <button className="text-xs text-slate-400 hover:text-white">&gt;</button>
                </div>
                <SystemButton variant="primary" className="text-xs px-4 py-2">
                  + Add Task
                </SystemButton>
              </div>
            </div>

            {/* Grid Layout: Today's Plan + Eisenhower Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Today's Plan */}
              <div className="lg:col-span-5 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Today's Plan
                </h2>
                <div className="space-y-3">
                  {TASKS.map((t) => (
                    <HudPanel
                      key={t.id}
                      className="p-3.5 flex items-center justify-between hover:border-[#3b6cf6]/60"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="accent-[#3b6cf6] w-4 h-4 rounded cursor-pointer"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{t.title}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{t.time}</div>
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${getPriorityChip(
                          t.priority
                        )}`}
                      >
                        {t.priority}
                      </span>
                    </HudPanel>
                  ))}
                </div>
              </div>

              {/* Right Column: Priority Matrix & Task Stats */}
              <div className="lg:col-span-7 space-y-6">
                {/* Priority Matrix (Eisenhower) */}
                <HudPanel className="p-5 space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Priority Matrix
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Quadrant 1: Do Now */}
                    <div className="bg-[#050814] p-3.5 rounded-xl border border-rose-500/40 space-y-2">
                      <div className="text-xs font-bold text-rose-400 flex items-center justify-between">
                        <span>1. Do Now</span>
                        <span className="text-[10px] text-slate-500">Urgent + Important</span>
                      </div>
                      <ul className="text-xs text-slate-300 space-y-1">
                        <li>• Study DSA</li>
                        <li>• Project Work</li>
                      </ul>
                    </div>

                    {/* Quadrant 2: Schedule */}
                    <div className="bg-[#050814] p-3.5 rounded-xl border border-sky-500/40 space-y-2">
                      <div className="text-xs font-bold text-sky-400 flex items-center justify-between">
                        <span>2. Schedule</span>
                        <span className="text-[10px] text-slate-500">Not Urgent + Important</span>
                      </div>
                      <ul className="text-xs text-slate-300 space-y-1">
                        <li>• Read a Book</li>
                        <li>• Build Project</li>
                      </ul>
                    </div>

                    {/* Quadrant 3: Delegate */}
                    <div className="bg-[#050814] p-3.5 rounded-xl border border-amber-500/40 space-y-2">
                      <div className="text-xs font-bold text-amber-400 flex items-center justify-between">
                        <span>3. Delegate</span>
                        <span className="text-[10px] text-slate-500">Urgent + Not Important</span>
                      </div>
                      <ul className="text-xs text-slate-300 space-y-1">
                        <li>• Email replies</li>
                      </ul>
                    </div>

                    {/* Quadrant 4: Eliminate */}
                    <div className="bg-[#050814] p-3.5 rounded-xl border border-slate-700 space-y-2">
                      <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
                        <span>4. Eliminate</span>
                        <span className="text-[10px] text-slate-500">Not Urgent + Not Important</span>
                      </div>
                      <ul className="text-xs text-slate-400 space-y-1">
                        <li>• Social Media</li>
                      </ul>
                    </div>
                  </div>
                </HudPanel>

                {/* Task Statistics */}
                <HudPanel className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full border-4 border-[#00d2ff] flex items-center justify-center font-bold text-sm text-white shadow-[0_0_12px_rgba(0,210,255,0.3)]">
                      68%
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                        <span className="text-slate-300">Completed:</span>
                        <span className="font-bold text-white">5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00d2ff]" />
                        <span className="text-slate-300">In Progress:</span>
                        <span className="font-bold text-white">2</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#64748b]" />
                        <span className="text-slate-300">Not Started:</span>
                        <span className="font-bold text-white">3</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono text-[#00d2ff] uppercase tracking-wider block font-bold">
                      Plan Today
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Progress Tomorrow
                    </span>
                  </div>
                </HudPanel>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
