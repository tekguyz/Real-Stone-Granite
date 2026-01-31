import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_KB } from '../../entities/company/knowledge';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { ICONS } from '../../shared/assets';

interface NavItemProps {
  link: { name: string; href: string };
  onClick: (e: React.MouseEvent, id: string) => void;
}

/**
 * NavItem: Clean, high-end navigation link.
 * Replaced "HUD Brackets" with a sophisticated gold underline.
 */
const NavItem: React.FC<NavItemProps> = ({ link, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={`#${link.href}`}
      onClick={(e) => onClick(e, link.href)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative h-full flex items-center justify-center outline-none cursor-pointer px-2"
    >
      <span className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${hover ? 'text-white' : 'text-white/60'}`}>
        {link.name}
      </span>
      
      {/* Luxury Gold Underline */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: hover ? '100%' : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-6 left-0 h-[1px] bg-gold"
      />
    </a>
  );
};

interface NavbarProps {
  onOpenStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenStudio }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Materials', href: 'materials' },
    { name: 'Capabilities', href: 'capabilities' },
    { name: 'Monuments', href: 'monuments' },
  ];

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-24 bg-primary/95 backdrop-blur-md z-[9999] border-b border-white/5 flex items-center justify-between transition-all duration-300">
        
        {/* Main Container */}
        <div className="w-full h-full flex items-center justify-between px-6 md:px-12">
          
          {/* 1. BRAND IDENTITY */}
          <div className="h-full flex items-center select-none">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex flex-col group outline-none"
            >
              <span className="font-sans font-black text-xl text-white tracking-tighter leading-none">
                REAL STONE
              </span>
              <span className="font-mono font-bold text-[10px] text-gold tracking-[0.3em] uppercase group-hover:text-white transition-colors mt-1">
                & Granite Corp.
              </span>
            </a>
          </div>

          {/* 2. DESKTOP NAVIGATION */}
          <div className="hidden md:flex h-full items-center gap-12">
            {navLinks.map((link) => (
              <NavItem key={link.name} link={link} onClick={scrollToSection} />
            ))}
          </div>

          {/* 3. ACTIONS (Phone & CTA) */}
          <div className="flex items-center gap-8">
            
            {/* Phone Number - Cleaned */}
            <a 
              href={`tel:${COMPANY_KB.contact.phone.replace(/[^0-9]/g, '')}`}
              className="hidden xl:flex items-center gap-3 group outline-none"
            >
              <div className="w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-gold/50 transition-colors bg-white/5 rounded-sm">
                <ICONS.Contact className="w-3 h-3 text-gold" />
              </div>
              <span className="text-xs font-mono text-white font-bold tracking-widest group-hover:text-gold transition-colors">
                 {COMPANY_KB.contact.phone}
              </span>
            </a>

            {/* CTA Button */}
            <div className="hidden sm:block">
              <PrecisionBtn variant="primary" onClick={onOpenStudio} className="h-10 text-[10px] px-6">
                Start Project
              </PrecisionBtn>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center border border-white/10 text-white hover:border-gold hover:text-gold transition-colors"
            >
              {isMobileOpen ? <ICONS.Close className="w-5 h-5" /> : <ICONS.Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[9990] bg-primary pt-32 px-8 flex flex-col"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={`#${link.href}`}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="flex items-baseline gap-4 border-b border-white/10 pb-4"
                >
                  <span className="font-mono text-xs text-gold/50">0{idx + 1}</span>
                  <span className="font-sans text-3xl font-light text-white uppercase tracking-tight">
                    {link.name}
                  </span>
                </a>
              ))}
              <div className="mt-8">
                <PrecisionBtn variant="primary" onClick={() => {
                  onOpenStudio?.();
                  setIsMobileOpen(false);
                }} className="w-full h-14 text-sm">
                  Start Your Project
                </PrecisionBtn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};