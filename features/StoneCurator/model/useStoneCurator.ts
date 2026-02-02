import { useState, useEffect, useRef } from 'react';
import { COMPANY_KB } from '../../../entities/company/knowledge';
import { generateText } from '../../../shared/api/gemini';
import { useProjectStore, ProjectScope, UsageIntensity } from '../../../entities/project/store';
import { Message, CHAT_THRESHOLD, TOP_THRESHOLD } from './types';

const constructSystemPrompt = () => {
  const kbString = JSON.stringify(COMPANY_KB);
  return `
    ROLE: Senior Consultant at Real Stone & Granite.
    LOCATION: 427 South Market Avenue, Fort Pierce, FL.
    
    IDENTITY: 
    You are "The Curator," a stone professional with 30+ years of experience. You speak with the authority of someone who handles these materials daily. You are helpful, warm, and professional.

    CORE KNOWLEDGE:
    ${kbString}

    STRICT DATA EXTRACTION (CRITICAL):
    If the user mentions a specific project type or material they like, acknowledge it naturally, and include a hidden data tag at the end of your message in the format [SYNC: { "field": "value" }].
    
    Fields you can sync:
    - "scope": Use exact values: "Culinary Surface", "Wet Environment", "Exterior Architecture", "Statement Piece"
    - "intensity": Use exact values: "Visual Art", "Moderate Use", "Heavy Duty"
    - "stonePreference": Any material name (e.g., "Marble", "Quartzite", "Dekton")
    - "description": Any specific detail they mentioned (e.g., "Waterfall island", "Outdoor BBQ")

    WRITING STYLE:
    1. **Be human.** Speak like a person sitting across a desk from a homeowner or architect.
    2. **Keep it simple.** Use bullet points for lists. Bold the names of materials like **Granite** or **Quartzite**.
    3. **Short responses.** Keep your answers concise and easy to read.

    GUIDELINES:
    - If they want to start a project or see plans, end your message with: [ACTION_LAUNCH_STUDIO].
    - Never mention that you are a model or machine.
  `;
};

export const useStoneCurator = (onLaunchStudio: () => void, isStudioOpen: boolean) => {
  const { dispatch } = useProjectStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true); 
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'model',
      content: 'Good morning. I’m here at our Fort Pierce design center. How can I help you find the right stone for your project today?',
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
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  const processSyncData = (text: string) => {
    const syncMatch = text.match(/\[SYNC:\s*({.*?})\s*\]/);
    if (syncMatch) {
      try {
        const data = JSON.parse(syncMatch[1]);
        if (data.scope) dispatch({ type: 'SET_SCOPE', payload: data.scope as ProjectScope });
        if (data.intensity) dispatch({ type: 'SET_INTENSITY', payload: data.intensity as UsageIntensity });
        if (data.stonePreference) dispatch({ type: 'SET_STONE_PREFERENCE', payload: data.stonePreference });
        if (data.description) dispatch({ type: 'SET_DESCRIPTION', payload: data.description });
      } catch (e) {
        // Silent fail for malformed JSON
      }
    }
  };

  const sanitizeResponse = (text: string) => {
    return text
      .replace(/\[SYNC:.*?\]/g, '')
      .replace(/\[ACTION_LAUNCH_STUDIO\]/g, '')
      .trim();
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseRaw = await generateText(text, constructSystemPrompt());
      
      let aiText = responseRaw || "I'm sorry, I'm having a little trouble connecting. Could you try that again?";
      
      // Look for and handle sync data
      processSyncData(aiText);
      
      const triggerAction = aiText.includes('[ACTION_LAUNCH_STUDIO]') || false;
      aiText = sanitizeResponse(aiText);

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
        content: "I'm sorry, I lost our connection for a moment. What was that you were saying?"
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