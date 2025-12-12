import React from 'react';
import { Check } from 'lucide-react';

interface PricingProps {
  onPlanSelect?: (plan: { title: string, price: string }) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onPlanSelect }) => {
  const starterFeatures = [
    "Generate simple website code",
    "Compare 2 AI models & Live preview",
    "20 daily messages",
    "Save up to 3 projects",
    "Export projects as ZIP",
    "10 beginner templates",
    "Code explanations & bug fixes",
    "Community access"
  ];

  const professionalFeatures = [
    "Everything in Starter",
    "Compare 4+ AI models",
    "Advanced live preview (mobile/tablet modes)",
    "Unlimited messages",
    "Save unlimited projects",
    "Free custom domain (1 year)",
    "50+ templates",
    "Smart AI Debugger",
    "AI design suggestions",
    "Priority chat support"
  ];

  const advancedFeatures = [
    "Everything in Professional",
    "Compare all AI models",
    "Full AI website builder (one-click full site generation)",
    "Real-time collaborative coding",
    "API access",
    "Deploy websites instantly",
    "1 hosting and domain (connect your own)",
    "Advanced SEO + performance optimization",
    "Team features (shared projects)",
    "24/7 premium support"
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-[#030305] relative overflow-hidden font-sans">
      <style>{`
        @keyframes slide-up {
            0%, 30% { transform: translateY(0); }
            45%, 75% { transform: translateY(-1.2em); }
            90%, 100% { transform: translateY(-2.4em); }
        }
        .animate-word-cycle {
            animation: slide-up 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight flex flex-col md:block items-center justify-center gap-2">
            <span>The world’s best AI coding power combined in one</span>{' '}
            {/* UPDATED: Changed text color to text-white for maximum visibility */}
            <span className="inline-block h-[1.2em] overflow-hidden align-bottom text-white relative top-[0.15em] md:top-[0.2em] font-bold">
                <div className="flex flex-col animate-word-cycle text-left leading-[1.2]">
                    <span>plan.</span>
                    <span>chat.</span>
                    <span>plan.</span>
                </div>
            </span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Our deal is simple: clear, transparent pricing for the tools you need to build. 
            Our success is tied to yours, and as a little extra, the first month is on us.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
           
           {/* === 1. STARTER CARD === */}
           <div className="group relative p-8 rounded-2xl bg-[#060609] border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col h-full min-h-[500px]">
              
              <div className="mb-8">
                <h3 className="text-2xl font-medium text-white mb-2">Starter</h3>
                <p className="text-zinc-400 text-sm">Perfect for hobbyists & learning</p>
              </div>

              <div className="h-px w-full bg-white/5 mb-8"></div>

              <div className="space-y-5 flex-1 mb-8">
                {starterFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                     <Check size={16} className="text-white shrink-0 mt-0.5" strokeWidth={3} />
                     <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onPlanSelect?.({ title: "Starter", price: "Free" })}
                className="w-full py-3 rounded-lg border border-white/10 bg-transparent text-white text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Get Started
              </button>
           </div>

           {/* === 2. PROFESSIONAL CARD (Center) === */}
           <div className="relative p-8 rounded-2xl bg-[#060609] border border-white/10 transition-all duration-300 flex flex-col h-full min-h-[540px] overflow-hidden -mt-4 md:-mt-0">
              
              {/* Cosmic/Galaxy Header Background */}
              <div className="absolute top-0 left-0 right-0 h-[180px] bg-gradient-to-b from-[#2e1065] via-[#1e1b4b] to-[#060609] opacity-80 z-0"></div>
              
              {/* Stars Effect */}
              <div className="absolute top-0 left-0 right-0 h-[180px] z-0 opacity-70">
                 {/* CSS generated stars/sparkles */}
                 <div className="absolute top-4 left-1/4 text-white text-[8px]">✦</div>
                 <div className="absolute top-12 right-1/4 text-purple-200 text-[10px]">✦</div>
                 <div className="absolute top-8 right-8 text-blue-200 text-[6px]">✦</div>
                 <div className="absolute top-16 left-8 text-white text-[6px]">✦</div>
                 <div className="absolute top-6 left-1/2 text-white text-[12px] animate-pulse">✦</div>
                 <div className="absolute top-24 right-12 text-white text-[4px]">✦</div>
                 <div className="absolute top-10 right-1/2 text-white text-[5px]">✦</div>
              </div>

              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-medium text-white mb-2">Professional</h3>
                <p className="text-zinc-200 text-sm">For serious builders & creators</p>
              </div>

              <div className="relative z-10 h-px w-full bg-white/10 mb-8"></div>

              <div className="relative z-10 space-y-5 flex-1 mb-8">
                {professionalFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-zinc-200">
                     <Check size={16} className="text-white shrink-0 mt-0.5" strokeWidth={3} />
                     <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="relative z-10">
                  <button 
                    onClick={() => onPlanSelect?.({ title: "Professional", price: "$29/mo" })}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#1e1b4b] to-[#312e81] border border-indigo-500/30 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(49,46,129,0.4)]"
                  >
                    Get Pro Access
                  </button>
              </div>
           </div>

           {/* === 3. ADVANCED CARD (Formerly Enterprise) === */}
           <div className="group relative p-8 rounded-2xl bg-[#060609] border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col h-full min-h-[500px]">
              
              <div className="mb-8">
                <h3 className="text-2xl font-medium text-white mb-2">Advanced</h3>
                <p className="text-zinc-400 text-sm">Scalable solutions for teams</p>
              </div>

              <div className="h-px w-full bg-white/5 mb-8"></div>

              <div className="space-y-5 flex-1 mb-8">
                {advancedFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                     <Check size={16} className="text-white shrink-0 mt-0.5" strokeWidth={3} />
                     <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onPlanSelect?.({ title: "Advanced", price: "Custom Quote" })}
                className="w-full py-3 rounded-lg border border-white/10 bg-transparent text-white text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Contact Sales
              </button>
           </div>

        </div>
      </div>
    </section>
  );
};