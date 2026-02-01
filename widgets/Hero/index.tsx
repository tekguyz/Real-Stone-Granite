
import React from 'react';
import { useScroll, useTransform } from 'framer-motion';
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
    <section className="relative w-full min-h-screen bg-primary flex flex-col md:flex-row overflow-hidden">
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
