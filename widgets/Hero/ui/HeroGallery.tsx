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
  const LIGHT_RADIUS = 70;      // Size of the clear visibility circle (px)
  const GLOW_RADIUS = 90;       // Size of the soft outer glow (px)
  const LIGHT_BRIGHTNESS = 1.3; // Image exposure (1.0 = normal, 2.0 = double brightness)
  const GLOW_OPACITY = 0.15;    // Intensity of the atmospheric fog (0.0 to 1.0)
  // ---------------------

  // Lighting Physics Engine
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const lightX = useSpring(mouseX, PHYSICS.industrial);
  const lightY = useSpring(mouseY, PHYSICS.industrial);

  // Precision Lighting: Dynamic mask
  const maskImage = useMotionTemplate`radial-gradient(circle ${LIGHT_RADIUS}px at ${lightX}px ${lightY}px, black 80%, transparent 100%)`;
  
  // Dynamic Atmosphere: Uses GLOW_OPACITY configuration
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
      className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden bg-black cursor-none gpu-accel"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      ref={galleryRef}
    >
      <motion.div style={{ y: parallaxY }} className="w-full h-[120%] relative">
        <AnimatePresence mode="popLayout">
          {/* Base Layer (Ambient - Dark) */}
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

          {/* Reveal Layer (Backlit - Lit Up) */}
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
        
        {/* Atmosphere Bloom */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
          animate={{ opacity: hovering ? 1 : 0 }}
          style={{ background: glowGradient }}
        />

        {/* Minimal Specular Highlight (Reflection Point) */}
        <motion.div
          className="absolute z-30 pointer-events-none"
          style={{ x: lightX, y: lightY }}
          animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.5 }}
        >
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] -translate-x-1/2 -translate-y-1/2" />
        </motion.div>

        {/* Selection Info Card */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-32 right-6 md:right-12 lg:right-24 bg-surface/90 backdrop-blur-xl border border-white/10 p-6 max-w-xs z-40 shadow-2xl pointer-events-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-primary">
              <ICONS.Excellence className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-gold font-bold text-xs uppercase tracking-wide">
                {currentSlab.status}
              </span>
              <AnimatePresence mode="wait">
                <motion.span 
                  key={currentSlab.name}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="block text-[14px] text-white font-serif italic tracking-wide"
                >
                  {currentSlab.name}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          
          <div className="h-1 w-full bg-white/10 overflow-hidden relative">
            <motion.div 
              key={currentIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 8, ease: "linear" }}
              className="h-full bg-gold absolute top-0 left-0" 
            />
          </div>
          
          <div className="mt-3 flex justify-start text-[9px] font-mono text-white/50 uppercase tracking-widest">
            <AnimatePresence mode="wait">
              <motion.span 
                key={currentSlab.origin}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Origin: {currentSlab.origin}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};