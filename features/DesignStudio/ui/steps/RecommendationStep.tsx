import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Fingerprint, Info, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ProjectState, Recommendation } from '../../../../entities/project/store';

interface RecommendationStepProps {
  state: ProjectState;
  dispatch: any;
  recommendation: Recommendation;
}

export const RecommendationStep: React.FC<RecommendationStepProps> = ({ state, dispatch, recommendation }) => {
  const hasPreference = state.stonePreference !== 'Pending';
  const preferenceMatchesRec = state.stonePreference === recommendation.material;

  const materials = ['Granite', 'Marble', 'Quartzite', 'Quartz', 'Dekton', 'Onyx'];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-8"
    >
      {/* 1. THE ADVISORY PANEL: Unified technical verdict */}
      <div className="relative border border-white/10 bg-surface/20 p-6 md:p-10 overflow-hidden">
        {/* Aesthetic Background Element */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <Sparkles className="w-48 h-48 text-white rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Left Side: The "What" */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <span className="font-mono text-[10px] text-gold uppercase tracking-[0.4em] font-bold">Expert Match</span>
            </div>
            
            <h4 className="text-4xl md:text-6xl font-sans font-black text-white uppercase tracking-tighter leading-none">
              {recommendation.material}
            </h4>

            <div className="flex items-center gap-3 py-2">
              <ShieldCheck className="w-4 h-4 text-gold/60" />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Performance Verified</span>
            </div>
          </div>

          {/* Right Side: The "Why" */}
          <div className="flex-1 lg:pl-12 border-l border-white/5 space-y-6">
            <div className="prose-stone max-w-none">
              <ReactMarkdown>{recommendation.reason}</ReactMarkdown>
            </div>
            
            {recommendation.warning && (
              <div className="flex gap-3 items-start text-white/40">
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <p className="text-[10px] font-light leading-relaxed italic">{recommendation.warning}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. CONTEXT NOTE: Only if preference differs */}
      {hasPreference && !preferenceMatchesRec && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 px-6 py-4 border border-gold/10 bg-gold/[0.03]"
        >
          <Fingerprint className="w-4 h-4 text-gold/40 shrink-0" />
          <p className="text-[11px] text-white/60 font-light leading-snug">
            We noted your earlier preference for <span className="text-gold font-bold">"{state.stonePreference}"</span>. 
            While we advise <span className="text-white font-bold">{recommendation.material}</span> for longevity, our specialists can tailor either choice to your space.
          </p>
        </motion.div>
      )}

      {/* 3. FINAL SELECTION: Clean Selection Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-[9px] font-mono text-white/30 uppercase tracking-[0.4em] font-bold">
            Select Your Specification
          </label>
          <div className="h-px flex-1 bg-white/5 ml-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {materials.map(m => {
            const isSelected = state.stonePreference === m;
            const isRecommended = recommendation.material.includes(m);
            const isUserPref = state.stonePreference === m && hasPreference;

            return (
              <motion.button
                key={m}
                whileTap={{ scale: 0.98 }}
                onClick={() => dispatch({ type: 'SET_STONE_PREFERENCE', payload: m })}
                className={`
                  relative group px-5 py-4 text-left border transition-all duration-300 rounded-none overflow-hidden
                  ${isSelected 
                    ? 'bg-gold border-gold text-primary shadow-xl shadow-gold/5' 
                    : 'bg-surface/40 border-white/5 text-white/40 hover:border-gold/30 hover:text-white'}
                `}
              >
                {/* Visual Indicators */}
                {isRecommended && !isSelected && (
                  <div className="absolute top-2 right-2">
                    <Sparkles className="w-3 h-3 text-gold/40" />
                  </div>
                )}
                
                <div className="flex flex-col gap-1">
                  <span className={`text-xs font-mono font-bold uppercase tracking-widest ${isSelected ? 'text-primary' : 'text-inherit'}`}>
                    {m}
                  </span>
                  {isRecommended && (
                    <span className={`text-[8px] font-mono uppercase tracking-tighter ${isSelected ? 'text-primary/60' : 'text-gold'}`}>
                      Expert Choice
                    </span>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
        
        <div className="flex justify-center">
          <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em] text-center max-w-sm">
            Your selection determines the final fabrication specifications in our facility ledger.
          </p>
        </div>
      </div>
    </motion.div>
  );
};