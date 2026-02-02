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
      transition={{ type: "spring", damping: 40, stiffness: 400 }}
      className="absolute top-0 right-0 h-full w-full md:w-[540px] lg:w-[600px] bg-primary border-l border-white/10 shadow-[-50px_0_100px_rgba(0,0,0,0.9)] flex flex-col pointer-events-auto z-[12001] gpu-accel isolate-layer"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-[0.02] pointer-events-none mix-blend-overlay" />

      {/* REFINED HEADER: Slimmer, low-profile */}
      <div className="h-16 border-b border-white/10 bg-black/60 flex items-center justify-between pl-6 pr-0 flex-shrink-0 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold/5 border border-gold/20 flex items-center justify-center rounded-none">
             <MessageSquare className="w-4 h-4 text-gold" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-white font-mono font-bold tracking-[0.2em] uppercase leading-none mb-1">
              Stone Concierge
            </span>
            <span className="text-[8px] text-gold/60 uppercase tracking-widest font-mono leading-none">
              Live from Fort Pierce
            </span>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="h-16 w-16 flex items-center justify-center border-l border-white/10 hover:bg-white/5 transition-all group cursor-pointer"
        >
          <X className="w-4 h-4 text-white/40 group-hover:text-gold transition-colors" />
        </button>
      </div>

      {/* REFINED MESSAGE AREA: Tighter spacing, technical font sizing */}
      <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 z-10 custom-scrollbar scroll-smooth bg-primary/98">
        
        {messages.length === 0 && (
          <div className="mt-24 text-center">
            <div className="w-10 h-10 border border-white/5 mx-auto mb-4 flex items-center justify-center bg-white/[0.02]">
              <MessageSquare className="w-4 h-4 text-white/10" />
            </div>
            <p className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">Establish Connection</p>
          </div>
        )}

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end pl-8' : 'items-start pr-8'}`}
          >
            {/* TAG: To differentiate source visually in an industrial way */}
            <span className={`font-mono text-[8px] uppercase tracking-widest mb-1.5 ${msg.role === 'user' ? 'text-white/20' : 'text-gold/40'}`}>
              {msg.role === 'user' ? 'Client' : 'RSG Curator'}
            </span>

            <div 
              className={`w-full p-4 border transition-all ${
                msg.role === 'user' 
                  ? 'bg-white/[0.03] text-white border-white/10' 
                  : 'bg-surface/50 text-text-main border-l-[3px] border-l-gold border-y border-r border-white/5 prose-stone'
              }`}
            >
              <div className="text-[13px] leading-[1.6] font-light font-sans tracking-tight">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>

            {msg.hasAction && (
              <div className="mt-4 w-full">
                <PrecisionBtn 
                  variant="primary" 
                  className="w-full flex items-center justify-between group h-11 text-[9px] px-6"
                  onClick={onLaunchStudio}
                >
                  <span className="font-mono tracking-widest uppercase">Launch Project Planner</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </PrecisionBtn>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2 items-center p-3 border border-gold/20 bg-gold/5 w-fit">
              <div className="w-1 h-1 bg-gold rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-gold rounded-full animate-pulse [animation-delay:0.2s]" />
              <div className="w-1 h-1 bg-gold rounded-full animate-pulse [animation-delay:0.4s]" />
              <span className="ml-2 text-[9px] font-mono text-gold uppercase tracking-widest font-bold">Processing Request</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* REFINED INPUT CONTROLS: Integrated suggestions */}
      <div className="bg-black/40 border-t border-white/5 p-4 md:p-6 relative z-20">
        
        <div className="flex overflow-x-auto gap-2 mb-4 scrollbar-hide pb-2 no-scrollbar">
          {SUGGESTIONS.map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="flex-shrink-0 px-3 py-1.5 border border-white/5 hover:border-gold/40 hover:text-gold bg-white/[0.02] text-[9px] font-mono text-white/40 uppercase tracking-widest transition-all whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="relative flex items-center bg-surface border border-white/10 focus-within:border-gold/40 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your inquiry..."
            className="w-full h-11 bg-transparent px-4 text-white text-sm font-sans outline-none placeholder:text-white/10 placeholder:font-light"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="h-11 w-12 flex items-center justify-center text-gold hover:bg-gold hover:text-primary transition-all disabled:opacity-10"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};