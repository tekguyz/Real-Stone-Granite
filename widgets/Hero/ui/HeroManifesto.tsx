
import React from 'react';
import { motion } from 'framer-motion';
import { PrecisionBtn } from '../../../shared/ui/PrecisionBtn';
import { ICONS } from '../../../shared/assets';

interface HeroManifestoProps {
  onStartProject?: () => void;
  onExplore?: () => void;
}

export const HeroManifesto: React.FC<HeroManifestoProps> = ({ onStartProject, onExplore }) => {
  return (
    <div className="w-full md:w-1/2 h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 relative z-20 bg-primary border-r border-white/5">
      <div className="absolute top-0 left-8 w-[1px] h-full bg-white/5" />
      <div className="absolute top-0 right-8 w-[1px] h-full bg-white/5" />

      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-2 h-2 bg-gold" />
          <span className="font-mono text-gold text-[10px] uppercase tracking-[0.3em] font-bold">
            Est. 1993 // Fort Pierce
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans font-medium text-6xl lg:text-8xl text-white tracking-tighter leading-[0.9] mb-10"
        >
          Weight. <br/>
          Permanence. <br/>
          <span className="text-gold italic font-serif">Legacy.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 font-light text-sm md:text-base leading-relaxed max-w-md mb-12 border-l border-gold/30 pl-6"
        >
          We don't just fabricate stone; we curate geological history. 
          South Florida's authority on natural stone architecture for over 30 years.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-6"
        >
          <PrecisionBtn variant="primary" onClick={onStartProject} className="h-14">
            Start Project
          </PrecisionBtn>
          
          <button onClick={onExplore} className="group flex items-center gap-3 text-white/50 hover:text-gold transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-widest">Explore Stone</span>
            <ICONS.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-0 w-full px-16 flex gap-12 border-t border-white/5 pt-8">
        <div>
          <span className="block text-2xl text-white font-light">30+</span>
          <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono">Years</span>
        </div>
        <div>
          <span className="block text-2xl text-white font-light">5k+</span>
          <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono">Projects</span>
        </div>
      </div>
    </div>
  );
};
