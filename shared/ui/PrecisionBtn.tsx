import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { PHYSICS } from '../lib/theme';

interface PrecisionBtnProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const PrecisionBtn: React.FC<PrecisionBtnProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  // Base: Solid geometry, uppercase, monospace, sharp edges.
  // "overflow-hidden" contains the shimmer effect.
  const baseStyles = "relative px-10 py-5 font-mono uppercase tracking-[0.25em] text-xs font-bold flex items-center justify-center outline-none overflow-hidden group border transition-colors duration-300";
  
  const variants = {
    // Primary: Solid Gold background. Hover turns White.
    // Shadow is subtle gold glow, not a hard drop shadow.
    primary: "bg-gold border-gold text-primary hover:bg-white hover:border-white hover:text-primary shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)]",
    
    // Secondary: Transparent with White Border. 
    // Hover: Gold Border & Text.
    secondary: "bg-transparent border-white/20 text-white hover:border-gold hover:text-gold",
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }} // Heavy press feel (matches PHYSICS.industrial)
      transition={PHYSICS.industrial}
      {...props}
    >
      {/* 1. THE SHIMMER (Light Reflection) */}
      {/* This creates the 'expensive metal' look when the light hits it. */}
      {variant === 'primary' && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
           <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[20deg] animate-shimmer" />
        </div>
      )}

      {/* 2. ARCHITECTURAL CORNERS (Tiny squares) */}
      {/* Replaces the sci-fi clip-path with structural details */}
      <div className="absolute top-0 left-0 w-1 h-1 bg-primary z-20" />
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-primary z-20" />

      {/* 3. THE CONTENT */}
      <span className="relative z-30 flex items-center gap-3">
        {/* Decorative Diamonds */}
        <div className="w-1.5 h-1.5 border border-current rotate-45 group-hover:bg-current transition-colors duration-300" />
        {children}
        <div className="w-1.5 h-1.5 border border-current rotate-45 group-hover:bg-current transition-colors duration-300" />
      </span>
    </motion.button>
  );
};