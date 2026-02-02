import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Droplets, Sun, Gem } from 'lucide-react';
import { ProjectScope, ProjectState } from '../../../../entities/project/store';
import { SCOPE_OPTIONS } from '../../model/types';

interface ScopeStepProps {
  state: ProjectState;
  dispatch: any;
}

const ICONS: Record<string, any> = {
  ChefHat, Droplets, Sun, Gem
};

export const ScopeStep: React.FC<ScopeStepProps> = ({ state, dispatch }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="grid grid-cols-1 md:grid-cols-2 gap-3"
    >
      {SCOPE_OPTIONS.map((opt) => {
        const isActive = state.scope === opt.id;
        const Icon = ICONS[opt.icon];
        
        return (
          <button
            key={opt.id}
            onClick={() => dispatch({ type: 'SET_SCOPE', payload: opt.id as ProjectScope })}
            className={`
              relative p-4 text-left transition-all outline-none border flex items-center gap-4 min-h-[80px] rounded-none group
              ${isActive 
                ? 'bg-surface border-gold text-white shadow-xl' 
                : 'bg-transparent border-white/10 text-white/50 hover:border-white/20 hover:bg-white/[0.03] hover:text-white'}
            `}
          >
            <div className={`p-2 shrink-0 border transition-colors ${isActive ? 'bg-gold/10 border-gold text-gold' : 'bg-white/5 border-white/10 text-white/20 group-hover:text-white group-hover:border-white/30'}`}>
               <Icon className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div>
               <span className="block font-sans text-[12px] font-bold tracking-tight mb-0.5 uppercase">{opt.label}</span>
               <span className="text-[10px] font-light opacity-60 leading-tight block">{opt.desc}</span>
            </div>
            
            {isActive && (
              <div className="absolute top-3 right-3">
                <div className="w-1 h-1 bg-gold rotate-45" />
              </div>
            )}
          </button>
        );
      })}
    </motion.div>
  );
};