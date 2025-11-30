import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Auth } from './components/Auth';
import { Builder } from './components/Builder';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'auth' | 'builder'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string>('');
  
  const handleStartBuilder = (prompt: string) => {
    if (!isAuthenticated) {
      setPendingPrompt(prompt);
      setView('auth');
    } else {
      setPendingPrompt(prompt);
      setView('builder');
    }
  };

  const handleLoginSuccess = async () => {
    setIsAuthenticated(true);
    
    // If there was a pending prompt, go straight to builder
    if (pendingPrompt) {
      setView('builder');
    } else {
      setView('home');
    }
  };

  const handleCreateProjectClick = () => {
    if (!isAuthenticated) {
      setPendingPrompt(''); // No specific prompt yet
      setView('auth');
    } else {
      setPendingPrompt(''); // Start fresh
      setView('builder');
    }
  };

  // If we are in builder mode, we render the full screen builder without standard header/bg
  if (view === 'builder') {
    return (
        <Builder 
            initialPrompt={pendingPrompt} 
            onBack={() => setView('home')} 
        />
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-cyan-500/30 font-sans">
      {/* Background Gradients - Only visible in Home/Auth views */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        
        {/* Top Blue-Cyan Mixer */}
        <div className="absolute top-[-50vh] left-1/2 -translate-x-1/2 w-[180vw] h-[120vh]">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/15 via-cyan-500/5 to-transparent blur-[150px] opacity-80"></div>
        </div>

        {/* Top Edge Linear Gradient */}
        <div className="absolute top-0 left-0 right-0 h-[50vh]">
           <div className="w-full h-full bg-gradient-to-b from-blue-950/30 via-blue-900/10 to-transparent blur-[80px]"></div>
        </div>

        {/* Main Blue/Cyan Glow */}
        <div className="absolute bottom-[-40vh] left-1/2 -translate-x-1/2 w-[140vw] h-[110vh]">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/25 via-blue-600/20 to-transparent blur-[120px] animate-glow-pulse"></div>
        </div>

        {/* Secondary wider blue glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[60vh]">
           <div className="w-full h-full bg-gradient-to-t from-blue-900/20 via-cyan-900/10 to-transparent blur-[100px] animate-pulse"></div>
        </div>

        {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/40 pointer-events-none"></div>
      </div>

      {view !== 'auth' && (
        <Header 
            onLogin={() => setView('auth')} 
        />
      )}
      
      <main className="relative z-10 flex flex-col min-h-screen">
        {view === 'home' ? (
          <>
            <Hero onStartBuilder={handleStartBuilder} />
            <Pricing />
            <FAQ />
            <CTA onStart={() => handleStartBuilder('')} />
            <Projects onAuthRequest={handleCreateProjectClick} />
            <Footer />
          </>
        ) : (
          <div className="flex-grow flex flex-col justify-center">
             <Auth onLogin={handleLoginSuccess} onBack={() => setView('home')} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;