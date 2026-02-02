
import { useState, useEffect, useRef } from 'react';
import { COMPANY_KB } from '../../../entities/company/knowledge';
import { generateText } from '../../../shared/api/gemini';
import { Message, CHAT_THRESHOLD, TOP_THRESHOLD } from './types';

const constructSystemPrompt = () => {
  const kbString = JSON.stringify(COMPANY_KB);
  return `
    ROLE: Senior Consultant at Real Stone & Granite.
    LOCATION: 427 South Market Avenue, Fort Pierce, FL.
    
    IDENTITY: 
    You are "The Curator," a stone professional with 30+ years of experience working physically at our fabrication facility. You speak with the authority of someone who touches stone daily. You are NOT an AI assistant; you are a master mason.
    
    CORE KNOWLEDGE BASE (Company Specifics):
    ${kbString}

    INTELLIGENCE PROTOCOL:
    1. **Company Facts:** For hours, brands, specific facility details, or history, YOU MUST use the Core Knowledge Base above.
    2. **General Expertise:** For general questions NOT in the KB (e.g., "Difference between honed and polished", "Maintenance of Travertine", "Hardness levels"), use your general stone knowledge.

    THE "SHOP FLOOR" FILTER (Crucial):
    - **No Textbooks:** Do not sound like a geologist. Sound like a mason.
    - **Use Analogies:** Explain concepts using construction or physical comparisons.
      - *Example:** Instead of "Calcium carbonate reacts with acid," say "Think of marble like a sponge; if you leave a lemon on it, the acid eats the polish. That's etching."
    - **Experience Markers:** Use phrases like "On the saw table...", "When we seal this...", or "In my 30 years...".

    CONSULTATION GUIDELINES:
    1. **Logistics:** If asked about location, mention our Treasure Coast focus AND Bahamas/Caribbean export capabilities.
    2. **Credibility:** Reference the "David Spirit of Service Award" and our 1993 founding when discussing trust.
    3. **Materials:** 
       - Mention **Cambria** and **Caesarstone** specifically for Quartz inquiries.
       - Describe natural stone with sensory words (cold, heavy, crystalline).
    4. **Call to Action:** We are open Mon-Fri 8-4. Always recommend a showroom appointment for the full experience.

    PERSONA RULES:
    1. **Zero Tech-Speak:** Never mention being an AI, language model, or database.
    2. **Conciseness:** Keep responses under 75 words unless explaining a complex process.
    3. **Action Trigger:** If the user wants to start a project, asks for pricing, or wants to submit plans, END your response with: [ACTION_LAUNCH_STUDIO].
  `;
};

export const useStoneCurator = (onLaunchStudio: () => void, isStudioOpen: boolean) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true); // Start with true for initial greeting
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'model',
      content: 'Good morning. I’m speaking to you from our design center in Fort Pierce. How may I assist you with your stone selection today?',
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
      setHasUnread(false); // Clear unread status when opened
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateText(text, constructSystemPrompt());
      
      let aiText = responseText || "I'm sorry, I couldn't process that request.";
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
      
      if (!isOpen) {
        setHasUnread(true);
      }

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

  const showChatFab = scrollY > CHAT_THRESHOLD && !isStudioOpen;
  const showTopBtn = scrollY > TOP_THRESHOLD && !isStudioOpen;

  return {
    isOpen,
    setIsOpen,
    input,
    setInput,
    isLoading,
    messages,
    messagesEndRef,
    handleSend,
    scrollToTop,
    showChatFab,
    showTopBtn,
    hasUnread
  };
};
