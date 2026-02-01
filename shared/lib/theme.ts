
export const COLORS = {
  // DEEP ONYX: Darker (14% Lightness) for a true "Void" look.
  primary: 'oklch(14% 0.01 80)', 

  // GUNMETAL: Slightly lighter for cards/modals.
  surface: 'oklch(19% 0.01 80)',

  // ROLEX GOLD: Richer, Brassier (Hue 82).
  gold: 'oklch(74% 0.16 82)',

  // PURE WHITE: Maximum legibility.
  textMain: 'oklch(98% 0 0)',

  // MUTED PLATINUM: For secondary text.
  textMuted: 'oklch(65% 0.01 80)',

  // TRANSLUCENTS
  goldDim: 'oklch(74% 0.16 82 / 0.1)', 
  surfaceHighlight: 'oklch(19% 0.01 80 / 0.8)',
} as const;

// HEX Fallbacks for Canvas/JS-only libraries (e.g. Confetti)
export const HEX = {
  gold: '#d4af37',   // Classic Metallic Gold
  silver: '#e5e5e5', // Platinum/Silver
  bronze: '#cd7f32', // Industrial Bronze
} as const;

export const PHYSICS = {
  // "Snappy": For Drawers, Toggles, and Dropdowns.
  snappy: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    restDelta: 0.001
  },

  // "Smooth": For Scrolling, Parallax.
  smooth: { 
    duration: 0.8, 
    ease: [0.22, 1, 0.36, 1] 
  },

  // "Industrial": For Buttons & Hover States.
  // FEELS LIKE: Pressing a heavy button on a CNC machine.
  industrial: {
    type: "spring",
    stiffness: 250, // Lowered from 500 (too jittery)
    damping: 35,    // Tuned to stop the heavy mass
    mass: 2.0       // Increased from 1.2 (Heavier feel)
  }
} as const;
