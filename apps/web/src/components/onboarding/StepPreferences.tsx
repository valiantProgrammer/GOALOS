import React from "react";
import {
  Moon,
  Sun,
  Monitor,
  Quote,
  Play,
  BarChart2,
  Trophy,
  Bell,
  MessageSquare,
  Users,
} from "lucide-react";
import {
  useOnboardingStore,
  ThemeMode,
  MotivationStyle,
} from "@/stores/useOnboardingStore";
import { ToggleRow } from "@/components/ui/ToggleRow";

export function StepPreferences() {
  const {
    theme,
    motivationStyle,
    notificationsEnabled,
    dailyQuoteEnabled,
    communityEnabled,
    updateData,
  } = useOnboardingStore();

  const themeModes: {
    id: ThemeMode;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: "dark", label: "Dark", icon: <Moon className="w-4 h-4" /> },
    { id: "light", label: "Light", icon: <Sun className="w-4 h-4" /> },
    { id: "system", label: "System", icon: <Monitor className="w-4 h-4" /> },
  ];

  const motivationStyles: {
    id: MotivationStyle;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: "quotes", label: "Quotes", icon: <Quote className="w-4 h-4" /> },
    { id: "anime", label: "Anime", icon: <Play className="w-4 h-4" /> },
    { id: "stats", label: "Stats", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "rewards", label: "Rewards", icon: <Trophy className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col h-full max-w-[500px]">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-[26px] font-bold text-white tracking-wide">
          Customize Your Experience
        </h1>
        <p className="text-[13px] text-[#8fa3c7] mt-0.5">
          Set your preferences to make GOALOS yours.
        </p>
      </div>

      <div className="flex flex-col gap-3.5 mt-4">
        {/* Theme Mode */}
        <div>
          <label className="text-[12px] font-medium text-[#9fb0d0] block mb-1.5">
            Theme Mode
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {themeModes.map((item) => {
              const isSelected = theme === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    updateData({ theme: item.id });
                    if (typeof document !== "undefined") {
                      if (item.id === "light") {
                        document.documentElement.classList.add("light");
                        document.documentElement.classList.remove("dark");
                      } else {
                        document.documentElement.classList.add("dark");
                        document.documentElement.classList.remove("light");
                      }
                    }
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-[9px] transition-all duration-200 outline-none cursor-pointer ${
                    isSelected
                      ? "bg-[#0e1c38] border border-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.35)] text-white"
                      : "bg-[#0a1224] border border-[#203666]/40 text-[#869ab8] hover:border-[#3b82f6]/50 hover:text-white"
                  }`}
                >
                  <div
                    className={`mb-1 transition-colors ${
                      isSelected ? "text-[#38bdf8]" : "text-[#64748b]"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-[11px] font-medium ${
                      isSelected ? "text-white" : "text-[#94a3b8]"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Motivation Style */}
        <div>
          <label className="text-[12px] font-medium text-[#9fb0d0] block mb-1.5">
            Motivation Style
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {motivationStyles.map((item) => {
              const isSelected = motivationStyle === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateData({ motivationStyle: item.id })}
                  className={`flex flex-col items-center justify-center p-2 rounded-[9px] transition-all duration-200 outline-none cursor-pointer ${
                    isSelected
                      ? "bg-[#0e1c38] border border-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.35)] text-white"
                      : "bg-[#0a1224] border border-[#203666]/40 text-[#869ab8] hover:border-[#3b82f6]/50 hover:text-white"
                  }`}
                >
                  <div
                    className={`mb-1 transition-colors ${
                      isSelected ? "text-[#38bdf8]" : "text-[#64748b]"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-[11px] font-medium ${
                      isSelected ? "text-white" : "text-[#94a3b8]"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Toggle Rows */}
        <div className="flex flex-col gap-2">
          <ToggleRow
            icon={<Bell className="w-4 h-4 text-[#38bdf8]" />}
            title="Enable Notifications"
            description="Get reminders for tasks and habits"
            checked={notificationsEnabled}
            onChange={(val) => updateData({ notificationsEnabled: val })}
          />
          <ToggleRow
            icon={<MessageSquare className="w-4 h-4 text-[#38bdf8]" />}
            title="Daily Motivation Message"
            description="Receive a motivational quote daily"
            checked={dailyQuoteEnabled}
            onChange={(val) => updateData({ dailyQuoteEnabled: val })}
          />
          <ToggleRow
            icon={<Users className="w-4 h-4 text-[#38bdf8]" />}
            title="Community Features"
            description="Join chats, parties and leaderboards"
            checked={communityEnabled}
            onChange={(val) => updateData({ communityEnabled: val })}
          />
        </div>
      </div>
    </div>
  );
}
