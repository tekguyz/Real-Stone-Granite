
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
      
      <div className="w-full py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5 z-30 bg-primary">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          <h2 className="text-sm md:text-base font-sans font-bold uppercase tracking-widest text-white">Our Collection</h2>
        </div>
        
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-sm">
          {(['natural', 'engineered'] as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-1.5 text-[9px] font-mono uppercase tracking-[0.2em] transition-all duration-500 rounded-sm ${
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
            w-full lg:w-[320px] xl:w-[380px] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-row lg:flex-col bg-primary/80 backdrop-blur-md z-30 overflow-x-auto lg:overflow-y-auto scrollbar-hide lg:custom-scrollbar flex-shrink-0
          `}
        >
           {activeMaterials.map((material, idx) => {
             const isSelected = selectedIndex === idx;
             return (
               <button
                 key={material.type}
                 onClick={() => handleSelectMaterial(idx)}
                 className={`
                   flex-shrink-0 lg:w-full text-left p-4 lg:p-8 border-r lg:border-r-0 lg:border-b border-white/5 transition-all duration-500 relative group min-w-[140px] lg:min-w-0
                   ${isSelected ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'}
                 `}
               >
                 <div className="flex flex-col gap-1 relative z-10">
                   <h3 className={`text-sm md:text-base lg:text-xl font-sans font-medium tracking-wide transition-all duration-500 ${isSelected ? 'text-white' : 'text-white/40'}`}>
                     {material.type}
                   </h3>
                   
                   <AnimatePresence>
                     {isSelected && (
                       <motion.div 
                         initial={{ opacity: 0, height: 0 }} 
                         animate={{ opacity: 1, height: 'auto' }} 
                         className="hidden lg:flex flex-wrap gap-2 mt-2"
                       >
                         {material.attributes?.slice(0, 2).map(attr => (
                           <span key={attr} className="text-[9px] font-mono uppercase tracking-widest text-gold/60">
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
                     className="absolute left-0 right-0 bottom-0 lg:right-auto lg:bottom-0 lg:top-0 w-full lg:w-0.5 h-0.5 lg:h-auto bg-gold"
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
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay z-10" />

          <div className="mt-auto w-full p-5 md:p-12 z-20 pointer-events-none pb-20 lg:pb-12">
            <motion.div 
              key={selectedMaterial.type + '-hud'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl bg-black/40 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none p-5 lg:p-0 border border-white/5 lg:border-0 rounded-sm lg:rounded-none"
            >
              <div className="flex items-center gap-3 mb-3 lg:mb-4">
                <div className="h-px w-6 lg:w-8 bg-gold" />
                <span className="text-gold font-mono text-[9px] uppercase tracking-[0.4em] font-bold">Selection Detail</span>
              </div>
              
              <h4 className="text-2xl md:text-5xl font-sans font-medium uppercase text-white tracking-tight mb-3 lg:mb-6 leading-none">
                {selectedMaterial.type}
              </h4>
              
              <p className="text-white/70 text-[10px] md:text-base font-light leading-relaxed mb-6 lg:mb-8 max-w-md">
                {selectedMaterial.description}
              </p>

              <div className="pointer-events-auto">
                <PrecisionBtn 
                  variant="primary" 
                  onClick={handleProjectInquiry}
                  className="w-full sm:w-auto h-10 lg:h-12 px-8 py-0 text-[10px]"
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

      <div className="w-full py-3 border-t border-white/5 bg-primary/80 backdrop-blur-md px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-3 z-30">
        <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em] text-center md:text-left">Current Collection: Hand-Selected in Fort Pierce</span>
        <div className="flex gap-6 md:gap-8">
           <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gold/40 rounded-full" />
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Master Inspected</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gold/40 rounded-full" />
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Guaranteed Quality</span>
           </div>
        </div>
      </div>
    </section>
  );
};
