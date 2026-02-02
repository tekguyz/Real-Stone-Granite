import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MONUMENTS, ICONS } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

interface MonumentProject {
  id: string;
  ref: string;
  title: string;
  subtitle: string;
  material: string;
  completion: string;
  image: string;
  description: string;
}

const PROJECTS: MonumentProject[] = [
  {
    id: "VIETNAM",
    ref: "MA-01",
    title: "Vietnam Veterans Memorial",
    subtitle: "Sacred Replication",
    material: "ABSOLUTE BLACK GRANITE",
    completion: "1993",
    image: MONUMENTS.VIETNAM, 
    description: "Digital verification and replication of sacred names etched into the world's most reflective natural granite."
  },
  {
    id: "SEAL",
    ref: "MA-02",
    title: "Navy SEAL Memorial",
    subtitle: "Frogman Sanctuary",
    material: "JET BLACK GRANITE",
    completion: "2010",
    image: MONUMENTS.NAVY_SEAL,
    description: "A trident-shaped installation honoring the fallen frogmen. Precisely engineered to withstand the Atlantic salt air."
  },
  {
    id: "NINE_ELEVEN",
    ref: "MA-03",
    title: "9/11 First Responders",
    subtitle: "Honor Guard Cladding",
    material: "VIRGINIA MIST GRANITE",
    completion: "2011",
    image: MONUMENTS.NINE_ELEVEN, 
    description: "Monolithic architectural cladding dedicated to the endurance and bravery of those at Ground Zero."
  },
  {
    id: "SPACE",
    ref: "MA-04",
    title: "Space Walk of Fame",
    subtitle: "Titusville, FL",
    material: "POLISHED GRANITE",
    completion: "PHASE I-IV",
    image: MONUMENTS.SPACE, 
    description: "Commemorative monuments celebrating the pioneers of the Gemini and Apollo space programs."
  },
  {
    id: "GOLD_STAR",
    ref: "MA-05",
    title: "Gold Star Families",
    subtitle: "Statewide Tribute",
    material: "INDIA BLACK GRANITE",
    completion: "ONGOING",
    image: MONUMENTS.GOLD_STAR, 
    description: "A permanent tribute to the families who have sacrificed a loved one for our freedom."
  }
];

export const Monuments: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="monuments" className="relative min-h-screen bg-black overflow-hidden flex flex-col border-t border-white/10 py-24 md:py-32">
      
      {/* 1. ATMOSPHERIC HEADER */}
      <div className="w-full px-6 md:px-12 mb-20 z-50">
        <div className="max-w-screen-2xl mx-auto flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-gold font-mono text-[10px] uppercase tracking-[0.5em] font-bold">
                The Registry of Permanence
              </span>
            </motion.div>
            
            <h2 className="text-5xl md:text-8xl font-sans font-black text-white uppercase tracking-tighter leading-[0.85]">
               Legacy <br/> <span className="text-transparent" style={{ WebkitTextStroke: '1.5px var(--color-gold)' }}>In Stone</span>
            </h2>
            
            <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] max-w-lg leading-relaxed mt-4">
               Authorized fabrication and precision laser-etching for projects of national and historical significance.
            </p>
        </div>
      </div>

      {/* 2. THE STABLE GRID GALLERY */}
      <div className="flex-1 w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => {
            const isActive = activeId === project.id;
            return (
              <motion.div
                key={project.id}
                onMouseEnter={() => setActiveId(project.id)}
                onMouseLeave={() => setActiveId(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative aspect-[3/4] md:aspect-[4/5] bg-surface group overflow-hidden border border-white/5 cursor-pointer"
              >
                {/* Background Image with Expansion Effect */}
                <motion.div 
                  className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80" />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-10 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold">
                        REF / {project.ref}
                      </span>
                      <div className="w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-gold/50 transition-colors">
                        <ICONS.Excellence className="w-3.5 h-3.5 text-white/20 group-hover:text-gold" />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h3 className="text-white font-sans text-2xl font-black uppercase tracking-tight leading-none">
                        {project.title}
                      </h3>
                      
                      <div className="h-0.5 w-8 bg-gold transition-all duration-500 group-hover:w-24" />
                      
                      <div className="overflow-hidden">
                        <motion.div
                          initial={false}
                          animate={{ y: isActive ? 0 : 40, opacity: isActive ? 1 : 0 }}
                          className="pt-4 space-y-4"
                        >
                           <p className="text-white/60 text-xs font-light leading-relaxed">
                             {project.description}
                           </p>
                           <div className="flex flex-col gap-1">
                              <span className="text-gold font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
                                Material: {project.material}
                              </span>
                              <span className="text-white/30 font-mono text-[9px] uppercase tracking-widest">
                                Completed: {project.completion}
                              </span>
                           </div>
                        </motion.div>
                      </div>
                   </div>
                </div>

                {/* Tracking Glint */}
                <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FOOTER BAR */}
      <div className="w-full px-6 md:px-12 mt-24">
        <div className="max-w-screen-2xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
           <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.5em]">
             National Monument Division
           </span>
           <div className="flex gap-12">
              {['NSF CERTIFIED', 'AIA PARTNER', 'NSI ACCREDITED'].map(tag => (
                <span key={tag} className="text-[8px] font-mono text-white uppercase tracking-widest whitespace-nowrap">
                  {tag}
                </span>
              ))}
           </div>
           <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.5em]">
             Est. 1993
           </span>
        </div>
      </div>
    </section>
  );
};