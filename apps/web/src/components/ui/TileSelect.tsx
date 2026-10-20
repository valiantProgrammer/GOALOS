import React from "react";

interface TileSelectProps {
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  label: string;
  sublabel?: string;
  className?: string;
  badge?: React.ReactNode;
  layout?: "vertical" | "horizontal";
  accentColor?: "blue" | "pink" | "violet" | "cyan";
}

export function TileSelect({
  selected = false,
  onClick,
  icon,
  label,
  sublabel,
  className = "",
  badge,
  layout = "vertical",
  accentColor = "blue",
}: TileSelectProps) {
  const isPink = accentColor === "pink" && selected;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex transition-all duration-200 select-none rounded-[10px] text-left outline-none ${
        layout === "vertical"
          ? "flex-col items-center justify-center p-3 text-center"
          : "flex-row items-center gap-3 p-3.5"
      } ${
        selected
          ? isPink
            ? "bg-[#1f1028] border border-[#d946ef] shadow-[0_0_16px_rgba(217,70,239,0.35)] text-white"
            : "bg-[#0e1c38] border border-[#3b82f6] shadow-[0_0_16px_rgba(59,130,246,0.35)] text-white"
          : "bg-[#0a1224] border border-[#233b6e]/40 hover:border-[#3b82f6]/50 hover:bg-[#0c162e] text-[#9fb0d0]"
      } ${className}`}
    >
      {badge && <div className="absolute top-2 right-2">{badge}</div>}

      {icon && (
        <div
          className={`flex items-center justify-center transition-colors ${
            layout === "vertical" ? "mb-2" : "shrink-0"
          } ${
            selected
              ? isPink
                ? "text-[#d946ef]"
                : "text-[#38bdf8]"
              : "text-[#7a8ea8]"
          }`}
        >
          {icon}
        </div>
      )}

      <div className={layout === "vertical" ? "w-full" : "flex-1"}>
        <div
          className={`text-[12px] font-medium tracking-wide ${
            selected ? "text-white" : "text-[#b4c3dd]"
          }`}
        >
          {label}
        </div>
        {sublabel && (
          <div className="text-[11px] text-[#6b7f9e] mt-0.5 leading-snug">{sublabel}</div>
        )}
      </div>
    </button>
  );
}
