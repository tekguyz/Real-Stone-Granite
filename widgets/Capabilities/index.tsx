
import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

interface Capability {
  id: string;
  title: string;
  description: string;
  techLabel: string;
  specs: string[];
  icon: React.ElementType;
}

const FEATURED: Capability = {
  id: "MASTER",
  title: "Master Fabrication",
  description: "Advanced 5-axis CNC precision integrated with artisanal hand-finishing. We manifest complex structural geometries that redefine the limits of stone as an architectural medium.",
  techLabel: "Precision Machining",
  specs: ["Precision Mitering", "Digital Twin Verification", "Bespoke Details"],
  icon: ICONS.Fabrication
};

const SECONDARY: Capability[] = [
  {
    id: "VIZ",
    title: "Visualization",
    description: "Photorealistic rendering and digital slab templating.",
    techLabel: "Digital Planning",
    specs: ["Slab Matching", "3D Rendering"],
    icon: ICONS.Design
  },
  {
    id: "SITE",
    title: "Installation",
    description: "White-glove site management and structural fitting.",
    techLabel: "On-Site Management",
    specs: ["Discreet Ops", "Elite Masons"],
    icon: ICONS.Safety
  },
  {
    id: "FACADE",
    title: "Cladding",
    description: "Large-scale stone systems engineered for permanence.",
    techLabel: "Structural Systems",
    specs: ["Monument Grade", "Structural"],
    icon: ICONS.Commercial
  },
  {
    id: "SOURCE",
    title: "Curation",
    description: "Direct access to exclusive geological veins globally.",
    techLabel: "Global Sourcing",
    specs: ["Hand-Selected", "Rare Slabs"],
    icon: ICONS.Location
  }
];

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="py-24 bg-primary border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 border-l border-gold/30 pl-8">
          <span className="text-gold font-mono text-[10px] uppercase tracking-[0.4em] block mb-2 opacity-60">Technical Infrastructure</span>
          <h2 className="text-4xl md:text-5xl font-mono font-black uppercase text-white tracking-tighter">Core Capabilities</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* FEATURED: Left 50% */}
          <motion.div 
            whileHover="hover"
            className="w-full lg:w-1/2 group relative bg-surface/40 border border-gold/20 p-8 md:p-12 min-h-[500px] flex flex-col justify-between overflow-hidden"
          >
            {/* Translucent Stone Illumination */}
            <motion.div 
              variants={{ hover: { opacity: 0.1, scale: 1.1 } }}
              initial={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gold blur-[80px] pointer-events-none"
            />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div className="relative">
                  <FEATURED.icon className="w-16 h-16 text-black/40 fill-white/5 opacity-30 group-hover:opacity-60 transition-opacity" strokeWidth={0.5} />
                  <div className="absolute inset-0 bg-gold/10 blur-md -z-10 group-hover:bg-gold/20 transition-colors" />
                </div>
                <span className="font-mono text-[9px] text-gold/50 tracking-widest">{FEATURED.techLabel}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-mono font-bold text-white mb-6 uppercase tracking-tight">{FEATURED.title}</h3>
              <p className="text-text-muted text-base leading-relaxed font-sans font-light max-w-md">{FEATURED.description}</p>
            </div>

            <div className="relative z-10 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
              {FEATURED.specs.map(spec => (
                <div key={spec} className="group/spec flex items-center gap-3">
                  <div className="w-3 h-[1px] bg-gold/30 group-hover/spec:w-6 group-hover/spec:bg-gold transition-all" />
                  <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest group-hover/spec:text-gold transition-colors">{spec}</span>
                </div>
              ))}
            </div>

            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/30" />
          </motion.div>

          {/* SECONDARY: Right 50% 2-column Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {SECONDARY.map((cap) => (
              <motion.div 
                key={cap.id}
                whileHover="hover"
                className="group relative bg-surface/20 border border-white/10 p-8 flex flex-col justify-between overflow-hidden"
              >
                <motion.div 
                  variants={{ hover: { opacity: 0.08, scale: 1.1 } }}
                  initial={{ opacity: 0, scale: 1 }}
                  className="absolute inset-0 bg-gold blur-[40px] pointer-events-none"
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <cap.icon className="w-8 h-8 text-black/50 fill-white/5 opacity-20 group-hover:opacity-40 transition-opacity" strokeWidth={0.5} />
                    <span className="font-mono text-[8px] text-white/20 tracking-widest uppercase">{cap.techLabel}</span>
                  </div>
                  <h4 className="text-lg font-mono font-bold text-white mb-2 uppercase tracking-wide">{cap.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed font-sans font-light">{cap.description}</p>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-white/5 space-y-2">
                  {cap.specs.map(spec => (
                    <div key={spec} className="flex items-center gap-2 group/sub">
                      <div className="w-2 h-[1px] bg-gold/20 group-hover/sub:bg-gold transition-colors" />
                      <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em] group-hover/sub:text-gold transition-colors">{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
            <span className="font-mono text-[9px] text-white/10 uppercase tracking-[0.5em] select-none">
              Design System: Gold & Onyx Edition
            </span>
        </div>
      </div>
    </section>
  );
};
