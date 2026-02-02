import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase } from 'lucide-react';
import { UserRole, ProjectState } from '../../../../entities/project/store';

interface IdentityStepProps {
  state: ProjectState;
  dispatch: any;
}

export const IdentityStep: React.FC<IdentityStepProps> = ({ state, dispatch }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { role: 'Private Residence', icon: User, desc: 'Homeowners & Residential builds' },
          { role: 'Professional Partner', icon: Briefcase, desc: 'Architects & Design Trade' }
        ].map((item) => {
          const isActive = state.userRole === item.role;
          return (
            <motion.button
              key={item.role}
              whileTap={{ scale: 0.98 }}
              onClick={() => dispatch({ type: 'SET_USER_ROLE', payload: item.role as UserRole })}
              className={`relative group p-5 text-left transition-all outline-none flex flex-col justify-center min-h-[90px] border rounded-none ${
                isActive 
                  ? 'bg-surface border-gold text-white shadow-xl' 
                  : 'bg-transparent border-white/10 text-white/50 hover:border-white/20 hover:bg-white/[0.03] hover:text-white'
              }`}
            >
              <div className="relative z-10 flex items-center gap-4">
                  <div className={`p-2 border transition-colors ${isActive ? 'bg-gold/10 border-gold text-gold' : 'bg-white/5 border-white/10 opacity-40 group-hover:opacity-100'}`}>
                    <item.icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="block font-sans text-[13px] font-bold uppercase tracking-tight mb-0.5">{item.role}</span>
                    <span className="text-[10px] text-current opacity-60 leading-tight block font-light">{item.desc}</span>
                  </div>
              </div>
              {isActive && (
                <div className="absolute top-3 right-3 w-1 h-1 bg-gold rotate-45" />
              )}
            </motion.button>
          )
        })}
      </div>

      <div className="pt-6 border-t border-white/5">
        <label className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] font-bold block mb-3">
          Project Referral
        </label>
        <div className="relative">
          <input 
            type="text"
            value={state.reference}
            onChange={(e) => dispatch({ type: 'SET_REFERENCE', payload: e.target.value })}
            placeholder="Architect, Builder, or Designer name"
            className="w-full bg-surface/40 border border-white/10 h-11 px-4 text-white font-sans text-xs focus:border-gold/30 outline-none transition-all placeholder:text-white/10"
          />
        </div>
      </div>
    </motion.div>
  );
};