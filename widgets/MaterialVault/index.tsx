
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_KB } from '../../entities/company/knowledge';
import { TEXTURES } from '../../shared/assets';
import { MachineCard } from '../../shared/ui/MachineCard';
import { Button } from '../../shared/ui/Button';
import { PHYSICS } from '../../shared/lib/theme';

type TabKey = 'natural' | 'engineered' | 'exotic';

export const MaterialVault: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('natural');

  const getTexture = (type: string) => {
    const key = type.toUpperCase().replace(/\s+/g, '_');
    // @ts-ignore
    return TEXTURES[key] || TEXTURES.GRANITE;
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'natural', label: 'Natural Selection' },
    { key: 'engineered', label: 'Performance Surfaces' },
    { key: 'exotic', label: 'Exotic Masterpieces' },
  ];

  return (
    <section id="materials" className="bg-primary border-b border-white/5 py-32 px-6 md:px-12">
      <div className="max-w-screen-2xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 bg-gold rotate-45 shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
              <span className="text-gold font-mono text-xs uppercase tracking-[0.4em]">
                The Portfolio
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-mono font-black uppercase text-white tracking-tighter">
              Material <span className="text-gold">Selection</span>
            </h2>
            <p className="text-text-muted mt-6 max-w-xl text-base font-light leading-relaxed border-l border-white/10 pl-8">
              Every slab in our portfolio is a unique geological legacy. Hand-selected for exceptional integrity and aesthetic character.
            </p>
          </div>
          <Button variant="outline" size="sm" className="h-14">Request A Consultation</Button>
        </div>

        <div className="flex flex-wrap gap-12 border-b border-white/10 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-8 text-xs font-mono uppercase tracking-[0.25em] transition-all duration-300 relative outline-none ${
                activeTab === tab.key 
                  ? 'text-gold' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="vaultActiveTab"
                  className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gold rotate-45 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  transition={PHYSICS.snappy}
                />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {COMPANY_KB.materials[activeTab].map((material: any, idx: number) => {
                const precisionAlt = `${material.type} - ${material.visualKeywords || 'Architectural slab'}`;
                
                return (
                  <MachineCard 
                    key={material.type} 
                    className="group flex flex-col p-0 h-full border border-white/5 hover:border-gold/30 bg-surface/30 overflow-hidden"
                  >
                    <div className="relative aspect-square overflow-hidden bg-black border-b border-white/5">
                      <img 
                        src={getTexture(material.type)}
                        alt={precisionAlt}
                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                        loading="lazy"
                      />
                      
                      <div className="absolute top-6 left-6 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                        <div className="bg-primary/90 backdrop-blur-md border border-white/10 px-3 py-1 font-mono">
                          <span className="text-[9px] text-gold uppercase tracking-[0.2em]">
                             Reference: 0{idx + 1}
                          </span>
                        </div>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {material.attributes?.map((attr: string) => (
                          <span key={attr} className="text-[8px] font-mono uppercase tracking-[0.2em] text-white border border-white/20 px-2.5 py-1 bg-black/60 backdrop-blur-sm">
                            {attr}
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.div 
                      className="p-8 flex-1 flex flex-col relative"
                      whileTap={{ backgroundColor: 'rgba(212, 175, 55, 0.03)' }}
                    >
                      <h3 className="text-2xl font-mono uppercase text-white mb-4 tracking-tighter group-hover:text-gold transition-colors">
                        {material.type}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed font-light mb-6">
                        {material.description}
                      </p>
                      
                      <div className="mt-auto flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-white/50">Stone Selection</span>
                        <div className="w-2 h-2 bg-gold rotate-45 group-active:scale-150 transition-transform" />
                      </div>
                    </motion.div>
                  </MachineCard>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
