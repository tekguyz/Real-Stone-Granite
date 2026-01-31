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
    <div className="w-full h-full flex flex-row lg:flex-col justify-between p-4 lg:py-12 lg:px-0 relative z-10 flex-shrink-0">
      
      <div className="relative z-20 w-full flex lg:flex-col lg:items-start justify-between items-center h-full">
        
        {/* Mobile Title */}
        <div className="lg:hidden flex items-center gap-4">
          <span className="font-mono font-bold text-white tracking-[0.2em] text-[10px] uppercase">Steps</span>
        </div>
        
        <div className="hidden lg:flex flex-col w-full space-y-1 px-4">
          <span className="font-mono text-gold text-[10px] uppercase tracking-widest font-bold mb-6 pl-4">
            Progress
          </span>
          
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`w-full group flex items-center justify-between py-4 px-4 text-left transition-all duration-300 border-l-2 outline-none ${
                currentStep === step.id 
                  ? 'border-gold bg-white/5 text-white' 
                  : 'border-transparent text-white/40 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex flex-col">
                <span className={`font-mono text-[10px] font-medium tracking-widest uppercase mb-1 ${currentStep === step.id ? 'text-gold' : 'opacity-40'}`}>
                  0{step.id}
                </span>
                <span className="font-sans text-sm tracking-wide font-light">{step.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile Close */}
        <button onClick={handleClose} className="lg:hidden flex items-center justify-center text-white/60 hover:text-white p-2">
          <X className="w-6 h-6" />
        </button>

      </div>
    </div>
  );
};