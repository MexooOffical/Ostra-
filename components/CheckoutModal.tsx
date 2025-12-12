import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, Lock, CheckCircle2, User, Wallet, CreditCard } from 'lucide-react';

interface CheckoutModalProps {
  plan: { title: string, price: string };
  onClose: () => void;
  onSuccess: () => void;
  isAuthenticated: boolean;
  userEmail?: string | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ plan, onClose, onSuccess, isAuthenticated, userEmail }) => {
  const [step, setStep] = useState<'contact' | 'payment' | 'processing'>('contact');
  const [email, setEmail] = useState(userEmail || '');
  const [phone, setPhone] = useState('');
  
  // Hardcoded price from image for visual matching, or derived from plan if dynamic
  const priceDisplay = plan.price === 'Free' ? '₹0' : '₹ 8,999';

  const handleProceed = () => {
    if (step === 'contact') {
        if(email || phone) setStep('payment'); // Allow proceed if at least one field is filled for demo
    } else if (step === 'payment') {
        setStep('processing');
        setTimeout(() => {
            onSuccess();
        }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/70 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div className="w-full md:max-w-[420px] bg-white md:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300 font-sans">
        
        {/* Header - Dark Theme (Matching Image) */}
        <div className="bg-[#121212] text-white p-5 relative shrink-0">
           {/* Close Button */}
           <button onClick={onClose} className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors">
             <X size={20} />
           </button>
           
           {/* Top Row: Logo & Language/Help */}
           <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px]">
                    <div className="w-full h-full bg-[#121212] rounded-[7px] flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-cyan-400 rounded-sm rotate-45"></div>
                    </div>
                 </div>
                 <span className="font-bold text-lg tracking-tight">Ostra AI</span>
             </div>
             
             {/* Language Dropdown Mock */}
             <div className="flex items-center gap-1 bg-zinc-800/50 px-2 py-1 rounded text-xs text-zinc-400 mr-8">
                 <span>EN</span>
                 <ChevronDown size={12} />
             </div>
           </div>

           {/* Amount Section */}
           <div>
              <p className="text-xs text-zinc-400 mb-1">Total Amount</p>
              <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-bold tracking-tight">{priceDisplay}</h2>
                 <div className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                    <Lock size={12} className="text-zinc-400" />
                    <span>Secured by <span className="font-semibold italic text-white">Razorpay</span></span>
                 </div>
              </div>
           </div>
        </div>

        {/* Body - White Theme */}
        <div className="flex-1 bg-white p-6 overflow-y-auto min-h-[400px]">
            
            {/* --- STEP 1: CONTACT DETAILS --- */}
            {step === 'contact' && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                   
                   {/* Section Title */}
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600">
                        <User size={14} />
                      </div>
                      <h4 className="font-semibold text-[15px] text-zinc-900">Contact Details</h4>
                   </div>

                   <div className="space-y-5">
                      {/* Phone Input */}
                      <div className="flex">
                         <div className="w-[80px] border border-r-0 border-zinc-300 rounded-l-md flex items-center justify-center gap-1 text-sm text-zinc-700 bg-white h-12 cursor-pointer hover:bg-zinc-50 transition-colors">
                            <span>+91</span>
                            <ChevronDown size={14} className="text-zinc-400" />
                         </div>
                         <div className="flex-1 relative">
                            <input 
                                type="tel" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone Number"
                                className="w-full h-12 px-4 border border-zinc-300 rounded-r-md text-[15px] outline-none focus:border-black focus:ring-0 transition-all placeholder:text-zinc-400 text-zinc-900"
                            />
                         </div>
                      </div>

                      {/* Email Input */}
                      <div className="relative">
                         <div className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-zinc-500 font-medium z-10">Email</div>
                         <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="mexoooffical@gmail.com"
                            className="w-full h-12 px-4 border border-zinc-300 rounded-md text-[15px] outline-none focus:border-black focus:ring-0 transition-all placeholder:text-zinc-400 text-zinc-900"
                         />
                      </div>
                   </div>
                </div>
            )}

            {/* --- STEP 2: PAYMENT METHODS --- */}
            {step === 'payment' && (
                <div className="space-y-4 animate-in slide-in-from-right-8 duration-300">
                    <h4 className="font-bold text-[15px] text-zinc-900 mb-4">UPI And Cards</h4>
                    
                    {/* Option 1: UPI */}
                    <button className="w-full bg-white border border-zinc-200 rounded-lg p-4 flex items-start gap-4 hover:bg-zinc-50 transition-colors text-left group">
                        <div className="w-10 h-10 rounded border border-zinc-200 flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-zinc-900">UPI / QR</span>
                                {/* Payment Icons Row */}
                                <div className="flex -space-x-1.5">
                                    <div className="w-5 h-5 rounded-full bg-blue-100 border border-white flex items-center justify-center text-[8px] font-bold text-blue-700">Pay</div>
                                    <div className="w-5 h-5 rounded-full bg-indigo-100 border border-white flex items-center justify-center text-[8px] font-bold text-indigo-700">G</div>
                                    <div className="w-5 h-5 rounded-full bg-orange-100 border border-white flex items-center justify-center text-[8px] font-bold text-orange-700">B</div>
                                </div>
                            </div>
                            <p className="text-xs text-zinc-500">Google Pay, PhonePe, Paytm & more</p>
                        </div>
                    </button>

                    {/* Option 2: Card */}
                    <button className="w-full bg-white border border-zinc-200 rounded-lg p-4 flex items-start gap-4 hover:bg-zinc-50 transition-colors text-left group">
                        <div className="w-10 h-10 rounded border border-zinc-200 flex items-center justify-center shrink-0">
                            <CreditCard size={20} className="text-zinc-700" />
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-zinc-900 mb-1">Card</div>
                            <p className="text-xs text-zinc-500">MasterCard, Visa, and RuPay credit cards</p>
                        </div>
                    </button>

                    {/* Option 3: Netbanking */}
                    <button className="w-full bg-white border border-zinc-200 rounded-lg p-4 flex items-start gap-4 hover:bg-zinc-50 transition-colors text-left group">
                        <div className="w-10 h-10 rounded border border-zinc-200 flex items-center justify-center shrink-0">
                            <Wallet size={20} className="text-zinc-700" />
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-zinc-900 mb-1">Netbanking</div>
                            <p className="text-xs text-zinc-500">All Indian banks supported</p>
                        </div>
                    </button>
                </div>
            )}

            {/* --- STEP 3: PROCESSING --- */}
            {step === 'processing' && (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] animate-in fade-in duration-500">
                    <div className="relative w-16 h-16 mb-6">
                        <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <h3 className="font-bold text-lg text-zinc-900 mb-2">Processing Payment</h3>
                    <p className="text-sm text-zinc-500 text-center max-w-[200px]">Please verify the payment on your device</p>
                </div>
            )}

        </div>

        {/* Footer Action Bar */}
        {step !== 'processing' && (
            <div className="bg-white p-6 pt-2 border-t border-zinc-100 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] z-10 shrink-0">
                
                {step === 'payment' && (
                    <div className="flex justify-between items-center mb-4 pb-2">
                         <div className="flex flex-col">
                             <span className="font-bold text-lg text-zinc-900">{priceDisplay}</span>
                             <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wide">Details</span>
                         </div>
                         <button className="text-blue-600 text-xs font-semibold hover:underline">View Details</button>
                    </div>
                )}
                
                <button 
                  onClick={handleProceed}
                  className="w-full bg-[#121212] hover:bg-black text-white font-bold text-[15px] py-4 rounded-[6px] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {step === 'contact' ? 'Proceed' : 'Pay Now'}
                  {step === 'contact' && <ChevronRight size={16} strokeWidth={3} />}
                </button>
            </div>
        )}

      </div>
    </div>
  );
};