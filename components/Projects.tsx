import React, { useEffect, useState } from 'react';
import { Plus, Folder, Loader2, Clock, MoreVertical } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ProjectsProps {
  onAuthRequest?: () => void;
}

interface Project {
  id: string;
  project_name: string; // Changed from 'name' to match new schema
  first_name?: string;
  last_name?: string;
  description?: string;
  created_at: string;
  status?: string;
}

export const Projects: React.FC<ProjectsProps> = ({ onAuthRequest }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userEmail = localStorage.getItem('ostra_user_email');

  useEffect(() => {
    if (userEmail) {
      fetchProjects();
    } else {
      setIsLoading(false);
    }
  }, [userEmail]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('email', userEmail) // Changed to match schema 'email'
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else if (data) {
        setProjects(data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="w-full bg-[#0a0a0c] min-h-[45vh] rounded-t-[2.5rem] mt-16 px-6 md:px-12 py-10 relative z-20 border-t border-white/5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-zinc-100 pl-1 tracking-tight">My Projects</h2>
            {isLoading && <Loader2 size={16} className="animate-spin text-zinc-500" />}
        </div>
        
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

          {/* Fetched Projects */}
          {!isLoading && projects.map((project) => (
             <div key={project.id} className="group relative h-[220px] rounded-2xl border border-zinc-800/60 bg-[#121214] hover:bg-[#18181b] hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer">
                {/* Top: Status/Image Placeholder */}
                <div className="flex-1 bg-zinc-900/50 relative overflow-hidden p-4">
                    <div className="absolute top-3 left-3">
                         <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/5 flex items-center justify-center">
                             <Folder size={14} className="text-zinc-400" />
                         </div>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-1 hover:bg-zinc-700 rounded">
                             <MoreVertical size={16} className="text-zinc-400" />
                         </button>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-cyan-900/20 text-cyan-400 border border-cyan-500/10 text-[10px] uppercase font-bold tracking-wider">
                            {project.status || 'Active'}
                        </span>
                    </div>
                </div>

                {/* Bottom: Info */}
                <div className="p-4 border-t border-white/5">
                    <h3 className="text-zinc-200 font-medium text-sm mb-1 truncate">{project.project_name}</h3>
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                         <p className="truncate max-w-[60%] opacity-80">{project.description || 'No description'}</p>
                         <div className="flex items-center gap-1">
                            <Clock size={10} />
                            <span>{formatDate(project.created_at)}</span>
                         </div>
                    </div>
                </div>
             </div>
          ))}

          {!isLoading && projects.length === 0 && userEmail && (
              <div className="hidden md:flex h-[220px] items-center justify-center text-zinc-600 text-sm border border-dashed border-zinc-800 rounded-2xl">
                  No projects found.
              </div>
          )}

        </div>
      </div>
    </section>
  );
};