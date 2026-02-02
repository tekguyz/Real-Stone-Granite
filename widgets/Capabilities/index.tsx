
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS, TEXTURES } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

const CAPABILITIES = [
  {
    id: "1",
    title: "Visual Planning",
    tagline: "Total Clarity",
    desc: "We help you visualize your project before the first cut. Using high-resolution scanning, we ensure vein transitions are seamless across your entire space.",
    specs: ["Slab Matching", "Vein Flow", "Digital Templates"],
    icon: ICONS.Design,
    texture: TEXTURES.ONYX
  },
  {
    id: "2",
    title: "Precision Fabrication",
    tagline: "Perfect Alignment",
    desc: "Our master fabricators use advanced cutting systems to achieve complex curves and clean, mitered edges that define high-end masonry.",
    specs: ["Clean Edges", "Seamless Joins", "Custom Cuts"],
    icon: ICONS.Waterjet,
    texture: TEXTURES.GRANITE
  },
  {
    id: "3",
    title: "Artisan Detailing",
    tagline: "The Master's Touch",
    desc: "Beyond the tools. Our senior masons perform hand-finished edge profiles and custom inlays for projects that require a personal touch.",
    specs: ["Hand-Tooled", "Custom Inlays", "Artistic Finishes"],
    icon: ICONS.Artistic,
    texture: TEXTURES.MARBLE
  },
  {
    id: "4",
    title: "Dedicated Installation",
    tagline: "White-Glove Care",
    desc: "Our personal installation team manages every detail of the final assembly, including site protection and our high-performance sealing process.",
    specs: ["Clean Worksite", "Expert Assembly", "Final Seal"],
    icon: ICONS.Safety,
    texture: TEXTURES.QUARTZITE
  }
];

export const Capabilities: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="capabilities" className="w-full bg-primary pt-24 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        
        <div className="mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold font-mono text-[10px] uppercase tracking-[0.5em] font-bold">
                Our Expertise
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-sans font-light text-white tracking-tighter leading-none">
              Modern Tools <br className="md:hidden" />
              <span className="text-white/30 italic">&</span> <span className="font-black uppercase">Traditional Values</span>.
            </h2>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {CAPABILITIES.map((cap, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div 
                key={cap.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative border-b border-white/10 group cursor-pointer overflow-hidden transition-colors duration-500 hover:bg-white/[0.01]"
              >
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 0.05, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-cover bg-center grayscale pointer-events-none"
                      style={{ backgroundImage: `url(${cap.texture})` }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center px-4 md:px-8">
                  
                  <div className="md:col-span-1 flex flex-col">
                    <span className="text-gold font-mono text-[11px] font-bold tracking-widest">
                      {cap.id}
                    </span>
                  </div>

                  <div className="md:col-span-6">
                    <span className="text-gold/40 font-mono text-[9px] uppercase tracking-[0.3em] block mb-2 group-hover:text-gold transition-colors">
                      {cap.tagline}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-sans font-light text-white tracking-tighter uppercase group-hover:translate-x-2 transition-transform duration-700">
                      {cap.title}
                    </h3>
                  </div>

                  <div className="md:col-span-5 flex flex-col md:items-end md:text-right">
                    <p className={`text-white/40 text-sm font-light leading-relaxed max-w-sm transition-all duration-700 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 md:opacity-100 md:translate-y-0'}`}>
                      {cap.desc}
                    </p>
                  </div>
                </div>

                <motion.div 
                  initial={false}
                  animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                  className="bg-black/40 overflow-hidden"
                >
                  <div className="px-12 py-6 flex flex-wrap gap-12 border-t border-white/5 items-center">
                    <cap.icon className="w-5 h-5 text-gold/50" strokeWidth={1} />
                    <div className="flex gap-8">
                      {cap.specs.map(spec => (
                        <div key={spec} className="flex items-center gap-3">
                           <div className="w-1 h-1 bg-gold/30 rounded-full" />
                           <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute bottom-0 left-0 h-[1px] bg-gold z-20"
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? '100%' : 0 }}
                  transition={PHYSICS.smooth}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
