"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

const STEP_SLUGS = [
  "welcome",
  "profile",
  "goals",
  "schedule",
  "preferences",
  "complete",
] as const;

export default function OnboardingIndexPage() {
  const router = useRouter();
  const step = useOnboardingStore((s) => s.step);

  useEffect(() => {
    const slug = STEP_SLUGS[Math.max(0, Math.min(step - 1, 5))];
    router.replace(`/onboarding/${slug}`);
  }, [router, step]);

  return (
    <div className="min-h-screen w-full bg-[#050b1a] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
