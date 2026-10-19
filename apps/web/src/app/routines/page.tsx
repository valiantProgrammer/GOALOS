"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SidebarNav,
  TopBar,
  BottomNav,
  HudPanel,
  SystemButton,
} from "@/components/ui";
import { Plus, MoreVertical, Clock, Check, Sparkles } from "lucide-react";

interface RoutineItemState {
  id: string;
  timeStr: string;
  title: string;
  iconText: string;
  enabled: boolean;
}

export default function RoutineBuilderPage() {
  const [activeTab, setActiveTab] = useState("Morning");

  const [routines, setRoutines] = useState<RoutineItemState[]>([
    { id: "r1", timeStr: "06:00 AM", title: "Wake Up", iconText: "⏰", enabled: true },
    { id: "r2", timeStr: "06:10 AM", title: "Drink Water", iconText: "💧", enabled: true },
    { id: "r3", timeStr: "06:30 AM", title: "Morning Exercise", iconText: "🏃", enabled: true },
    { id: "r4", timeStr: "06:45 AM", title: "Meditation", iconText: "🧘", enabled: true },
    { id: "r5", timeStr: "07:00 AM", title: "Plan My Day", iconText: "📝", enabled: true },
  ]);

  const toggleRoutine = (id: string) => {
    setRoutines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const tabs = ["Morning", "Afternoon", "Evening", "Night"];

  return (
    <div className="flex min-h-screen bg-[#050814] text-[#f8fafc]">
      <SidebarNav className="hidden md:flex" />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="flex-1 p-6 lg:p-8 pb-24 md:pb-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <h1 className="font-heading text-2xl lg:text-3xl font-black text-white">
              Routine Builder
            </h1>
            <p className="text-xs text-[#94a3b8] mt-1 font-medium">
              Structure your daily hunter rituals across time blocks.
            </p>
          </div>

          {/* Time of Day Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0a1224] border border-[#142852] w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-[#3b6cf6] text-white shadow-[0_0_10px_rgba(59,108,246,0.4)]"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main 2-Column Grid: Builder (Left) + Timeline Preview & Art (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Routine Items List */}
            <div className="lg:col-span-8 space-y-4">
              <HudPanel className="p-6 space-y-3 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                {routines.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#050814] border border-[#142852] hover:border-[#204899] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-[#00d2ff] font-bold min-w-16">
                        {item.timeStr}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[#0d1933] border border-[#1a3366] flex items-center justify-center text-sm shadow-inner">
                        {item.iconText}
                      </div>
                      <span className="text-sm font-semibold text-white tracking-wide">
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Toggle Switch */}
                      <button
                        type="button"
                        onClick={() => toggleRoutine(item.id)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                          item.enabled ? "bg-[#10b981]" : "bg-[#1e293b]"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                            item.enabled ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>

                      <button className="text-[#64748b] hover:text-[#94a3b8] p-1">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Routine Item CTA */}
                <div className="pt-3">
                  <SystemButton
                    variant="primary"
                    size="md"
                    className="w-full py-3 shadow-[0_0_20px_rgba(59,108,246,0.4)]"
                  >
                    <Plus size={16} className="mr-1.5" /> Add Routine Item
                  </SystemButton>
                </div>
              </HudPanel>
            </div>

            {/* Right 4 Cols: Routine Timeline Preview matching DM-08 */}
            <div className="lg:col-span-4 space-y-6">
              <HudPanel className="p-6 space-y-5 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                  Routine Preview
                </h3>

                {/* Vertical Timeline */}
                <div className="relative pl-6 space-y-5 border-l-2 border-[#142852] ml-2">
                  {routines.map((r, idx) => (
                    <div key={r.id} className="relative">
                      <div
                        className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-[#050814] ${
                          r.enabled
                            ? "bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]"
                            : "bg-[#475569]"
                        }`}
                      />
                      <div className="text-xs font-semibold text-white">{r.title}</div>
                      <div className="text-[10px] text-[#64748b] font-mono">{r.timeStr}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#142852] text-right">
                  <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                    A BETTER ROUTINE
                  </h4>
                  <h4 className="font-heading text-xs font-bold text-[#00d2ff] uppercase tracking-wider">
                    A STRONGER YOU
                  </h4>
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
