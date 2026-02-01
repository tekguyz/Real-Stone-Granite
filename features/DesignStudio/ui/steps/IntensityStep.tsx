
import React from 'react';
import { motion } from 'framer-motion';
import { UsageIntensity, ProjectState } from '../../../../entities/project/store';
import { INTENSITY_OPTIONS } from '../../model/types';
import { PHYSICS } from '../../../../shared/lib/theme';

interface IntensityStepProps {
  state: ProjectState;
  dispatch: any;
}

export const IntensityStep: React.FC<IntensityStepProps> = ({ state, dispatch }) => {
  const currentIndex = INTENSITY_OPTIONS.findIndex(opt => opt.id === state.intensity);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
      <div className="space-y-8">
        <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] font-bold block mb-4">
          Define Usage Intensity
        </label>
        
        <div className="relative h-20 flex items-center px-2">
            {/* Track */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2" />
            <motion.div 
              className="absolute top-1/2 left-0 h-[2px] bg-gold -translate-y-1/2" 
              initial={false} 
              animate={{ width: `${(currentIndex / (INTENSITY_OPTIONS.length - 1)) * 100}%` }} 
              transition={PHYSICS.snappy} 
            />
            
            {/* Markers */}
            <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2 pointer-events-none">
              {INTENSITY_OPTIONS.map((opt, i) => (
                <div key={opt.id} className="relative flex flex-col items-center">
                   <div 
                    className={`w-3 h-3 transition-colors duration-500 border border-primary rounded-none rotate-45 ${i <= currentIndex ? 'bg-gold border-gold' : 'bg-surface border-white/20'}`} 
                   />
                </div>
              ))}
            </div>

            {/* Hidden Click Targets */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
              {INTENSITY_OPTIONS.map((opt) => (
                <div 
                  key={opt.id} 
                  className="flex-1 h-full cursor-pointer z-10" 
                  onClick={() => dispatch({ type: 'SET_INTENSITY', payload: opt.id as UsageIntensity })} 
                />
              ))}
            </div>
        </div>

        {/* Selected Description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {INTENSITY_OPTIONS.map((opt, i) => (
            <div 
              key={opt.id}
              className={`p-4 border transition-all duration-500 ${i === currentIndex ? 'border-gold/50 bg-white/5' : 'border-transparent opacity-30'}`}
            >
               <span className="block font-sans text-xs font-bold uppercase tracking-widest text-white mb-2">{opt.label}</span>
               <p className="text-[10px] font-light leading-relaxed text-white/60">{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-gold/5 border-l-2 border-gold flex items-start gap-4">
         <div className="mt-1 w-2 h-2 bg-gold rotate-45" />
         <p className="text-xs font-light text-white/80 leading-relaxed italic">
            "We calibrate our fabrication methods to match the abuse level your surfaces will endure. Heavy Duty environments receive specialized structural reinforcement."
         </p>
      </div>
    </motion.div>
  );
};
