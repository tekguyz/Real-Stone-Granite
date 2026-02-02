import React from 'react';
import { ChevronRight, ArrowLeft, Lock } from 'lucide-react';
import { ProjectState, Recommendation } from '../../../entities/project/store';
import { PrecisionBtn } from '../../../shared/ui/PrecisionBtn';
import { StudioHeader } from './StudioHeader';
import { IdentityStep } from './steps/IdentityStep';
import { ScopeStep } from './steps/ScopeStep';
import { IntensityStep } from './steps/IntensityStep';
import { RecommendationStep } from './steps/RecommendationStep';
import { DetailsStep } from './steps/DetailsStep';

interface StudioStepsProps {
  currentStep: number;
  state: ProjectState;
  dispatch: any;
  recommendation: Recommendation;
  timelineIndex: number;
  attachedFile: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isSubmitting: boolean;
  isStepValid: boolean;
  handlers: {
    handleFileClick: () => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    nextStep: () => void;
    prevStep: () => void;
  };
  voice: {
    isRecording: boolean;
    isProcessingAudio: boolean;
    toggleRecording: () => void;
  };
}

export const StudioSteps: React.FC<StudioStepsProps> = ({ 
  currentStep, 
  state, 
  dispatch, 
  recommendation, 
  timelineIndex, 
  attachedFile, 
  fileInputRef, 
  isSubmitting, 
  isStepValid,
  handlers,
  voice
}) => {
  return (
    <div className="flex-1 p-6 md:p-12 lg:px-24 lg:py-16 overflow-y-auto relative z-10 scrollbar-hide pb-32 lg:pb-24">
      <div className="max-w-3xl mx-auto">
        
        {/* Mobile Tracker */}
        <div className="lg:hidden mb-8 flex items-center gap-3">
          <span className="text-gold font-mono text-[10px] uppercase tracking-widest">Step 0{currentStep}</span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        <StudioHeader currentStep={currentStep} />

        {/* Form Content */}
        {currentStep === 1 && <IdentityStep state={state} dispatch={dispatch} />}
        {currentStep === 2 && <ScopeStep state={state} dispatch={dispatch} />}
        {currentStep === 3 && <IntensityStep state={state} dispatch={dispatch} />}
        {currentStep === 4 && <RecommendationStep state={state} dispatch={dispatch} recommendation={recommendation} />}
        {currentStep === 5 && (
          <DetailsStep 
            state={state} 
            dispatch={dispatch} 
            timelineIndex={timelineIndex} 
            attachedFile={attachedFile} 
            fileInputRef={fileInputRef} 
            isSubmitting={isSubmitting} 
            handlers={handlers} 
            voice={voice} 
          />
        )}
      </div>

      {/* Navigation Layer */}
      <div className="max-w-3xl mx-auto mt-12 flex justify-between border-t border-white/5 pt-8">
        <button 
          onClick={handlers.prevStep} 
          disabled={currentStep === 1 || isSubmitting} 
          className={`${currentStep === 1 ? 'invisible' : 'flex'} items-center gap-2 text-white/40 hover:text-white font-mono text-[10px] tracking-[0.3em] uppercase transition-colors group`}
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        
        {currentStep < 5 && (
          <PrecisionBtn 
            variant="secondary" 
            onClick={handlers.nextStep} 
            className={`h-12 px-8 group transition-all ${!isStepValid ? 'opacity-30 grayscale cursor-not-allowed border-white/5' : ''}`}
            disabled={!isStepValid}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
              {isStepValid ? "Continue" : "Selection Required"}
            </span>
            {isStepValid ? (
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            ) : (
              <Lock className="w-3 h-3 ml-2 opacity-50" />
            )}
          </PrecisionBtn>
        )}
      </div>
    </div>
  );
};