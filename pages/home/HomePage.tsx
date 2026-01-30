
import React from 'react';
import { Hero } from '../../widgets/Hero';
import { Capabilities } from '../../widgets/Capabilities/index';
import { MaterialVault } from '../../widgets/MaterialVault/index';
import { Monuments } from '../../widgets/Monuments/index';
import { Button } from '../../shared/ui/Button';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <Hero />
      
      <MaterialVault />

      <Capabilities />

      <Monuments />

      {/* Info Section */}
      <section className="bg-surface py-32 px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="text-gold font-mono text-xs uppercase tracking-[0.5em] block mb-6">The Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-mono font-bold uppercase mb-8 leading-tight">
            Design is <span className="italic">Specification</span>, 
            Architecture is <span className="italic text-gold">Manifestation</span>.
          </h2>
          <p className="text-text-muted text-lg leading-relaxed mb-12">
            Every pixel is a decision. Every border is a boundary. 
            We provide the infrastructure for those who demand absolute control over their environment.
          </p>
          <Button variant="outline" size="lg">Explore Specification Manual</Button>
        </div>
      </section>
    </div>
  );
};
