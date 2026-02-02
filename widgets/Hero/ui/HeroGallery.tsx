
import React, { useRef, useState, useEffect, useCallback } from 'react';
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

  const LIGHT_RADIUS = 100;      
  const GLOW_RADIUS = 120;       
  const LIGHT_BRIGHTNESS = 1.3; 
  const GLOW_OPACITY = 0.15;    

  const mouseX = useMotionValue(-500); // Start off-screen
  const mouseY = useMotionValue(-500);
  const lightX = useSpring(mouseX, { stiffness: 200, damping: 30 }); 
  const lightY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  // Use a smoother gradient to avoid 'square' artifacts on mobile rendering
  const maskImage = useMotionTemplate`radial-gradient(circle ${LIGHT_RADIUS}px at ${lightX}px ${lightY}px, black 0%, black 40%, transparent 100%)`;
  const glowGradient = useMotionTemplate`radial-gradient(circle ${GLOW_RADIUS}px at ${lightX}px ${lightY}px, rgba(212,175,55,${GLOW_OPACITY}) 0%, transparent 100%)`;

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    if (!galleryRef.current) return;
    const { left, top } = galleryRef.current.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }, [mouseX, mouseY]);

  const onMouseMove = (e: React.MouseEvent) => handlePointerMove(e.clientX, e.clientY);
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

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
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onTouchStart={(e) => {
        setHovering(true);
        if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchEnd={() => setHovering(false)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        // Slowly move light out of view
        mouseX.set(-500);
        mouseY.set(-500);
      }}
      ref={galleryRef}
    >
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
            <img 
              src={currentSlab.image}
              alt={currentSlab.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.35) contrast(1.1) grayscale(30%)' }}
            />
          </motion.div>

          <motion.div
            key={`lit-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovering ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
            style={{ WebkitMaskImage: maskImage, maskImage: maskImage }}
          >
            <img 
              src={currentSlab.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: `brightness(${LIGHT_BRIGHTNESS}) contrast(1.4) saturate(1.4) sepia(10%)` }}
            />
          </motion.div>
        </AnimatePresence>
        
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
          animate={{ opacity: hovering ? 1 : 0 }}
          style={{ background: glowGradient }}
        />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-30">
        <motion.div
          className="absolute top-0 left-0 w-6 h-6 flex items-center justify-center pointer-events-none"
          style={{ x: lightX, y: lightY, translateX: '-50%', translateY: '-50%' }}
          animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.5 }}
        >
          {/* Centered precision dot */}
          <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_4px_rgba(255,255,255,0.6)]" />
        </motion.div>

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
                {currentSlab.character}
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
