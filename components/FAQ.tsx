import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group focus:outline-none"
      >
        <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-cyan-400' : 'text-zinc-300 group-hover:text-white'}`}>
          {question}
        </span>
        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-cyan-500/10 rotate-180' : 'bg-zinc-800/50 group-hover:bg-zinc-800'}`}>
          {isOpen ? <Minus size={16} className="text-cyan-400" /> : <Plus size={16} className="text-zinc-500 group-hover:text-zinc-300" />}
        </div>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="text-zinc-400 leading-relaxed font-light text-[15px]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What makes Ostra different from other website builders?",
            answer: "Ostra isn't just a drag-and-drop tool. It's an intelligent AI Architect powered by Gemini 3.0 Pro. It understands context, writes clean semantic code, and can build complex interactive applications from a single prompt, not just static pages."
        },
        {
            question: "Do I need coding knowledge to use Ostra?",
            answer: "Not at all. Ostra is designed for everyone. You describe what you want in natural language, and Ostra handles the HTML, CSS, and JavaScript. However, if you are a developer, you can switch to Code Mode to inspect and export the clean code."
        },
        {
            question: "How does the 'Ostra V2' plan differ from the free version?",
            answer: "The free version uses standard models perfect for basic layouts. Ostra V2 unlocks the 'Thinking' capabilities of Gemini 3.0 Pro, allowing for complex logic, reasoning (up to 32k tokens), and higher-fidelity designs. It also includes unlimited generations."
        },
        {
            question: "Can I export my project?",
            answer: "Yes! All generated projects can be exported as a single HTML file that includes all necessary CSS and JS. You can host this file anywhere—Netlify, Vercel, or your own server—with zero lock-in."
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. We use enterprise-grade encryption for all projects. Your prompts and generated code are yours. For Enterprise clients (TheOstra plan), we offer dedicated secure environments and NDA compliance."
        }
    ];

    return (
        <section id="faqs" className="relative w-full py-24 px-6 bg-[#050505] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-16">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-white/5 mb-4 shadow-inner shadow-white/5">
                        <HelpCircle size={14} className="text-cyan-400" />
                        <span className="text-xs text-zinc-400 font-medium">Support & Details</span>
                     </div>
                     <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Frequently Asked Questions
                     </h2>
                     <p className="text-zinc-400 text-lg font-light">
                        Everything you need to know about the platform and billing.
                     </p>
                </div>

                <div className="bg-[#0c0c0e]/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Subtle internal gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        {faqs.map((faq, idx) => (
                            <FAQItem 
                                key={idx} 
                                question={faq.question} 
                                answer={faq.answer} 
                                isOpen={openIndex === idx} 
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
