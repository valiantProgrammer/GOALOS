import React from "react";
import clsx from "clsx";

export interface XpBarProps {
  currentXp: number;
  nextLevelXp: number;
  level?: number;
  showLabel?: boolean;
  className?: string;
}

export const XpBar: React.FC<XpBarProps> = ({
  currentXp,
  nextLevelXp,
  level,
  showLabel = true,
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((currentXp / nextLevelXp) * 100)));

  return (
    <div className={clsx("w-full space-y-1.5", className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-semibold">
          {level !== undefined && (
            <span className="text-[#00d2ff] font-hud tracking-wider">LEVEL {level}</span>
          )}
          <span className="text-[#94a3b8] font-hud ml-auto">
            {currentXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP
          </span>
        </div>
      )}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[#050814] border border-[#142852]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#3b6cf6] via-[#00d2ff] to-[#38bdf8] shadow-[0_0_12px_rgba(0,210,255,0.6)] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
