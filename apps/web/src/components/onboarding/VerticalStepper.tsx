import React from "react";
import { Check } from "lucide-react";

export interface StepItem {
  num: number;
  label: string;
}

const STEPS: StepItem[] = [
  { num: 1, label: "Welcome" },
  { num: 2, label: "Your Profile" },
  { num: 3, label: "Goals & Interests" },
  { num: 4, label: "Schedule" },
  { num: 5, label: "Preferences" },
  { num: 6, label: "Complete" },
];

interface VerticalStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function VerticalStepper({ currentStep, onStepClick }: VerticalStepperProps) {
  return (
    <div className="flex flex-col select-none">
      <div className="flex flex-col">
        {STEPS.map((step, idx) => {
          const isActive = currentStep === step.num;
          const isCompleted = currentStep > step.num;
          const isLast = idx === STEPS.length - 1;

          return (
            <div key={step.num} className="flex flex-col">
              <div
                onClick={() => onStepClick && onStepClick(step.num)}
                className={`flex items-center gap-3.5 group ${
                  onStepClick ? "cursor-pointer" : ""
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all duration-200 shrink-0 ${
                    isActive
                      ? "bg-[#2563eb] text-white shadow-[0_0_16px_rgba(59,130,246,0.9)] ring-2 ring-[#3b82f6]/50"
                      : isCompleted
                      ? "border-[1.5px] border-[#3b82f6] text-[#60a5fa] bg-[#0a1836]"
                      : "border-[1.5px] border-[#294275] text-[#869ab8] bg-[#081226] group-hover:border-[#3b82f6]/60"
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : step.num}
                </div>

                {/* Step Label */}
                <span
                  className={`text-[13px] tracking-wide transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-[#38bdf8] font-semibold drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                      : isCompleted
                      ? "text-[#cbd5e1] font-medium"
                      : "text-[#9fb0d0] group-hover:text-white"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Vertical Connector Line */}
              {!isLast && (
                <div className="w-7 flex justify-center py-1">
                  <div
                    className={`w-[1.5px] h-6 transition-colors duration-200 ${
                      isCompleted ? "bg-[#3b82f6]/70" : "bg-[#1c305c]"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
