
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_KB } from '../../entities/company/knowledge';
import { TEXTURES } from '../../shared/assets';
import { MachineCard } from '../../shared/ui/MachineCard';
import { Button } from '../../shared/ui/Button';

type TabKey = 'natural' | 'engineered' | 'exotic';

export const MaterialVault: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('natural');

  // Helper to map type name to texture constant
  const getTexture = (type: string) => {
    const key = type.toUpperCase().replace(/\s+/g, '_');
    // @ts-ignore - Dynamic key access for demo purposes
    return TEXTURES[key] || TEXTURES.GRANITE;
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'natural', label: '[ Natural Selection ]' },
    { key: 'engineered', label: '[ Performance Surfaces ]' },
    { key: 'exotic', label: '[ Exotic Masterpieces ]' },
  ];

  return (
    <section id="materials" className="bg-primary border-b border-white/5 py-32 px-6 md:px-12">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-gold rotate-45" />
              <span className="text-gold font-mono text-xs uppercase tracking-[0.3em]">
                Our Selection
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-mono font-black uppercase text-white tracking-tighter">
              The Portfolio
            </h2>
            <p className="text-text-muted mt-4 max-w-xl text-sm leading-relaxed">
              A meticulously curated library of distinguished surfaces. 
              Sourced globally, finished to perfection.
            </p>
          </div>
          <Button variant="outline" size="sm">Explore the Catalog</Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-8 border-b border-white/10 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 relative outline-none ${
                activeTab === tab.key 
                  ? 'text-gold' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {COMPANY_KB.materials[activeTab].map((material: any, idx: number) => (
                <MachineCard 
                  key={material.type} 
                  className="group flex flex-col p-0 h-full border border-white/10 hover:border-gold/50 bg-surface/50"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-black border-b border-white/5">
                    <img 
                      src={getTexture(material.type)}
                      alt={`A sample of our ${material.type}`}
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                    />
                    
                    {/* Technical Overlay - REF (Top Left) */}
                    <div className="absolute top-4 left-4 z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary/90 backdrop-blur border border-white/10 px-2 py-1">
                        <span className="text-[10px] font-mono text-gold uppercase tracking-widest">
                          Ref: {activeTab.substring(0,3).toUpperCase()}-0{idx + 1}
                        </span>
                      </div>
                    </div>

                    {/* Technical Overlay - THK (Top Right) */}
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary/90 backdrop-blur border border-white/10 px-2 py-1">
                        <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest">
                          Weight: 3cm
                        </span>
                      </div>
                    </div>
                    
                    {/* Hover Attributes */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="flex gap-2 flex-wrap">
                        {material.attributes?.map((attr: string) => (
                          <span key={attr} className="text-[8px] uppercase tracking-wider text-white border border-white/20 px-2 py-0.5 bg-black/50">
                            {attr}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-mono uppercase text-white mb-3 tracking-tight group-hover:text-gold transition-colors">
                      {material.type}
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed font-light">
                      {material.description}
                    </p>
                  </div>
                </MachineCard>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
