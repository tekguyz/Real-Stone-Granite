
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_KB } from '../entities/company/knowledge';
import { PrecisionBtn } from '../shared/ui/PrecisionBtn';
import { ICONS } from '../shared/assets';

interface NavbarProps {
  onOpenStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenStudio }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Corrected links to point to Widget IDs
  const navLinks = [
    { name: 'Materials', href: '#materials' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Monuments', href: '#monuments' },
  ];

  const handleMobileLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-primary/95 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 md:px-12">
        {/* Brand Identity */}
        <div className="flex items-center select-none cursor-pointer z-50">
          <a href="#" className="flex flex-col leading-tight outline-none">
            <span className="font-mono font-black text-xl text-white tracking-tighter">
              REAL STONE
            </span>
            <span className="font-mono font-light text-xs text-white/60 tracking-[0.2em] -mt-0.5">
              & GRANITE
            </span>
          </a>
        </div>

        {/* Center Navigation (Desktop) */}
        <div className="hidden md:flex h-full items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative h-full flex flex-col justify-center items-center group outline-none"
              onMouseEnter={() => setHovered(link.name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(link.name)}
              onBlur={() => setHovered(null)}
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted group-hover:text-white transition-colors duration-300">
                {link.name}
              </span>
              
              {/* Hover Indicator */}
              <AnimatePresence>
                {hovered === link.name && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 w-[3px] h-[3px] bg-gold"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-8 z-50">
          <a 
            href={`tel:${COMPANY_KB.contact.phone.replace(/[^0-9]/g, '')}`}
            className="hidden lg:flex items-center gap-3 text-xs font-mono text-gold hover:text-white transition-colors group"
          >
            <ICONS.Contact className="w-4 h-4" />
            <span className="tracking-widest">{COMPANY_KB.contact.phone}</span>
          </a>
          
          <div className="hidden sm:block">
            <PrecisionBtn variant="primary" onClick={onOpenStudio}>
              Start Project
            </PrecisionBtn>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-text-muted hover:text-white transition-colors p-2"
          >
            {isMobileOpen ? <ICONS.Close className="w-6 h-6" /> : <ICONS.Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden pt-20"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={handleMobileLinkClick}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-2xl font-mono uppercase tracking-[0.2em] text-white hover:text-gold transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col items-center gap-6"
              >
                <div className="w-12 h-[1px] bg-white/20" />
                <PrecisionBtn variant="primary" onClick={() => {
                  onOpenStudio?.();
                  setIsMobileOpen(false);
                }}>
                  Start Project
                </PrecisionBtn>
              </motion.div>
            </div>
            
            {/* Mobile Footer */}
            <div className="absolute bottom-8 text-center">
              <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                {COMPANY_KB.contact.phone}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
