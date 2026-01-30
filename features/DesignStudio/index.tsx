
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check, FileText, Layers, PenTool, Upload, User, Briefcase, Ruler, Box, File as FileIcon, ChevronUp, ChevronDown } from 'lucide-react';
import { useProjectStore, ProjectProvider, UserRole, FabricationLevel, LeadDossier, ProjectState, Recommendation } from '../../entities/project/store';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { Button } from '../../shared/ui/Button';
import { SuccessView } from './SuccessView';
import { PHYSICS } from '../../shared/lib/theme';

interface DesignStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { id: 1, label: 'Identity', icon: User },
  { id: 2, label: 'The Craft', icon: PenTool },
  { id: 3, label: 'Our Advice', icon: Layers },
  { id: 4, label: 'Timeline', icon: FileText },
];

const TIMELINE_OPTIONS = [
  "ASAP / Ready to Fabricate",
  "Planning Phase (1-3 Months)",
  "New Construction (6+ Months)"
];

const MobileSummaryDrawer: React.FC<{ 
  state: ProjectState; 
  recommendation: Recommendation; 
  projectRef: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ state, recommendation, projectRef, isOpen, onToggle }) => {
  return (
    <motion.div 
      className={`fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-gold/20 shadow-[-10px_-10px_30px_rgba(0,0,0,0.5)] lg:hidden flex flex-col`}
      initial={false}
      animate={{ height: isOpen ? '75dvh' : '80px' }}
      transition={PHYSICS.snappy}
    >
      <div onClick={onToggle} className="h-20 w-full flex items-center justify-between px-8 bg-surface border-b border-white/5 cursor-pointer relative z-20">
        <div className="flex flex-col">
          <span className="text-[9px] text-gold font-mono uppercase tracking-widest mb-1">Project Reference</span>
          <span className="text-white font-mono text-sm tracking-tighter">#{projectRef}</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted uppercase tracking-widest text-[9px] font-mono">
          {isOpen ? "Close Brief" : "View Brief"}
          {isOpen ? <ChevronDown className="w-4 h-4 text-gold" /> : <ChevronUp className="w-4 h-4 text-gold" />}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 bg-surface relative">
        <div className="space-y-10">
           <div>
             <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">Principal</span>
             <span className="text-white text-lg font-light">{state.userRole}</span>
           </div>
           
           <div>
             <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">Project Tier</span>
             <span className={`text-lg font-light ${state.fabricationLevel === 'Artisan Masterpiece' ? 'text-gold' : 'text-white'}`}>
                {state.fabricationLevel}
             </span>
           </div>

           <div>
             <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">
               Material Suggestion
             </span>
             <div className="flex items-center gap-2 text-gold mb-1">
               <Check className="w-4 h-4" />
               <span className="text-lg font-bold uppercase tracking-tight">
                  {state.stonePreference !== 'Light' ? state.stonePreference : recommendation.material}
               </span>
             </div>
           </div>

           <div className="pt-8 border-t border-white/5">
               <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">Status</span>
               <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold/30 bg-gold/5 text-gold text-[10px] font-mono uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-gold rotate-45 animate-pulse" />
                  In Progress
               </div>
           </div>
         </div>
      </div>
    </motion.div>
  );
};

