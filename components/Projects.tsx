import React from 'react';
import { Plus } from 'lucide-react';

interface ProjectsProps {
  onAuthRequest?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onAuthRequest }) => {
  return (
    <section className="w-full bg-[#0a0a0c] min-h-[45vh] rounded-t-[2.5rem] mt-16 px-6 md:px-12 py-10 relative z-20 border-t border-white/5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-xl font-semibold text-zinc-100 mb-6 pl-1 tracking-tight">My Projects</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Create Project Card */}
          <button 
            onClick={onAuthRequest}
            className="group flex flex-col items-center justify-center h-[220px] rounded-2xl border border-zinc-800/60 bg-[#121214] hover:bg-[#18181b] hover:border-zinc-700 transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            {/* Subtle inner gradient hint on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors relative z-10">
              <div className="p-2 rounded-full bg-zinc-800/50 group-hover:bg-zinc-700 transition-colors shadow-inner">
                <Plus size={20} />
              </div>
              <span className="font-medium text-sm">Create Project</span>
            </div>
          </button>

          {/* Placeholder for project structure - to keep layout robust */}
        </div>
      </div>
    </section>
  );
};