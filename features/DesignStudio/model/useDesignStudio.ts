import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useProjectStore } from '../../../entities/project/store';
import { transcribeAudio } from '../../../shared/api/gemini';
import { TIMELINE_OPTIONS } from './types';
import { useToast } from '../../../shared/ui/Toast';
import { HAPTICS } from '../../../shared/lib/haptics';

export const useDesignStudio = (isOpen: boolean, onClose: () => void) => {
  const { state, dispatch, recommendation } = useProjectStore();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [shake, setShake] = useState(false);
  
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectRef = useMemo(() => Math.random().toString(36).substr(2, 9).toUpperCase(), [isOpen]);

  const timelineIndex = useMemo(() => TIMELINE_OPTIONS.indexOf(state.timeline), [state.timeline]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setIsExiting(false);
      setIsSubmitted(false);
      setIsRecording(false);
      setIsProcessingAudio(false);
      setShake(false);
    }
  }, [isOpen]);

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 1: return !!state.userRole;
      case 2: return !!state.scope;
      case 3: return !!state.intensity;
      case 4: return state.stonePreference !== 'Pending'; 
      case 5: return !!state.timeline && state.description.trim().length >= 10;
      default: return false;
    }
  }, [currentStep, state]);

  const handleClose = () => {
    if (isSubmitted) {
      dispatch({ type: 'RESET' });
    }
    setIsExiting(true);
    setTimeout(onClose, 500);
  };

  const nextStep = () => {
    if (isStepValid) {
      HAPTICS.click();
      setShake(false);
      setCurrentStep(prev => Math.min(prev + 1, 5));
    } else {
      HAPTICS.error();
      setShake(true);
      setTimeout(() => setShake(false), 500);
      
      const messages: Record<number, string> = {
        1: "Please identify your project type to continue.",
        2: "Please tell us which area we are designing.",
        3: "Please select the intended usage level.",
        4: "Please confirm your material selection.",
        5: "Please add a few more details (10 characters minimum)."
      };
      
      showToast(messages[currentStep] || "We need a few more details to start.", "info");
    }
  };
  
  const prevStep = () => {
    HAPTICS.click();
    setShake(false);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      HAPTICS.click();
      setAttachedFile(file.name);
    }
  };

  const encode = (data: Record<string, any>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key] || ""))
      .join("&");
  }

  const handleSubmit = async () => {
    if (!isStepValid) {
      HAPTICS.error();
      setShake(true);
      showToast("We need a few more details to start.", "error");
      return;
    }
    
    setIsSubmitting(true);
    HAPTICS.click();

    try {
      // Inject internal markers into form data for Netlify
      const formData = {
        "form-name": "project-inquiry",
        ...state,
        engagement: state.internalMarkers.engagement,
        disposition: state.internalMarkers.disposition,
        urgency: state.internalMarkers.urgency,
        projectRef: projectRef
      };

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(formData)
      });

      HAPTICS.success();
      setIsSubmitted(true);
      showToast("Project Plan Received", "success");
    } catch (error) {
      HAPTICS.success();
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(blob);
    });
  };

  const toggleRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        setIsProcessingAudio(true);
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
        const mediaRecorder = new MediaRecorder(stream, { mimeType });
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];
        mediaRecorder.ondataavailable = (e) => e.data.size > 0 && audioChunksRef.current.push(e.data);
        mediaRecorder.onstop = async () => {
          stream.getTracks().forEach(track => track.stop());
          const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
          try {
            const base64Audio = await blobToBase64(audioBlob);
            const result = await transcribeAudio(base64Audio, mimeType);
            
            if (!result.brief) throw new Error('Transcribe issue');
            
            // Sync visible content
            dispatch({ 
              type: 'SET_DESCRIPTION', 
              payload: state.description ? `${state.description}\n\n${result.brief}` : result.brief 
            });

            // Sync hidden technical markers
            dispatch({
              type: 'SET_INTERNAL_MARKERS',
              payload: {
                engagement: result.engagement,
                disposition: result.disposition,
                urgency: result.urgency
              }
            });

            HAPTICS.success();
            showToast("Vision Verified", "success");
          } catch (e) {
            HAPTICS.error();
            showToast("We couldn't hear you clearly. Please try again.", "error");
          } finally {
            setIsProcessingAudio(false);
          }
        };
        mediaRecorder.start();
        HAPTICS.click();
        setIsRecording(true);
      } catch (err) {
        HAPTICS.error();
        showToast("Microphone access denied.", "error");
      }
    }
  };

  return {
    state, dispatch, recommendation, currentStep, setCurrentStep, isExiting, isSubmitted, isSubmitting,
    attachedFile, isDrawerOpen, setIsDrawerOpen, handleClose, nextStep, prevStep, handleFileClick,
    handleFileChange, handleSubmit, fileInputRef, projectRef, timelineIndex, isRecording,
    isProcessingAudio, toggleRecording, isStepValid, shake
  };
};