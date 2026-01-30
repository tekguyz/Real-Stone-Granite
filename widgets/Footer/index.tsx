
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
    { name: 'Materials', id: 'materials' },
    { name: 'Monuments', id: 'monuments' },
    { name: 'Portfolio', id: 'materials' }, // Portfolio maps to MaterialVault
  ];

  return (
    <footer className="w-full bg-primary border-t border-gold relative z-10">
      {/* Background Noise/Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          
          {/* Column 1: Headquarters */}
          <div className="space-y-6">
            <h4 className="text-white font-mono uppercase tracking-[0.2em] text-xs font-bold flex items-center gap-2">
              <ICONS.Location className="w-4 h-4 text-gold" />
              Our Studio
            </h4>
            <div className="space-y-2 text-text-muted font-mono text-sm leading-relaxed">
              <p>Real Stone & Granite Corp.</p>
              <p>Fort Pierce, FL 34946</p>
              <p>United States</p>
            </div>
            <a 
              href={`tel:${COMPANY_KB.contact.phone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-2 text-gold font-mono text-sm hover:text-white transition-colors uppercase tracking-wider"
            >
              <ICONS.Contact className="w-4 h-4" />
              {COMPANY_KB.contact.phone}
            </a>
          </div>

          {/* Column 2: Our Legacy */}
          <div className="space-y-6">
            <h4 className="text-white font-mono uppercase tracking-[0.2em] text-xs font-bold flex items-center gap-2">
              <ICONS.Materials className="w-4 h-4 text-gold" />
              Our Legacy
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="text-text-muted hover:text-white font-mono text-sm uppercase tracking-widest transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gold/0 group-hover:bg-gold transition-colors" />
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Safety & Standards */}
          <div className="space-y-6">
             <h4 className="text-white font-mono uppercase tracking-[0.2em] text-xs font-bold flex items-center gap-2">
              <ICONS.Build className="w-4 h-4 text-gold" />
              Safety & Standards
            </h4>
            <div className="text-text-muted font-mono text-[10px] uppercase tracking-wider space-y-4">
              <p>&copy; {new Date().getFullYear()} Real Stone & Granite Corp.</p>
              <p>Craftsmanship Guaranteed.</p>
              <div className="flex items-center gap-2 text-green-500/80">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span>Inquiry Line Open</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] text-white/20 font-mono">
                    ESTABLISHED 1993 • EXCELLENCE IN STONE
                </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
