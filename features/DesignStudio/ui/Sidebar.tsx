
import React from 'react';
import { STEPS } from '../model/types';

interface SidebarProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handleClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentStep, setCurrentStep }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between py-10 px-0 relative z-10 flex-shrink-0">
      <div className="relative z-20 w-full flex flex-col items-start justify-between h-full">
        <div className="flex flex-col w-full space-y-0.5 px-0">
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
                  Step {step.id}
                </span>
                <span className="font-sans text-[13px] tracking-wide font-light">{step.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
