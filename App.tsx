import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Auth } from './components/Auth';
import { Builder } from './components/Builder';
import { Profile } from './components/Profile';
import { CheckoutModal } from './components/CheckoutModal';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'builder' | 'profile'>('landing');
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [builderPrompt, setBuilderPrompt] = useState('');
  
  // Checkout Modal State
  const [checkoutPlan, setCheckoutPlan] = useState<{ title: string, price: string } | null>(null);

  // Mock Auth State Listener
  useEffect(() => {
    const storedAuth = localStorage.getItem('ostra_auth');
    if (storedAuth) {
        setIsAuthenticated(true);
    }
  }, []);

  const handleStartBuilder = (prompt: string) => {
    setBuilderPrompt(prompt);
    if (isAuthenticated) {
      setView('builder');
    } else {
      setShowAuth(true);
    }
  };

  const handleLoginSuccess = () => {
    localStorage.setItem('ostra_auth', 'true');
    setIsAuthenticated(true);
    setShowAuth(false);
    // If a user tried to build something before logging in, send them to builder now
    if (builderPrompt && view === 'landing') {
        setView('builder');
    }
  };

  const handleLogout = () => {
      localStorage.removeItem('ostra_auth');
      localStorage.removeItem('ostra_user_name');
      localStorage.removeItem('ostra_user_email');
      setIsAuthenticated(false);
      setView('landing');
  };

  const handlePlanSelect = (plan: { title: string, price: string }) => {
    setCheckoutPlan(plan);
  };

  const handleCheckoutSuccess = () => {
    setCheckoutPlan(null);
    if (isAuthenticated) {
        setView('profile');
    } else {
        // Just close modal on landing if not authenticated yet
    }
  };

  const handleNavigateToPricing = () => {
    setView('landing');
    setTimeout(() => {
        const element = document.getElementById('pricing');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-cyan-500/30 font-sans">
      
      {view === 'builder' ? (
        <Builder 
          initialPrompt={builderPrompt} 
          onBack={() => setView('landing')} 
        />
      ) : view === 'profile' ? (
        <Profile 
          onBack={() => setView('landing')} 
          onLogout={handleLogout} 
          onUpgrade={handleNavigateToPricing}
        />
      ) : (
        <>
          <Header 
            onLogin={() => setShowAuth(true)} 
            isAuthenticated={isAuthenticated}
            onProfileClick={() => {
                if (isAuthenticated) setView('profile');
                else setShowAuth(true);
            }}
          />
          
          <main>
            <Hero onStartBuilder={handleStartBuilder} />
            <Pricing onPlanSelect={handlePlanSelect} />
            <FAQ />
            <CTA onStart={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          </main>

          <Footer />
        </>
      )}

      {/* Auth Modal Overlay */}
      {showAuth && (
        <Auth 
          onLogin={handleLoginSuccess} 
          onBack={() => setShowAuth(false)} 
        />
      )}

      {/* Checkout Modal Overlay */}
      {checkoutPlan && (
        <CheckoutModal 
            plan={checkoutPlan}
            onClose={() => setCheckoutPlan(null)}
            onSuccess={handleCheckoutSuccess}
            isAuthenticated={isAuthenticated}
            userEmail={isAuthenticated ? localStorage.getItem('ostra_user_email') : null}
        />
      )}
    </div>
  );
};

export default App;