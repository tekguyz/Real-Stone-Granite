
import React from 'react';
import { motion } from 'framer-motion';

interface MachineCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MachineCard: React.FC<MachineCardProps> = ({ children, className = '', onClick }) => {
  return (
    <motion.div
      className={`bg-surface border border-white/10 p-6 relative overflow-hidden cursor-pointer ${className}`}
      whileHover={{ y: -2, borderColor: 'var(--color-gold)' }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
