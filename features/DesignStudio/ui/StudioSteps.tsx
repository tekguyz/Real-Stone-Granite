
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, Lock, Loader2 } from 'lucide-react';
import { ProjectState, Recommendation } from '../../../entities/project/store';
import { PrecisionBtn } from '../../../shared/ui/PrecisionBtn';
import { StudioHeader } from './StudioHeader';
import { IdentityStep } from './steps/IdentityStep';
import { ScopeStep } from './steps/ScopeStep';
import { IntensityStep } from './steps/IntensityStep';
import { RecommendationStep } from './steps/RecommendationStep';
import { DetailsStep } from './steps/DetailsStep';
import { PHYSICS } from '../../../shared/lib/theme';

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
  shake?: boolean;
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
  shake,
  handlers,
  voice
}) => {
  return (
    <div className="flex-1 p-6 md:p-12 lg:px-24 lg:py-16 overflow-y-auto relative z-10 scrollbar-hide pb-32 lg:pb-24">
      <div className="max-w-3xl mx-auto">
        
        {/* Step Context moved entirely to StudioHeader for clarity and to remove clutter */}
        <StudioHeader currentStep={currentStep} />

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
            opacity: 1, 
            x: shake ? [-6, 6, -6, 6, -3, 3, 0] : 0 
          }}
          transition={shake ? { duration: 0.4, ease: "easeInOut" } : PHYSICS.smooth}
          className="relative min-h-[300px]"
        >
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
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto mt-16 flex justify-between border-t border-white/5 pt-10">
        <button 
          onClick={handlers.prevStep} 
          disabled={currentStep === 1 || isSubmitting} 
          className={`
            flex items-center gap-3 text-white/40 hover:text-gold font-mono text-[10px] tracking-[0.3em] uppercase transition-all group py-2 
            ${currentStep === 1 ? 'invisible opacity-0' : 'visible opacity-100'}
          `}
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        
        <div className="flex-shrink-0">
          {currentStep < 5 ? (
            <PrecisionBtn 
              variant={isStepValid ? "primary" : "secondary"}
              onClick={handlers.nextStep} 
              className={`h-14 px-12 transition-all ${!isStepValid ? 'opacity-40 hover:opacity-100 hover:border-gold/50 cursor-pointer' : ''}`}
              disabled={isSubmitting}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                {isStepValid ? "Continue" : "Tell us more to continue"}
              </span>
              {isStepValid ? (
                <ChevronRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              ) : (
                <Lock className="w-3.5 h-3.5 ml-3 opacity-30" />
              )}
            </PrecisionBtn>
          ) : (
            <PrecisionBtn 
              variant="primary" 
              onClick={handlers.handleSubmit} 
              disabled={!isStepValid || isSubmitting}
              className={`h-16 px-14 ${!isStepValid ? 'opacity-50' : 'shadow-2xl shadow-gold/20'}`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest font-bold">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  Sending...
                </div>
              ) : (
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">Talk to us</span>
              )}
            </PrecisionBtn>
          )}
        </div>
      </div>
    </div>
  );
};
