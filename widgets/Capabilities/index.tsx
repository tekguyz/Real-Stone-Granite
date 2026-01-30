
import React from 'react';
import { ICONS } from '../../shared/assets';

const MODULES = [
  {
    id: "SYS-01",
    title: "Custom Fabrication",
    description: "Deploying 5-axis waterjet technology and diamond-bit CNC milling for zero-tolerance precision cutting of complex geometries.",
    specs: ["CNC Bridge Saws", "Waterjet Cutting", "Edge Profiling"],
    icon: ICONS.Fabrication
  },
  {
    id: "SYS-02",
    title: "Advanced Design",
    description: "Comprehensive digital verification, photorealistic rendering, and laser templating to ensure absolute alignment before cutting.",
    specs: ["3D Rendering", "Digital Templates", "Virtualization"],
    icon: ICONS.Design
  },
  {
    id: "SYS-03",
    title: "Artistic Features",
    description: "Execution of intricate waterjet inlays, bas-relief sandblasting, and multi-layered textural finishes for bespoke commissions.",
    specs: ["Waterjet Inlay", "3D Carving", "Sandblasting"],
    icon: ICONS.Artistic
  },
  {
    id: "SYS-04",
    title: "Pro Installation",
    description: "White-glove site management, dust-containment protocols, and structural anchoring by master-certified stone masons.",
    specs: ["White-Glove Service", "Dust Containment", "Final Sealing"],
    icon: ICONS.Safety
  },
  {
    id: "SYS-05",
    title: "Commercial Cladding",
    description: "Engineered exterior facade systems designed for high-rise wind loads, thermal expansion, and architectural permanence.",
    specs: ["Facade Work", "Monument Assembly", "Large Scale"],
    icon: ICONS.Commercial
  },
  {
    id: "SYS-06",
    title: "Global Sourcing",
    description: "Exclusive direct-import access to rare geological veins from Italian, Brazilian, and Greek quarries, bypassing standard distribution.",
    specs: ["Italy", "Spain", "Brazil", "Greece"],
    icon: ICONS.Location
  }
];

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="py-24 bg-primary border-b border-white/5 relative overflow-hidden">
      {/* Background Pattern: Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 flex items-end justify-between">
            <div className="border-l-2 border-gold pl-6">
                <span className="text-gold font-mono text-xs uppercase tracking-[0.3em] block mb-2">Technical Capabilities</span>
                <h2 className="text-4xl md:text-5xl font-mono font-bold uppercase text-white tracking-tight">System Infrastructure</h2>
            </div>
             <div className="hidden md:block text-right">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Module Status: Active</div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Grid System: 3x2</div>
             </div>
        </div>

        {/* Technical Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((mod) => (
            <div 
              key={mod.id} 
              className="group relative bg-surface border border-white/10 p-6 flex flex-col min-h-[250px] overflow-hidden hover:border-gold transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Module Header */}
              <div className="flex justify-between items-start mb-4 relative z-10">
                <mod.icon className="w-8 h-8 text-gold stroke-[1.5px] group-hover:text-white transition-colors duration-300" />
                <span className="font-mono text-[10px] text-white/20 group-hover:text-gold transition-colors tracking-widest border border-white/10 px-1.5 py-0.5 rounded-sm">
                  {mod.id}
                </span>
              </div>

              {/* Module Body Content */}
              <div className="mb-3 relative z-10">
                <h3 className="text-lg font-bold font-sans uppercase text-white mb-2 tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                    {mod.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed font-mono font-light border-l border-white/10 pl-3 group-hover:border-gold/50 transition-colors">
                  {mod.description}
                </p>
              </div>

              {/* Technical Specs Checklist - Sits right under content, no mt-auto gap */}
              <div className="relative z-10 border-t border-white/5 pt-3 group-hover:border-white/10 transition-colors">
                 <ul className="space-y-1">
                    {mod.specs.map((spec) => (
                        <li key={spec} className="flex items-center gap-2 text-[10px] font-mono text-text-muted group-hover:text-white transition-colors duration-200">
                            <span className="text-gold/50 block">+</span>
                            <span className="uppercase tracking-wider">{spec}</span>
                        </li>
                    ))}
                 </ul>
              </div>

              {/* Corner Accents for Industrial Feel */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t border-r border-gold/40 group-hover:w-3 group-hover:h-3 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-0 h-0 border-b border-l border-gold/40 group-hover:w-3 group-hover:h-3 transition-all duration-300" />

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
