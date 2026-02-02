
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SuccessView } from './SuccessView';
import { useDesignStudio } from './model/useDesignStudio';
import { Sidebar } from './ui/Sidebar';
import { SummaryPanel } from './ui/SummaryPanel';
import { MobileSummaryDrawer } from './ui/MobileDrawer';
import { StudioSteps } from './ui/StudioSteps';
import { PHYSICS } from '../../shared/lib/theme';
import { ICONS } from '../../shared/assets';

interface DesignStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignStudio: React.FC<DesignStudioProps> = ({ isOpen, onClose }) => {
  const {
    state,
    dispatch,
    recommendation,
    currentStep,
    setCurrentStep,
    isExiting,
    isSubmitted,
    isSubmitting,
    attachedFile,
    isDrawerOpen,
    setIsDrawerOpen,
    handleClose,
    nextStep,
    prevStep,
    handleFileClick,
    handleFileChange,
    handleSubmit,
    fileInputRef,
    projectRef,
    timelineIndex,
    isRecording,
    isProcessingAudio,
    toggleRecording,
    isStepValid
  } = useDesignStudio(isOpen, onClose);

  if (!isOpen && !isExiting) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={PHYSICS.snappy}
          className="fixed inset-0 z-[20000] bg-primary flex flex-col overflow-hidden h-[100dvh] text-white isolate-layer gpu-accel"
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          </div>

          <div className="h-16 md:h-20 w-full bg-primary border-b border-white/5 flex items-center justify-between px-6 md:px-12 flex-shrink-0 relative z-50">
             <div className="flex items-center gap-4">
                <span className="hidden md:block font-sans font-bold text-lg tracking-tight text-white">Project Planner</span>
                <span className="font-mono text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest px-2 py-1 border border-white/10 rounded-sm">
                   Planning Phase
                </span>
             </div>

             <button 
               onClick={handleClose} 
               className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
             >
               <span className="hidden md:block font-mono text-[10px] uppercase tracking-widest group-hover:text-gold transition-colors">Close Studio</span>
               <div className="p-2 border border-white/10 group-hover:border-gold/50 rounded-full transition-colors">
                  <ICONS.Close className="w-4 h-4 group-hover:text-gold transition-colors" />
               </div>
             </button>
          </div>

          {isSubmitted ? (
            <SuccessView onClose={handleClose} projectRef={projectRef} />
          ) : (
            <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative z-10">
              {/* Sidebar is now hidden on mobile (below lg breakpoint) */}
              <div className="hidden lg:flex lg:col-span-2 border-r border-white/5 bg-primary/50 flex flex-col relative z-20 backdrop-blur-sm">
                  <Sidebar 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep} 
                    handleClose={handleClose} 
                  />
              </div>

              <div className="lg:col-span-7 relative flex flex-col overflow-hidden bg-primary">
                 <StudioSteps 
                    currentStep={currentStep}
                    state={state}
                    dispatch={dispatch}
                    recommendation={recommendation}
                    timelineIndex={timelineIndex}
                    attachedFile={attachedFile}
                    fileInputRef={fileInputRef}
                    isSubmitting={isSubmitting}
                    isStepValid={isStepValid}
                    handlers={{
                      handleFileClick,
                      handleFileChange,
                      handleSubmit,
                      nextStep,
                      prevStep
                    }}
                    voice={{
                      isRecording,
                      isProcessingAudio,
                      toggleRecording
                    }}
                  />
              </div>

              <div className="hidden lg:flex lg:col-span-3 border-l border-white/5 bg-primary/50 flex-col relative z-20 backdrop-blur-sm">
                  <SummaryPanel 
                    state={state} 
                    recommendation={recommendation} 
                    projectRef={projectRef} 
                    currentStep={currentStep} 
                  />
              </div>

              <MobileSummaryDrawer 
                isOpen={isDrawerOpen} 
                onToggle={() => setIsDrawerOpen(!isDrawerOpen)} 
                state={state} 
                recommendation={recommendation} 
                projectRef={projectRef} 
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
