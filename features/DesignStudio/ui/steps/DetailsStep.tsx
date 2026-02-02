import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File as FileIcon, Mic, Loader2, Upload, Paperclip, Eye, Edit2 } from 'lucide-react';
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

export const DetailsStep: React.FC<DetailsStepProps> = ({ 
  state, 
  dispatch, 
  timelineIndex, 
  attachedFile, 
  fileInputRef, 
  isSubmitting, 
  handlers,
  voice
}) => {
  // Toggle between "Raw Edit" and "Smart Preview"
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

  // Auto-switch to preview if audio finishes processing
  React.useEffect(() => {
    if (!voice.isProcessingAudio && state.description.length > 0) {
      // Optional: Could auto-switch here, but let's leave user control
    }
  }, [voice.isProcessingAudio, state.description]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      
      {/* 1. TIMELINE SLIDER */}
      <div className="space-y-6">
        <div className="flex justify-between items-end border-b border-white/10 pb-2">
          <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Target Timeline</label>
          <span className="text-gold font-mono text-xs uppercase tracking-widest font-bold">{state.timeline}</span>
        </div>
        
        <div className="relative h-16 flex items-center">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2" />
            <motion.div 
              className="absolute top-1/2 left-0 h-[1px] bg-gold -translate-y-1/2" 
              initial={false} 
              animate={{ width: `${(timelineIndex / (TIMELINE_OPTIONS.length - 1)) * 100}%` }} 
              transition={PHYSICS.snappy} 
            />
            <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2 pointer-events-none">
              {TIMELINE_OPTIONS.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2.5 h-2.5 transition-colors duration-300 border border-primary rounded-full ${i <= timelineIndex ? 'bg-gold' : 'bg-surface border-white/20'}`} 
                />
              ))}
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
              <div className="flex w-full h-full">
                {TIMELINE_OPTIONS.map((opt, i) => (
                  <div key={i} className="flex-1 h-full cursor-pointer z-10" onClick={() => dispatch({ type: 'SET_TIMELINE', payload: opt })} />
                ))}
              </div>
            </div>
        </div>
      </div>

      {/* 2. PROJECT BRIEF (Smart Input Area) */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Project Brief</label>
          
          <div className="flex items-center gap-2">
            
            {/* View Toggle */}
            <div className="flex items-center bg-white/5 border border-white/10 p-1 mr-4">
              <button 
                onClick={() => setViewMode('edit')}
                className={`px-3 py-1 text-[9px] uppercase tracking-widest font-mono transition-all ${viewMode === 'edit' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
              >
                <span className="flex items-center gap-2"><Edit2 className="w-3 h-3" /> Input</span>
              </button>
              <button 
                onClick={() => setViewMode('preview')}
                disabled={!state.description}
                className={`px-3 py-1 text-[9px] uppercase tracking-widest font-mono transition-all ${viewMode === 'preview' ? 'bg-gold text-primary font-bold' : 'text-white/40 hover:text-white disabled:opacity-30'}`}
              >
                <span className="flex items-center gap-2"><Eye className="w-3 h-3" /> Preview</span>
              </button>
            </div>

            {/* Voice Control */}
            <AnimatePresence>
              {voice.isRecording && (
                  <motion.div 
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                  >
                      <motion.div 
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-red-500"
                      />
                      <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest font-bold">Rec</span>
                  </motion.div>
              )}
            </AnimatePresence>
             
            <motion.button 
              onClick={voice.toggleRecording}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={voice.isProcessingAudio}
              className={`flex items-center gap-2 px-3 py-1.5 border transition-all ${
                voice.isRecording 
                  ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-gold hover:border-gold'
              }`}
            >
                {voice.isProcessingAudio ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                    <Mic className="w-3 h-3" />
                )}
                <span className="text-[9px] uppercase tracking-widest font-mono">
                    {voice.isRecording ? "Stop" : "Dictate"}
                </span>
            </motion.button>
          </div>
        </div>
        
        {/* INPUT / PREVIEW CONTAINER */}
        <div className="relative group min-h-[250px]">
            {viewMode === 'edit' ? (
              <textarea 
                value={state.description}
                onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
                placeholder="Describe your vision, specific measurements, or requirements..."
                className={`w-full h-64 bg-surface border text-white font-mono text-sm p-6 outline-none resize-none transition-all placeholder:text-white/20 leading-relaxed custom-scrollbar ${
                    voice.isProcessingAudio ? 'border-gold opacity-50' : 'border-white/10 focus:border-gold/50'
                }`}
              />
            ) : (
              <div 
                className="w-full h-64 bg-surface/50 border border-gold/30 p-6 overflow-y-auto custom-scrollbar prose-stone"
                onClick={() => setViewMode('edit')} // Click to edit
              >
                {state.description ? (
                  <ReactMarkdown>{state.description}</ReactMarkdown>
                ) : (
                  <span className="text-white/20 italic">No specifications entered. Switch to Input mode to type or dictate.</span>
                )}
              </div>
            )}
            
            {/* Corner Accent */}
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 group-hover:border-gold transition-colors" />

            <AnimatePresence>
                {voice.isProcessingAudio && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20"
                    >
                        <Loader2 className="w-6 h-6 text-gold animate-spin" />
                        <span className="text-[10px] font-mono text-gold uppercase tracking-[0.2em] font-bold">Transcribing & Formatting...</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* 3. COMPACT UPLOAD SLOT */}
      <div className="space-y-4">
        <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Reference Assets (Optional)</label>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handlers.handleFileChange} accept=".dwg,.pdf,.jpg,.png" />
        
        <div 
          onClick={handlers.handleFileClick} 
          className={`
             relative h-16 w-full border border-dashed flex items-center justify-between px-6 cursor-pointer transition-all rounded-sm group
             ${attachedFile 
               ? 'border-gold bg-gold/5' 
               : 'border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/5'}
          `}
        >
          <div className="flex items-center gap-4">
             {attachedFile ? (
               <div className="w-8 h-8 bg-gold/10 flex items-center justify-center rounded-sm">
                  <FileIcon className="w-4 h-4 text-gold" strokeWidth={1.5} />
               </div>
             ) : (
               <div className="w-8 h-8 bg-white/5 flex items-center justify-center rounded-sm group-hover:bg-white/10 transition-colors">
                  <Upload className="w-4 h-4 text-white/40 group-hover:text-white" strokeWidth={1.5} />
               </div>
             )}
             
             <div className="flex flex-col">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${attachedFile ? 'text-white' : 'text-white/40 group-hover:text-white transition-colors'}`}>
                   {attachedFile || "Upload Plans / Drawings"}
                </span>
                {!attachedFile && (
                   <span className="text-[9px] text-white/20 uppercase tracking-widest hidden md:inline-block">PDF, DWG, JPG Supported</span>
                )}
             </div>
          </div>

          <div className="flex items-center gap-2">
             {attachedFile ? (
               <span className="text-[9px] font-mono text-gold uppercase tracking-widest font-bold">Attached</span>
             ) : (
               <Paperclip className="w-4 h-4 text-white/20 group-hover:text-gold transition-colors" />
             )}
          </div>
        </div>
      </div>

      {/* 4. SUBMIT ACTION */}
      <div className="pt-8">
          <PrecisionBtn variant="primary" className="w-full h-14" onClick={handlers.handleSubmit} disabled={isSubmitting || voice.isProcessingAudio} transition={PHYSICS.snappy}>
            {isSubmitting ? "Processing..." : "Submit Inquiry"}
          </PrecisionBtn>
      </div>
    </motion.div>
  );
};