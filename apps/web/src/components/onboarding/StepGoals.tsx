import React from "react";
import {
  GraduationCap,
  Activity,
  TrendingUp,
  Palette,
  Briefcase,
  Coins,
  BookOpen,
  Gamepad2,
  Brain,
} from "lucide-react";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { ChipSelect } from "@/components/ui/ChipSelect";

export function StepGoals() {
  const { goals, interests, updateData } = useOnboardingStore();

  const goalOptions = [
    { id: "study", label: "Study / Academics", icon: <GraduationCap className="w-5 h-5" /> },
    { id: "fitness", label: "Fitness / Health", icon: <Activity className="w-5 h-5" /> },
    { id: "productivity", label: "Productivity", icon: <TrendingUp className="w-5 h-5" /> },
    { id: "creativity", label: "Creativity", icon: <Palette className="w-5 h-5" /> },
    { id: "career", label: "Career / Skills", icon: <Briefcase className="w-5 h-5" /> },
    { id: "finance", label: "Finance", icon: <Coins className="w-5 h-5" /> },
    { id: "reading", label: "Reading", icon: <BookOpen className="w-5 h-5" /> },
    { id: "gaming", label: "Gaming", icon: <Gamepad2 className="w-5 h-5" /> },
    { id: "mindset", label: "Mindset", icon: <Brain className="w-5 h-5" /> },
  ];

  const defaultInterestPool = [
    "Technology",
    "Anime",
    "Music",
    "Design",
    "Coding",
    "Writing",
    "Travel",
    "Sports",
  ];

  const toggleGoal = (id: string) => {
    if (goals.includes(id)) {
      if (goals.length > 1) {
        updateData({ goals: goals.filter((g) => g !== id) });
      }
    } else {
      updateData({ goals: [...goals, id] });
    }
  };

  return (
    <div className="flex flex-col h-full max-w-[520px]">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-[26px] font-bold text-white tracking-wide">
          What Are Your Goals?
        </h1>
        <p className="text-[13px] text-[#8fa3c7] mt-0.5">
          Choose the areas you want to improve.
        </p>
      </div>

      {/* 3x3 Grid of Selectable Goals */}
      <div className="grid grid-cols-3 gap-2.5 mt-5">
        {goalOptions.map((item) => {
          const isSelected = goals.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleGoal(item.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-[9px] transition-all duration-200 outline-none cursor-pointer ${
                isSelected
                  ? "bg-[#0e1c38] border border-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.35)] text-white"
                  : "bg-[#0a1224] border border-[#203666]/40 text-[#869ab8] hover:border-[#3b82f6]/50 hover:text-white"
              }`}
            >
              <div
                className={`mb-1.5 transition-colors ${
                  isSelected ? "text-[#38bdf8]" : "text-[#64748b]"
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[11px] font-medium text-center leading-tight ${
                  isSelected ? "text-white" : "text-[#94a3b8]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Select Your Interests (Optional) */}
      <div className="mt-5">
        <label className="text-[12px] font-medium text-[#9fb0d0] block mb-2">
          Select Your Interests (Optional)
        </label>
        <ChipSelect
          options={Array.from(new Set([...defaultInterestPool, ...interests]))}
          selected={interests}
          onChange={(newInterests) => updateData({ interests: newInterests })}
          onAddOption={(newOpt) =>
            updateData({ interests: [...interests, newOpt] })
          }
        />
      </div>
    </div>
  );
}
