import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectProvider } from '../../entities/project/store';
import { SuccessView } from './SuccessView';
import { useDesignStudio } from './model/useDesignStudio';
import { Sidebar } from './ui/Sidebar';
import { SummaryPanel } from './ui/SummaryPanel';
import { MobileSummaryDrawer } from './ui/MobileDrawer';
import { StudioSteps } from './ui/StudioSteps';
import { PHYSICS } from '../../shared/lib/theme';

interface DesignStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudioContent: React.FC<DesignStudioProps> = ({ isOpen, onClose }) => {
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
    toggleRecording
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
          className="fixed inset-0 z-[100] bg-primary flex flex-col lg:flex-row overflow-hidden h-[100dvh]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {isSubmitted ? (
            <SuccessView onClose={handleClose} projectRef={projectRef} />
          ) : (
            <>
              <Sidebar 
                currentStep={currentStep} 
                setCurrentStep={setCurrentStep} 
                handleClose={handleClose} 
              />

              <StudioSteps 
                currentStep={currentStep}
                state={state}
                dispatch={dispatch}
                recommendation={recommendation}
                timelineIndex={timelineIndex}
                attachedFile={attachedFile}
                fileInputRef={fileInputRef}
                isSubmitting={isSubmitting}
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

              <SummaryPanel 
                state={state} 
                recommendation={recommendation} 
                projectRef={projectRef} 
                currentStep={currentStep} 
              />

              <MobileSummaryDrawer 
                isOpen={isDrawerOpen} 
                onToggle={() => setIsDrawerOpen(!isDrawerOpen)} 
                state={state} 
                recommendation={recommendation} 
                projectRef={projectRef} 
              />
            </>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DesignStudio = (props: DesignStudioProps) => (
  <ProjectProvider>
    <StudioContent {...props} />
  </ProjectProvider>
);