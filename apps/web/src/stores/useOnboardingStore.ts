import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type HunterClass = "shadow" | "mage" | "fighter" | "rogue";
export type StudyStyle = "focused" | "flexible" | "both";
export type ThemeMode = "dark" | "light" | "system";
export type MotivationStyle = "quotes" | "anime" | "stats" | "rewards";

export interface OnboardingData {
  step: number; // 1 to 6
  // Step 2
  hunterName: string;
  displayName: string;
  bio: string;
  hunterClass: HunterClass;
  avatarUrl: string;
  // Step 3
  goals: string[];
  interests: string[];
  // Step 4
  timezone: string;
  wakeTime: string;
  sleepTime: string;
  workHoursFrom: string;
  workHoursTo: string;
  studyStyle: StudyStyle;
  // Step 5
  theme: ThemeMode;
  motivationStyle: MotivationStyle;
  notificationsEnabled: boolean;
  dailyQuoteEnabled: boolean;
  communityEnabled: boolean;
}

interface OnboardingStore extends OnboardingData {
  setStep: (step: number) => void;
  updateData: (data: Partial<OnboardingData>) => void;
  reset: () => void;
}

const DEFAULT_STATE: OnboardingData = {
  step: 1,
  // Step 2 defaults
  hunterName: "Rupayan",
  displayName: "Rupayan Dey",
  bio: "Discipline creates freedom.",
  hunterClass: "shadow",
  avatarUrl: "/onboarding/avatar-default.png",
  // Step 3 defaults
  goals: ["study"],
  interests: ["Technology", "Anime", "Music", "Design", "Coding"],
  // Step 4 defaults
  timezone: "(GMT+5:30) India Standard Time",
  wakeTime: "6:00 AM",
  sleepTime: "11:00 PM",
  workHoursFrom: "9:00 AM",
  workHoursTo: "5:00 PM",
  studyStyle: "focused",
  // Step 5 defaults
  theme: "dark",
  motivationStyle: "quotes",
  notificationsEnabled: true,
  dailyQuoteEnabled: true,
  communityEnabled: true,
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,
      setStep: (step) => set({ step: Math.min(Math.max(step, 1), 6) }),
      updateData: (data) => set((state) => ({ ...state, ...data })),
      reset: () => set(DEFAULT_STATE),
    }),
    {
      name: "goalos-onboarding-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
