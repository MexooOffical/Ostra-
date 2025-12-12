import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Zap, Brain, Globe, Layers, Atom, Bot, Aperture } from 'lucide-react';

const models = [
  {
    id: 'geminate',
    name: 'Geminate',
    badge: 'Creative Engine',
    description: 'Specialized for creative writing, storytelling, and world-building.',
    icon: Layers,
    color: 'text-indigo-400',
    borderColor: 'border-indigo-500',
    shadowColor: 'shadow-indigo-500/50',
    bgTint: 'bg-indigo-500/10'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini 2.5 Pro',
    badge: 'Long Context Master',
    description: 'Process massive documents, codebases, and video analysis with 2M+ context window.',
    icon: Sparkles,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500',
    shadowColor: 'shadow-cyan-500/50',
    bgTint: 'bg-cyan-500/10'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT 5',
    badge: 'All Rounder Explainer',
    description: 'Great for questions, brainstorming, and clear step-by-step explanations.',
    icon: Bot,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500',
    shadowColor: 'shadow-emerald-500/50',
    bgTint: 'bg-emerald-500/10'
  },
  {
    id: 'gemini-3',
    name: 'Gemini 3',
    badge: 'Reasoning Expert',
    description: 'Next-gen reasoning capabilities for complex problem solving and math.',
    icon: Atom,
    color: 'text-cyan-300',
    borderColor: 'border-cyan-400',
    shadowColor: 'shadow-cyan-400/50',
    bgTint: 'bg-cyan-400/10'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    badge: 'Research Assistant',
    description: 'Real-time web search integration for up-to-date factual information.',
    icon: Globe,
    color: 'text-teal-400',
    borderColor: 'border-teal-500',
    shadowColor: 'shadow-teal-500/50',
    bgTint: 'bg-teal-500/10'
  },
  {
    id: 'claude',
    name: 'Claude Sonnet 4',
    badge: 'Co-Writing Master',
    description: 'Refines polished emails, essays, and scripts while keeping your style.',
    icon: Aperture, // Resembles the star/lens
    color: 'text-orange-400',
    borderColor: 'border-orange-500',
    shadowColor: 'shadow-orange-500/50',
    bgTint: 'bg-orange-500/10'
  },
  {
    id: 'gemini-flash',
    name: 'Gemini Flash',
    badge: 'Speed Demon',
    description: 'Ultra-fast responses for real-time applications and quick queries.',
    icon: Zap,
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500',
    shadowColor: 'shadow-yellow-500/50',
    bgTint: 'bg-yellow-500/10'
  }
];

export const ModelSelector: React.FC = () => {
  // Default to the center item (Gemini 3 / Atom) initially
  const [activeId, setActiveId] = useState<string>('gemini-3');

  const scrollToCard = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(`model-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="w-full bg-black py-20 px-4 md:px-6 relative overflow-hidden font-sans">
      
      {/* Background Atmosphere */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16 tracking-tight leading-tight">
          Pick the best characteristics <br/> of each AI model
        </h2>

        {/* --- 1. Icons Carousel --- */}
        <div className="relative h-32 flex items-center justify-center mb-12">
            
            {/* The Glowing Center Aura (behind the active icon) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/40 to-emerald-500/40 blur-xl animate-pulse"></div>
            
            <div className="flex items-center gap-2 md:gap-4 relative z-10">
               {models.map((model) => {
                 const isActive = activeId === model.id;
                 return (
                   <button
                     key={model.id}
                     onClick={() => scrollToCard(model.id)}
                     className={`
                        relative group rounded-full flex items-center justify-center transition-all duration-500 ease-out
                        ${isActive 
                            ? 'w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-cyan-400 to-emerald-400 scale-110 shadow-[0_0_50px_rgba(6,182,212,0.6)] z-20' 
                            : 'w-10 h-10 md:w-12 md:h-12 bg-zinc-900/80 border border-white/10 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 opacity-60 hover:opacity-100 z-10'
                        }
                     `}
                   >
                     {/* Inner Circle for Active State to create the ring effect */}
                     {isActive && (
                        <div className="absolute inset-[3px] rounded-full bg-black flex items-center justify-center">
                            <model.icon size={40} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                        </div>
                     )}

                     {!isActive && (
                        <model.icon size={20} />
                     )}
                   </button>
                 );
               })}
            </div>
        </div>

        {/* --- 2. Cards List --- */}
        <div className="space-y-4">
           {models.map((model) => {
             const isActive = activeId === model.id;
             return (
               <div 
                 id={`model-card-${model.id}`}
                 key={model.id}
                 onClick={() => setActiveId(model.id)}
                 className={`
                    group relative rounded-3xl p-6 cursor-pointer transition-all duration-300 border
                    ${isActive 
                        ? `bg-zinc-900/80 ${model.borderColor} border-opacity-50 ring-1 ring-${model.borderColor}/30` 
                        : 'bg-zinc-950 border-white/10 hover:border-zinc-700'
                    }
                 `}
               >
                  {/* Subtle Glow Background for Active Card */}
                  {isActive && (
                      <div className={`absolute inset-0 rounded-3xl ${model.bgTint} opacity-20 pointer-events-none`}></div>
                  )}

                  <div className="flex items-start gap-5 relative z-10">
                      
                      {/* Logo Container */}
                      <div className={`
                         w-12 h-12 rounded-full flex items-center justify-center shrink-0 border
                         ${isActive 
                            ? `bg-black border-${model.color.split('-')[1]}-500/50 ${model.color}` 
                            : 'bg-zinc-900 border-white/10 text-zinc-500'
                         }
                      `}>
                          <model.icon size={24} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                              <h3 className="text-lg font-bold text-white tracking-wide">
                                  {model.name}
                              </h3>
                              <span className={`
                                  inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border w-fit
                                  ${isActive 
                                    ? `bg-white/10 text-zinc-200 border-white/10` 
                                    : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                                  }
                              `}>
                                  {model.badge}
                              </span>
                          </div>
                          
                          <p className={`text-sm leading-relaxed transition-colors ${isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>
                              {model.description}
                          </p>
                      </div>

                  </div>
               </div>
             );
           })}
        </div>

      </div>
    </section>
  );
};