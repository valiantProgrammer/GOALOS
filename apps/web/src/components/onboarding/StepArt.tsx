import React from "react";

interface StepArtProps {
  src: string;
  alt?: string;
  className?: string;
}

export function StepArt({ src, alt = "Hunter Illustration", className = "" }: StepArtProps) {
  return (
    <div className={`hidden sm:block absolute top-0 right-0 h-full w-[45%] pointer-events-none select-none overflow-hidden ${className}`}>
      {/* Background artwork */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain object-right-top"
      />
      {/* Gradient mask on left to ensure seamless blend into card background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,16,38,1)] via-[rgba(8,16,38,0.4)] to-transparent" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(8,16,38,0.95)] to-transparent" />
    </div>
  );
}
