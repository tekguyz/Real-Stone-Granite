
import React from 'react';
import { motion } from 'framer-motion';
import { COMPANY_KB } from '../../entities/company/knowledge';
import { ICONS } from '../../shared/assets';
import { ChevronUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Materials Library', id: 'materials' },
    { name: 'Monuments Hall', id: 'monuments' },
    { name: 'Technical Capabilities', id: 'capabilities' },
  ];

  return (
    <footer className="w-full bg-primary relative z-10 overflow-hidden">
      {/* Background Grid - Ultra Subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Pillar Header & Motto */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-16 pb-8">
        <div className="flex flex-col items-center">
          <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.5em] mb-8">
            INTEGRITY • CRAFTSMANSHIP • QUALITY
          </span>
          {/* Precision Ruler Border */}
          <div className="w-full relative h-[1px] bg-gold/20">
            <div 
              className="absolute top-0 left-0 w-full h-[4px] opacity-30 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, oklch(76.6% 0.154 86.6) 0px, oklch(76.6% 0.154 86.6) 1px, transparent 1px, transparent 20px)`
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          
          {/* LEFT SLAB: Brand Legacy */}
          <div className="relative py-12 flex flex-col justify-between">
            <div className="absolute -left-4 -top-8 select-none pointer-events-none overflow-hidden">
              <h3 className="text-[12vw] font-mono font-black text-white/[0.03] leading-none whitespace-nowrap tracking-tighter uppercase">
                REAL STONE & GRANITE
              </h3>
            </div>
            
            <div className="relative z-10 pt-12 lg:pt-24">
              <div className="flex flex-col gap-4">
                <span className="text-gold font-mono text-xl tracking-[0.2em] font-bold">
                  ESTABLISHED 1993
                </span>
                <p className="max-w-md text-text-muted text-sm font-sans font-light leading-relaxed">
                  Thirty years of architectural manifestation. We transform the world's most 
                  exclusive geological veins into permanent legacies of stone.
                </p>
              </div>

              <div className="mt-12 space-y-2">
                <span className="text-white/20 font-mono text-[9px] uppercase tracking-[0.4em]">Workshop Status</span>
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </div>
                  <span className="text-white font-mono text-[10px] uppercase tracking-[0.2em]">Fabrication Floor: Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SLAB: Technical Operations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 py-12 border-t lg:border-t-0 lg:border-l border-white/5 lg:pl-16">
            
            {/* Studio Info */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-gold font-mono uppercase tracking-[0.3em] text-[10px] font-bold">The Studio</h4>
                <div className="text-text-muted font-sans text-sm font-light space-y-1">
                  <p>Real Stone & Granite Corp.</p>
                  <p>Fort Pierce, FL 34946</p>
                  <p>United States</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-gold font-mono uppercase tracking-[0.3em] text-[10px] font-bold">Concierge Line</h4>
                <a 
                  href={`tel:${COMPANY_KB.contact.phone.replace(/[^0-9]/g, '')}`}
                  className="block text-white font-mono text-lg hover:text-gold transition-colors uppercase tracking-widest font-black"
                >
                  {COMPANY_KB.contact.phone}
                </a>
              </div>
            </div>

            {/* Navigation & Standards */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h4 className="text-gold font-mono uppercase tracking-[0.3em] text-[10px] font-bold">Directory</h4>
                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={`#${link.id}`}
                      onClick={(e) => scrollToSection(e, link.id)}
                      className="text-text-muted hover:text-white font-mono text-[11px] uppercase tracking-widest transition-colors flex items-center gap-3 group"
                    >
                      <div className="w-1.5 h-[1px] bg-white/10 group-hover:bg-gold transition-colors" />
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-3 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  <ICONS.Safety className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white">Certified: ANSI / NSF</span>
                </div>
                <p className="text-[9px] font-mono text-white/10 uppercase tracking-[0.4em]">
                  &copy; {new Date().getFullYear()} Real Stone & Granite Corp.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Return to Top Button */}
        <motion.button
          onClick={(e) => scrollToSection(e as any, 'top')}
          whileHover={{ scale: 1.1, backgroundColor: 'oklch(76.6% 0.154 86.6)', color: 'black' }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-12 left-1/2 lg:left-auto lg:right-12 -translate-x-1/2 lg:translate-x-0 w-12 h-12 border border-gold/30 flex items-center justify-center text-gold transition-colors duration-300"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Extreme Bottom Bar */}
      <div className="h-2 bg-gold/10 relative">
        <div className="absolute inset-0 bg-gold/20" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }} />
      </div>
    </footer>
  );
};
