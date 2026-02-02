import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_KB } from '../../entities/company/knowledge';
import { TEXTURES } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { useProjectStore } from '../../entities/project/store';
import { HAPTICS } from '../../shared/lib/haptics';

type TabKey = 'natural' | 'engineered';

interface MaterialVaultProps {
  onStartProject?: () => void;
}

export const MaterialVault: React.FC<MaterialVaultProps> = ({ onStartProject }) => {
  const { dispatch } = useProjectStore();
  const [activeTab, setActiveTab] = useState<TabKey>('natural');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeMaterials = useMemo(() => COMPANY_KB.materials[activeTab], [activeTab]);
  const selectedMaterial = activeMaterials[selectedIndex] || activeMaterials[0];

  const getTexture = (type: string) => {
    const key = type.split(' ')[0].toUpperCase(); 
    // @ts-ignore
    return TEXTURES[key] || TEXTURES.GRANITE;
  };

  const handleProjectInquiry = () => {
    dispatch({ type: 'SET_STONE_PREFERENCE', payload: selectedMaterial.type });
    if (onStartProject) onStartProject();
  };

  const handleSelectMaterial = (idx: number) => {
    if (idx !== selectedIndex) {
      HAPTICS.heavy();
      setSelectedIndex(idx);
      
      if (window.innerWidth < 1024 && scrollRef.current) {
        const item = scrollRef.current.children[idx] as HTMLElement;
        if (item) {
          scrollRef.current.scrollTo({
            left: item.offsetLeft - 48,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const handleTabChange = (tab: TabKey) => {
    if (tab !== activeTab) {
      HAPTICS.click();
      setActiveTab(tab);
      setSelectedIndex(0);
    }
  };

  return (
    <section id="materials" className="bg-primary min-h-screen w-full flex flex-col relative overflow-hidden border-t border-white/5">
      
      <div className="w-full py-6 md:py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 z-30 bg-primary">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-gold rotate-45" />
          <h2 className="text-lg md:text-xl font-sans font-bold uppercase tracking-widest text-white">Our Collection</h2>
        </div>
        
        <div className="flex bg-white/5 border border-white/10 p-1">
          {(['natural', 'engineered'] as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 md:px-6 py-2 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 ${
                activeTab === tab ? 'bg-gold text-primary font-bold' : 'text-white/40 hover:text-white'
              }`}
            >
              {tab === 'natural' ? 'Natural Stone' : 'Modern Surfaces'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
        
        <div 
          ref={scrollRef}
          className={`
            w-full lg:w-[400px] xl:w-[500px] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-row lg:flex-col bg-primary/80 backdrop-blur-md z-30 overflow-x-auto lg:overflow-y-auto scrollbar-hide lg:custom-scrollbar flex-shrink-0
          `}
        >
           {activeMaterials.map((material, idx) => {
             const isSelected = selectedIndex === idx;
             return (
               <button
                 key={material.type}
                 onClick={() => handleSelectMaterial(idx)}
                 className={`
                   flex-shrink-0 lg:w-full text-left p-6 lg:p-12 border-r lg:border-r-0 lg:border-b border-white/5 transition-all duration-500 relative group
                   ${isSelected ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'}
                 `}
               >
                 <div className="flex flex-col gap-1 lg:gap-2 relative z-10">
                   <h3 className={`text-base lg:text-4xl font-sans font-light tracking-tighter whitespace-nowrap lg:whitespace-normal transition-all duration-500 ${isSelected ? 'text-white scale-105 lg:scale-110 origin-left' : 'text-white/40'}`}>
                     {material.type}
                   </h3>
                   
                   <AnimatePresence>
                     {isSelected && (
                       <motion.div 
                         initial={{ opacity: 0, y: 5 }} 
                         animate={{ opacity: 1, y: 0 }} 
                         className="hidden lg:flex flex-wrap gap-2 mt-4"
                       >
                         {material.attributes?.map(attr => (
                           <span key={attr} className="text-[8px] font-mono uppercase tracking-widest text-gold/60 px-2 py-0.5 border border-gold/20">
                             {attr}
                           </span>
                         ))}
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>

                 {isSelected && (
                   <motion.div 
                     layoutId="activeIndicator"
                     className="absolute left-0 right-0 bottom-0 lg:right-auto lg:bottom-0 lg:top-0 w-full lg:w-1 h-0.5 lg:h-auto bg-gold"
                   />
                 )}
               </button>
             );
           })}
        </div>

        <div className="flex-1 relative bg-black group overflow-hidden flex flex-col">
          
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMaterial.type}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <img 
                  src={getTexture(selectedMaterial.type)} 
                  alt={selectedMaterial.type}
                  className="w-full h-full object-cover filter brightness-[0.6] lg:brightness-[0.6] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay z-10" />

          <div className="mt-auto w-full p-8 md:p-16 z-20 pointer-events-none pb-24 lg:pb-16">
            <motion.div 
              key={selectedMaterial.type + '-hud'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl bg-black/20 backdrop-blur-sm lg:bg-transparent p-6 lg:p-0 border lg:border-0 border-white/5"
            >
              <div className="flex items-center gap-4 mb-4 lg:mb-6">
                <div className="h-px w-8 lg:w-12 bg-gold" />
                <span className="text-gold font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.5em] font-bold">Selection Detail</span>
              </div>
              
              <h4 className="text-3xl md:text-6xl font-sans font-black uppercase text-white tracking-tighter mb-4 lg:mb-8 leading-none">
                {selectedMaterial.type}
              </h4>
              
              <p className="text-white/60 text-sm md:text-xl font-light leading-relaxed mb-8 lg:mb-10 max-w-xl">
                {selectedMaterial.description}
              </p>

              <div className="pointer-events-auto">
                <PrecisionBtn 
                  variant="primary" 
                  onClick={handleProjectInquiry}
                  className="w-full sm:w-auto h-12 lg:h-14 px-10"
                >
                  Ask about {selectedMaterial.type}
                </PrecisionBtn>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-12 right-12 hidden xl:flex flex-col items-center gap-4 opacity-20 pointer-events-none">
            <div className="w-[1px] h-24 bg-white" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] rotate-90 origin-center text-white">Showroom View</span>
            <div className="w-[1px] h-24 bg-white" />
          </div>

        </div>
      </div>

      <div className="w-full py-4 border-t border-white/5 bg-primary/80 backdrop-blur-md px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 z-30">
        <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em] text-center md:text-left">Current Collection: Hand-Selected in Fort Pierce</span>
        <div className="flex gap-6 md:gap-8">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gold/40 rounded-full" />
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Master Inspected</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gold/40 rounded-full" />
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Guaranteed Quality</span>
           </div>
        </div>
      </div>
    </section>
  );
};