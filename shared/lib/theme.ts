export const COLORS = {
  primary: 'oklch(18.6% 0.009 46)',
  surface: 'oklch(23.5% 0.009 46)',
  gold: 'oklch(76.6% 0.154 86.6)',
  textMain: 'oklch(96% 0.003 86)',
  textMuted: 'oklch(60% 0.006 46)',
  // Added translucent variants for glass effects
  goldDim: 'oklch(76.6% 0.154 86.6 / 0.1)', 
  surfaceHighlight: 'oklch(23.5% 0.009 46 / 0.8)',
} as const;

export const PHYSICS = {
  // Standard UI interactions (Dropdowns, Toggles)
  snappy: {
    type: "spring",
    stiffness: 400,
    damping: 30
  },
  // Large layout transitions
  smooth: {
    type: "spring",
    stiffness: 100,
    damping: 20
  },
  // THE NEW STANDARD: For Buttons & Cards. 
  // High stiffness + Critical damping = Instant response, zero wobble.
  // It feels "Solid".
  industrial: {
    type: "spring",
    stiffness: 500,
    damping: 45, 
    mass: 1.2
  }
} as const;