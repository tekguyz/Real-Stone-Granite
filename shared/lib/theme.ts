
export const COLORS = {
  primary: 'oklch(18.6% 0.009 46)',
  surface: 'oklch(23.5% 0.009 46)',
  gold: 'oklch(76.6% 0.154 86.6)',
  textMain: 'oklch(96% 0.003 86)',
  textMuted: 'oklch(60% 0.006 46)',
} as const;

// Added 'as const' to ensure literal type inference for Framer Motion transition properties
export const PHYSICS = {
  snappy: {
    type: "spring",
    stiffness: 400,
    damping: 30
  },
  slow: {
    type: "spring",
    stiffness: 100,
    damping: 20
  }
} as const;
