
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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { role: 'Private Residence', icon: User, desc: 'Homeowners & Private Clients' },
          { role: 'Professional Partner', icon: Briefcase, desc: 'Architects, Designers & Builders' }
        ].map((item) => {
          const isActive = state.userRole === item.role;
          return (
            <motion.button
              key={item.role}
              whileTap={{ scale: 0.99 }}
              onClick={() => dispatch({ type: 'SET_USER_ROLE', payload: item.role as UserRole })}
              className={`relative group p-6 text-left transition-all outline-none flex flex-col justify-center min-h-[160px] border rounded-none ${
                isActive 
                  ? 'bg-surface border-gold text-white shadow-lg' 
                  : 'bg-transparent border-white/10 text-white/60 hover:border-white/30 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="relative z-10">
                  <item.icon className={`w-6 h-6 mb-4 ${isActive ? 'text-gold' : 'text-current transition-colors'}`} strokeWidth={1.5} />
                  <span className="block font-sans text-lg font-medium tracking-tight mb-2">{item.role}</span>
                  <span className="text-xs text-current opacity-70">{item.desc}</span>
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="pt-6 border-t border-white/5">
        <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold block mb-4">
          Professional Referral (Optional)
        </label>
        <div className="relative">
          <input 
            type="text"
            value={state.reference}
            onChange={(e) => dispatch({ type: 'SET_REFERENCE', payload: e.target.value })}
            placeholder="Architect, Interior Designer, or Contractor Name"
            className="w-full bg-surface border border-white/10 h-14 px-5 text-white font-sans text-sm focus:border-gold/50 outline-none transition-all placeholder:text-white/20"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-mono text-white/20 uppercase tracking-widest hidden md:block">
            Project Partner
          </div>
        </div>
      </div>
    </motion.div>
  );
};
