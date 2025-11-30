import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Globe, ArrowUp, Figma, Sparkles } from 'lucide-react';

interface InputAreaProps {
  onSubmit?: (prompt: string) => void;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSubmit }) => {
  const [value, setValue] = useState("A markdown-based note taking app with folders, tags, search and syntax highlighting.");
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log("File selected:", e.target.files[0].name);
    }
  };

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
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-950/40 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </div>
          <span className="text-xs font-medium text-cyan-200 tracking-wide">Ostra is listening...</span>
        </div>
      </div>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Main Container */}
      <div className={`relative flex flex-col w-full bg-[#18181b] rounded-[1.25rem] border shadow-2xl overflow-hidden transition-all duration-500 ${isTyping ? 'border-cyan-500/30 shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)]' : 'border-zinc-800/80'}`}>
        
        {/* Text Area */}
        <textarea
          className="w-full h-[120px] p-5 bg-transparent text-[16px] md:text-[17px] text-zinc-100 placeholder-zinc-500 resize-none focus:outline-none font-light leading-relaxed scrollbar-hide"
          placeholder="Describe your app..."
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
        <div className="flex items-center justify-between px-3 pb-3 mt-2">
          
          {/* Left Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handleAttachClick}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors group/btn"
            >
              <Paperclip size={15} className="text-zinc-500 group-hover/btn:text-zinc-300 transition-colors" />
              <span>Attach</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors group/btn">
              <Figma size={15} className="text-zinc-500 group-hover/btn:text-zinc-300 transition-colors" />
              <span>Import Figma</span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors group/btn">
              <Globe size={15} className="text-zinc-500 group-hover/btn:text-zinc-300 transition-colors" />
              <span>Public</span>
            </button>
            <button 
              onClick={handleSubmit}
              className="flex items-center justify-center w-8 h-8 bg-white rounded-full hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5 cursor-pointer"
            >
              <ArrowUp size={18} className="text-black stroke-[3px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};