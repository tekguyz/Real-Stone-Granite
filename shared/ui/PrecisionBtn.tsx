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
  // We use a clip-path to create a "Mitered" shape (cut corners)
  // This makes it look like a fabricated stone block.
  
  const baseStyles = "relative px-10 py-5 font-mono uppercase tracking-[0.25em] text-xs font-black flex items-center justify-center outline-none overflow-hidden group";
  
  const variants = {
    primary: "bg-gold text-primary hover:bg-white hover:text-primary shadow-[0_10px_40px_-10px_rgba(212,175,55,0.3)]",
    secondary: "bg-transparent text-text-main border border-white/20 hover:border-gold hover:text-gold",
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={PHYSICS.industrial}
      // THE MITERED EDGE CLIP
      style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
      {...props}
    >
      {/* Sheen Effect */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-[150%] w-[150%] bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-out z-10 pointer-events-none" />
      )}
      
      {/* Decorative Line for "Technical" Feel */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/10 group-hover:bg-transparent transition-colors" />

      <span className="relative z-20 flex items-center gap-3">
        {/* Tiny diamond icon to reinforce brand */}
        <div className="w-1 h-1 bg-current rotate-45" />
        {children}
        <div className="w-1 h-1 bg-current rotate-45" />
      </span>
    </motion.button>
  );
};