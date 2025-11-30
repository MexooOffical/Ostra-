import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  ArrowLeft, Download, Share2, Rocket, Github, FileText, 
  Settings, RotateCcw, Monitor, Smartphone, Maximize2, 
  Code as CodeIcon, Eye, Mic, Plus, Paperclip, Sparkles,
  Play, StopCircle, EyeOff, ChevronRight, CornerDownLeft,
  Loader2, Zap
} from 'lucide-react';

interface BuilderProps {
  initialPrompt: string;
  onBack: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  isThinking?: boolean;
  isBuilding?: boolean;
}

export const Builder: React.FC<BuilderProps> = ({ initialPrompt, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [chatInstance, setChatInstance] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getSystemInstruction = () => `
    You are an ultra-fast, expert Frontend Engineer.
    
    GOAL:
    Instantaneously generate or modify pixel-perfect, single-file HTML applications.
    
    STRICT RULES:
    1. **ALWAYS OUTPUT FULL CODE**: Whether creating from scratch or modifying a single color, you MUST return the COMPLETE, working HTML file. Do not output diffs, placeholders, or partial snippets.
    2. **SPEED & EFFICIENCY**: Write clean, efficient code using Tailwind CSS.
    3. **NO CHATTER**: Keep conversational text to a bare minimum (1 short sentence). Focus on the code.
    4. **IMAGES**: Do NOT use source.unsplash.com (it is broken). Use **https://picsum.photos/seed/{random_string}/800/600** for reliable images.
    
    TECHNICAL STACK:
    - Single HTML file.
    - Tailwind CSS (CDN).
    - Phosphor Icons (CDN) via \`<script src="https://unpkg.com/@phosphor-icons/web"></script>\`.
    - Dark Mode default.
    - React/Babel (CDN) ONLY if complex state is needed, otherwise Vanilla JS.
    
    RESPONSE FORMAT:
    [Short confirmation sentence]
    \`\`\`html
    <!DOCTYPE html>
    <html>
    ... full code ...
    </html>
    \`\`\`
  `;

  // Initialize Chat
  const initializeChat = async (historyMessages: Message[] = []) => {
    try {
      // Use the provided key fallback if process.env is not set
      const apiKey = process.env.API_KEY || "AIzaSyDl5we77LUK-2nmXXnyDMvxfHZqEODXyGU"; 
      const ai = new GoogleGenAI({ apiKey });
      
      const history = historyMessages
        .filter(m => !m.isError && !m.isThinking)
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));

      const chat = ai.chats.create({
        model: 'gemini-2.5-flash', // Switched to Flash for speed and efficiency
        config: {
          systemInstruction: getSystemInstruction(),
        },
        history: history
      });

      setChatInstance(chat);
      return chat;
    } catch (error) {
      console.error("Error initializing chat:", error);
      return null;
    }
  };

  const generateResponse = async (chat: any, userMessageText: string) => {
     setIsGenerating(true);
     setMessages(prev => [...prev, { role: 'model', text: '', isThinking: true }]);

     try {
         const resultStream = await chat.sendMessageStream({ message: userMessageText });
         
         let fullText = '';
         let isCollectingCode = false;

         for await (const chunk of resultStream) {
             const chunkText = chunk.text;
             if (chunkText) {
                 fullText += chunkText;

                 // Check if code block has started
                 if (fullText.includes('```')) {
                     isCollectingCode = true;
                 }

                 // Update UI message
                 // Hide the code block from the chat bubble
                 const visibleText = fullText.replace(/```(?:html|xml)?[\s\S]*?(?:```|$)/g, '').trim();
                 
                 setMessages(prev => {
                     const newArr = [...prev];
                     const lastMsg = newArr[newArr.length - 1];
                     if (lastMsg) {
                         lastMsg.text = visibleText || (isCollectingCode ? "Building application..." : "Thinking...");
                         lastMsg.isThinking = false;
                         lastMsg.isBuilding = isCollectingCode;
                     }
                     return newArr;
                 });
             }
         }

         // Final extraction logic - More robust regex
         const codeBlockMatch = fullText.match(/```(?:html|xml)?([\s\S]*?)```/);
         let extractedCode = '';

         if (codeBlockMatch && codeBlockMatch[1]) {
             extractedCode = codeBlockMatch[1].trim();
         } else if (fullText.includes('<!DOCTYPE html>')) {
             // Fallback: If no markdown block but HTML is present
             const htmlStart = fullText.indexOf('<!DOCTYPE html>');
             extractedCode = fullText.substring(htmlStart);
         }

         if (extractedCode) {
             setGeneratedCode(extractedCode);
             setMessages(prev => {
                 const newArr = [...prev];
                 const lastMsg = newArr[newArr.length - 1];
                 if (lastMsg) {
                     lastMsg.isBuilding = false;
                     lastMsg.text = fullText.replace(/```[\s\S]*?```/g, '').trim() || "Done.";
                 }
                 return newArr;
             });
         } else {
             // Handle case where no code was generated
             setMessages(prev => {
                const newArr = [...prev];
                const lastMsg = newArr[newArr.length - 1];
                if (lastMsg) {
                    lastMsg.isBuilding = false;
                    lastMsg.isError = true;
                    lastMsg.text += "\n(I couldn't generate the code preview. Please try again.)";
                }
                return newArr;
             });
         }

     } catch (error) {
         console.error(error);
         setMessages(prev => {
             const newArr = [...prev];
             const lastMsg = newArr[newArr.length - 1];
             if (lastMsg) {
                 lastMsg.isError = true;
                 lastMsg.text = "Error generating response. Please check your connection.";
                 lastMsg.isThinking = false;
             }
             return newArr;
         });
     } finally {
         setIsGenerating(false);
     }
  };

  useEffect(() => {
    const start = async () => {
      const chat = await initializeChat();
      if (initialPrompt && messages.length === 0 && chat) {
        setMessages([{ role: 'user', text: initialPrompt }]);
        await generateResponse(chat, initialPrompt);
      }
    };
    start();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSendMessage = async () => {
    if (!input.trim() || isGenerating) return;

    let currentChat = chatInstance;
    if (!currentChat) {
        currentChat = await initializeChat(messages);
    }

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    
    if (currentChat) {
        await generateResponse(currentChat, userMsg);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#09090b] text-white overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* ------------------- HEADER ------------------- */}
      <header className="h-14 border-b border-zinc-800 bg-[#09090b] flex items-center justify-between px-4 z-20 shrink-0">
        
        {/* Left: Back Button */}
        <div className="flex items-center">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors text-xs font-medium"
          >
            <ArrowLeft size={14} />
            Back to start
          </button>
        </div>

        {/* Center: Title */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-zinc-200">
           Apps
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 text-zinc-400">
           <button className="p-2 hover:bg-zinc-800 rounded-lg hover:text-zinc-200 transition-colors" title="Files">
              <FileText size={16} strokeWidth={1.5} />
           </button>
           <button className="p-2 hover:bg-zinc-800 rounded-lg hover:text-zinc-200 transition-colors" title="Download">
              <Download size={16} strokeWidth={1.5} />
           </button>
           <button className="p-2 hover:bg-zinc-800 rounded-lg hover:text-zinc-200 transition-colors" title="Github">
              <Github size={16} strokeWidth={1.5} />
           </button>
           <button className="p-2 hover:bg-zinc-800 rounded-lg hover:text-zinc-200 transition-colors" title="Deploy">
              <Rocket size={16} strokeWidth={1.5} />
           </button>
           <button className="p-2 hover:bg-zinc-800 rounded-lg hover:text-zinc-200 transition-colors" title="Share">
              <Share2 size={16} strokeWidth={1.5} />
           </button>
           <button className="p-2 hover:bg-zinc-800 rounded-lg hover:text-zinc-200 transition-colors" title="Hide UI">
              <EyeOff size={16} strokeWidth={1.5} />
           </button>
        </div>
      </header>

      {/* ------------------- MAIN CONTENT ------------------- */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* === LEFT PANEL: CHAT === */}
        <div className="w-[350px] md:w-[400px] flex flex-col border-r border-zinc-800 bg-[#09090b] flex-shrink-0">
          
          {/* Chat Header */}
          <div className="h-12 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
             <div className="flex items-center gap-2 text-blue-400">
                <Sparkles size={16} className="fill-blue-400/20" />
                <span className="text-sm font-medium text-zinc-200">Code assistant</span>
             </div>
             <div className="flex items-center gap-1 text-zinc-500">
                 <button className="p-1.5 hover:text-zinc-300 transition-colors"><Settings size={14} /></button>
                 <button onClick={() => setMessages([])} className="p-1.5 hover:text-zinc-300 transition-colors"><RotateCcw size={14} /></button>
             </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
             {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-60">
                   <div className="w-16 h-16 rounded-2xl bg-zinc-900/50 border border-zinc-800 mb-4 flex items-center justify-center">
                      <Zap size={24} className="text-zinc-600" />
                   </div>
                   <p className="text-sm text-center max-w-[200px]">Describe your app to generate code instantly.</p>
                </div>
             )}
             
             {messages.map((msg, idx) => (
               <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2`}>
                 {/* Avatar */}
                 <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    msg.role === 'user' ? 'bg-zinc-700' : 'bg-transparent'
                 }`}>
                    {msg.role === 'user' ? (
                        <div className="w-2 h-2 bg-zinc-400 rounded-sm" /> 
                    ) : (
                        <Sparkles size={14} className="text-blue-500 fill-blue-500/20" />
                    )}
                 </div>
                 
                 {/* Content */}
                 <div className={`text-sm leading-relaxed max-w-[85%] ${
                   msg.role === 'user' ? 'text-zinc-200' : 'text-zinc-300'
                 }`}>
                    {msg.role === 'model' && (
                        <div className="flex flex-col gap-2">
                            {msg.isThinking && (
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <Loader2 size={12} className="animate-spin" />
                                    <span>Thinking...</span>
                                </div>
                            )}
                            
                            {msg.isBuilding && (
                                <div className="flex items-center gap-2 text-blue-400">
                                     <Loader2 size={12} className="animate-spin" />
                                     <span>Writing code...</span>
                                </div>
                            )}

                            {msg.text && (
                                <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                                    {msg.text}
                                </div>
                            )}

                            {msg.isError && (
                                <div className="text-red-400 text-xs">
                                    {msg.text}
                                </div>
                            )}
                        </div>
                    )}
                    {msg.role === 'user' && msg.text}
                 </div>
               </div>
             ))}
             <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Matching the Image */}
          <div className="p-4 pt-2">
             <div className="relative bg-[#18181b] border border-zinc-800 rounded-2xl overflow-hidden focus-within:border-zinc-700 transition-colors shadow-lg">
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    placeholder="Make changes, add new features, ask for anything"
                    className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-500 p-4 pb-12 resize-none focus:outline-none scrollbar-hide min-h-[100px]"
                />
                
                {/* Bottom Toolbar inside Input */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    {/* Left Actions */}
                    <button className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors rounded-lg hover:bg-zinc-800">
                        <Paperclip size={18} />
                    </button>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                         <button className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors rounded-lg hover:bg-zinc-800">
                            <Mic size={18} />
                         </button>
                         <button 
                             onClick={handleSendMessage}
                             disabled={!input.trim() || isGenerating}
                             className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                                 input.trim() 
                                 ? 'bg-white text-black hover:bg-zinc-200' 
                                 : 'bg-zinc-800 text-zinc-600'
                             }`}
                         >
                            {isGenerating ? (
                                <div className="w-3 h-3 bg-zinc-600 rounded-[1px]" /> 
                            ) : (
                                <div className="w-3 h-3 bg-current rounded-[1px]" />
                            )}
                         </button>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* === RIGHT PANEL: PREVIEW === */}
        <div className="flex-1 flex flex-col bg-[#09090b] relative border-l border-zinc-800">
            
            {/* Preview Header */}
            <div className="h-12 border-b border-zinc-800 flex items-center justify-between px-4 bg-[#09090b]">
                
                {/* Left: View Toggle */}
                <div className="flex bg-[#18181b] rounded-lg p-0.5 border border-zinc-800">
                    <button 
                        onClick={() => setViewMode('preview')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'preview' ? 'bg-zinc-800 text-zinc-200 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        <Play size={12} className="fill-current" /> Preview
                    </button>
                    <button 
                        onClick={() => setViewMode('code')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'code' ? 'bg-zinc-800 text-zinc-200 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        <CodeIcon size={12} /> Code
                    </button>
                </div>

                {/* Right: Device & Extras */}
                <div className="flex items-center gap-3 text-zinc-500">
                    <button className="hover:text-zinc-300 transition-colors flex items-center gap-1 text-xs">
                         <Maximize2 size={14} /> Fullscreen
                    </button>
                    <div className="h-4 w-[1px] bg-zinc-800"></div>
                    <button 
                       onClick={() => setDeviceMode('desktop')}
                       className={`hover:text-zinc-300 transition-colors flex items-center gap-1 text-xs ${deviceMode === 'desktop' ? 'text-zinc-200' : ''}`}
                    >
                         <Monitor size={14} /> Device
                    </button>
                    <button onClick={() => setDeviceMode(prev => prev === 'mobile' ? 'desktop' : 'mobile')}>
                         <RotateCcw size={14} className="hover:text-zinc-300" />
                    </button>
                </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 bg-[#0c0c0e] flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.05]" 
                    style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>

                {generatedCode ? (
                    <div 
                    className={`relative transition-all duration-500 ease-in-out shadow-2xl border border-zinc-800 bg-white overflow-hidden
                        ${deviceMode === 'mobile' ? 'w-[375px] h-[700px] rounded-[2rem] border-[8px] border-zinc-800' : 'w-full h-full rounded-lg'}
                    `}
                    >
                        {viewMode === 'preview' ? (
                            <iframe 
                                title="Preview"
                                srcDoc={generatedCode}
                                className="w-full h-full rounded-[inherit] bg-white"
                                sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
                            />
                        ) : (
                            <div className="w-full h-full bg-[#1e1e1e] overflow-auto">
                                <pre className="p-4 text-xs font-mono text-zinc-300 leading-relaxed">
                                    {generatedCode}
                                </pre>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-600 gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center rotate-3">
                           <CodeIcon size={32} className="text-zinc-700" />
                        </div>
                        <p className="text-zinc-500 text-sm">Preview will appear here</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};