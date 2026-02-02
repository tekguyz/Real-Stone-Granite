import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { COMPANY_KB } from '../../entities/company/knowledge';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { ICONS } from '../../shared/assets';

interface NavbarProps {
  onOpenStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenStudio }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // NAVIGATION ORDER: Services -> Inventory -> Monuments
  const navLinks = [
    { name: 'Services', href: 'capabilities' },
    { name: 'Inventory', href: 'materials' },
    { name: 'Monuments', href: 'monuments' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={hidden ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-[9999] flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 px-1.5 py-1.5 flex items-center gap-1.5 shadow-2xl shadow-black/80 rounded-sm">
          
          <a 
            href="#" 
            aria-label="Real Stone & Granite Home"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="h-9 px-4 flex items-center bg-white/5 border border-white/5 hover:border-gold/50 hover:bg-white/10 transition-all duration-300 group"
          >
             <span className="font-sans font-black text-xs text-white tracking-tighter group-hover:text-gold transition-colors">
               RS&G
             </span>
          </a>

          <div className="hidden md:flex items-center bg-black/40 border border-white/5 h-9 px-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`px-5 h-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all relative overflow-hidden group ${
                  activeSection === link.href ? 'text-gold' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </div>

          <PrecisionBtn 
            variant="primary" 
            onClick={onOpenStudio} 
            className="h-9 px-5 text-[10px]"
            aria-label="Start Project Planner"
          >
            Start Project
          </PrecisionBtn>

          <button 
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open Mobile Menu"
            className="md:hidden w-9 h-9 flex items-center justify-center border border-white/10 text-white bg-white/5 active:scale-95 transition-transform"
          >
            <ICONS.Menu className="w-4 h-4" />
          </button>

        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16 border-b border-white/10 pb-6">
               <span className="font-mono text-gold text-xs uppercase tracking-widest">Menu</span>
               <button 
                onClick={() => setIsMobileOpen(false)} 
                aria-label="Close Mobile Menu"
                className="w-10 h-10 flex items-center justify-center border border-white/10 text-white hover:border-gold hover:text-gold transition-colors"
               >
                  <ICONS.Close className="w-5 h-5" />
               </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (idx * 0.1), duration: 0.4 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-4xl md:text-5xl font-light text-white font-sans uppercase tracking-tight group flex items-start"
                >
                  <span className="text-xs font-mono text-gold/40 mt-2 mr-6 block border-b border-gold/20 pb-1 w-8">
                    0{idx + 1}
                  </span>
                  <span className="group-hover:text-gold group-hover:translate-x-4 transition-all duration-300">
                    {link.name}
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto border-t border-white/10 pt-8 flex justify-between items-end"
            >
               <div>
                 <span className="block text-gold/60 font-mono text-[10px] uppercase tracking-widest mb-2">Direct Line</span>
                 <span className="text-white text-xl font-light">{COMPANY_KB.contact.phone}</span>
               </div>
               <div className="text-right">
                 <span className="block text-white/20 font-mono text-[10px] uppercase tracking-widest">Fort Pierce, FL</span>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};