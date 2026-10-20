import React from "react";
import { Clock } from "lucide-react";

interface TimePickerFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function TimePickerField({
  label,
  value,
  onChange,
  placeholder = "00:00 AM",
  className = "",
}: TimePickerFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[12px] font-medium text-[#9fb0d0]">{label}</label>
      <div className="relative flex items-center">
        <div className="absolute left-3 text-[#38bdf8] pointer-events-none">
          <Clock className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-10 pl-9 pr-3 rounded-[9px] bg-[#0a1224] border border-[#233b6e]/50 text-white text-[13px] font-medium outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
        />
      </div>
    </div>
  );
}
