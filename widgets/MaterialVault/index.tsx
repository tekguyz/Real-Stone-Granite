
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_KB } from '../../entities/company/knowledge';
import { TEXTURES, ICONS } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

type TabKey = 'natural' | 'engineered' | 'exotic';

interface MaterialVaultProps {
  onStartProject?: () => void;
}

export const MaterialVault: React.FC<MaterialVaultProps> = ({ onStartProject }) => {
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
    <section id="materials" className="bg-primary border-b border-white/5 py-24 w-full overflow-hidden">
      
      {/* 1. Header & Switchboard Controls */}
      <div className="w-full px-6 md:px-12 mb-16">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12">
          
          {/* Title Block */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 bg-gold rotate-45 shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
              <span className="text-gold font-mono text-xs uppercase tracking-[0.4em]">
                The Inventory
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-mono font-black uppercase text-white tracking-tighter leading-[0.9]">
              Sample <span className="text-gold">Wall</span>
            </h2>
            <p className="text-text-muted mt-8 text-base font-light leading-relaxed border-l border-white/10 pl-6 max-w-xl">
              High-resolution digital twins of our physical stock. Select a category below to inspect material availability.
            </p>
          </div>

          {/* The Switchboard (Toggle Array) */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    relative px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 border backdrop-blur-sm
                    ${isActive 
                      ? 'bg-gold text-primary border-gold font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                      : 'bg-transparent text-white/50 border-white/10 hover:border-gold/50 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {/* Status Light */}
                  <div className={`absolute top-2 right-2 w-1 h-1 rounded-full ${isActive ? 'bg-primary' : 'bg-white/20'}`} />
                  
                  {tab.label}
                  
                  {/* Active Corner Clip */}
                  {isActive && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />
                  )}
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
                      <span className="text-gold font-mono text-[9px] uppercase tracking-widest block mb-2 opacity-80">
                         Ref. 0{idx + 1}
                      </span>
                      <h3 className="text-3xl lg:text-4xl font-mono font-black uppercase text-white tracking-tighter leading-none">
                        {material.type}
                      </h3>
                    </div>
                  </div>

                  {/* C. The Reveal (Technical HUD) */}
                  <div className="absolute inset-0 z-20 bg-surface/90 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    
                    {/* Action Icon */}
                    <div className="mb-6 p-4 border border-gold/30 rounded-full bg-gold/10 text-gold scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                       <ICONS.Expand className="w-5 h-5" />
                    </div>
                    
                    <h3 className="text-2xl font-mono font-bold uppercase text-white tracking-tight mb-4">
                        {material.type}
                    </h3>

                    <p className="text-text-muted text-xs leading-relaxed font-light mb-6 line-clamp-3 max-w-[80%]">
                        {material.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {material.attributes?.slice(0, 3).map((attr: string) => (
                            <span key={attr} className="text-[8px] font-mono uppercase tracking-widest text-gold border border-gold/20 bg-gold/5 px-2 py-1">
                                {attr}
                            </span>
                        ))}
                         {/* Show brands for engineered */}
                         {material.brands && (
                            <span className="text-[8px] font-mono uppercase tracking-widest text-white/50 border border-white/10 px-2 py-1">
                                {material.brands.length} Partners
                            </span>
                         )}
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
