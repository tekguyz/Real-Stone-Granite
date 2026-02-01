
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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { role: 'Private Residence', icon: User, desc: 'For homeowners' },
        { role: 'Professional Partner', icon: Briefcase, desc: 'For architects & designers' }
      ].map((item) => {
        const isActive = state.userRole === item.role;
        return (
          <motion.button
            key={item.role}
            whileTap={{ scale: 0.99 }}
            onClick={() => dispatch({ type: 'SET_USER_ROLE', payload: item.role as UserRole })}
            className={`relative group p-6 text-left transition-all outline-none flex flex-col justify-center min-h-[160px] border rounded-sm ${
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
    </motion.div>
  );
};
