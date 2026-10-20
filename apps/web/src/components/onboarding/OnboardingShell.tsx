"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { VerticalStepper } from "./VerticalStepper";
import { StepArt } from "./StepArt";
import { AppBackground } from "@/components/ui/AppBackground";

interface OnboardingShellProps {
  currentStep: number;
  artSrc?: string;
  artAlt?: string;
  onNext: () => void;
  onBack: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  isSubmitting?: boolean;
  children: React.ReactNode;
}

export function OnboardingShell({
  currentStep,
  artSrc,
  artAlt,
  onNext,
  onBack,
  nextDisabled = false,
  nextLabel = "Next",
  isSubmitting = false,
  children,
}: OnboardingShellProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-[#050b1a] flex items-center justify-center p-3 sm:p-5 relative overflow-hidden font-sans">
      <AppBackground variant="hero" />
      {/* Background ambient radial glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#1d4ed8]/10 blur-[130px] pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#3b82f6]/10 blur-[120px] pointer-events-none -bottom-20 -right-20" />

      {/* Main Glass HUD Container Card */}
      <div className="w-full max-w-[940px] min-h-[580px] bg-[rgba(8,16,38,0.85)] backdrop-blur-xl border border-[rgba(59,130,246,0.55)] rounded-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] z-10">
        
        {/* Right background artwork layer */}
        {artSrc && <StepArt src={artSrc} alt={artAlt} />}

        {/* Top-Left GOALOS Logo */}
        <div className="flex items-center gap-2 mb-6 z-20">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-bold tracking-[0.22em] text-[#3b82f6] text-[15px] drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">
              GOALOS
            </span>
          </Link>
        </div>

        {/* Content Body Layout: Left Stepper + Center Step Area */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 lg:gap-8 z-10">
          {/* Left Column: Vertical Stepper */}
          <div className="hidden md:block shrink-0 pt-2">
            <VerticalStepper currentStep={currentStep} />
          </div>

          {/* Mobile Step Bar (< md) */}
          <div className="md:hidden flex items-center justify-between pb-4 border-b border-[#203666]/40">
            <div className="text-xs font-semibold text-[#38bdf8]">
              Step {currentStep} of 6
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  className={`w-6 h-1.5 rounded-full ${
                    num === currentStep
                      ? "bg-[#3b82f6] shadow-[0_0_8px_#3b82f6]"
                      : num < currentStep
                      ? "bg-[#1e3a8a]"
                      : "bg-[#182645]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Center Column: Animated Step Content */}
          <div className="flex-1 flex flex-col justify-between pr-0 md:pr-16 lg:pr-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex-1"
              >
                <div className="w-full h-full">{children}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="mt-8 pt-4 border-t border-[#1a2d54]/30 flex items-center justify-between z-20">
          {currentStep === 6 ? (
            /* Step 6 single full-width button */
            <button
              type="button"
              onClick={onNext}
              disabled={isSubmitting}
              className="w-full h-11 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-bold text-[13px] tracking-wide shadow-[0_0_24px_rgba(59,130,246,0.6)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Enter GOALOS &rarr;</span>
              )}
            </button>
          ) : (
            <>
              {/* Back Button */}
              <button
                type="button"
                onClick={onBack}
                className="px-5 h-9 rounded-lg bg-[#0a1224]/80 border border-white/15 text-[#cbd5e1] hover:text-white hover:bg-white/10 text-xs font-semibold tracking-wide transition-all cursor-pointer"
              >
                Back
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={onNext}
                disabled={nextDisabled || isSubmitting}
                className={`px-7 h-9 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-bold text-xs tracking-wide shadow-[0_0_18px_rgba(59,130,246,0.5)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                  nextDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  nextLabel
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
