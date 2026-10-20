import React from "react";

export function AuthPoster() {
  return (
    <div className="hidden lg:flex w-[260px] xl:w-[280px] shrink-0 rounded-xl overflow-hidden border border-[#5078ff]/25 relative flex-col justify-end p-5 select-none shadow-[0_0_35px_rgba(0,0,0,0.8)] bg-[#050b18]">
      {/* Background cropped poster artwork */}
      <img
        src="/onboarding/poster-hunter.png"
        alt="Hunter Gateway Poster"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Dark gradient overlay at bottom for CSS quote text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-[#050b1a]/60 to-transparent pointer-events-none" />

      {/* Quote text at bottom in blue letter-spaced caps */}
      <div className="relative z-10 text-center pb-2 space-y-0.5 select-none">
        <div className="font-sans font-bold text-[12px] tracking-[0.2em] text-[#4f86ff] drop-shadow-[0_0_10px_rgba(79,134,255,0.8)] leading-tight">
          EVERY GREAT HUNTER
        </div>
        <div className="font-sans font-bold text-[12px] tracking-[0.2em] text-[#4f86ff] drop-shadow-[0_0_10px_rgba(79,134,255,0.8)] leading-tight">
          ONCE TOOK
        </div>
        <div className="font-sans font-bold text-[12px] tracking-[0.2em] text-[#4f86ff] drop-shadow-[0_0_10px_rgba(79,134,255,0.8)] leading-tight">
          THE FIRST STEP
        </div>
      </div>
    </div>
  );
}
