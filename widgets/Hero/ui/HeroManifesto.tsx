import React from 'react';
import { motion } from 'framer-motion';
import { PrecisionBtn } from '../../../shared/ui/PrecisionBtn';
import { ICONS } from '../../../shared/assets';

interface HeroManifestoProps {
  onStartProject?: () => void;
  onExplore?: () => void;
}

// Architectural Stat Component: Masked Reveal (No Counting)
const StatItem = ({ value, label, delay }: { value: string, label: string, delay: number }) => (
  <div className="flex flex-col items-start justify-end h-full group">
    <div className="overflow-hidden relative">
      <motion.span 
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="block font-sans text-3xl lg:text-4xl font-light text-white tracking-tight"
      >
        {value}
      </motion.span>
    </div>
    {/* Decorative Line */}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 32 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
      className="h-[1px] bg-white/10 my-3 group-hover:bg-gold transition-colors duration-500" 
    />
    <motion.span 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: delay + 0.3 }}
      className="text-[10px] text-white/40 uppercase tracking-widest font-mono leading-tight"
    >
      {label}
    </motion.span>
  </div>
);

export const HeroManifesto: React.FC<HeroManifestoProps> = ({ onStartProject, onExplore }) => {
  return (
    <div className="w-full md:w-1/2 min-h-screen flex flex-col relative z-20 bg-primary border-r border-white/5">
      <div className="absolute top-0 left-8 w-[1px] h-full bg-white/5" />
      <div className="absolute top-0 right-8 w-[1px] h-full bg-white/5" />

      {/* Spacer for Navbar */}
      <div className="flex-none h-24 md:h-32" />

      {/* Main Content Area - Pushed to center vertically */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 flex-1 flex flex-col justify-center my-auto">
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

        {/* UPDATED COPY: THE PILLARS */}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans font-medium text-6xl lg:text-8xl text-white tracking-tighter leading-[0.9] mb-10"
        >
          Integrity <br/>
          Craftsmanship <br/>
          <span className="text-gold italic font-serif">Quality</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 font-light text-sm md:text-base leading-relaxed max-w-md mb-12 border-l border-gold/30 pl-6"
        >
          Defining the standard of stone fabrication since 1993. 
          Where old-world values meet modern precision engineering.
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

      {/* Stats Grid - Fixed, Architectural, No Counting */}
      <div className="w-full px-8 md:px-16 lg:px-24 border-t border-white/5 pt-8 pb-12 mt-auto relative z-10 bg-primary">
        <div className="grid grid-cols-3 gap-8">
          <StatItem value="20k" label="Sq. Ft. Facility" delay={0.1} />
          <StatItem value="30+" label="Years Active" delay={0.2} />
          <StatItem value="4.7" label="Google Rating" delay={0.3} />
        </div>
      </div>
    </div>
  );
};