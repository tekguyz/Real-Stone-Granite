import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Loader2, Upload, Calendar, Clock, Zap, MessageSquareQuote } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ProjectState } from '../../../../entities/project/store';
import { TIMELINE_OPTIONS } from '../../model/types';
import { PHYSICS } from '../../../../shared/lib/theme';

interface DetailsStepProps {
  state: ProjectState;
  dispatch: any;
  timelineIndex: number;
  attachedFile: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isSubmitting: boolean;
  handlers: {
    handleFileClick: () => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
  };
  voice: {
    isRecording: boolean;
    isProcessingAudio: boolean;
    toggleRecording: () => void;
  };
}

const TIMELINE_ICONS: Record<number, any> = {
  0: Zap,
  1: Calendar,
  2: Clock
};

export const DetailsStep: React.FC<DetailsStepProps> = ({ 
  state, 
  dispatch, 
  attachedFile, 
  fileInputRef, 
  isSubmitting, 
  handlers,
  voice
}) => {
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const descLength = state.description.trim().length;
  const isDescValid = descLength >= 10;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      
      {/* 1. TIMELINE SELECTOR */}
      <div className="space-y-5">
        <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] font-bold block mb-4">
          Implementation Phase
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TIMELINE_OPTIONS.map((opt, i) => {
              const isActive = state.timeline === opt;
              const Icon = TIMELINE_ICONS[i];
              return (
                <button
                  key={opt}
                  onClick={() => dispatch({ type: 'SET_TIMELINE', payload: opt })}
                  className={`
                    p-6 flex flex-col items-center justify-center text-center gap-4 border transition-all outline-none rounded-none group min-h-[130px]
                    ${isActive 
                      ? 'bg-gold/10 border-gold text-white shadow-xl shadow-gold/5' 
                      : 'bg-transparent border-white/5 text-white/20 hover:border-white/20 hover:text-white'}
                  `}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-gold' : 'opacity-20 group-hover:opacity-100'}`} strokeWidth={1.5} />
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold leading-tight">
                      {opt.split('(')[0].trim()}
                    </span>
                    {opt.includes('(') && (
                      <span className="text-[9px] opacity-40 uppercase tracking-tighter font-mono">
                        {opt.match(/\(([^)]+)\)/)?.[1]}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
        </div>
      </div>

      {/* 2. PROJECT SPECIFICATION */}
      <div className="space-y-5 pt-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] font-bold block">
              Project Notes
            </label>
            <div className="flex items-center gap-3">
              <div className={`h-1.5 w-1.5 rounded-full ${isDescValid ? 'bg-gold' : 'bg-white/10'}`} />
              <span className={`text-[9px] font-mono uppercase tracking-widest ${isDescValid ? 'text-gold' : 'text-white/20'}`}>
                Detail Level: {descLength} / 10
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-black/40 border border-white/10 p-1">
              <button 
                onClick={() => setViewMode('edit')}
                className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-mono transition-all ${viewMode === 'edit' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'}`}
              >
                Draft
              </button>
              <button 
                onClick={() => setViewMode('preview')}
                disabled={!state.description}
                className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-mono transition-all ${viewMode === 'preview' ? 'bg-gold/20 text-gold font-bold' : 'text-white/30 hover:text-white disabled:opacity-20'}`}
              >
                Review
              </button>
            </div>

            <motion.button 
              onClick={voice.toggleRecording}
              whileTap={{ scale: 0.96 }}
              disabled={voice.isProcessingAudio}
              className={`flex items-center gap-4 px-6 py-2.5 border transition-all ${
                voice.isRecording 
                  ? 'bg-red-500/10 border-red-500 text-red-500 animate-pulse' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-gold hover:border-gold'
              }`}
            >
                {voice.isProcessingAudio ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mic className={`w-3.5 h-3.5 ${voice.isRecording ? 'text-red-500' : ''}`} strokeWidth={2} />}
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold">
                  {voice.isRecording ? 'Listening...' : 'Dictate'}
                </span>
            </motion.button>
          </div>
        </div>
        
        <div className="relative group overflow-hidden border border-white/10 focus-within:border-gold/40 transition-all bg-surface/30">
            {viewMode === 'edit' ? (
              <textarea 
                value={state.description}
                onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
                placeholder="Detail the intended edge profiles, vein transitions, or structural requirements..."
                className="w-full h-56 bg-transparent text-white font-sans text-sm p-8 outline-none resize-none transition-all placeholder:text-white/10 leading-relaxed custom-scrollbar"
              />
            ) : (
              <div className="w-full h-56 bg-transparent p-8 overflow-y-auto custom-scrollbar prose-stone border-l-2 border-gold/30">
                <ReactMarkdown>{state.description}</ReactMarkdown>
              </div>
            )}
            
            <AnimatePresence>
                {voice.isProcessingAudio && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 z-20"
                    >
                        <div className="relative">
                          <Loader2 className="w-10 h-10 text-gold animate-spin" />
                          <MessageSquareQuote className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                        </div>
                        <span className="text-[11px] font-mono text-gold uppercase tracking-[0.4em] font-bold">Writing notes...</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* 3. UPLOAD COMPONENT */}
      <div className="pt-6">
        <div 
          onClick={handlers.handleFileClick} 
          className={`
             h-20 w-full border border-dashed flex items-center justify-between px-8 cursor-pointer transition-all rounded-none group
             ${attachedFile ? 'border-gold bg-gold/5' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/40'}
          `}
        >
          <div className="flex items-center gap-6">
             <Upload className={`w-5 h-5 ${attachedFile ? 'text-gold' : 'text-white/20 group-hover:text-white'}`} />
             <div className="flex flex-col">
                <span className={`text-[11px] font-mono font-bold uppercase tracking-widest ${attachedFile ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                    {attachedFile || "Attach Blueprints / Reference Imagery"}
                </span>
                {!attachedFile && (
                  <span className="text-[9px] font-mono text-white/10 uppercase tracking-tighter">PDF, DWG, or JPG accepted.</span>
                )}
             </div>
          </div>
          {attachedFile && <div className="w-2.5 h-2.5 bg-gold rotate-45" />}
        </div>
      </div>

      <input type="file" ref={fileInputRef} onChange={handlers.handleFileChange} hidden accept=".pdf,.dwg,.jpg,.png" />
    </motion.div>
  );
};