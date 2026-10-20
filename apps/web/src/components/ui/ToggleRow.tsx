import React from "react";

interface ToggleRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleRow({
  icon,
  title,
  description,
  checked,
  onChange,
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a1224]/80 border border-[#203666]/35 hover:border-[#3b82f6]/30 transition-all">
      <div className="flex items-center gap-3">
        {/* Left Icon inside circle */}
        <div className="w-8 h-8 rounded-full bg-[#101c38] border border-[#274075]/50 flex items-center justify-center text-[#38bdf8] shrink-0">
          {icon}
        </div>
        <div>
          <div className="text-[13px] font-medium text-white">{title}</div>
          <div className="text-[11px] text-[#869ab8]">{description}</div>
        </div>
      </div>

      {/* Styled Blue Toggle Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer outline-none ${
          checked
            ? "bg-[#2563eb] shadow-[0_0_12px_rgba(37,99,235,0.6)]"
            : "bg-[#182645] border border-[#2a3e68]"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
