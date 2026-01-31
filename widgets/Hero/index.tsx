import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, animate, useTransform, useInView } from 'framer-motion';
import { PrecisionBtn } from '../../shared/ui/PrecisionBtn';
import { MEDIA } from '../../shared/assets';
import { PHYSICS } from '../../shared/lib/theme';

interface HeroProps {
  onStartProject?: () => void;
}

/**
 * AnimatedCounter: Fires ONLY when scrolled into view.
 */
const AnimatedCounter: React.FC<{ value: number; suffix: string; label: string }> = ({ value, suffix, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, value, {
        duration: 2.5,
        ease: "easeOut",
      });
      return animation.stop;
    }
  }, [value, count, isInView]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center h-full px-4 md:px-8">
      <div className="flex items-baseline gap-1">
        <motion.span className="font-mono font-black text-white text-3xl md:text-5xl tracking-tighter">
          {rounded}
        </motion.span>
        <span className="font-mono font-bold text-gold text-xl md:text-2xl opacity-80 select-none">
          {suffix}
        </span>
      </div>
      <span className="font-mono text-gold text-[10px] uppercase tracking-[0.3em] mt-2 whitespace-nowrap opacity-60">
        {label}
      </span>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onStartProject }) => {
  const containerRef = useRef<HTMLElement>(null);

  // --- INTERACTION PHYSICS ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Softened spotlight radius (450px) for a luxurious lighting feel
  const spotlightGradient = useMotionTemplate`radial-gradient(circle 450px at ${springX}px ${springY}px, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,1) 100%)`;

  const scrollToMaterials = () => {
    const element = document.getElementById('materials');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* PART 1: THE VISUAL MONOLITH */}
      <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black selection:bg-gold selection:text-black"
      >
        {/* LAYER 1: LUXURY KITCHEN IMAGE */}
        <div className="absolute inset-0 z-0">
          <img
            src={MEDIA.IMG_MACRO_POSTER}
            alt="Luxury Kitchen with Natural Stone"
            className="w-full h-full object-cover scale-110 opacity-70"
          />
        </div>

        {/* LAYER 2: AMBIENT SPOTLIGHT */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: spotlightGradient }}
        />
        
        {/* LAYER 3: ATMOSPHERIC TEXTURE */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

        {/* LAYER 4: BRAND HUD (AUTHENTIC BUSINESS INFO) */}
        <div className="absolute inset-0 z-50 pointer-events-none px-6 md:px-12 pb-6 md:pb-12 pt-32 flex flex-col justify-between">
          
          <div className="flex justify-between items-start">
            {/* Top Left: Location */}
            <div className="relative">
              <div className="w-8 h-8 border-t border-l border-gold" />
              <span className="absolute top-4 left-4 font-mono text-[10px] text-gold uppercase tracking-[0.25em] font-bold whitespace-nowrap drop-shadow-md">
                FORT PIERCE, FL
              </span>
            </div>
            
            {/* Top Right: Heritage */}
            <div className="relative">
              <div className="w-8 h-8 border-t border-r border-gold" />
              <span className="absolute top-4 right-4 font-mono text-[10px] text-gold uppercase tracking-[0.25em] font-bold whitespace-nowrap text-right drop-shadow-md">
                EST. 1993
              </span>
            </div>
          </div>

          {/* Center Vertical Reference */}
          <div className="absolute top-0 left-1/2 h-full w-[1px] bg-white/10 -translate-x-1/2" />

          <div className="flex justify-between items-end pb-8">
            {/* Bottom Left: Identity */}
            <div className="relative">
              <div className="w-8 h-8 border-b border-l border-gold" />
              <span className="absolute bottom-4 left-4 font-mono text-[10px] text-gold uppercase tracking-[0.25em] font-bold whitespace-nowrap drop-shadow-md">
                FAMILY OWNED
              </span>
            </div>

            {/* Bottom Right: Spacer */}
            <div className="relative">
              <div className="w-8 h-8 border-b border-r border-gold" />
            </div>
          </div>
        </div>

        {/* LAYER 5: MAIN TYPOGRAPHY */}
        <div className="relative z-40 flex flex-col items-center text-center px-4 mb-12">
          <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...PHYSICS.smooth, delay: 0.2 }}
              className="mb-12"
          >
            <h1 className="font-mono font-black uppercase leading-[0.85] tracking-tighter select-none">
              <span className="block text-6xl md:text-8xl lg:text-[10rem] text-white mix-blend-difference drop-shadow-2xl">
                EXCELLENCE
              </span>
              <span 
                className="block text-6xl md:text-8xl lg:text-[10rem] text-transparent drop-shadow-xl"
                style={{ WebkitTextStroke: '1px var(--color-gold)' }}
              >
                IN STONE
              </span>
            </h1>
          </motion.div>

          <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...PHYSICS.smooth, delay: 0.6 }}
              className="text-white/80 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] mb-16 drop-shadow-lg"
          >
            Integrity • Craftsmanship • Quality
          </motion.p>

          <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...PHYSICS.industrial, delay: 0.8 }}
              className="pointer-events-auto"
          >
            <PrecisionBtn
              variant="primary"
              onClick={scrollToMaterials}
              className="border-gold text-primary bg-gold hover:bg-white hover:text-primary transition-colors min-w-[240px]"
            >
              VIEW STONE INVENTORY
            </PrecisionBtn>
          </motion.div>
        </div>
      </section>

      {/* PART 2: TELEMETRY BAR */}
      <div className="relative w-full h-auto md:h-32 bg-primary border-t border-b border-white/10 z-30 flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-white/10">
         <div className="flex-1 w-full h-32 md:h-full flex items-center justify-center bg-white/[0.02]">
            <AnimatedCounter value={30} suffix="+" label="Years of Legacy" />
         </div>
         <div className="flex-1 w-full h-32 md:h-full flex items-center justify-center bg-white/[0.02]">
            <AnimatedCounter value={5000} suffix="+" label="Projects Completed" />
         </div>
         <div className="flex-1 w-full h-32 md:h-full flex items-center justify-center bg-white/[0.02]">
            <AnimatedCounter value={100} suffix="%" label="Veteran Supported" />
         </div>
      </div>
    </>
  );
};