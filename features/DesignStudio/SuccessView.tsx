import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Download, Calendar, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { PHYSICS } from '../../shared/lib/theme';

interface SuccessViewProps {
  onClose: () => void;
  projectRef: string;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ onClose, projectRef }) => {
  useEffect(() => {
    // Industrial Luxury Palette
    const gold = '#d4af37'; 
    const silver = '#e5e5e5';
    const bronze = '#cd7f32';
    
    const fireMetallicShavings = () => {
      // Multiple bursts for a "high-end" feel
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 30000 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: [gold, silver, bronze],
          shapes: ['square'],
        });
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: [gold, silver, bronze],
          shapes: ['square'],
        });
      }, 250);
    };

    // Delay to ensure the SuccessView transition is complete and z-index is settled
    const timer = setTimeout(fireMetallicShavings, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    alert("Project Overview downloaded.");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative z-20 p-6 bg-primary overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={PHYSICS.snappy}
        className="max-w-xl w-full flex flex-col items-center text-center"
      >
        <div className="w-16 h-16 border border-gold/30 bg-gold/5 flex items-center justify-center mb-8 rounded-full">
          <ShieldCheck className="w-8 h-8 text-gold" strokeWidth={1} />
        </div>

        <h2 className="text-3xl md:text-4xl font-sans font-bold uppercase text-white tracking-tight mb-4">
          Inquiry Received
        </h2>

        <div className="space-y-6 mb-12 px-4">
          <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Thank you for reaching out. Your reference number is <span className="text-white font-mono font-bold tracking-tight">#{projectRef}</span>. Our team will review your specifications and contact you shortly to discuss your vision.
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <PrecisionBtn 
            onClick={handleDownload}
            variant="secondary"
            className="w-full h-14 border-gold/40 text-gold hover:bg-gold/5"
          >
            <div className="flex items-center gap-3">
              <Download className="w-4 h-4" />
              <span className="font-mono text-[10px] font-bold tracking-[0.2em]">Save Summary</span>
            </div>
          </PrecisionBtn>

          <PrecisionBtn 
            onClick={() => alert("Opening scheduling assistant...")}
            variant="primary"
            className="w-full h-14"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4" />
              <span className="font-mono text-[10px] font-bold tracking-[0.2em]">Book Consultation</span>
            </div>
          </PrecisionBtn>

          <button 
            onClick={onClose}
            className="pt-6 text-white/40 hover:text-white font-mono text-[10px] uppercase tracking-[0.4em] transition-colors flex items-center justify-center gap-2 group mx-auto"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Return to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};