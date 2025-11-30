import React from 'react';
import { Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/[0.03] pt-20 pb-10 px-6 relative z-30 overflow-hidden">
        
        {/* Center Bottom Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.08)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col items-center">
            
            {/* Center Content Block */}
            <div className="flex flex-col items-center gap-6 mb-16">
                
                {/* Logo & Brand */}
                <div className="flex items-center gap-3.5 group cursor-default select-none">
                    {/* Animated Logo */}
                    <div className="relative flex items-center justify-center w-10 h-10 bg-[#09090b] border border-white/10 rounded-xl overflow-hidden shadow-2xl shrink-0 transition-transform duration-500 hover:scale-105">
                        {/* Spinning Gradient Border */}
                        <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,#22d3ee_90deg,transparent_180deg)] animate-[spin_4s_linear_infinite]"></div>
                        {/* Inner Mask */}
                        <div className="absolute inset-[1.5px] bg-[#09090b] rounded-[10px] z-10 flex items-center justify-center">
                            {/* Central Diamond/Icon */}
                            <div className="w-3.5 h-3.5 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-sm transform rotate-45 shadow-[0_0_15px_rgba(34,211,238,0.6)]"></div>
                        </div>
                    </div>
                    
                    {/* Brand Name */}
                    <span className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">Ostra</span>
                </div>

                {/* Email Link with Icon */}
                <a 
                    href="mailto:support@ostra.com" 
                    className="flex items-center gap-2.5 text-zinc-400 hover:text-cyan-400 transition-colors group/email px-3 py-1.5 rounded-full hover:bg-white/[0.03]"
                >
                    <Send size={15} className="transform -rotate-12 group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5 transition-transform stroke-[2px]" />
                    <span className="text-sm font-medium tracking-wide">support@ostra.com</span>
                </a>
            </div>

            {/* Animated Divider Line */}
            <div className="w-full max-w-5xl h-px relative mb-10">
                {/* Static base line */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                {/* Animated shimmer moving across */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/80 to-transparent w-1/2 h-full blur-[1px] animate-shimmer-slide opacity-80"></div>
                
                {/* Central fixed glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-[2px] bg-cyan-500/20 blur-sm rounded-full"></div>
            </div>

            {/* Bottom Section */}
            <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] font-medium text-zinc-500">
                <div className="flex items-center gap-8">
                    <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-zinc-300 transition-colors">Terms & Conditions</a>
                </div>
                <div className="text-center md:text-right text-zinc-600 tracking-wide">
                    © 2025 Ostra. All rights reserved.
                </div>
            </div>
        </div>

        <style>{`
          @keyframes shimmer-slide {
            0% { transform: translateX(-150%); }
            50% { opacity: 1; }
            100% { transform: translateX(150%); opacity: 0; }
          }
          .animate-shimmer-slide {
            animation: shimmer-slide 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}</style>
    </footer>
  );
};
