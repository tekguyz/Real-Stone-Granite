
import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { HomePage } from './pages/home';
import { Navbar } from './widgets/Navbar';
import { Footer } from './widgets/Footer';
import { DesignStudio } from './features/DesignStudio';
import { StoneCurator } from './features/StoneCurator';
import { SEO } from './app/SEO';

const App: React.FC = () => {
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  return (
    <HelmetProvider>
      <SEO />
      <div className="min-h-screen flex flex-col bg-primary relative selection:bg-gold selection:text-primary overflow-x-hidden">
        
        {/* Navigation Layer */}
        <Navbar onOpenStudio={() => setIsStudioOpen(true)} />
        
        {/* Main Content Layer */}
        <main className="flex-1 w-full">
          <HomePage onStartProject={() => setIsStudioOpen(true)} />
        </main>
        
        {/* Global Features (Overlays) */}
        <StoneCurator 
          onLaunchStudio={() => setIsStudioOpen(true)} 
          isStudioOpen={isStudioOpen}
        />
        <DesignStudio isOpen={isStudioOpen} onClose={() => setIsStudioOpen(false)} />

        {/* Footer Layer */}
        <Footer onOpenStudio={() => setIsStudioOpen(true)} />
      </div>
    </HelmetProvider>
  );
};

export default App;
