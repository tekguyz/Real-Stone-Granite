import React from 'react';
import { motion } from 'framer-motion';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { ICONS } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

interface PhilosophyProps {
  onStartProject?: () => void;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ onStartProject }) => {
  return (
    <section className="relative w-full min-h-[80vh] bg-primary overflow-hidden flex items-center justify-center py-32 border-t border-b border-white/5">
      
      {/* 1. BACKGROUND TEXTURE (Subtle Noise, No Grid) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      {/* 2. THE WATERMARK (Subtle Brand Element) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] overflow-hidden">
        <ICONS.Excellence className="w-[100vw] h-[100vw] md:w-[50vw] md:h-[50vw] text-white" strokeWidth={0.5} />
      </div>

      {/* 3. THE ARCHITECTURE */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between h-full gap-20">
        
        {/* Top Tier: VISION (The Concept) */}
        <div className="flex flex-col items-start relative">
          <motion.h2 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={PHYSICS.smooth}
            className="text-[12vw] md:text-[8rem] font-black font-sans uppercase leading-[0.8] tracking-tighter text-transparent select-none"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
          >
            From Vision
          </motion.h2>
          <div className="hidden md:block absolute left-2 -bottom-8 font-mono text-xs text-gold uppercase tracking-[0.3em] font-bold">
             Your Concept
          </div>
        </div>

        {/* The Connector (Vertical Gold Line) */}
        {/* Simple, static, elegant line. No rotating rings. */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[1px] bg-white/10 z-0 hidden md:block">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
        </div>

        {/* Middle Tier: THE ACTION (The Bridge) */}
        <div className="flex justify-center relative z-20 my-12 md:my-0">
          <div className="flex flex-col items-center gap-6">
            
            {/* The Precision Button */}
            <PrecisionBtn 
              variant="primary" 
              onClick={onStartProject}
              className="relative z-30 h-16 px-10 bg-gold text-primary border-gold hover:bg-white hover:text-primary transition-all duration-300 min-w-[280px]"
            >
              <span className="text-sm font-bold tracking-[0.2em] uppercase">
                Start Your Project
              </span>
            </PrecisionBtn>

            <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">
                Schedule a Consultation
            </span>

          </div>
        </div>

        {/* Bottom Tier: REALITY (The Product) */}
        <div className="flex flex-col items-end relative text-right">
           <motion.h2 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={PHYSICS.smooth}
            className="text-[12vw] md:text-[8rem] font-black font-sans uppercase leading-[0.8] tracking-tighter text-white select-none drop-shadow-2xl"
          >
            To Reality
          </motion.h2>
          <div className="hidden md:block absolute right-2 -top-8 font-mono text-xs text-gold uppercase tracking-[0.3em] font-bold">
             Our Craftsmanship
          </div>
        </div>

      </div>
    </section>
  );
};