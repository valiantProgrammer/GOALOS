import React from "react";
import clsx from "clsx";
import { Plus } from "lucide-react";

export interface StatBarProps {
  label: "STR" | "AGI" | "INT" | "VIT" | "LUK";
  fullLabel?: string;
  value: number;
  max?: number;
  canIncrease?: boolean;
  onIncrease?: () => void;
  className?: string;
}

export const StatBar: React.FC<StatBarProps> = ({
  label,
  fullLabel,
  value,
  max = 50,
  canIncrease = false,
  onIncrease,
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={clsx("flex items-center gap-3 w-full py-1", className)}>
      <div className="w-12 text-left font-hud text-sm font-bold text-[#00d2ff] tracking-wider">
        {label}
      </div>
      {fullLabel && (
        <div className="w-24 text-xs font-medium text-[#94a3b8] hidden sm:block">
          {fullLabel}
        </div>
      )}
      <div className="flex-1 relative h-2 bg-[#050814] rounded-full border border-[#142852] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#3b6cf6] to-[#00d2ff] rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="w-8 text-right font-hud text-sm font-bold text-white">
        {value}
      </div>
      {canIncrease && (
        <button
          onClick={onIncrease}
          className="w-6 h-6 flex items-center justify-center rounded bg-[#132c66] hover:bg-[#3b6cf6] text-[#00d2ff] hover:text-white border border-[#204899] transition-colors"
        >
          <Plus size={14} />
        </button>
      )}
    </div>
  );
};
