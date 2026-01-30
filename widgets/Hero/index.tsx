
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MachineCard } from '../../shared/ui/MachineCard';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { MEDIA, ICONS } from '../../shared/assets';

interface HeroProps {
  onStartProject?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion Values for Parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics: "Heavy" feel implies stability. 
  const mouseX = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 30 });

  // Map mouse position to rotation degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

  // Dynamic Reflection Sheen (Opposite movement to rotation)
  const sheenX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const sheenY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseXPct = (e.clientX - rect.left) / width - 0.5;
    const mouseYPct = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXPct);
    y.set(mouseYPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] flex flex-col justify-center bg-primary overflow-hidden perspective-[1000px] border-b border-white/5"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 px-6 md:px-12 py-24">
        
        {/* LEFT: Typography */}
        <div className="flex flex-col items-start z-20">
          <div className="pointer-events-auto">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-gold/20 bg-gold/5 text-gold text-[10px] font-mono uppercase tracking-[0.3em] mb-12">
              <ICONS.Excellence className="w-3 h-3" />
              <span>Curators of the Rare</span>
            </div>

            <h1 className="text-7xl md:text-9xl font-mono font-black uppercase leading-[0.85] tracking-tighter text-white mb-10">
              <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Precision</span><br />
              <span>Set In</span><br />
              <span className="text-gold">Stone.</span>
            </h1>

            <p className="max-w-lg text-text-muted text-lg font-light leading-relaxed mb-12 border-l-2 border-gold/50 pl-6">
              Direct importers of the world's finest exotic slabs.
            </p>

            <PrecisionBtn variant="secondary" onClick={() => document.getElementById('materials')?.scrollIntoView({ behavior: 'smooth'})}>
              View The Vault
            </PrecisionBtn>
          </div>
        </div>

        {/* RIGHT: The Visual (3D Tilt) */}
        <div className="relative w-full h-[600px] hidden lg:block perspective-[1000px]">
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="w-full h-full"
          >
            <MachineCard className="w-full h-full p-0 border-white/10 bg-black overflow-hidden shadow-2xl relative">
              {/* Video Layer */}
              <video
                src={MEDIA.VIDEO_MACRO}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80 scale-110"
              />
              
              {/* Overlay Gradient (Shadows) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Glass Reflection Effect (Dynamic) */}
              <motion.div 
                style={{ x: sheenX, y: sheenY }}
                className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/0 to-transparent opacity-100 pointer-events-none mix-blend-overlay" 
              />
              
              {/* Static Shine for definition */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />

              {/* Card UI Elements */}
              <div className="absolute bottom-12 left-12 z-20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-[1px] bg-gold" />
                  <span className="text-gold font-mono text-xs uppercase tracking-[0.3em]">Atmosphere</span>
                </div>
                <h3 className="text-white text-3xl font-mono uppercase">Black Liquid Gold</h3>
                <p className="text-white/50 text-xs font-mono mt-2">Asset Ref: 884-A</p>
              </div>

              {/* Decorative Corners */}
              <div className="absolute top-6 right-6 w-32 h-32 border-t border-r border-white/20 rounded-tr-3xl opacity-50" />
              <div className="absolute bottom-6 left-6 w-32 h-32 border-b border-l border-white/20 rounded-bl-3xl opacity-50" />
            </MachineCard>
          </motion.div>
        </div>
      </div>

      {/* Footer Ticker */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-primary/95 backdrop-blur-sm h-12 flex items-center justify-center z-30">
        <div className="flex items-center gap-8 text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted/60">
          <span>EST. 1993</span>
          <span className="w-1 h-1 bg-gold rounded-full" />
          <span>ANSF ACCREDITED</span>
          <span className="w-1 h-1 bg-gold rounded-full" />
          <span>FORT PIERCE, FL</span>
        </div>
      </div>
    </section>
  );
};
