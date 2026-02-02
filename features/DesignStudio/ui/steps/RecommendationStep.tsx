
import React from 'react';
import { motion } from 'framer-motion';
import { Info, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ProjectState, Recommendation } from '../../../../entities/project/store';

interface RecommendationStepProps {
  state: ProjectState;
  dispatch: any;
  recommendation: Recommendation;
}

export const RecommendationStep: React.FC<RecommendationStepProps> = ({ state, dispatch, recommendation }) => {
  const materials = ['Granite', 'Marble', 'Quartzite', 'Quartz', 'Dekton', 'Onyx'];

  const checkIsRecommended = (m: string) => {
    const recText = recommendation.material.toLowerCase();
    const materialKey = m.toLowerCase();
    const regex = new RegExp(`\\b${materialKey}\\b`, 'i');
    return regex.test(recText);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-12"
    >
      {/* CLEANER CARD DESIGN */}
      <div className="relative border-l-2 border-gold bg-gradient-to-r from-white/[0.03] to-transparent p-8 md:p-10">
        
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-gold uppercase tracking-[0.4em] font-bold">
              Architectural Suggestion
            </span>
            <h4 className="text-4xl md:text-5xl font-sans font-light text-white uppercase tracking-tight leading-none">
              {recommendation.material}
            </h4>
          </div>

          <div className="max-w-xl">
             <div className="prose-stone text-sm md:text-base leading-relaxed opacity-90 font-light">
                <ReactMarkdown>{recommendation.reason}</ReactMarkdown>
             </div>
             
             {recommendation.warning && (
              <div className="flex gap-4 items-start mt-6 text-white/40 pt-4 border-t border-white/5">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-[10px] font-mono uppercase tracking-widest leading-relaxed">{recommendation.warning}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-6">
        <label className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] font-bold block ml-1">
          Confirm Material Selection
        </label>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {materials.map(m => {
            const isSelected = state.stonePreference === m;
            const isRecommended = checkIsRecommended(m);

            return (
              <button
                key={m}
                onClick={() => dispatch({ type: 'SET_STONE_PREFERENCE', payload: m })}
                className={`
                  relative px-6 py-4 text-left transition-all duration-300 border outline-none
                  ${isSelected 
                    ? 'bg-white text-black border-white shadow-lg' 
                    : 'bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white'}
                `}
              >
                <span className={`text-[11px] font-mono font-bold uppercase tracking-widest block ${isSelected ? 'text-black' : 'text-inherit'}`}>
                  {m}
                </span>
                
                {isRecommended && !isSelected && (
                   <span className="text-[8px] font-mono uppercase tracking-tight text-gold absolute top-2 right-2">
                     Suggested
                   </span>
                )}

                {isSelected && (
                  <div className="absolute top-1/2 right-4 -translate-y-1/2">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  );
};
