"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Search, Bell, Shield } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div
      className="relative min-h-screen w-full bg-[#050814] text-[#f8fafc] flex flex-col justify-between overflow-x-hidden selection:bg-[#00d2ff] selection:text-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/signinpage.png')" }}
    >
      {/* Subtle atmospheric vignette overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050814]/70 via-transparent to-[#050814]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/50 via-transparent to-[#050814]/70 pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-20 h-20 px-6 sm:px-12 lg:px-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-heading text-2xl sm:text-3xl font-black tracking-widest text-[#00d2ff] drop-shadow-[0_0_15px_rgba(0,210,255,0.7)]"
        >
          GOALOS
        </Link>

        {/* Top Right HUD Controls matching mockup */}
        <div className="flex items-center gap-2.5 sm:gap-3 bg-[#070e20]/80 border border-[#142852] backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <button
            type="button"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[#94a3b8] hover:text-[#00d2ff] transition-colors"
          >
            <Search size={15} />
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[#94a3b8] hover:text-[#00d2ff] transition-colors relative"
          >
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
          </button>
          <div className="h-5 w-px bg-[#142852]" />
          <div className="flex items-center gap-2 pl-1 pr-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#00d2ff] flex items-center justify-center text-white text-xs font-black shadow-[0_0_10px_rgba(0,210,255,0.4)]">
              <Shield size={14} className="fill-white" />
            </div>
            <div className="hidden sm:block text-left text-[11px] leading-tight">
              <div className="font-bold text-white">Hunter</div>
              <div className="text-[#00d2ff] font-hud font-extrabold text-[10px]">Lv. 32</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-16 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Motivational Hunter Slogan */}
        <div className="lg:col-span-6 flex flex-col justify-end lg:h-[540px] pb-6 sm:pb-12">
          <div className="space-y-1 select-none">
            <div className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl tracking-[0.2em] text-[#60a5fa] drop-shadow-[0_0_20px_rgba(96,165,250,0.7)] leading-tight">
              A STRONGER
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl tracking-[0.2em] text-[#60a5fa] drop-shadow-[0_0_20px_rgba(96,165,250,0.7)] leading-tight">
              YOU BUILDS
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl tracking-[0.2em] text-[#60a5fa] drop-shadow-[0_0_20px_rgba(96,165,250,0.7)] leading-tight">
              A BRIGHTER
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl tracking-[0.2em] text-[#60a5fa] drop-shadow-[0_0_20px_rgba(96,165,250,0.7)] leading-tight">
              TOMORROW
            </div>
          </div>
        </div>

        {/* Right Column: Floating Auth Card */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-[#070e20]/90 border border-[#1e3a8a]/80 backdrop-blur-xl rounded-3xl p-7 sm:p-9 space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.85)]">
            {/* Header Titles */}
            <div className="text-center space-y-1.5">
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-wide leading-tight">
                {isSignUp ? (
                  <>
                    Join The<br />Hunters
                  </>
                ) : (
                  <>
                    Welcome Back<br />Hunter
                  </>
                )}
              </h1>
              <p className="text-xs sm:text-sm text-[#94a3b8] font-medium">
                {isSignUp ? "Begin your awakening journey" : "Continue your journey"}
              </p>
            </div>

            {/* Segmented Sign In / Sign Up Switcher */}
            <div className="p-1 rounded-2xl bg-[#040814] border border-[#142852] flex items-center">
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  !isSignUp
                    ? "bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  isSignUp
                    ? "bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email / Username Input */}
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email or Username"
                  className="w-full bg-[#050a18] border border-[#142852] focus:border-[#00d2ff] rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-[#f8fafc] placeholder-[#64748b] outline-none transition-all shadow-inner"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-[#050a18] border border-[#142852] focus:border-[#00d2ff] rounded-2xl pl-11 pr-11 py-3.5 text-xs sm:text-sm text-[#f8fafc] placeholder-[#64748b] outline-none transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[#94a3b8] hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#1e3a8a] bg-[#050a18] accent-[#3b82f6]"
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  href="/recover"
                  className="text-[#38bdf8] hover:underline font-semibold text-xs"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-bold text-sm shadow-[0_0_25px_rgba(59,130,246,0.7)] hover:shadow-[0_0_35px_rgba(59,130,246,0.95)] hover:scale-[1.01] active:scale-[0.99] transition-all tracking-wide"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            {/* Social Logins Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#142852]/70" />
              </div>
              <span className="relative px-3 bg-[#070e20] text-[11px] text-[#64748b] font-medium uppercase tracking-wider">
                or continue with
              </span>
            </div>

            {/* Social Buttons (Google, Apple, Discord) */}
            <div className="flex items-center justify-center gap-3.5">
              {/* Google */}
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="w-16 sm:w-20 h-12 rounded-2xl bg-[#050a18] hover:bg-[#0c1833] border border-[#142852] hover:border-[#3b82f6] flex items-center justify-center transition-all shadow-[0_0_12px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95"
                title="Sign in with Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="w-16 sm:w-20 h-12 rounded-2xl bg-[#050a18] hover:bg-[#0c1833] border border-[#142852] hover:border-[#3b82f6] flex items-center justify-center transition-all shadow-[0_0_12px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95"
                title="Sign in with Apple"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.64 1.35-.56.65-1.06 1.72-.93 2.74 1.01.08 2.03-.5 2.65-1.24z"/>
                </svg>
              </button>

              {/* Discord */}
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="w-16 sm:w-20 h-12 rounded-2xl bg-[#050a18] hover:bg-[#0c1833] border border-[#142852] hover:border-[#3b82f6] flex items-center justify-center transition-all shadow-[0_0_12px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95"
                title="Sign in with Discord"
              >
                <svg className="w-5 h-5 fill-[#5865F2]" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </button>
            </div>

            {/* Bottom Account Switcher */}
            <div className="text-center text-xs text-[#94a3b8] pt-1">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-[#38bdf8] font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/onboarding"
                    className="text-[#38bdf8] font-bold hover:underline"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Empty footer spacer to balance layout */}
      <div className="h-6" />
    </div>
  );
}
