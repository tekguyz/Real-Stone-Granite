import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronUp, ChevronDown } from 'lucide-react';
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
          {isOpen ? "Hide" : "Review"}
          {isOpen ? <ChevronDown className="w-4 h-4 text-gold" /> : <ChevronUp className="w-4 h-4 text-gold" />}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 bg-surface relative">
        <div className="space-y-10">
           <div>
             <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">Role</span>
             <span className="text-white text-lg font-light">{state.userRole}</span>
           </div>
           
           <div>
             <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">Tier</span>
             <span className={`text-lg font-light ${state.fabricationLevel === 'Artisan Masterpiece' ? 'text-gold' : 'text-white'}`}>
                {state.fabricationLevel}
             </span>
           </div>

           <div>
             <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-2">
               Selection
             </span>
             <div className="flex items-center gap-2 text-gold mb-1">
               <Check className="w-4 h-4" />
               <span className="text-lg font-medium uppercase tracking-tight">
                  {state.stonePreference !== 'Light' ? state.stonePreference : recommendation.material}
               </span>
             </div>
           </div>
         </div>
      </div>
    </motion.div>
  );
};