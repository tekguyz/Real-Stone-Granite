import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

// --- DATA: CLEANED & PROFESSIONAL ---
// No "SYS_01" or "STATUS: ONLINE" jargon.
const CAPABILITIES = [
  {
    number: "01",
    title: "Precision Fabrication",
    description: "5-Axis Waterjet systems and CNC bridge saws driven by digital templating for exact tolerances.",
    tags: ["±0.1mm Tolerance", "20k SqFt Facility", "Complex Miters"],
    icon: ICONS.Fabrication
  },
  {
    number: "02",
    title: "Digital Design",
    description: "Photorealistic rendering and CAD integration allows for perfect visualization before stone is cut.",
    tags: ["8K Rendering", "Digital Slab Layout", "Architectural CAD"],
    icon: ICONS.Design
  },
  {
    number: "03",
    title: "Elite Installation",
    description: "White-glove site management. Our senior crews handle structural fitting and intricate joinery.",
    tags: ["Senior Crews", "OSHA-30 Certified", "Site Protection"],
    icon: ICONS.Safety
  },
  {
    number: "04",
    title: "Commercial Facades",
    description: "Large-scale mechanical cladding, monolithic columns, and exterior monument assembly.",
    tags: ["Heavy Load Systems", "Mechanical Anchors", "Exterior Grade"],
    icon: ICONS.Commercial
  },
  {
    number: "05",
    title: "Global Sourcing",
    description: "Direct import network accessing exclusive blocks from historic quarries in Italy and Brazil.",
    tags: ["Direct Import", "Block Selection", "Exclusive Access"],
    icon: ICONS.Location
  }
];

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="w-full bg-primary relative py-24 border-t border-white/5">
      
      {/* Background Texture (Subtle Noise Only) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10">
            <div>
                <span className="text-gold font-mono text-[10px] uppercase tracking-[0.3em] font-bold block mb-4">
                    Our Expertise
                </span>
                <h2 className="text-4xl md:text-5xl font-sans font-light text-white tracking-tight">
                    Fabrication <span className="text-white/40">&</span> Services
                </h2>
            </div>
            <div className="hidden md:block">
                <p className="text-right text-text-muted text-sm font-light max-w-xs leading-relaxed">
                    Combining old-world artistry with state-of-the-art industrial precision.
                </p>
            </div>
        </div>

        {/* THE LEDGER (List Layout) */}
        <div className="flex flex-col">
            {CAPABILITIES.map((cap, idx) => (
                <motion.div
                    key={cap.number}
                    initial="idle"
                    whileHover="active"
                    viewport={{ once: true }}
                    className="group relative border-b border-white/5 last:border-0"
                >
                    {/* Hover Background (Subtle) */}
                    <div className="absolute inset-0 bg-white/[0.02] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                    <div className="relative z-10 py-12 flex flex-col lg:flex-row gap-8 lg:items-center">
                        
                        {/* 1. Identity Column */}
                        <div className="lg:w-1/6 flex items-start gap-4">
                            <span className="font-mono text-xs text-gold/50 group-hover:text-gold transition-colors pt-1">
                                {cap.number} //
                            </span>
                            <cap.icon className="w-6 h-6 text-white/20 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
                        </div>

                        {/* 2. Main Content */}
                        <div className="lg:w-2/5">
                            <h3 className="text-3xl text-white font-sans font-light group-hover:translate-x-2 transition-transform duration-500 ease-out mb-4">
                                {cap.title}
                            </h3>
                            <p className="text-text-muted text-sm font-light leading-relaxed max-w-md group-hover:text-white/80 transition-colors">
                                {cap.description}
                            </p>
                        </div>

                        {/* 3. Technical Tags (The Specs) */}
                        <div className="lg:w-2/6 lg:ml-auto">
                            <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
                                {cap.tags.map((tag) => (
                                    <span 
                                        key={tag} 
                                        className="px-3 py-1 border border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-wider group-hover:border-gold/30 group-hover:text-gold transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 4. Interaction Arrow */}
                        <div className="hidden lg:flex lg:w-1/12 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                             <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center">
                                 <ICONS.ArrowRight className="w-3 h-3 text-gold" />
                             </div>
                        </div>

                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
};