
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
    const gold = '#d4af37'; 
    const onyx = '#121212';
    
    const fireMetallicShavings = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [gold, onyx],
        shapes: ['square'],
        scalar: 0.9,
        gravity: 1.2,
      });
    };

    fireMetallicShavings();
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
