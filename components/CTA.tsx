import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  onStart?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onStart }) => {
  return (
    <section className="relative w-full py-40 px-6 overflow-hidden bg-[#020302] flex flex-col items-center justify-center border-t border-white/[0.02]">
      
      {/* --- Background Elements (Matching the Green Horizon Image) --- */}
      
      {/* 1. The Giant Horizon Arc (The Planet Edge Effect) - ENHANCED GLOW */}
      {/* Increased shadow opacity, spread, and border brightness for maximum "planet edge" effect */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[220vw] h-[220vw] md:w-[150vw] md:h-[150vw] rounded-[100%] border-t-[2px] border-emerald-400/60 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.3)_0%,transparent_50%)] shadow-[0_-20px_180px_rgba(16,185,129,0.5)] pointer-events-none z-0"></div>

      {/* 2. Secondary Inner Glow Ring (Atmosphere Layer) */}
      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[180vw] h-[180vw] md:w-[130vw] md:h-[130vw] rounded-[100%] border-t-[1px] border-emerald-200/20 opacity-50 pointer-events-none z-0"></div>

      {/* 3. Deep Space Stars */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-[40%] right-[20%] w-1 h-1 bg-emerald-200 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-[30%] left-[15%] w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
          <div className="absolute top-[10%] right-[30%] w-0.5 h-0.5 bg-emerald-100 rounded-full opacity-30"></div>
      </div>

      {/* 4. Bottom Green/Teal Atmosphere (Aurora Effect) */}
      <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-gradient-to-t from-emerald-950/90 via-emerald-900/30 to-transparent blur-[120px] rounded-full pointer-events-none z-0 opacity-70"></div>
      
      {/* 5. Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none"></div>

      {/* --- Content --- */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mt-8">
        
        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.15] drop-shadow-2xl">
          Ready to experience smarter & <br className="hidden md:block"/>
          more accurate AI answers?
        </h2>
        
        {/* Subheadline */}
        <p className="text-zinc-400 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed antialiased">
          Gain an edge with our exclusive Promptbook, designed to provide you with tailored insights and guidance across every industry and subject.
        </p>

        {/* Custom Gradient Button (Matching Image) */}
        <button 
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-transparent transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden mb-12"
        >
            {/* Button Background: Dark Teal/Green Gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#205E63] to-[#0A2F25] opacity-90 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Inner Top Highlight (Glass effect) */}
            <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/10 to-transparent rounded-t-full opacity-40"></div>

            {/* Button Border/Glow */}
            <div className="absolute inset-0 rounded-full border border-[#34d399]/30 shadow-[0_0_20px_rgba(52,211,153,0.15)] group-hover:shadow-[0_0_35px_rgba(52,211,153,0.3)] transition-shadow duration-300"></div>

            {/* Shine Sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"></div>

            {/* Text & Icon */}
            <span className="relative z-20 text-white font-bold text-[16px] tracking-wide drop-shadow-md">
                Get Started Now
            </span>
            <ArrowRight className="relative z-20 w-5 h-5 text-white stroke-[3px] group-hover:translate-x-1 transition-transform duration-300" />
        </button>

      </div>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
      `}</style>
    </section>
  );
};
