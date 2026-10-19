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
    default: "bg-[#0a1224] border-[#142852]",
    surface: "bg-[#0d1933] border-[#1a3366]",
    glass: "bg-[#0a1224]/80 backdrop-blur-md border-[#142852]",
  };

  return (
    <div
      className={clsx(
        "rounded-xl border transition-all duration-200",
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
