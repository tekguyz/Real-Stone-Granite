
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MachineCard } from '../../shared/ui/MachineCard';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { MEDIA, ICONS } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';
import { COMPANY_KB } from '../../entities/company/knowledge';

interface HeroProps {
  onStartProject?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, PHYSICS.snappy);
  const mouseY = useSpring(y, PHYSICS.snappy);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 px-6 md:px-12 py-24">
        
        <div className="flex flex-col items-start z-20">
          <div className="pointer-events-auto">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-gold/20 bg-gold/5 text-gold text-[10px] font-mono uppercase tracking-[0.3em] mb-12">
              <ICONS.Excellence className="w-3 h-3" />
              <span>Studio Excellence</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-9xl font-mono font-black uppercase leading-[0.9] tracking-tighter text-white mb-10">
              <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Crafted</span><br />
              <span>With</span><br />
              <span className="text-gold">{COMPANY_KB.identity.motto}</span>
            </h1>

            <p className="max-w-lg text-text-muted text-base md:text-lg font-light leading-relaxed mb-12 border-l-2 border-gold/50 pl-6">
              A bespoke collection of the world's finest geological treasures, hand-selected for the discerning visionary since 1993.
            </p>

            <PrecisionBtn variant="secondary" onClick={() => document.getElementById('materials')?.scrollIntoView({ behavior: 'smooth'})}>
              View Our Selection
            </PrecisionBtn>
          </div>
        </div>

        <div className="relative w-full h-[500px] lg:h-[600px] hidden lg:block perspective-[1000px]">
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="w-full h-full"
          >
            <MachineCard className="w-full h-full p-0 border-white/10 bg-black overflow-hidden shadow-2xl relative rounded-none">
              <video
                src={MEDIA.VIDEO_MACRO}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80 scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <motion.div 
                style={{ x: sheenX, y: sheenY }}
                className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/0 to-transparent opacity-100 pointer-events-none mix-blend-overlay" 
              />
              
              <div className="absolute bottom-12 left-12 z-20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-[1px] bg-gold" />
                  <span className="text-gold font-mono text-xs uppercase tracking-[0.3em]">Our Studio</span>
                </div>
                <h3 className="text-white text-3xl font-mono uppercase">Luminous Finish</h3>
                <p className="text-white/50 text-xs font-mono mt-2 uppercase tracking-widest">Natural Selection</p>
              </div>

              <div className="absolute top-6 right-6 w-32 h-32 border-t border-r border-white/20 opacity-50" />
              <div className="absolute bottom-6 left-6 w-32 h-32 border-b border-l border-white/20 opacity-50" />
            </MachineCard>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-primary/95 backdrop-blur-sm h-12 flex items-center justify-center z-30">
        <div className="flex items-center gap-8 text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted/60">
          <span>Established 1993</span>
          <div className="w-1.5 h-1.5 bg-gold rotate-45" /> 
          <span>Integrity • Craftsmanship • Quality</span>
          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          <span>Fort Pierce, FL</span>
        </div>
      </div>
    </section>
  );
};
