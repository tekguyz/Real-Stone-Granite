
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChefHat, Droplets, Sun, Gem, Gauge, Ruler, LayoutGrid } from 'lucide-react';
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

const BlueprintPlaceholder: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-64 text-center px-6">
    <div className="w-16 h-16 border border-white/5 bg-white/[0.02] flex items-center justify-center mb-6 relative">
      <LayoutGrid className="w-6 h-6 text-white/10" strokeWidth={1} />
      <motion.div 
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 border border-gold/20"
      />
    </div>
    <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] mb-2">Awaiting Specs</span>
    <p className="text-[11px] text-white/10 font-light leading-relaxed">Define project context to initiate <br/>the architectural blueprint.</p>
  </div>
);

export const SummaryPanel: React.FC<SummaryPanelProps> = ({ state, recommendation, projectRef, currentStep }) => {
  const visual = state.scope ? SCOPE_VISUALS[state.scope] : null;
  const ScopeIcon = visual ? visual.icon : null;

  return (
    <div className="w-full h-full p-8 xl:p-12 relative z-10 overflow-hidden flex flex-col">
      
      {/* REACTIVE BACKGROUND (Visual Telemetry) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {visual && (
            <motion.div
              key={state.scope}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.15, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-cover bg-center grayscale"
              style={{ backgroundImage: `url(${visual.img})` }}
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary" />
      </div>

      <div className="h-full flex flex-col scrollbar-hide relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-10 text-white border-b border-white/10 pb-6">
              <FileText className="w-4 h-4 text-gold" />
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold leading-none mb-1">Project Blueprint</span>
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest leading-none">REF: #{projectRef}</span>
              </div>
            </div>

            {!state.scope ? (
              <BlueprintPlaceholder />
            ) : (
              <div className="space-y-10">
                <motion.div layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2 font-bold">Context</span>
                  <div className="flex items-center gap-3">
                    {ScopeIcon && <ScopeIcon className="w-4 h-4 text-gold" />}
                    <span className="text-white text-lg font-light tracking-tight">{state.scope}</span>
                  </div>
                </motion.div>
                
                {state.intensity && (
                  <motion.div layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2 font-bold">Intensity</span>
                    <div className="flex items-center gap-3">
                       <Gauge className="w-4 h-4 text-white/40" />
                       <span className="text-white text-lg font-light tracking-tight">{state.intensity}</span>
                    </div>
                  </motion.div>
                )}

                {recommendation.material !== 'Awaiting Context' && (
                  <motion.div layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2 font-bold">Intelligence Result</span>
                    <div className="flex items-center gap-3 text-gold">
                      <div className="w-1.5 h-1.5 bg-gold rotate-45" />
                      <span className="text-xl font-medium tracking-tight uppercase">
                          {state.stonePreference !== 'Pending' ? state.stonePreference : recommendation.material}
                      </span>
                    </div>
                  </motion.div>
                )}

                {state.fabricationLevel && (
                  <motion.div layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2 font-bold">Tier</span>
                    <div className="flex items-center gap-3">
                       <Ruler className="w-4 h-4 text-white/40" />
                       <span className="text-white text-lg font-light tracking-tight">{state.fabricationLevel}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-auto pt-12">
            <div className="flex justify-between items-center mb-3">
               <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest font-bold">Progress Tracker</span>
               <span className="text-[9px] font-mono text-gold uppercase tracking-widest font-bold">{Math.round((currentStep / 5) * 100)}%</span>
            </div>
            <div className="h-[1px] w-full bg-white/10 overflow-hidden">
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
