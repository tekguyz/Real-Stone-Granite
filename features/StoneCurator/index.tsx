
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronRight, ArrowUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { COMPANY_KB } from '../../entities/company/knowledge';
import { Button } from '../../shared/ui/Button';
import { PHYSICS } from '../../shared/lib/theme';

// --- Types ---
interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  hasAction?: boolean;
}

interface StoneCuratorProps {
  onLaunchStudio: () => void;
  isStudioOpen: boolean;
}

const CHAT_THRESHOLD = 800;
const TOP_THRESHOLD = 2000;

// --- System Prompt ---
const constructSystemPrompt = () => {
  const kbString = JSON.stringify(COMPANY_KB);
  return `
    ROLE: Senior Consultant at Real Stone & Granite.
    
    IDENTITY: 
    You are "The Curator," a stone professional with 30+ years of experience. You focus on geological integrity and the visceral beauty of the materials.
    
    CORE DATA:
    ${kbString}

    OBJECTIVE:
    Help clients choose stone based on the "Legacy" of the project.
    Use the 'visualKeywords' (e.g., "polished igneous rock", "translucent honey onyx") to describe stones vividly.
    Talk about the "Crystalline density" of Quartzite or the "Atmospheric presence" of Onyx.

    PERSONA RULES:
    1. ZERO JARGON: No "AI", "Processing", "Slabs in database". Say "I've seen blocks like this..." or "Our current selection shows...".
    2. SLAB FOCUS: Describe the stone as a physical object. Mention veining, light refraction, and heat resistance.
    3. ACTION: If they ask for pricing, planning, or blueprints, use [ACTION_LAUNCH_STUDIO].

    FORMATTING:
    - Bold material names: **Absolute Black Granite**.
    - Use Markdown for clarity.
    - Responses under 70 words. Be professional, direct, and elite.
  `;
};

const SUGGESTIONS = [
  "Marble vs. Quartzite",
  "Kitchen Heat Resistance",
  "Outdoor Kitchen Slabs",
  "The Fabrication Process"
];

const SurveyorDiamondIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-6 h-6 text-gold drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* The Diamond (Rotated Square) */}
    <path 
      d="M12 5 L19 12 L12 19 L5 12 Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
    {/* The Sharp Triangular Tail */}
    <path 
      d="M17 17 L21 21 L21 17 Z" 
      fill="currentColor" 
    />
  </svg>
);

export const StoneCurator: React.FC<StoneCuratorProps> = ({ onLaunchStudio, isStudioOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'model',
      content: 'Good morning. I’ve spent my career working with these geological treasures. How may I assist you in selecting a material for your legacy project?',
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/gemini-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          systemInstruction: constructSystemPrompt()
        }),
      });

      if (!response.ok) throw new Error('Communication failed.');

      const data = await response.json();
      let aiText = data.text;
      let triggerAction = false;

      if (aiText.includes('[ACTION_LAUNCH_STUDIO]')) {
        aiText = aiText.replace('[ACTION_LAUNCH_STUDIO]', '').trim();
        triggerAction = true;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: aiText,
        hasAction: triggerAction
      };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        content: "I've encountered a temporary technical disconnect. Let's revisit that inquiry in a moment."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Visibility Logic
  const showChatFab = scrollY > CHAT_THRESHOLD && !isStudioOpen;
  const showTopBtn = scrollY > TOP_THRESHOLD && !isStudioOpen;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        
        {/* --- CHAT WINDOW --- */}
        {isOpen && (
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
                onClick={() => setIsOpen(false)}
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
        )}

        {/* --- FLOATING CONTROLS STACK --- */}
        <div className="flex flex-col items-center gap-4 pointer-events-auto">
          {/* Back to Top - Visible after 2000px */}
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

          {/* Chat FAB - Visible after 800px */}
          <AnimatePresence>
            {showChatFab && !isOpen && (
              <motion.button
                key="chat-btn"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05, borderColor: 'rgba(212,175,55,0.5)' }}
                whileTap={{ scale: 0.95 }}
                transition={PHYSICS.snappy}
                className="w-12 h-12 md:w-14 md:h-14 bg-surface border border-white/10 flex items-center justify-center shadow-2xl relative group"
              >
                <SurveyorDiamondIcon />
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </AnimatePresence>
    </div>
  );
};
