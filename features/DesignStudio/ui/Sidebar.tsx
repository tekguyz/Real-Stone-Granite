import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { STEPS } from '../model/types';
import { PHYSICS } from '../../../shared/lib/theme';

interface SidebarProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handleClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentStep, setCurrentStep, handleClose }) => {
  return (
    <div className="w-full lg:w-72 bg-surface lg:border-r border-b lg:border-b-0 border-white/5 flex flex-row lg:flex-col justify-between p-4 lg:p-10 relative z-10 flex-shrink-0">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-10" />
      
      <div className="relative z-20 w-full flex lg:block justify-between items-center">
        <div className="flex items-center gap-4 lg:mb-16">
          <div className="w-3 h-3 bg-gold rotate-45 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          <span className="font-mono font-bold text-white tracking-[0.2em] text-[10px] uppercase">Project Brief</span>
        </div>
        
        <div className="hidden lg:block space-y-2">
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`w-full group flex items-center justify-between p-5 text-left transition-all duration-300 border border-transparent outline-none ${
                currentStep === step.id 
                  ? 'bg-white/5 border-white/10 text-white' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <div className="flex flex-col">
                <span className={`font-mono text-[9px] font-bold tracking-widest uppercase mb-1 ${currentStep === step.id ? 'text-gold' : 'opacity-30'}`}>
                  Phase 0{step.id}
                </span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-light">{step.label}</span>
              </div>
              {currentStep === step.id && (
                <motion.div layoutId="stepDiamond" className="w-1.5 h-1.5 bg-gold rotate-45" transition={PHYSICS.snappy} />
              )}
            </button>
          ))}
        </div>

        <button onClick={handleClose} className="lg:hidden flex items-center justify-center text-text-muted hover:text-red-400 p-2">
          <X className="w-6 h-6" />
        </button>
      </div>

      <button onClick={handleClose} className="hidden lg:flex items-center gap-3 text-text-muted hover:text-red-400 transition-colors px-5 py-2 z-20 font-mono text-[10px] uppercase tracking-widest">
        <X className="w-4 h-4" />
        End Journey
      </button>
    </div>
  );
};