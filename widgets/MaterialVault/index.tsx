
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_KB } from '../../entities/company/knowledge';
import { TEXTURES, ICONS } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

type TabKey = 'natural' | 'engineered';

interface MaterialVaultProps {
  onStartProject?: () => void;
}

export const MaterialVault: React.FC<MaterialVaultProps> = ({ onStartProject }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('natural');

  // Helper to safely get texture from assets
  const getTexture = (type: string) => {
    // Normalizes "Exotic" -> "EXOTIC"
    const key = type.split(' ')[0].toUpperCase(); 
    // @ts-ignore
    return TEXTURES[key] || TEXTURES.GRANITE;
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'natural', label: 'Natural Selection' },
    { key: 'engineered', label: 'Engineered & Synthetic' },
  ];

  return (
    // Increased bottom padding (py-24 -> pt-24 pb-40) to separate from Monuments
    <section id="materials" className="bg-primary border-b border-white/5 pt-24 pb-40 w-full overflow-hidden">
      
      {/* 1. Header & Controls */}
      <div className="w-full px-6 md:px-12 mb-16">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12">
          
          {/* Title Block */}
          <div className="max-w-2xl">
            <span className="text-gold font-mono text-xs uppercase tracking-[0.4em] font-bold block mb-4">
               The Inventory
            </span>
            <h2 className="text-5xl md:text-7xl font-sans font-black uppercase text-white tracking-tighter leading-[0.9]">
              Material <span className="text-gold">Vault</span>
            </h2>
            <p className="text-text-muted mt-8 text-base font-light leading-relaxed border-l border-white/10 pl-6 max-w-xl">
              High-resolution digital catalog of our physical stock. Select a category below to inspect material availability.
            </p>
          </div>

          {/* The Toggle Switch */}
          <div className="flex flex-wrap gap-0 bg-white/5 p-1 border border-white/10">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300
                    ${isActive 
                      ? 'bg-gold text-primary font-bold' 
                      : 'bg-transparent text-white/50 hover:text-white'
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Edge-to-Edge Grid System */}
      <div className="w-full px-4 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4"
          >
            {COMPANY_KB.materials[activeTab].map((material: any, idx: number) => {
              const texture = getTexture(material.type);
              
              return (
                <motion.div 
                  key={material.type}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03, ...PHYSICS.industrial }}
                  className="group relative aspect-square w-full overflow-hidden bg-black cursor-pointer border border-white/5 hover:border-gold/30"
                  onClick={onStartProject}
                >
                  {/* A. Visual Layer (Image) */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img 
                      src={texture} 
                      alt={material.type}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-[0.4]"
                    />
                  </div>

                  {/* B. Default State (Title Anchor) */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                    
                    <div className="relative">
                      <h3 className="text-3xl lg:text-4xl font-sans font-black uppercase text-white tracking-tighter leading-none">
                        {material.type}
                      </h3>
                    </div>
                  </div>

                  {/* C. The Reveal (Museum Plaque Style) */}
                  <div className="absolute inset-0 z-20 bg-primary/95 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    
                    <h3 className="text-2xl font-sans font-bold uppercase text-white tracking-tight mb-4">
                        {material.type}
                    </h3>

                    <p className="text-white/60 text-xs leading-relaxed font-light mb-6 line-clamp-3 max-w-[90%]">
                        {material.description}
                    </p>

                    {/* Tags - Clean Borders */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {material.attributes?.map((attr: string) => (
                            <span key={attr} className="text-[9px] font-mono uppercase tracking-widest text-gold border border-gold/30 px-3 py-1">
                                {attr}
                            </span>
                        ))}
                    </div>
                    
                    {/* Bottom Indicator Line */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200 origin-left" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
