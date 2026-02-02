import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Calendar, ArrowLeft, Loader2, Check, FileText } from 'lucide-react';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { PHYSICS } from '../../shared/lib/theme';
import { useToast } from '../../shared/ui/Toast';
import { useProjectStore } from '../../entities/project/store';
import { BookingStudio } from './ui/BookingStudio';

interface SuccessViewProps {
  onClose: () => void;
  projectRef: string;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ onClose, projectRef }) => {
  const { showToast } = useToast();
  const { state, recommendation } = useProjectStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [view, setView] = useState<'success' | 'booking'>('success');

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    
    // Generate actual file content
    const content = `
REAL STONE & GRANITE - PROJECT MANIFESTO
Ref: ${projectRef}
Date: ${new Date().toLocaleDateString()}

CLIENT PROFILE:
- Type: ${state.userRole}
- Reference: ${state.reference || "None Provided"}

PROJECT ARCHITECTURE:
- Area: ${state.scope}
- Finish: ${state.fabricationLevel}
- Timeline: ${state.timeline}

MATERIAL SPECIFICATION:
- Stone: ${state.stonePreference !== 'Pending' ? state.stonePreference : recommendation.material}
- Recommendation Logic: ${recommendation.reason}

VISION NOTES:
${state.description || "Awaiting final technical detail."}

--------------------------------------------------
EST. 1993 - FORT PIERCE, FL
This document serves as a digital record of your 
architectural intent. Our master fabricators will 
be in contact to finalize structural details.
--------------------------------------------------
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RSG-Project-${projectRef}.txt`;
    
    setTimeout(() => {
      link.click();
      URL.revokeObjectURL(url);
      setIsDownloading(false);
      showToast(`Project Manifesto Secured`, 'success');
    }, 800);
  };

  return (
    <AnimatePresence mode="wait">
      {view === 'success' ? (
        <motion.div 
          key="success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full h-full flex flex-col items-center justify-center relative z-20 p-6 bg-primary overflow-hidden"
        >
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={PHYSICS.snappy} className="max-w-2xl w-full">
            <div className="bg-surface border border-white/10 p-8 md:p-12 shadow-2xl relative mb-12">
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/40" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/40" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12 pb-8 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-gold rotate-45" />
                        <span className="font-mono text-[10px] text-gold uppercase tracking-[0.4em] font-bold">Architectural Summary</span>
                      </div>
                      <h2 className="text-3xl font-sans font-black uppercase text-white tracking-tighter">REF: {projectRef}</h2>
                      <p className="text-white/40 font-mono text-[10px] mt-2 uppercase tracking-widest leading-none">Verified: {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col items-end">
                       <div className="w-10 h-10 border border-gold/20 flex items-center justify-center bg-gold/5">
                          <Check className="w-5 h-5 text-gold" />
                       </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div className="space-y-6">
                       <div>
                          <span className="block font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-2 font-bold">Client</span>
                          <span className="text-white text-base font-medium">{state.userRole}</span>
                       </div>
                       <div>
                          <span className="block font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-2 font-bold">Scope</span>
                          <span className="text-white text-base font-medium">{state.scope}</span>
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div className="p-6 bg-white/[0.02] border border-white/5 relative">
                          <div className="absolute top-0 left-0 w-1 h-1 bg-gold/40" />
                          <span className="block font-mono text-[9px] text-gold uppercase tracking-[0.2em] mb-3 font-bold">Specified Stone</span>
                          <div className="flex items-center gap-3 text-white">
                             <span className="text-lg font-bold uppercase tracking-tight">
                                {state.stonePreference !== 'Pending' ? state.stonePreference : recommendation.material}
                             </span>
                          </div>
                       </div>
                    </div>
                </div>

                <div className="bg-black/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                   <p className="text-[11px] text-white/40 font-light max-w-sm text-center md:text-left leading-relaxed">
                      Your vision has been successfully logged. Our Senior Curator will review your blueprints and vision notes.
                   </p>
                   <PrecisionBtn onClick={handleDownload} variant="secondary" className="h-12 px-6 text-[9px] whitespace-nowrap min-w-0">
                      {isDownloading ? <Loader2 className="w-3 h-3 animate-spin mr-3" /> : <FileText className="w-3.5 h-3.5 mr-3" />}
                      {isDownloading ? "Securing..." : "Save Manifesto"}
                   </PrecisionBtn>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <PrecisionBtn onClick={() => setView('booking')} variant="primary" className="w-full h-16 max-w-sm">
                <Calendar className="w-4 h-4 mr-3" />
                <span className="font-mono text-[11px] font-bold tracking-[0.3em]">Secure a Showroom Visit</span>
              </PrecisionBtn>

              <button onClick={onClose} className="text-white/40 hover:text-white font-mono text-[10px] uppercase tracking-[0.4em] transition-colors flex items-center gap-2 group">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                Exit Planner
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <BookingStudio 
          onBack={() => setView('success')} 
          onSuccess={() => {
            showToast("Consultation Window Reserved", 'success');
            onClose();
          }}
        />
      )}
    </AnimatePresence>
  );
};