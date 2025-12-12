import React from 'react';
import { InputArea } from './InputArea';
import { QuickStarter } from './QuickStarter';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  onStartBuilder: (prompt: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBuilder }) => {
  const handleTrialClick = () => {
     const pricingSection = document.getElementById('pricing');
     if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
     }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full px-4 pt-[22vh] pb-8 z-10">
      
      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-6 tracking-tight leading-tight animate-fade-in-up [animation-delay:0.1s] [animation-fill-mode:backwards]">
        Build something <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">Ostra</span>
      </h1>

      {/* Trial Badge */}
      <div className="animate-fade-in-up [animation-delay:0.15s] [animation-fill-mode:backwards] mb-6">
        <button 
            onClick={handleTrialClick}
            className="group flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/10 hover:bg-indigo-900/20 hover:border-indigo-500/50 transition-all cursor-pointer backdrop-blur-sm shadow-[0_0_20px_rgba(79,70,229,0.1)] hover:shadow-[0_0_25px_rgba(79,70,229,0.2)]"
        >
            <span className="px-3 py-0.5 text-[11px] font-bold text-white bg-[#5865F2] rounded-full uppercase tracking-wider shadow-[0_0_12px_rgba(88,101,242,0.6)]">
                NEW
            </span>
            <span className="text-[14px] text-zinc-200 group-hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                Try 30 days free trial option
                <ChevronRight size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
            </span>
        </button>
      </div>
      
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