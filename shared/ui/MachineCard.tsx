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
      className={`group bg-surface/50 border border-white/10 p-8 relative overflow-hidden cursor-pointer backdrop-blur-md ${className}`}
      whileHover={{ y: -4, borderColor: 'var(--color-gold)' }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={PHYSICS.industrial}
      onClick={onClick}
    >
      {/* 1. NOISE TEXTURE (Grit) - Requires you to have a noise SVG or CSS pattern. 
          If you don't have an asset, we use a CSS radial gradient to simulate depth. */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* 2. TECHNICAL CROSSHAIRS (The "Scope" Look) */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-white/10 group-hover:border-gold/50 transition-colors" />
      <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-white/10 group-hover:border-gold/50 transition-colors" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-white/10 group-hover:border-gold/50 transition-colors" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-white/10 group-hover:border-gold/50 transition-colors" />

      {/* 3. CENTER GLOW (Spotlight effect on hover) */}
      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};