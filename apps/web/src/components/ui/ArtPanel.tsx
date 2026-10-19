import React from "react";
import clsx from "clsx";

export interface ArtPanelProps {
  quote?: string;
  subquote?: string;
  artUrl?: string;
  className?: string;
}

export const ArtPanel: React.FC<ArtPanelProps> = ({
  quote = "DISCIPLINE CREATES FREEDOM",
  subquote = "A STRONGER YOU BUILDS A BRIGHTER TOMORROW",
  artUrl,
  className,
}) => {
  return (
    <div
      className={clsx(
        "relative rounded-2xl overflow-hidden border border-[#142852] bg-gradient-to-b from-[#0a152d] via-[#050914] to-[#02040a] flex flex-col justify-end p-6 select-none",
        className
      )}
    >
      {/* Visual background aura and silhouette placeholder */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00d2ff]/20 via-[#3b6cf6]/10 to-transparent" />
      
      {/* Decorative runic glyphs / lightning effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#00d2ff]/10 blur-3xl pointer-events-none" />

      {/* Motivational Typography */}
      <div className="relative z-10 text-right mt-auto">
        <h3 className="font-heading text-lg font-black tracking-wider text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {quote}
        </h3>
        {subquote && (
          <p className="font-hud text-xs tracking-widest text-[#00d2ff] uppercase mt-1.5 font-bold">
            {subquote}
          </p>
        )}
      </div>
    </div>
  );
};
