import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { ICONS, TEXTURES } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

interface FinalCTAProps {
  onStartProject?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartProject }) => {
  const { scrollYProgress } = useScroll();
  // Subtler parallax effect for better performance
  const yBg = useTransform(scrollYProgress, [0.5, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden border-t border-white/5 bg-black py-20">
      
      {/* 1. THE MATERIAL BASE (Parallax Slab) */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TEXTURES.QUARTZITE})` }}
        />
      </motion.div>

      {/* 2. ATMOSPHERIC GRADIENTS (Vignette) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black z-10" />

      {/* 3. TYPOGRAPHIC LOCKUP */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={PHYSICS.smooth}
        >
          {/* Top Label */}
          <div className="flex items-center justify-center gap-4 mb-8 md:mb-12 opacity-50">
            <div className="w-8 md:w-12 h-[1px] bg-gold/50" />
            <span className="text-gold font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold whitespace-nowrap">
              Project Finalization
            </span>
            <div className="w-8 md:w-12 h-[1px] bg-gold/50" />
          </div>

          {/* Main Headline - Responsive Text Sizing */}
          <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-sans font-light text-white tracking-tighter leading-[0.9] mb-12 md:mb-16">
            Crafted to <br className="hidden md:block"/>
            <span className="text-gold italic font-serif relative inline-block">
              Endure.
              {/* Subtle underline decoration */}
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-2 left-0 h-[2px] bg-gold opacity-50 hidden md:block"
              />
            </span>
          </h2>

          {/* CTA & Scroll Indicator */}
          <div className="flex flex-col items-center gap-10">
            {/* MOBILE FIX: Removed fixed width (min-w). 
                Used w-full max-w-md to ensure it fits small screens 
                but doesn't get huge on desktop.
            */}
            <PrecisionBtn 
              variant="primary" 
              onClick={onStartProject}
              className="w-full max-w-[280px] md:max-w-md h-14 md:h-16 text-sm md:text-lg shadow-[0_20px_60px_-15px_rgba(212,175,55,0.15)]"
            >
              Start Your Project
            </PrecisionBtn>
            
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 0.4 }}
               transition={{ delay: 1 }}
               className="flex flex-col items-center gap-2"
            >
               <span className="text-[8px] text-white font-mono uppercase tracking-[0.3em]">Directory</span>
               <div className="w-[1px] h-8 bg-white/20" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 4. THE SPEC STAMP (Responsive Placement) */}
      <div className="absolute bottom-6 left-6 z-30 opacity-40">
        <div className="flex flex-col border-l border-gold/30 pl-4">
          <span className="text-gold font-mono text-[9px] uppercase tracking-[0.2em]">
            Est. 1995
          </span>
          <span className="text-white/30 font-mono text-[8px] uppercase tracking-widest mt-1">
            Fort Pierce, FL
          </span>
        </div>
      </div>

      {/* 5. INDUSTRIAL WATERMARK (Right) */}
      <div className="absolute bottom-0 right-0 p-6 md:p-12 z-10 opacity-[0.03] pointer-events-none">
         <ICONS.Craft className="w-24 h-24 md:w-40 md:h-40 text-white transform rotate-12" />
      </div>

    </section>
  );
};