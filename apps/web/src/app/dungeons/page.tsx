"use client";

import React, { useState } from "react";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { BottomNav } from "@/components/ui/BottomNav";
import { PosterPanel } from "@/components/ui/PosterPanel";
import { DUNGEONS_DATA } from "@goalos/config";
import { Lock, Sparkles, Trophy, Award, Coins, ChevronRight, ShieldCheck } from "lucide-react";

export default function DungeonsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [chapters, setChapters] = useState(DUNGEONS_DATA);
  const [selectedChapterId, setSelectedChapterId] = useState("chapter-1");
  const [isBattling, setIsBattling] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0];

  const handleContinueBattle = async () => {
    setIsBattling(true);
    try {
      const res = await fetch("/api/dungeons/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapterId: selectedChapter.id }),
      });
      const data = await res.json();
      if (data.success) {
        setChapters((prev) =>
          prev.map((c) =>
            c.id === selectedChapter.id
              ? { ...c, progress: data.progress, status: data.status }
              : c
          )
        );
        setToastMessage(data.message);
      } else {
        setToastMessage(data.error || "Combat error.");
      }
    } catch {
      // Local fallback for offline
      setChapters((prev) =>
        prev.map((c) =>
          c.id === selectedChapter.id
            ? { ...c, progress: Math.min(c.total, c.progress + 1) }
            : c
        )
      );
      setToastMessage("Cleared combat trial!");
    } finally {
      setIsBattling(false);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden w-full bg-transparent text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/goals" className="hidden md:flex shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <TopBar searchPlaceholder="Search goals, quests, habits..." className="shrink-0" />

        {toastMessage && (
          <div className="absolute top-16 right-8 z-50 bg-[#0d1b30] border border-cyan-400 text-cyan-200 px-4 py-2 rounded-lg shadow-lg shadow-cyan-950/50 flex items-center gap-2 text-xs font-semibold animate-pulse">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Title */}
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-white">Dungeons & Challenges</h1>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2">
            {[
              { id: "all", label: "All" },
              { id: "main", label: "Main Dungeons" },
              { id: "side", label: "Side Quests" },
              { id: "challenges", label: "Challenges" },
              { id: "events", label: "Events" },
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

          {/* 3-Column Layout: Chapters List | Portal Art | Chapter Rewards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Column 1: Chapters Cards List */}
            <div className="lg:col-span-5 space-y-4">
              {chapters.map((chapter) => {
                const isSelected = chapter.id === selectedChapterId;
                const isLocked = chapter.status === "locked";

                return (
                  <div
                    key={chapter.id}
                    onClick={() => !isLocked && setSelectedChapterId(chapter.id)}
                    className={`bg-[#070e1c] border rounded-2xl p-4 flex items-center gap-4 transition cursor-pointer ${
                      isSelected
                        ? "border-blue-500 shadow-lg shadow-blue-950/40"
                        : "border-blue-900/40 hover:border-blue-850"
                    } ${isLocked ? "opacity-75" : ""}`}
                  >
                    {/* Thumbnail Silhouette */}
                    <div className="w-20 h-24 rounded-xl overflow-hidden relative flex-shrink-0 bg-slate-900 border border-blue-950">
                      <div
                        className={`absolute inset-0 bg-gradient-to-b ${
                          chapter.chapterNumber % 2 === 0
                            ? "from-purple-950/80 to-[#030712]"
                            : "from-blue-950/80 to-[#030712]"
                        }`}
                      />
                      {/* Stylized Hunter Silhouette */}
                      <svg className="absolute inset-0 w-full h-full text-blue-400/40" viewBox="0 0 100 120">
                        <circle cx="50" cy="35" r="14" fill="currentColor" />
                        <path d="M25,120 C25,75 75,75 75,120 Z" fill="currentColor" />
                        <path d="M15,120 L30,60 L70,60 L85,120 Z" fill="currentColor" opacity="0.6" />
                      </svg>
                      {chapter.chapterNumber === 1 && (
                        <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      )}
                    </div>

                    {/* Chapter Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400">{chapter.title}</span>
                      <h3 className="text-sm font-bold text-white truncate">{chapter.subtitle}</h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{chapter.description}</p>

                      {/* Progress Bar for Active Chapter */}
                      {!isLocked ? (
                        <div className="pt-2 space-y-2">
                          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-teal-400 to-blue-500 h-full rounded-full transition-all"
                              style={{ width: `${(chapter.progress / chapter.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {/* Right Action / Lock */}
                    <div className="flex flex-col items-end flex-shrink-0">
                      {isLocked ? (
                        <div className="flex flex-col items-center gap-1 text-slate-500">
                          <Lock className="w-4 h-4" />
                          <span className="text-[10px] font-semibold">Locked</span>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedChapterId(chapter.id);
                            handleContinueBattle();
                          }}
                          disabled={isBattling}
                          className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition disabled:opacity-50"
                        >
                          {isBattling ? "Fighting..." : "Continue"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 2: Portal Art & Motivational Quote */}
            <PosterPanel
              variant="castle"
              quote="THE JOURNEY"
              subquote="NEVER ENDS"
              className="lg:col-span-4 min-h-[440px]"
            />

            {/* Column 3: Chapter Rewards Card */}
            <div className="lg:col-span-3 bg-[#070e1c] border border-blue-900/40 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-2xl">
              <div className="space-y-5">
                <h2 className="text-base font-bold text-white tracking-wide">Chapter Rewards</h2>

                {/* Rewards Items */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-600/40 flex items-center justify-center text-amber-400">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-200">+{selectedChapter.rewards.xp} XP</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-600/40 flex items-center justify-center text-purple-400">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-200">{selectedChapter.rewards.avatar}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-600/40 flex items-center justify-center text-blue-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-200">Title: {selectedChapter.rewards.title}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
                      <Coins className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-200">{selectedChapter.rewards.coins} Coins</span>
                  </div>
                </div>

                {/* Progress Strip */}
                <div className="pt-4 border-t border-slate-800/60 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400">Completion</span>
                    <span className="text-white font-bold">{selectedChapter.progress}/{selectedChapter.total}</span>
                  </div>
                  <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-400 to-blue-500 h-full rounded-full transition-all"
                      style={{ width: `${(selectedChapter.progress / selectedChapter.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* View All Rewards CTA */}
              <button
                onClick={() => {
                  setToastMessage("All chapter reward tiers unlocked for viewing.");
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
              >
                <span>View All Rewards</span>
              </button>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
