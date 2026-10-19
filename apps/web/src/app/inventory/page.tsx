"use client";

import React, { useState } from "react";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { ArtPanel } from "@/components/ui/ArtPanel";
import { HudPanel } from "@/components/ui/HudPanel";

const TABS = ["All", "Avatars", "Themes", "Titles", "Items", "Boosts"];

const INVENTORY_ITEMS = [
  { id: "inv-1", name: "Shadow Avatar", category: "Avatars", equipped: true, icon: "👤", count: 1 },
  { id: "inv-2", name: "Neon Frame", category: "Items", equipped: true, icon: "🖼️", count: 1 },
  { id: "inv-3", name: "Title: The Awakening", category: "Titles", equipped: true, icon: "🎖️", count: 1 },
  { id: "inv-4", name: "Blue Aura Theme", category: "Themes", equipped: true, icon: "✨", count: 1 },
  { id: "inv-5", name: "Night City Theme", category: "Themes", equipped: false, icon: "🏙️", count: 1 },
  { id: "inv-6", name: "Soul's Emblem", category: "Items", equipped: false, icon: "🛡️", count: 1 },
  { id: "inv-7", name: "XP Boost (2x)", category: "Boosts", equipped: false, icon: "⚡", count: 3 },
  { id: "inv-8", name: "Focus Timer+", category: "Items", equipped: false, icon: "⏱️", count: 2 },
];

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = INVENTORY_ITEMS.filter((item) => {
    if (activeTab === "All") return true;
    return item.category === activeTab;
  });

  return (
    <div className="flex h-screen bg-[#050814] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/inventory" />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopBar searchPlaceholder="Search inventory, collection..." />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Inventory Area */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">
                Inventory & Collection
              </h1>
              <p className="text-xs text-slate-400 mt-1">Manage your unlocked titles, frames, themes, and items</p>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 bg-[#0a1224] p-1.5 rounded-lg border border-[#142852] w-fit flex-wrap">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wider transition-all ${
                    activeTab === tab
                      ? "bg-[#3b6cf6] text-white shadow-[0_0_12px_rgba(59,108,246,0.5)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Inventory Grid + Equipped Loadout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Items Grid */}
              <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {filtered.map((item) => (
                  <HudPanel
                    key={item.id}
                    className="p-4 flex flex-col items-center justify-between text-center relative group hover:border-[#00d2ff]/60 transition-all"
                  >
                    {item.equipped && (
                      <span className="absolute top-2 right-2 text-[9px] font-bold bg-[#10b981]/20 border border-[#10b981] text-[#10b981] px-1.5 py-0.5 rounded">
                        Equipped
                      </span>
                    )}
                    <div className="w-14 h-14 rounded-xl bg-[#050814] border border-[#142852] flex items-center justify-center text-2xl my-2">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white group-hover:text-[#00d2ff] transition-colors">
                        {item.name}
                      </h3>
                      {item.count > 1 && (
                        <span className="text-[10px] text-[#00d2ff] font-mono">
                          +{item.count} owned
                        </span>
                      )}
                    </div>
                    <button
                      className={`w-full mt-3 py-1 rounded text-xs font-bold transition-all ${
                        item.equipped
                          ? "bg-slate-800 text-slate-400 border border-slate-700 cursor-default"
                          : "bg-[#0a1224] border border-[#3b6cf6] text-[#00d2ff] hover:bg-[#3b6cf6] hover:text-white"
                      }`}
                    >
                      {item.equipped ? "In Use" : "Equip"}
                    </button>
                  </HudPanel>
                ))}
              </div>

              {/* Equipped Loadout Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <HudPanel className="p-5 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Equipped Items
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-2 rounded bg-[#050814] border border-[#142852]">
                      <span className="text-slate-400">Avatar</span>
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <span>👤</span> Shadow Avatar
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[#050814] border border-[#142852]">
                      <span className="text-slate-400">Frame</span>
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <span>🖼️</span> Neon Frame
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[#050814] border border-[#142852]">
                      <span className="text-slate-400">Title</span>
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <span>🎖️</span> The Awakening
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-[#050814] border border-[#142852]">
                      <span className="text-slate-400">Theme</span>
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <span>✨</span> Blue Aura Theme
                      </span>
                    </div>
                  </div>
                </HudPanel>

                <HudPanel className="p-5 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-slate-300">
                      Collection Progress
                    </span>
                    <span className="text-[#00d2ff] font-bold">42 / 120 (35%)</span>
                  </div>
                  <div className="w-full h-2 bg-[#050814] rounded-full overflow-hidden border border-[#142852]">
                    <div className="h-full bg-[#00d2ff]" style={{ width: "35%" }} />
                  </div>
                </HudPanel>
              </div>
            </div>
          </main>

          {/* Right Art Panel */}
          <ArtPanel quote="YOUR COLLECTION TELLS YOUR STORY" />
        </div>
      </div>
    </div>
  );
}
