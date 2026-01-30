
import React from 'react';
import { COMPANY_KB } from '../../entities/company/knowledge';
import { MEDIA, ICONS } from '../../shared/assets';

export const Monuments: React.FC = () => {
  return (
    <section id="monuments" className="bg-black py-32 px-6 md:px-12 relative overflow-hidden border-b border-white/5">
       {/* Ambient Light effect */}
       <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />

       <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          
          {/* Content Side */}
          <div className="order-2 lg:order-1">
             <div className="flex items-center gap-4 mb-8">
                <ICONS.History className="text-gold w-4 h-4" />
                <div className="h-[1px] w-12 bg-gold/50" />
                <span className="text-gold font-mono text-xs uppercase tracking-[0.3em]">
                  Federal Projects
                </span>
             </div>

             <h2 className="text-5xl md:text-7xl font-mono font-black uppercase text-white leading-[0.9] tracking-tighter mb-8">
               Builders of <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">History</span>
             </h2>

             <p className="text-text-muted text-lg leading-relaxed mb-12 max-w-lg border-l-2 border-white/10 pl-6">
               {COMPANY_KB.legacy.expertise} <br/>
               <span className="text-sm mt-4 block opacity-70">
                 We are entrusted with the construction of sacred spaces that honor national sacrifice.
               </span>
             </p>

             <div className="space-y-6 mb-16">
                {COMPANY_KB.legacy.notableProjects.map((project, idx) => (
                   <div key={idx} className="group border-b border-white/5 pb-4 last:border-0">
                      <h4 className="text-xl text-white font-mono uppercase tracking-wide group-hover:text-gold transition-colors duration-300">
                        {project.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <ICONS.Location className="w-3 h-3 text-text-muted" />
                        <span className="text-text-muted text-[10px] uppercase tracking-wider">
                            {project.location}
                        </span>
                      </div>
                   </div>
                ))}
             </div>

             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 border-t border-white/10 pt-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted whitespace-nowrap">
                   Authorized Affiliations:
                </span>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                   {COMPANY_KB.legacy.affiliations.map((aff) => (
                      <span key={aff} className="text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-default">
                         {aff}
                      </span>
                   ))}
                </div>
             </div>
          </div>

          {/* Visual Side */}
          <div className="order-1 lg:order-2 relative">
             <div className="aspect-[4/5] md:aspect-square bg-surface/50 border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img 
                  src={MEDIA.IMG_TRIDENT} 
                  alt="Navy SEAL Trident" 
                  className="w-full h-full object-cover grayscale contrast-125 opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-1000"
                />
                
                {/* Overlay Text */}
                <div className="absolute bottom-8 right-8 z-20 text-right">
                   <div className="inline-block bg-black/80 backdrop-blur px-4 py-2 border border-white/10 mb-2">
                      <span className="text-gold font-mono text-xs uppercase tracking-[0.2em]">
                         Memorial Grade
                      </span>
                   </div>
                   <p className="text-white font-mono text-4xl font-bold opacity-20">1993</p>
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                
                {/* Decorative Corners */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />
             </div>
          </div>

       </div>
    </section>
  );
};
