
import React from 'react';

interface StudioHeaderProps {
  currentStep: number;
}

const STEP_TITLES: Record<number, string> = {
  1: "Initiate Consultant Profile",
  2: "Define Project Context",
  3: "Calibrate Usage Physics",
  4: "Material Intelligence",
  5: "Final Specifications"
};

export const StudioHeader: React.FC<StudioHeaderProps> = ({ currentStep }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4 opacity-50">
        <div className="w-8 h-[1px] bg-gold" />
        <span className="text-gold font-mono text-[10px] tracking-[0.3em] uppercase">
          Consultation Mode // 0{currentStep}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-sans font-light tracking-tight leading-tight">
        {STEP_TITLES[currentStep] || "Project Details"}
      </h2>
    </div>
  );
};
