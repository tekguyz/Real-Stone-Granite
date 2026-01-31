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
    <div className="flex-1 p-6 md:p-12 lg:px-24 lg:py-16 overflow-y-auto relative z-10 scrollbar-hide pb-32 lg:pb-24">
      <div className="max-w-3xl mx-auto">
        
        {/* Mobile Step Indicator */}
        <div className="lg:hidden mb-8 flex items-center gap-3">
            <span className="text-gold font-mono text-[10px] uppercase tracking-widest">Step 0{currentStep}</span>
            <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* Header - Humanized */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-sans font-light tracking-tight leading-tight">
            {currentStep === 1 && "What describes your project?"}
            {currentStep === 2 && "Select your craftsmanship tier."}
            {currentStep === 3 && "Our Recommendation."}
            {currentStep === 4 && "Final Details."}
          </h2>
        </div>

        {/* STEP 1: IDENTITY - TIGHTER CARDS */}
        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { role: 'Private Residence', icon: User, desc: 'For homeowners' },
                { role: 'Professional Partner', icon: Briefcase, desc: 'For architects & designers' }
              ].map((item) => {
                const isActive = state.userRole === item.role;
                return (
                  <motion.button
                    key={item.role}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => dispatch({ type: 'SET_USER_ROLE', payload: item.role as UserRole })}
                    className={`relative group p-6 text-left transition-all outline-none flex flex-col justify-center min-h-[160px] border rounded-sm ${
                      isActive 
                        ? 'bg-surface border-gold text-white shadow-lg' 
                        : 'bg-transparent border-white/10 text-white/60 hover:border-white/30 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="relative z-10">
                        <item.icon className={`w-6 h-6 mb-4 ${isActive ? 'text-gold' : 'text-current transition-colors'}`} strokeWidth={1.5} />
                        <span className="block font-sans text-lg font-medium tracking-tight mb-2">{item.role}</span>
                        <span className="text-xs text-current opacity-70">{item.desc}</span>
                    </div>
                  </motion.button>
                )
              })}
          </motion.div>
        )}

        {/* STEP 2: TIER SELECTION - CLEANER */}
        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {[
                { id: 'Classic Selection', icon: Box, title: 'Classic Selection', desc: 'Standard finishing focused on the raw beauty of natural stone.' },
                { id: 'Artisan Masterpiece', icon: Ruler, title: 'Artisan Masterpiece', desc: 'Complex structural details, mitered edges, and custom fabrication.' }
              ].map(tier => {
                const isActive = state.fabricationLevel === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => dispatch({ type: 'SET_FABRICATION_LEVEL', payload: tier.id as FabricationLevel })}
                    className={`relative w-full group p-6 flex items-start gap-6 transition-all outline-none border rounded-sm ${
                      isActive 
                        ? 'bg-surface border-gold text-white shadow-lg' 
                        : 'bg-transparent border-white/10 text-white/60 hover:border-white/30 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                      <div className={`relative z-10 flex items-start gap-6 w-full`}>
                        <div className={`p-3 border rounded-sm ${isActive ? 'bg-gold text-primary border-gold' : 'bg-transparent border-white/20 group-hover:border-white/50'}`}>
                           <tier.icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div className="text-left flex-1">
                          <span className="block font-sans text-lg font-medium tracking-tight mb-1">{tier.title}</span>
                          <p className="text-sm font-light leading-relaxed max-w-lg opacity-80">{tier.desc}</p>
                        </div>
                      </div>
                  </button>
                )
              })}
          </motion.div>
        )}

        {/* STEP 3: RECOMMENDATION - LUXURY */}
        {currentStep === 3 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <div className="p-8 border border-gold/30 bg-surface/50 relative overflow-hidden rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                  <span className="text-gold font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Suggestion</span>
              </div>
              <h4 className="text-white text-2xl md:text-3xl font-sans font-light mb-4">
                  We recommend <span className="font-medium text-gold">{recommendation.material}</span>.
              </h4>
              <p className="text-white/80 text-sm leading-relaxed font-light max-w-2xl">
                  {recommendation.reason}
              </p>
            </div>

            <div className="space-y-4">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold block mb-2">
                    Browse Other Options
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Granite', 'Marble', 'Quartzite', 'Quartz', 'Dekton', 'Onyx'].map(m => {
                      const isSelected = state.stonePreference === m;
                      return (
                       <motion.button
                         key={m}
                         whileTap={{ scale: 0.98 }}
                         onClick={() => dispatch({ type: 'SET_STONE_PREFERENCE', payload: m })}
                         className={`px-5 py-2 text-[10px] uppercase tracking-widest font-mono font-bold border transition-all outline-none rounded-sm ${
                           isSelected
                             ? 'bg-gold text-primary border-gold'
                             : 'bg-transparent text-white/60 border-white/10 hover:border-gold hover:text-gold'
                         }`}
                       >
                         {m}
                       </motion.button>
                      )
                  })}
                </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: DETAILS - CLEANER FORM */}
        {currentStep === 4 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-white/10 pb-2">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Timeline</label>
                <span className="text-gold font-mono text-xs uppercase tracking-widest font-bold">{state.timeline}</span>
              </div>
              
              {/* TIMELINE SLIDER (Keep existing logic, just cleaner CSS) */}
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
                {/* Clean Mic Button */}
                <motion.button 
                  onClick={voice.toggleRecording}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={voice.isProcessingAudio}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                    voice.isRecording 
                      ? 'bg-red-500/10 border-red-500 text-red-500' 
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
              
              <textarea 
                value={state.description}
                onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
                placeholder="Describe your vision, requirements, or special details..."
                className="w-full h-32 bg-white/5 border border-white/10 text-white font-sans text-sm p-4 focus:border-gold/50 outline-none resize-none transition-colors placeholder:text-white/20 leading-relaxed rounded-sm"
              />
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
                <PrecisionBtn variant="primary" className="w-full h-14" onClick={handlers.handleSubmit} disabled={isSubmitting} transition={PHYSICS.snappy}>
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </PrecisionBtn>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="max-w-3xl mx-auto mt-12 flex justify-between border-t border-white/5 pt-8">
          <Button variant="ghost" onClick={handlers.prevStep} disabled={currentStep === 1 || isSubmitting} className={`${currentStep === 1 ? 'invisible' : ''} text-white/40 font-mono text-[10px] tracking-widest uppercase h-12`}>
            Back
          </Button>
          {currentStep < 4 && (
            <Button variant="outline" onClick={handlers.nextStep} className="h-12 px-8 border-white/20 hover:border-gold hover:text-gold group">
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Continue</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
      </div>
    </div>
  );
};