"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SidebarNav,
  TopBar,
  BottomNav,
  HudPanel,
  SystemButton,
  DifficultyChip,
  StatusChip,
} from "@/components/ui";
import { TaskDifficulty, TaskStatus } from "@goalos/types";
import {
  Check,
  Plus,
  Search,
  Filter,
  MoreVertical,
  ChevronDown,
  Sparkles,
} from "lucide-react";

interface QuestRow {
  id: string;
  title: string;
  category: string;
  difficulty: TaskDifficulty;
  xpReward: number;
  deadline: string;
  status: TaskStatus;
  completed: boolean;
}

export default function QuestManagementPage() {
  const [activeTab, setActiveTab] = useState("Daily");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("study");
  const [newDifficulty, setNewDifficulty] = useState<TaskDifficulty>("medium");

  const [quests, setQuests] = useState<QuestRow[]>([
    {
      id: "q-1",
      title: "Morning Workout",
      category: "Health",
      difficulty: "medium",
      xpReward: 80,
      deadline: "Today, 10:00 PM",
      status: "completed",
      completed: true,
    },
    {
      id: "q-2",
      title: "Study DSA (1 hour)",
      category: "Study",
      difficulty: "medium",
      xpReward: 100,
      deadline: "Today, 10:00 PM",
      status: "in_progress",
      completed: false,
    },
    {
      id: "q-3",
      title: "Read a Book",
      category: "Study",
      difficulty: "easy",
      xpReward: 50,
      deadline: "Today, 11:00 PM",
      status: "start",
      completed: false,
    },
    {
      id: "q-4",
      title: "Drink 2L Water",
      category: "Health",
      difficulty: "easy",
      xpReward: 50,
      deadline: "Today, 08:00 PM",
      status: "start",
      completed: false,
    },
    {
      id: "q-5",
      title: "Meditate (10 min)",
      category: "Personal",
      difficulty: "easy",
      xpReward: 50,
      deadline: "Today, 09:00 PM",
      status: "start",
      completed: false,
    },
    {
      id: "q-6",
      title: "Plan Tomorrow",
      category: "Work",
      difficulty: "easy",
      xpReward: 40,
      deadline: "Today, 11:30 PM",
      status: "locked",
      completed: false,
    },
  ]);

  const tabs = ["All", "Daily", "Weekly", "Story", "Special"];
  const categories = ["All", "Study", "Health", "Work", "Personal"];

  const toggleComplete = (id: string) => {
    setQuests((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              completed: !q.completed,
              status: (!q.completed ? "completed" : "in_progress") as TaskStatus,
            }
          : q
      )
    );
  };

  const handleCreateQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: QuestRow = {
      id: `q-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory.charAt(0).toUpperCase() + newCategory.slice(1),
      difficulty: newDifficulty,
      xpReward: newDifficulty === "hard" ? 120 : newDifficulty === "medium" ? 80 : 50,
      deadline: "Today, 10:00 PM",
      status: "start",
      completed: false,
    };

    setQuests([created, ...quests]);
    setNewTitle("");
    setShowCreateModal(false);
  };

  const filteredQuests = quests.filter((q) => {
    const matchesCategory = selectedCategory === "All" || q.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-[#050814] text-[#f8fafc]">
      <SidebarNav className="hidden md:flex shrink-0" />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar className="shrink-0" />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8 pb-24 md:pb-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Row: Title & Create Quest Button */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl lg:text-3xl font-black text-white">
                Quests
              </h1>
              <p className="text-xs text-[#94a3b8] mt-1 font-medium">
                Manage, filter, and track all your active hunter objectives.
              </p>
            </div>
            <SystemButton
              variant="primary"
              size="md"
              onClick={() => setShowCreateModal(true)}
              className="gap-2 shadow-[0_0_15px_rgba(59,108,246,0.4)]"
            >
              <Plus size={16} /> Create Quest
            </SystemButton>
          </div>

          {/* Filter Tabs matching DM-05 */}
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

          {/* Sub-filters & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    selectedCategory === cat
                      ? "bg-[#132c66] border-[#00d2ff] text-[#00d2ff] font-bold"
                      : "bg-[#0a1224] border-[#142852] text-[#94a3b8] hover:border-[#204899]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right Display Mode & Search */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
                <input
                  type="text"
                  placeholder="Search quests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#0a1224] border border-[#142852] focus:border-[#00d2ff] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#64748b] outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0a1224] border border-[#142852] text-xs font-semibold text-[#94a3b8]">
                Display: List <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* Quests Table Panel matching DM-05 */}
          <HudPanel className="overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.5)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#142852] bg-[#070d1c] text-[#64748b] font-hud uppercase tracking-wider">
                    <th className="p-3.5 pl-4 w-10"></th>
                    <th className="p-3.5 font-bold">Quest Name</th>
                    <th className="p-3.5 font-bold">Category</th>
                    <th className="p-3.5 font-bold">Difficulty</th>
                    <th className="p-3.5 font-bold">Reward</th>
                    <th className="p-3.5 font-bold">Deadline</th>
                    <th className="p-3.5 font-bold">Status</th>
                    <th className="p-3.5 pr-4 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#142852]/60">
                  {filteredQuests.map((quest) => (
                    <tr
                      key={quest.id}
                      className="hover:bg-[#0d1933]/60 transition-colors group"
                    >
                      {/* Checkbox */}
                      <td className="p-3.5 pl-4">
                        <button
                          onClick={() => toggleComplete(quest.id)}
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                            quest.completed
                              ? "bg-[#10b981] border-[#10b981] text-white shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                              : "bg-[#050814] border-[#1a3366] hover:border-[#00d2ff]"
                          }`}
                        >
                          {quest.completed && <Check size={12} strokeWidth={3} />}
                        </button>
                      </td>

                      {/* Quest Title */}
                      <td className="p-3.5 font-semibold">
                        <Link
                          href={`/quests/${quest.id}`}
                          className={`hover:text-[#00d2ff] transition-colors ${
                            quest.completed ? "line-through text-[#64748b]" : "text-white"
                          }`}
                        >
                          {quest.title}
                        </Link>
                      </td>

                      {/* Category */}
                      <td className="p-3.5 font-hud text-[#94a3b8] uppercase font-bold tracking-wider">
                        {quest.category}
                      </td>

                      {/* Difficulty */}
                      <td className="p-3.5">
                        <DifficultyChip difficulty={quest.difficulty} />
                      </td>

                      {/* Reward */}
                      <td className="p-3.5 font-hud font-bold text-[#00d2ff] tracking-wider">
                        +{quest.xpReward} XP
                      </td>

                      {/* Deadline */}
                      <td className="p-3.5 text-[#94a3b8]">
                        {quest.deadline}
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        <StatusChip status={quest.status} />
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 pr-4 text-right">
                        <Link
                          href={`/quests/${quest.id}`}
                          className="text-[#64748b] hover:text-[#00d2ff] transition-colors p-1 inline-block"
                        >
                          <MoreVertical size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </HudPanel>

          {/* Create Quest Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <HudPanel className="w-full max-w-lg p-6 space-y-5 shadow-[0_0_40px_rgba(0,210,255,0.25)] border-[#00d2ff]/40">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles size={18} className="text-[#00d2ff]" /> CREATE NEW QUEST
                  </h3>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-[#64748b] hover:text-white text-lg font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreateQuest} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-hud font-bold text-[#94a3b8] uppercase tracking-wider">
                      Quest Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Complete System Architecture Design"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-hud font-bold text-[#94a3b8] uppercase tracking-wider">
                        Category
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                      >
                        <option value="study">Study</option>
                        <option value="health">Health</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-hud font-bold text-[#94a3b8] uppercase tracking-wider">
                        Difficulty
                      </label>
                      <select
                        value={newDifficulty}
                        onChange={(e) => setNewDifficulty(e.target.value as TaskDifficulty)}
                        className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                      >
                        <option value="easy">Easy (+50 XP)</option>
                        <option value="medium">Medium (+80 XP)</option>
                        <option value="hard">Hard (+120 XP)</option>
                        <option value="hardcore">Hardcore (+200 XP)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <SystemButton
                      type="button"
                      variant="secondary"
                      size="md"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </SystemButton>
                    <SystemButton
                      type="submit"
                      variant="primary"
                      size="md"
                      className="flex-1 shadow-[0_0_15px_rgba(59,108,246,0.4)]"
                    >
                      Initialize Quest
                    </SystemButton>
                  </div>
                </form>
              </HudPanel>
            </div>
          )}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
