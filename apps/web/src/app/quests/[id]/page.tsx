"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  SidebarNav,
  TopBar,
  BottomNav,
  HudPanel,
  SystemButton,
  DifficultyChip,
  StatusChip,
  PosterPanel,
} from "@/components/ui";
import {
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Trash2,
  Edit3,
  Check,
} from "lucide-react";

export default function QuestDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [status, setStatus] = useState<"in_progress" | "completed">("in_progress");

  const [checklist, setChecklist] = useState([
    { id: "c1", title: "Study for 60 minutes", completed: true },
    { id: "c2", title: "Solve at least 3 problems", completed: false },
    { id: "c3", title: "Mark as completed", completed: false },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  const handleMarkComplete = () => {
    setStatus("completed");
    setChecklist((prev) => prev.map((c) => ({ ...c, completed: true })));
  };

  const tabs = ["Overview", "Checklist", "Notes", "Subtasks", "Analytics"];

  return (
    <div className="flex h-screen overflow-hidden bg-[#050814] text-[#f8fafc]">
      <SidebarNav className="hidden md:flex shrink-0" />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar className="shrink-0" />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8 pb-24 md:pb-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Breadcrumb / Back Link */}
          <div>
            <Link
              href="/quests"
              className="inline-flex items-center gap-1.5 text-xs font-hud font-bold text-[#00d2ff] hover:underline"
            >
              <ArrowLeft size={14} /> BACK TO QUESTS
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Quest Details Editor matching DM-06 */}
            <div className="lg:col-span-8 space-y-6">
              <HudPanel className="p-6 sm:p-8 space-y-6">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#8a4fff]/20 border border-[#8a4fff]/50 flex items-center justify-center text-[#c084fc] shadow-[0_0_15px_rgba(138,79,255,0.3)]">
                      <BookOpen size={28} />
                    </div>
                    <div>
                      <h1 className="font-heading text-xl lg:text-2xl font-black text-white">
                        Study DSA (1 hour)
                      </h1>
                      <div className="flex items-center gap-2.5 mt-1">
                        <span className="font-hud text-xs font-bold text-[#00d2ff] flex items-center gap-1">
                          <Sparkles size={12} /> +100 XP
                        </span>
                        <span className="text-[#334155]">•</span>
                        <span className="font-hud text-xs font-bold text-[#94a3b8] uppercase tracking-wider bg-[#050814] px-2 py-0.5 rounded border border-[#142852]">
                          Study
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="bg-[#050814] border border-[#3b6cf6] text-[#60a5fa] font-hud text-xs font-bold rounded-xl px-4 py-2 outline-none cursor-pointer"
                    >
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Sub-tabs */}
                <div className="flex items-center gap-2 border-b border-[#142852] pb-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        activeTab === tab
                          ? "bg-[#3b6cf6] text-white shadow-[0_0_10px_rgba(59,108,246,0.4)]"
                          : "text-[#94a3b8] hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Main Body: Description & Details Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-2">
                  {/* Left Column: Description & Checklist */}
                  <div className="sm:col-span-7 space-y-5">
                    <div>
                      <h4 className="text-xs font-hud font-bold text-[#94a3b8] uppercase tracking-wider mb-2">
                        Description
                      </h4>
                      <p className="text-sm text-[#cbd5e1] leading-relaxed">
                        Complete 1 hour of DSA practice to strengthen your problem solving skills.
                        Focus on Graph Algorithms and Dynamic Programming recurrences.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-hud font-bold text-[#94a3b8] uppercase tracking-wider">
                        Checklist
                      </h4>
                      <div className="space-y-2">
                        {checklist.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => toggleCheck(item.id)}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-[#050814] border border-[#142852] hover:border-[#204899] cursor-pointer transition-colors"
                          >
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                item.completed
                                  ? "bg-[#10b981] border-[#10b981] text-white"
                                  : "border-[#142852] bg-transparent"
                              }`}
                            >
                              {item.completed && <Check size={12} strokeWidth={3} />}
                            </div>
                            <span
                              className={`text-xs font-medium ${
                                item.completed ? "line-through text-[#64748b]" : "text-[#f8fafc]"
                              }`}
                            >
                              {item.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Key Details Sidebar */}
                  <div className="sm:col-span-5 bg-[#050814] border border-[#142852] rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-hud font-bold text-white uppercase tracking-wider border-b border-[#142852] pb-2">
                      Details
                    </h4>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748b]">Category</span>
                        <span className="font-bold text-white">Study</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748b]">Priority</span>
                        <DifficultyChip difficulty="medium" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748b]">Deadline</span>
                        <span className="text-[#94a3b8] font-mono text-[11px]">Oct 14, 2026, 10:00 PM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748b]">Repeat</span>
                        <span className="font-bold text-white">Daily</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions Row matching DM-06 */}
                <div className="pt-6 border-t border-[#142852] flex items-center justify-between gap-4">
                  <SystemButton
                    type="button"
                    variant="danger"
                    size="md"
                    onClick={() => router.push("/quests")}
                    className="gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </SystemButton>

                  <div className="flex items-center gap-3">
                    <SystemButton variant="secondary" size="md">
                      <Edit3 size={15} className="mr-1.5" /> Edit
                    </SystemButton>
                    <SystemButton
                      variant="primary"
                      size="md"
                      onClick={handleMarkComplete}
                      className="shadow-[0_0_20px_rgba(59,108,246,0.5)]"
                    >
                      <CheckCircle2 size={16} className="mr-1.5" /> Mark Complete
                    </SystemButton>
                  </div>
                </div>
              </HudPanel>
            </div>

            {/* Right 4 Cols: Decorative Art Panel matching DM-06 */}
            <div className="lg:col-span-4">
              <PosterPanel
                variant="castle"
                quote="KNOWLEDGE IS A WEAPON"
                subquote="USE IT"
                className="h-[520px] w-full"
              />
            </div>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
