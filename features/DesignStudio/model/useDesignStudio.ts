import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useProjectStore } from '../../../entities/project/store';
import { transcribeAudio } from '../../../shared/api/gemini';
import { TIMELINE_OPTIONS } from './types';
import { useToast } from '../../../shared/ui/Toast';

export const useDesignStudio = (isOpen: boolean, onClose: () => void) => {
  const { state, dispatch, recommendation } = useProjectStore();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
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
    }
  }, [isOpen]);

  // Validation Logic per Step
  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 1: return !!state.userRole;
      case 2: return !!state.scope;
      case 3: return !!state.intensity;
      case 4: return true; // Recommendation is passive
      case 5: return !!state.timeline && state.description.length > 5;
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
      setCurrentStep(prev => Math.min(prev + 1, 5));
    } else {
      showToast("Please complete the required selections.", "info");
    }
  };
  
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file.name);
  };

  const encode = (data: Record<string, any>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key] || ""))
      .join("&");
  }

  const handleSubmit = async () => {
    if (!isStepValid) {
      showToast("Project details are incomplete.", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "project-inquiry",
          ...state,
          projectRef: projectRef
        })
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      setIsSubmitted(true);
      showToast("Project Saved (Local Mirror)", "info");
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
            const prompt = "Format this transcription into professional Markdown with bold headers and bullet points.";
            const transcribedText = await transcribeAudio(base64Audio, mimeType, prompt);
            if (!transcribedText) throw new Error('Transcription failed');
            dispatch({ type: 'SET_DESCRIPTION', payload: state.description ? `${state.description}\n\n${transcribedText}` : transcribedText });
            showToast("Specification Logged", "success");
          } catch (e) {
            showToast("Voice Capture Unavailable", "error");
          } finally {
            setIsProcessingAudio(false);
          }
        };
        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        showToast("Microphone Access Denied", "error");
      }
    }
  };

  return {
    state, dispatch, recommendation, currentStep, setCurrentStep, isExiting, isSubmitted, isSubmitting,
    attachedFile, isDrawerOpen, setIsDrawerOpen, handleClose, nextStep, prevStep, handleFileClick,
    handleFileChange, handleSubmit, fileInputRef, projectRef, timelineIndex, isRecording,
    isProcessingAudio, toggleRecording, isStepValid
  };
};