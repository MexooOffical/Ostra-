import React from 'react';
import { InputArea } from './InputArea';
import { QuickStarter } from './QuickStarter';

interface HeroProps {
  onStartBuilder: (prompt: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBuilder }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full px-4 pt-[22vh] pb-8 z-10">
      
      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-6 tracking-tight leading-tight animate-fade-in-up [animation-delay:0.1s] [animation-fill-mode:backwards]">
        Build something <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">Ostra</span>
      </h1>
      
      {/* Subheadline */}
      <p className="text-zinc-400 text-lg md:text-xl text-center mb-10 font-light max-w-2xl tracking-wide leading-relaxed animate-fade-in-up [animation-delay:0.2s] [animation-fill-mode:backwards]">
        Idea to professional website in seconds, with your personal AI architect
      </p>

      {/* Interactive Components */}
      <div className="w-full animate-fade-in-up [animation-delay:0.3s] [animation-fill-mode:backwards]">
        <InputArea onSubmit={onStartBuilder} />
        <QuickStarter />
      </div>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};