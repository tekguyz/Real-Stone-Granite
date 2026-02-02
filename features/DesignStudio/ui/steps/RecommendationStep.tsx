
import React from 'react';
import { motion } from 'framer-motion';
import { Info, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ProjectState, Recommendation } from '../../../../entities/project/store';

interface RecommendationStepProps {
  state: ProjectState;
  dispatch: any;
  recommendation: Recommendation;
}

export const RecommendationStep: React.FC<RecommendationStepProps> = ({ state, dispatch, recommendation }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
      
      {/* THE INTELLIGENCE BLOCK */}
      <div className="p-8 border border-white/10 bg-surface/50 relative overflow-hidden rounded-none">
        <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-4 h-4 text-gold" />
            <span className="text-gold font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Consultant's Recommendation</span>
        </div>
        
        <h4 className="text-white text-3xl md:text-4xl font-sans font-light mb-6 tracking-tight">
            We suggest <span className="font-bold text-gold uppercase underline decoration-gold/20 underline-offset-8">{recommendation.material}</span>
        </h4>
        
        <div className="space-y-6">
          <div className="border-l-2 border-gold/30 pl-6 py-2">
            <span className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-3">Technical Rationale</span>
            <div className="prose-stone text-sm max-w-2xl">
                <ReactMarkdown>{recommendation.reason}</ReactMarkdown>
            </div>
          </div>

          {recommendation.warning && (
            <div className="bg-white/[0.03] border border-white/10 p-4 flex items-start gap-3 max-w-xl">
               <Info className="w-3.5 h-3.5 text-gold/60 shrink-0 mt-0.5" />
               <div className="flex flex-col">
                  <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold mb-1">Physical Advisory</span>
                  <p className="text-white/60 text-[11px] font-light leading-relaxed">
                     {recommendation.warning}
                  </p>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* MANUAL OVERRIDE */}
      <div className="space-y-4">
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
            <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold">
                Override Recommendation
            </label>
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Optional Material Browser</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Granite', 'Marble', 'Quartzite', 'Quartz', 'Dekton', 'Onyx', 'Porcelain'].map(m => {
                const isSelected = state.stonePreference === m;
                return (
                 <motion.button
                   key={m}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => dispatch({ type: 'SET_STONE_PREFERENCE', payload: m })}
                   className={`px-5 py-2 text-[10px] uppercase tracking-widest font-mono font-bold border transition-all outline-none rounded-none ${
                     isSelected
                       ? 'bg-gold text-primary border-gold shadow-lg shadow-gold/10'
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
