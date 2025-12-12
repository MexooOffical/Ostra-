import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Lock, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface PaymentProps {
  planName: string;
  price: string;
  onBack: () => void;
  onComplete: () => void;
}

export const Payment: React.FC<PaymentProps> = ({ planName, price, onBack, onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  // Format price for display
  const numericPrice = price === 'Free' ? 0 : parseFloat(price.replace(/[^0-9.]/g, ''));
  const tax = numericPrice * 0.18; // 18% tax example
  const total = numericPrice + tax;
  const displayTotal = price === 'Free' ? '₹0.00' : `₹${total.toFixed(2)}`;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Navigate away after showing success
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 2000);
  };

  // Input formatters
  const formatCardNumber = (val: string) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (val: string) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 animate-in fade-in duration-500">
        <div className="bg-[#0c0c0e] border border-green-500/20 rounded-3xl p-10 max-w-md w-full text-center relative overflow-hidden">
           {/* Success Glow */}
           <div className="absolute inset-0 bg-green-500/5 z-0"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-500/20 blur-3xl rounded-full"></div>
           
           <div className="relative z-10 flex flex-col items-center">
             <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
               <CheckCircle2 size={40} className="text-green-400" />
             </div>
             <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
             <p className="text-zinc-400 mb-6">Your subscription to <span className="text-cyan-400">{planName}</span> is now active.</p>
             <div className="flex items-center gap-2 text-sm text-zinc-500">
               <Loader2 size={14} className="animate-spin" />
               Redirecting to dashboard...
             </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6 relative z-50">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[20%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px]"></div>
       </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Cancel & Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Payment Form */}
          <div className="lg:col-span-7 space-y-6">
             <div className="bg-[#0c0c0e] border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-bold text-white">Secure Checkout</h1>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    <Lock size={12} className="text-green-400" />
                    <span>256-bit SSL Encrypted</span>
                  </div>
                </div>

                {/* Payment Methods Tabs */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                   <button className="flex-1 min-w-[120px] flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-cyan-500/50 bg-cyan-900/10 text-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                      <CreditCard size={24} />
                      <span className="text-sm font-semibold">Card</span>
                   </button>
                   <button className="flex-1 min-w-[120px] flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-white/5 bg-[#18181b] text-zinc-400 hover:bg-[#27272a] hover:border-white/10 transition-all opacity-60">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M7.076 21.337l.756-4.728H3.15l2.844-1.575 3.024-5.355.66-3.78H4.61L2.096 16.63h3.58l-1.4 5.908h2.8zM21.35 6.78l-1.12-1.933a3.57 3.57 0 00-1.716-1.575l-4.704-1.785a3.57 3.57 0 00-3.36.21L6.23 4.297l.756 4.728 5.18 2.992c.672.378 1.484.378 2.156 0l4.34-2.436a3.57 3.57 0 001.68-3.15zM12.43 14.89l-2.016 1.155L9.38 21.337h2.8l.924-3.696 2.38-1.344a3.57 3.57 0 001.68-3.15V9.43l-4.732 5.46z"/></svg>
                      <span className="text-sm font-semibold">PayPal</span>
                   </button>
                   <button className="flex-1 min-w-[120px] flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-white/5 bg-[#18181b] text-zinc-400 hover:bg-[#27272a] hover:border-white/10 transition-all opacity-60">
                      <ShieldCheck size={24} />
                      <span className="text-sm font-semibold">Crypto</span>
                   </button>
                </div>

                <form onSubmit={handlePay} className="space-y-5">
                   {/* Name */}
                   <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">Name on Card</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#050505] border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                        placeholder="John Doe"
                      />
                   </div>

                   {/* Card Number */}
                   <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">Card Number</label>
                      <div className="relative">
                        <input 
                            type="text" 
                            required
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            className="w-full bg-[#050505] border border-zinc-800 rounded-xl px-4 py-3 pl-12 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono"
                            placeholder="0000 0000 0000 0000"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                           <CreditCard size={18} />
                        </div>
                      </div>
                   </div>

                   {/* Expiry & CVC */}
                   <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">Expiry</label>
                          <input 
                            type="text" 
                            required
                            maxLength={5}
                            value={expiry}
                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                            className="w-full bg-[#050505] border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono"
                            placeholder="MM/YY"
                          />
                      </div>
                      <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1 flex items-center justify-between">
                             <span>CVC</span>
                             <div className="group relative cursor-help">
                                <AlertCircle size={12} className="text-zinc-600" />
                             </div>
                          </label>
                          <input 
                            type="text" 
                            required
                            maxLength={4}
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                            className="w-full bg-[#050505] border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono"
                            placeholder="123"
                          />
                      </div>
                   </div>

                   {/* Country */}
                   <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">Country</label>
                      <select className="w-full bg-[#050505] border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all appearance-none">
                         <option>India</option>
                         <option>United States</option>
                         <option>United Kingdom</option>
                         <option>Germany</option>
                         <option>Japan</option>
                      </select>
                   </div>

                   <button 
                     type="submit"
                     disabled={isLoading}
                     className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 mt-4 relative overflow-hidden"
                   >
                      {isLoading ? (
                          <Loader2 size={20} className="animate-spin" />
                      ) : (
                          <>
                             <span>Pay {displayTotal}</span>
                             <ArrowLeft size={16} className="rotate-180" />
                          </>
                      )}
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer-slide_2s_infinite]"></div>
                   </button>
                   
                   <p className="text-center text-xs text-zinc-500 mt-4">
                      By confirming, you accept our Terms & Conditions.
                   </p>
                </form>
             </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
              <div className="bg-[#18181b]/30 border border-white/5 rounded-3xl p-6 backdrop-blur-md sticky top-28">
                  <h3 className="text-lg font-semibold text-white mb-6">Order Summary</h3>
                  
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
                      <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                          <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                             <span className="font-bold text-white text-xs">O</span>
                          </div>
                      </div>
                      <div>
                          <h4 className="font-bold text-white">{planName}</h4>
                          <p className="text-sm text-zinc-400">Monthly Subscription</p>
                      </div>
                  </div>

                  <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Subtotal</span>
                          <span className="text-white font-medium">{price === 'Free' ? '₹0.00' : price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Tax (18% GST)</span>
                          <span className="text-white font-medium">₹{tax.toFixed(2)}</span>
                      </div>
                      {price !== 'Free' && (
                          <div className="flex justify-between text-sm text-green-400">
                             <span>Discount</span>
                             <span>-₹0.00</span>
                          </div>
                      )}
                  </div>

                  <div className="flex justify-between items-end border-t border-white/5 pt-4 mb-8">
                      <span className="text-zinc-400 font-medium">Total</span>
                      <div className="text-right">
                          <span className="text-3xl font-bold text-white tracking-tight">{displayTotal}</span>
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Billed Monthly</div>
                      </div>
                  </div>

                  <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-xl p-4 flex gap-3">
                      <ShieldCheck size={20} className="text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                          <h5 className="text-sm font-semibold text-cyan-200 mb-1">Secure & Encrypted</h5>
                          <p className="text-xs text-zinc-400 leading-relaxed">
                              Your financial data is never stored on our servers. We use Stripe for secure processing.
                          </p>
                      </div>
                  </div>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};