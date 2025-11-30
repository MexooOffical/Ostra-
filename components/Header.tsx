import React from 'react';
import { LogIn } from 'lucide-react';

interface HeaderProps {
  onLogin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogin }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 bg-transparent pointer-events-none transition-all duration-500 ease-in-out">
      <div className="pointer-events-auto flex items-center justify-between w-full relative">
          {/* Left Area: Logo + Login */}
          <div className="flex items-center gap-6 z-20">
            {/* Text Logo with Glow */}
            <span className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] cursor-pointer select-none">
              Ostra
            </span>

            {/* Vertical Divider */}
            <div className="h-5 w-[1px] bg-white/10"></div>

            {/* Animated Login Button (Top Left) */}
            <button 
                onClick={onLogin}
                className="group relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181b]/50 border border-white/5 hover:border-cyan-500/30 hover:bg-[#18181b] transition-all duration-300 overflow-hidden"
            >
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                
                <span className="text-xs font-medium text-zinc-300 group-hover:text-cyan-200 transition-colors relative z-10">Log In</span>
                <LogIn size={12} className="text-zinc-500 group-hover:text-cyan-400 transition-colors relative z-10 group-hover:translate-x-0.5 transform duration-300" />
            </button>
          </div>

          {/* Center Navigation Pill */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block z-20">
            <nav className="flex items-center p-1 bg-[#121214]/80 backdrop-blur-xl border border-white/[0.08] rounded-full shadow-[0_0_20px_-5px_rgba(255,255,255,0.07)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.12)] transition-shadow duration-500">
               <button className="px-5 py-2 text-[13px] font-medium text-zinc-400 hover:text-white transition-all rounded-full hover:bg-white/[0.08]">
                 Features
               </button>
               <button 
                onClick={() => scrollToSection('pricing')}
                className="px-5 py-2 text-[13px] font-medium text-zinc-400 hover:text-white transition-all rounded-full hover:bg-white/[0.08]"
               >
                 Pricing
               </button>
               <button 
                onClick={() => scrollToSection('faqs')}
                className="px-5 py-2 text-[13px] font-medium text-zinc-400 hover:text-white transition-all rounded-full hover:bg-white/[0.08]"
               >
                 FAQs
               </button>
            </nav>
          </div>

          {/* Right Profile/Menu Button */}
          <div className="flex items-center gap-4 z-20">
            <button className="flex items-center justify-between px-1.5 py-1.5 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] transition-colors border border-white/5 w-[68px] h-[36px] cursor-pointer shadow-inner shadow-black/20">
                <div className="w-6 h-6 rounded bg-indigo-600 ml-0.5 shadow-inner border border-white/5"></div>
                <div className="w-8 h-1.5 rounded-full bg-zinc-600/50 mr-1"></div>
            </button>
          </div>
      </div>
    </header>
  );
};