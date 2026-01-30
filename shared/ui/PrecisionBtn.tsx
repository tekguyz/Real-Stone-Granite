
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface PrecisionBtnProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const PrecisionBtn: React.FC<PrecisionBtnProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative px-8 py-4 font-mono uppercase tracking-[0.2em] text-xs font-bold flex items-center justify-center outline-none overflow-hidden group";
  
  const variants = {
    primary: "bg-gold text-primary hover:bg-white hover:text-primary",
    secondary: "bg-transparent border border-white/20 text-text-main hover:border-gold hover:text-gold",
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      {...props}
    >
      {/* Sheen Effect for Primary Variant */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-[150%] w-[150%] bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-out z-0 pointer-events-none" />
      )}
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
