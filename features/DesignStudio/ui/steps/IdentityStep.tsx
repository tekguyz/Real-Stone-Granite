
import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, CheckCircle2 } from 'lucide-react';
import { UserRole, ProjectState } from '../../../../entities/project/store';

interface IdentityStepProps {
  state: ProjectState;
  dispatch: any;
}

export const IdentityStep: React.FC<IdentityStepProps> = ({ state, dispatch }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-xl mx-auto space-y-12"
    >
      {/* 1. COMPACT ROLE SELECTOR */}
      <div className="space-y-4">
        <label className="text-[9px] font-mono text-white/30 uppercase tracking-[0.4em] font-bold block ml-1">
          Client Category
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { id: 'Private Residence', icon: User, label: 'Residential' },
            { id: 'Professional Partner', icon: Briefcase, label: 'Professional' }
          ].map((item) => {
            const isActive = state.userRole === item.id;
            return (
              <button
                key={item.id}
                onClick={() => dispatch({ type: 'SET_USER_ROLE', payload: item.id as UserRole })}
                className={`
                  relative h-14 px-6 flex items-center gap-4 transition-all duration-300 border outline-none group
                  ${isActive 
                    ? 'bg-gold border-gold text-primary shadow-xl shadow-gold/5' 
                    : 'bg-white/[0.02] border-white/5 text-white/40 hover:border-white/20 hover:text-white'}
                `}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-white/20 group-hover:text-gold'} transition-colors`} strokeWidth={1.5} />
                <span className={`font-sans text-xs font-black uppercase tracking-widest ${isActive ? 'text-primary' : 'text-inherit'}`}>
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="ml-auto"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MINIMALIST REFERRAL INPUT */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
           <label className="text-[9px] font-mono text-white/30 uppercase tracking-[0.4em] font-bold ml-1">
             Professional Referral
           </label>
           <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest italic">Optional</span>
        </div>
        
        <div className="relative group">
          <input 
            type="text"
            autoComplete="off"
            value={state.reference}
            onChange={(e) => dispatch({ type: 'SET_REFERENCE', payload: e.target.value })}
            placeholder="Designer or Firm Name"
            className="w-full bg-black/40 border-b border-white/10 h-10 px-0 text-white font-sans text-sm focus:border-gold transition-all placeholder:text-white/10 outline-none"
          />
          {/* Animated focus line */}
          <motion.div 
            className="absolute bottom-0 left-0 h-px bg-gold"
            initial={{ width: 0 }}
            animate={{ width: state.reference ? '100%' : '0%' }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* 3. SUBTLE CONTEXT NOTE */}
      <div className="pt-4 opacity-30 flex items-center gap-3 justify-center">
         <div className="h-px w-6 bg-white/20" />
         <p className="text-[9px] font-mono uppercase tracking-[0.2em] whitespace-nowrap">
            Personalizing your design suite
         </p>
         <div className="h-px w-6 bg-white/20" />
      </div>
    </motion.div>
  );
};
