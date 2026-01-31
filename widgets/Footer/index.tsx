import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
  onOpenStudio?: () => void;
}

const FooterLink = ({ label, onClick }: { label: string, onClick: (e: React.MouseEvent) => void }) => {
  const [hover, setHover] = useState(false);
  
  return (
      <a 
          href="#"
          onClick={onClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="flex items-center gap-2 group cursor-pointer outline-none w-fit"
      >
           <motion.div 
             animate={{ width: hover ? 12 : 0 }}
             className="h-[1px] bg-gold"
           />
           <span className={`font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${hover ? 'text-white' : 'text-white/60'}`}>
             {label}
           </span>
      </a>
  )
}

export const Footer: React.FC<FooterProps> = ({ onOpenStudio }) => {

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-black relative overflow-hidden border-t border-white/10 flex flex-col z-20">
       
       {/* Background Noise */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay" />

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">
          
          {/* COLUMN 1: BRAND */}
          <div className="p-12 flex flex-col justify-between min-h-[300px]">
             <div>
                <h2 className="text-3xl font-black text-white tracking-tighter leading-none uppercase mb-6">
                   Real<br/>Stone
                </h2>
                <div className="h-0.5 w-8 bg-gold mb-4" />
                <p className="text-white/60 text-sm font-light leading-relaxed max-w-[200px]">
                   South Florida's premier natural stone fabrication and installation specialists.
                </p>
             </div>
             <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                Est. 1993
             </span>
          </div>

          {/* COLUMN 2: NAVIGATION */}
          <div className="p-12 flex flex-col">
             <span className="text-gold font-mono text-[10px] uppercase tracking-[0.2em] mb-8 block font-bold">
               Explore
             </span>
             <nav className="flex flex-col gap-4">
                <FooterLink label="Monuments" onClick={(e) => scrollToSection(e, 'monuments')} />
                <FooterLink label="Materials" onClick={(e) => scrollToSection(e, 'materials')} />
                <FooterLink label="Capabilities" onClick={(e) => scrollToSection(e, 'capabilities')} />
                <FooterLink label="Start Project" onClick={(e) => { e.preventDefault(); onOpenStudio?.(); }} />
             </nav>
          </div>

          {/* COLUMN 3: VISIT US */}
          <div className="p-12 flex flex-col">
             <span className="text-gold font-mono text-[10px] uppercase tracking-[0.2em] mb-8 block font-bold">
               Visit Us
             </span>
             
             <div className="space-y-8">
                <div>
                   <p className="text-white text-sm font-light leading-relaxed mb-1">
                      427 South Market Ave
                   </p>
                   <p className="text-white text-sm font-light leading-relaxed">
                      Fort Pierce, FL 34982
                   </p>
                </div>

                <div>
                   <p className="text-white/60 text-xs font-mono uppercase tracking-widest mb-2">
                      Office Hours
                   </p>
                   <p className="text-white text-sm font-light">
                      Mon - Fri: 8am - 4pm
                   </p>
                </div>
             </div>
          </div>

          {/* COLUMN 4: SERVICE AREA */}
          <div className="p-12 flex flex-col">
             <span className="text-gold font-mono text-[10px] uppercase tracking-[0.2em] mb-8 block font-bold">
               Service Area
             </span>
             
             <div className="space-y-6">
                 <p className="text-white text-sm font-light leading-relaxed">
                    Proudly serving the Treasure Coast and South Florida region.
                 </p>
                 <p className="text-white/60 text-sm font-light leading-relaxed">
                    Export services available for Bahamas & Caribbean.
                 </p>
                 
                 <div className="pt-4 mt-auto">
                    <div className="inline-flex items-center gap-2 border border-white/10 px-3 py-1 bg-white/5">
                        <div className="w-1 h-1 bg-gold rounded-full" />
                        <span className="text-gold text-[9px] font-mono uppercase tracking-widest font-bold">
                           ANSI / NSF Certified
                        </span>
                    </div>
                 </div>
             </div>
          </div>

       </div>

       {/* COPYRIGHT */}
       <div className="w-full py-6 flex items-center justify-center bg-black border-t border-white/5">
          <span className="text-white/30 font-mono text-[10px] uppercase tracking-widest">
             © {new Date().getFullYear()} Real Stone & Granite Corp.
          </span>
       </div>
    </footer>
  );
};