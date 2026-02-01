
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChefHat, Droplets, Sun, Gem, Gauge } from 'lucide-react';
import { ProjectState, Recommendation } from '../../../entities/project/store';
import { PHYSICS } from '../../../shared/lib/theme';

interface SummaryPanelProps {
  state: ProjectState;
  recommendation: Recommendation;
  projectRef: string;
  currentStep: number;
}

const SCOPE_VISUALS: Record<string, { img: string; icon: any }> = {
  'Culinary Surface': {
    img: 'https://images.unsplash.com/photo-1600607687940-4e789269c27b?auto=format&fit=crop&q=80&w=800',
    icon: ChefHat
  },
  'Wet Environment': {
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    icon: Droplets
  },
  'Exterior Architecture': {
    img: 'https://images.unsplash.com/photo-1590422501099-17937ac4f04b?auto=format&fit=crop&q=80&w=800',
    icon: Sun
  },
  'Statement Piece': {
    img: 'https://images.unsplash.com/photo-1582736486022-723eb1b78298?auto=format&fit=crop&q=80&w=800',
    icon: Gem
  }
};

export const SummaryPanel: React.FC<SummaryPanelProps> = ({ state, recommendation, projectRef, currentStep }) => {
  const visual = SCOPE_VISUALS[state.scope];
  const ScopeIcon = visual.icon;

  return (
    <div className="w-full h-full p-8 xl:p-12 relative z-10 overflow-hidden flex flex-col">
      
      {/* REACTIVE BACKGROUND (Visual Telemetry) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.scope}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center grayscale"
            style={{ backgroundImage: `url(${visual.img})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary" />
      </div>

      <div className="h-full flex flex-col scrollbar-hide relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-10 text-white border-b border-white/10 pb-6">
              <FileText className="w-4 h-4 text-gold" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Project Blueprint</span>
            </div>

            <div className="space-y-10">
              <motion.div layout>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2 font-bold">Context</span>
                <div className="flex items-center gap-3">
                  <ScopeIcon className="w-4 h-4 text-gold" />
                  <span className="text-white text-lg font-light tracking-tight">{state.scope}</span>
                </div>
              </motion.div>
              
              <motion.div layout>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2 font-bold">Intensity</span>
                <div className="flex items-center gap-3">
                   <Gauge className="w-4 h-4 text-white/40" />
                   <span className="text-white text-lg font-light tracking-tight">{state.intensity}</span>
                </div>
              </motion.div>

              <motion.div layout>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2 font-bold">Intelligence Recommendation</span>
                <div className="flex items-center gap-3 text-gold">
                  <div className="w-1.5 h-1.5 bg-gold rotate-45" />
                  <span className="text-xl font-medium tracking-tight">
                      {state.stonePreference !== 'Pending' ? state.stonePreference : recommendation.material}
                  </span>
                </div>
              </motion.div>

              <div className="pt-10 border-t border-white/10">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">Project Reference</span>
                  <span className="text-white font-mono text-sm tracking-wide">#{projectRef}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-auto pt-12">
            <div className="h-[1px] w-full bg-white/10">
                <motion.div 
                  className="h-full bg-gold" 
                  initial={{ width: 0 }} 
                  animate={{ width: `${(currentStep / 5) * 100}%` }} 
                  transition={PHYSICS.snappy} 
                />
            </div>
          </div>
      </div>
    </div>
  );
};
