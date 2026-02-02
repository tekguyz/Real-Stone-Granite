import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Info, ShieldCheck, Layers, Gauge, Thermometer, Droplets } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ProjectState, Recommendation } from '../../../../entities/project/store';

interface RecommendationStepProps {
  state: ProjectState;
  dispatch: any;
  recommendation: Recommendation;
}

const MetricItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex flex-col gap-1 border-l border-white/5 pl-4">
    <div className="flex items-center gap-2">
      <Icon className="w-3 h-3 text-gold/40" />
      <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.2em]">{label}</span>
    </div>
    <span className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">{value}</span>
  </div>
);

export const RecommendationStep: React.FC<RecommendationStepProps> = ({ state, dispatch, recommendation }) => {
  const materials = ['Granite', 'Marble', 'Quartzite', 'Quartz', 'Dekton', 'Onyx'];

  const isQuartzite = recommendation.material.toLowerCase().includes('quartzite');
  const isDekton = recommendation.material.toLowerCase().includes('dekton');

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
      <div className="relative border border-white/10 bg-surface/30 p-8 md:p-10">
        <div className="absolute top-0 right-0 p-4 border-b border-l border-white/5 bg-black/20">
          <Layers className="w-4 h-4 text-gold/40" strokeWidth={1} />
        </div>

        <div className="flex flex-col gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="font-mono text-[10px] text-gold uppercase tracking-[0.4em] font-bold">Selection Insight</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h4 className="text-3xl md:text-4xl font-sans font-black text-white uppercase tracking-tight leading-none">
                {recommendation.material}
              </h4>
              <div className="flex items-center gap-3 border border-gold/20 px-3 py-1.5 bg-gold/5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span className="text-[9px] font-mono text-gold uppercase tracking-[0.2em] font-bold whitespace-nowrap">Expert Match</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/5">
            <MetricItem icon={Gauge} label="Hardness" value={isQuartzite ? "7.5 MOHS" : "6.0 MOHS"} />
            <MetricItem icon={Thermometer} label="Heat Resistance" value={isDekton ? "1200°F" : "450°F"} />
            <MetricItem icon={Droplets} label="Porosity" value="Low" />
            <MetricItem icon={Fingerprint} label="Origin" value="Global Sourced" />
          </div>

          <div className="max-w-xl">
             <div className="prose-stone text-xs md:text-sm leading-relaxed opacity-80 italic">
                <ReactMarkdown>{recommendation.reason}</ReactMarkdown>
             </div>
             {recommendation.warning && (
              <div className="flex gap-3 items-center mt-6 text-white/30 border-t border-white/5 pt-4">
                <Info className="w-3 h-3 shrink-0" />
                <p className="text-[9px] font-mono uppercase tracking-widest">{recommendation.warning}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <label className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] font-bold whitespace-nowrap">
            Confirm Selection
          </label>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {materials.map(m => {
            const isSelected = state.stonePreference === m;
            const isRecommended = checkIsRecommended(m);

            return (
              <button
                key={m}
                onClick={() => dispatch({ type: 'SET_STONE_PREFERENCE', payload: m })}
                className={`
                  relative group px-6 py-5 text-left transition-all duration-300 border rounded-none overflow-hidden
                  ${isSelected 
                    ? 'bg-gold border-gold text-primary' 
                    : 'bg-transparent border-white/10 text-white/30 hover:border-gold/30 hover:text-white'}
                `}
              >
                <div className="flex flex-col gap-1.5">
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-widest ${isSelected ? 'text-primary' : 'text-inherit'}`}>
                    {m}
                  </span>
                  {isRecommended && (
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-primary' : 'bg-gold'}`} />
                      <span className={`text-[9px] font-mono uppercase tracking-widest ${isSelected ? 'text-primary/60' : 'text-gold'}`}>
                        Master Match
                      </span>
                    </div>
                  )}
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-1.5 h-1.5 bg-primary rotate-45" />
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