
import React from 'react';
import { motion } from 'framer-motion';
import { ProjectState, Recommendation } from '../../../../entities/project/store';

interface RecommendationStepProps {
  state: ProjectState;
  dispatch: any;
  recommendation: Recommendation;
}

export const RecommendationStep: React.FC<RecommendationStepProps> = ({ state, dispatch, recommendation }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
      <div className="p-8 border border-gold/30 bg-surface/50 relative overflow-hidden rounded-sm">
        <div className="flex items-center gap-3 mb-4">
            <span className="text-gold font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Suggestion</span>
        </div>
        <h4 className="text-white text-2xl md:text-3xl font-sans font-light mb-4">
            We recommend <span className="font-medium text-gold">{recommendation.material}</span>.
        </h4>
        <p className="text-white/80 text-sm leading-relaxed font-light max-w-2xl">
            {recommendation.reason}
        </p>
      </div>

      <div className="space-y-4">
          <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold block mb-2">
              Browse Other Options
          </label>
          <div className="flex flex-wrap gap-2">
            {['Granite', 'Marble', 'Quartzite', 'Quartz', 'Dekton', 'Onyx'].map(m => {
                const isSelected = state.stonePreference === m;
                return (
                 <motion.button
                   key={m}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => dispatch({ type: 'SET_STONE_PREFERENCE', payload: m })}
                   className={`px-5 py-2 text-[10px] uppercase tracking-widest font-mono font-bold border transition-all outline-none rounded-sm ${
                     isSelected
                       ? 'bg-gold text-primary border-gold'
                       : 'bg-transparent text-white/60 border-white/10 hover:border-gold hover:text-gold'
                   }`}
                 >
                   {m}
                 </motion.button>
                )
            })}
          </div>
      </div>
    </motion.div>
  );
};
