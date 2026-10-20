"use client";

import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";

export default function LandingPage() {
  return (
    <div
      className="relative min-h-screen w-full bg-[#050814] text-[#f8fafc] flex flex-col justify-between overflow-x-hidden selection:bg-[#00d2ff] selection:text-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/landingpage.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#050814]/75 via-[#050814]/25 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/60 via-transparent to-[#050814]/70 pointer-events-none" />

      <header className="relative z-20 h-20 px-6 sm:px-12 lg:px-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading text-2xl sm:text-3xl font-black tracking-widest text-[#00d2ff] drop-shadow-[0_0_15px_rgba(0,210,255,0.7)]"
        >
          GOALOS
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full bg-[#1e3a8a]/40 border border-[#3b82f6]/40 text-[#60a5fa] font-bold shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all"
          >
            Home
          </Link>
          <Link href="#features" className="text-[#94a3b8] hover:text-white font-medium transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-[#94a3b8] hover:text-white font-medium transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="text-[#94a3b8] hover:text-white font-medium transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <button className="border border-[#1e3a8a] bg-[#07132b]/80 hover:border-[#3b82f6] hover:bg-[#0a1e45] text-white font-semibold px-5 py-2 rounded-xl text-xs sm:text-sm backdrop-blur-md transition-all shadow-[0_0_12px_rgba(0,0,0,0.5)]">
              Sign In
            </button>
          </Link>
          <Link href="/onboarding">
            <button className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-bold px-5 py-2 rounded-xl text-xs sm:text-sm shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:shadow-[0_0_30px_rgba(59,130,246,0.9)] hover:scale-105 active:scale-95 transition-all">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-10 max-w-7xl w-full">
        <div className="max-w-xl space-y-6">
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight">
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">LEVEL </span>
            <span className="text-[#60a5fa] drop-shadow-[0_0_25px_rgba(96,165,250,0.8)]">UP</span>
            <br />
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">YOUR </span>
            <span className="text-[#60a5fa] drop-shadow-[0_0_25px_rgba(96,165,250,0.8)]">LIFE</span>
          </h1>

          <p className="text-base sm:text-lg text-[#94a3b8] font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Turn your goals into quests.
            <br />
            Build habits, gain XP and become a stronger you.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/onboarding">
              <button className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-[0_0_25px_rgba(59,130,246,0.7)] hover:shadow-[0_0_35px_rgba(59,130,246,1)] hover:scale-105 active:scale-95 transition-all">
                Get Started
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="bg-[#07132b]/80 border border-[#2563eb] text-white font-bold px-6 py-3.5 rounded-xl text-sm flex items-center gap-2.5 backdrop-blur-md shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:border-[#60a5fa] hover:bg-[#0a1e45] hover:scale-105 active:scale-95 transition-all">
                <div className="w-5 h-5 rounded-full border border-[#00d2ff] flex items-center justify-center">
                  <Play size={10} className="fill-[#00d2ff] text-[#00d2ff] ml-0.5" />
                </div>
                Watch Demo
              </button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-6 sm:px-12 lg:px-16 py-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="flex items-center gap-6 sm:gap-10">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-heading">10K+</div>
            <div className="text-xs text-[#94a3b8] font-medium mt-0.5">Active Hunters</div>
          </div>
          <div className="h-8 w-px bg-[#1e293b]/60" />
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-heading flex items-center gap-1">
              4.9<span className="text-[#60a5fa] text-xl">★</span>
            </div>
            <div className="text-xs text-[#94a3b8] font-medium mt-0.5">User Rating</div>
          </div>
          <div className="h-8 w-px bg-[#1e293b]/60" />
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-heading">28 Days</div>
            <div className="text-xs text-[#94a3b8] font-medium mt-0.5">Average Streak</div>
          </div>
        </div>

        <div className="text-left sm:text-right select-none">
          <div className="font-heading font-black text-sm sm:text-base tracking-[0.25em] text-[#60a5fa] drop-shadow-[0_0_15px_rgba(96,165,250,0.6)] leading-relaxed">
            DISCIPLINE
          </div>
          <div className="font-heading font-black text-sm sm:text-base tracking-[0.25em] text-[#60a5fa] drop-shadow-[0_0_15px_rgba(96,165,250,0.6)] leading-relaxed">
            CREATES
          </div>
          <div className="font-heading font-black text-sm sm:text-base tracking-[0.25em] text-[#60a5fa] drop-shadow-[0_0_15px_rgba(96,165,250,0.6)] leading-relaxed">
            FREEDOM
          </div>
        </div>
      </footer>
    </div>
  );
}
