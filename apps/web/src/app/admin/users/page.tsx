"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { BottomNav } from "@/components/ui/BottomNav";
import {
  Users,
  Shield,
  UserCheck,
  User,
  Plus,
  Search,
  Download,
  Edit2,
  Trash2,
  BookOpen,
  Flame,
  Award,
  Gift,
  FolderKanban,
  Sparkles,
} from "lucide-react";

const USERS_LIST = [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", role: "Admin", status: "Active", joined: "Oct 20, 2026" },
  { id: 2, name: "Riya Sen", email: "riya@example.com", role: "Moderator", status: "Active", joined: "Oct 20, 2026" },
  { id: 3, name: "Karan Mehta", email: "karan@example.com", role: "User", status: "Active", joined: "Oct 19, 2026" },
  { id: 4, name: "Sneha Das", email: "sneha@example.com", role: "User", status: "Inactive", joined: "Oct 19, 2026" },
  { id: 5, name: "Aditya Verma", email: "aditya@example.com", role: "Moderator", status: "Active", joined: "Oct 18, 2026" },
  { id: 6, name: "Neha Roy", email: "neha@example.com", role: "User", status: "Active", joined: "Oct 18, 2026" },
  { id: 7, name: "Arjun Kapoor", email: "arjun@example.com", role: "User", status: "Active", joined: "Oct 17, 2026" },
  { id: 8, name: "Kavya Iyer", email: "kavya@example.com", role: "User", status: "Inactive", joined: "Oct 17, 2026" },
];

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(USERS_LIST);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setToastMessage("User account archived.");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden w-full bg-[#030712] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/admin" className="hidden md:flex shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <TopBar searchPlaceholder="Search users, content, templates..." className="shrink-0" />

        {toastMessage && (
          <div className="absolute top-16 right-8 z-50 bg-[#0d1b30] border border-cyan-400 text-cyan-200 px-4 py-2 rounded-lg shadow-lg shadow-cyan-950/50 flex items-center gap-2 text-xs font-semibold animate-pulse">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-wide text-white">User & Content Management</h1>
              <p className="text-xs text-slate-400 mt-1">
                Manage users, roles, quest templates, achievements and rewards
              </p>
            </div>

            <button
              onClick={() => {
                setToastMessage("Hunter provisioning modal opened.");
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-blue-600/30 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "users", label: "Users" },
              { id: "quest-templates", label: "Quest Templates" },
              { id: "habits-templates", label: "Habits Templates" },
              { id: "achievements", label: "Achievements" },
              { id: "rewards", label: "Rewards" },
              { id: "categories", label: "Categories" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "bg-[#0b1528] text-slate-400 hover:text-slate-200 border border-slate-800/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-blue-950 flex items-center justify-center text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">5,482</div>
                <div className="text-[11px] text-slate-400">Total Users</div>
              </div>
            </div>

            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-purple-950 flex items-center justify-center text-purple-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">124</div>
                <div className="text-[11px] text-slate-400">Admins</div>
              </div>
            </div>

            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-amber-950 flex items-center justify-center text-amber-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">432</div>
                <div className="text-[11px] text-slate-400">Moderators</div>
              </div>
            </div>

            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-teal-950 flex items-center justify-center text-teal-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">4,926</div>
                <div className="text-[11px] text-slate-400">Regular Users</div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Grid: User Management Table | Content Management Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Table Section */}
            <div className="lg:col-span-8 bg-[#070e1c] border border-blue-900/40 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">User Management</h2>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search users..."
                      className="bg-[#0b1528] border border-blue-900/40 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setToastMessage("User registry exported to CSV.");
                      setTimeout(() => setToastMessage(null), 2500);
                    }}
                    className="bg-[#0b1528] hover:bg-[#11203b] border border-blue-900/40 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0b1528] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">User</th>
                      <th className="py-2.5 px-3">Email</th>
                      <th className="py-2.5 px-3">Role</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Joined</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-[#0b1528]/50 transition">
                        <td className="py-2.5 px-3 text-slate-500">{u.id}</td>
                        <td className="py-2.5 px-3 font-bold text-white">{u.name}</td>
                        <td className="py-2.5 px-3 text-slate-400">{u.email}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              u.role === "Admin"
                                ? "bg-red-950 text-red-400 border border-red-800/50"
                                : u.role === "Moderator"
                                ? "bg-purple-950 text-purple-400 border border-purple-800/50"
                                : "bg-blue-950 text-blue-400 border border-blue-800/50"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              u.status === "Active"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-400">{u.joined}</td>
                        <td className="py-2.5 px-3 text-right space-x-2">
                          <button className="text-slate-400 hover:text-white">
                            <Edit2 className="w-3.5 h-3.5 inline" />
                          </button>
                          <button
                            onClick={() => handleDelete(u.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-3.5 h-3.5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Row */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold">1</span>
                  <span className="w-6 h-6 rounded bg-[#0b1528] flex items-center justify-center">2</span>
                  <span className="w-6 h-6 rounded bg-[#0b1528] flex items-center justify-center">3</span>
                  <span className="px-1">...</span>
                  <span className="w-8 h-6 rounded bg-[#0b1528] flex items-center justify-center">686</span>
                </div>
                <span>8 of 5,482 users</span>
              </div>
            </div>

            {/* Right Column: Content Management & Quick Actions */}
            <div className="lg:col-span-4 space-y-4">
              {/* Content Management Cards */}
              <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-5 space-y-3 shadow-xl">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Content Management</h3>

                <div className="space-y-2">
                  {[
                    { title: "Quest Templates", count: "128 templates", icon: BookOpen, color: "#8b5cf6" },
                    { title: "Habit Templates", count: "64 templates", icon: Flame, color: "#10b981" },
                    { title: "Achievement Badges", count: "86 achievements", icon: Award, color: "#f59e0b" },
                    { title: "Reward Items", count: "142 items", icon: Gift, color: "#ef4444" },
                    { title: "Categories", count: "12 categories", icon: FolderKanban, color: "#06b6d4" },
                  ].map((c, i) => {
                    const Icon = c.icon;
                    return (
                      <div
                        key={i}
                        className="bg-[#0b1528] border border-blue-900/30 p-2.5 rounded-xl flex items-center justify-between hover:border-blue-600 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${c.color}20` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: c.color }} />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{c.title}</div>
                            <div className="text-[10px] text-slate-400">{c.count}</div>
                          </div>
                        </div>
                        <span className="text-slate-500 font-bold">&gt;</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions Buttons */}
              <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-5 space-y-3 shadow-xl">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Quick Actions</h3>

                <div className="space-y-2">
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/30">
                    Create Quest Template
                  </button>
                  <button className="w-full bg-[#0b1528] hover:bg-[#11203b] border border-blue-900/40 text-slate-200 py-2 rounded-xl text-xs font-bold transition">
                    Add Reward Item
                  </button>
                  <button className="w-full bg-[#0b1528] hover:bg-[#11203b] border border-blue-900/40 text-slate-200 py-2 rounded-xl text-xs font-bold transition">
                    Manage Categories
                  </button>
                </div>
              </div>

              {/* Art Panel representation with quote */}
              <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-6 relative overflow-hidden min-h-[160px] flex flex-col justify-end shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#07132a]/60 to-[#0c224a]/80" />
                <div className="relative z-10 text-center space-y-1">
                  <div className="text-xs font-black tracking-widest text-sky-400 uppercase drop-shadow-[0_0_8px_#38bdf8]">
                    GOOD HUNTERS
                  </div>
                  <div className="text-xs font-black tracking-widest text-sky-400 uppercase drop-shadow-[0_0_8px_#38bdf8]">
                    CREATE OPPORTUNITIES
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
