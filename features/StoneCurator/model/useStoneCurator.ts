import { useState, useEffect, useRef } from 'react';
import { COMPANY_KB } from '../../../entities/company/knowledge';
import { Message, CHAT_THRESHOLD, TOP_THRESHOLD } from './types';

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

export const useStoneCurator = (onLaunchStudio: () => void, isStudioOpen: boolean) => {
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
    showTopBtn
  };
};