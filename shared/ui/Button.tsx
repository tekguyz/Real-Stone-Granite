import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { PHYSICS } from '../lib/theme';

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
  const baseStyles = "relative inline-flex items-center justify-center gap-2 uppercase tracking-[0.15em] font-mono text-xs transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none z-10 overflow-hidden group border";
  
  const variants = {
    primary: "bg-surface border-white/10 text-white hover:border-gold hover:text-gold",
    outline: "bg-transparent border-white/20 text-white hover:border-gold hover:text-gold",
    ghost: "bg-transparent border-transparent text-white/60 hover:text-white hover:bg-white/5",
    gold: "bg-gold border-gold text-primary font-bold hover:bg-white hover:border-white",
  };

  const sizes = {
    sm: "px-4 h-9 text-[10px]",
    md: "px-6 h-12",
    lg: "px-8 h-14 text-sm",
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileTap={{ scale: 0.98 }}
      transition={PHYSICS.snappy} // Snappy for smaller UI elements
      {...props}
    >
      {/* HOVER EFFECT: Gold Slide Up */}
      {/* Only for non-filled buttons to avoid clash */}
      {variant !== 'gold' && (
        <div className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};