
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
// @ts-ignore
import confetti from 'https://esm.sh/canvas-confetti@1.9.2';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';

interface SuccessViewProps {
  onClose: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ onClose }) => {
  useEffect(() => {
    const colors = ['#d4af37', '#ffffff', '#333333'];

    // Initial Burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      disableForReducedMotion: true,
      zIndex: 200, // Ensure it appears above the modal backdrop
    });

    // Secondary Flank Bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        zIndex: 200,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        zIndex: 200,
      });
    }, 250);

  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative z-20 p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
        className="mb-8 relative"
      >
        <div className="w-24 h-24 border border-gold/30 flex items-center justify-center bg-gold/5 relative z-10 backdrop-blur-sm">
            <ShieldCheck className="w-10 h-10 text-gold" strokeWidth={1} />
        </div>
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full" />
      </motion.div>

      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-mono font-black uppercase text-white tracking-tighter mb-4 text-center"
      >
        Project Initiated
      </motion.h2>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-md mx-auto space-y-2 mb-12 text-center"
      >
         <div className="h-[1px] w-12 bg-gold mx-auto mb-6 opacity-50" />
         <p className="text-text-muted font-mono text-sm leading-relaxed">
            The Stone Curator has received your dossier. 
         </p>
         <p className="text-text-muted font-mono text-sm leading-relaxed">
            We will contact you shortly to finalize logistics.
         </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <PrecisionBtn onClick={onClose} variant="primary">
           Return to Vault
        </PrecisionBtn>
      </motion.div>
      
      <div className="absolute bottom-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
        Transmission Secure • ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
      </div>
    </div>
  );
};
