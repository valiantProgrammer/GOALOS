import type { Config } from "tailwindcss";
import { colors, typography, radii, shadows } from "@goalos/design-tokens";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: colors.canvas,
        panel: colors.panel,
        sidebar: colors.sidebar,
        border: colors.border,
        brand: colors.brand,
        difficulty: colors.difficulty,
        status: colors.status,
        textPrimary: colors.text.heading,
        textBody: colors.text.body,
        textMuted: colors.text.muted,
      },
      fontFamily: {
        heading: ["Orbitron", "sans-serif"],
        hud: ["Rajdhani", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: radii,
      boxShadow: shadows,
    },
  },
  plugins: [],
};

export default config;
