import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

const SERVICES = [
  "Architectural Columns & Facades",
  "Grand Staircases & Fireplaces",
  "Luxury Pool Decks & Flooring",
  "Custom Laser Engraving",
  "5-Axis Waterjet Cutting"
];

export const About: React.FC = () => {
  return (
    <section id="about" className="w-full bg-primary py-16 md:py-32 px-6 md:px-12 border-b border-white/5 relative overflow-hidden">
      
      {/* 1. Atmospheric Overlay (Grainy Noise - Subtle Texture) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative z-10">
        
        {/* LEFT COLUMN: THE NARRATIVE */}
        <div className="lg:col-span-7 flex flex-col items-start">
          
          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={PHYSICS.smooth}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-8 h-[1px] bg-gold" />
            <div className="flex items-center gap-3">
              <span className="text-gold font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
                Legacy Fabrication
              </span>
              <div className="w-1 h-1 bg-gold/40 rotate-45" />
              <span className="text-gold/60 font-mono text-[10px] uppercase tracking-[0.3em]">
                Est. 1993
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={PHYSICS.smooth}
            className="text-4xl md:text-6xl font-light text-white leading-[1.1] tracking-tighter mb-12"
          >
            Integrity is the only <br /> 
            <span className="text-white font-bold">permanent material.</span>
          </motion.h2>

          {/* Editorial Copy */}
          <div className="max-w-2xl space-y-8 mb-16">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/70 font-light leading-relaxed"
            >
              Real Stone & Granite is not just a fabrication shop; we are South Florida’s authority on natural stone. For over 30 years, we have combined old-world artisanry with state-of-the-art 5-axis waterjet and CNC milling technology.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/70 font-light leading-relaxed"
            >
              From monolithic columns and grand staircases to intricate laser engravings, we treat every slab as a potential work of art. We stand behind every cut with a reputation built on craftsmanship and honor.
            </motion.p>
          </div>

          {/* THE HEART: COMMUNITY PARTNERS */}
          <div className="w-full pt-12 border-t border-white/10">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] block mb-6">
              Proudly Supporting
            </span>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.03] border border-white/10">
                <ICONS.Memorial className="w-4 h-4 text-gold" />
                <span className="text-[10px] font-mono text-white uppercase tracking-wider font-bold">Navy SEAL Museum</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.03] border border-white/10">
                <ICONS.Award className="w-4 h-4 text-gold" />
                <span className="text-[10px] font-mono text-white uppercase tracking-wider font-bold">Gold Star Families</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE EXPERTISE */}
        <div className="lg:col-span-5 flex flex-col pt-8">
          
          {/* Services List */}
          <div className="mb-12">
            <span className="font-mono text-[10px] text-gold uppercase tracking-[0.2em] block mb-8 font-bold">
              Core Expertise
            </span>
            <div className="space-y-4">
              {SERVICES.map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 10 }}
                  transition={PHYSICS.industrial}
                  className="flex items-center gap-4 py-4 border-b border-white/5 group cursor-default"
                >
                  <div className="w-1.5 h-1.5 bg-gold opacity-50 group-hover:opacity-100 rotate-45 transition-opacity duration-300" />
                  <span className="text-white text-lg font-light tracking-tight group-hover:text-gold transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* THE PLAQUE (Luxury Trust Badge) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black border border-white/10 p-8 relative overflow-hidden mt-auto"
          >
            {/* Simple Gold Top Border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gold opacity-50" />
            
            <div className="relative z-10 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                 <ICONS.Durability className="w-5 h-5 text-gold" strokeWidth={1.5} />
                 <h4 className="text-white font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
                   MIA Accredited
                 </h4>
              </div>
              
              <p className="text-white/50 text-xs font-light leading-relaxed">
                Certified by the <strong className="text-white">Marble Institute of America</strong>. We don't just build projects—we build relationships founded on precision and trust.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};