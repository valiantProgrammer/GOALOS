"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HudPanel, SystemButton } from "@/components/ui";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("rupayan@goalos.app");
  const [password, setPassword] = useState("hunter12345");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#050814] text-[#f8fafc] flex flex-col justify-between selection:bg-[#00d2ff] selection:text-black">
      {/* Top Bar Header */}
      <header className="h-16 px-6 lg:px-12 flex items-center justify-between border-b border-[#142852]/60">
        <Link href="/" className="font-heading text-2xl font-black tracking-wider text-white flex items-center gap-1.5">
          GOALOS
          <span className="w-2 h-2 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
        </Link>
        <Link href="/" className="text-xs font-hud font-bold text-[#94a3b8] hover:text-[#00d2ff]">
          RETURN TO HOME
        </Link>
      </header>

      {/* Main Grid: Left Art Column + Center/Right Auth Card */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Decorative Art Column (Matching DM-02 Mockup) */}
        <div className="hidden lg:flex lg:col-span-5 h-[560px] rounded-2xl overflow-hidden border border-[#142852] bg-gradient-to-b from-[#0a1835] via-[#060e20] to-[#02050e] relative flex-col justify-end p-8 shadow-[0_0_30px_rgba(0,210,255,0.15)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,210,255,0.2),_transparent_70%)]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#3b6cf6]/20 blur-3xl pointer-events-none" />

          {/* Hunter Standing Silhouette */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-64 rounded-t-full border border-[#00d2ff]/30 bg-gradient-to-b from-[#0e2752] to-transparent flex flex-col items-center justify-center p-4">
              <div className="w-16 h-16 rounded-full bg-[#00d2ff]/20 border border-[#00d2ff] flex items-center justify-center shadow-[0_0_15px_#00d2ff]">
                <span className="font-heading text-xl font-black text-white">⚡</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-left">
            <h3 className="font-heading text-lg font-black tracking-wider text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              A STRONGER YOU
            </h3>
            <h3 className="font-heading text-lg font-black tracking-wider text-[#00d2ff] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              BUILDS A BRIGHTER TOMORROW
            </h3>
          </div>
        </div>

        {/* Right / Center Auth Card */}
        <div className="lg:col-span-7 flex justify-center">
          <HudPanel className="w-full max-w-md p-8 sm:p-10 space-y-6 shadow-[0_0_35px_rgba(0,0,0,0.6)]">
            <div className="text-center space-y-1.5">
              <h2 className="font-heading text-2xl font-black text-white tracking-wide">
                {isSignUp ? "Join the Hunters" : "Welcome Back Hunter"}
              </h2>
              <p className="text-xs text-[#94a3b8]">
                {isSignUp ? "Begin your awakening journey" : "Continue your journey"}
              </p>
            </div>

            {/* Mode Switcher Pill */}
            <div className="p-1 rounded-xl bg-[#050814] border border-[#142852] flex items-center">
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  !isSignUp
                    ? "bg-[#3b6cf6] text-white shadow-[0_0_12px_rgba(59,108,246,0.4)]"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  isSignUp
                    ? "bg-[#3b6cf6] text-white shadow-[0_0_12px_rgba(59,108,246,0.4)]"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-hud font-bold text-[#94a3b8] tracking-wider uppercase">
                  Email or Username
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hunter@example.com"
                    className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f8fafc] placeholder-[#475569] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-hud font-bold text-[#94a3b8] tracking-wider uppercase">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#f8fafc] placeholder-[#475569] outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[#94a3b8]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#142852] bg-[#050814] accent-[#3b6cf6]"
                  />
                  Remember me
                </label>
                <Link href="/recover" className="text-[#00d2ff] hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>

              <SystemButton type="submit" variant="primary" size="md" className="w-full py-3 mt-2 shadow-[0_0_20px_rgba(59,108,246,0.4)]">
                {isSignUp ? "Create Account" : "Sign In"}
              </SystemButton>
            </form>

            {/* Social Logins Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#142852]" />
              </div>
              <span className="relative px-3 bg-[#0a1224] text-[11px] text-[#64748b] font-hud uppercase tracking-wider">
                or continue with
              </span>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {/* Google Button */}
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="py-2.5 rounded-xl bg-[#050814] hover:bg-[#0d1933] border border-[#142852] flex items-center justify-center transition-colors text-white text-xs font-bold gap-2"
              >
                <span className="text-red-400 font-black">G</span> Google
              </button>

              {/* Apple Button (Rendered per mockup but disabled per DISTRIBUTION.md requirement) */}
              <button
                type="button"
                disabled
                title="Needs Apple Developer account ($99/year). Use Google or Email sign-in."
                className="py-2.5 rounded-xl bg-[#050814]/50 border border-[#142852]/60 flex items-center justify-center transition-colors text-[#64748b] text-xs font-bold gap-2 cursor-not-allowed opacity-60"
              >
                <span></span> Apple
              </button>

              {/* Discord Button */}
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="py-2.5 rounded-xl bg-[#050814] hover:bg-[#0d1933] border border-[#142852] flex items-center justify-center transition-colors text-[#a78bfa] text-xs font-bold gap-2"
              >
                <span>👾</span> Discord
              </button>
            </div>

            {/* Bottom switcher link */}
            <div className="text-center text-xs text-[#94a3b8] pt-2">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-[#00d2ff] font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-[#00d2ff] font-bold hover:underline"
                  >
                    Create Account
                  </button>
                </>
              )}
            </div>
          </HudPanel>
        </div>
      </main>

      <footer className="h-12 border-t border-[#142852]/40 px-6 flex items-center justify-center text-xs text-[#64748b]">
        Secure Authentication • System Guard Active
      </footer>
    </div>
  );
}
