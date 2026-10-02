import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  onLogin?: () => void;
  onProfileClick?: () => void;
  isAuthenticated?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onLogin, onProfileClick, isAuthenticated }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-zinc-100 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex h-9 max-w-[1240px] items-center justify-between">
        <button onClick={() => scrollToSection('models')} className="flex items-center gap-2 text-xl font-semibold text-zinc-950">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <Sparkles size={17} />
          </span>
          Ostra
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          <button onClick={() => scrollToSection('models')} className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950">
            Models
          </button>
          <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950">
            Pricing
          </button>
          <button onClick={() => scrollToSection('faqs')} className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950">
            FAQs
          </button>
        </nav>

        <button
          onClick={isAuthenticated ? onProfileClick : onLogin}
          className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
        >
          {isAuthenticated ? 'Account' : 'Log in'}
          <ArrowRight size={15} />
        </button>
      </div>
    </header>
  );
};