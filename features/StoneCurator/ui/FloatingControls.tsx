
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
    <div className="fixed bottom-8 right-8 flex flex-col items-center gap-4 z-[12000] pointer-events-auto">
      
      {/* Scroll to Top */}
      <AnimatePresence>
        {showTopBtn && !isOpen && (
          <motion.button
            key="top-btn"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            aria-label="Scroll to Top"
            className="w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-all rounded-sm"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Chat Trigger */}
      <AnimatePresence>
        {showChatFab && !isOpen && (
          <motion.button
            key="chat-btn"
            initial={{ opacity: 0, scale: 0.8, x: 20 }} 
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            onClick={openChat}
            aria-label="Chat with Stone Concierge"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={PHYSICS.snappy}
            className="group relative w-16 h-16 bg-primary border border-white/10 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <MessageSquare className="w-6 h-6 text-gold relative z-10" strokeWidth={1.5} />
              
              {/* Minimal Unread Indicator */}
              <AnimatePresence>
                {hasUnread && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gold border border-primary z-20"
                  />
                )}
              </AnimatePresence>
            </div>
            
            <div className="absolute right-full mr-4 bg-black/90 px-4 py-2 border border-white/10 text-[10px] font-mono text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-md">
                Chat with Us
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
