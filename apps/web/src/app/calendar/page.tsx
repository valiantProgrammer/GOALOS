"use client";

import React, { useState } from "react";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { HudPanel } from "@/components/ui/HudPanel";
import { SystemButton } from "@/components/ui/SystemButton";

const DAYS = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18", "Sat 19", "Sun 20"];
const HOURS = ["8:00 AM", "9:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "5:00 PM"];

const UPCOMING = [
  { id: "e-1", title: "Morning Workout", time: "8:00 AM - 9:00 AM", color: "#10b981" },
  { id: "e-2", title: "Study DSA", time: "9:00 AM - 10:00 AM", color: "#8b5cf6" },
  { id: "e-3", title: "Project Meeting", time: "2:00 PM - 3:30 PM", color: "#f59e0b" },
  { id: "e-4", title: "Read a Book", time: "5:00 PM - 6:00 PM", color: "#ec4899" },
];

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState<"Day" | "Week" | "Month">("Week");

  return (
    <div className="flex h-screen overflow-hidden bg-[#050814] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/calendar" className="hidden md:flex shrink-0" />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar searchPlaceholder="Search events, schedule..." className="shrink-0" />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Calendar View */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Calendar Controls */}
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-white tracking-wide">
                  Calendar & Time Blocking
                </h1>
                <div className="flex items-center gap-2 bg-[#0a1224] px-3 py-1.5 rounded-lg border border-[#142852]">
                  <button className="text-xs text-slate-400 hover:text-white">&lt;</button>
                  <span className="text-xs font-semibold text-white">Oct 14 - 20, 2026</span>
                  <button className="text-xs text-slate-400 hover:text-white">&gt;</button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex bg-[#0a1224] p-1 rounded-lg border border-[#142852]">
                  {(["Day", "Week", "Month"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                        viewMode === mode
                          ? "bg-[#3b6cf6] text-white shadow-[0_0_10px_rgba(59,108,246,0.5)]"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                <SystemButton variant="primary" className="text-xs px-4 py-2">
                  + Add Event
                </SystemButton>
              </div>
            </div>

            {/* Time Blocking Weekly Matrix */}
            <HudPanel className="p-4 overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Header row of days */}
                <div className="grid grid-cols-8 gap-2 border-b border-[#142852] pb-3 mb-3 text-center">
                  <div className="text-xs text-slate-500 font-bold">TIME</div>
                  {DAYS.map((d) => (
                    <div key={d} className="text-xs font-bold text-slate-300">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Grid hours */}
                <div className="space-y-3">
                  {HOURS.map((hr, idx) => (
                    <div key={hr} className="grid grid-cols-8 gap-2 items-center min-h-[44px]">
                      <div className="text-[11px] text-slate-400 font-mono">{hr}</div>
                      {DAYS.map((_, dayIdx) => {
                        if (idx === 0) {
                          return (
                            <div
                              key={dayIdx}
                              className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold p-1.5 rounded truncate"
                            >
                              Morning Workout
                            </div>
                          );
                        }
                        if (idx === 1 && dayIdx < 5) {
                          return (
                            <div
                              key={dayIdx}
                              className="bg-purple-500/20 border border-purple-500/50 text-purple-300 text-[10px] font-bold p-1.5 rounded truncate"
                            >
                              Study DSA
                            </div>
                          );
                        }
                        if (idx === 2) {
                          return (
                            <div
                              key={dayIdx}
                              className="bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[10px] font-bold p-1.5 rounded truncate"
                            >
                              Lunch Break
                            </div>
                          );
                        }
                        if (idx === 3 && dayIdx % 2 === 0) {
                          return (
                            <div
                              key={dayIdx}
                              className="bg-sky-500/20 border border-sky-500/50 text-sky-300 text-[10px] font-bold p-1.5 rounded truncate"
                            >
                              Project Work
                            </div>
                          );
                        }
                        if (idx === 5) {
                          return (
                            <div
                              key={dayIdx}
                              className="bg-pink-500/20 border border-pink-500/50 text-pink-300 text-[10px] font-bold p-1.5 rounded truncate"
                            >
                              Read a Book
                            </div>
                          );
                        }
                        return (
                          <div
                            key={dayIdx}
                            className="border border-[#142852]/40 bg-[#050814]/30 h-10 rounded"
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </HudPanel>
          </main>

          {/* Right Sidebar: Mini Month & Upcoming Events */}
          <aside className="w-80 border-l border-[#142852] bg-[#070d1c] p-5 space-y-6 overflow-y-auto hidden xl:block">
            {/* Mini Month */}
            <HudPanel className="p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  October 2026
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-400 mb-2 font-semibold">
                <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={`py-1 rounded text-[11px] ${
                      day === 14
                        ? "bg-[#00d2ff] text-slate-950 font-bold shadow-[0_0_8px_#00d2ff]"
                        : [15, 16, 17, 18, 19, 20].includes(day)
                        ? "text-white bg-[#0a1224]"
                        : "text-slate-500"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </HudPanel>

            {/* Upcoming Events */}
            <HudPanel className="p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Upcoming Events
              </h3>
              <div className="space-y-2.5">
                {UPCOMING.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-2.5 rounded-lg border border-[#142852] bg-[#050814] flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{ev.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{ev.time}</div>
                    </div>
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: ev.color }}
                    />
                  </div>
                ))}
              </div>
            </HudPanel>
          </aside>
        </div>
      </div>
    </div>
  );
}
