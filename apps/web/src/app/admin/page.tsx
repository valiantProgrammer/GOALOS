"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { BottomNav } from "@/components/ui/BottomNav";
import {
  Users,
  Activity,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
  Server,
  Database,
  Cpu,
  HardDrive,
  Mail,
  Calendar,
  ChevronDown,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen w-full bg-[#030712] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/admin" />

      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <TopBar searchPlaceholder="Search users, quests, system logs..." />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Title & Date Range */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-wide text-white">Admin Dashboard</h1>
              <p className="text-xs text-slate-400 mt-1">
                Monitor system performance, user activity and platform health
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#0b1528] border border-blue-900/40 rounded-xl px-3.5 py-2 flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>Oct 14, 2026 - Oct 20, 2026</span>
              </div>
              <div className="bg-[#0b1528] border border-blue-900/40 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                <span>Last 7 Days</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Top Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "overview", label: "Overview", href: "/admin" },
              { id: "users", label: "Users", href: "/admin/users" },
              { id: "content", label: "Content", href: "/admin/users" },
              { id: "templates", label: "Quests & Templates", href: "/admin/users" },
              { id: "rewards", label: "Rewards", href: "/admin/users" },
              { id: "system-health", label: "System Health", href: "/admin/system" },
            ].map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "bg-[#0b1528] text-slate-400 hover:text-slate-200 border border-slate-800/80"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* 6 Top Metric Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Tile 1: Total Users */}
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-emerald-400">+12%</span>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">5,482</div>
                <div className="text-[11px] text-slate-400">Total Users</div>
              </div>
            </div>

            {/* Tile 2: Active Users */}
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-teal-950 flex items-center justify-center text-teal-400">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-emerald-400">+8%</span>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">842</div>
                <div className="text-[11px] text-slate-400">Active Users (Daily)</div>
              </div>
            </div>

            {/* Tile 3: Quests Completed */}
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-purple-950 flex items-center justify-center text-purple-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-emerald-400">+23%</span>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">12,460</div>
                <div className="text-[11px] text-slate-400">Quests Completed</div>
              </div>
            </div>

            {/* Tile 4: Habits Tracked */}
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-sky-950 flex items-center justify-center text-sky-400">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-emerald-400">+18%</span>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">2,340</div>
                <div className="text-[11px] text-slate-400">Habits Tracked</div>
              </div>
            </div>

            {/* Tile 5: System Uptime */}
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-slate-400">Online</span>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">98.5%</div>
                <div className="text-[11px] text-slate-400">System Uptime</div>
              </div>
            </div>

            {/* Tile 6: Response Time */}
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-indigo-950 flex items-center justify-center text-indigo-400">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-slate-400">Realtime</span>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">1.2s</div>
                <div className="text-[11px] text-slate-400">Avg. Response Time</div>
              </div>
            </div>
          </div>

          {/* Middle Row: Charts & System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* User Growth Chart */}
            <div className="lg:col-span-4 bg-[#070e1c] border border-blue-900/40 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">User Growth</h3>
                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>New</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span>Active</span>
                  </div>
                </div>
              </div>

              {/* SVG Sparkline Graph */}
              <div className="h-36 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="300" y2="30" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="70" x2="300" y2="70" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="110" x2="300" y2="110" stroke="#1e293b" />

                  {/* Active Users Line (Purple) */}
                  <path
                    d="M 10,95 Q 60,80 110,65 T 210,45 T 290,25"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3"
                  />
                  {/* New Users Line (Cyan) */}
                  <path
                    d="M 10,105 Q 60,95 110,85 T 210,65 T 290,45"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                <span>Oct 14</span>
                <span>Oct 16</span>
                <span>Oct 18</span>
                <span>Oct 20</span>
              </div>
            </div>

            {/* Quest Activity Chart */}
            <div className="lg:col-span-3 bg-[#070e1c] border border-blue-900/40 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Quest Activity</h3>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Done</span>
                </div>
              </div>

              {/* Bar Chart Representation */}
              <div className="h-36 flex items-end justify-between gap-2 pt-2 px-1">
                {[
                  { day: "14", h1: 45, h2: 30 },
                  { day: "15", h1: 65, h2: 50 },
                  { day: "16", h1: 85, h2: 70 },
                  { day: "17", h1: 55, h2: 40 },
                  { day: "18", h1: 90, h2: 80 },
                  { day: "19", h1: 75, h2: 60 },
                  { day: "20", h1: 95, h2: 85 },
                ].map((b, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1 h-28">
                      <div
                        className="w-2 bg-blue-500 rounded-t"
                        style={{ height: `${b.h1}%` }}
                      />
                      <div
                        className="w-2 bg-purple-500 rounded-t"
                        style={{ height: `${b.h2}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-slate-500">{b.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Donut & System Status */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category Distribution */}
              <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 flex flex-col justify-between shadow-xl">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Categories</h3>
                <div className="flex items-center justify-center py-2 relative">
                  <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex flex-col items-center justify-center">
                    <span className="text-xs font-extrabold text-white">12,460</span>
                    <span className="text-[8px] text-slate-400">Quests</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 font-medium">
                  <div>• Study 32%</div>
                  <div>• Work 21%</div>
                  <div>• Health 15%</div>
                  <div>• Other 32%</div>
                </div>
              </div>

              {/* System Status Table */}
              <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-2.5 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">System Status</h3>
                  <span className="text-[10px] text-blue-400 font-semibold cursor-pointer">Details</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Web Server</span>
                    <span className="text-emerald-400 font-bold">Online 2ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Database</span>
                    <span className="text-emerald-400 font-bold">Online 12ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">AI Services</span>
                    <span className="text-emerald-400 font-bold">Online 245ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">File Storage</span>
                    <span className="text-emerald-400 font-bold">Online 18ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Email Service</span>
                    <span className="text-emerald-400 font-bold">Online 32ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tables Row: Recent Users, Recent Quests, Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Recent Users */}
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white">Recent Users</h3>
                <Link href="/admin/users" className="text-[11px] text-blue-400 hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-2.5">
                {[
                  { name: "Aarav Sharma", date: "Oct 20, 2026", status: "Active" },
                  { name: "Riya Sen", date: "Oct 20, 2026", status: "Active" },
                  { name: "Karan Mehta", date: "Oct 19, 2026", status: "Active" },
                  { name: "Sneha Das", date: "Oct 19, 2026", status: "Inactive" },
                  { name: "Aditya Verma", date: "Oct 18, 2026", status: "Active" },
                ].map((u, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/40 last:border-0">
                    <span className="font-semibold text-slate-200">{u.name}</span>
                    <span className="text-[10px] text-slate-400">{u.date}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        u.status === "Active"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800/40"
                          : "bg-red-950 text-red-400 border border-red-800/40"
                      }`}
                    >
                      {u.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Quests */}
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white">Recent Quests</h3>
                <span className="text-[11px] text-blue-400 cursor-pointer">View All</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { title: "DSA Practice", cat: "Study", author: "@kavya", status: "Published" },
                  { title: "Morning Workout", cat: "Health", author: "@arjun", status: "Published" },
                  { title: "Build Portfolio", cat: "Work", author: "@neha", status: "Review" },
                  { title: "Read 10 Books", cat: "Personal", author: "@rohan", status: "Published" },
                  { title: "Learn React", cat: "Study", author: "@sneha", status: "Draft" },
                ].map((q, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/40 last:border-0">
                    <div>
                      <div className="font-semibold text-white text-[11px]">{q.title}</div>
                      <div className="text-[9px] text-slate-400">{q.cat} • {q.author}</div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                      {q.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white">Recent Activity</h3>
                <span className="text-[11px] text-blue-400 cursor-pointer">View All</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { desc: "Riya Sen completed a quest", time: "1 minute ago" },
                  { desc: "Aarav unlocked 7 Day Streak", time: "12 minutes ago" },
                  { desc: "New user Karan Mehta joined", time: "23 minutes ago" },
                  { desc: "DSA Study Group created", time: "45 minutes ago" },
                  { desc: "System backup completed successfully", time: "1 hour ago" },
                ].map((a, i) => (
                  <div key={i} className="text-xs py-1 border-b border-slate-800/40 last:border-0">
                    <div className="font-medium text-slate-200 text-[11px]">{a.desc}</div>
                    <div className="text-[9px] text-slate-500">{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
