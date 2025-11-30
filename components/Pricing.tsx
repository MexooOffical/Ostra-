import React from 'react';
import { Check, Sparkles, Zap, Shield } from 'lucide-react';

// Custom Animated Logo Component for the Pricing Card
const OstraLogo = ({ size = 24 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    {/* Outer Glow */}
    <div className="absolute inset-[-6px] bg-cyan-500/30 blur-md rounded-full"></div>
    
    {/* Spinning Gradient Ring */}
    <div className="absolute inset-[-2px] bg-[conic-gradient(from_0deg,transparent_0deg,#22d3ee_120deg,#3b82f6_180deg,transparent_360deg)] animate-[spin_3s_linear_infinite] rounded-full opacity-100"></div>
    
    {/* Inner Mask (Black Background) */}
    <div className="absolute inset-[1.5px] bg-[#000] rounded-full z-10 flex items-center justify-center border border-white/5">
        {/* Diamond Core */}
        <div className="w-[40%] h-[40%] bg-gradient-to-br from-cyan-400 to-blue-600 rounded-[1px] transform rotate-45 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse"></div>
    </div>
  </div>
);

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  isPopular = false,
  icon: Icon,
  delay
}: { 
  title: string; 
  price: string; 
  description: string; 
  features: string[]; 
  isPopular?: boolean;
  icon: React.ElementType;
  delay: string;
}) => (
  <div 
    className={`relative flex flex-col p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 group animate-fade-in-up hover:-translate-y-2 ${
      isPopular 
        ? 'bg-[#000000]/40 border-cyan-500/30 shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)] z-10' 
        : 'bg-[#000000]/20 border-white/5 hover:border-white/20 hover:bg-[#000000]/40 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]'
    }`}
    style={{ 
      animationDelay: delay,
      animationFillMode: 'both'
    }}
  >
    {/* Floating Animation for Popular Card */}
    {isPopular && (
      <div className="absolute inset-0 rounded-3xl animate-float pointer-events-none border border-cyan-500/20"></div>
    )}

    {/* Selection Badge */}
    {isPopular && (
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-[length:200%_auto] animate-shimmer-bg rounded-full text-[11px] font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] tracking-widest uppercase z-20 border border-cyan-400/30">
        Most Popular
      </div>
    )}

    {/* Internal Gloss/Reflection Gradient */}
    <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${
        isPopular 
        ? 'bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent' 
        : 'bg-gradient-to-b from-white/10 via-transparent to-transparent'
    }`}></div>

    {/* Header Section */}
    <div className="flex items-center gap-4 mb-6 relative z-10">
      <div className={`p-3 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-lg ${
        isPopular 
          ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/40 shadow-cyan-500/20' 
          : 'bg-zinc-900/50 text-zinc-400 group-hover:text-zinc-200 group-hover:bg-zinc-800/80 ring-1 ring-white/5'
      }`}>
        <Icon size={24} className={isPopular ? "" : ""} />
      </div>
      <h3 className={`text-xl font-bold tracking-tight ${isPopular ? 'text-white' : 'text-zinc-200 group-hover:text-white'}`}>
        {title}
      </h3>
    </div>

    {/* Price Section */}
    <div className="mb-6 relative z-10">
      <div className="flex items-baseline gap-1.5">
        <span className={`text-5xl font-extrabold tracking-tight ${
            isPopular 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-zinc-400' 
            : 'text-white'
        }`}>
            {price}
        </span>
        {price !== 'Free' && <span className="text-zinc-500 font-medium">/mo</span>}
      </div>
      <p className="text-sm text-zinc-400 mt-4 leading-relaxed font-light border-b border-white/5 pb-6">
        {description}
      </p>
    </div>

    {/* Features List */}
    <div className="space-y-4 flex-1 relative z-10 mb-8">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-start gap-3 group/feature">
          <div className={`mt-0.5 flex-shrink-0 transition-colors duration-300 ${
            isPopular 
                ? 'text-cyan-400 group-hover/feature:text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' 
                : 'text-zinc-600 group-hover/feature:text-zinc-400'
            }`}>
             <Check size={16} strokeWidth={2.5} />
          </div>
          <span className="text-[14px] text-zinc-400 group-hover/feature:text-zinc-300 transition-colors">
            {feature}
          </span>
        </div>
      ))}
    </div>

    {/* Action Button */}
    <button className={`w-full py-4 px-4 rounded-xl text-sm font-bold transition-all duration-500 relative overflow-hidden group/btn z-10 ${
      isPopular 
        ? 'bg-gradient-to-r from-cyan-500 via-[#000000] to-blue-600 bg-[length:200%_auto] animate-gradient-x text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] border border-cyan-500/30' 
        : 'bg-gradient-to-r from-[#18181b] to-[#000000] text-zinc-400 border border-white/5 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]'
    }`}>
      {/* Button Shine Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out ${isPopular ? 'opacity-100' : 'opacity-50'}`}></div>
      
      {/* Background Hover Gradient for non-popular */}
      {!isPopular && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
      )}

      <span className="relative z-10">Get Started</span>
    </button>
  </div>
);

