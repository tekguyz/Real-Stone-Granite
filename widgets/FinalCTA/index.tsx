import React from 'react';
import { motion } from 'framer-motion';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { TEXTURES } from '../../shared/assets';

interface FinalCTAProps {
  onStartProject?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartProject }) => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-black flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
      
      {/* 1. BACKGROUND TEXTURE (Subtle & Organic) */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-overlay">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TEXTURES.QUARTZITE})` }}
        />
      </div>

      {/* 2. LIGHTING (The 'Showroom' Spotlight Effect) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      {/* 3. CONTENT LAYER */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Simple Eyebrow Text */}
          <span className="block text-gold/80 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6 md:mb-8">
            EST. 1995 &mdash; Fort Pierce, FL
          </span>

          {/* Main Headline: Warm & Emotional */}
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-sans font-light text-white tracking-tight leading-[1.1] mb-6 md:mb-8">
            Ready to build <br className="hidden md:block" />
            <span className="text-gold font-serif italic">something permanent?</span>
          </h2>

          {/* Subtext: Clear Value Proposition */}
          <p className="text-white/60 text-sm md:text-lg font-light max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed">
            Skip the guesswork. Get a direct quote, a clear timeline, and a recommendation from the experts who built the Navy SEAL Memorial.
          </p>

          {/* The Button: Big, Clear, Clickable */}
          <div className="flex justify-center w-full">
            <PrecisionBtn 
              variant="primary" 
              onClick={onStartProject}
              className="w-full max-w-[300px] md:max-w-sm h-14 md:h-16 text-base md:text-lg shadow-2xl shadow-gold/10"
            >
              Start Your Project
            </PrecisionBtn>
          </div>

          {/* Trust Marker (Simple, not Technical) */}
          <div className="mt-16 md:mt-20 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 opacity-40">
             <div className="flex items-center gap-2">
                <span className="text-[10px] text-white uppercase tracking-widest">Family Owned</span>
             </div>
             <div className="hidden md:block w-1 h-1 bg-white rounded-full" />
             <div className="flex items-center gap-2">
                <span className="text-[10px] text-white uppercase tracking-widest">Custom Fabrication</span>
             </div>
             <div className="hidden md:block w-1 h-1 bg-white rounded-full" />
             <div className="flex items-center gap-2">
                <span className="text-[10px] text-white uppercase tracking-widest">Licensed & Insured</span>
             </div>
          </div>

        </motion.div>
      </div>

    </section>
  );
};