import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { PHYSICS } from '../lib/theme'; // Import new physics

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-3 uppercase tracking-[0.2em] font-mono text-xs transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none z-10 overflow-hidden group";
  
  const variants = {
    primary: "bg-surface text-text-main border border-white/5 hover:border-gold/30 hover:bg-surface/80",
    outline: "bg-transparent border border-white/20 text-text-main hover:border-gold hover:text-gold backdrop-blur-sm",
    ghost: "bg-transparent text-text-muted hover:text-text-main hover:bg-white/5",
    gold: "bg-gold text-primary font-bold border border-gold hover:bg-white hover:text-primary hover:border-white",
  };

  const sizes = {
    sm: "px-4 h-8 text-[10px]",
    md: "px-6 h-12",
    lg: "px-10 h-14 text-sm",
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileTap={{ scale: 0.98 }}
      transition={PHYSICS.industrial}
      {...props}
    >
      {/* 1. THE SCANLINE EFFECT (Subtle pass-over on hover) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

      {/* 2. CORNER BRACKETS (The "Blueprint" Look) */}
      {variant === 'primary' || variant === 'outline' ? (
        <>
          <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/30 group-hover:border-gold transition-colors duration-300" />
          <span className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/30 group-hover:border-gold transition-colors duration-300" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/30 group-hover:border-gold transition-colors duration-300" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/30 group-hover:border-gold transition-colors duration-300" />
        </>
      ) : null}

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};