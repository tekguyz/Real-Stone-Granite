
import React from 'react';
import { X } from 'lucide-react';
import { STEPS } from '../model/types';

interface SidebarProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handleClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentStep, setCurrentStep, handleClose }) => {
  return (
    <div className="w-full h-full flex flex-row lg:flex-col justify-between p-4 lg:py-10 lg:px-0 relative z-10 flex-shrink-0">
      
      <div className="relative z-20 w-full flex lg:flex-col lg:items-start justify-between items-center h-full">
        
        {/* Mobile Title */}
        <div className="lg:hidden flex items-center gap-4">
          <span className="font-mono font-bold text-white tracking-[0.2em] text-[10px] uppercase">Navigation</span>
        </div>
        
        <div className="hidden lg:flex flex-col w-full space-y-0.5 px-0">
          <span className="font-mono text-gold text-[9px] uppercase tracking-[0.4em] font-bold mb-6 pl-8">
            Outline
          </span>
          
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`w-full group flex items-center py-4 px-8 text-left transition-all duration-300 border-r-2 outline-none ${
                currentStep === step.id 
                  ? 'border-gold bg-white/5 text-white' 
                  : 'border-transparent text-white/30 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex flex-col">
                <span className={`font-mono text-[9px] font-bold tracking-[0.2em] uppercase mb-0.5 ${currentStep === step.id ? 'text-gold' : 'opacity-30'}`}>
                  Phase {step.id}
                </span>
                <span className="font-sans text-[13px] tracking-wide font-light">{step.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile Close */}
        <button onClick={handleClose} className="lg:hidden flex items-center justify-center text-white/60 hover:text-white p-2">
          <X className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};
