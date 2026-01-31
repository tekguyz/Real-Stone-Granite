import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

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
  const baseStyles = "relative inline-flex items-center justify-center uppercase tracking-[0.15em] font-mono text-xs transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-surface text-text-main border border-white/10 hover:border-gold/50",
    outline: "bg-transparent border border-white/20 text-text-main hover:border-gold hover:text-gold",
    ghost: "bg-transparent text-text-muted hover:text-text-main",
    gold: "bg-gold text-primary font-bold border border-gold hover:bg-transparent hover:text-gold",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-sm",
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};