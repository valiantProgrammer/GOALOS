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
import {
  CheckCircle,
  Sparkles,
  Award,
  UserPlus,
  Calendar,
  Users,
  Info,
  CheckCheck,
} from "lucide-react";

interface NotificationItem {
  id: string;
  category: "quests" | "achievements" | "social" | "system";
  title: string;
  body: string;
  timeAgo: string;
  group: "Today" | "Yesterday" | "This Week";
  read: boolean;
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      category: "quests",
      title: "Quest Completed!",
      body: "Morning Workout (+80 XP awarded). Daily streak maintained.",
      timeAgo: "10 min ago",
      group: "Today",
      read: false,
    },
    {
      id: "2",
      category: "system",
      title: "Level Up!",
      body: "You reached Level 32. 3 Stat Points & 1 Skill Point granted.",
      timeAgo: "25 min ago",
      group: "Today",
      read: false,
    },
    {
      id: "3",
      category: "achievements",
      title: "New Achievement",
      body: "Early Bird • Routine finished before 8:00 AM.",
      timeAgo: "1 hour ago",
      group: "Today",
      read: false,
    },
    {
      id: "4",
      category: "social",
      title: "Friend Request",
      body: "Priya sent you a friend request.",
      timeAgo: "2 hours ago",
      group: "Today",
      read: true,
    },
    {
      id: "5",
      category: "quests",
      title: "Weekly Challenge",
      body: "3 days left to complete 25 total quests this week.",
      timeAgo: "1 day ago",
      group: "Yesterday",
      read: true,
    },
    {
      id: "6",
      category: "social",
      title: "Party Invitation",
      body: "Karan invited you to join 'DSA Study Group'.",
      timeAgo: "1 day ago",
      group: "Yesterday",
      read: true,
    },
    {
      id: "7",
      category: "system",
      title: "System Update",
      body: "New features and performance optimizations deployed.",
      timeAgo: "3 days ago",
      group: "This Week",
      read: true,
    },
  ]);

  const tabs = ["All", "Quests", "Achievements", "Social", "System"];

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "quests":
        return <CheckCircle size={18} className="text-[#10b981]" />;
      case "system":
        return <Sparkles size={18} className="text-[#00d2ff]" />;
      case "achievements":
        return <Award size={18} className="text-[#f5a623]" />;
      case "social":
        return <UserPlus size={18} className="text-[#a78bfa]" />;
      default:
        return <Info size={18} className="text-[#64748b]" />;
    }
  };

  const filtered = notifications.filter((n) => {
    if (activeTab === "All") return true;
    return n.category.toLowerCase() === activeTab.toLowerCase();
  });

  const grouped: Record<string, NotificationItem[]> = {
    Today: filtered.filter((n) => n.group === "Today"),
    Yesterday: filtered.filter((n) => n.group === "Yesterday"),
    "This Week": filtered.filter((n) => n.group === "This Week"),
  };

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
                Notifications
              </h1>
              <p className="text-xs text-[#94a3b8] mt-1 font-medium">
                Real-time alerts, quest completions, and community party updates.
              </p>
            </div>

            <button
              onClick={markAllRead}
              className="text-xs font-hud font-bold text-[#00d2ff] hover:underline flex items-center gap-1.5 self-start sm:self-auto"
            >
              <CheckCheck size={16} /> Mark All as Read
            </button>
          </div>

          {/* Sub-tabs */}
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

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Grouped Notifications List */}
            <div className="lg:col-span-8 space-y-6">
              {(["Today", "Yesterday", "This Week"] as const).map((groupName) => {
                const items = grouped[groupName];
                if (!items || items.length === 0) return null;

                return (
                  <div key={groupName} className="space-y-3">
                    <h3 className="font-hud text-xs font-bold text-[#94a3b8] uppercase tracking-wider pl-1">
                      {groupName}
                    </h3>
                    <div className="space-y-2.5">
                      {items.map((n) => (
                        <HudPanel
                          key={n.id}
                          className={`p-4 flex items-start gap-4 transition-all ${
                            !n.read
                              ? "bg-[#0d1933] border-[#204899] shadow-[0_0_15px_rgba(0,210,255,0.08)]"
                              : "bg-[#0a1224] border-[#142852] opacity-80"
                          }`}
                        >
                          <div className="p-2.5 rounded-xl bg-[#050814] border border-[#142852] shrink-0 mt-0.5">
                            {getCategoryIcon(n.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-sm font-bold text-white tracking-wide">
                                {n.title}
                              </h4>
                              <span className="text-[10px] text-[#64748b] font-mono shrink-0">
                                {n.timeAgo}
                              </span>
                            </div>
                            <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                              {n.body}
                            </p>
                          </div>
                          {!n.read && (
                            <span className="w-2 h-2 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff] shrink-0 mt-2" />
                          )}
                        </HudPanel>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 4 Cols: Decorative Art Panel matching DM-23 */}
            <div className="lg:col-span-4">
              <div className="h-[520px] rounded-2xl overflow-hidden border border-[#142852] bg-gradient-to-b from-[#0a1835] via-[#060e20] to-[#02050e] relative flex flex-col justify-end p-6 shadow-[0_0_25px_rgba(0,210,255,0.15)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,210,255,0.25),_transparent)]" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-[#00d2ff]/20 blur-2xl pointer-events-none" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-64 border border-[#00d2ff]/30 rounded-t-full flex items-center justify-center">
                    <span className="font-heading text-4xl text-[#00d2ff] opacity-40">⚡</span>
                  </div>
                </div>

                <div className="relative z-10 text-right">
                  <h3 className="font-heading text-lg font-black text-white uppercase tracking-wider">
                    STAY NOTIFIED
                  </h3>
                  <h3 className="font-heading text-lg font-black text-[#00d2ff] uppercase tracking-wider">
                    NEVER MISS A QUEST
                  </h3>
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
