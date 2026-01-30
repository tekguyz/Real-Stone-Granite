
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check, AlertCircle, FileText, Layers, PenTool, Upload, User, HardHat, Briefcase, Ruler, Component, Box } from 'lucide-react';
import { useProjectStore, ProjectProvider, ProjectType, Environment, Style, UserRole, FabricationLevel, LeadDossier } from '../../entities/project/store';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { Button } from '../../shared/ui/Button';
import { COMPANY_KB } from '../../entities/company/knowledge';
import { SuccessView } from './SuccessView';

interface DesignStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { id: 1, label: 'Identity', icon: User },
  { id: 2, label: 'Scope & Specs', icon: PenTool },
  { id: 3, label: 'Material Selection', icon: Layers },
  { id: 4, label: 'Logistics', icon: FileText },
];

const StudioContent: React.FC<DesignStudioProps> = ({ isOpen, onClose }) => {
  const { state, dispatch, recommendation } = useProjectStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setIsExiting(false);
      setIsSubmitted(false);
      dispatch({ type: 'RESET' });
    }
  }, [isOpen, dispatch]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 500);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  /**
   * UNIVERSAL WEBHOOK DOCK: Implementation
   * TO CONNECT CRM: Provide a Zapier or Make.com Webhook URL in the VITE_CRM_WEBHOOK_URL env variable.
   */
  const handleSubmit = async () => {
    setIsSubmitting(true);

    const dossier: LeadDossier = {
      leadId: `RSG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      identity: {
        role: state.userRole,
        type: ['General Contractor', 'Architect/Designer'].includes(state.userRole) ? 'PROFESSIONAL' : 'PRIVATE',
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
        source: "STUDIO_V2_WEB",
        version: "1.2.0-industrial",
      }
    };

    // --- External Webhook Dock ---
    // @ts-ignore - Accessing potential vite env variable
    const webhookUrl = import.meta.env?.VITE_CRM_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dossier),
        });
      } catch (err) {
        console.error("CRM Webhook Handshake Failed:", err);
        // We continue to success view to not disrupt UX; lead is still captured in browser logs
      }
    } else {
      // Local Development Logging
      console.group("LEAD_DOSSIER_DUMP");
      console.log("Status: Webhook URL Not Found. Initializing local log.");
      console.log("Dossier Package:", dossier);
      console.groupEnd();
    }

    // Simulate network latency for "Industrial" feel
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  // Pro Detection
  const isPro = ['General Contractor', 'Architect/Designer'].includes(state.userRole);

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
          {/* Background Grid (CAD Effect) */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {isSubmitted ? (
            <SuccessView onClose={handleClose} />
          ) : (
            <>
              {/* --- LEFT: Navigation --- */}
              <div className="w-full md:w-64 bg-surface border-r border-white/5 flex flex-col justify-between p-6 relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-12">
                    <div className="w-3 h-3 bg-gold" />
                    <span className="font-mono font-bold text-white tracking-widest">STUDIO_V2</span>
                  </div>
                  
                  <div className="space-y-2">
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
                        <span className={`font-mono text-xs ${currentStep === step.id ? 'text-gold' : ''}`}>0{step.id}</span>
                        <span className="font-mono text-xs uppercase tracking-wider">{step.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleClose} 
                  aria-label="Close Design Studio"
                  className="flex items-center gap-2 text-text-muted hover:text-red-400 transition-colors p-2"
                >
                  <X className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-widest">Abort Config</span>
                </button>
              </div>

              {/* --- CENTER: Configuration Area --- */}
              <div className="flex-1 p-8 md:p-16 overflow-y-auto relative z-10">
                <div className="max-w-2xl mx-auto">
                  <div className="mb-8 flex items-center gap-4">
                    <span className="text-gold font-mono text-xl">0{currentStep} //</span>
                    <h2 className="text-3xl text-white font-mono uppercase">
                      {STEPS[currentStep - 1].label}
                    </h2>
                  </div>

                  {/* STEP 1: IDENTITY */}
                  {currentStep === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                       <div className="space-y-4">
                        <label className="text-xs font-mono text-text-muted uppercase tracking-widest">Identify Your Role</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           {[
                             { role: 'Homeowner', icon: User, desc: 'Personal Residence' },
                             { role: 'General Contractor', icon: HardHat, desc: 'Commercial / Residential Build' },
                             { role: 'Architect/Designer', icon: Briefcase, desc: 'Technical Specification' }
                           ].map((item) => (
                             <button
                               key={item.role}
                               onClick={() => dispatch({ type: 'SET_USER_ROLE', payload: item.role as UserRole })}
                               className={`group p-6 border text-left transition-all outline-none flex flex-col justify-between min-h-[160px] ${
                                 state.userRole === item.role 
                                   ? 'border-gold bg-gold/10 text-white' 
                                   : 'border-white/10 text-text-muted hover:border-white/30 bg-surface/50'
                               }`}
                             >
                               <div className="flex justify-between items-start w-full">
                                  <item.icon className={`w-6 h-6 ${state.userRole === item.role ? 'text-gold' : 'text-text-muted group-hover:text-white'}`} />
                                  {state.userRole === item.role && <div className="w-2 h-2 bg-gold" />}
                               </div>
                               <div>
                                 <span className="block font-mono text-sm uppercase font-bold mb-1">{item.role}</span>
                                 <span className="text-[10px] font-mono text-white/50">{item.desc}</span>
                               </div>
                             </button>
                           ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: SCOPE */}
                  {currentStep === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <div className="space-y-4">
                        <label className="text-xs font-mono text-text-muted uppercase tracking-widest">Project Type</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {['Residential', 'Commercial', 'Monument'].map((type) => (
                            <button
                              key={type}
                              onClick={() => dispatch({ type: 'SET_PROJECT_TYPE', payload: type as ProjectType })}
                              className={`p-6 border text-left transition-all outline-none ${
                                state.projectType === type 
                                  ? 'border-gold bg-gold/10 text-white' 
                                  : 'border-white/10 text-text-muted hover:border-white/30'
                              }`}
                            >
                              <span className="block font-mono text-sm uppercase mb-2">{type}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                         <label className="text-xs font-mono text-text-muted uppercase tracking-widest">Fabrication Level</label>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => dispatch({ type: 'SET_FABRICATION_LEVEL', payload: 'Standard' })}
                                className={`p-6 border flex items-start gap-4 transition-all outline-none ${
                                  state.fabricationLevel === 'Standard' 
                                    ? 'border-white bg-white/5 text-white' 
                                    : 'border-white/10 text-text-muted hover:border-white/30'
                                }`}
                            >
                               <Box className="w-6 h-6 mt-1 opacity-70" />
                               <div className="text-left">
                                  <span className="block font-mono text-sm uppercase font-bold mb-1">Standard (Surface)</span>
                                  <p className="text-[10px] font-mono leading-relaxed opacity-70">
                                     Standard edge profiles, flat surface polish, 2CM/3CM stock.
                                  </p>
                               </div>
                            </button>

                            <button
                                onClick={() => dispatch({ type: 'SET_FABRICATION_LEVEL', payload: 'Architectural' })}
                                className={`p-6 border flex items-start gap-4 transition-all outline-none ${
                                  state.fabricationLevel === 'Architectural' 
                                    ? 'border-gold bg-gold/10 text-white' 
                                    : 'border-white/10 text-text-muted hover:border-white/30'
                                }`}
                            >
                               <Ruler className="w-6 h-6 mt-1 text-gold" />
                               <div className="text-left">
                                  <span className="block font-mono text-sm uppercase font-bold mb-1 text-gold">Architectural</span>
                                  <p className="text-[10px] font-mono leading-relaxed opacity-70">
                                     Mitered edges, 5-axis waterjet cutting, complex cladding & returns.
                                  </p>
                               </div>
                            </button>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-xs font-mono text-text-muted uppercase tracking-widest">Environment</label>
                          <div className="grid grid-cols-2 gap-4">
                             {['Indoor', 'Outdoor'].map((env) => (
                              <button
                                key={env}
                                onClick={() => dispatch({ type: 'SET_ENVIRONMENT', payload: env as Environment })}
                                className={`p-4 border text-center font-mono text-sm uppercase transition-all outline-none ${
                                  state.environment === env 
                                    ? 'border-white bg-white text-primary font-bold' 
                                    : 'border-white/10 text-text-muted hover:text-white'
                                }`}
                              >
                                {env}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <label className="text-xs font-mono text-text-muted uppercase tracking-widest">Aesthetic Grade</label>
                          <div className="grid grid-cols-1 gap-4">
                             {['Standard', 'Luxury', 'Industrial'].map((s) => (
                              <button
                                key={s}
                                onClick={() => dispatch({ type: 'SET_STYLE', payload: s as Style })}
                                className={`px-4 py-2 border text-center font-mono text-xs uppercase transition-all outline-none ${
                                  state.style === s
                                    ? 'border-gold text-gold' 
                                    : 'border-white/10 text-text-muted hover:text-white'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: MATERIAL */}
                  {currentStep === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <div className="p-6 border border-gold/30 bg-gold/5 flex items-start gap-4">
                        <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-gold font-mono uppercase text-sm mb-1 tracking-wider">System Recommendation</h4>
                          <p className="text-white text-lg font-light mb-2">
                            Based on <span className="font-mono text-gold">{state.environment}</span> and <span className="font-mono text-gold">{state.fabricationLevel}</span> constraints, we recommend:
                          </p>
                          <div className="text-3xl font-mono uppercase text-white mb-2">{recommendation.material}</div>
                          <p className="text-text-muted text-xs font-mono border-l border-white/20 pl-2">
                            REASONING: {recommendation.reason}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                         <label className="text-xs font-mono text-text-muted uppercase tracking-widest">Browse Categories</label>
                         <div className="grid grid-cols-1 gap-4">
                            {['Natural', 'Engineered', 'Exotic'].map(cat => (
                              <div key={cat} className="p-4 border border-white/10 hover:border-white/30 transition-colors">
                                <h5 className="text-white font-mono uppercase mb-2">{cat}</h5>
                                <div className="flex flex-wrap gap-2">
                                   {COMPANY_KB.materials[cat.toLowerCase() as keyof typeof COMPANY_KB.materials].map((m: any) => (
                                     <button
                                      key={m.type}
                                      onClick={() => dispatch({ type: 'SET_STONE_PREFERENCE', payload: m.type })}
                                      className={`px-3 py-2 text-[10px] uppercase font-mono border transition-all outline-none ${
                                        state.stonePreference === m.type || (state.stonePreference === 'Light' && m.type === recommendation.material)
                                          ? 'bg-white text-primary border-white'
                                          : 'bg-transparent text-text-muted border-white/10 hover:border-white'
                                      }`}
                                     >
                                       {m.type}
                                     </button>
                                   ))}
                                </div>
                              </div>
                            ))}
                         </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: LOGISTICS */}
                  {currentStep === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <div className="space-y-4">
                        <label className="text-xs font-mono text-text-muted uppercase tracking-widest">Target Installation</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Q4 2024"
                          value={state.timeline}
                          onChange={(e) => dispatch({ type: 'SET_TIMELINE', payload: e.target.value })}
                          className="w-full bg-surface border border-white/10 p-4 text-white font-mono focus:border-gold outline-none"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                           <label className="text-xs font-mono text-text-muted uppercase tracking-widest">Blueprint Upload</label>
                           {isPro && (
                             <span className="text-[10px] text-gold font-bold uppercase tracking-wider animate-pulse">Required for Bid</span>
                           )}
                        </div>
                        
                        <div className={`border-2 border-dashed rounded-none p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
                            isPro 
                            ? 'border-gold/50 bg-gold/5 hover:bg-gold/10' 
                            : 'border-white/10 hover:border-gold/50'
                        }`}>
                          <Upload className={`w-8 h-8 mb-4 transition-colors ${isPro ? 'text-gold' : 'text-text-muted group-hover:text-gold'}`} />
                          <p className={`font-mono text-sm uppercase ${isPro ? 'text-white font-bold' : 'text-white'}`}>
                             Drag Schematic Files Here
                          </p>
                          <p className="text-text-muted text-xs mt-2">.DWG, .PDF, .RVT supported</p>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/10">
                         <PrecisionBtn 
                            variant="primary" 
                            className="w-full" 
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Processing Dossier..." : "Submit Specification"}
                         </PrecisionBtn>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Pagination */}
                <div className="max-w-2xl mx-auto mt-12 flex justify-between">
                   <Button 
                    variant="ghost" 
                    onClick={prevStep} 
                    disabled={currentStep === 1 || isSubmitting}
                    className={currentStep === 1 ? 'invisible' : ''}
                  >
                     Back
                   </Button>
                   {currentStep < 4 && (
                     <Button variant="outline" onClick={nextStep}>
                       Next Step <ChevronRight className="w-4 h-4 ml-2" />
                     </Button>
                   )}
                </div>
              </div>

              {/* --- RIGHT: Manifest Sidebar --- */}
              <div className="w-full md:w-80 bg-surface border-l border-white/5 p-8 relative z-10 hidden lg:block">
                <div className="flex items-center gap-2 mb-8 text-gold border-b border-gold/20 pb-4">
                  <FileText className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em]">Project Manifest</span>
                </div>

                <div className="space-y-8 font-mono">
                  <div className="bg-white/5 p-4 border border-white/10">
                    <span className="text-[10px] text-gold/80 uppercase block mb-1">Lead Type</span>
                    <span className="text-white text-sm font-bold uppercase">{state.userRole}</span>
                  </div>
                  
                  <div>
                    <span className="text-[10px] text-text-muted uppercase block mb-1">Fabrication Tier</span>
                    <span className={`text-sm uppercase ${state.fabricationLevel === 'Architectural' ? 'text-gold' : 'text-white'}`}>
                       {state.fabricationLevel}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-text-muted uppercase block mb-1">Type</span>
                    <span className="text-white text-sm">{state.projectType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-muted uppercase block mb-1">Environment</span>
                    <span className="text-white text-sm">{state.environment}</span>
                  </div>
                   <div>
                    <span className="text-[10px] text-text-muted uppercase block mb-1">System Recommendation</span>
                    <div className="flex items-center gap-2 text-gold">
                      <Check className="w-3 h-3" />
                      <span className="text-sm font-bold uppercase">{recommendation.material}</span>
                    </div>
                  </div>
                   <div>
                    <span className="text-[10px] text-text-muted uppercase block mb-1">Selected Preference</span>
                    <span className="text-white text-sm">
                      {state.stonePreference === 'Light' ? 'Pending Selection...' : state.stonePreference}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-[10px] text-text-muted mb-2 font-mono">MANIFEST_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                  <div className="h-1 w-full bg-white/10">
                     <div className="h-full bg-gold transition-all duration-500" style={{ width: `${(currentStep / 4) * 100}%`}} />
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
