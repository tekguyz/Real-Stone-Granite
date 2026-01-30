
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHYSICS } from '../../shared/lib/theme';

interface MonumentProject {
  id: string;
  title: string;
  material: string;
  coords: string;
  completion: string;
  image: string;
  description: string;
}

const PROJECTS: MonumentProject[] = [
  {
    id: "VIETNAM",
    title: "Vietnam Veterans Memorial",
    material: "ABSOLUTE BLACK GRANITE",
    coords: "38.8913° N, 77.0477° W",
    completion: "1982_REF:01",
    image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=1200",
    description: "The replication and maintenance of sacred names etched into the most reflective granite on Earth."
  },
  {
    id: "SEAL",
    title: "Navy SEAL Museum Memorial",
    material: "JET BLACK GRANITE",
    coords: "27.4965° N, 80.3013° W",
    completion: "2010_REF:02",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1200",
    description: "Crafting the Trident-shaped sanctuary honoring the fallen frogmen of the U.S. Navy."
  },
  {
    id: "NINE_ELEVEN",
    title: "9/11 First Responders",
    material: "VIRGINIA MIST GRANITE",
    coords: "40.7127° N, 74.0134° W",
    completion: "2011_REF:03",
    image: "https://images.unsplash.com/photo-1581440051300-84469e068c2d?auto=format&fit=crop&q=80&w=1200",
    description: "Architectural cladding and monuments dedicated to the bravery of those at Ground Zero."
  }
];

export const Monuments: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="monuments" className="relative h-[90vh] min-h-[700px] bg-black overflow-hidden flex flex-col">
      
      {/* 10% Opacity Watermark Header */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[25vw] font-mono font-black text-white/[0.03] uppercase select-none tracking-tighter leading-none">
          Legacy
        </h2>
      </div>

      {/* Main Content Overlay */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-16 z-20 pointer-events-none">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 pointer-events-auto">
             <div className="flex items-center gap-3">
                <div className="w-12 h-[1px] bg-gold" />
                <span className="text-gold font-mono text-[10px] uppercase tracking-[0.5em] font-bold">Hall of Honor</span>
             </div>
             <h2 className="text-5xl md:text-7xl font-mono font-black text-white uppercase tracking-tighter">
                Legacy <span className="text-gold">In Stone.</span>
             </h2>
             <p className="max-w-md text-text-muted text-sm font-sans font-light leading-relaxed border-l border-white/10 pl-6">
                Entrusted by the federal government to preserve national sacrifice in eternal stone. Integrity, Quality, and Permanence.
             </p>
          </div>
        </div>
      </div>

      {/* Interactive Slab Container */}
      <div className="flex-1 flex w-full h-full relative z-10 pt-48 md:pt-0">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative h-full border-r border-white/5 flex flex-col group cursor-crosshair overflow-hidden"
            initial={false}
            animate={{ 
              flex: hoveredId === project.id ? 2.5 : 1,
            }}
            transition={PHYSICS.snappy}
          >
            {/* Base Image Layer (Polished) */}
            <motion.div 
              className="absolute inset-0 z-0 grayscale contrast-125 brightness-50 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-700"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Raw Stone Texture Overlay (Visible when not hovered) */}
            <motion.div 
              initial={false}
              animate={{ opacity: hoveredId === project.id ? 0 : 0.6 }}
              className="absolute inset-0 z-[1] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-60 mix-blend-overlay"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-[2]" />

            {/* Vertical Etched Title */}
            <div className="absolute bottom-12 left-0 w-full pointer-events-none z-30 overflow-hidden">
               <motion.div 
                 initial={false}
                 animate={{ x: hoveredId === project.id ? 0 : -20, opacity: hoveredId === project.id ? 1 : 0.3 }}
                 className="flex items-center gap-8 whitespace-nowrap origin-left -rotate-90 translate-x-12"
               >
                  <span className="text-white font-mono text-xl md:text-3xl font-black uppercase tracking-tighter">
                    {project.title}
                  </span>
                  <div className="w-24 h-[1px] bg-gold/50" />
               </motion.div>
            </div>

            {/* Technical Callouts - Only visible on hover */}
            <AnimatePresence>
              {hoveredId === project.id && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-40 pointer-events-none p-12"
                >
                  {/* Top Right Label */}
                  <div className="absolute top-12 right-12 group/label">
                     <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-gold uppercase tracking-[0.3em] group-hover/label:text-white transition-colors">
                          {project.coords}
                        </span>
                        <div className="w-16 h-[1px] bg-gold/30 mt-2" />
                     </div>
                  </div>

                  {/* Bottom Right Description */}
                  <div className="absolute bottom-12 right-12 max-w-[240px]">
                     <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="p-6 border border-gold/20 bg-black/40 backdrop-blur-md"
                     >
                        <span className="text-gold font-mono text-[8px] uppercase tracking-widest block mb-4">
                           TECHNICAL_DOSSIER
                        </span>
                        <p className="text-white text-xs font-sans font-light leading-relaxed">
                          {project.description}
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/5">
                           <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                             {project.material}
                           </span>
                        </div>
                     </motion.div>
                  </div>

                  {/* Center Crosshair Decoration */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none">
                     <div className="absolute inset-0 border border-gold/20 rounded-full" />
                     <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gold/20" />
                     <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gold/20" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Completion Tag (Geist Mono) */}
            <div className="absolute top-12 left-12 z-30">
               <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] group-hover:text-gold transition-colors">
                 {project.completion}
               </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Ticker/Info */}
      <div className="h-12 border-t border-white/5 bg-primary flex items-center justify-center z-20">
         <div className="flex items-center gap-8">
            <span className="text-[8px] font-mono text-text-muted uppercase tracking-[0.5em]">
              Sovereign_Manufacturing_Division
            </span>
            <div className="w-1.5 h-1.5 bg-gold/20 rounded-full" />
            <span className="text-[8px] font-mono text-text-muted uppercase tracking-[0.5em]">
              Est. 1993
            </span>
         </div>
      </div>
    </section>
  );
};
