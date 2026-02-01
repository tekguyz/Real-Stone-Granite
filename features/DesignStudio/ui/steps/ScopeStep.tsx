
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
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {SCOPE_OPTIONS.map((opt) => {
        const isActive = state.scope === opt.id;
        const Icon = ICONS[opt.icon];
        
        return (
          <button
            key={opt.id}
            onClick={() => dispatch({ type: 'SET_SCOPE', payload: opt.id as ProjectScope })}
            className={`
              relative p-6 text-left transition-all outline-none border flex flex-col min-h-[140px] rounded-none
              ${isActive 
                ? 'bg-surface border-gold text-white shadow-lg' 
                : 'bg-transparent border-white/10 text-white/60 hover:border-white/30 hover:bg-white/5 hover:text-white'}
            `}
          >
            <div className="mb-4">
               <Icon className={`w-6 h-6 ${isActive ? 'text-gold' : 'text-current transition-colors'}`} strokeWidth={1.5} />
            </div>
            <div>
               <span className="block font-sans text-base font-bold tracking-tight mb-1 uppercase">{opt.label}</span>
               <span className="text-[11px] font-light opacity-60 leading-relaxed">{opt.desc}</span>
            </div>
            
            {isActive && (
              <div className="absolute top-4 right-4">
                <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              </div>
            )}
          </button>
        );
      })}
    </motion.div>
  );
};
