
import React from 'react';
import { MachineCard } from '../shared/ui/MachineCard';
import { PrecisionBtn } from '../shared/ui/PrecisionBtn';
import { MEDIA, ICONS } from '../shared/assets';

interface HeroProps {
  onStartProject?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 py-12 border-b border-white/5 bg-primary overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 mt-12">
        {/* Left: Text Content */}
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-gold/20 bg-gold/5 text-gold text-[10px] font-mono uppercase tracking-[0.3em] mb-10">
            <ICONS.Excellence className="w-3 h-3" />
            <span>Master Craftsmanship</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-mono font-black uppercase leading-[0.85] tracking-tighter text-white mb-8">
            Excellence <br />
            <span className="text-gold">In Stone.</span>
          </h1>

          <p className="max-w-lg text-text-muted text-lg font-light leading-relaxed mb-12 border-l border-gold/50 pl-6">
            Directly importing unique slabs from Italy, Spain, and Brazil.
          </p>

          <div className="flex flex-wrap gap-4">
            <PrecisionBtn variant="primary" onClick={onStartProject}>
              <span className="flex items-center gap-2">
                Start Project <ICONS.ArrowRight className="w-4 h-4" />
              </span>
            </PrecisionBtn>
            <PrecisionBtn variant="secondary" onClick={() => document.getElementById('materials')?.scrollIntoView({ behavior: 'smooth'})}>
              View Portfolio
            </PrecisionBtn>
          </div>
        </div>

        {/* Right: Visual MachineCard */}
        <div className="relative w-full pl-0 lg:pl-12">
          <MachineCard className="w-full aspect-video p-0 group border-white/20 bg-black/50 backdrop-blur-sm shadow-2xl shadow-black/50">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Video Background */}
            <video
              src={MEDIA.VIDEO_CNC}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700 grayscale group-hover:grayscale-0"
            />

            {/* Card Overlay UI */}
            <div className="absolute top-6 right-6 z-20">
              <div className="flex items-center gap-2 px-3 py-1 bg-black/50 border border-white/10 backdrop-blur-md">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/80">REC: Waterjet-01</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 z-20 max-w-xs pointer-events-none">
              <h3 className="text-white font-mono text-sm uppercase tracking-widest mb-1">Precision Cutting</h3>
              <p className="text-white/50 text-[10px] font-mono uppercase tracking-wider">Tolerance: 0.005mm</p>
            </div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/50" />
          </MachineCard>
        </div>
      </div>

      {/* Footer Ticker */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-primary/95 backdrop-blur-sm h-12 flex items-center justify-center">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted/60">
          EST. 1993 • ANSF ACCREDITED • FORT PIERCE, FL
        </span>
      </div>
    </section>
  );
};
