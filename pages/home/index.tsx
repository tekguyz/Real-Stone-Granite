
import React from 'react';
import { Hero } from '../../widgets/Hero/index';
import { Capabilities } from '../../widgets/Capabilities/index';
import { MaterialVault } from '../../widgets/MaterialVault/index';
import { Monuments } from '../../widgets/Monuments/index';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { ICONS } from '../../shared/assets';

interface HomePageProps {
  onStartProject?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartProject }) => {
  return (
    <div className="w-full flex flex-col bg-primary">
      {/* 1. Introduction & Hook */}
      <Hero onStartProject={onStartProject} />
      
      {/* 2. Process & Technical Specs */}
      <Capabilities />
      
      {/* 3. Inventory & Assets */}
      <MaterialVault />

      {/* 4. Social Proof & Legacy */}
      <Monuments />

      {/* 5. Thematic Closer: Philosophy */}
      <section className="bg-surface relative overflow-hidden border-y border-white/5 py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          
          <div className="inline-flex items-center justify-center p-3 border border-gold/30 rounded-full mb-8 bg-gold/5 backdrop-blur-sm">
            <ICONS.Design className="w-5 h-5 text-gold" />
          </div>

          <h2 className="text-4xl md:text-6xl font-mono font-bold uppercase mb-8 leading-tight text-white tracking-tight">
            From Concept <br/>
            <span className="text-text-muted">To Concrete Reality</span>
          </h2>

          <p className="text-text-muted text-lg leading-relaxed mb-12 max-w-2xl mx-auto font-light">
            Access our digital specification engine to generate precise architectural requirements for your next commission.
          </p>

          <div className="flex flex-col items-center gap-4">
            <PrecisionBtn variant="primary" onClick={onStartProject}>
              Initialize Specification
            </PrecisionBtn>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
              System V1.0 • Secure Uplink
            </span>
          </div>

          {/* Decorative Technical Lines */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent -z-10" />
        </div>
      </section>
    </div>
  );
};
