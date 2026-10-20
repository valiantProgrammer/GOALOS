import React from "react";
import { Target, Clock, Infinity as InfinityIcon, ChevronDown } from "lucide-react";
import { useOnboardingStore, StudyStyle } from "@/stores/useOnboardingStore";
import { TimePickerField } from "@/components/ui/TimePickerField";

export function StepSchedule() {
  const {
    timezone,
    wakeTime,
    sleepTime,
    workHoursFrom,
    workHoursTo,
    studyStyle,
    updateData,
  } = useOnboardingStore();

  const studyStyles: {
    id: StudyStyle;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: "focused", label: "Focused Blocks", icon: <Target className="w-4 h-4" /> },
    { id: "flexible", label: "Flexible", icon: <Clock className="w-4 h-4" /> },
    { id: "both", label: "Both", icon: <InfinityIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col h-full max-w-[500px]">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-[26px] font-bold text-white tracking-wide">
          Set Your Schedule
        </h1>
        <p className="text-[13px] text-[#8fa3c7] mt-0.5">
          Tell us about your daily routine.
        </p>
      </div>

      <div className="flex flex-col gap-3.5 mt-5">
        {/* Time Zone Select */}
        <div>
          <label className="text-[12px] font-medium text-[#9fb0d0] block mb-1">
            Time Zone
          </label>
          <div className="relative">
            <select
              value={timezone}
              onChange={(e) => updateData({ timezone: e.target.value })}
              className="w-full h-9 px-3 pr-8 rounded-[8px] bg-[#0a1224] border border-[#233b6e]/50 text-white text-[13px] font-medium outline-none focus:border-[#3b82f6] appearance-none cursor-pointer"
            >
              <option value="(GMT+5:30) India Standard Time">
                (GMT+5:30) India Standard Time
              </option>
              <option value="(GMT+0:00) UTC / London">
                (GMT+0:00) UTC / London
              </option>
              <option value="(GMT-5:00) Eastern Time (US & Canada)">
                (GMT-5:00) Eastern Time (US & Canada)
              </option>
              <option value="(GMT-8:00) Pacific Time (US & Canada)">
                (GMT-8:00) Pacific Time (US & Canada)
              </option>
              <option value="(GMT+9:00) Japan Standard Time">
                (GMT+9:00) Japan Standard Time
              </option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#64748b] absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Wake Up Time and Sleep Time */}
        <div className="grid grid-cols-2 gap-3">
          <TimePickerField
            label="Wake Up Time"
            value={wakeTime}
            onChange={(val) => updateData({ wakeTime: val })}
            placeholder="6:00 AM"
          />
          <TimePickerField
            label="Sleep Time"
            value={sleepTime}
            onChange={(val) => updateData({ sleepTime: val })}
            placeholder="11:00 PM"
          />
        </div>

        {/* Study / Work Hours (Optional) */}
        <div>
          <label className="text-[12px] font-medium text-[#9fb0d0] block mb-1">
            Study / Work Hours (Optional)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <TimePickerField
              label="From"
              value={workHoursFrom}
              onChange={(val) => updateData({ workHoursFrom: val })}
              placeholder="9:00 AM"
            />
            <TimePickerField
              label="To"
              value={workHoursTo}
              onChange={(val) => updateData({ workHoursTo: val })}
              placeholder="5:00 PM"
            />
          </div>
        </div>

        {/* Preferred Study Style */}
        <div>
          <label className="text-[12px] font-medium text-[#9fb0d0] block mb-1.5">
            Preferred Study Style
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {studyStyles.map((item) => {
              const isSelected = studyStyle === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateData({ studyStyle: item.id })}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-[9px] transition-all duration-200 outline-none cursor-pointer ${
                    isSelected
                      ? "bg-[#0e1c38] border border-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.35)] text-white"
                      : "bg-[#0a1224] border border-[#203666]/40 text-[#869ab8] hover:border-[#3b82f6]/50 hover:text-white"
                  }`}
                >
                  <div
                    className={`mb-1 transition-colors ${
                      isSelected ? "text-[#38bdf8]" : "text-[#64748b]"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-[11px] font-medium ${
                      isSelected ? "text-white" : "text-[#94a3b8]"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
