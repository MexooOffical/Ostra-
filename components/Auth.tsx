import React, { useState } from 'react';
import { ArrowRight, X, Eye, EyeOff, Loader2 } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
  onBack: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onBack }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);

    // Basic Validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Get existing users from mock DB (localStorage)
      const storedUsers = localStorage.getItem('ostra_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      if (mode === 'signup') {
        // Check for duplicate email
        if (users.some((u: any) => u.email === email)) {
          setError("Account with this email already exists.");
          setIsLoading(false);
          return;
        }

        // Create new user
        const newUser = { email, password };
        localStorage.setItem('ostra_users', JSON.stringify([...users, newUser]));
        
        // Success
        onLogin();
      } else {
        // Login Logic
        const user = users.find((u: any) => u.email === email && u.password === password);
        
        if (user) {
          // Success
          onLogin();
        } else {
          // Check if user exists at all to give better error
          const emailExists = users.some((u: any) => u.email === email);
          if (emailExists) {
             setError("Incorrect password.");
          } else {
             setError("No account found with this email.");
          }
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError(null);
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#050505] animate-in fade-in duration-500">
      
      {/* Close Button */}
      <button 
        onClick={onBack}
        className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-zinc-200 transition-colors z-50"
      >
        <X size={24} />
      </button>

      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"
          style={{ maskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)' }}
        ></div>

        {/* Top-Center Glow (Aurora effect) */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-[100%] bg-gradient-to-b from-cyan-500/10 via-blue-600/10 to-transparent blur-[120px] animate-pulse"></div>

        {/* Animated Orbs */}
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-glow-pulse mix-blend-screen"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-glow-pulse mix-blend-screen" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] animate-glow-pulse mix-blend-screen" style={{ animationDelay: '4s' }}></div>

      </div>

      <div className="w-full max-w-[400px] mx-auto relative z-10 flex flex-col items-center px-6">
        
        {/* Animated Gradient Logo */}
        <div className="mb-8 relative">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 blur-2xl rounded-full animate-pulse"></div>
            
            {/* Logo Container */}
            <div className="relative w-20 h-20 rounded-full bg-[#0a0a0c] flex items-center justify-center overflow-hidden border border-white/5 shadow-2xl">
                
                {/* Rotating Gradient Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,#06b6d4_120deg,#2563eb_180deg,transparent_360deg)] animate-[spin_3s_linear_infinite] opacity-100"></div>
                
                {/* Inner Mask to create Ring */}
                <div className="absolute inset-[3px] bg-[#050505] rounded-full z-10 flex items-center justify-center">
                    {/* Inner Glowing Core */}
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_25px_rgba(6,182,212,0.6)] animate-pulse"></div>
                </div>
            </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-zinc-400 text-[15px] mb-8 text-center font-light">
          {mode === 'login' ? 'Enter your details to sign in' : 'Start building your dream website'}
        </p>

        {/* Google Button */}
        <button 
          onClick={onLogin}
          className="w-full bg-white hover:bg-zinc-200 text-black font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors mb-6 group shadow-lg shadow-white/5"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="text-[15px]">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="w-full flex items-center gap-4 mb-6">
          <div className="h-[1px] bg-zinc-800 flex-1"></div>
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">Or continue with email</span>
          <div className="h-[1px] bg-zinc-800 flex-1"></div>
        </div>

        {/* Email/Password Form Section */}
        <div className="w-full space-y-4">
          
          {/* Email Input */}
          <div className="space-y-1">
             <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                className="w-full bg-[#18181b] border border-zinc-800 focus:border-cyan-500/30 rounded-xl px-4 py-3.5 text-zinc-200 placeholder-zinc-600 outline-none transition-all text-[15px] focus:ring-1 focus:ring-cyan-500/20 shadow-inner shadow-black/50"
             />
          </div>

          {/* Password Input */}
          <div className="space-y-1 relative">
             <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" 
                className="w-full bg-[#18181b] border border-zinc-800 focus:border-cyan-500/30 rounded-xl px-4 py-3.5 text-zinc-200 placeholder-zinc-600 outline-none transition-all text-[15px] focus:ring-1 focus:ring-cyan-500/20 shadow-inner shadow-black/50 pr-12"
             />
             <button 
               onClick={() => setShowPassword(!showPassword)}
               className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
               type="button"
             >
               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
             </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-xs text-center py-1 bg-red-500/10 border border-red-500/20 rounded-lg animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          {/* Custom Toggle Switch + Forgot Password (Login Mode Only) */}
          {mode === 'login' && (
            <div className="flex items-center justify-between px-1 pt-1">
                <div 
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => setRememberMe(!rememberMe)}
                >
                <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${rememberMe ? 'bg-[#27272a]' : 'bg-[#18181b] border border-zinc-800'}`}>
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-[4px] shadow-sm transform transition-all duration-300 flex items-center justify-center ${rememberMe ? 'translate-x-5 bg-indigo-600' : 'translate-x-0 bg-zinc-600'}`}>
                    </div>
                </div>
                <span className="text-xs text-zinc-500 font-medium select-none">Remember</span>
                </div>

                <button className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Forgot password?</button>
            </div>
          )}

          {/* The Long Animated Action Button */}
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full relative overflow-hidden group bg-[#09090b] hover:bg-black text-white py-4 rounded-full transition-all duration-300 border border-zinc-800 hover:border-zinc-700 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.1)] cursor-pointer mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
             
             {/* Animated background sheen */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
             
             {/* Right side glow blob */}
             <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 blur-[20px] opacity-40 group-hover:opacity-80 group-hover:scale-125 transition-all duration-500 rounded-full"></div>

             <div className="relative flex items-center justify-center gap-3">
                 {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
                 ) : (
                   <>
                     <span className="text-[15px] font-bold tracking-wide">
                        {mode === 'login' ? 'Log In' : 'Sign Up'}
                     </span>
                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 text-cyan-400 stroke-[2.5px]" />
                   </>
                 )}
             </div>
          </button>

          {/* Mode Switcher */}
          <div className="text-center mt-4">
            <p className="text-zinc-500 text-sm">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={toggleMode} 
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors outline-none"
                >
                    {mode === 'login' ? "Sign up" : "Log in"}
                </button>
            </p>
          </div>
          
        </div>

      </div>
    </div>
  );
};