import React from 'react';
import { FileText, MessageSquare, Receipt, StickyNote } from 'lucide-react';

interface StarterChipProps {
  icon: React.ReactElement;
  label: string;
}

const StarterChip: React.FC<StarterChipProps> = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-[#18181b] hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-full text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-all">
    {React.cloneElement(icon, { size: 14, className: "opacity-70" } as any)}
    <span>{label}</span>
  </button>
);

export const QuickStarter: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
      <StarterChip icon={<Receipt />} label="Bill splitter" />
      <StarterChip icon={<MessageSquare />} label="Social media feed" />
      <StarterChip icon={<FileText />} label="VitePress docs" />
      <StarterChip icon={<StickyNote />} label="Note taking app" />
    </div>
  );
};