export const Pricing = () => {
  return (
    <section id="pricing" className="relative w-full py-32 px-6 overflow-hidden bg-[#020202]">
      
      {/* CSS Animations & Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer-bg {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes shimmer-text {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin-reverse-slower {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes blackhole-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.02); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer-bg { animation: shimmer-bg 3s linear infinite; }
        .animate-shimmer-text { animation: shimmer-text 4s linear infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .animate-gradient-x { animation: gradient-x 3s linear infinite; }
      `}</style>

      {/* --- BLACK HOLE BACKGROUND --- */}
      <div className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none overflow-hidden">
          
          {/* Deep Space Void (Darkening Vignette) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_70%)] z-20"></div>

          {/* Starfield */}
          <div className="absolute inset-0 z-0">
             {/* Random Stars */}
             <div className="absolute top-[15%] left-[15%] w-[2px] h-[2px] bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite]"></div>
             <div className="absolute top-[25%] left-[85%] w-[3px] h-[3px] bg-blue-200 rounded-full animate-[twinkle_5s_ease-in-out_infinite]"></div>
             <div className="absolute top-[65%] left-[5%] w-[2px] h-[2px] bg-white rounded-full animate-[twinkle_4s_ease-in-out_infinite]"></div>
             <div className="absolute top-[80%] left-[80%] w-[1px] h-[1px] bg-white rounded-full animate-[twinkle_2s_ease-in-out_infinite]"></div>
             
             {/* Dust/Nebula behind blackhole */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-indigo-900/10 blur-[100px] rounded-full mix-blend-screen"></div>
          </div>

          {/* BLACK HOLE COMPONENTS */}
          <div className="absolute top-1/2 left-1/2 z-10 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 opacity-80 md:opacity-100">
             
             {/* 1. Large Accretion Disk (Outer Swirl) */}
             <div className="absolute top-1/2 left-1/2 w-[140%] h-[140%] bg-[conic-gradient(from_0deg,transparent_0%,#4f46e5_20%,#06b6d4_40%,transparent_60%)] rounded-full blur-[80px] animate-[spin-slow_25s_linear_infinite] opacity-40 mix-blend-screen"></div>

             {/* 2. Inner Accretion Disk (Brighter, Tighter Swirl) */}
             <div className="absolute top-1/2 left-1/2 w-[100%] h-[30%] bg-[conic-gradient(from_0deg,transparent_0%,#0891b2_40%,#3b82f6_60%,transparent_100%)] rounded-[100%] blur-[40px] animate-[spin-slow_15s_linear_infinite] mix-blend-add"></div>
             
             {/* 3. Reverse Swirl (Turbulence) */}
             <div className="absolute top-1/2 left-1/2 w-[90%] h-[25%] bg-[conic-gradient(from_180deg,transparent_0%,#8b5cf6_30%,#ec4899_50%,transparent_80%)] rounded-[100%] blur-[50px] animate-[spin-reverse-slower_20s_linear_infinite] mix-blend-screen opacity-60"></div>

             {/* 4. Event Horizon (The Void) */}
             <div className="absolute top-1/2 left-1/2 w-[220px] h-[220px] bg-black rounded-full shadow-[0_0_60px_rgba(0,0,0,1)] animate-[blackhole-pulse_8s_ease-in-out_infinite] z-30 flex items-center justify-center">
                 {/* Photon Ring (Glowing Edge) */}
                 <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 blur-[2px] opacity-90"></div>
                 {/* Inner Dark Core to cover the blur spill */}
                 <div className="absolute inset-[1px] bg-black rounded-full"></div>
             </div>

             {/* 5. Relativistic Jet (Subtle vertical glow) */}
             <div className="absolute top-1/2 left-1/2 w-[4px] h-[1000px] bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
          </div>
      </div>

      <div className="relative z-30 max-w-7xl mx-auto">
        <div className="text-center mb-24 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight max-w-4xl mx-auto leading-[1.1] drop-shadow-2xl">
            Experience <span className="relative inline-block">
                {/* Glow behind the text */}
                <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-blue-500/50 opacity-50 blur-xl animate-pulse"></span>
                {/* Foreground animated gradient text */}
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-purple-400 animate-shimmer-text bg-[length:200%_auto] drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                    Most Powerful AI Models
                </span>
            </span><br/> for <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">Half the Price</span>
          </h2>
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Unlock the next generation of creative tools. Choose the engine that powers your imagination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center perspective-[2000px]">
          <PricingCard 
            title="Ostra V1" 
            price="Free" 
            description="Initiate your journey into AI-assisted creation."
            delay="0.1s"
            icon={Sparkles}
            features={[
              "5 Neural Sparks / Day",
              "Standard Gemini Flash Core",
              "Clean HTML/CSS Synthesis",
              "Public Nexus Access",
              "1 Active Construct"
            ]} 
          />
          <PricingCard 
            title="Ostra V2" 
            price="₹99" 
            description="Empower your workflow with advanced neural architecture."
            isPopular={true}
            delay="0.3s"
            icon={OstraLogo}
            features={[
              "Unlimited Creation Flux",
              "Gemini 3.0 Pro Intelligence",
              "Cognitive Reasoning (32k)",
              "Hyper-Threaded Processing",
              "Visual-to-Code Transmutation",
              "15 Active Constructs"
            ]} 
          />
          <PricingCard 
            title="TheOstra" 
            price="₹999" 
            description="Absolute control for reality-bending scale."
            delay="0.5s"
            icon={Shield}
            features={[
              "Omnipotent System Access",
              "Collective Hive Workspace",
              "Custom Neural Interfacing",
              "Dedicated Architect Support",
              "Limitless Reality Building",
              "Quantum-Grade Encryption"
            ]} 
          />
        </div>
      </div>
    </section>
  );
};