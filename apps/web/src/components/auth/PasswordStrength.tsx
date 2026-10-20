import React from "react";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const score = getStrength(password);
  const labels = ["Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-[#ef4444]", "bg-[#f59e0b]", "bg-[#38bdf8]", "bg-[#22c55e]"];

  if (!password) return null;

  return (
    <div className="mt-1.5 flex flex-col gap-1">
      <div className="flex gap-1.5 h-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`flex-1 rounded-full transition-all duration-300 ${
              index < score ? colors[Math.min(score - 1, 3)] : "bg-[#1e293b]"
            }`}
          />
        ))}
      </div>
      <div className="text-[10px] text-right text-[#94a3b8] font-medium">
        Strength: <span className="text-white">{labels[Math.min(score, 3)]}</span>
      </div>
    </div>
  );
}
