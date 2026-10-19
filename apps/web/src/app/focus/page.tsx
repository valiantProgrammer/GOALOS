"use client";

import React, { useState } from "react";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { ArtPanel } from "@/components/ui/ArtPanel";
import { HudPanel } from "@/components/ui/HudPanel";
import { SystemButton } from "@/components/ui/SystemButton";

const TABS = ["Pomodoro", "Short Break", "Long Break", "Custom"];
const AMBIENCE = [
  { id: "forest", name: "Forest", icon: "🌲" },
  { id: "rain", name: "Rain", icon: "🌧️" },
  { id: "cafe", name: "Cafe", icon: "☕" },
  { id: "night", name: "Night", icon: "🌙" },
];

export default function FocusWorkspacePage() {
  const [activeTab, setActiveTab] = useState("Pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [selectedAmbience, setSelectedAmbience] = useState("forest");

  // Session settings
  const [sound, setSound] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoBreaks, setAutoBreaks] = useState(false);
  const [strictMode, setStrictMode] = useState(true);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex h-screen bg-[#050814] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/focus" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopBar searchPlaceholder="Focus Workspace..." />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Workspace Area */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Header Tabs */}
            <div className="flex items-center gap-2 bg-[#0a1224] p-1.5 rounded-lg border border-[#142852] w-fit">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-1.5 rounded-md text-xs font-semibold tracking-wider transition-all ${
                    activeTab === tab
                      ? "bg-[#3b6cf6] text-white shadow-[0_0_12px_rgba(59,108,246,0.5)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Circular Timer Display */}
              <HudPanel className="lg:col-span-8 p-8 flex flex-col items-center justify-center min-h-[380px]">
                <div className="relative w-64 h-64 rounded-full border-4 border-[#00d2ff] shadow-[0_0_30px_rgba(0,210,255,0.25)] flex flex-col items-center justify-center bg-[#050814]/80">
                  <div className="absolute inset-2 rounded-full border border-dashed border-[#142852]" />
                  <span className="text-5xl font-mono font-bold tracking-wider text-white">
                    {formatTime(secondsLeft)}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#00d2ff] mt-2 font-semibold">
                    Focus Time
                  </span>
                </div>

                <div className="mt-8">
                  <SystemButton
                    variant="primary"
                    className="px-10 py-2.5 text-sm uppercase tracking-wider"
                    onClick={() => setIsRunning(!isRunning)}
                  >
                    {isRunning ? "Pause" : "Start"}
                  </SystemButton>
                </div>
              </HudPanel>

              {/* Session Settings & Stats */}
              <div className="lg:col-span-4 space-y-6">
                <HudPanel className="p-5 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Session Settings
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Sound</span>
                      <input
                        type="checkbox"
                        checked={sound}
                        onChange={() => setSound(!sound)}
                        className="accent-[#3b6cf6] w-4 h-4 rounded cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Notifications</span>
                      <input
                        type="checkbox"
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                        className="accent-[#3b6cf6] w-4 h-4 rounded cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Auto-Start Breaks</span>
                      <input
                        type="checkbox"
                        checked={autoBreaks}
                        onChange={() => setAutoBreaks(!autoBreaks)}
                        className="accent-[#3b6cf6] w-4 h-4 rounded cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Strict Mode</span>
                      <input
                        type="checkbox"
                        checked={strictMode}
                        onChange={() => setStrictMode(!strictMode)}
                        className="accent-[#3b6cf6] w-4 h-4 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </HudPanel>

                <HudPanel className="p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Today's Sessions
                    </h3>
                    <span className="text-xs text-[#00d2ff] font-bold">2 / 6</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${
                          i <= 2 ? "bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" : "bg-[#142852]"
                        }`}
                      />
                    ))}
                  </div>
                </HudPanel>

                <HudPanel className="p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                    Focus Stats
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-[#050814] p-2 rounded border border-[#142852]">
                      <div className="text-sm font-bold text-white">120 min</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Total Focus</div>
                    </div>
                    <div className="bg-[#050814] p-2 rounded border border-[#142852]">
                      <div className="text-sm font-bold text-white">4</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Sessions</div>
                    </div>
                    <div className="bg-[#050814] p-2 rounded border border-[#142852]">
                      <div className="text-sm font-bold text-[#10b981]">75%</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Productivity</div>
                    </div>
                  </div>
                </HudPanel>
              </div>
            </div>

            {/* Ambience Audio Row */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Ambience Soundscapes
              </h3>
              <div className="grid grid-cols-4 gap-4 max-w-xl">
                {AMBIENCE.map((amb) => (
                  <button
                    key={amb.id}
                    onClick={() => setSelectedAmbience(amb.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      selectedAmbience === amb.id
                        ? "bg-[#0a1224] border-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.2)] text-white"
                        : "bg-[#070d1c] border-[#142852] text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-xl">{amb.icon}</span>
                    <span className="text-xs font-semibold">{amb.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </main>

          {/* Right Art Panel */}
          <ArtPanel quote="FOCUS CREATES REALITY" />
        </div>
      </div>
    </div>
  );
}
