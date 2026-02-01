import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEDIA } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

interface MonumentProject {
  id: string;
  title: string;
  subtitle: string;
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
    subtitle: "Traveling Replica",
    material: "ABSOLUTE BLACK GRANITE",
    coords: "38.8913° N, 77.0477° W",
    completion: "Est. 1993",
    image: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=1200", 
    description: "The replication and maintenance of sacred names etched into the most reflective granite on Earth."
  },
  {
    id: "SEAL",
    title: "Navy SEAL Museum",
    subtitle: "Muster Grounds",
    material: "JET BLACK GRANITE",
    coords: "27.4965° N, 80.3013° W",
    completion: "2010",
    image: MEDIA.IMG_TRIDENT,
    description: "Crafting the Trident-shaped sanctuary honoring the fallen frogmen of the U.S. Navy."
  },
  {
    id: "NINE_ELEVEN",
    title: "9/11 First Responders",
    subtitle: "Ground Zero Cladding",
    material: "VIRGINIA MIST GRANITE",
    coords: "40.7127° N, 74.0134° W",
    completion: "2011",
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&q=80&w=1200", // FIXED URL
    description: "Architectural cladding and monuments dedicated to the bravery of those at Ground Zero."
  },
  {
    id: "SPACE",
    title: "Space Walk of Fame",
    subtitle: "Titusville, FL",
    material: "POLISHED GRANITE",
    coords: "28.6139° N, 80.8015° W",
    completion: "Phase I-IV",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200", 
    description: "Monuments celebrating the pioneers of the Gemini and Apollo programs."
  },
  {
    id: "GOLD_STAR",
    title: "Gold Star Families",
    subtitle: "Statewide Memorials",
    material: "INDIA BLACK GRANITE",
    coords: "27.4467° N, 80.3256° W",
    completion: "Ongoing",
    image: "https://images.unsplash.com/photo-1464692805480-a69dfaafdb0d?auto=format&fit=crop&q=80&w=1200", // FIXED URL
    description: "A tribute to the families who have sacrificed a loved one for our freedom."
  }
];

export const Monuments: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="monuments" className="relative h-screen bg-black overflow-hidden flex flex-col">
      
      {/* 1. The Monolith Header */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-20 pointer-events-none">
        <div className="flex flex-col items-start gap-4">
           <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-gold font-mono text-[10px] uppercase tracking-[0.5em] font-bold">
                Hall of Honor
              </span>
           </div>
           <h2 className="text-5xl md:text-8xl font-mono font-black text-white uppercase tracking-tighter leading-none mix-blend-difference">
              Legacy <span className="text-transparent" style={{ WebkitTextStroke: '1px var(--color-gold)' }}>In Stone</span>
           </h2>
        </div>
      </div>

      {/* 2. The Accordion (Sacred Hall) */}
      <div className="flex-1 flex w-full h-full relative z-10 pt-32 md:pt-0">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative h-full border-r border-white/5 flex flex-col group cursor-crosshair overflow-hidden"
            initial={false}
            animate={{ 
              flex: hoveredId === project.id ? 2.5 : 1,
            }}
            transition={PHYSICS.industrial}
          >
            {/* A. Image Layer (Ignites on Hover) */}
            <motion.div 
              className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-out"
              style={{
                backgroundImage: `url(${project.image})`,
              }}
              animate={{
                filter: hoveredId === project.id ? 'grayscale(0%) brightness(100%)' : 'grayscale(100%) brightness(30%)',
                scale: hoveredId === project.id ? 1.05 : 1
              }}
            />

            {/* B. Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90 z-[1] opacity-80" />
            
            {/* C. The Glow Border */}
            <div className="absolute inset-0 border-[0.5px] border-transparent group-hover:border-gold/30 transition-colors duration-500 z-[2]" />

            {/* D. Vertical Title */}
            <div className="absolute bottom-12 left-0 w-full pointer-events-none z-30 overflow-hidden mix-blend-screen">
               <motion.div 
                 initial={false}
                 animate={{ 
                   x: hoveredId === project.id ? 0 : -20, 
                   opacity: hoveredId === project.id ? 1 : 1 
                 }}
                 className="flex items-center gap-8 whitespace-nowrap origin-left -rotate-90 translate-x-12"
               >
                  <span className={`font-mono text-xl md:text-3xl font-black uppercase tracking-tighter transition-colors duration-500 ${hoveredId === project.id ? 'text-gold' : 'text-white/40'}`}>
                    {project.title}
                  </span>
                  <div className={`w-24 h-[1px] transition-colors duration-500 ${hoveredId === project.id ? 'bg-gold' : 'bg-white/20'}`} />
               </motion.div>
            </div>

            {/* E. Expanded HUD */}
            <AnimatePresence>
              {hoveredId === project.id && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="absolute inset-0 z-40 pointer-events-none p-6 md:p-12 flex flex-col justify-between"
                >
                  <div className="self-end group/label">
                     <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-gold uppercase tracking-[0.3em] font-bold">
                          {project.coords}
                        </span>
                        <div className="w-8 h-[1px] bg-gold mt-2" />
                     </div>
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
                     <span className="font-mono text-[10vw] text-transparent" style={{ WebkitTextStroke: '1px white' }}>
                        {project.completion}
                     </span>
                  </div>

                  <div className="self-end max-w-sm">
                     <motion.div 
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ ...PHYSICS.industrial, delay: 0.1 }}
                        className="relative p-8 bg-black/60 backdrop-blur-md border border-gold/20"
                     >
                        <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-gold/50" />
                        <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-gold/50" />
                        <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-gold/50" />
                        <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-gold/50" />

                        <span className="text-gold font-mono text-[9px] uppercase tracking-widest block mb-4 border-b border-gold/10 pb-2">
                           Project Brief • {project.id}
                        </span>
                        
                        <h3 className="text-white font-mono text-lg uppercase font-bold mb-2">
                          {project.subtitle}
                        </h3>

                        <p className="text-text-muted text-xs font-sans font-light leading-relaxed mb-6">
                          {project.description}
                        </p>
                        
                        <div className="flex items-center gap-2">
                           <div className="w-1 h-1 bg-gold rotate-45" />
                           <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest">
                             Material: <span className="text-white">{project.material}</span>
                           </span>
                        </div>
                     </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        ))}
      </div>

      <div className="h-12 border-t border-white/5 bg-primary flex items-center justify-center z-20 shrink-0">
         <div className="flex items-center gap-8 opacity-40">
            <span className="text-[8px] font-mono text-text-muted uppercase tracking-[0.5em]">
              Federal Projects Division
            </span>
            <div className="w-1.5 h-1.5 bg-gold/50 rotate-45" />
            <span className="text-[8px] font-mono text-text-muted uppercase tracking-[0.5em]">
              Est. 1993
            </span>
         </div>
      </div>
    </section>
  );
};