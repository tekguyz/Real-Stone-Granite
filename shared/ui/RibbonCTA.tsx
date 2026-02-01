
import React from 'react';
import { motion } from 'framer-motion';
import { PrecisionBtn } from './PrecisionBtn';
import { PHYSICS } from '../lib/theme';

interface RibbonCTAProps {
  heading?: string;
  subheading?: string;
  buttonLabel?: string;
  onClick?: () => void;
  className?: string;
}

export const RibbonCTA: React.FC<RibbonCTAProps> = ({ 
  heading = "Bring Your Vision to Life", 
  subheading = "From rough block to polished masterpiece. Let's discuss your project.",
  buttonLabel = "Start Project Planner",
  onClick, 
  className = '' 
}) => {
  return (
    <section className={`relative w-full py-12 border-y border-white/10 bg-surface overflow-hidden group ${className}`}>
      
      {/* 1. ATMOSPHERE: Central Glow & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-primary to-primary opacity-50" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      {/* 2. DECORATIVE: Industrial Grid Lines (Subtle) */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5 hidden md:block" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/5 hidden md:block" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left">
          
          {/* LEFT: The Hook */}
          <div className="max-w-2xl">
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={PHYSICS.smooth}
               className="flex flex-col gap-2"
             >
               <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="w-2 h-2 bg-gold rotate-45" />
                  <span className="font-mono text-[10px] text-gold uppercase tracking-[0.3em] font-bold">
                    Concierge Service
                  </span>
               </div>
               
               <h2 className="text-2xl md:text-4xl font-serif text-white tracking-tight leading-tight">
                 {heading}
               </h2>
               
               <p className="text-white/60 font-sans font-light text-sm md:text-base max-w-lg leading-relaxed hidden md:block">
                 {subheading}
               </p>
             </motion.div>
          </div>

          {/* RIGHT: The Trigger */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ ...PHYSICS.industrial, delay: 0.1 }}
             className="flex-shrink-0"
          >
             <PrecisionBtn 
               variant="primary" 
               onClick={onClick} 
               className="h-14 px-8 shadow-2xl shadow-gold/10"
             >
                <span className="text-xs font-bold tracking-[0.2em]">{buttonLabel}</span>
             </PrecisionBtn>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
