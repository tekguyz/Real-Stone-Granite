
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { MEDIA } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

interface HeroProps {
  onStartProject?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject }) => {
  const containerRef = useRef<HTMLElement>(null);

  // --- Interaction Physics ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth, heavy spring for the "Flashlight" feel
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // The Spotlight Mask:
  // Creates a transparent hole in the dark overlay at the cursor position.
  const maskImage = useMotionTemplate`radial-gradient(circle 350px at ${springX}px ${springY}px, transparent 0%, black 100%)`;

  const scrollToVault = () => {
    const element = document.getElementById('materials');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-primary cursor-crosshair selection:bg-gold selection:text-black"
    >
      {/* 1. Base Layer: The Raw Material (Video) */}
      <div className="absolute inset-0 z-0">
        <video
          src={MEDIA.VIDEO_MACRO}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 opacity-80"
        />
        {/* Permanent Dimmer to ensure white text is always readable even in the spotlight */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 2. The Atmosphere: Deep Onyx Tint (Masked by Spotlight) */}
      {/* This layer is opaque black/primary, but becomes transparent at the mouse position */}
      <motion.div
        className="absolute inset-0 bg-primary/95 z-10 pointer-events-none"
        style={{
          maskImage,
          WebkitMaskImage: maskImage // Webkit prefix for Safari support
        }}
      />
      
      {/* 3. Texture Overlay (Grain) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      {/* 4. The Viewfinder (HUD Layer) */}
      <div className="absolute inset-0 z-20 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
        
        {/* Top Data Line */}
        <div className="flex justify-between items-start">
          <div className="relative">
            <div className="w-8 h-8 border-t border-l border-gold" />
            <span className="absolute top-4 left-4 font-mono text-[9px] text-gold/80 tracking-[0.2em] whitespace-nowrap">
              EST. 1993 // FORT PIERCE, FL
            </span>
          </div>
          <div className="relative">
            <div className="w-8 h-8 border-t border-r border-gold" />
          </div>
        </div>

        {/* Center Hairline Reticle */}
        <div className="absolute top-0 left-1/2 h-full w-[1px] bg-white/5 -translate-x-1/2" />

        {/* Bottom Data Line */}
        <div className="flex justify-between items-end">
          <div className="relative">
            <div className="w-8 h-8 border-b border-l border-gold" />
            <span className="absolute bottom-4 left-4 font-mono text-[9px] text-gold/80 tracking-[0.2em] whitespace-nowrap">
              COORDS: 27.44N, 80.32W
            </span>
          </div>
          <div className="relative text-right">
            <div className="w-8 h-8 border-b border-r border-gold ml-auto" />
            <span className="absolute bottom-4 right-4 font-mono text-[9px] text-gold/80 tracking-[0.2em] whitespace-nowrap">
              STATUS: FABRICATION ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* 5. The Monument (Typography & Action) */}
      <div className="relative z-30 flex flex-col items-center text-center px-4">
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...PHYSICS.smooth, delay: 0.2 }}
            className="mb-12"
        >
          <h1 className="font-mono font-black uppercase leading-[0.85] tracking-tighter select-none">
            <span className="block text-6xl md:text-8xl lg:text-[10rem] text-white mix-blend-difference">
              EXCELLENCE
            </span>
            {/* Hollow Text Effect */}
            <span 
              className="block text-6xl md:text-8xl lg:text-[10rem] text-transparent"
              style={{ WebkitTextStroke: '1px var(--color-gold)' }}
            >
              IN STONE
            </span>
          </h1>
        </motion.div>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...PHYSICS.smooth, delay: 0.6 }}
            className="text-white/60 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] mb-16"
        >
          Integrity • Craftsmanship • Quality
        </motion.p>

        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...PHYSICS.industrial, delay: 0.8 }}
            className="pointer-events-auto"
        >
          <PrecisionBtn
            variant="primary"
            onClick={scrollToVault}
            className="border-gold text-primary bg-gold hover:bg-white hover:text-primary transition-colors min-w-[200px]"
          >
            ENTER THE VAULT
          </PrecisionBtn>
        </motion.div>

      </div>
    </section>
  );
};
