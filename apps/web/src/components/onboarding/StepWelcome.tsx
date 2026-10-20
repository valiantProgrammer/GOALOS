import React from "react";
import { Sparkles, Trophy, Target, Zap } from "lucide-react";

export function StepWelcome() {
  const features = [
    {
      title: "Build Better Habits",
      desc: "Turn small actions into big results.",
      icon: <Zap className="w-4 h-4 text-[#38bdf8]" />,
      circleBg: "bg-[#0b2447] border-[#38bdf8]/40 shadow-[0_0_12px_rgba(56,189,248,0.3)]",
    },
    {
      title: "Track Your Progress",
      desc: "Visualize your growth like a hunter.",
      icon: <Target className="w-4 h-4 text-[#a78bfa]" />,
      circleBg: "bg-[#1d163d] border-[#8b5cf6]/40 shadow-[0_0_12px_rgba(139,92,246,0.3)]",
    },
    {
      title: "Stay Motivated",
      desc: "Quests, rewards and communities.",
      icon: <Trophy className="w-4 h-4 text-[#f472b6]" />,
      circleBg: "bg-[#2d1233] border-[#d946ef]/40 shadow-[0_0_12px_rgba(217,70,239,0.3)]",
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full max-w-[480px]">
      {/* Title & Subtitle */}
      <h1 className="text-2xl sm:text-[28px] font-bold text-white tracking-wide font-sans">
        Welcome to GOALOS
      </h1>
      <p className="text-[13px] sm:text-[14px] font-medium text-[#38bdf8] mt-1 drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]">
        Turn your goals into a higher self.
      </p>
      <p className="text-[12px] sm:text-[13px] text-[#8fa3c7] mt-2 leading-relaxed">
        A productivity system for students, creators and dreamers who want to level up in real life.
      </p>

      {/* 3 Stacked Feature Cards */}
      <div className="flex flex-col gap-3 mt-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#0a1224]/85 border border-[#22396a]/40 hover:border-[#3b82f6]/40 transition-all shadow-sm"
          >
            {/* Glowing Icon Circle */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center border shrink-0 ${item.circleBg}`}
            >
              {item.icon}
            </div>
            <div>
              <div className="text-[13px] font-semibold text-white tracking-wide">
                {item.title}
              </div>
              <div className="text-[11px] text-[#869ab8] mt-0.5">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
