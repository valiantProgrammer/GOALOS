"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { BottomNav } from "@/components/ui/BottomNav";
import {
  Cpu,
  Layers,
  HardDrive,
  Wifi,
  Server,
  Database,
  Bot,
  Mail,
  Zap,
  Pause,
  Play,
  Download,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export default function SystemMonitoringPage() {
  const [activeTab, setActiveTab] = useState("system-status");
  const [isPaused, setIsPaused] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const logs = [
    { time: "Oct 20, 14:32:12", level: "INFO", text: "User login successful: riya@example.com" },
    { time: "Oct 20, 14:31:58", level: "WARN", text: "High memory usage detected (78%)" },
    { time: "Oct 20, 14:31:40", level: "INFO", text: "Quest completed: Morning Workout" },
    { time: "Oct 20, 14:31:05", level: "ERROR", text: "Failed to send email (retrying...)" },
    { time: "Oct 20, 14:30:42", level: "INFO", text: "New user registered: arjun@example.com" },
    { time: "Oct 20, 14:30:12", level: "INFO", text: "Database backup completed" },
    { time: "Oct 20, 14:29:55", level: "INFO", text: "AI service request processed in 1.2s" },
  ];

  const handleAction = (label: string) => {
    setToastMessage(`Executed: ${label}`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="flex h-screen overflow-hidden w-full bg-[#030712] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/admin" className="hidden md:flex shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <TopBar searchPlaceholder="Search logs, backups, metrics..." className="shrink-0" />

        {toastMessage && (
          <div className="absolute top-16 right-8 z-50 bg-[#0d1b30] border border-cyan-400 text-cyan-200 px-4 py-2 rounded-lg shadow-lg shadow-cyan-950/50 flex items-center gap-2 text-xs font-semibold animate-pulse">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-white">System Monitoring & Data Management</h1>
            <p className="text-xs text-slate-400 mt-1">
              Monitor system logs, manage backups, exports and platform configuration
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "system-status", label: "System Status" },
              { id: "logs", label: "Logs" },
              { id: "backups", label: "Backups & Export" },
              { id: "environment", label: "Environment" },
              { id: "integrations", label: "Integrations" },
              { id: "configuration", label: "Configuration" },
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

          {/* 4 Metric Tiles: CPU, Memory, Disk, Network */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* CPU */}
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">CPU Usage</span>
                <Cpu className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">28%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[28%]" />
              </div>
            </div>

            {/* Memory */}
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Memory Usage</span>
                <Layers className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">62%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[62%]" />
              </div>
            </div>

            {/* Disk */}
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Disk Usage</span>
                <HardDrive className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">45%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full w-[45%]" />
              </div>
            </div>

            {/* Network */}
            <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Network</span>
                <Wifi className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">12 Mbps</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[70%]" />
              </div>
            </div>
          </div>

          {/* Middle Row: Server Health | Live Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Server Health */}
            <div className="lg:col-span-5 bg-[#070e1c] border border-blue-900/40 rounded-2xl p-5 space-y-3.5 shadow-xl">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">Server Health</h2>

              <div className="space-y-2.5">
                {[
                  { name: "Application Server", status: "Healthy", latency: "2ms", icon: Server },
                  { name: "Database Server", status: "Healthy", latency: "12ms", icon: Database },
                  { name: "AI Model Service", status: "Healthy", latency: "245ms", icon: Bot },
                  { name: "File Storage", status: "Healthy", latency: "18ms", icon: HardDrive },
                  { name: "Email Service", status: "Healthy", latency: "32ms", icon: Mail },
                  { name: "Cache (Redis)", status: "Healthy", latency: "5ms", icon: Zap },
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-[#0b1528] border border-blue-900/30 p-2.5 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold text-slate-200">{s.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                          {s.status}
                        </span>
                        <span className="text-[11px] text-slate-400">{s.latency}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Logs */}
            <div className="lg:col-span-7 bg-[#070e1c] border border-blue-900/40 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">Live Logs</h2>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-[#0b1528] px-2.5 py-1 rounded-lg text-slate-300 font-semibold border border-blue-900/40">
                    All Levels
                  </span>
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="bg-[#0b1528] hover:bg-[#11203b] border border-blue-900/40 text-slate-300 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-400" />}
                    <span>{isPaused ? "Resume" : "Pause"}</span>
                  </button>
                </div>
              </div>

              {/* Log Entries */}
              <div className="font-mono text-[11px] space-y-1.5 bg-[#030712] border border-slate-900 p-3 rounded-xl max-h-[260px] overflow-y-auto">
                {logs.map((l, i) => (
                  <div key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-slate-500 whitespace-nowrap">{l.time}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        l.level === "INFO"
                          ? "bg-blue-950 text-blue-400"
                          : l.level === "WARN"
                          ? "bg-amber-950 text-amber-400"
                          : "bg-red-950 text-red-400"
                      }`}
                    >
                      {l.level}
                    </span>
                    <span className="text-slate-300 truncate">{l.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row: Backup & Data Export (4 Cards) */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">Backup & Data Export</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-xl">
                <div>
                  <h3 className="text-xs font-bold text-white">Database Backup</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Last: Oct 20, 2026 02:00 AM</p>
                </div>
                <button
                  onClick={() => handleAction("Database Backup Snapshot")}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/30"
                >
                  Back Up
                </button>
              </div>

              {/* Card 2 */}
              <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-xl">
                <div>
                  <h3 className="text-xs font-bold text-white">Export Users</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Download CSV/JSON</p>
                </div>
                <button
                  onClick={() => handleAction("User Registry Download")}
                  className="w-full bg-[#0b1528] hover:bg-[#11203b] border border-blue-900/40 text-slate-200 py-2 rounded-xl text-xs font-bold transition"
                >
                  Export
                </button>
              </div>

              {/* Card 3 */}
              <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-xl">
                <div>
                  <h3 className="text-xs font-bold text-white">Export Analytics</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Generate report</p>
                </div>
                <button
                  onClick={() => handleAction("Analytics Metrics Export")}
                  className="w-full bg-[#0b1528] hover:bg-[#11203b] border border-blue-900/40 text-slate-200 py-2 rounded-xl text-xs font-bold transition"
                >
                  Export
                </button>
              </div>

              {/* Card 4 */}
              <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-xl">
                <div>
                  <h3 className="text-xs font-bold text-white">Full System Backup</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Includes files, configs</p>
                </div>
                <button
                  onClick={() => handleAction("Full Cloud System Snapshot")}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/30"
                >
                  Back Up
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
