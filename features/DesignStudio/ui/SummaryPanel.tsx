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
    <div className="w-full h-full p-8 xl:p-12 relative z-10 overflow-hidden flex flex-col">
      <div className="h-full flex flex-col scrollbar-hide">
          <div className="relative z-20 flex-1">
            <div className="flex items-center gap-3 mb-10 text-white border-b border-white/10 pb-6">
              <FileText className="w-4 h-4 text-gold" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Your Project</span>
            </div>

            <div className="space-y-10">
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">Role</span>
                <span className="text-white text-lg font-light tracking-tight">{state.userRole}</span>
              </div>
              
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">Quality Tier</span>
                <span className={`text-lg font-light tracking-tight ${state.fabricationLevel === 'Artisan Masterpiece' ? 'text-gold' : 'text-white'}`}>
                    {state.fabricationLevel}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">Material</span>
                <div className="flex items-center gap-3 text-gold">
                  <div className="w-1.5 h-1.5 bg-gold rotate-45" />
                  <span className="text-xl font-medium tracking-tight">
                      {state.stonePreference !== 'Light' ? state.stonePreference : recommendation.material}
                  </span>
                </div>
              </div>

              <div className="pt-10 border-t border-white/10">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">Project ID</span>
                  <span className="text-white font-mono text-sm tracking-wide">#{projectRef}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-auto pt-12">
            <div className="h-[1px] w-full bg-white/10">
                <motion.div className="h-full bg-gold" initial={{ width: 0 }} animate={{ width: `${(currentStep / 4) * 100}%` }} transition={PHYSICS.snappy} />
            </div>
          </div>
      </div>
    </div>
  );
};