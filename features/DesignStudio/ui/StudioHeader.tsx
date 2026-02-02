import React from 'react';

interface StudioHeaderProps {
  currentStep: number;
}

const STEP_TITLES: Record<number, string> = {
  1: "Project Identity",
  2: "Defining the Scope",
  3: "Intended Usage",
  4: "Material Recommendation",
  5: "Refining Specifications"
};

export const StudioHeader: React.FC<StudioHeaderProps> = ({ currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4 opacity-70">
        <div className="w-6 h-[1px] bg-gold" />
        <div className="flex items-center gap-2">
          <span className="text-gold font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
            Project Phase
          </span>
          <div className="w-1 h-1 bg-gold/40 rotate-45" />
          <span className="text-white/60 font-mono text-[10px] tracking-[0.3em] uppercase">
            0{currentStep}
          </span>
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-sans font-medium tracking-tight leading-tight">
        {STEP_TITLES[currentStep] || "Project Details"}
      </h2>
    </div>
  );
};