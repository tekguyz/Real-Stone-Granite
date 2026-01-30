import { useState, useEffect, useMemo, useRef } from 'react';
import { useProjectStore } from '../../../entities/project/store';
import { TIMELINE_OPTIONS } from './types';

export const useDesignStudio = (isOpen: boolean, onClose: () => void) => {
  const { state, dispatch, recommendation } = useProjectStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectRef = useMemo(() => Math.random().toString(36).substr(2, 9).toUpperCase(), [isOpen]);

  const timelineIndex = useMemo(() => TIMELINE_OPTIONS.indexOf(state.timeline), [state.timeline]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setIsExiting(false);
      setIsSubmitted(false);
      setAttachedFile(null);
      dispatch({ type: 'RESET' });
    }
  }, [isOpen, dispatch]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 500);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file.name);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return {
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
    timelineIndex
  };
};