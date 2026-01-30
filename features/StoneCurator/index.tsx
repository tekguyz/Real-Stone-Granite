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
    showTopBtn
  } = useStoneCurator(onLaunchStudio, isStudioOpen);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        <ChatWindow 
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

        <FloatingControls 
          showTopBtn={showTopBtn}
          showChatFab={showChatFab}
          isOpen={isOpen}
          scrollToTop={scrollToTop}
          openChat={() => setIsOpen(true)}
        />
      </AnimatePresence>
    </div>
  );
};