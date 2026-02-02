import React from 'react';
import { motion } from 'framer-motion';
import { Check, Gauge, ShieldAlert, Sparkles } from 'lucide-react';
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
      className="space-y-8"
    >
      <div className="flex flex-col gap-4">
        {INTENSITY_OPTIONS.map((opt, idx) => {
          const isActive = state.intensity === opt.id;
          const Icon = ICONS[opt.id];

          return (
            <motion.button
              key={opt.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => dispatch({ type: 'SET_INTENSITY', payload: opt.id as UsageIntensity })}
              className={`
                relative w-full p-6 text-left transition-all duration-300 border flex items-center gap-6 rounded-none outline-none group
                ${isActive 
                  ? 'bg-surface border-gold text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)]' 
                  : 'bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:bg-white/5 hover:text-white'}
              `}
              transition={PHYSICS.industrial}
            >
              {/* 1. Telemetry Index */}
              <div className="hidden md:flex flex-col items-center justify-center shrink-0 w-12 border-r border-white/10 pr-6 mr-2">
                 <span className={`font-mono text-[10px] ${isActive ? 'text-gold' : 'opacity-30'}`}>
                    0{idx + 1}
                 </span>
                 <div className={`w-[1px] h-8 mt-2 ${isActive ? 'bg-gold/50' : 'bg-white/10'}`} />
              </div>

              {/* 2. Content */}
              <div className="flex-1 flex items-center gap-6">
                 <div className={`p-4 border transition-colors ${isActive ? 'bg-gold text-primary border-gold' : 'bg-white/5 border-white/10 group-hover:border-white/30'}`}>
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                 </div>
                 
                 <div className="flex flex-col">
                    <span className="block font-sans text-lg font-bold tracking-tight uppercase mb-1">
                      {opt.label}
                    </span>
                    <p className="text-[11px] font-light leading-relaxed opacity-60 max-w-sm">
                      {opt.desc}
                    </p>
                 </div>
              </div>

              {/* 3. Active Indicator (Diamond) */}
              {isActive && (
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 45 }}
                  className="absolute top-0 right-0 w-8 h-8 bg-gold flex items-center justify-center"
                >
                   <Check className="w-4 h-4 text-primary -rotate-45" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Industrial Footer Advisory */}
      <div className="p-6 bg-black/40 border-l border-gold/30 flex items-start gap-5 backdrop-blur-sm">
         <div className="mt-1 w-2 h-2 bg-gold/50 rotate-45 shrink-0" />
         <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono text-gold uppercase tracking-[0.2em] font-bold">Structural Advisory</span>
            <p className="text-[11px] font-light text-white/50 leading-relaxed italic">
               Selection affects the structural reinforcement protocols during fabrication. "Heavy Duty" environments utilize specialized mechanical anchoring for increased tensile strength.
            </p>
         </div>
      </div>
    </motion.div>
  );
};