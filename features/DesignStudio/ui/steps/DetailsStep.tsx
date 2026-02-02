import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Loader2, Upload, Calendar, Clock, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ProjectState } from '../../../../entities/project/store';
import { TIMELINE_OPTIONS } from '../../model/types';
import { PrecisionBtn } from '../../../../shared/ui/PrecisionBtn';
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

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      
      {/* 1. TIMELINE SELECTOR (Phase Cards) */}
      <div className="space-y-4">
        <label className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] font-bold block">
          Implementation Phase
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {TIMELINE_OPTIONS.map((opt, i) => {
              const isActive = state.timeline === opt;
              const Icon = TIMELINE_ICONS[i];
              return (
                <button
                  key={opt}
                  onClick={() => dispatch({ type: 'SET_TIMELINE', payload: opt })}
                  className={`
                    p-4 flex flex-col items-center justify-center text-center gap-3 border transition-all outline-none rounded-none group min-h-[100px]
                    ${isActive 
                      ? 'bg-gold/10 border-gold text-white shadow-lg' 
                      : 'bg-transparent border-white/5 text-white/30 hover:border-white/20 hover:text-white'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'opacity-40'}`} strokeWidth={1.5} />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold leading-tight">
                    {opt.split('(')[0].trim()}
                  </span>
                  {opt.includes('(') && (
                    <span className="text-[8px] opacity-40 uppercase tracking-tighter">
                      {opt.match(/\(([^)]+)\)/)?.[1]}
                    </span>
                  )}
                </button>
              );
            })}
        </div>
      </div>

      {/* 2. PROJECT SPECIFICATION */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] font-bold">Specifications</label>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/5 border border-white/5 p-0.5">
              <button 
                onClick={() => setViewMode('edit')}
                className={`px-3 py-1 text-[8px] uppercase tracking-widest font-mono transition-all ${viewMode === 'edit' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'}`}
              >
                Input
              </button>
              <button 
                onClick={() => setViewMode('preview')}
                disabled={!state.description}
                className={`px-3 py-1 text-[8px] uppercase tracking-widest font-mono transition-all ${viewMode === 'preview' ? 'bg-gold/20 text-gold font-bold' : 'text-white/30 hover:text-white disabled:opacity-20'}`}
              >
                Preview
              </button>
            </div>

            <motion.button 
              onClick={voice.toggleRecording}
              whileTap={{ scale: 0.98 }}
              disabled={voice.isProcessingAudio}
              className={`flex items-center gap-2 px-3 py-1.5 border transition-all ${
                voice.isRecording 
                  ? 'bg-red-500/10 border-red-500 text-red-500' 
                  : 'bg-white/5 border-white/10 text-white/50 hover:text-gold hover:border-gold'
              }`}
            >
                {voice.isProcessingAudio ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Mic className="w-2.5 h-2.5" />}
                <span className="text-[8px] uppercase tracking-widest font-mono">Dictate</span>
            </motion.button>
          </div>
        </div>
        
        <div className="relative group">
            {viewMode === 'edit' ? (
              <textarea 
                value={state.description}
                onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
                placeholder="Include measurements, edge profile preferences, or architectural details..."
                className="w-full h-40 bg-surface border border-white/10 text-white font-sans text-sm p-5 outline-none resize-none transition-all placeholder:text-white/10 leading-relaxed custom-scrollbar focus:border-gold/30"
              />
            ) : (
              <div className="w-full h-40 bg-surface/40 border border-gold/20 p-5 overflow-y-auto custom-scrollbar prose-stone">
                <ReactMarkdown>{state.description}</ReactMarkdown>
              </div>
            )}
            
            <AnimatePresence>
                {voice.isProcessingAudio && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center gap-3 z-20"
                    >
                        <Loader2 className="w-5 h-5 text-gold animate-spin" />
                        <span className="text-[9px] font-mono text-gold uppercase tracking-widest font-bold">Verifying Specs...</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* 3. UPLOAD & SUBMIT */}
      <div className="space-y-6">
        <div 
          onClick={handlers.handleFileClick} 
          className={`
             h-12 w-full border border-dashed flex items-center justify-between px-5 cursor-pointer transition-all rounded-none group
             ${attachedFile ? 'border-gold bg-gold/5' : 'border-white/10 bg-white/[0.01] hover:bg-white/[0.03]'}
          `}
        >
          <div className="flex items-center gap-4">
             <Upload className={`w-3.5 h-3.5 ${attachedFile ? 'text-gold' : 'text-white/20'}`} />
             <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${attachedFile ? 'text-white' : 'text-white/30 group-hover:text-white'}`}>
                {attachedFile || "Attach Architectural Drawings"}
             </span>
          </div>
          {attachedFile && <div className="w-1.5 h-1.5 bg-gold rotate-45" />}
        </div>

        <div className="pt-2">
            <PrecisionBtn variant="primary" className="w-full h-14" onClick={handlers.handleSubmit} disabled={isSubmitting || voice.isProcessingAudio || !state.description}>
              {isSubmitting ? "Finalizing Plan..." : "Submit Project Plan"}
            </PrecisionBtn>
            {!state.description && (
              <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest text-center block mt-3">
                Project description required for submission
              </span>
            )}
        </div>
      </div>

      <input type="file" ref={fileInputRef} onChange={handlers.handleFileChange} hidden accept=".pdf,.dwg,.jpg,.png" />
    </motion.div>
  );
};