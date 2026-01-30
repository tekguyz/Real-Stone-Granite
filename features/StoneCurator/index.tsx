
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronRight, Terminal } from 'lucide-react';
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
}

// --- System Prompt Construction ---
const constructSystemPrompt = () => {
  const kbString = JSON.stringify(COMPANY_KB);
  return `
    ROLE: Senior Consultant at Real Stone & Granite.
    
    IDENTITY: 
    You are "The Curator," a stone professional with over 30 years of hands-on experience in masonry and consultancy. 
    You are standing on a showroom floor, speaking directly to a client.
    
    CORE VALUES: 
    Integrity, Quality, and Craftsmanship. You always recommend the right material for the legacy of the project, even if it requires more intricate fabrication.

    KNOWLEDGE BASE:
    ${kbString}

    OBJECTIVE:
    Guide clients through stone selection. Focus on the soul of the material—its veining, its origin, and its life in a home.
    If the user asks about cost or project planning, use [ACTION_LAUNCH_STUDIO].

    LANGUAGE CONSTRAINTS (NO JARGON):
    - NEVER say: "AI", "Processing", "Assistant", "Large language model", "Input", "Parameters".
    - DO NOT use: "Thermal Specs" (use "Heat Resistance"), "Yield Ratios" (use "Maximizing your slab usage").
    - If unsure, say: "That's a specific detail I'd like to check with our fabrication team to ensure we give you the most accurate answer."

    BEHAVIOR & FORMATTING:
    - Use Markdown.
    - Use **bold** for material names (e.g., **Calacatta Gold**) and key design terms.
    - Use bulleted lists for professional comparisons or specifications.
    - Use backticks (\` \`) for technical measurements or references (e.g., \`3cm\`, \`Ref: IT-04\`).
    - Responses must be concise (under 60 words) and deeply professional.
  `;
};

const SUGGESTIONS = [
  "Marble vs. Quartzite",
  "Kitchen Heat Resistance",
  "Outdoor Kitchen Slabs",
  "The Fabrication Process"
];

export const StoneCurator: React.FC<StoneCuratorProps> = ({ onLaunchStudio }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'model',
      content: 'Good morning. I’ve spent three decades working with these materials; I’m happy to help you find the perfect stone for your project. Where should we begin?',
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        content: "I'm having a moment of difficulty reaching our design database. Let's try that again in a moment."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.98 }}
            transition={PHYSICS.snappy}
            className="w-screen md:w-[480px] h-[85vh] bg-primary border-l border-t border-white/10 shadow-[0_-40px_120px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden relative"
          >
            {/* Ambient Noise */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E')]" />

            {/* Header: Integrated & Sharp */}
            <div className="h-16 border-b border-white/5 bg-surface/50 backdrop-blur-xl flex items-center justify-between pl-6 pr-0 flex-shrink-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold animate-pulse rotate-45" />
                <span className="text-xs text-white/90 uppercase tracking-[0.25em] font-sans font-medium">
                  Senior Associate
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="h-16 w-16 flex items-center justify-center border-l border-white/5 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
              >
                <X className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 z-10 custom-scrollbar scroll-smooth">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.role === 'model' && (
                    <div className="flex items-center gap-2 mb-3 opacity-30">
                       <span className="text-[9px] font-mono tracking-[0.2em] uppercase">Senior Associate</span>
                    </div>
                  )}
                  
                  <div 
                    className={`max-w-[90%] p-5 border shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-white/5 text-white border-white/10 font-sans' 
                        : 'bg-surface/80 text-text-main border-white/5 font-sans prose-stone'
                    }`}
                  >
                    {msg.role === 'model' ? (
                      <div className="text-[14px] leading-[1.6] font-light">
                        <ReactMarkdown>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-[14px] leading-[1.6] font-light">
                        {msg.content}
                      </p>
                    )}
                  </div>

                  {msg.hasAction && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mt-6 w-full max-w-[85%]"
                    >
                      <Button 
                        variant="gold" 
                        size="md" 
                        className="w-full flex items-center justify-between group border-gold/40 h-14"
                        onClick={onLaunchStudio}
                      >
                        <span className="font-mono text-[11px] tracking-widest">Start Project Plan</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex items-start">
                   <div className="bg-surface/50 p-4 border border-white/5 flex gap-3 items-center">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-gold animate-bounce rotate-45" />
                        <div className="w-1 h-1 bg-gold animate-bounce [animation-delay:0.2s] rotate-45" />
                        <div className="w-1 h-1 bg-gold animate-bounce [animation-delay:0.4s] rotate-45" />
                      </div>
                      <span className="text-[9px] font-mono text-gold/60 tracking-widest uppercase">Consulting...</span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input & Control Hub */}
            <div className="bg-primary border-t border-white/5 p-6 z-20">
              {/* Gold Pill Suggestions */}
              <div className="flex flex-wrap gap-2 mb-6">
                {SUGGESTIONS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    disabled={isLoading}
                    className="px-3 py-1.5 border border-gold/30 hover:border-gold hover:bg-gold/5 text-[11px] font-mono text-gold uppercase tracking-wider transition-all duration-300 disabled:opacity-30"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="relative flex items-center h-14 bg-surface/50 border border-white/5 hover:border-white/10 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about a selection..."
                  className="w-full h-full bg-transparent px-5 text-white text-[13px] font-sans outline-none placeholder:text-white/10"
                  disabled={isLoading}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="w-14 h-full flex items-center justify-center text-gold hover:text-white disabled:opacity-20 transition-all border-l border-white/5"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Industrial FAB Toggle */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="m-8 w-16 h-16 bg-gold text-primary shadow-2xl relative group flex items-center justify-center overflow-hidden"
        >
          <Terminal className="w-6 h-6 relative z-10" strokeWidth={1.5} />
          <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
          
          <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-surface border border-white/10 px-4 py-3 text-[10px] font-mono uppercase tracking-[0.3em] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-4 group-hover:translate-x-0">
            Consult Specialist
          </span>
        </motion.button>
      )}
    </div>
  );
};
