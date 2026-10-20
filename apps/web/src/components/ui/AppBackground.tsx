"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BackgroundVariant, getBackgroundVariant } from "@/lib/page-backgrounds";

interface AppBackgroundProps {
  variant?: BackgroundVariant;
  className?: string;
}

export function AppBackground({ variant: overrideVariant, className = "" }: AppBackgroundProps) {
  const pathname = usePathname();
  const variant = overrideVariant || getBackgroundVariant(pathname);

  const isHero = variant === "hero";
  const isDense = variant === "dense";

  // Artwork selection
  const imageSrc = isDense
    ? "/backgrounds/bg-blur-1280.webp"
    : "/backgrounds/bg-full-2560.webp";

  // Layer 2 opacity
  const artworkOpacity = isHero ? 1 : isDense ? 0.35 : 0.55;

  // Particle positions
  const embers = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.1 + 7) % 94}%`,
      delay: `${(i * 1.7) % 12}s`,
      duration: `${14 + ((i * 3.3) % 10)}s`,
      size: `${2 + (i % 3)}px`,
      opacity: 0.25 + ((i % 5) * 0.12),
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#050b1a] ${className}`}
    >
      {/* 1. Base color background */}
      <div className="absolute inset-0 bg-[#050b1a]" />

      {/* 2. Artwork image with 400ms crossfade transition */}
      <div
        className="absolute inset-0 transition-opacity duration-400 ease-out"
        style={{ opacity: artworkOpacity }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          priority={isHero}
          quality={80}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "70% 20%" }}
        />
      </div>

      {/* 3. Vertical fade */}
      <div
        className={`absolute inset-0 transition-opacity duration-400 ease-out ${
          isHero
            ? "bg-[linear-gradient(to_bottom,rgba(5,11,26,0.1)_0%,rgba(5,11,26,0.3)_30%,rgba(5,11,26,0.7)_55%,rgba(5,11,26,0.95)_80%,#050b1a_100%)]"
            : "bg-[linear-gradient(to_bottom,rgba(5,11,26,0.25)_0%,rgba(5,11,26,0.7)_35%,rgba(5,11,26,0.95)_70%,#050b1a_100%)]"
        }`}
      />

      {/* 4. Left-to-right fade (keeps sidebar & content cards readable) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,11,26,0.92)_0%,rgba(5,11,26,0.55)_35%,rgba(5,11,26,0)_75%)]" />

      {/* 5. Blue atmosphere radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_75%_15%,rgba(37,99,235,0.22),transparent_70%)]" />

      {/* 6. Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_55%,rgba(2,5,14,0.6)_100%)]" />

      {/* 7. Ambient motion: slow drifting mist (disabled on reduced motion) */}
      <div className="hidden motion-safe:block absolute inset-0 opacity-[0.07] overflow-hidden pointer-events-none">
        <div className="w-[200%] h-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.2)_0%,transparent_70%)] animate-slow-drift" />
      </div>

      {/* 8. Floating blue ember particles (disabled on reduced motion) */}
      <div className="hidden motion-safe:block absolute inset-0 overflow-hidden pointer-events-none">
        {embers.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] animate-float-ember"
            style={{
              left: p.left,
              bottom: "-10px",
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}
