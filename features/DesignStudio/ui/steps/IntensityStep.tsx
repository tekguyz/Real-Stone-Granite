import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, ShieldAlert, Sparkles } from 'lucide-react';
import { UsageIntensity, ProjectState } from '../../../../entities/project/store';
import { INTENSITY_OPTIONS } from '../../model/types';
import { PHYSICS } from '../../../../shared/lib/theme';

interface IntensityStepProps {
  state: ProjectState;
  dispatch: any;
}

const ICONS: Record<string, any> = {
  'Visual Art': Sparkles,
  'Moderate Use': Gauge,
  'Heavy Duty': ShieldAlert
};

export const IntensityStep: React.FC<IntensityStepProps> = ({ state, dispatch }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        {INTENSITY_OPTIONS.map((opt) => {
          const isActive = state.intensity === opt.id;
          const Icon = ICONS[opt.id];

          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.995 }}
              onClick={() => dispatch({ type: 'SET_INTENSITY', payload: opt.id as UsageIntensity })}
              className={`
                relative w-full p-4 text-left transition-all duration-300 border flex items-center gap-4 rounded-none outline-none group
                ${isActive 
                  ? 'bg-surface border-gold text-white' 
                  : 'bg-transparent border-white/5 text-white/40 hover:border-white/20 hover:bg-white/[0.02] hover:text-white'}
              `}
              transition={PHYSICS.industrial}
            >
              <div className={`p-2.5 border transition-colors ${isActive ? 'bg-gold text-primary border-gold' : 'bg-white/5 border-white/10 group-hover:border-white/20'}`}>
                <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
              </div>
              
              <div className="flex flex-col flex-1">
                <span className="block font-sans text-xs font-bold tracking-tight uppercase">
                  {opt.label}
                </span>
                <p className="text-[10px] font-light opacity-50 leading-relaxed">
                  {opt.desc}
                </p>
              </div>

              {isActive && (
                <div className="mr-2">
                   <div className="w-1.5 h-1.5 bg-gold rotate-45" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="p-4 bg-white/[0.02] border border-white/5 flex items-start gap-3">
         <div className="mt-1.5 w-1 h-1 bg-gold rotate-45 shrink-0" />
         <p className="text-[10px] font-light text-white/30 leading-relaxed italic">
            Note: Material durability weighting is adjusted based on specific stone porousness and mineral hardness.
         </p>
      </div>
    </motion.div>
  );
};