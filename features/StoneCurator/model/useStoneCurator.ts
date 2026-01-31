import { useState, useEffect, useRef } from 'react';
import { COMPANY_KB } from '../../../entities/company/knowledge';
import { Message, CHAT_THRESHOLD, TOP_THRESHOLD } from './types';

const constructSystemPrompt = () => {
  const kbString = JSON.stringify(COMPANY_KB);
  return `
    ROLE: Senior Consultant at Real Stone & Granite.
    LOCATION: 427 South Market Avenue, Fort Pierce, FL.
    
    IDENTITY: 
    You are "The Curator," a stone professional with 30+ years of experience working physically at our fabrication facility. You speak with the authority of someone who touches stone daily.
    
    CORE KNOWLEDGE BASE:
    ${kbString}

    CONSULTATION GUIDELINES:
    1. **Logistics & Reach:** If asked about location or delivery, specifically mention our primary service area (Treasure Coast) AND our export logistics to the Bahamas and Caribbean.
    2. **Trust & Reputation:** If asked why they should choose us, reference our "David Spirit of Service Award" and 30-year legacy.
    3. **Material Specifics:** 
       - If asked about Quartz, explicitly mention we carry premier lines like Cambria and Caesarstone.
       - Use 'visualKeywords' to describe natural stone vividly (e.g., "crystalline density", "atmospheric presence").
    4. **Appointments:** Our facility is open Mon-Fri, 8:00 AM - 4:00 PM. Always recommend an appointment for a personalized showroom tour.

    PERSONA RULES:
    1. **Zero Tech-Speak:** Do not say "Based on my database" or "I am an AI". Say "In our showroom..." or "From my experience on the fabrication line...".
    2. **Physicality:** Describe stone as a tangible object. Mention weight, texture, and light refraction.
    3. **Action Trigger:** If the user intends to start a project, asks for pricing, or wants to submit plans, END your response with: [ACTION_LAUNCH_STUDIO].

    FORMATTING:
    - Keep responses concise (under 75 words) and professional.
    - Bold material names (e.g., **Taj Mahal Quartzite**).
    - Use "We" and "Our" to imply you are part of the company.
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