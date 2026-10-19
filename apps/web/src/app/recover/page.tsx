"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HudPanel, SystemButton } from "@/components/ui";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function AccountRecoveryPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050814] text-[#f8fafc] flex flex-col justify-between">
      <header className="h-16 px-6 lg:px-12 flex items-center justify-between border-b border-[#142852]/60">
        <Link href="/" className="font-heading text-2xl font-black tracking-wider text-white flex items-center gap-1.5">
          GOALOS
          <span className="w-2 h-2 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
        </Link>
        <Link href="/sign-in" className="inline-flex items-center gap-1.5 text-xs font-hud font-bold text-[#00d2ff] hover:underline">
          <ArrowLeft size={14} /> BACK TO SIGN IN
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <HudPanel className="w-full max-w-md p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-1.5">
            <h2 className="font-heading text-2xl font-black text-white">Reset Password</h2>
            <p className="text-xs text-[#94a3b8]">
              Enter your registered hunter email to receive a recovery token.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 rounded-xl bg-[#10b981]/15 border border-[#10b981]/40 text-center space-y-2">
              <CheckCircle size={32} className="text-[#10b981] mx-auto" />
              <h3 className="text-sm font-bold text-white">Recovery Link Sent</h3>
              <p className="text-xs text-[#94a3b8]">
                Check <span className="text-white font-semibold">{email}</span> for instructions to reset your password.
              </p>
              <Link href="/sign-in" className="inline-block mt-3 text-xs font-hud font-bold text-[#00d2ff] hover:underline">
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-hud font-bold text-[#94a3b8] tracking-wider uppercase">
                  Hunter Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hunter@example.com"
                    className="w-full bg-[#050814] border border-[#142852] focus:border-[#00d2ff] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f8fafc] placeholder-[#475569] outline-none transition-colors"
                  />
                </div>
              </div>

              <SystemButton type="submit" variant="primary" size="md" className="w-full py-3 shadow-[0_0_20px_rgba(59,108,246,0.4)]">
                Send Recovery Token
              </SystemButton>
            </form>
          )}
        </HudPanel>
      </main>

      <footer className="h-12 border-t border-[#142852]/40 px-6 flex items-center justify-center text-xs text-[#64748b]">
        GoalOS Security Protocol • Automated Verification
      </footer>
    </div>
  );
}
