export const typography = {
  fontFamily: {
    heading: ["var(--font-orbitron)", "Orbitron", "sans-serif"],
    hud: ["var(--font-rajdhani)", "Rajdhani", "sans-serif"],
    body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
    mono: ["JetBrains Mono", "Courier New", "monospace"],
  },
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
    "5xl": ["3rem", { lineHeight: "1" }],
  },
} as const;

export const radii = {
  none: "0px",
  sm: "4px",
  DEFAULT: "8px",
  md: "10px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  "3xl": "24px",
  full: "9999px",
} as const;

export const shadows = {
  panel: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
  glowCyan: "0 0 15px rgba(0, 210, 255, 0.35)",
  glowBlue: "0 0 20px rgba(59, 108, 246, 0.4)",
  glowViolet: "0 0 20px rgba(138, 79, 255, 0.4)",
  glowGold: "0 0 18px rgba(245, 166, 35, 0.35)",
  glowRed: "0 0 18px rgba(239, 68, 68, 0.35)",
} as const;
