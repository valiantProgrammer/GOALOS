import { colors } from "./colors";
import { typography, radii, shadows } from "./typography";

export const tailwindPreset = {
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
      fontFamily: typography.fontFamily,
      borderRadius: radii,
      boxShadow: shadows,
    },
  },
};
