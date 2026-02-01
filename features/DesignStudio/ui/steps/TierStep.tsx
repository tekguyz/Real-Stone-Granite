
import React from 'react';
import { motion } from 'framer-motion';
import { Box, Ruler } from 'lucide-react';
import { FabricationLevel, ProjectState } from '../../../../entities/project/store';

interface TierStepProps {
  state: ProjectState;
  dispatch: any;
}

export const TierStep: React.FC<TierStepProps> = ({ state, dispatch }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {[
        { id: 'Classic Selection', icon: Box, title: 'Classic Selection', desc: 'Standard finishing focused on the raw beauty of natural stone.' },
        { id: 'Artisan Masterpiece', icon: Ruler, title: 'Artisan Masterpiece', desc: 'Complex structural details, mitered edges, and custom fabrication.' }
      ].map(tier => {
        const isActive = state.fabricationLevel === tier.id;
        return (
          <button
            key={tier.id}
            onClick={() => dispatch({ type: 'SET_FABRICATION_LEVEL', payload: tier.id as FabricationLevel })}
            className={`relative w-full group p-6 flex items-start gap-6 transition-all outline-none border rounded-sm ${
              isActive 
                ? 'bg-surface border-gold text-white shadow-lg' 
                : 'bg-transparent border-white/10 text-white/60 hover:border-white/30 hover:bg-white/5 hover:text-white'
            }`}
          >
              <div className={`relative z-10 flex items-start gap-6 w-full`}>
                <div className={`p-3 border rounded-sm ${isActive ? 'bg-gold text-primary border-gold' : 'bg-transparent border-white/20 group-hover:border-white/50'}`}>
                   <tier.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="text-left flex-1">
                  <span className="block font-sans text-lg font-medium tracking-tight mb-1">{tier.title}</span>
                  <p className="text-sm font-light leading-relaxed max-w-lg opacity-80">{tier.desc}</p>
                </div>
              </div>
          </button>
        )
      })}
    </motion.div>
  );
};
