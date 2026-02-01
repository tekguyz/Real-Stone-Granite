
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { PHYSICS } from '../lib/theme';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss logic
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* TOAST PORTAL CONTAINER (Fixed Top Center - HUD Style) */}
      <div className="fixed top-6 left-0 right-0 z-[30000] flex flex-col items-center pointer-events-none gap-2 px-4">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={PHYSICS.snappy}
              className="pointer-events-auto min-w-[300px] max-w-md w-full md:w-auto bg-[#1a1a1a] border border-white/10 shadow-2xl flex relative overflow-hidden group"
            >
              {/* Status Indicator Bar */}
              <div 
                className={`w-1 h-auto absolute left-0 top-0 bottom-0 ${
                  toast.type === 'success' ? 'bg-gold' : 
                  toast.type === 'error' ? 'bg-red-500' : 
                  'bg-white/40'
                }`} 
              />

              <div className="p-4 pl-6 flex items-start gap-4 w-full">
                {/* Icon */}
                <div className="mt-0.5 shrink-0">
                  {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-gold" />}
                  {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
                  {toast.type === 'info' && <Info className="w-4 h-4 text-white/60" />}
                </div>

                {/* Content */}
                <div className="flex-1 mr-4">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-1 leading-none">
                    System Notification
                  </p>
                  <p className="font-sans text-sm text-white font-medium leading-tight">
                    {toast.message}
                  </p>
                </div>

                {/* Close Button */}
                <button 
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 text-white/20 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
