import React from 'react';
import { motion } from 'framer-motion';
import { Info, Sparkles, Target } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ProjectState, Recommendation } from '../../../../entities/project/store';

interface RecommendationStepProps {
  state: ProjectState;
  dispatch: any;
  recommendation: Recommendation;
}

export const RecommendationStep: React.FC<RecommendationStepProps> = ({ state, dispatch, recommendation }) => {
  const isUserSelected = state.stonePreference !== 'Pending';

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      
      <div className="p-8 border border-white/5 bg-surface/30 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-gold font-mono text-[9px] uppercase tracking-[0.4em] font-bold">Analysis Result</span>
            </div>
            {isUserSelected && (
              <div className="flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/30">
                 <Target className="w-2.5 h-2.5 text-gold" />
                 <span className="text-[8px] font-mono text-gold uppercase tracking-widest font-bold">Context Matched</span>
              </div>
            )}
        </div>
        
        <div className="mb-8">
          <span className="block text-[10px] text-white/30 uppercase tracking-widest font-bold mb-2">Recommended Material</span>
          <h4 className="text-white text-3xl md:text-5xl font-sans font-light tracking-tighter uppercase leading-none">
              {isUserSelected ? state.stonePreference : recommendation.material}
          </h4>
          {isUserSelected && (
            <span className="text-[9px] text-gold/60 font-mono uppercase tracking-widest mt-2 block">
              Based on your curation session
            </span>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="border-l border-gold/40 pl-6">
            <span className="block text-[9px] text-white/30 uppercase tracking-widest font-bold mb-3 font-mono">Rationale</span>
            <div className="text-sm font-light text-white/70 leading-relaxed max-w-2xl">
                <ReactMarkdown>
                  {isUserSelected 
                    ? `You've selected **${state.stonePreference}**. Our analysis confirms this is a high-performance choice for a **${state.scope || 'project'}** with **${state.intensity || 'standard'}** usage requirements. ${recommendation.reason}`
                    : recommendation.reason}
                </ReactMarkdown>
            </div>
          </div>

          {recommendation.warning && (
            <div className="bg-white/[0.02] border border-white/5 p-4 flex items-start gap-3 max-w-xl">
               <Info className="w-3 h-3 text-gold opacity-50 shrink-0 mt-0.5" />
               <p className="text-white/40 text-[10px] font-light leading-relaxed">
                  {recommendation.warning}
               </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
          <label className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] font-bold block">
              Manual Override
          </label>

          <div className="flex flex-wrap gap-2">
            {['Granite', 'Marble', 'Quartzite', 'Quartz', 'Dekton', 'Onyx'].map(m => {
                const isSelected = state.stonePreference === m;
                return (
                 <motion.button
                   key={m}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => dispatch({ type: 'SET_STONE_PREFERENCE', payload: m })}
                   className={`px-4 py-2 text-[10px] uppercase tracking-widest font-mono font-bold border transition-all rounded-none ${
                     isSelected
                       ? 'bg-gold text-primary border-gold shadow-lg shadow-gold/10'
                       : 'bg-transparent text-white/40 border-white/10 hover:border-gold hover:text-gold'
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