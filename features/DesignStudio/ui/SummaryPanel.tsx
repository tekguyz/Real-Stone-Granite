import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { ProjectState, Recommendation } from '../../../entities/project/store';
import { PHYSICS } from '../../../shared/lib/theme';

interface SummaryPanelProps {
  state: ProjectState;
  recommendation: Recommendation;
  projectRef: string;
  currentStep: number;
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({ state, recommendation, projectRef, currentStep }) => {
  return (
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
  );
};