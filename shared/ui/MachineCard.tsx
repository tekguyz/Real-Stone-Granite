import React from 'react';
import { motion } from 'framer-motion';
import { PHYSICS } from '../lib/theme';

interface MachineCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MachineCard: React.FC<MachineCardProps> = ({ children, className = '', onClick }) => {
  return (
    <motion.div
      className={`group bg-surface border border-white/5 p-8 relative overflow-hidden cursor-pointer ${className}`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99, y: 0 }}
      transition={PHYSICS.industrial}
      onClick={onClick}
    >
      {/* 1. INDUSTRIAL NOISE (Subtle Texture) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      {/* 2. METALLIC BORDER FADE */}
      <div className="absolute inset-0 border border-transparent group-hover:border-gold/50 transition-colors duration-500 z-20 pointer-events-none" />
      
      {/* 3. CORNER ACCENTS (Top-Right / Bottom-Left) */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-gold transition-colors duration-500 z-20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-gold transition-colors duration-500 z-20" />

      {/* 4. CONTENT */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};