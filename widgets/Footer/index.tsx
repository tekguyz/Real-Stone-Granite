
import React from 'react';
import { COMPANY_KB } from '../../entities/company/knowledge';
import { ICONS } from '../../shared/assets';

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
    { name: 'Materials Portfolio', id: 'materials' },
    { name: 'Legacy Works', id: 'monuments' },
    { name: 'Our Capabilities', id: 'capabilities' },
  ];

  return (
    <footer className="w-full bg-primary relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-16 pb-8">
        <div className="flex flex-col items-center">
          <span className="text-white/40 font-mono text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] mb-8 whitespace-nowrap text-center">
            {COMPANY_KB.identity.motto.toUpperCase()} • {COMPANY_KB.identity.pillars.join(' • ').toUpperCase()}
          </span>
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
          
          <div className="relative py-12 flex flex-col justify-between">
            <div className="absolute -left-4 -top-8 select-none pointer-events-none overflow-hidden">
              <h3 className="text-[12vw] font-mono font-black text-white/[0.03] leading-none whitespace-nowrap tracking-tighter uppercase">
                REAL STONE & GRANITE
              </h3>
            </div>
            
            <div className="relative z-10 pt-12 lg:pt-24">
              <div className="flex flex-col gap-4">
                <span className="text-gold font-mono text-xl tracking-[0.2em] font-bold uppercase">
                  Our Story
                </span>
                <p className="max-w-md text-text-muted text-sm font-sans font-light leading-relaxed">
                  Thirty years of architectural excellence. We transform the world's most 
                  exclusive geological treasures into permanent legacies of quality and design.
                </p>
              </div>

              <div className="mt-12 space-y-2">
                <span className="text-white/20 font-mono text-[9px] uppercase tracking-[0.4em]">Studio Status</span>
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full bg-gold/40 opacity-75 rotate-45"></span>
                    <span className="relative inline-flex h-2 w-2 bg-gold rotate-45"></span>
                  </div>
                  <span className="text-white font-mono text-[10px] uppercase tracking-[0.2em]">{COMPANY_KB.contact.status}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 py-12 border-t lg:border-t-0 lg:border-l border-white/5 lg:pl-16">
            
            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-gold font-mono uppercase tracking-[0.3em] text-[10px] font-bold">The Workshop</h4>
                <div className="text-text-muted font-sans text-sm font-light space-y-1">
                  <p>Real Stone & Granite Corp.</p>
                  <p>Fort Pierce, FL 34946</p>
                  <p>United States</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-gold font-mono uppercase tracking-[0.3em] text-[10px] font-bold">Connect With Us</h4>
                <a 
                  href={`tel:${COMPANY_KB.contact.phone.replace(/[^0-9]/g, '')}`}
                  className="block text-white font-mono text-lg hover:text-gold transition-colors uppercase tracking-widest font-black"
                >
                  {COMPANY_KB.contact.phone}
                </a>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <h4 className="text-gold font-mono uppercase tracking-[0.3em] text-[10px] font-bold">Site Map</h4>
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
      </div>

      <div className="h-2 bg-gold/10 relative">
        <div className="absolute inset-0 bg-gold/20" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }} />
      </div>
    </footer>
  );
};
