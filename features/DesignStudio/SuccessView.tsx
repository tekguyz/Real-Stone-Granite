
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
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: [gold, onyx],
          shapes: ['square'],
          scalar: 0.7,
          drift: 0.5,
          gravity: 0.8,
          ticks: 300
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: [gold, onyx],
          shapes: ['square'],
          scalar: 0.7,
          drift: -0.5,
          gravity: 0.8,
          ticks: 300
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: [gold, onyx],
        shapes: ['square'],
        scalar: 0.9,
        gravity: 1.2,
      });

      frame();
    };

    fireMetallicShavings();
  }, []);

  const handleDownload = () => {
    // Generate a clean filename without computer jargon
    console.log(`Generating Brief for ${projectRef}`);
    alert("Project Brief Generated. Please check your downloads.");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative z-20 p-6 bg-primary overflow-hidden">
      {/* Background Sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03),transparent)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={PHYSICS.snappy}
        className="max-w-xl w-full flex flex-col items-center text-center"
      >
        <div className="w-20 h-20 border border-gold/30 bg-gold/5 flex items-center justify-center mb-10 relative">
          <ShieldCheck className="w-10 h-10 text-gold" strokeWidth={1} />
          <div className="absolute inset-0 border border-gold/10 scale-125 opacity-20" />
        </div>

        <h2 className="text-4xl md:text-5xl font-mono font-black uppercase text-white tracking-tighter mb-6">
          Project Started.
        </h2>

        <div className="space-y-6 mb-12 px-4">
          <div className="h-[1px] w-12 bg-gold mx-auto opacity-50" />
          <p className="text-text-muted font-sans text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Your Reference Number <span className="text-white font-mono font-bold tracking-tight">#{projectRef}</span> has been logged. Our Senior Associate is reviewing your specifications and blueprints now. You will receive a personal follow-up within 24 hours.
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <PrecisionBtn 
            onClick={handleDownload}
            variant="secondary"
            className="w-full h-16 border-gold/40 text-gold hover:bg-gold/5"
          >
            <div className="flex items-center gap-3">
              <Download className="w-4 h-4" />
              <span className="font-mono text-[10px] font-bold tracking-[0.2em]">Download Project Brief (PDF)</span>
            </div>
          </PrecisionBtn>

          <PrecisionBtn 
            onClick={() => alert("Redirecting to secure scheduling portal...")}
            variant="primary"
            className="w-full h-16"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4" />
              <span className="font-mono text-[10px] font-bold tracking-[0.2em]">Schedule Consultation</span>
            </div>
          </PrecisionBtn>

          <button 
            onClick={onClose}
            className="pt-6 text-text-muted hover:text-white font-mono text-[10px] uppercase tracking-[0.4em] transition-colors flex items-center justify-center gap-2 group mx-auto"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Return to Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
};
