import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Check } from 'lucide-react';
import { UserRole, ProjectState } from '../../../../entities/project/store';

interface IdentityStepProps {
  state: ProjectState;
  dispatch: any;
}

export const IdentityStep: React.FC<IdentityStepProps> = ({ state, dispatch }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { role: 'Private Residence', icon: User, desc: 'Bespoke Residential Commisions' },
          { role: 'Professional Partner', icon: Briefcase, desc: 'Architects, Builders & Contractors' }
        ].map((item) => {
          const isActive = state.userRole === item.role;
          return (
            <motion.button
              key={item.role}
              whileTap={{ scale: 0.98 }}
              onClick={() => dispatch({ type: 'SET_USER_ROLE', payload: item.role as UserRole })}
              className={`relative group p-8 text-left transition-all duration-300 outline-none flex flex-col justify-center min-h-[140px] border rounded-none ${
                isActive 
                  ? 'bg-surface border-gold text-white shadow-2xl shadow-gold/5' 
                  : 'bg-transparent border-white/10 text-white/40 hover:border-white/20 hover:bg-white/[0.03] hover:text-white'
              }`}
            >
              {/* Background Glow */}
              {isActive && (
                <div className="absolute inset-0 bg-gold/[0.02] pointer-events-none" />
              )}

              <div className="relative z-10 flex items-center gap-8">
                  <div className={`
                    p-4 border transition-all duration-500 
                    ${isActive 
                      ? 'bg-gold text-primary border-gold rotate-0' 
                      : 'bg-white/5 border-white/10 opacity-30 group-hover:opacity-100 group-hover:rotate-6'}
                  `}>
                    <item.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <span className={`block font-sans text-base font-black uppercase tracking-widest mb-1.5 transition-colors ${isActive ? 'text-white' : 'text-inherit'}`}>
                      {item.role}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-tighter opacity-60 leading-tight block">
                      {item.desc}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-gold p-1"
                    >
                      <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                    </motion.div>
                  )}
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="pt-10 border-t border-white/5">
        <div className="flex items-center gap-6 mb-6">
          <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] font-bold whitespace-nowrap">
            Professional Referral
          </label>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        
        <div className="relative group">
          <input 
            type="text"
            value={state.reference}
            onChange={(e) => dispatch({ type: 'SET_REFERENCE', payload: e.target.value })}
            placeholder="Lead Designer, Studio, or Firm Name..."
            className="w-full bg-surface/30 border border-white/10 h-16 px-8 text-white font-sans text-sm focus:border-gold/50 focus:bg-surface/50 outline-none transition-all placeholder:text-white/10"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 group-focus-within:opacity-30 transition-opacity pointer-events-none">
             <Briefcase className="w-5 h-5 text-white" />
          </div>
        </div>
        <p className="mt-4 text-[10px] font-mono text-white/20 uppercase tracking-widest">
          * Provide the name of your coordinating professional for project syncing.
        </p>
      </div>
    </motion.div>
  );
};