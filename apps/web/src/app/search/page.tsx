"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { ArtPanel } from "@/components/ui/ArtPanel";
import { HudPanel } from "@/components/ui/HudPanel";

const COMMANDS = [
  { label: "/quest", route: "/quests" },
  { label: "/habit", route: "/habits" },
  { label: "/goal", route: "/goals" },
  { label: "/calendar", route: "/calendar" },
  { label: "/focus", route: "/focus" },
  { label: "/shop", route: "/shop" },
  { label: "/profile", route: "/profile" },
];

const QUICK_ACTIONS = [
  { title: "Create Quest", icon: "⚔️", route: "/quests" },
  { title: "Add Habit", icon: "➕", route: "/habits" },
  { title: "Start Focus", icon: "⏱️", route: "/focus" },
  { title: "Open Calendar", icon: "📅", route: "/calendar" },
  { title: "View Analytics", icon: "📊", route: "/analytics" },
  { title: "Go to Goals", icon: "🎯", route: "/goals" },
  { title: "Join Party", icon: "👥", route: "/community" },
  { title: "Open Shop", icon: "🛍️", route: "/shop" },
];

const RECENT_SEARCHES = ["study dsa", "morning routine", "focus timer", "weekly review"];

const AI_SUGGESTIONS = [
  { title: "Continue: Study DSA (1 hour)", desc: "Due today at 10:00 PM" },
  { title: "Check today's goals", desc: "11/15 milestones on track" },
  { title: "Start a 25 min focus session", desc: "Recommended for highest productivity" },
  { title: "Review this week's progress", desc: "21 of 28 tasks completed" },
];

export default function SearchCommandCenterPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex h-screen bg-[#050814] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/search" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopBar searchPlaceholder="Command Center..." />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Search Area */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">
                Search / Command Center
              </h1>
              <p className="text-xs text-slate-400 mt-1">Instant hunter navigation, slash commands, and AI suggestions</p>
            </div>

            {/* Giant Search Input Box */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                🔍
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search quests, habits, goals, users, settings... (Ctrl+K)"
                className="w-full bg-[#0a1224] border border-[#3b6cf6]/50 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00d2ff] focus:shadow-[0_0_20px_rgba(0,210,255,0.25)] transition-all"
              />
            </div>

            {/* Slash Commands Chips */}
            <div className="flex gap-2 flex-wrap items-center text-xs">
              <span className="text-slate-500 font-semibold">Commands:</span>
              {COMMANDS.map((cmd) => (
                <Link
                  key={cmd.label}
                  href={cmd.route}
                  className="bg-[#0a1224] border border-[#142852] px-2.5 py-1 rounded text-slate-400 hover:text-[#00d2ff] hover:border-[#00d2ff] font-mono text-[11px] transition-all"
                >
                  {cmd.label}
                </Link>
              ))}
            </div>

            {/* Quick Actions Grid */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {QUICK_ACTIONS.map((action) => (
                  <Link key={action.title} href={action.route}>
                    <HudPanel className="p-4 flex flex-col items-center justify-center text-center gap-2 hover:border-[#00d2ff]/60 transition-all cursor-pointer">
                      <span className="text-2xl">{action.icon}</span>
                      <span className="text-xs font-bold text-white">
                        {action.title}
                      </span>
                    </HudPanel>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Split: Recent Searches vs Suggested by AI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Searches */}
              <HudPanel className="p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Recent Searches
                </h3>
                <div className="space-y-2 text-xs">
                  {RECENT_SEARCHES.map((search) => (
                    <div
                      key={search}
                      className="p-2 rounded bg-[#050814] border border-[#142852] text-slate-300 hover:text-white flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span>🕒</span> {search}
                      </span>
                      <span className="text-slate-600">&rarr;</span>
                    </div>
                  ))}
                </div>
              </HudPanel>

              {/* Suggested by AI */}
              <HudPanel className="p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#00d2ff] flex items-center gap-1.5">
                  <span>✨</span> Suggested by AI
                </h3>
                <div className="space-y-2.5 text-xs">
                  {AI_SUGGESTIONS.map((sug) => (
                    <div
                      key={sug.title}
                      className="p-2.5 rounded bg-[#050814] border border-[#142852] hover:border-[#00d2ff]/40 cursor-pointer"
                    >
                      <div className="font-bold text-white">{sug.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{sug.desc}</div>
                    </div>
                  ))}
                </div>
              </HudPanel>
            </div>
          </main>

          {/* Right Art Panel */}
          <ArtPanel quote="A FASTER WAY TO A BETTER YOU" />
        </div>
      </div>
    </div>
  );
}
