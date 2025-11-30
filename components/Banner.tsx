import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Banner: React.FC = () => {
  return (
    // Changed fixed -> absolute so it scrolls with the page
    <div className="absolute top-0 left-0 right-0 z-[50] h-14 bg-gradient-to-r from-[#5a1a08] via-[#ea580c] to-[#5a1a08] flex items-center justify-between px-2 md:px-4 overflow-hidden border-b border-orange-900/40 shadow-[0_4px_30px_rgba(234,88,12,0.15)]">
      
      {/* Background Pattern (Dots & Noise) */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:12px_12px] opacity-50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
      
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-64 h-full bg-orange-400/20 blur-[30px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-64 h-full bg-red-500/20 blur-[30px] pointer-events-none"></div>

      {/* Main Container - Increased scale for bigger look on large screens */}
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between relative z-10 h-full origin-left scale-[0.85] sm:scale-100 md:scale-105 transition-transform duration-300">
        
        {/* Left: Button */}
        <div className="flex items-center pl-2 md:pl-4 shrink-0">
            <button className="flex items-center gap-2 bg-white text-[#c2410c] px-5 py-1.5 rounded-full font-extrabold text-[13px] uppercase tracking-wide hover:bg-orange-50 hover:scale-105 transition-all shadow-[0_2px_15px_rgba(0,0,0,0.2)] group cursor-pointer border border-orange-100">
                <span>Get Ostra Now</span>
                <ArrowRight size={14} strokeWidth={4} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

        {/* Center: Badge */}
        <div className="flex-1 flex justify-center items-center gap-2 md:gap-6 shrink-0 mx-2">
             {/* Sparkle Left */}
             <div className="text-yellow-200 animate-pulse hidden sm:block">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-[0_0_10px_rgba(253,224,71,0.8)]">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
             </div>
             
             {/* Marquee Badge Container */}
             <div className="relative group scale-95 md:scale-100">
                 {/* Bulb Border Glow */}
                 <div className="absolute inset-0 bg-orange-500 blur-lg rounded-full opacity-50 animate-pulse"></div>
                 
                 {/* Main Badge */}
                 <div className="relative px-8 py-1 bg-[#1a0500] rounded-full border-[3px] border-[#ea580c] shadow-[0_0_25px_rgba(234,88,12,0.5)] flex items-center gap-2 overflow-hidden">
                     
                     {/* "Lights" Effect (Dotted Border with Animation) */}
                     <div className="absolute inset-[2px] rounded-full border-[3px] border-dotted border-[#fde047] opacity-90 animate-[spin_60s_linear_infinite]"></div>
                     
                     {/* Text Content */}
                     <span className="font-black text-xl md:text-2xl tracking-tighter italic relative z-10 flex items-baseline gap-2 drop-shadow-xl whitespace-nowrap">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fbbf24] to-[#f59e0b] drop-shadow-[0_2px_0px_rgba(0,0,0,0.5)]">BLACK</span>
                        <span className="text-white drop-shadow-[0_2px_0px_rgba(0,0,0,0.8)]">FRIDAY SALE</span>
                     </span>
                 </div>
             </div>

             {/* Sparkle Right */}
             <div className="text-yellow-200 animate-pulse hidden sm:block">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-[0_0_10px_rgba(253,224,71,0.8)]">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
             </div>
        </div>

        {/* Right: Discount Text */}
        <div className="flex items-center pr-2 md:pr-4 shrink-0">
            <div className="relative">
                <span className="absolute inset-0 text-black translate-y-[2px] translate-x-[2px] blur-[1px] select-none text-2xl md:text-3xl font-black italic tracking-tighter transform -rotate-2">SAVE 25%</span>
                <span className="relative text-2xl md:text-3xl font-black text-white italic tracking-tighter drop-shadow-lg transform -rotate-2 block">
                    SAVE 25%
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};