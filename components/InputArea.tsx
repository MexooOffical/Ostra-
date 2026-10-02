import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface InputAreaProps {
  onSubmit?: (prompt: string) => void;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setIsTyping(true);
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set timeout to stop animation after user stops typing
    typingTimeoutRef.current = window.setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = () => {
    if (value.trim() && onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <div className="w-full max-w-[760px] mx-auto relative group z-30">
      
      {/* Astra Presence / Typing Indicator */}
      {/* Animated pill that slides down when typing */}
      <div className={`absolute -top-14 left-0 right-0 flex justify-center transition-all duration-700 ease-out pointer-events-none ${isTyping ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-2.5 rounded-full border border-emerald-200 bg-white px-4 py-2 shadow-sm">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </div>
          <span className="text-xs font-medium tracking-wide text-emerald-700">Ostra is listening...</span>
        </div>
      </div>

      {/* Main Container */}
      <div className={`relative flex w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_8px_28px_rgba(24,24,27,0.08)] transition-all duration-300 ${isTyping ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-zinc-200'}`}>
        
        {/* Text Area */}
        <textarea
          className="h-[112px] w-full resize-none bg-transparent p-5 text-base leading-relaxed text-zinc-900 placeholder-zinc-400 focus:outline-none scrollbar-hide sm:text-[17px]"
          placeholder="Describe the website you want to build..."
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          spellCheck={false}
        />

        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between px-3 pb-3">
          <span className="pl-2 text-xs text-zinc-400">Press Enter to build</span>
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            aria-label="Build website from prompt"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            <ArrowUp size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};