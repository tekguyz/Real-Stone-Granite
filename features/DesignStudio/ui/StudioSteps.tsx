import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, User, Briefcase, Box, Ruler, Upload, File as FileIcon, Mic, Loader2 } from 'lucide-react';
import { UserRole, FabricationLevel, ProjectState, Recommendation } from '../../../entities/project/store';
import { TIMELINE_OPTIONS } from '../model/types';
import { PrecisionBtn } from '../../../shared/ui/PrecisionBtn';
import { Button } from '../../../shared/ui/Button';
import { PHYSICS } from '../../../shared/lib/theme';

interface StudioStepsProps {
  currentStep: number;
  state: ProjectState;
  dispatch: any;
  recommendation: Recommendation;
  timelineIndex: number;
  attachedFile: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isSubmitting: boolean;
  handlers: {
    handleFileClick: () => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    nextStep: () => void;
    prevStep: () => void;
  };
  voice: {
    isRecording: boolean;
    isProcessingAudio: boolean;
    toggleRecording: () => void;
  };
}

export const StudioSteps: React.FC<StudioStepsProps> = ({ 
  currentStep, 
  state, 
  dispatch, 
  recommendation, 
  timelineIndex, 
  attachedFile, 
  fileInputRef, 
  isSubmitting, 
  handlers,
  voice
}) => {
  return (
    <div className="flex-1 p-6 md:p-12 lg:p-24 overflow-y-auto relative z-10 scrollbar-hide pb-32 lg:pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="lg:hidden mb-8 flex items-center gap-3">
            <span className="text-gold font-mono text-[10px] uppercase tracking-widest">Phase 0{currentStep}</span>
            <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        <div className="mb-12">
          <span className="text-gold font-mono text-[11px] tracking-[0.3em] uppercase block mb-3 opacity-50">Expert Consultation</span>
          <h2 className="text-3xl md:text-5xl text-white font-sans font-light tracking-tight uppercase leading-tight">
            {currentStep === 1 && "Define the project identity."}
            {currentStep === 2 && "Select the fabrication tier."}
            {currentStep === 3 && "Professional Suggestion."}
            {currentStep === 4 && "Logistics & Implementation."}
          </h2>
        </div>

        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {[
                { role: 'Private Residence', icon: User, desc: 'Personal home projects' },
                { role: 'Professional Partner', icon: Briefcase, desc: 'Architects and Designers' }
              ].map((item) => (
                <motion.button
                  key={item.role}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => dispatch({ type: 'SET_USER_ROLE', payload: item.role as UserRole })}
                  className={`group p-8 border text-left transition-all outline-none flex flex-col justify-between min-h-[200px] ${
                    state.userRole === item.role 
                      ? 'border-gold bg-gold/5 text-white' 
                      : 'border-white/10 text-text-muted hover:border-white/30 bg-surface/50'
                  }`}
                >
                  <item.icon className={`w-8 h-8 ${state.userRole === item.role ? 'text-gold' : 'text-text-muted group-hover:text-white'}`} />
                  <div className="mt-8">
                    <span className="block font-sans text-xl font-light mb-1">{item.role}</span>
                    <span className="text-[11px] font-sans text-text-muted uppercase tracking-wider">{item.desc}</span>
                  </div>
                </motion.button>
              ))}
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {[
                { id: 'Classic Selection', icon: Box, title: 'Classic Selection', desc: 'Refined standard finishing. Focused on the raw, natural beauty of the slab.' },
                { id: 'Artisan Masterpiece', icon: Ruler, title: 'Artisan Masterpiece', desc: 'Complex structural details and architectural cladding for unique statements.' }
              ].map(tier => (
                <button
                  key={tier.id}
                  onClick={() => dispatch({ type: 'SET_FABRICATION_LEVEL', payload: tier.id as FabricationLevel })}
                  className={`p-8 border flex items-start gap-8 transition-all outline-none ${
                    state.fabricationLevel === tier.id 
                      ? 'border-gold bg-gold/5 text-white' 
                      : 'border-white/10 text-text-muted hover:border-white/30'
                  }`}
                >
                    <tier.icon className={`w-10 h-10 flex-shrink-0 ${state.fabricationLevel === tier.id ? 'text-gold' : 'opacity-40'}`} />
                    <div className="text-left">
                      <span className="block font-sans text-2xl font-light mb-2">{tier.title}</span>
                      <p className="text-sm font-sans text-text-muted leading-relaxed max-w-lg">{tier.desc}</p>
                    </div>
                </button>
              ))}
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-8 border border-gold/30 bg-gold/5 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-gold rotate-45" />
                  <span className="text-gold font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Consultant Suggestion</span>
              </div>
              <h4 className="text-white text-3xl font-sans font-light mb-4">
                  Recommended: <span className="text-gold">{recommendation.material}</span>
              </h4>
              <p className="text-text-muted text-lg leading-relaxed font-sans font-light border-l border-gold/20 pl-8">
                  {recommendation.reason}
              </p>
            </div>

            <div className="space-y-4">
                <label className="text-[10px] font-sans text-text-muted uppercase tracking-[0.3em] font-medium">Explore Alternative Portfolios</label>
                <div className="flex flex-wrap gap-3">
                  {['Granite', 'Marble', 'Quartzite', 'Quartz', 'Dekton', 'Onyx'].map(m => (
                    <motion.button
                      key={m}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => dispatch({ type: 'SET_STONE_PREFERENCE', payload: m })}
                      className={`px-6 py-3 text-[10px] uppercase tracking-widest font-sans border transition-all outline-none ${
                        state.stonePreference === m
                          ? 'bg-gold text-primary border-gold font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                          : 'bg-transparent text-text-muted border-white/10 hover:border-white/30'
                      }`}
                    >
                      {m}
                    </motion.button>
                  ))}
                </div>
            </div>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            
            {/* Timeline Selection */}
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <label className="text-[11px] font-sans text-text-muted uppercase tracking-[0.3em]">Project Timeline</label>
                <span className="text-gold font-mono text-sm uppercase tracking-widest">{state.timeline}</span>
              </div>
              <div className="relative h-20 flex items-center px-1">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2" />
                  <motion.div className="absolute top-1/2 left-0 h-[1px] bg-gold -translate-y-1/2" initial={false} animate={{ width: `${(timelineIndex / (TIMELINE_OPTIONS.length - 1)) * 100}%` }} transition={PHYSICS.snappy} />
                  <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2 pointer-events-none">
                    {TIMELINE_OPTIONS.map((_, i) => (
                      <div key={i} className={`w-1 h-1 rotate-45 transition-colors duration-500 ${i <= timelineIndex ? 'bg-gold' : 'bg-white/10'}`} />
                    ))}
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center">
                    <div className="flex w-full h-full">
                      {TIMELINE_OPTIONS.map((opt, i) => (
                        <div key={i} className="flex-1 h-full cursor-pointer z-10" onClick={() => dispatch({ type: 'SET_TIMELINE', payload: opt })} />
                      ))}
                    </div>
                    <motion.div className="absolute w-4 h-4 bg-gold shadow-[0_0_20px_rgba(212,175,55,0.6)] z-20 pointer-events-none rotate-45" initial={false} animate={{ left: `calc(${(timelineIndex / (TIMELINE_OPTIONS.length - 1)) * 100}% - 8px)` }} whileTap={{ scale: 1.2 }} transition={PHYSICS.snappy} />
                  </div>
              </div>
            </div>

            {/* Smart Voice Description Input */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-sans text-text-muted uppercase tracking-[0.3em]">Project Description</label>
                <div className="flex items-center gap-2">
                   {voice.isRecording && (
                     <div className="flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"/>
                       <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest">Recording</span>
                     </div>
                   )}
                   {voice.isProcessingAudio && (
                     <span className="text-[9px] font-mono text-gold uppercase tracking-widest animate-pulse">Processing...</span>
                   )}
                </div>
              </div>
              
              <div className="relative group">
                <textarea 
                  value={state.description}
                  onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
                  placeholder="Describe your vision, specific measurements, or special requirements..."
                  className="w-full h-40 bg-surface/30 border border-white/10 text-white font-sans text-sm font-light p-6 focus:border-gold/50 outline-none resize-none transition-colors"
                />
                
                <motion.button 
                  onClick={voice.toggleRecording}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={voice.isProcessingAudio}
                  className={`absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-none border transition-all z-20 ${
                    voice.isRecording 
                      ? 'bg-red-500/10 border-red-500 text-red-500' 
                      : 'bg-gold/10 border-gold/30 text-gold hover:bg-gold hover:text-primary'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {voice.isProcessingAudio ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <motion.div
                        key={voice.isRecording ? 'stop' : 'mic'}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                         <Mic className={`w-4 h-4 ${voice.isRecording ? 'animate-pulse' : ''}`} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {voice.isRecording && (
                    <span className="absolute inset-0 rounded-none border border-red-500 animate-ping opacity-20" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <label className="text-[11px] font-sans text-text-muted uppercase tracking-[0.3em]">Technical Specifications</label>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handlers.handleFileChange} accept=".dwg,.pdf,.jpg,.png" />
              <div onClick={handlers.handleFileClick} className={`border border-white/10 bg-surface/30 p-12 flex flex-col items-center justify-center text-center group cursor-pointer transition-all border-dashed ${attachedFile ? 'border-gold bg-gold/5' : 'hover:bg-gold/5 hover:border-gold/30'}`}>
                {attachedFile ? (
                  <>
                    <FileIcon className="w-8 h-8 mb-4 text-gold" />
                    <p className="font-sans text-lg text-white font-bold tracking-tight">{attachedFile}</p>
                    <p className="text-gold text-[10px] uppercase tracking-widest mt-2">Dossier Attached</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-4 text-text-muted group-hover:text-gold transition-colors" />
                    <p className="font-sans text-lg text-white font-light">Transfer project blueprints or plans.</p>
                    <p className="text-text-muted text-[10px] uppercase tracking-widest mt-2 opacity-60">Accepted formats: .DWG, .PDF</p>
                  </>
                )}
              </div>
            </div>

            <div className="pt-8">
                <PrecisionBtn variant="primary" className="w-full h-20" onClick={handlers.handleSubmit} disabled={isSubmitting} transition={PHYSICS.snappy}>
                  {isSubmitting ? "Generating Summary..." : "Create Project Brief"}
                </PrecisionBtn>
            </div>
          </motion.div>
        )}
      </div>

      <div className="max-w-2xl mx-auto mt-16 flex justify-between border-t border-white/5 pt-10">
          <Button variant="ghost" onClick={handlers.prevStep} disabled={currentStep === 1 || isSubmitting} className={`${currentStep === 1 ? 'invisible' : ''} text-text-muted font-mono text-[10px] tracking-widest uppercase h-14`}>
            Previous
          </Button>
          {currentStep < 4 && (
            <Button variant="outline" onClick={handlers.nextStep} className="h-14 px-12 border-white/10 hover:border-gold hover:text-gold group flex items-center justify-center">
              <span className="font-mono text-[11px] uppercase tracking-widest mr-2">Continue</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
      </div>
    </div>
  );
};