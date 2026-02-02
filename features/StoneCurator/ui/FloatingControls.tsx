import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageSquare } from 'lucide-react';
import { PHYSICS } from '../../../shared/lib/theme';

interface FloatingControlsProps {
  showTopBtn: boolean;
  showChatFab: boolean;
  isOpen: boolean;
  hasUnread: boolean;
  scrollToTop: () => void;
  openChat: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  showTopBtn, showChatFab, isOpen, hasUnread, scrollToTop, openChat
}) => {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 flex flex-col items-center gap-4 z-[12000] pointer-events-auto">
      
      {/* Scroll to Top - Minimalist Arrow */}
      <AnimatePresence>
        {showTopBtn && !isOpen && (
          <motion.button
            key="top-btn"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            aria-label="Return to Top"
            className="w-10 h-10 bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-all rounded-none"
          >
            <ArrowUp className="w-3.5 h-3.5" strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Chat FAB: Architectural & Refined */}
      <AnimatePresence>
        {showChatFab && !isOpen && (
          <motion.button
            key="chat-btn"
            initial={{ opacity: 0, scale: 0.9, x: 20 }} 
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            onClick={openChat}
            aria-label="Open Concierge"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={PHYSICS.snappy}
            className="group relative w-14 h-14 md:w-16 md:h-16 bg-primary border border-white/10 flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
          >
            {/* Subtle Industrial Background Detail */}
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 left-0 w-1 h-1 bg-gold/20" />
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-gold/20" />
            
            <div className="relative">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-gold relative z-10 transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              
              <AnimatePresence>
                {hasUnread && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-2 h-2 bg-gold border border-primary z-20 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                  />
                )}
              </AnimatePresence>
            </div>
            
            {/* Refined Tooltip */}
            <div className="absolute right-full mr-5 bg-black/95 px-5 py-2.5 border border-white/10 text-[9px] font-mono text-gold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none backdrop-blur-xl shadow-2xl">
                Consultation
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};