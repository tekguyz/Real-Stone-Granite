
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check, AlertCircle, FileText, Layers, PenTool, Upload, User, Briefcase, Ruler, Box, File as FileIcon } from 'lucide-react';
import { useProjectStore, ProjectProvider, ProjectType, Environment, Style, UserRole, FabricationLevel, LeadDossier } from '../../entities/project/store';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { Button } from '../../shared/ui/Button';
import { COMPANY_KB } from '../../entities/company/knowledge';
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

const StudioContent: React.FC<DesignStudioProps> = ({ isOpen, onClose }) => {
  const { state, dispatch, recommendation } = useProjectStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectRef = useMemo(() => Math.random().toString(36).substr(2, 9).toUpperCase(), [isOpen]);

  // Derived index for Step 4 Slider
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

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file.name);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const dossier: LeadDossier = {
      leadId: projectRef,
      timestamp: new Date().toISOString(),
      identity: {
        role: state.userRole,
        type: state.userRole === 'Professional Partner' ? 'PROFESSIONAL' : 'PRIVATE',
      },
      specification: {
        tier: state.fabricationLevel,
        projectType: state.projectType,
        environment: state.environment,
        style: state.style,
        timeline: state.timeline,
        preferredMaterial: state.stonePreference === 'Light' ? recommendation.material : state.stonePreference,
      },
      aiRecommendation: recommendation,
      metadata: {
        source: "Studio Planner",
        version: "2.0",
      }
    };

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
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-primary flex flex-col md:flex-row overflow-hidden"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {isSubmitted ? (
            <SuccessView onClose={handleClose} projectRef={projectRef} />
          ) : (
            <>
              {/* --- LEFT: Navigation --- */}
              <div className="w-full md:w-64 bg-surface border-r border-white/5 flex flex-col justify-between p-6 relative z-10 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-10" />
                
                <div className="relative z-20">
                  <div className="flex items-center gap-3 mb-12">
                    <div className="w-3 h-3 bg-gold" />
                    <span className="font-mono font-bold text-white tracking-widest text-[10px]">Project Journey</span>
                  </div>
                  
                  <div className="space-y-4">
                    {STEPS.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => setCurrentStep(step.id)}
                        className={`w-full flex items-center gap-4 p-4 text-left transition-all duration-300 border-l-2 outline-none ${
                          currentStep === step.id 
                            ? 'bg-white/5 border-gold text-white' 
                            : 'border-transparent text-text-muted hover:text-white'
                        }`}
                      >
                        <span className={`font-sans text-[10px] font-bold tracking-tighter uppercase ${currentStep === step.id ? 'text-gold' : 'opacity-30'}`}>
                          Step {step.id}
                        </span>
                        <span className="font-sans text-[11px] uppercase tracking-widest font-light">{step.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleClose} 
                  className="flex items-center gap-2 text-text-muted hover:text-red-400 transition-colors p-2 z-20"
                >
                  <X className="w-4 h-4" />
                  <span className="font-sans text-[10px] uppercase tracking-widest">End Journey</span>
                </button>
              </div>

              {/* --- CENTER: Configuration Area --- */}
              <div className="flex-1 p-8 md:p-12 lg:p-16 overflow-y-auto relative z-10 scrollbar-hide">
                <div className="max-w-2xl mx-auto">
                  <div className="mb-8">
                    <span className="text-gold font-mono text-[11px] tracking-widest uppercase block mb-1.5 opacity-50">Personal Consultation</span>
                    <h2 className="text-4xl text-white font-sans font-light tracking-tight uppercase">
                      {currentStep === 1 && "Tell us about your project."}
                      {currentStep === 2 && "Select your design complexity."}
                      {currentStep === 3 && "Our Expert Suggestion."}
                      {currentStep === 4 && "Logistics & Timeline."}
                    </h2>
                  </div>

                  {/* STEP 1: IDENTITY */}
                  {currentStep === 1 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           {[
                             { role: 'Private Residence', icon: User, desc: 'For personal residential architecture' },
                             { role: 'Professional Partner', icon: Briefcase, desc: 'For architects, designers, or builders' }
                           ].map((item) => (
                             <button
                               key={item.role}
                               onClick={() => dispatch({ type: 'SET_USER_ROLE', payload: item.role as UserRole })}
                               className={`group p-8 border text-left transition-all outline-none flex flex-col justify-between min-h-[200px] ${
                                 state.userRole === item.role 
                                   ? 'border-gold bg-gold/5 text-white' 
                                   : 'border-white/10 text-text-muted hover:border-white/30 bg-surface/50'
                               }`}
                             >
                               <item.icon className={`w-8 h-8 ${state.userRole === item.role ? 'text-gold' : 'text-text-muted group-hover:text-white'}`} />
                               <div className="mt-8">
                                 <span className="block font-sans text-lg font-light mb-1">{item.role}</span>
                                 <span className="text-[11px] font-sans text-text-muted uppercase tracking-wider">{item.desc}</span>
                               </div>
                             </button>
                           ))}
                        </div>
                    </motion.div>
                  )}

                  {/* STEP 2: THE CRAFT */}
                  {currentStep === 2 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                       <div className="grid grid-cols-1 gap-4">
                            <button
                                onClick={() => dispatch({ type: 'SET_FABRICATION_LEVEL', payload: 'Classic Selection' })}
                                className={`p-8 border flex items-start gap-6 transition-all outline-none ${
                                  state.fabricationLevel === 'Classic Selection' 
                                    ? 'border-gold bg-gold/5 text-white' 
                                    : 'border-white/10 text-text-muted hover:border-white/30'
                                }`}
                            >
                               <Box className={`w-8 h-8 flex-shrink-0 ${state.fabricationLevel === 'Classic Selection' ? 'text-gold' : 'opacity-40'}`} />
                               <div className="text-left">
                                  <span className="block font-sans text-xl font-light mb-2">Classic Selection</span>
                                  <p className="text-sm font-sans text-text-muted leading-relaxed">
                                     A clean, timeless finish utilizing standard edge profiles and natural slab thickness. Ideal for refined, understated spaces.
                                  </p>
                               </div>
                            </button>

                            <button
                                onClick={() => dispatch({ type: 'SET_FABRICATION_LEVEL', payload: 'Artisan Masterpiece' })}
                                className={`p-8 border flex items-start gap-6 transition-all outline-none ${
                                  state.fabricationLevel === 'Artisan Masterpiece' 
                                    ? 'border-gold bg-gold/5 text-white' 
                                    : 'border-white/10 text-text-muted hover:border-white/30'
                                }`}
                            >
                               <Ruler className={`w-8 h-8 flex-shrink-0 ${state.fabricationLevel === 'Artisan Masterpiece' ? 'text-gold' : 'opacity-40'}`} />
                               <div className="text-left">
                                  <span className="block font-sans text-xl font-light mb-2">Artisan Masterpiece</span>
                                  <p className="text-sm font-sans text-text-muted leading-relaxed">
                                     Complex mitering, custom details, and architectural cladding. Engineered for those demanding a unique structural statement.
                                  </p>
                               </div>
                            </button>
                         </div>
                    </motion.div>
                  )}

                  {/* STEP 3: OUR ADVICE */}
                  {currentStep === 3 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                      {/* Compressed Expert Brief Card */}
                      <div className="p-5 md:p-6 border border-gold/20 bg-gold/5">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-1 bg-gold rotate-45" />
                            <span className="text-gold font-sans text-[9px] uppercase tracking-[0.4em] font-bold">Expert Brief</span>
                        </div>
                        <h4 className="text-white text-xl md:text-2xl font-sans font-light mb-2 leading-tight">
                           Our recommendation: <span className="text-gold border-b border-gold/20 pb-0.5">{recommendation.material}</span>
                        </h4>
                        <p className="text-text-muted text-sm md:text-base leading-relaxed font-sans font-light italic border-l border-gold/30 pl-4 opacity-90">
                           "{recommendation.reason}"
                        </p>
                      </div>

                      <div className="space-y-3 pt-1">
                         <label className="text-[10px] font-sans text-text-muted uppercase tracking-[0.3em] font-medium">Explore Our Portfolio</label>
                         <div className="flex flex-wrap gap-2">
                            {['Granite', 'Marble', 'Quartzite', 'Quartz', 'Dekton', 'Onyx'].map(m => (
                              <button
                                key={m}
                                onClick={() => dispatch({ type: 'SET_STONE_PREFERENCE', payload: m })}
                                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-sans border transition-all outline-none ${
                                  state.stonePreference === m
                                    ? 'bg-gold text-primary border-gold font-bold shadow-[0_0_15px_oklch(76.6%_0.154_86.6/0.25)]'
                                    : 'bg-transparent text-text-muted border-white/10 hover:border-white/30'
                                }`}
                              >
                                {m}
                              </button>
                            ))}
                         </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: TIMELINE */}
                  {currentStep === 4 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                      
                      {/* Refined Slider Spacing & Weight */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-end border-b border-white/5 pb-2">
                          <label className="text-[10px] font-sans text-text-muted uppercase tracking-[0.3em]">Execution Window</label>
                          <span className="text-gold font-mono text-[11px] uppercase tracking-widest transition-all duration-300">
                             {state.timeline}
                          </span>
                        </div>

                        <div className="relative h-14 flex items-center px-0.5">
                           {/* Heavier Track (2px) */}
                           <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2" />
                           
                           <motion.div 
                              className="absolute top-1/2 left-0 h-[2px] bg-gold -translate-y-1/2 shadow-[0_0_15px_oklch(76.6%_0.154_86.6/0.4)]"
                              initial={false}
                              animate={{ width: `${(timelineIndex / (TIMELINE_OPTIONS.length - 1)) * 100}%` }}
                              transition={PHYSICS.snappy}
                           />

                           <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2 pointer-events-none px-0">
                              {TIMELINE_OPTIONS.map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`w-[1px] h-3 transition-colors duration-500 ${i <= timelineIndex ? 'bg-gold' : 'bg-white/10'}`} 
                                />
                              ))}
                           </div>

                           <div className="absolute top-0 left-0 w-full h-full flex items-center">
                              <div className="flex w-full h-full">
                                {TIMELINE_OPTIONS.map((opt, i) => (
                                  <div 
                                    key={i} 
                                    className="flex-1 h-full cursor-pointer z-10" 
                                    onClick={() => dispatch({ type: 'SET_TIMELINE', payload: opt })}
                                  />
                                ))}
                              </div>

                              {/* Larger Thumb (14px) */}
                              <motion.div
                                className="absolute w-[14px] h-[14px] bg-gold shadow-[0_0_20px_oklch(76.6%_0.154_86.6/0.5)] z-20 pointer-events-none"
                                initial={false}
                                animate={{ 
                                  left: `calc(${(timelineIndex / (TIMELINE_OPTIONS.length - 1)) * 100}% - 7px)` 
                                }}
                                transition={PHYSICS.snappy}
                              />
                           </div>
                        </div>
                      </div>

                      {/* Compressed Documentation Area (20% reduction) */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-sans text-text-muted uppercase tracking-[0.3em]">Blueprints & Plans</label>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          onChange={handleFileChange} 
                          accept=".dwg,.pdf,.jpg,.png" 
                        />
                        <div 
                          onClick={handleFileClick}
                          className={`border border-white/10 bg-surface/30 p-8 flex flex-col items-center justify-center text-center group cursor-pointer transition-all border-dashed ${attachedFile ? 'border-gold bg-gold/5' : 'hover:bg-gold/5 hover:border-gold/30'}`}
                        >
                          {attachedFile ? (
                            <>
                              <FileIcon className="w-6 h-6 mb-4 text-gold" />
                              <p className="font-sans text-base text-white font-bold tracking-tight">
                                {attachedFile}
                              </p>
                              <p className="text-gold text-[9px] uppercase tracking-widest mt-2">Plans Received</p>
                            </>
                          ) : (
                            <>
                              <Upload className="w-6 h-6 mb-4 text-text-muted group-hover:text-gold transition-colors" />
                              <p className="font-sans text-base text-white font-light">
                                 Share your blueprints or design plans.
                              </p>
                              <p className="text-text-muted text-[9px] uppercase tracking-widest mt-2 opacity-60">Supported formats: .DWG, .PDF</p>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="pt-2">
                         <PrecisionBtn 
                            variant="primary" 
                            className="w-full h-16" 
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            transition={PHYSICS.snappy}
                          >
                            {isSubmitting ? "Finalizing Details..." : "Submit Specifications"}
                         </PrecisionBtn>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Pagination Controls - Fixed Alignment */}
                <div className="max-w-2xl mx-auto mt-12 flex justify-between">
                   <Button 
                    variant="ghost" 
                    onClick={prevStep} 
                    disabled={currentStep === 1 || isSubmitting}
                    className={`${currentStep === 1 ? 'invisible' : ''} text-text-muted font-sans text-[10px] tracking-widest uppercase h-14`}
                  >
                     Previous
                   </Button>
                   {currentStep < 4 && (
                     <Button 
                        variant="outline" 
                        onClick={nextStep} 
                        className="h-14 px-10 border-white/20 hover:border-gold hover:text-gold group flex items-center justify-center overflow-hidden"
                     >
                        <div className="flex items-center gap-2 leading-none">
                          <span className="font-sans text-[11px] uppercase tracking-widest leading-none">Continue</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                        </div>
                     </Button>
                   )}
                </div>
              </div>

              {/* --- RIGHT: Summary Sidebar - No Ghost Scrollbar --- */}
              <div className="w-full md:w-80 bg-surface border-l border-white/5 p-10 relative z-10 hidden lg:block overflow-hidden">
                <div className="h-full flex flex-col scrollbar-hide overflow-y-auto overflow-x-hidden">
                    <div className="relative z-20 flex-1">
                      <div className="flex items-center gap-3 mb-10 text-white/50 border-b border-white/5 pb-6">
                        <FileText className="w-4 h-4" />
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold">Brief Overview</span>
                      </div>

                      <div className="space-y-10">
                        <div>
                          <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">Client Type</span>
                          <span className="text-white text-sm font-light">{state.userRole}</span>
                        </div>
                        
                        <div>
                          <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">Fabrication Tier</span>
                          <span className={`text-sm font-light ${state.fabricationLevel === 'Artisan Masterpiece' ? 'text-gold' : 'text-white'}`}>
                             {state.fabricationLevel}
                          </span>
                        </div>

                        <div>
                          <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">
                            Stone Selection
                          </span>
                          <div className="flex items-center gap-2 text-gold">
                            <Check className="w-3 h-3" />
                            <span className="text-sm font-bold uppercase tracking-tight">
                               {state.stonePreference !== 'Light' ? state.stonePreference : recommendation.material}
                            </span>
                          </div>
                          <span className="text-[8px] text-text-muted/40 uppercase tracking-widest block mt-1">
                            {state.stonePreference !== 'Light' ? 'Manual Selection' : 'Expert Suggestion'}
                          </span>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">Project Reference</span>
                            <span className="text-white font-mono text-lg tracking-tighter">{projectRef}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Indicator at bottom of sidebar */}
                    <div className="mt-auto pt-10">
                      <div className="h-[2px] w-full bg-white/5">
                         <motion.div 
                            className="h-full bg-gold"
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentStep / 4) * 100}%` }}
                            transition={PHYSICS.snappy}
                         />
                      </div>
                    </div>
                </div>
              </div>
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
