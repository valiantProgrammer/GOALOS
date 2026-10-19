"use client";

import React from "react";
import Link from "next/link";
import { SystemButton } from "@/components/ui";
import { Play, Star, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050814] text-[#f8fafc] flex flex-col justify-between selection:bg-[#00d2ff] selection:text-black">
      {/* Top Navigation Bar */}
      <header className="h-20 px-6 lg:px-16 flex items-center justify-between border-b border-[#142852]/60 bg-[#050814]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-heading text-2xl font-black tracking-wider text-white flex items-center gap-1.5">
            GOALOS
            <span className="w-2 h-2 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#94a3b8]">
          <Link href="/" className="text-[#00d2ff] font-bold">
            Home
          </Link>
          <Link href="#features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="hover:text-white transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3.5">
          <Link href="/sign-in">
            <SystemButton variant="secondary" size="sm">
              Sign In
            </SystemButton>
          </Link>
          <Link href="/onboarding">
            <SystemButton variant="primary" size="sm">
              Get Started
            </SystemButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-16 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & Value Proposition */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#132c66] border border-[#204899] text-[#00d2ff] text-xs font-hud font-bold tracking-widest uppercase">
              <Zap size={13} /> The Hunter System
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
              LEVEL UP <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00d2ff] to-[#3b6cf6] drop-shadow-[0_0_30px_rgba(0,210,255,0.3)]">
                YOUR LIFE
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#94a3b8] max-w-xl font-normal leading-relaxed">
              Turn your goals into quests. Build habits, gain XP and become a stronger you.
              Real-life productivity gamified with precision.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/onboarding">
              <SystemButton variant="primary" size="lg" className="px-8 shadow-[0_0_25px_rgba(59,108,246,0.5)]">
                Get Started
              </SystemButton>
            </Link>
            <Link href="/dashboard">
              <SystemButton variant="outline" size="lg" className="gap-2 px-6">
                <Play size={16} className="fill-[#00d2ff]" /> Watch Demo
              </SystemButton>
            </Link>
          </div>

          {/* Bottom Statistics Strip */}
          <div className="pt-8 border-t border-[#142852] grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <div className="font-heading text-2xl lg:text-3xl font-black text-white">10K+</div>
              <div className="text-xs font-hud text-[#94a3b8] tracking-wider uppercase mt-1">
                Active Hunters
              </div>
            </div>
            <div>
              <div className="font-heading text-2xl lg:text-3xl font-black text-[#00d2ff] flex items-center gap-1">
                4.9 <Star size={18} className="fill-[#00d2ff] text-[#00d2ff]" />
              </div>
              <div className="text-xs font-hud text-[#94a3b8] tracking-wider uppercase mt-1">
                User Rating
              </div>
            </div>
            <div>
              <div className="font-heading text-2xl lg:text-3xl font-black text-[#f5a623]">28 Days</div>
              <div className="text-xs font-hud text-[#94a3b8] tracking-wider uppercase mt-1">
                Average Streak
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Art Panel */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-[#204899] bg-gradient-to-b from-[#0a1a3a] via-[#071126] to-[#040814] h-[480px] lg:h-[560px] flex flex-col justify-end p-8 shadow-[0_0_40px_rgba(0,210,255,0.2)]">
            {/* Ambient Lighting & Neon Particles */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,210,255,0.25),_transparent_60%)]" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#3b6cf6]/20 blur-3xl pointer-events-none" />

            {/* Hunter Artwork Graphic Silhouette with lightning aura */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-56 h-72 rounded-full border border-[#00d2ff]/30 shadow-[0_0_50px_rgba(0,210,255,0.3)] bg-gradient-to-b from-[#0e2752] to-transparent flex flex-col items-center justify-center text-center p-4">
                <div className="w-20 h-20 rounded-full bg-[#00d2ff]/20 border border-[#00d2ff] flex items-center justify-center shadow-[0_0_20px_#00d2ff]">
                  <span className="font-heading text-3xl font-black text-white">G</span>
                </div>
                <div className="font-hud text-xs text-[#00d2ff] font-bold tracking-widest uppercase mt-4">
                  HUNTER AWAKENING
                </div>
              </div>
            </div>

            {/* Motivational Quote in Art Panel */}
            <div className="relative z-10 text-right">
              <h3 className="font-heading text-xl lg:text-2xl font-black tracking-wider text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                DISCIPLINE
              </h3>
              <h3 className="font-heading text-xl lg:text-2xl font-black tracking-wider text-[#00d2ff] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                CREATES FREEDOM
              </h3>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-16 border-t border-[#142852]/40 px-6 lg:px-16 flex items-center justify-between text-xs text-[#64748b]">
        <div>© 2026 GOALOS System. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-[#94a3b8]">Privacy</Link>
          <Link href="/terms" className="hover:text-[#94a3b8]">Terms</Link>
          <Link href="/kit-gallery" className="text-[#00d2ff] hover:underline">Component Gallery</Link>
        </div>
      </footer>
    </div>
  );
}
