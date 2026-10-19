import React from "react";
import clsx from "clsx";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={clsx("flex items-center gap-1.5 border-b border-[#142852] pb-1", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              "px-4 py-2 text-sm font-semibold transition-all relative cursor-pointer select-none",
              isActive
                ? "text-[#00d2ff] font-bold"
                : "text-[#94a3b8] hover:text-[#f8fafc]"
            )}
          >
            <span className="flex items-center gap-1.5">
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={clsx(
                    "text-xs px-1.5 py-0.2 rounded-full font-hud",
                    isActive ? "bg-[#00d2ff]/20 text-[#00d2ff]" : "bg-[#142852] text-[#64748b]"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </span>
            {isActive && (
              <span className="absolute bottom-[-5px] left-0 right-0 h-[2px] bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
            )}
          </button>
        );
      })}
    </div>
  );
};
