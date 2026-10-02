import React from 'react';
import { InputArea } from './InputArea';
import { QuickStarter } from './QuickStarter';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartBuilder: (prompt: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBuilder }) => {
  return (
    <section id="models" className="relative z-10 w-full overflow-hidden bg-white px-4 pb-14 pt-24 text-zinc-950 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 animate-fade-in-up [animation-delay:0.1s] [animation-fill-mode:backwards]">
            <Sparkles size={14} />
            Your AI website studio
          </div>

          <h1 className="mb-4 text-4xl font-semibold leading-[1.08] text-zinc-950 sm:text-5xl md:text-6xl animate-fade-in-up [animation-delay:0.15s] [animation-fill-mode:backwards]">
            Build your next website.
            <br className="hidden sm:block" />
            <span className="text-emerald-700">One prompt.</span>
          </h1>

          <p className="mx-auto mb-7 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg animate-fade-in-up [animation-delay:0.2s] [animation-fill-mode:backwards]">
            Describe what you have in mind. Ostra turns your idea into a polished website you can preview, refine, and export.
          </p>

          <div className="animate-fade-in-up [animation-delay:0.25s] [animation-fill-mode:backwards]">
            <InputArea onSubmit={onStartBuilder} />
            <QuickStarter onSelect={onStartBuilder} />
          </div>
        </div>

        <div className="mt-10 rounded-[28px] bg-[#a9e5d2] p-2.5 sm:mt-12 sm:rounded-[32px] sm:p-4 animate-fade-in-up [animation-delay:0.3s] [animation-fill-mode:backwards]">
          <div className="grid overflow-hidden rounded-[21px] bg-white md:min-h-[330px] md:grid-cols-[0.8fr_1.2fr] md:rounded-[24px]">
            <div className="flex flex-col items-start justify-center px-6 py-8 sm:px-10 sm:py-10">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                <Sparkles size={14} />
                From idea to launch
              </span>
              <h2 className="max-w-md text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">
                A better way to build with AI.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500 sm:text-base">
                Start with a simple description, then shape your site with a live preview and natural-language edits.
              </p>
              <button
                onClick={() => onStartBuilder('Create a clean, modern AI research website with a clear workflow and an editorial layout.')}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
              >
                Start building
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="relative min-h-[240px] overflow-hidden bg-zinc-100 md:min-h-[330px]">
              <img
                src="https://aifiesta.ai/static/images/optimized/deep-research-steps.webp"
                alt="AI research workflow shown in a product interface"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </section>
  );
};