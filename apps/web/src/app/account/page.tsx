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
import { DEMO_HUNTER } from "@goalos/config";
import {
  Shield,
  Key,
  Smartphone,
  Share2,
  Download,
  FileText,
  Trash2,
  ChevronRight,
  Upload,
} from "lucide-react";

export default function AccountPrivacyPage() {
  const [activeTab, setActiveTab] = useState("Account");
  const [twoFactor, setTwoFactor] = useState(true);
  const [name, setName] = useState(DEMO_HUNTER.hunterName);
  const [email, setEmail] = useState("rupayan@example.com");
  const [bio, setBio] = useState(DEMO_HUNTER.motto);

  const tabs = ["Account", "Security", "Privacy", "Data & Storage", "Connected Apps"];

  const handleExportData = () => {
    const data = JSON.stringify(DEMO_HUNTER, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hunter-data-${DEMO_HUNTER.hunterName}.json`;
    a.click();
  };

  return (
    <div className="flex max-h-screen bg-[#050814] text-[#f8fafc]">
      <SidebarNav className="hidden md:flex" />

      <div className="flex-1 flex flex-col min-w-0 relative overflow-y-auto">
        <TopBar />

        {/* Hero Background Banner */}
        <div className="absolute top-16 left-0 right-0 h-64 sm:h-72 pointer-events-none overflow-hidden select-none z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
            style={{ backgroundImage: "url('/ru.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/20 via-[#050814]/60 to-[#050814]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050814]/85 via-transparent to-[#050814]/85" />
        </div>

        <main className="flex-1 p-6 lg:p-8 pb-24 md:pb-8 space-y-6 max-w-7xl mx-auto w-full relative z-10">
          <div>
            <h1 className="font-heading text-2xl lg:text-3xl font-black text-white">
              Account & Privacy
            </h1>
            <p className="text-xs text-[#94a3b8] mt-1 font-medium">
              Manage personal identity, security credentials, active sessions, and data exports.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0a1224] border border-[#142852] w-fit overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === tab
                  ? "bg-[#3b6cf6] text-white shadow-[0_0_10px_rgba(59,108,246,0.4)]"
                  : "text-[#94a3b8] hover:text-white"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main 2-Column Grid matching DM-25 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 Cols: Profile Information */}
            <div className="lg:col-span-6 space-y-6">
              <HudPanel className="p-6 sm:p-8 space-y-5 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider border-b border-[#142852] pb-3">
                  Profile Information
                </h3>

                {/* Avatar Preview */}
                <div className="flex items-center gap-4 py-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3b6cf6] to-[#00d2ff] flex items-center justify-center font-heading text-2xl font-black text-white shadow-[0_0_15px_rgba(0,210,255,0.4)] border border-[#00d2ff]">
                    {name[0]}
                  </div>
                  <button
                    type="button"
                    className="text-xs font-hud font-bold text-[#00d2ff] hover:underline flex items-center gap-1.5"
                  >
                    <Upload size={14} /> Change Avatar
                  </button>
                </div>

                {/* Profile Fields */}
                <div className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-hud font-bold text-[#94a3b8] uppercase">Hunter Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-hud font-bold text-[#94a3b8] uppercase">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-hud font-bold text-[#94a3b8] uppercase">Class</label>
                      <input
                        type="text"
                        disabled
                        value="Shadow Hunter"
                        className="w-full bg-[#050814]/50 border border-[#142852] rounded-xl px-4 py-2.5 text-[#00d2ff] font-bold outline-none cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-hud font-bold text-[#94a3b8] uppercase">Rank</label>
                      <input
                        type="text"
                        disabled
                        value="D-Rank"
                        className="w-full bg-[#050814]/50 border border-[#142852] rounded-xl px-4 py-2.5 text-[#60a5fa] font-bold outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-hud font-bold text-[#94a3b8] uppercase">Bio / Motto</label>
                    <input
                      type="text"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <SystemButton variant="primary" size="sm">
                    Save Changes
                  </SystemButton>
                </div>
              </HudPanel>
            </div>

            {/* Right 6 Cols: Account Actions matching DM-25 */}
            <div className="lg:col-span-6 space-y-6">
              <HudPanel className="p-6 sm:p-8 space-y-4 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider border-b border-[#142852] pb-3">
                  Account Actions
                </h3>

                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#050814] border border-[#142852] hover:border-[#204899] text-xs font-semibold text-white transition-all">
                    <span className="flex items-center gap-3">
                      <Key size={16} className="text-[#3b6cf6]" /> Change Password
                    </span>
                    <ChevronRight size={16} className="text-[#64748b]" />
                  </button>

                  {/* 2FA Toggle */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#050814] border border-[#142852] text-xs font-semibold text-white">
                    <span className="flex items-center gap-3">
                      <Shield size={16} className="text-[#10b981]" /> Two-Factor Authentication
                    </span>
                    <button
                      type="button"
                      onClick={() => setTwoFactor(!twoFactor)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${twoFactor ? "bg-[#10b981]" : "bg-[#1e293b]"
                        }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${twoFactor ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>

                  <button className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#050814] border border-[#142852] hover:border-[#204899] text-xs font-semibold text-white transition-all">
                    <span className="flex items-center gap-3">
                      <Smartphone size={16} className="text-[#00d2ff]" /> Manage Devices (3 Active)
                    </span>
                    <ChevronRight size={16} className="text-[#64748b]" />
                  </button>

                  <button className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#050814] border border-[#142852] hover:border-[#204899] text-xs font-semibold text-white transition-all">
                    <span className="flex items-center gap-3">
                      <Share2 size={16} className="text-[#a78bfa]" /> Connected Accounts (Google, Discord)
                    </span>
                    <ChevronRight size={16} className="text-[#64748b]" />
                  </button>

                  <button
                    onClick={handleExportData}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#050814] border border-[#142852] hover:border-[#204899] text-xs font-semibold text-white transition-all"
                  >
                    <span className="flex items-center gap-3">
                      <Download size={16} className="text-[#f5a623]" /> Export My Data (JSON)
                    </span>
                    <ChevronRight size={16} className="text-[#64748b]" />
                  </button>

                  <button className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#050814] border border-[#142852] hover:border-[#204899] text-xs font-semibold text-white transition-all">
                    <span className="flex items-center gap-3">
                      <FileText size={16} className="text-[#94a3b8]" /> Download Activity Log
                    </span>
                    <ChevronRight size={16} className="text-[#64748b]" />
                  </button>

                  {/* Delete Account */}
                  <button className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#f87171] hover:bg-[#ef4444]/20 transition-all text-xs font-bold mt-4">
                    <Trash2 size={16} /> Delete Account
                  </button>
                </div>

                <div className="pt-4 border-t border-[#142852] text-right">
                  <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                    YOUR DATA • YOUR CONTROL
                  </h4>
                  <h4 className="font-heading text-xs font-bold text-[#00d2ff] uppercase tracking-wider">
                    YOUR JOURNEY
                  </h4>
                </div>
              </HudPanel>
            </div>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
