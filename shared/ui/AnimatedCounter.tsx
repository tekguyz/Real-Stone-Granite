import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useInView, useMotionValue } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  label,
  suffix = "+",
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  
  // 1. Motion Value to hold the raw number
  const count = useMotionValue(0);
  
  // 2. Physics Spring (Heavy Industrial Feel)
  const spring = useSpring(count, { stiffness: 100, damping: 30 });
  
  // 3. Transform to remove decimals for display
  const display = useTransform(spring, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      // Small delay for stagger effect
      const timeout = setTimeout(() => {
        count.set(value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay, count]);

  return (
    <div ref={ref} className="flex flex-col items-start">
      <span className="flex items-baseline font-sans text-2xl lg:text-3xl font-light text-white tracking-tight">
        <motion.span>{display}</motion.span>
        <span className="text-gold ml-0.5">{suffix}</span>
      </span>
      <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono mt-1 border-t border-white/10 pt-2 w-full">
        {label}
      </span>
    </div>
  );
};