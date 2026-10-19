/**
 * Exact sampled colors from the canonical GoalOS mockups.
 */
export const colors = {
  // Backgrounds
  canvas: {
    DEFAULT: "#050814", // Deep near-black navy
    dark: "#03050c",
    light: "#070c1e",
  },
  panel: {
    DEFAULT: "#0a1224", // Primary panel background
    glass: "rgba(10, 18, 36, 0.85)",
    surface: "#0d1933", // Elevated input or card background
    elevated: "#112040",
  },
  sidebar: {
    DEFAULT: "#070d1c",
    activePill: "#132c66",
    hoverPill: "rgba(20, 48, 110, 0.4)",
  },

  // Borders
  border: {
    DEFAULT: "#142852",
    subtle: "rgba(20, 40, 82, 0.5)",
    glow: "#00d2ff",
    accent: "#3b6cf6",
    active: "#2563eb",
  },

  // Core Brand & Accents
  brand: {
    blue: "#3b6cf6", // Electric primary blue
    blueHover: "#2555eb",
    blueLight: "#60a5fa",
    cyan: "#00d2ff", // Neon HUD highlight & focus
    cyanGlow: "#38bdf8",
    violet: "#8a4fff", // Purple skill & special badge
    purple: "#7038e6",
    gold: "#f5a623", // Coin, streak flame, rank badge
    goldLight: "#fbbf24",
    red: "#ef4444", // Destructive, alert, boss HP
    redDark: "#b91c1c",
    green: "#10b981", // Success, completed, healthy
    greenLight: "#34d399",
  },

  // Difficulty Chips
  difficulty: {
    easy: {
      bg: "rgba(16, 185, 129, 0.12)",
      border: "rgba(16, 185, 129, 0.35)",
      text: "#34d399",
    },
    medium: {
      bg: "rgba(245, 166, 35, 0.12)",
      border: "rgba(245, 166, 35, 0.35)",
      text: "#fbbf24",
    },
    hard: {
      bg: "rgba(239, 68, 68, 0.12)",
      border: "rgba(239, 68, 68, 0.35)",
      text: "#f87171",
    },
    hardcore: {
      bg: "rgba(138, 79, 255, 0.15)",
      border: "rgba(138, 79, 255, 0.4)",
      text: "#c084fc",
    },
  },

  // Status Chips
  status: {
    completed: {
      bg: "rgba(16, 185, 129, 0.15)",
      border: "rgba(16, 185, 129, 0.4)",
      text: "#10b981",
    },
    inProgress: {
      bg: "rgba(59, 108, 246, 0.15)",
      border: "rgba(59, 108, 246, 0.4)",
      text: "#60a5fa",
    },
    start: {
      bg: "rgba(138, 79, 255, 0.15)",
      border: "rgba(138, 79, 255, 0.4)",
      text: "#a78bfa",
    },
    locked: {
      bg: "rgba(71, 85, 105, 0.15)",
      border: "rgba(71, 85, 105, 0.3)",
      text: "#94a3b8",
    },
  },

  // Typography Colors
  text: {
    heading: "#f8fafc", // White high-contrast text
    body: "#94a3b8", // Crisp secondary slate
    muted: "#64748b", // Subtle tertiary
    subtle: "#475569",
    accent: "#00d2ff",
    brand: "#3b6cf6",
  },
} as const;
