import React from "react";
import clsx from "clsx";

export interface HudPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  variant?: "default" | "surface" | "glass";
}

export const HudPanel: React.FC<HudPanelProps> = ({
  children,
  className,
  glow = false,
  variant = "default",
  ...props
}) => {
  const variantStyles = {
    default: "glass-card",
    surface: "bg-[rgba(5,10,24,0.65)] border border-[rgba(59,130,246,0.18)]",
    glass: "glass-card",
  };

  return (
    <div
      className={clsx(
        "rounded-xl transition-all duration-200",
        variantStyles[variant],
        glow && "shadow-[0_0_20px_rgba(0,210,255,0.18)] border-[#00d2ff]/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
