import React from "react";
import clsx from "clsx";
import { Check, Sparkles } from "lucide-react";
import { TaskDifficulty, TaskStatus } from "@goalos/types";
import { DifficultyChip, StatusChip } from "./Chip";

export interface QuestCardProps {
  id: string;
  title: string;
  category: string;
  difficulty: TaskDifficulty;
  xpReward: number;
  status: TaskStatus;
  completed?: boolean;
  onToggleComplete?: () => void;
  className?: string;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  title,
  category,
  difficulty,
  xpReward,
  status,
  completed = false,
  onToggleComplete,
  className,
}) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200",
        completed
          ? "bg-[rgba(5,10,24,0.5)] border-[rgba(59,130,246,0.12)] opacity-75"
          : "bg-[rgba(5,10,24,0.65)] hover:bg-[rgba(10,20,45,0.75)] border-[rgba(59,130,246,0.18)] hover:border-[rgba(59,130,246,0.35)] shadow-md",
        className
      )}
    >
      <div className="flex items-center gap-3.5">
        <button
          onClick={onToggleComplete}
          className={clsx(
            "w-6 h-6 rounded-md border flex items-center justify-center transition-all cursor-pointer",
            completed
              ? "bg-[#10b981] border-[#10b981] text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              : "bg-[#050814] border-[#1a3366] hover:border-[#00d2ff] text-transparent"
          )}
        >
          <Check size={14} strokeWidth={3} />
        </button>
        <div>
          <h4
            className={clsx(
              "text-sm font-semibold tracking-wide",
              completed ? "line-through text-[#64748b]" : "text-[#f8fafc]"
            )}
          >
            {title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs uppercase font-hud text-[#94a3b8] tracking-wider">
              {category}
            </span>
            <span className="text-[#334155]">•</span>
            <span className="text-xs font-hud font-bold text-[#00d2ff] flex items-center gap-0.5">
              <Sparkles size={11} /> +{xpReward} XP
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <DifficultyChip difficulty={difficulty} />
        <StatusChip status={status} />
      </div>
    </div>
  );
};
