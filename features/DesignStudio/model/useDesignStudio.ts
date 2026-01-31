import { useState, useEffect, useMemo, useRef } from 'react';
import { useProjectStore } from '../../../entities/project/store';
import { transcribeAudio } from '../../../shared/api/gemini';
import { TIMELINE_OPTIONS } from './types';

export const useDesignStudio = (isOpen: boolean, onClose: () => void) => {
  const { state, dispatch, recommendation } = useProjectStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Audio Recording State
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
      setAttachedFile(null);
      setIsRecording(false);
      setIsProcessingAudio(false);
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

  // --- Voice Input Logic ---

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.readAsDataURL(blob);
    });
  };

  const toggleRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
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

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          stream.getTracks().forEach(track => track.stop());
          const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
          
          try {
            const base64Audio = await blobToBase64(audioBlob);
            const prompt = "You are a Secretary for a Stone Fabricator. Listen to this client's voice note and transcribe it into a clean, bulleted list of project requirements. Remove 'umms' and filler words. Keep it strictly professional.";
            
            const transcribedText = await transcribeAudio(base64Audio, mimeType, prompt);

            if (!transcribedText) throw new Error('Transcription failed');
            
            const currentDesc = state.description;
            const newDesc = currentDesc ? `${currentDesc}\n\n${transcribedText}` : transcribedText;
            
            dispatch({ type: 'SET_DESCRIPTION', payload: newDesc });

          } catch (error) {
            console.error("Audio processing error:", error);
            alert("We could not process your voice note at this time. Please try typing your requirements.");
          } finally {
            setIsProcessingAudio(false);
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access denied:", err);
        alert("Please enable microphone access to use the Smart Voice Input feature.");
      }
    }
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
    timelineIndex,
    isRecording,
    isProcessingAudio,
    toggleRecording
  };
};