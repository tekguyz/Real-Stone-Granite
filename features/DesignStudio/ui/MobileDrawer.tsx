
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronUp, ChevronDown, LayoutGrid } from 'lucide-react';
import { ProjectState, Recommendation } from '../../../entities/project/store';
import { PHYSICS } from '../../../shared/lib/theme';

interface MobileDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  state: ProjectState;
  recommendation: Recommendation;
  projectRef: string;
}

export const MobileSummaryDrawer: React.FC<MobileDrawerProps> = ({ 
  state, 
  recommendation, 
  projectRef, 
  isOpen, 
  onToggle 
}) => {
  return (
    <motion.div 
      className={`fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-gold/20 shadow-[-10px_-10px_30px_rgba(0,0,0,0.5)] lg:hidden flex flex-col`}
      initial={false}
      animate={{ height: isOpen ? '75dvh' : '80px' }}
      transition={PHYSICS.snappy}
    >
      <div onClick={onToggle} className="h-20 w-full flex items-center justify-between px-8 bg-surface border-b border-white/5 cursor-pointer relative z-20">
        <div className="flex flex-col">
          <span className="text-[9px] text-gold font-mono uppercase tracking-widest mb-1">Project ID</span>
          <span className="text-white font-mono text-sm tracking-tighter">#{projectRef}</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted uppercase tracking-widest text-[9px] font-mono">
          {isOpen ? "Hide Details" : "Review Specs"}
          {isOpen ? <ChevronDown className="w-4 h-4 text-gold" /> : <ChevronUp className="w-4 h-4 text-gold" />}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 bg-surface relative">
        {!state.scope ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <LayoutGrid className="w-10 h-10 text-white/10 mb-6" strokeWidth={1} />
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Awaiting Specs</span>
            <p className="text-[11px] text-white/20 font-light leading-relaxed">Complete selection to view summary.</p>
          </div>
        ) : (
          <div className="space-y-10">
            <div>
              <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">Context</span>
              <span className="text-white text-lg font-light">{state.scope}</span>
            </div>
            
            {state.fabricationLevel && (
              <div>
                <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">Tier</span>
                <span className={`text-lg font-light ${state.fabricationLevel === 'Artisan Masterpiece' ? 'text-gold' : 'text-white'}`}>
                    {state.fabricationLevel}
                </span>
              </div>
            )}

            {recommendation.material !== 'Awaiting Context' && (
              <div>
                <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">
                  Selection Result
                </span>
                <div className="flex items-center gap-2 text-gold mb-1">
                  <Check className="w-4 h-4" />
                  <span className="text-lg font-medium uppercase tracking-tight">
                    {state.stonePreference !== 'Pending' ? state.stonePreference : recommendation.material}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
