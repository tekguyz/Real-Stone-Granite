import React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { HeroManifesto } from './ui/HeroManifesto';
import { HeroGallery } from './ui/HeroGallery';

interface HeroProps {
  onStartProject?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject }) => {
  const { scrollY } = useScroll();
  const yRight = useTransform(scrollY, [0, 1000], [0, -150]);

  const scrollToMaterials = () => {
    const element = document.getElementById('materials');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-primary flex flex-col md:flex-row overflow-hidden px-4 md:px-8">
      {/* 1. ARCHITECTURAL VIEWPORT LINES (Symmetrical Framing) */}
      <div className="absolute top-0 left-4 md:left-8 w-[1px] h-full bg-white/5 z-40 pointer-events-none" />
      <div className="absolute top-0 right-4 md:right-8 w-[1px] h-full bg-white/5 z-40 pointer-events-none" />
      
      {/* 2. CORE LAYOUT */}
      <HeroManifesto 
        onStartProject={onStartProject} 
        onExplore={scrollToMaterials} 
      />
      <HeroGallery 
        parallaxY={yRight} 
      />
    </section>
  );
};