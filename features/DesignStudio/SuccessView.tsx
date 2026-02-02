import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, ArrowLeft, Loader2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { PHYSICS, HEX } from '../../shared/lib/theme';
import { useToast } from '../../shared/ui/Toast';
import { useProjectStore } from '../../entities/project/store';

interface SuccessViewProps {
  onClose: () => void;
  projectRef: string;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ onClose, projectRef }) => {
  const { showToast } = useToast();
  const { state, recommendation } = useProjectStore();
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fireMetallicShavings = () => {
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 30000 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 40 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: [HEX.gold, HEX.silver, HEX.bronze], shapes: ['square'] });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: [HEX.gold, HEX.silver, HEX.bronze], shapes: ['square'] });
      }, 250);
    };
    const timer = setTimeout(fireMetallicShavings, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      showToast(`Project Plan Saved`, 'success');
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative z-20 p-6 bg-primary overflow-hidden">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={PHYSICS.snappy} className="max-w-2xl w-full">
        <div className="bg-surface border border-white/10 p-8 md:p-12 shadow-2xl relative mb-12">
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/40" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/40" />

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12 pb-8 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-gold rotate-45" />
                    <span className="font-mono text-[10px] text-gold uppercase tracking-[0.4em] font-bold">Your Project Plan</span>
                  </div>
                  <h2 className="text-3xl font-sans font-black uppercase text-white tracking-tighter">Reference: {projectRef}</h2>
                  <p className="text-white/40 font-mono text-[10px] mt-2 uppercase tracking-widest">Plan created: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col items-end">
                   <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold font-mono text-[10px] uppercase tracking-widest font-bold">Plan Received</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                   <div>
                      <span className="block font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-2 font-bold">About You</span>
                      <span className="text-white text-base font-medium">{state.userRole}</span>
                   </div>
                   <div>
                      <span className="block font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-2 font-bold">Project Area</span>
                      <span className="text-white text-base font-medium">{state.scope}</span>
                   </div>
                </div>
                <div className="space-y-6">
                   <div className="p-4 bg-white/[0.03] border border-white/5">
                      <span className="block font-mono text-[9px] text-gold uppercase tracking-[0.2em] mb-3 font-bold">Your Recommended Stone</span>
                      <div className="flex items-center gap-3 text-white mb-2">
                         <Check className="w-4 h-4 text-gold" />
                         <span className="text-lg font-bold uppercase tracking-tight">
                            {state.stonePreference !== 'Pending' ? state.stonePreference : recommendation.material}
                         </span>
                      </div>
                   </div>
                </div>
            </div>

            <div className="bg-black/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
               <p className="text-[11px] text-white/40 font-light max-w-sm text-center md:text-left">
                  Our team will review your details and reach out to you within one business day to discuss the next steps.
               </p>
               <PrecisionBtn onClick={handleDownload} variant="secondary" className="h-10 px-6 text-[9px] whitespace-nowrap min-w-0">
                  {isDownloading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                  Save Your Plan
               </PrecisionBtn>
            </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <PrecisionBtn onClick={() => showToast("Opening our calendar...", 'info')} variant="primary" className="w-full h-14 max-w-sm">
            <Calendar className="w-4 h-4" />
            <span className="font-mono text-[10px] font-bold tracking-[0.2em]">Book a showroom visit</span>
          </PrecisionBtn>

          <button onClick={onClose} className="text-white/40 hover:text-white font-mono text-[10px] uppercase tracking-[0.4em] transition-colors flex items-center gap-2 group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Exit Planner
          </button>
        </div>
      </motion.div>
    </div>
  );
};