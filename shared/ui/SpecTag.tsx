
import React from 'react';

interface SpecTagProps {
  label: string;
  className?: string;
}

export const SpecTag: React.FC<SpecTagProps> = ({ label, className = '' }) => {
  return (
    <div className={`inline-flex items-center px-3 py-1 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-text-muted select-none hover:border-gold/50 hover:text-gold transition-colors duration-300 ${className}`}>
      {label}
    </div>
  );
};
