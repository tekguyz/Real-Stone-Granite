
import React, { useState, Suspense, lazy } from 'react';
import { HomePage } from './pages/home';
import { Navbar } from './widgets/Navbar';
import { Footer } from './widgets/Footer';
import { ToastProvider } from './shared/ui/Toast';
import { ProjectProvider } from './entities/project/store';

// LAZY LOAD HEAVY MODULES
const DesignStudio = lazy(() => import('./features/DesignStudio').then(module => ({ default: module.DesignStudio })));
const StoneCurator = lazy(() => import('./features/StoneCurator').then(module => ({ default: module.StoneCurator })));

const App: React.FC = () => {
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  return (
    <ProjectProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-primary relative selection:bg-gold selection:text-primary overflow-x-hidden">
          
          {/* Navigation Layer */}
          <Navbar onOpenStudio={() => setIsStudioOpen(true)} />
          
          {/* Main Content Layer */}
          <main className="flex-1 w-full">
            <HomePage onStartProject={() => setIsStudioOpen(true)} />
          </main>
          
          {/* Global Features (Lazy Loaded) */}
          <Suspense fallback={null}>
            <StoneCurator 
              onLaunchStudio={() => setIsStudioOpen(true)} 
              isStudioOpen={isStudioOpen}
            />
            <DesignStudio isOpen={isStudioOpen} onClose={() => setIsStudioOpen(false)} />
          </Suspense>

          {/* Footer Layer */}
          <Footer onOpenStudio={() => setIsStudioOpen(true)} />
        </div>
      </ToastProvider>
    </ProjectProvider>
  );
};

export default App;
