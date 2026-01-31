
import React from 'react';
import { Hero } from '../../widgets/Hero/index';
import { TheDossier } from '../../widgets/TheDossier/index';
import { Capabilities } from '../../widgets/Capabilities/index';
import { MaterialVault } from '../../widgets/MaterialVault/index';
import { Monuments } from '../../widgets/Monuments/index';
import { Philosophy } from '../../widgets/Philosophy/index';

interface HomePageProps {
  onStartProject?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartProject }) => {
  return (
    <div className="w-full flex flex-col bg-primary">
      {/* 1. Introduction & Hook */}
      <Hero onStartProject={onStartProject} />

      {/* 2. The Operational Handshake (Ethos & Data) */}
      <TheDossier />
      
      {/* 3. Process & Technical Specs */}
      <Capabilities />
      
      {/* 4. Inventory & Assets */}
      <MaterialVault onStartProject={onStartProject} />

      {/* 5. Social Proof & Legacy */}
      <Monuments />

      {/* 6. Thematic Closer: Philosophy (The Initiation Deck) */}
      <Philosophy onStartProject={onStartProject} />
    </div>
  );
};
