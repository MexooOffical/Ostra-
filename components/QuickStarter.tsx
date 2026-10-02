import React from 'react';
import { FileText, MessageSquare, Receipt, StickyNote } from 'lucide-react';

interface StarterChipProps {
  icon: React.ReactElement;
  label: string;
  onClick: () => void;
}

const StarterChip: React.FC<StarterChipProps> = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-600 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800">
    {React.cloneElement(icon, { size: 14, className: "text-emerald-700" } as any)}
    <span>{label}</span>
  </button>
);

interface QuickStarterProps {
  onSelect: (prompt: string) => void;
}

export const QuickStarter: React.FC<QuickStarterProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
      <StarterChip icon={<Receipt />} label="Portfolio" onClick={() => onSelect('Create a modern portfolio website for a freelance designer.')} />
      <StarterChip icon={<MessageSquare />} label="Online store" onClick={() => onSelect('Create a stylish online store for a small independent brand.')} />
      <StarterChip icon={<FileText />} label="Agency landing page" onClick={() => onSelect('Create a polished landing page for a creative digital agency.')} />
      <StarterChip icon={<StickyNote />} label="SaaS dashboard" onClick={() => onSelect('Create a clean SaaS dashboard with navigation, metrics, and a recent activity list.')} />
    </div>
  );
};