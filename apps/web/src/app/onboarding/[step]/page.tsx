"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { StepWelcome } from "@/components/onboarding/StepWelcome";
import { StepProfile } from "@/components/onboarding/StepProfile";
import { StepGoals } from "@/components/onboarding/StepGoals";
import { StepSchedule } from "@/components/onboarding/StepSchedule";
import { StepPreferences } from "@/components/onboarding/StepPreferences";
import { StepComplete } from "@/components/onboarding/StepComplete";

const STEP_SLUGS = [
  "welcome",
  "profile",
  "goals",
  "schedule",
  "preferences",
  "complete",
] as const;

type StepSlug = (typeof STEP_SLUGS)[number];

const STEP_ART: Record<number, string> = {
  1: "/onboarding/art-welcome.png",
  2: "/onboarding/art-profile.png",
  3: "/onboarding/art-goals.png",
  4: "/onboarding/art-schedule.png",
  5: "/onboarding/art-preferences.png",
  6: "/onboarding/art-complete.png",
};

export default function OnboardingStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const rawStep = resolvedParams.step as StepSlug;

  const { step, setStep, goals } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stepNumber = STEP_SLUGS.indexOf(rawStep) + 1;
  const currentStep = stepNumber >= 1 && stepNumber <= 6 ? stepNumber : 1;

  useEffect(() => {
    setStep(currentStep);
  }, [currentStep, setStep]);

  const handleNext = async () => {
    if (currentStep < 6) {
      const nextSlug = STEP_SLUGS[currentStep];
      setStep(currentStep + 1);
      router.push(`/onboarding/${nextSlug}`);
    } else {
      // Step 6: Complete
      setIsSubmitting(true);
      try {
        const storeData = useOnboardingStore.getState();
        await fetch("/api/onboarding", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(storeData),
        });
        await fetch("/api/onboarding/complete", {
          method: "POST",
        });
      } catch (err) {
        console.error("Onboarding submission error:", err);
      } finally {
        setIsSubmitting(false);
        router.push("/dashboard");
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/sign-up");
    } else {
      const prevSlug = STEP_SLUGS[currentStep - 2];
      setStep(currentStep - 1);
      router.push(`/onboarding/${prevSlug}`);
    }
  };

  const isNextDisabled = currentStep === 3 && goals.length === 0;

  return (
    <OnboardingShell
      currentStep={currentStep}
      artSrc={STEP_ART[currentStep]}
      artAlt={`Step ${currentStep} Artwork`}
      onNext={handleNext}
      onBack={handleBack}
      nextDisabled={isNextDisabled}
      isSubmitting={isSubmitting}
    >
      {currentStep === 1 && <StepWelcome />}
      {currentStep === 2 && <StepProfile />}
      {currentStep === 3 && <StepGoals />}
      {currentStep === 4 && <StepSchedule />}
      {currentStep === 5 && <StepPreferences />}
      {currentStep === 6 && <StepComplete />}
    </OnboardingShell>
  );
}
