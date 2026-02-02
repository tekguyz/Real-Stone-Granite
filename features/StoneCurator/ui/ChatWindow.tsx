import React from 'react';
import { motion } from 'framer-motion';
import { X, Send, ChevronRight, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message, SUGGESTIONS } from '../model/types';
import { PrecisionBtn } from '../../../shared/ui/PrecisionBtn';

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
  onClose, messages, isLoading, input, setInput, handleSend, onLaunchStudio, messagesEndRef
}) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      exit={{ x: '100%' }}
      transition={{ type: "spring", damping: 35, stiffness: 350 }}
      className="absolute top-0 right-0 h-full w-full md:w-[500px] bg-primary border-l border-white/10 shadow-[-50px_0_100px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto z-[12001] gpu-accel isolate-layer"
    >
      {/* Texture Overlay - Optimized Static */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      {/* Header: Concierge Style */}
      <div className="h-20 border-b border-white/10 bg-black/40 flex items-center justify-between pl-8 pr-0 flex-shrink-0 relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center rounded-sm">
             <MessageSquare className="w-5 h-5 text-gold" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-white font-sans font-medium tracking-tight uppercase">
              Stone Concierge
            </span>
            <span className="text-[9px] text-gold/80 uppercase tracking-widest font-mono">
              Direct Line
            </span>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="h-20 w-20 flex items-center justify-center border-l border-white/10 hover:bg-white/5 hover:text-white transition-colors group cursor-pointer"
        >
          <X className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 z-10 custom-scrollbar scroll-smooth bg-primary/95">
        
        {messages.length === 0 && (
          <div className="mt-12 text-center opacity-40">
            <div className="w-12 h-12 border border-white/10 mx-auto mb-6 flex items-center justify-center rounded-sm bg-white/5">
              <MessageSquare className="w-5 h-5 text-white/40" />
            </div>
            <p className="font-mono text-[10px] text-white/60 uppercase tracking-widest">Awaiting Inquiry</p>
          </div>
        )}

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`max-w-[90%] p-5 border shadow-xl ${
                msg.role === 'user' 
                  ? 'bg-white/5 text-white border-white/10' 
                  : 'bg-surface text-text-main border-l-2 border-l-gold border-y border-r border-white/5 prose-stone'
              }`}
            >
              <div className="text-[14px] leading-relaxed font-light font-sans tracking-wide">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>

            {msg.hasAction && (
              <div className="mt-4 w-full max-w-[85%]">
                <PrecisionBtn 
                  variant="primary" 
                  className="w-full flex items-center justify-between group h-12 text-[9px]"
                  onClick={onLaunchStudio}
                >
                  <span className="font-mono tracking-widest uppercase">Open Studio</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </PrecisionBtn>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2 items-center p-4 border-l-2 border-gold/50 bg-surface/30 w-fit">
              <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.4s]" />
              <span className="ml-2 text-[10px] font-mono text-gold uppercase tracking-widest font-bold">Checking availability...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-black/40 border-t border-white/10 p-6 relative z-20">
        
        <div className="flex overflow-x-auto gap-2 mb-4 scrollbar-hide pb-2">
          {SUGGESTIONS.map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="flex-shrink-0 px-4 py-2 border border-white/10 hover:border-gold hover:text-gold bg-surface/50 text-[10px] font-mono text-text-muted uppercase tracking-wider transition-all whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about materials or pricing..."
            className="w-full h-12 bg-surface border border-white/10 px-4 text-white text-sm font-sans outline-none focus:border-gold/50 transition-colors placeholder:text-white/20 placeholder:font-light"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-gold hover:bg-gold hover:text-primary transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gold"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};