
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File as FileIcon, Mic, Loader2, Upload } from 'lucide-react';
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
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      <div className="space-y-6">
        <div className="flex justify-between items-end border-b border-white/10 pb-2">
          <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Timeline</label>
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

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Project Notes</label>
          <div className="flex items-center gap-4">
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
                        <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest font-bold">Listening...</span>
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
                      {voice.isRecording ? "Finish" : "Dictate"}
                  </span>
              </motion.button>
          </div>
        </div>
        
        <div className="relative">
            <textarea 
              value={state.description}
              onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
              placeholder="Describe your vision, requirements, or special details..."
              className={`w-full h-32 bg-surface border text-white font-sans text-sm p-4 outline-none resize-none transition-all placeholder:text-white/20 leading-relaxed ${
                  voice.isProcessingAudio ? 'border-gold opacity-50' : 'border-white/10 focus:border-gold/50'
              }`}
            />
            <AnimatePresence>
                {voice.isProcessingAudio && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20"
                    >
                        <Loader2 className="w-5 h-5 text-gold animate-spin" />
                        <span className="text-[10px] font-mono text-gold uppercase tracking-[0.2em] font-bold">Drafting Notes...</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Upload Files</label>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handlers.handleFileChange} accept=".dwg,.pdf,.jpg,.png" />
        <div 
          onClick={handlers.handleFileClick} 
          className={`
             relative border border-dashed p-8 flex flex-col items-center justify-center text-center group cursor-pointer transition-all rounded-sm
             ${attachedFile 
               ? 'border-gold bg-gold/5' 
               : 'border-white/20 hover:border-gold/50 hover:bg-white/5'}
          `}
        >
          {attachedFile ? (
            <>
              <FileIcon className="w-6 h-6 mb-2 text-gold" strokeWidth={1} />
              <p className="font-mono text-xs text-white font-bold tracking-tight uppercase truncate max-w-xs">{attachedFile}</p>
            </>
          ) : (
            <>
              <Upload className="w-6 h-6 mb-2 text-white/40 group-hover:text-gold transition-colors" strokeWidth={1} />
              <p className="font-sans text-xs text-white uppercase tracking-widest font-bold">Select Files</p>
            </>
          )}
        </div>
      </div>

      <div className="pt-8">
          <PrecisionBtn variant="primary" className="w-full h-14" onClick={handlers.handleSubmit} disabled={isSubmitting || voice.isProcessingAudio} transition={PHYSICS.snappy}>
            {isSubmitting ? "Sending..." : "Submit Inquiry"}
          </PrecisionBtn>
      </div>
    </motion.div>
  );
};
