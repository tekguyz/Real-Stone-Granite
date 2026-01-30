import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { PHYSICS } from '../../../shared/lib/theme';

interface FloatingControlsProps {
  showTopBtn: boolean;
  showChatFab: boolean;
  isOpen: boolean;
  scrollToTop: () => void;
  openChat: () => void;
}

const SurveyorDiamondIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-6 h-6 text-gold drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 5 L19 12 L12 19 L5 12 Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
    <path 
      d="M17 17 L21 21 L21 17 Z" 
      fill="currentColor" 
    />
  </svg>
);

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  showTopBtn, showChatFab, isOpen, scrollToTop, openChat
}) => {
  return (
    <div className="flex flex-col items-center gap-4 pointer-events-auto">
      <AnimatePresence>
        {showTopBtn && !isOpen && (
          <motion.button
            key="top-btn"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            whileHover={{ borderColor: 'var(--color-gold)', color: 'var(--color-gold)' }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 md:w-[42px] md:h-[42px] bg-transparent border border-white/20 flex items-center justify-center text-text-muted transition-all shadow-xl"
          >
            <ArrowUp className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChatFab && !isOpen && (
          <motion.button
            key="chat-btn"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={openChat}
            whileHover={{ scale: 1.05, borderColor: 'rgba(212,175,55,0.5)' }}
            whileTap={{ scale: 0.95 }}
            transition={PHYSICS.snappy}
            className="w-12 h-12 md:w-14 md:h-14 bg-surface border border-white/10 flex items-center justify-center shadow-2xl relative group"
          >
            <SurveyorDiamondIcon />
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};