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
  heading = "Start Your Project", 
  subheading = "From rough block to polished masterpiece. Direct consultations available.",
  buttonLabel = "Open Planner",
  onClick, 
  className = '' 
}) => {
  return (
    <section className={`w-full bg-primary py-12 md:py-20 px-6 md:px-12 relative overflow-hidden group ${className}`}>
      
      {/* The "Signature Line" */}
      <div className="max-w-screen-2xl mx-auto border-y border-white/10 relative">
        
        {/* Animated Border Tracker */}
        <motion.div 
          className="absolute top-0 left-0 h-[1px] bg-gold z-10"
          animate={{ 
            width: ["0%", "100%", "0%"],
            left: ["0%", "0%", "100%"]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        <div className="py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          
          <div className="flex items-center gap-8 md:gap-16">
            {/* Minimal Brand Mark */}
            <div className="hidden md:flex flex-col items-center">
               <div className="w-px h-12 bg-white/5" />
               <div className="w-1.5 h-1.5 border border-gold rotate-45 my-2" />
               <div className="w-px h-12 bg-white/5" />
            </div>

            <div className="flex flex-col gap-3 text-center md:text-left">
              <span className="text-gold font-mono text-[10px] uppercase tracking-[0.5em] font-bold">
                Elite Collaboration
              </span>
              <h3 className="text-3xl md:text-5xl font-sans font-light text-white tracking-tighter uppercase leading-none">
                Bring Your <span className="font-black italic">Legacy</span> to life.
              </h3>
              <p className="text-white/30 text-xs font-light tracking-wide uppercase mt-2 hidden md:block">
                {subheading}
              </p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={PHYSICS.industrial}
          >
            <PrecisionBtn 
              variant="primary" 
              onClick={onClick}
              className="h-16 px-12"
            >
              {buttonLabel}
            </PrecisionBtn>
          </motion.div>

        </div>
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gold/10 blur-xl pointer-events-none" />
    </section>
  );
};