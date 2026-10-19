"use client";

import React, { useState } from "react";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { BottomNav } from "@/components/ui/BottomNav";
import {
  Users,
  UserPlus,
  Shield,
  BookOpen,
  Dumbbell,
  Briefcase,
  Flame,
  Sparkles,
  Check,
} from "lucide-react";

const HUNTERS = [
  {
    id: "h-1",
    name: "Arjun",
    level: 28,
    rank: "D-Rank",
    focus: "Study",
    category: "Study",
    avatar: "/avatars/hunter-1.png",
    initialAdded: false,
  },
  {
    id: "h-2",
    name: "Priya",
    level: 30,
    rank: "C-Rank",
    focus: "Health",
    category: "Fitness",
    avatar: "/avatars/hunter-2.png",
    initialAdded: false,
  },
  {
    id: "h-3",
    name: "Karan",
    level: 25,
    rank: "D-Rank",
    focus: "Tech",
    category: "Work",
    avatar: "/avatars/hunter-3.png",
    initialAdded: false,
  },
  {
    id: "h-4",
    name: "Sneha",
    level: 27,
    rank: "C-Rank",
    focus: "Reading",
    category: "Study",
    avatar: "/avatars/hunter-4.png",
    initialAdded: false,
  },
  {
    id: "h-5",
    name: "Rohit",
    level: 29,
    rank: "C-Rank",
    focus: "Discipline",
    category: "Fitness",
    avatar: "/avatars/hunter-5.png",
    initialAdded: false,
  },
];

const PARTIES = [
  {
    id: "p-1",
    name: "DSA Study Group",
    members: "5/5 members",
    schedule: "Daily • 2:00 PM",
    icon: BookOpen,
    color: "#a855f7",
    joined: false,
  },
  {
    id: "p-2",
    name: "Fitness Crew",
    members: "3/5 members",
    schedule: "Workout • Challenges",
    icon: Dumbbell,
    color: "#10b981",
    joined: false,
  },
  {
    id: "p-3",
    name: "Productivity Squad",
    members: "4/5 members",
    schedule: "Build habits together",
    icon: Shield,
    color: "#f59e0b",
    joined: false,
  },
  {
    id: "p-4",
    name: "Morning Runners",
    members: "2/5 members",
    schedule: "Daily • 06:00 AM",
    icon: Flame,
    color: "#ef4444",
    joined: false,
  },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("find-hunters");
  const [filterTag, setFilterTag] = useState("Nearby");
  const [hunters, setHunters] = useState(HUNTERS);
  const [parties, setParties] = useState(PARTIES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleFriend = (id: string) => {
    setHunters((prev) =>
      prev.map((h) => (h.id === id ? { ...h, initialAdded: !h.initialAdded } : h))
    );
    const target = hunters.find((h) => h.id === id);
    setToastMessage(target?.initialAdded ? "Friend request cancelled." : `Friend request sent to ${target?.name}!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleJoinParty = (id: string) => {
    setParties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, joined: !p.joined } : p))
    );
    const target = parties.find((p) => p.id === id);
    setToastMessage(target?.joined ? "Left party group." : `Joined ${target?.name}!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="flex h-screen w-full bg-[#030712] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/community" />

      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <TopBar searchPlaceholder="Search users, parties, community..." />

        {toastMessage && (
          <div className="absolute top-16 right-8 z-50 bg-[#0d1b30] border border-cyan-400 text-cyan-200 px-4 py-2 rounded-lg shadow-lg shadow-cyan-950/50 flex items-center gap-2 text-xs font-semibold animate-pulse">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Title */}
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-white">Community</h1>
          </div>

          {/* Top Category Tabs */}
          <div className="flex gap-2">
            {[
              { id: "overview", label: "Overview" },
              { id: "find-hunters", label: "Find Hunters" },
              { id: "party-quests", label: "Party Quests" },
              { id: "leaderboards", label: "Leaderboards" },
              { id: "discussions", label: "Discussions" },
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

          {/* Sub Header & Filter Chips */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white tracking-wide">Find Hunters</h2>
            <div className="flex flex-wrap gap-2">
              {["All", "Nearby", "Same Goals", "Online Now", "Study", "Fitness", "Work"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                    filterTag === tag
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "bg-[#0b1528] text-slate-400 hover:text-slate-200 border border-slate-800/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Hunters List */}
            <div className="lg:col-span-7 space-y-3">
              {hunters.map((hunter) => (
                <div
                  key={hunter.id}
                  className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 flex items-center justify-between transition hover:border-blue-700 shadow-xl"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Hunter Avatar representation */}
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-blue-600/60 overflow-hidden flex items-center justify-center relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-cyan-500/20" />
                      <span className="text-base font-bold text-sky-200">
                        {hunter.name[0]}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white">{hunter.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Lv. {hunter.level} • {hunter.rank}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Focus - {hunter.focus}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFriend(hunter.id)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      hunter.initialAdded
                        ? "bg-[#0b162c] text-emerald-400 border border-emerald-500/40"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30"
                    }`}
                  >
                    {hunter.initialAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Add Friend</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Right Column: Suggested Parties + Art Panel */}
            <div className="lg:col-span-5 space-y-4">
              {/* Suggested Parties Card */}
              <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-white">Suggested Parties</h2>
                  <span className="text-xs font-semibold text-blue-400 hover:underline cursor-pointer">
                    View All
                  </span>
                </div>

                <div className="space-y-3">
                  {parties.map((party) => {
                    const Icon = party.icon;
                    return (
                      <div
                        key={party.id}
                        className="bg-[#0b1528] border border-blue-900/30 rounded-xl p-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${party.color}20`, border: `1px solid ${party.color}60` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: party.color }} />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{party.name}</h4>
                            <p className="text-[11px] text-slate-400">{party.members}</p>
                            <p className="text-[10px] text-slate-500">{party.schedule}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleJoinParty(party.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            party.joined
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                              : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30"
                          }`}
                        >
                          {party.joined ? "Joined" : "Join"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Art Panel representation with quote */}
              <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-6 relative overflow-hidden min-h-[220px] flex flex-col justify-end shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#07132a]/60 to-[#0c224a]/80" />
                <div className="relative z-10 text-center space-y-1">
                  <div className="text-xs font-black tracking-widest text-sky-400 uppercase drop-shadow-[0_0_8px_#38bdf8]">
                    STRONGER TOGETHER
                  </div>
                  <div className="text-xs font-black tracking-widest text-sky-400 uppercase drop-shadow-[0_0_8px_#38bdf8]">
                    HUNTERS ACHIEVE MORE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
