"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { AuthPoster } from "@/components/auth/AuthPoster";
import { AppBackground } from "@/components/ui/AppBackground";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export default function SignInPage() {
  const router = useRouter();
  const step = useOnboardingStore((s) => s.step);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate auth check or call api
      // If user has not completed onboarding, resume to /onboarding/welcome or last step
      // Else navigate to /dashboard
      router.push("/onboarding");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050b1a] flex items-center justify-center p-3 sm:p-5 relative overflow-hidden font-sans">
      <AppBackground variant="hero" />
      {/* Background ambient radial glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#1d4ed8]/10 blur-[130px] pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#3b82f6]/10 blur-[120px] pointer-events-none -bottom-20 -right-20" />

      {/* Main Glass HUD Container Card */}
      <div className="w-full max-w-[920px] bg-[rgba(8,16,38,0.85)] backdrop-blur-xl border border-[rgba(59,130,246,0.55)] rounded-2xl p-6 sm:p-8 flex gap-6 sm:gap-8 relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] z-10">
        
        {/* Left Column: Form */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Top-Left GOALOS Logo */}
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="font-bold tracking-[0.22em] text-[#3b82f6] text-[15px] drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">
                  GOALOS
                </span>
              </Link>
            </div>

            {/* Header Titles */}
            <h1 className="text-2xl sm:text-[26px] font-bold text-white tracking-wide">
              Welcome Back, Hunter
            </h1>
            <p className="text-[13px] text-[#8fa3c7] mt-0.5">
              Sign in to resume your training and awaken your potential.
            </p>

            {error && (
              <div className="mt-3 p-2.5 rounded-lg bg-[#ef4444]/15 border border-[#ef4444]/40 text-[#f87171] text-xs">
                {error}
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3.5">
              {/* Email / Username */}
              <div>
                <label className="text-[12px] font-medium text-[#9fb0d0]">
                  Email or Username
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="hunter@goalos.app"
                  className="w-full h-9 px-3 mt-1 rounded-[8px] bg-[#0a1224] border border-[#233b6e]/50 text-white text-[13px] outline-none focus:border-[#3b82f6] transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-medium text-[#9fb0d0]">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-[11px] text-[#38bdf8] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-9 pl-3 pr-9 rounded-[8px] bg-[#0a1224] border border-[#233b6e]/50 text-white text-[13px] outline-none focus:border-[#3b82f6] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-[#64748b] hover:text-[#38bdf8] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 mt-2 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(59,130,246,0.55)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-[#1e293b]" />
              <span className="text-[11px] text-[#64748b]">or</span>
              <div className="flex-1 h-px bg-[#1e293b]" />
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => router.push("/onboarding")}
                className="h-9 rounded-lg bg-[#0a1224] border border-[#233b6e]/50 text-white text-[11px] font-medium hover:border-[#3b82f6]/50 hover:bg-[#0c162e] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/onboarding")}
                className="h-9 rounded-lg bg-[#0a1224] border border-[#233b6e]/50 text-white text-[11px] font-medium hover:border-[#3b82f6]/50 hover:bg-[#0c162e] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-5 pt-3 border-t border-[#1a2d54]/30 text-center text-[12px] text-[#9fb0d0]">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-[#38bdf8] font-semibold hover:underline drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Right Column: Poster */}
        <AuthPoster />
      </div>
    </div>
  );
}
