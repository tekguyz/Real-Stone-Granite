export const COLORS = {
  // Bound to index.css variables for Design Integrity
  primary: 'var(--color-primary)', 
  surface: 'var(--color-surface)',
  gold: 'var(--color-gold)',
  textMain: 'var(--color-text-main)',
  textMuted: 'var(--color-text-muted)',

  // Translucents (CSS Variable Fallbacks)
  goldDim: 'rgba(212, 175, 55, 0.1)', 
  surfaceHighlight: 'rgba(25, 25, 25, 0.8)',
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
    stiffness: 250, 
    damping: 35,    
    mass: 2.0       
  }
} as const;