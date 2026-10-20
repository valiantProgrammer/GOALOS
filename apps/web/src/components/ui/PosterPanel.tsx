import React from "react";
import Image from "next/image";
import clsx from "clsx";

export interface PosterPanelProps {
  variant?: "hunter" | "castle";
  quote?: string;
  subquote?: string;
  children?: React.ReactNode;
  className?: string;
}

export const PosterPanel: React.FC<PosterPanelProps> = ({
  variant = "hunter",
  quote,
  subquote,
  children,
  className,
}) => {
  const imageSrc =
    variant === "castle"
      ? "/backgrounds/poster-castle.webp"
      : "/backgrounds/poster-hunter.webp";

  return (
    <div
      className={clsx(
        "relative rounded-2xl overflow-hidden border border-[rgba(59,130,246,0.35)] shadow-[0_0_24px_rgba(59,130,246,0.22)] flex flex-col justify-end p-6 select-none bg-[#050b1a] min-h-[420px]",
        className
      )}
    >
      {/* Background Artwork */}
      <Image
        src={imageSrc}
        alt="GOALOS Hunter Poster"
        fill
        sizes="(max-width: 1024px) 100vw, 420px"
        className="object-cover object-center"
      />

      {/* Overlay: bottom gradient to-top rgba(5,11,26,0.92) -> transparent 55% */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,11,26,0.92)] via-[rgba(5,11,26,0.45)] to-transparent pointer-events-none" />

      {/* Blue atmosphere rim light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,210,255,0.18),_transparent_60%)] pointer-events-none" />

      {/* Existing quote text / Custom children */}
      <div className="relative z-10 text-right mt-auto">
        {children ? (
          children
        ) : (
          <>
            {quote && (
              <h3 className="font-heading text-lg font-black tracking-wider text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                {quote}
              </h3>
            )}
            {subquote && (
              <p className="font-hud text-xs tracking-widest text-[#00d2ff] uppercase mt-1.5 font-bold drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]">
                {subquote}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
