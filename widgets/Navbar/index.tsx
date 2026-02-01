import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { COMPANY_KB } from '../../entities/company/knowledge';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { ICONS } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

interface NavbarProps {
  onOpenStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenStudio }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Hide navbar when scrolling down, show when scrolling up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: 'Inventory', href: 'materials' },
    { name: 'Services', href: 'capabilities' },
    { name: 'Gallery', href: 'monuments' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* THE FLOATING PLINTH */}
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 z-[9999] flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto bg-surface/80 backdrop-blur-xl border border-white/10 px-2 py-2 flex items-center gap-2 shadow-2xl shadow-black/50 rounded-sm">
          
          {/* 1. LOGO MARK */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="h-10 px-4 flex items-center bg-black/40 border border-white/5 hover:border-gold/30 transition-colors group"
          >
             <span className="font-sans font-black text-sm text-white tracking-tighter group-hover:text-gold transition-colors">RS&G</span>
          </a>

          {/* 2. LINKS (Desktop) */}
          <div className="hidden md:flex items-center bg-black/20 border border-white/5 h-10 px-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="px-6 h-full text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* 3. CTA */}
          <PrecisionBtn 
            variant="primary" 
            onClick={onOpenStudio} 
            className="h-10 px-6 text-[10px]"
          >
            Start Project
          </PrecisionBtn>

          {/* 4. MOBILE TRIGGER */}
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center border border-white/10 text-white bg-black/40"
          >
            <ICONS.Menu className="w-4 h-4" />
          </button>

        </div>
      </motion.nav>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-primary flex flex-col p-8"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-12">
               <span className="font-sans font-bold text-white tracking-tight">MENU</span>
               <button onClick={() => setIsMobileOpen(false)} className="p-2 border border-white/10 text-white">
                  <ICONS.Close className="w-6 h-6" />
               </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-4xl font-light text-white font-sans uppercase tracking-tight hover:text-gold transition-colors"
                >
                  <span className="text-xs font-mono text-gold/50 mr-4 align-top">0{idx + 1}</span>
                  {link.name}
                </button>
              ))}
            </div>

            {/* Footer info */}
            <div className="mt-auto border-t border-white/10 pt-8">
               <span className="block text-gold font-mono text-xs uppercase tracking-widest mb-2">Contact</span>
               <span className="text-white text-lg font-light">{COMPANY_KB.contact.phone}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};