
import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

// --- System Configuration Data ---

const SYSTEM_MODULES = [
  {
    id: "SYS_01",
    title: "Master Fabrication",
    subtitle: "Primary Operations",
    description: "Advanced precision integration. 5-Axis Waterjet systems and CNC bridge saws guided by artisan oversight.",
    specs: ["TOLERANCE: ±0.1mm", "CAPACITY: 20K SQFT", "STATUS: ONLINE"],
    icon: ICONS.Fabrication,
    size: "large", // 2x2
    gradient: "radial-gradient(circle at top right, rgba(212,175,55,0.15), transparent 70%)"
  },
  {
    id: "SYS_02",
    title: "Project Design",
    subtitle: "Visualization",
    description: "Photorealistic rendering & digital slab templating.",
    specs: ["RENDER: 8K", "MODE: PREVIEW"],
    icon: ICONS.Design,
    size: "standard"
  },
  {
    id: "SYS_03",
    title: "Elite Installation",
    subtitle: "Deployment",
    description: "White-glove site management & structural fitting.",
    specs: ["CREW: SENIOR", "SAFE: OSHA-30"],
    icon: ICONS.Safety,
    size: "standard"
  },
  {
    id: "SYS_04",
    title: "Architecture",
    subtitle: "Structural Systems",
    description: "Large-scale facade work & monument assembly.",
    specs: ["LOAD: HEAVY", "TYPE: CLAD"],
    icon: ICONS.Commercial,
    size: "standard"
  },
  {
    id: "SYS_05",
    title: "Global Sourcing",
    subtitle: "Logistics",
    description: "Direct import network from historic quarries.",
    specs: ["ORIGIN: ITALY", "VIA: DIRECT"],
    icon: ICONS.Location,
    size: "standard"
  }
];

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="w-full bg-primary relative overflow-hidden border-t border-white/10">
      
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* The Command Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 border-b border-white/10">
        
        {SYSTEM_MODULES.map((mod, idx) => {
          const isLarge = mod.size === "large";
          
          return (
            <motion.div
              key={mod.id}
              className={`
                group relative bg-primary border-r border-b border-white/10 overflow-hidden cursor-crosshair
                ${isLarge ? 'md:col-span-2 md:row-span-2 min-h-[500px]' : 'col-span-1 min-h-[250px]'}
              `}
              initial="idle"
              whileHover="active"
              transition={PHYSICS.industrial}
            >
              {/* 1. Active State Background Highlight */}
              <motion.div 
                className="absolute inset-0 bg-surface opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
              />
              
              {/* 2. Custom Gradient (For Large Module) */}
              {isLarge && (
                <div 
                  className="absolute inset-0 opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: mod.gradient }}
                />
              )}

              {/* 3. The Scanline (Holographic Sweep) */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300 overflow-hidden">
                <div className="w-full h-[50%] bg-gradient-to-b from-transparent via-gold/50 to-transparent -translate-y-full group-hover:animate-[shimmer_2s_infinite]" />
              </div>

              {/* 4. Corner Focus Brackets (Appear on Hover) */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                 <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold/0 group-hover:border-gold/100 transition-all duration-300" />
                 <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold/0 group-hover:border-gold/100 transition-all duration-300" />
                 <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold/0 group-hover:border-gold/100 transition-all duration-300" />
                 <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold/0 group-hover:border-gold/100 transition-all duration-300" />
              </div>

              {/* 5. Content Layout */}
              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-1 h-1 bg-gold" />
                       <span className="font-mono text-[9px] text-gold uppercase tracking-[0.2em]">{mod.id}</span>
                    </div>
                    <h3 className={`font-mono font-bold text-white uppercase tracking-tight ${isLarge ? 'text-4xl' : 'text-xl'}`}>
                      {mod.title}
                    </h3>
                  </div>
                  
                  {/* Icon Watermark */}
                  <mod.icon 
                    className={`text-white/5 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:text-gold/10
                      ${isLarge ? 'absolute -right-12 -bottom-12 w-96 h-96' : 'w-8 h-8'}
                    `} 
                    strokeWidth={isLarge ? 0.5 : 1}
                  />
                </div>

                {/* Body */}
                <div className={`${isLarge ? 'max-w-md' : ''} relative`}>
                   <div className="w-8 h-[1px] bg-gold/50 mb-4 group-hover:w-16 transition-all duration-500" />
                   <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-2 group-hover:text-white transition-colors">
                     // {mod.subtitle}
                   </span>
                   <p className="text-text-muted text-sm font-sans font-light leading-relaxed group-hover:text-white transition-colors">
                     {mod.description}
                   </p>
                </div>

                {/* Footer / Specs */}
                <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap gap-x-6 gap-y-2">
                   {mod.specs.map((spec) => (
                     <span key={spec} className="font-mono text-[9px] text-white/30 uppercase tracking-widest group-hover:text-gold transition-colors">
                       {spec}
                     </span>
                   ))}
                </div>

              </div>

              {/* Vertical Status Text (Right Edge) */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[40%] rotate-90 origin-center opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none">
                 <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-white whitespace-nowrap">
                   System Ready
                 </span>
              </div>

            </motion.div>
          );
        })}

        {/* Filler Grid Cells (if needed to complete row visually) - Optional for aesthetics */}
        <div className="hidden lg:block col-span-1 bg-primary border-r border-b border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.01)_10px,rgba(255,255,255,0.01)_20px)]" />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[9px] text-white/10 uppercase tracking-[0.5em] -rotate-45">Restricted Area</span>
            </div>
        </div>
        
        <div className="hidden lg:block col-span-2 bg-primary border-r border-b border-white/10 relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-full h-[1px] bg-white" />
                <div className="absolute h-full w-[1px] bg-white" />
                <div className="w-32 h-32 border border-white rounded-full" />
             </div>
             <div className="absolute bottom-4 right-4">
                <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Grid_V.2.0</span>
             </div>
        </div>

      </div>
    </section>
  );
};
