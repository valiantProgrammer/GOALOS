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
import { Settings, Sliders, Palette, Bell, Shield, Layers, Check } from "lucide-react";

export default function SettingsPreferencesPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [theme, setTheme] = useState("Default");
  const [bgStyle, setBgStyle] = useState("Mountains");
  const [density, setDensity] = useState("Comfortable");

  // Toggles
  const [autoSave, setAutoSave] = useState(true);
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [playSoundEffects, setPlaySoundEffects] = useState(true);
  const [showMotivationalQuotes, setShowMotivationalQuotes] = useState(true);

  const tabs = ["General", "Appearance", "Notifications", "Focus", "Privacy", "Integrations"];
  const themes = [
    { id: "Default", color: "from-[#0a1224] to-[#132c66]", border: "border-[#00d2ff]" },
    { id: "Purple", color: "from-[#170a24] to-[#3a1366]", border: "border-[#8a4fff]" },
    { id: "Blue", color: "from-[#05142e] to-[#0f3d8a]", border: "border-[#3b6cf6]" },
    { id: "Red", color: "from-[#240a0f] to-[#661320]", border: "border-[#ef4444]" },
  ];

  const bgStyles = ["Mountains", "City", "Dungeon", "Custom"];
  const densities = ["Comfortable", "Compact", "Spacious"];

  return (
    <div className="flex h-screen overflow-hidden bg-[#050814] text-[#f8fafc]">
      <SidebarNav className="hidden md:flex shrink-0" />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar className="shrink-0" />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8 pb-24 md:pb-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <h1 className="font-heading text-2xl lg:text-3xl font-black text-white">
              Settings & Preferences
            </h1>
            <p className="text-xs text-[#94a3b8] mt-1 font-medium">
              Configure system themes, notifications, and personal display preferences.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0a1224] border border-[#142852] w-fit overflow-x-auto">
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

          {/* Main 2-Column Grid matching DM-24 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 Cols: General Settings */}
            <div className="lg:col-span-6 space-y-6">
              <HudPanel className="p-6 space-y-5 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider border-b border-[#142852] pb-3">
                  General Settings
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-hud font-bold text-[#94a3b8] uppercase">Language</label>
                    <select className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl px-4 py-2.5 text-white outline-none">
                      <option>English</option>
                      <option>Japanese</option>
                      <option>Korean</option>
                      <option>Spanish</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-hud font-bold text-[#94a3b8] uppercase">Date & Time</label>
                    <select className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl px-4 py-2.5 text-white outline-none">
                      <option>(UTC+05:30) Asia/Kolkata</option>
                      <option>(UTC+00:00) UTC / London</option>
                      <option>(UTC-05:00) Eastern Time (US)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-hud font-bold text-[#94a3b8] uppercase">Start of Week</label>
                    <select className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl px-4 py-2.5 text-white outline-none">
                      <option>Monday</option>
                      <option>Sunday</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-hud font-bold text-[#94a3b8] uppercase">Measurement System</label>
                    <select className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl px-4 py-2.5 text-white outline-none">
                      <option>Metric (km, kg)</option>
                      <option>Imperial (miles, lbs)</option>
                    </select>
                  </div>
                </div>

                {/* Toggles */}
                <div className="pt-4 border-t border-[#142852] space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Auto Save</span>
                    <button
                      type="button"
                      onClick={() => setAutoSave(!autoSave)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                        autoSave ? "bg-[#10b981]" : "bg-[#1e293b]"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${autoSave ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Enable Animations</span>
                    <button
                      type="button"
                      onClick={() => setEnableAnimations(!enableAnimations)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                        enableAnimations ? "bg-[#10b981]" : "bg-[#1e293b]"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${enableAnimations ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Play Sound Effects</span>
                    <button
                      type="button"
                      onClick={() => setPlaySoundEffects(!playSoundEffects)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                        playSoundEffects ? "bg-[#10b981]" : "bg-[#1e293b]"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${playSoundEffects ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Show Motivational Quotes</span>
                    <button
                      type="button"
                      onClick={() => setShowMotivationalQuotes(!showMotivationalQuotes)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                        showMotivationalQuotes ? "bg-[#10b981]" : "bg-[#1e293b]"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${showMotivationalQuotes ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>
                </div>
              </HudPanel>
            </div>

            {/* Right 6 Cols: Theme & Appearance matching DM-24 */}
            <div className="lg:col-span-6 space-y-6">
              <HudPanel className="p-6 space-y-6 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider border-b border-[#142852] pb-3">
                  Theme & Appearance
                </h3>

                {/* Theme Swatches */}
                <div className="space-y-2">
                  <span className="text-xs font-hud font-bold text-[#94a3b8] uppercase">Theme Palette</span>
                  <div className="grid grid-cols-4 gap-3">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`p-3 rounded-xl border bg-gradient-to-br flex flex-col items-center justify-center gap-2 transition-all ${t.color} ${
                          theme === t.id
                            ? `${t.border} shadow-[0_0_15px_rgba(0,210,255,0.4)]`
                            : "border-[#142852]"
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center">
                          {theme === t.id && <Check size={12} strokeWidth={3} className="text-white" />}
                        </div>
                        <span className="text-[11px] font-hud uppercase font-bold text-white">
                          {t.id}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background Style Choices */}
                <div className="space-y-2">
                  <span className="text-xs font-hud font-bold text-[#94a3b8] uppercase">Background Style</span>
                  <div className="grid grid-cols-4 gap-3">
                    {bgStyles.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBgStyle(b)}
                        className={`py-3 px-2 rounded-xl border text-center transition-all ${
                          bgStyle === b
                            ? "bg-[#132c66] border-[#00d2ff] text-[#00d2ff] font-bold shadow-[0_0_12px_rgba(0,210,255,0.3)]"
                            : "bg-[#050814] border-[#142852] text-[#94a3b8] hover:border-[#204899]"
                        }`}
                      >
                        <span className="text-[11px] font-hud uppercase tracking-wider">
                          {b}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* UI Density Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-hud font-bold text-[#94a3b8] uppercase">UI Density</span>
                  <div className="grid grid-cols-3 gap-3">
                    {densities.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDensity(d)}
                        className={`py-2.5 rounded-xl border text-center transition-all ${
                          density === d
                            ? "bg-[#3b6cf6] border-[#3b6cf6] text-white font-bold shadow-[0_0_12px_rgba(59,108,246,0.4)]"
                            : "bg-[#050814] border-[#142852] text-[#94a3b8] hover:border-[#204899]"
                        }`}
                      >
                        <span className="text-xs font-semibold">{d}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#142852] text-right">
                  <h4 className="font-heading text-xs font-black text-[#00d2ff] uppercase tracking-wider">
                    CUSTOMIZE YOUR WORLD
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
