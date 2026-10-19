import React from "react";
import clsx from "clsx";
import { TaskDifficulty, TaskStatus } from "@goalos/types";

export interface DifficultyChipProps {
  difficulty: TaskDifficulty;
  className?: string;
}

export const DifficultyChip: React.FC<DifficultyChipProps> = ({ difficulty, className }) => {
  const styles = {
    easy: "bg-[#10b981]/15 text-[#34d399] border-[#10b981]/40",
    medium: "bg-[#f5a623]/15 text-[#fbbf24] border-[#f5a623]/40",
    hard: "bg-[#ef4444]/15 text-[#f87171] border-[#ef4444]/40",
    hardcore: "bg-[#8a4fff]/20 text-[#c084fc] border-[#8a4fff]/50",
  };

  const labels = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    hardcore: "Hardcore",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        styles[difficulty],
        className
      )}
    >
      {labels[difficulty]}
    </span>
  );
};

export interface StatusChipProps {
  status: TaskStatus;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, className }) => {
  const styles = {
    completed: "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/40",
    in_progress: "bg-[#3b6cf6]/15 text-[#60a5fa] border-[#3b6cf6]/40",
    start: "bg-[#8a4fff]/15 text-[#a78bfa] border-[#8a4fff]/40",
    locked: "bg-[#475569]/20 text-[#94a3b8] border-[#475569]/30",
  };

  const labels = {
    completed: "Completed",
    in_progress: "In Progress",
    start: "Start",
    locked: "Locked",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border transition-colors",
        styles[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
};
