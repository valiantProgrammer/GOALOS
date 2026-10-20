"use client";

import React, { useState } from "react";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { ArtPanel } from "@/components/ui/ArtPanel";
import { HudPanel } from "@/components/ui/HudPanel";
import { SystemButton } from "@/components/ui/SystemButton";

const TABS = ["All", "Avatars", "Themes", "Boosts", "Titles", "Items", "Special"];

const SHOP_ITEMS = [
  { id: "s-1", name: "Shadow Aura", price: 500, category: "Avatars", icon: "👤", aura: "rgba(59,108,246,0.3)" },
  { id: "s-2", name: "Hunter Avatar", price: 700, category: "Avatars", icon: "🥷", aura: "rgba(0,210,255,0.3)" },
  { id: "s-3", name: "Blue Aura Theme", price: 600, category: "Themes", icon: "✨", aura: "rgba(0,210,255,0.4)" },
  { id: "s-4", name: "Neon Frame", price: 400, category: "Items", icon: "🖼️", aura: "rgba(168,85,247,0.3)" },
  { id: "s-5", name: "Title: Focused", price: 1200, category: "Titles", icon: "🎖️", aura: "rgba(245,158,11,0.3)" },
  { id: "s-6", name: "Night City Theme", price: 800, category: "Themes", icon: "🏙️", aura: "rgba(168,85,247,0.4)" },
  { id: "s-7", name: "XP Boost (2x)", price: 150, category: "Boosts", icon: "⚡", aura: "rgba(59,108,246,0.4)" },
  { id: "s-8", name: "Focus Timer+", price: 200, category: "Items", icon: "⏱️", aura: "rgba(0,210,255,0.4)" },
  { id: "s-9", name: "Custom Banner", price: 300, category: "Items", icon: "🚩", aura: "rgba(16,185,129,0.3)" },
  { id: "s-10", name: "Rogue Outfit", price: 1500, category: "Special", icon: "🥋", aura: "rgba(239,68,68,0.3)" },
];

export default function RewardShopPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [coins, setCoins] = useState(2450);
  const [cartCount, setCartCount] = useState(0);

  const filtered = SHOP_ITEMS.filter((item) => {
    if (activeTab === "All") return true;
    return item.category === activeTab;
  });

  const handleBuy = (item: typeof SHOP_ITEMS[0]) => {
    if (coins >= item.price) {
      setCoins(coins - item.price);
      setCartCount(cartCount + 1);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#050814] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/shop" className="hidden md:flex shrink-0" />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar searchPlaceholder="Search shop items, themes..." className="shrink-0" />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Shop Area */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Header Strip with Coin Balance & Cart */}
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-xl font-bold text-white tracking-wide">Reward Shop</h1>
                <p className="text-xs text-slate-400 mt-1">Exchange quest coins for avatar cosmetics and boosts</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#0a1224] border border-[#f59e0b]/40 px-3.5 py-1.5 rounded-lg shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                  <span className="text-base">🪙</span>
                  <span className="text-sm font-bold text-[#f59e0b] font-mono">
                    {coins.toLocaleString()}
                  </span>
                </div>
                <button className="flex items-center gap-2 bg-[#0a1224] border border-[#142852] px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white">
                  <span>🛒</span>
                  <span>Cart ({cartCount})</span>
                </button>
              </div>
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

            {/* Items Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((item) => (
                <HudPanel
                  key={item.id}
                  className="p-4 flex flex-col items-center justify-between text-center group hover:border-[#00d2ff]/60 transition-all"
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-3 border border-[#142852]"
                    style={{ backgroundColor: item.aura }}
                  >
                    {item.icon}
                  </div>
                  <div className="space-y-1 mb-4">
                    <h3 className="text-xs font-bold text-white group-hover:text-[#00d2ff] transition-colors">
                      {item.name}
                    </h3>
                    <div className="text-xs font-bold text-[#f59e0b] font-mono">
                      🪙 {item.price}
                    </div>
                  </div>
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={coins < item.price}
                    className={`w-full py-1.5 rounded-md text-xs font-bold transition-all ${
                      coins >= item.price
                        ? "bg-[#3b6cf6] text-white hover:bg-[#2555eb] shadow-[0_0_8px_rgba(59,108,246,0.4)]"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    Buy
                  </button>
                </HudPanel>
              ))}
            </div>
          </main>

          {/* Right Art Panel */}
          <ArtPanel variant="castle" quote="EARN CUSTOMIZE STAND OUT" />
        </div>
      </div>
    </div>
  );
}
