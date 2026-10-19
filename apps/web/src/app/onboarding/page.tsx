"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HudPanel, SystemButton } from "@/components/ui";
import { HunterClass } from "@goalos/types";
import {
  Shield,
  Zap,
  Sword,
  Compass,
  Upload,
  Check,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(2);
  const [hunterName, setHunterName] = useState("Rupayan");
  const [selectedClass, setSelectedClass] = useState<HunterClass>("shadow");
  const [motto, setMotto] = useState("Discipline creates freedom.");

  const steps = [
    { num: 1, label: "Welcome" },
    { num: 2, label: "Your Profile" },
    { num: 3, label: "Goals & Interests" },
    { num: 4, label: "Schedule" },
    { num: 5, label: "Preferences" },
    { num: 6, label: "Complete" },
  ];

  const classes: { id: HunterClass; label: string; icon: React.ElementType }[] = [
    { id: "shadow", label: "Shadow", icon: Zap },
    { id: "mage", label: "Mage", icon: Compass },
    { id: "fighter", label: "Fighter", icon: Shield },
    { id: "rogue", label: "Rogue", icon: Sword },
  ];

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#050814] text-[#f8fafc] flex flex-col justify-between selection:bg-[#00d2ff] selection:text-black">
      {/* Top Bar Header */}
      <header className="h-16 px-6 lg:px-12 flex items-center justify-between border-b border-[#142852]/60">
        <Link href="/" className="font-heading text-2xl font-black tracking-wider text-white flex items-center gap-1.5">
          GOALOS
          <span className="w-2 h-2 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
        </Link>
        <div className="text-xs font-hud font-bold text-[#00d2ff] tracking-widest uppercase">
          HUNTER AWAKENING PROTOCOL
        </div>
      </header>

      {/* Main 3-Column Layout matching DM-03 */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: 6-Step Stepper */}
        <div className="lg:col-span-3 space-y-4">
          {steps.map((s) => {
            const isActive = s.num === step;
            const isCompleted = s.num < step;

            return (
              <div key={s.num} className="flex items-center gap-3.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-hud font-bold border transition-all ${
                    isActive
                      ? "bg-[#3b6cf6] border-[#00d2ff] text-white shadow-[0_0_12px_rgba(0,210,255,0.5)]"
                      : isCompleted
                      ? "bg-[#10b981] border-[#10b981] text-white"
                      : "bg-[#050814] border-[#142852] text-[#64748b]"
                  }`}
                >
                  {isCompleted ? <Check size={12} strokeWidth={3} /> : s.num}
                </div>
                <span
                  className={`text-xs font-semibold tracking-wide ${
                    isActive
                      ? "text-white font-bold"
                      : isCompleted
                      ? "text-[#94a3b8]"
                      : "text-[#475569]"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center: Profile Setup Form Card */}
        <div className="lg:col-span-6">
          <HudPanel className="p-8 space-y-6 shadow-[0_0_35px_rgba(0,0,0,0.6)]">
            <div className="space-y-1">
              <h2 className="font-heading text-xl lg:text-2xl font-black text-white">
                Create Your Hunter Profile
              </h2>
              <p className="text-xs text-[#94a3b8]">
                Let&apos;s set up your identity and preferences
              </p>
            </div>

            {/* Avatar Upload Preview */}
            <div className="flex flex-col items-center justify-center py-2 space-y-2">
              <div className="w-20 h-20 rounded-full border-2 border-[#00d2ff] bg-gradient-to-br from-[#132c66] to-[#0a152d] flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.4)]">
                <span className="font-heading text-2xl font-black text-white">{hunterName[0] || "H"}</span>
              </div>
              <button
                type="button"
                className="text-xs font-hud font-bold text-[#00d2ff] hover:underline flex items-center gap-1"
              >
                <Upload size={12} /> Upload Avatar
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-hud font-bold text-[#94a3b8] tracking-wider uppercase">
                  Hunter Name
                </label>
                <input
                  type="text"
                  value={hunterName}
                  onChange={(e) => setHunterName(e.target.value)}
                  placeholder="Enter your hunter handle"
                  className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl px-4 py-2.5 text-sm text-[#f8fafc] outline-none transition-colors"
                />
              </div>

              {/* Class Selection Grid */}
              <div className="space-y-1.5">
                <label className="text-xs font-hud font-bold text-[#94a3b8] tracking-wider uppercase">
                  Select Your Class
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {classes.map((c) => {
                    const isSelected = selectedClass === c.id;
                    const Icon = c.icon;

                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedClass(c.id)}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? "bg-[#132c66] border-[#00d2ff] text-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.3)] font-bold"
                            : "bg-[#050814] border-[#142852] text-[#94a3b8] hover:border-[#204899]"
                        }`}
                      >
                        <Icon size={20} />
                        <span className="text-[11px] font-hud uppercase tracking-wider">
                          {c.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Motto */}
              <div className="space-y-1.5">
                <label className="text-xs font-hud font-bold text-[#94a3b8] tracking-wider uppercase">
                  Your Motto (Optional)
                </label>
                <input
                  type="text"
                  value={motto}
                  onChange={(e) => setMotto(e.target.value)}
                  placeholder="e.g. Discipline creates freedom."
                  className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl px-4 py-2.5 text-sm text-[#f8fafc] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <SystemButton
                type="button"
                variant="secondary"
                size="md"
                onClick={handleBack}
                disabled={step === 1}
                className="flex-1"
              >
                Back
              </SystemButton>
              <SystemButton
                type="button"
                variant="primary"
                size="md"
                onClick={handleNext}
                className="flex-1 shadow-[0_0_20px_rgba(59,108,246,0.4)]"
              >
                {step === 6 ? "Enter System" : "Next"}
              </SystemButton>
            </div>
          </HudPanel>
        </div>

        {/* Right Column: Decorative Gateway Illustration */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="h-[480px] rounded-2xl overflow-hidden border border-[#142852] bg-gradient-to-b from-[#0e214d] via-[#08132b] to-[#030612] relative flex flex-col justify-end p-6 shadow-[0_0_25px_rgba(0,210,255,0.15)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,210,255,0.25),_transparent)]" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-[#00d2ff]/20 blur-2xl pointer-events-none" />

            {/* Gateway silhouette */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-56 border-t-2 border-x-2 border-[#00d2ff]/40 rounded-t-full flex items-center justify-center">
                <span className="font-heading text-xl text-white font-black opacity-40">門</span>
              </div>
            </div>

            <div className="relative z-10 text-center">
              <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider leading-relaxed">
                EVERY GREAT HUNTER ONCE TOOK THE FIRST STEP
              </h4>
            </div>
          </div>
        </div>
      </main>

      <footer className="h-12 border-t border-[#142852]/40 px-6 flex items-center justify-center text-xs text-[#64748b]">
        System Identity Provisioning • Encrypted Profile
      </footer>
    </div>
  );
}
