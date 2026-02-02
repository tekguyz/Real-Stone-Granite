import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { FEATURED_SLABS } from '../model/inventory';
import { ICONS } from '../../../shared/assets';
import { PHYSICS } from '../../../shared/lib/theme';

interface HeroGalleryProps {
  parallaxY: any;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({ parallaxY }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  // --- CONFIGURATION ---
  const LIGHT_RADIUS = 80;      
  const GLOW_RADIUS = 100;       
  const LIGHT_BRIGHTNESS = 1.3; 
  const GLOW_OPACITY = 0.15;    
  // ---------------------

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const lightX = useSpring(mouseX, PHYSICS.industrial);
  const lightY = useSpring(mouseY, PHYSICS.industrial);

  const maskImage = useMotionTemplate`radial-gradient(circle ${LIGHT_RADIUS}px at ${lightX}px ${lightY}px, black 80%, transparent 100%)`;
  const glowGradient = useMotionTemplate`radial-gradient(circle ${GLOW_RADIUS}px at ${lightX}px ${lightY}px, rgba(255,220,150,${GLOW_OPACITY}) 0%, transparent 100%)`;

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    if (!galleryRef.current) return;
    const { left, top } = galleryRef.current.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_SLABS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentSlab = FEATURED_SLABS[currentIndex];

  return (
    <div 
      className="w-full md:w-1/2 h-[60vh] md:h-screen relative overflow-hidden bg-black cursor-none gpu-accel border-t md:border-t-0 border-white/5"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      ref={galleryRef}
    >
      {/* 1. PARALLAX IMAGE LAYER */}
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 w-full h-[120%] z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`base-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${currentSlab.image})`,
                filter: 'brightness(0.35) contrast(1.1) grayscale(30%)'
              }}
            />
          </motion.div>

          <motion.div
            key={`lit-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovering ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full z-10"
            style={{ 
              WebkitMaskImage: maskImage,
              maskImage: maskImage
            }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${currentSlab.image})`,
                filter: `brightness(${LIGHT_BRIGHTNESS}) contrast(1.4) saturate(1.4) sepia(10%)` 
              }}
            />
          </motion.div>
        </AnimatePresence>
        
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
          animate={{ opacity: hovering ? 1 : 0 }}
          style={{ background: glowGradient }}
        />
      </motion.div>

      {/* 2. STATIC UI LAYER */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <motion.div
          className="absolute"
          style={{ x: lightX, y: lightY }}
          animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.5 }}
        >
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] -translate-x-1/2 -translate-y-1/2" />
        </motion.div>

        {/* Selection Info Card - Redesigned to be compact & flushed */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-6 right-4 md:bottom-12 md:right-12 bg-surface/95 backdrop-blur-md border border-white/10 p-3 md:p-5 w-[180px] md:w-[240px] shadow-2xl pointer-events-auto"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gold rounded-full flex items-center justify-center text-primary shrink-0">
              <ICONS.Excellence className="w-3 h-3 md:w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="block text-gold font-bold text-[8px] md:text-[10px] uppercase tracking-wide leading-none mb-0.5">
                {currentSlab.status}
              </span>
              <AnimatePresence mode="wait">
                <motion.span 
                  key={currentSlab.name}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="block text-[11px] md:text-[14px] text-white font-serif italic tracking-wide truncate"
                >
                  {currentSlab.name}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          
          <div className="h-[1px] md:h-1 w-full bg-white/10 overflow-hidden relative">
            <motion.div 
              key={currentIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 8, ease: "linear" }}
              className="h-full bg-gold absolute top-0 left-0" 
            />
          </div>
          
          <div className="mt-1.5 flex justify-start text-[8px] font-mono text-white/40 uppercase tracking-widest leading-none">
            <AnimatePresence mode="wait">
              <motion.span 
                key={currentSlab.origin}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {currentSlab.origin}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};