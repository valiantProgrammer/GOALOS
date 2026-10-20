import React, { useState } from "react";
import { Plus } from "lucide-react";

interface ChipSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  onAddOption?: (newOption: string) => void;
}

export function ChipSelect({
  options,
  selected,
  onChange,
  onAddOption,
}: ChipSelectProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newChipText, setNewChipText] = useState("");

  const toggleOption = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((item) => item !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newChipText.trim();
    if (trimmed && trimmed.length <= 20) {
      if (!options.includes(trimmed)) {
        if (onAddOption) onAddOption(trimmed);
      }
      if (!selected.includes(trimmed)) {
        onChange([...selected, trimmed]);
      }
      setNewChipText("");
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggleOption(opt)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 select-none ${
              isSelected
                ? "bg-[#102246] border border-[#3b82f6] text-white shadow-[0_0_12px_rgba(59,130,246,0.35)]"
                : "bg-[#0a1224] border border-[#233b6e]/50 text-[#9fb0d0] hover:border-[#3b82f6]/40 hover:text-white"
            }`}
          >
            {opt}
          </button>
        );
      })}

      {/* Add Custom Interest Chip */}
      {isAdding ? (
        <form onSubmit={handleAddSubmit} className="flex items-center">
          <input
            autoFocus
            type="text"
            maxLength={20}
            value={newChipText}
            onChange={(e) => setNewChipText(e.target.value)}
            onBlur={() => {
              if (!newChipText.trim()) setIsAdding(false);
            }}
            placeholder="Interest..."
            className="px-3 py-1.5 rounded-full text-[12px] bg-[#0c162c] border border-[#3b82f6] text-white outline-none w-28 placeholder-[#64748b]"
          />
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="px-3 py-1.5 rounded-full text-[12px] font-medium border border-dashed border-[#3b82f6]/60 text-[#38bdf8] hover:border-[#3b82f6] hover:bg-[#3b82f6]/10 flex items-center gap-1 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Interest</span>
        </button>
      )}
    </div>
  );
}
