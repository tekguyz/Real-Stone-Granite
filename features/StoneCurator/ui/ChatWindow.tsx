import React from 'react';
import { motion } from 'framer-motion';
import { X, Send, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message, SUGGESTIONS } from '../model/types';
import { Button } from '../../../shared/ui/Button';
import { PHYSICS } from '../../../shared/lib/theme';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isLoading: boolean;
  input: string;
  setInput: (val: string) => void;
  handleSend: (text?: string) => void;
  onLaunchStudio: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen, onClose, messages, isLoading, input, setInput, handleSend, onLaunchStudio, messagesEndRef
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.98 }}
      transition={PHYSICS.snappy}
      className="w-[90vw] md:w-[480px] h-[75vh] md:h-[80vh] bg-primary border border-white/10 shadow-[0_-40px_120px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden relative pointer-events-auto origin-bottom-right mb-4 mr-0"
    >
      {/* Header */}
      <div className="h-16 border-b border-white/5 bg-surface/50 backdrop-blur-xl flex items-center justify-between pl-6 pr-0 flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-gold animate-pulse rotate-45" />
          <span className="text-xs text-white/90 uppercase tracking-[0.25em] font-mono font-medium">
            Senior Associate
          </span>
        </div>
        <button 
          onClick={onClose}
          className="h-16 w-16 flex items-center justify-center border-l border-white/5 hover:bg-red-500/10 hover:text-red-400 transition-all group"
        >
          <X className="w-5 h-5 opacity-40 group-hover:opacity-100" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 z-10 custom-scrollbar scroll-smooth bg-primary">
        {messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`max-w-[90%] p-6 border ${
                msg.role === 'user' 
                  ? 'bg-white/5 text-white border-white/10' 
                  : 'bg-surface/80 text-text-main border-white/5 prose-stone'
              }`}
            >
              <div className="text-[13px] md:text-[14px] leading-relaxed font-light">
                <ReactMarkdown>
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>

            {msg.hasAction && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 w-full max-w-[85%]">
                <Button 
                  variant="gold" 
                  size="md" 
                  className="w-full flex items-center justify-between group h-14"
                  onClick={onLaunchStudio}
                >
                  <span className="font-mono text-[10px] tracking-widest uppercase">Launch Planner</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-2 items-center p-4 bg-surface/30 border border-white/5 w-fit">
              <div className="w-1 h-1 bg-gold animate-bounce rotate-45" />
              <div className="w-1 h-1 bg-gold animate-bounce [animation-delay:0.2s] rotate-45" />
              <div className="w-1 h-1 bg-gold animate-bounce [animation-delay:0.4s] rotate-45" />
              <span className="text-[9px] font-mono text-gold uppercase tracking-widest ml-2">Consulting...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-primary border-t border-white/5 p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTIONS.map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="px-3 py-1.5 border border-gold/20 hover:border-gold hover:bg-gold/5 text-[10px] font-mono text-gold uppercase tracking-widest transition-all"
            >
              {chip}
            </button>
          ))}
        </div>
        <div className="relative flex items-center h-14 bg-surface/50 border border-white/5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="w-full h-full bg-transparent px-5 text-white text-xs font-mono outline-none"
          />
          <button 
            onClick={() => handleSend()}
            className="w-14 h-full flex items-center justify-center text-gold border-l border-white/5"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};