const StudioContent: React.FC<DesignStudioProps> = ({ isOpen, onClose }) => {
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

  if (!isOpen && !isExiting) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={PHYSICS.snappy}
          className="fixed inset-0 z-[100] bg-primary flex flex-col lg:flex-row overflow-hidden h-[100dvh]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {isSubmitted ? (
            <SuccessView onClose={handleClose} projectRef={projectRef} />
          ) : (
            <>
              <div className="w-full lg:w-72 bg-surface lg:border-r border-b lg:border-b-0 border-white/5 flex flex-row lg:flex-col justify-between p-4 lg:p-10 relative z-10 flex-shrink-0">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-10" />
                
                <div className="relative z-20 w-full flex lg:block justify-between items-center">
                  <div className="flex items-center gap-4 lg:mb-16">
                    <div className="w-3 h-3 bg-gold rotate-45 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    <span className="font-mono font-bold text-white tracking-[0.2em] text-[10px] uppercase">Project Brief</span>
                  </div>
                  
                  <div className="hidden lg:block space-y-2">
                    {STEPS.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => setCurrentStep(step.id)}
                        className={`w-full group flex items-center justify-between p-5 text-left transition-all duration-300 border border-transparent outline-none ${
                          currentStep === step.id 
                            ? 'bg-white/5 border-white/10 text-white' 
                            : 'text-text-muted hover:text-white'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className={`font-mono text-[9px] font-bold tracking-widest uppercase mb-1 ${currentStep === step.id ? 'text-gold' : 'opacity-30'}`}>
                            Phase 0{step.id}
                          </span>
                          <span className="font-sans text-xs uppercase tracking-[0.2em] font-light">{step.label}</span>
                        </div>
                        {currentStep === step.id && (
                          <motion.div layoutId="stepDiamond" className="w-1.5 h-1.5 bg-gold rotate-45" transition={PHYSICS.snappy} />
                        )}
                      </button>
                    ))}
                  </div>

                  <button onClick={handleClose} className="lg:hidden flex items-center justify-center text-text-muted hover:text-red-400 p-2">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <button onClick={handleClose} className="hidden lg:flex items-center gap-3 text-text-muted hover:text-red-400 transition-colors px-5 py-2 z-20 font-mono text-[10px] uppercase tracking-widest">
                  <X className="w-4 h-4" />
                  End Journey
                </button>
              </div>

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

                      <div className="space-y-4">
                        <label className="text-[11px] font-sans text-text-muted uppercase tracking-[0.3em]">Technical Specifications</label>
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".dwg,.pdf,.jpg,.png" />
                        <div onClick={handleFileClick} className={`border border-white/10 bg-surface/30 p-12 flex flex-col items-center justify-center text-center group cursor-pointer transition-all border-dashed ${attachedFile ? 'border-gold bg-gold/5' : 'hover:bg-gold/5 hover:border-gold/30'}`}>
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
                         <PrecisionBtn variant="primary" className="w-full h-20" onClick={handleSubmit} disabled={isSubmitting} transition={PHYSICS.snappy}>
                            {isSubmitting ? "Generating Summary..." : "Create Project Brief"}
                         </PrecisionBtn>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="max-w-2xl mx-auto mt-16 flex justify-between border-t border-white/5 pt-10">
                   <Button variant="ghost" onClick={prevStep} disabled={currentStep === 1 || isSubmitting} className={`${currentStep === 1 ? 'invisible' : ''} text-text-muted font-mono text-[10px] tracking-widest uppercase h-14`}>
                     Previous
                   </Button>
                   {currentStep < 4 && (
                     <Button variant="outline" onClick={nextStep} className="h-14 px-12 border-white/10 hover:border-gold hover:text-gold group flex items-center justify-center">
                        <span className="font-mono text-[11px] uppercase tracking-widest mr-2">Continue</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </Button>
                   )}
                </div>
              </div>

              <div className="hidden lg:block w-96 bg-surface border-l border-white/5 p-16 relative z-10 overflow-hidden flex-shrink-0">
                <div className="h-full flex flex-col scrollbar-hide">
                    <div className="relative z-20 flex-1">
                      <div className="flex items-center gap-4 mb-16 text-white/50 border-b border-white/10 pb-8">
                        <FileText className="w-5 h-5" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">The Brief</span>
                      </div>

                      <div className="space-y-12">
                        <div>
                          <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-3">Principal</span>
                          <span className="text-white text-lg font-light tracking-tight">{state.userRole}</span>
                        </div>
                        
                        <div>
                          <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-3">Project Tier</span>
                          <span className={`text-lg font-light tracking-tight ${state.fabricationLevel === 'Artisan Masterpiece' ? 'text-gold' : 'text-white'}`}>
                             {state.fabricationLevel}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-3">Material Selection</span>
                          <div className="flex items-center gap-3 text-gold">
                            <motion.div initial={false} animate={{ rotate: [0, 90, 0] }} className="w-2 h-2 bg-gold rotate-45" />
                            <span className="text-xl font-bold uppercase tracking-tighter">
                               {state.stonePreference !== 'Light' ? state.stonePreference : recommendation.material}
                            </span>
                          </div>
                        </div>

                        <div className="pt-12 border-t border-white/10">
                            <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-3">Project Reference</span>
                            <span className="text-white font-mono text-2xl tracking-tighter">#{projectRef}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto pt-16">
                      <div className="h-[1px] w-full bg-white/10">
                         <motion.div className="h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" initial={{ width: 0 }} animate={{ width: `${(currentStep / 4) * 100}%` }} transition={PHYSICS.snappy} />
                      </div>
                    </div>
                </div>
              </div>

              <MobileSummaryDrawer isOpen={isDrawerOpen} onToggle={() => setIsDrawerOpen(!isDrawerOpen)} state={state} recommendation={recommendation} projectRef={projectRef} />
            </>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DesignStudio = (props: DesignStudioProps) => (
  <ProjectProvider>
    <StudioContent {...props} />
  </ProjectProvider>
);
