import React from "react";
import clsx from "clsx";

export interface SystemButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "gradient" | "outline";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

export const SystemButton: React.FC<SystemButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  glow = false,
  ...props
}) => {
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-semibold rounded-lg",
    md: "px-5 py-2.5 text-sm font-semibold rounded-lg",
    lg: "px-6 py-3 text-base font-bold rounded-xl",
  };

  const variantStyles = {
    primary:
      "bg-[#3b6cf6] hover:bg-[#2555eb] text-white shadow-[0_0_15px_rgba(59,108,246,0.35)] active:scale-[0.98]",
    secondary:
      "bg-[#0d1933] hover:bg-[#132c66] text-[#94a3b8] hover:text-white border border-[#142852] active:scale-[0.98]",
    danger:
      "bg-[#ef4444] hover:bg-[#dc2626] text-white shadow-[0_0_15px_rgba(239,68,68,0.35)] active:scale-[0.98]",
    gradient:
      "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-[0.98]",
    outline:
      "bg-transparent hover:bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/50 active:scale-[0.98]",
  };

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none",
        sizeStyles[size],
        variantStyles[variant],
        glow && "shadow-[0_0_20px_rgba(0,210,255,0.4)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
