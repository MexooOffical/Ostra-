import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Search, Star, MessageSquare, Menu, User, 
  Settings, HelpCircle, Paperclip, ArrowUp, ChevronDown, 
  X, Layout, Clock, MoreHorizontal, Send, ArrowRight, Save, Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BuilderProps {
  initialPrompt: string;
  onBack: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const Builder: React.FC<BuilderProps> = ({ initialPrompt, onBack }) => {
  const [input, setInput] = useState(initialPrompt || '');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Retrieve User from Local Storage
  const storedName = localStorage.getItem('ostra_user_name');
  const storedEmail = localStorage.getItem('ostra_user_email');
  
  // Logic to determine the name to display
  let userName = 'Builder';
  if (storedName) {
      userName = storedName;
  } else if (storedEmail) {
      const emailName = storedEmail.split('@')[0];
      userName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
  }

  // Handle auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (Mock)
    setTimeout(() => {
        const aiMsg: Message = { 
            role: 'assistant', 
            content: "I've received your request. As an AI builder, I would help you construct this website. Since I am in demo mode, I can't generate the full code right now, but I'm ready to assist with your next prompt!" 
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
    }, 1500);
  };

  const handleSaveProject = async () => {
    if (!storedEmail) {
        alert("Please log in to save your project.");
        return;
    }
    if (messages.length === 0) {
        alert("Start a conversation before saving.");
        return;
    }

    setIsSaving(true);
    try {
        // Assume first user message is the title/description
        const firstUserMsg = messages.find(m => m.role === 'user');
        const title = firstUserMsg ? firstUserMsg.content.slice(0, 30) + '...' : 'New Project';
        
        // Split name for schema
        const nameParts = userName.split(' ');
        const firstName = nameParts[0] || 'Unknown';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Retrieve stored password
        const storedPassword = localStorage.getItem('ostra_user_password') || 'demo_pass';

        const { error } = await supabase.from('projects').insert({
            first_name: firstName,
            last_name: lastName,
            email: storedEmail,
            project_name: title,
            password: storedPassword,
            created_at: new Date().toISOString()
        });

        if (error) {
            console.error(error);
            alert("Failed to save project. Please check your connection.");
        } else {
            alert("Project saved successfully to Ostra.ai database!");
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred while saving.");
    } finally {
        setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestionPrompts = [
    'Example: "Summarize this PDF document"',
    'Example: "Help me practice my Spanish vocab"',
    'Example: "Explain how this python game works"'
  ];

  const sidebarRecents = [
    "Explaining Einstein's Theory of Relativity...",
    "Effective Muscle-Building Exercises",
    "Using the Claude API",
    "Anthropic Website Information",
    "Maximizing Artifact Potential",
    "London Travel Guide",
    "Star Trek Original Series Episode Guide",
    "Casablanca Movie Webpage with Ima..."
  ];

  return (
    <div className="flex h-screen w-full bg-[#F2F0E9] text-[#1a1a1a] font-sans overflow-hidden selection:bg-[#d8b4fe] selection:text-[#1a1a1a]">
      
      {/* --- Mobile Sidebar Overlay --- */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- Sidebar --- */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-[280px] bg-[#EBE9E4] flex flex-col h-full border-r border-[#dedbd6] flex-shrink-0 transition-transform duration-300 ease-in-out shadow-xl md:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Top Area */}
        <div className="p-3 space-y-4">
            {/* Ostra Logo Area in Sidebar */}
            <div className="flex items-center justify-between px-2 pt-2 pb-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#444]">
                     <span className="tracking-wide">OSTRA AI</span>
                </div>
                <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="md:hidden p-1 text-zinc-500 hover:text-zinc-800"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Start New Chat Button */}
            <button 
                onClick={() => {
                    setMessages([]);
                    setInput('');
                    setIsSidebarOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 bg-[#dedbd6] hover:bg-[#d4d1cc] rounded-lg transition-colors group cursor-pointer"
            >
                <div className="flex items-center gap-2">
                    <div className="p-1 bg-white rounded-md shadow-sm">
                        <Plus size={14} className="text-[#3e3e3e]" />
                    </div>
                    <span className="text-sm font-medium text-[#3e3e3e]">Start new chat</span>
                </div>
            </button>

            {/* Recents List */}
            <div className="pt-2 flex-1 overflow-hidden flex flex-col">
                <div className="px-3 text-xs font-semibold text-[#8e8e8e] mb-2">Recents</div>
                <div className="flex-1 overflow-y-auto space-y-0.5 scrollbar-thin scrollbar-thumb-[#dcd9d3] scrollbar-track-transparent pr-1">
                    {sidebarRecents.map((chat, i) => (
                        <button key={i} className="w-full text-left px-3 py-1.5 text-[13px] text-[#525252] hover:bg-[#dedbd6] rounded-md truncate transition-colors">
                            {chat}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Bottom User Profile Area */}
        <div className="mt-auto p-3 border-t border-[#dedbd6] space-y-2">
            <button 
                onClick={onBack} 
                className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-[#dedbd6] rounded-lg transition-colors group"
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-7 h-7 rounded-full bg-[#d97757] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {userName.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="flex flex-col items-start min-w-0">
                        <span className="text-sm font-medium text-[#3e3e3e] truncate max-w-full">{userName}</span>
                        <span className="text-[10px] text-[#666]">Free Plan</span>
                    </div>
                </div>
                <ChevronDown size={14} className="text-[#888] shrink-0" />
            </button>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#F2F0E9]">
         
         {/* Mobile Header Toggle & Top Bar */}
         <div className="absolute top-0 left-0 right-0 h-14 z-30 flex items-center justify-between px-4 md:justify-center">
             <div className="md:hidden">
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white/50 backdrop-blur rounded-lg text-[#555] shadow-sm">
                    <Menu size={20} />
                </button>
             </div>
             
             {/* Save Button (Only show if there are messages) */}
             {messages.length > 0 && (
                 <div className="absolute right-4 top-2 md:top-3">
                     <button 
                        onClick={handleSaveProject}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#dedbd6] rounded-lg text-sm text-[#555] hover:bg-gray-50 shadow-sm transition-all"
                     >
                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        <span className="hidden sm:inline">Save Project</span>
                     </button>
                 </div>
             )}
         </div>

         {/* --- Conditional View: Welcome vs Chat --- */}
         {messages.length === 0 ? (
            /* Welcome View - Clone of "Meet Claude" */
            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-500">
                 
                 {/* Top Label */}
                 <div className="mb-8 md:mb-12">
                     <span className="text-xs font-bold tracking-[0.2em] text-[#555] uppercase">Ostra AI</span>
                 </div>

                 {/* Main Heading */}
                 <h1 className="text-4xl md:text-6xl font-serif text-[#1a1a1a] mb-8 md:mb-12 tracking-tight text-center">
                    Meet Ostra
                 </h1>

                 {/* Input Area - Pill Shape */}
                 <div className="w-full max-w-[680px] relative mb-6 z-20">
                     <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e5e5] p-2 flex flex-col md:flex-row items-center gap-2 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
                        
                        {/* Input Field */}
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Start your first message with Ostra..."
                            className="flex-1 w-full bg-transparent border-none outline-none text-[#1a1a1a] placeholder-[#9CA3AF] px-4 py-3 md:py-2 text-[16px]"
                        />

                        {/* Actions Right */}
                        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end px-2 md:px-0">
                             <button className="p-2 text-[#9CA3AF] hover:text-[#555] transition-colors rounded-full hover:bg-gray-100">
                                 <Paperclip size={20} />
                             </button>
                             
                             <button 
                                onClick={() => handleSendMessage()}
                                className="bg-[#5944D5] hover:bg-[#4a36be] text-white px-5 py-2.5 rounded-xl md:rounded-full text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
                             >
                                <span>Start a new chat</span>
                                <ArrowRight size={14} className="hidden md:block" />
                             </button>
                        </div>
                     </div>
                 </div>

                 {/* Plan Subtext */}
                 <div className="text-center mb-12">
                     <p className="text-[#6B7280] text-[15px]">
                        You're currently on the <span className="font-semibold text-[#374151]">free plan</span> with daily usage limits
                     </p>
                     <button onClick={onBack} className="text-[#5944D5] text-[15px] hover:underline font-medium mt-1">
                        Unlock more with Ostra Pro
                     </button>
                 </div>

                 {/* "Try these" Suggestions */}
                 <div className="w-full max-w-[680px] flex flex-col gap-3">
                     <h3 className="text-[#374151] font-medium text-[15px] mb-1">Try these</h3>
                     
                     {suggestionPrompts.map((prompt, idx) => (
                         <button 
                            key={idx}
                            onClick={() => handleSendMessage(prompt.replace('Example: "', '').replace('"', ''))}
                            className="w-full text-left bg-[#E6E4DD] hover:bg-[#dcd9d3] text-[#4B5563] py-3.5 px-6 rounded-2xl transition-colors text-[15px]"
                         >
                            {prompt}
                         </button>
                     ))}
                 </div>

            </div>
         ) : (
             /* Chat View (Standard Chat Interface) */
             <div className="flex flex-col h-full relative">
                 {/* Top Bar for Chat Mode */}
                 <div className="h-14 border-b border-[#dedbd6] bg-[#F2F0E9] flex items-center justify-center shrink-0">
                     <span className="font-serif text-[#333] font-medium">Ostra Chat</span>
                 </div>

                 {/* Messages Area */}
                 <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#dcd9d3]">
                     <div className="max-w-[760px] mx-auto space-y-6 pb-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'assistant' && (
                                     <div className="w-8 h-8 rounded bg-[#d97757] text-white flex items-center justify-center text-xs font-bold shrink-0">
                                         O
                                     </div>
                                )}
                                
                                <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                                    msg.role === 'user' 
                                    ? 'bg-[#E6E4DD] text-[#1a1a1a] rounded-tr-sm' 
                                    : 'bg-white text-[#1a1a1a] border border-[#e5e5e5] rounded-tl-sm'
                                }`}>
                                    {msg.content}
                                </div>
                                
                                {msg.role === 'user' && (
                                    <div className="w-8 h-8 rounded bg-[#555] text-white flex items-center justify-center text-xs font-bold shrink-0">
                                        {userName.substring(0, 1).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isTyping && (
                             <div className="flex gap-4 justify-start">
                                <div className="w-8 h-8 rounded bg-[#d97757] text-white flex items-center justify-center text-xs font-bold shrink-0">O</div>
                                <div className="bg-white border border-[#e5e5e5] px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-[#999] rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-[#999] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-[#999] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                             </div>
                        )}
                        <div ref={messagesEndRef} />
                     </div>
                 </div>

                 {/* Sticky Bottom Input */}
                 <div className="p-4 bg-[#F2F0E9] z-20">
                     <div className="max-w-[760px] mx-auto">
                        <div className="w-full bg-white rounded-2xl shadow-sm border border-[#e5e5e5] flex items-end p-3 gap-3 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
                             <button className="p-2 text-[#999] hover:text-[#555] transition-colors rounded-lg hover:bg-zinc-100 hidden sm:block">
                                <Plus size={20} />
                             </button>
                             <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Message Ostra..."
                                className="flex-1 max-h-[120px] py-2 text-[15px] text-[#333] placeholder-[#9CA3AF] resize-none focus:outline-none font-sans bg-transparent leading-relaxed"
                                rows={1}
                                style={{ minHeight: '44px' }}
                            />
                            <button 
                                onClick={() => handleSendMessage()}
                                disabled={!input.trim()}
                                className={`p-2 rounded-lg transition-all shrink-0 ${input.trim() ? 'bg-[#5944D5] text-white shadow-sm' : 'bg-[#f0f0f0] text-[#ccc]'}`}
                            >
                                <ArrowUp size={20} strokeWidth={3} />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <p className="text-[11px] text-[#888]">
                                AI can make mistakes. Please double-check responses.
                            </p>
                        </div>
                     </div>
                 </div>
             </div>
         )}

      </main>
    </div>
  );
};