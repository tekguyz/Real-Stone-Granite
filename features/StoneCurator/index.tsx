
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { StoneCuratorProps } from './model/types';
import { useStoneCurator } from './model/useStoneCurator';
import { ChatWindow } from './ui/ChatWindow';
import { FloatingControls } from './ui/FloatingControls';

export const StoneCurator: React.FC<StoneCuratorProps> = ({ onLaunchStudio, isStudioOpen }) => {
  const {
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
  } = useStoneCurator(onLaunchStudio, isStudioOpen);

  return (
    // ARCHITECTURE FIX: Full screen overlay (pointer-events-none) allows the drawer to be full height.
    // Z-Index 11000 ensures it sits ABOVE the Navbar (9999).
    <div className="fixed inset-0 z-[11000] pointer-events-none overflow-hidden">
      <AnimatePresence mode="wait">
        {isOpen && (
          <ChatWindow 
            // We pass props, but rendering is controlled by the parent conditional for AnimatePresence
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)}
            messages={messages}
            isLoading={isLoading}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            onLaunchStudio={onLaunchStudio}
            messagesEndRef={messagesEndRef}
          />
        )}
      </AnimatePresence>

      <FloatingControls 
        showTopBtn={showTopBtn}
        showChatFab={showChatFab}
        isOpen={isOpen}
        hasUnread={hasUnread}
        scrollToTop={scrollToTop}
        openChat={() => setIsOpen(true)}
      />
    </div>
  );
};
