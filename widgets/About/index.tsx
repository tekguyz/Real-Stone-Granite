import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

const MASTERY_AREAS = [
  {
    title: "Culinary Surfaces",
    items: ["Signature Countertops", "Monolithic Islands", "Waterfall Edges"],
    icon: ICONS.Materials
  },
  {
    title: "Architectural Detail",
    items: ["Fireplace Surrounds", "Grand Staircases", "Solid Columns"],
    icon: ICONS.Artistic
  },
  {
    title: "Outdoor Living",
    items: ["Precision Pool Decks", "Stone Facades", "Exterior Kitchens"],
    icon: ICONS.Waterjet
  }
];

export const About: React.FC = () => {
  return (
    <section id="about" className="w-full bg-primary py-24 md:py-40 px-6 md:px-12 border-b border-white/5 relative overflow-hidden">
      
      {/* 1. Atmospheric Overlay (Subtle Noise) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      <div className="max-w-screen-2xl mx-auto flex flex-col gap-24 relative z-10">
        
        {/* TOP ROW: THE STATEMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={PHYSICS.smooth}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <span className="text-gold font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
                The Standard of Excellence
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={PHYSICS.smooth}
              className="text-4xl md:text-7xl font-sans font-light text-white leading-[0.95] tracking-tighter"
            >
              Artistry guided by <br /> 
              <span className="text-white font-black uppercase">Unrivaled Quality.</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-4 lg:text-right">
             <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] leading-relaxed max-w-xs ml-auto">
                Combining three decades of reputation with the world's most advanced precision tools.
             </p>
          </div>
        </div>

        {/* MIDDLE ROW: THE NARRATIVE & MASTERY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-8">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-white/80 font-light leading-relaxed border-l border-gold/30 pl-8"
            >
              Real Stone & Granite represents the pinnacle of stone fabrication in South Florida. We don’t just cut stone; we honor it. Our craftsmen treat every slab as a legacy piece, ensuring that your vision is realized with absolute integrity.
            </motion.p>
            <p className="text-base text-white/50 font-light leading-relaxed pl-8">
              Whether it is a custom residential kitchen or a national monument, our approach remains the same: relentless pride in our work and a commitment to the timeless beauty of natural materials.
            </p>
          </div>

          {/* Mastery Grid Column */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
            {MASTERY_AREAS.map((area, idx) => (
              <motion.div 
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-6 bg-white/[0.02] border border-white/5 hover:border-gold/30 transition-colors duration-500"
              >
                <area.icon className="w-5 h-5 text-gold mb-6 opacity-50 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                <h3 className="text-white font-mono text-[11px] uppercase tracking-widest font-bold mb-6 pb-2 border-b border-white/5">
                  {area.title}
                </h3>
                <ul className="space-y-3">
                  {area.items.map(item => (
                    <li key={item} className="text-white/40 text-[11px] font-light tracking-wide group-hover:text-white transition-colors">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: THE TRUST PLAQUE */}
        <div className="w-full pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
               <div className="flex items-center gap-3">
                  <ICONS.Excellence className="w-4 h-4 text-gold/40" />
                  <span className="text-white/30 font-mono text-[9px] uppercase tracking-widest">Natural Stone Institute Accredited</span>
               </div>
               <div className="flex items-center gap-3">
                  <ICONS.History className="w-4 h-4 text-gold/40" />
                  <span className="text-white/30 font-mono text-[9px] uppercase tracking-widest">30+ Year Heritage</span>
               </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white/20 font-mono text-[9px] uppercase tracking-widest">Supported by</span>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="flex items-center gap-6 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                 <span className="text-white font-bold text-[10px] tracking-tighter uppercase">Navy SEAL Museum</span>
                 <span className="text-white font-bold text-[10px] tracking-tighter uppercase">Gold Star Families</span>
              </div>
            </div>
        </div>

      </div>
    </section>
  );
};