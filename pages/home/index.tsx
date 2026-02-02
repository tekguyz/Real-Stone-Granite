import React from 'react';
import { Hero } from '../../widgets/Hero/index';
import { TheDossier } from '../../widgets/TheDossier/index';
import { Capabilities } from '../../widgets/Capabilities/index';
import { MaterialVault } from '../../widgets/MaterialVault/index';
import { Monuments } from '../../widgets/Monuments/index';
import { FinalCTA } from '../../widgets/FinalCTA/index';
import { RibbonCTA } from '../../shared/ui/RibbonCTA';

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
      
      {/* 3.5. INTERCEPTOR RIBBON: Human & Inviting */}
      <RibbonCTA 
        heading="Ready to Begin Your Legacy?"
        subheading="Whether you are in the planning phase or ready to build, our master fabricators are here to guide you."
        buttonLabel="Start Your Project"
        onClick={onStartProject}
      />

      {/* 4. Inventory & Assets */}
      <MaterialVault onStartProject={onStartProject} />

      {/* 5. Social Proof & Legacy */}
      <Monuments />

      {/* 6. Thematic Closer: Final Call to Action & Philosophy */}
      <FinalCTA onStartProject={onStartProject} />
    </div>
  );
};
