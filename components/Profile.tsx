import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';

interface ProfileProps {
  onBack: () => void;
  onLogout: () => void;
  onUpgrade?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onBack, onLogout }) => {
  // Read initial state from localStorage
  const storedName = localStorage.getItem('ostra_user_name');
  const storedEmail = localStorage.getItem('ostra_user_email');
  
  const [name, setName] = useState(storedName || 'Demo User');
  const [email, setEmail] = useState(storedEmail || 'demo@ostra.com');
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  
  // Loading States
  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{section: string, type: 'success'|'error', text: string} | null>(null);

  const handleUpdateName = async () => {
    setLoadingSection('name');
    setStatusMsg(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Update persistent storage
      localStorage.setItem('ostra_user_name', name);
      setStatusMsg({ section: 'name', type: 'success', text: 'Name updated successfully.' });
    } catch (error: any) {
      setStatusMsg({ section: 'name', type: 'error', text: 'Failed to update name.' });
    } finally {
      setLoadingSection(null);
    }
  };

  const handleUpdateEmail = async () => {
    setLoadingSection('email');
    setStatusMsg(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Update persistent storage
      localStorage.setItem('ostra_user_email', email);
      setStatusMsg({ section: 'email', type: 'success', text: 'Email updated successfully.' });
    } catch (error: any) {
      setStatusMsg({ section: 'email', type: 'error', text: 'Failed to update email.' });
    } finally {
      setLoadingSection(null);
    }
  };

  const handleUpdatePassword = async () => {
    setLoadingSection('password');
    setStatusMsg(null);
    try {
      if (newPwd.length < 8) {
          throw new Error("Password must be at least 8 characters.");
      }
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatusMsg({ section: 'password', type: 'success', text: 'Password updated successfully.' });
      setCurrentPwd('');
      setNewPwd('');
    } catch (error: any) {
       setStatusMsg({ section: 'password', type: 'error', text: error.message });
    } finally {
      setLoadingSection(null);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

    setLoadingSection('delete');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Clear data is handled by logout mostly, but let's be explicit
      localStorage.removeItem('ostra_user_name');
      localStorage.removeItem('ostra_user_email');
      onLogout();
    } catch (error: any) {
      setStatusMsg({ section: 'delete', type: 'error', text: "Error deleting account." });
      setLoadingSection(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20 px-4 md:px-6 font-sans relative">
        {/* Background Gradients */}
       <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
       </div>

      <div className="max-w-[700px] mx-auto relative z-10">
        
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-sm font-medium group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="space-y-6">
            
            {/* --- NAME SECTION --- */}
            <div className="bg-[#0c0c0e] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white mb-2">Name</h2>
                    <p className="text-zinc-400 text-sm">Please enter your full name, or a display name.</p>
                </div>
                
                <div className="mb-8">
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#121214] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all text-sm"
                        placeholder="Your Name"
                        maxLength={32}
                    />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-zinc-500">Please use 32 characters at maximum.</span>
                    <button 
                        onClick={handleUpdateName}
                        disabled={loadingSection === 'name'}
                        className="bg-white text-black hover:bg-zinc-200 px-6 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 flex items-center gap-2 min-w-[80px] justify-center"
                    >
                        {loadingSection === 'name' ? <Loader2 size={16} className="animate-spin"/> : 'Save'}
                    </button>
                </div>
                {statusMsg?.section === 'name' && (
                    <p className={`mt-4 text-xs ${statusMsg.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {statusMsg.text}
                    </p>
                )}
            </div>

            {/* --- EMAIL SECTION --- */}
            <div className="bg-[#0c0c0e] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white mb-2">Email</h2>
                    <p className="text-zinc-400 text-sm">Enter the email address you want to use to log in.</p>
                </div>
                
                <div className="mb-8">
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#121214] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all text-sm"
                        placeholder="email@example.com"
                    />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-zinc-500">Please enter a valid email address.</span>
                    <button 
                         onClick={handleUpdateEmail}
                         disabled={loadingSection === 'email'}
                        className="bg-white text-black hover:bg-zinc-200 px-6 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 flex items-center gap-2 min-w-[80px] justify-center"
                    >
                        {loadingSection === 'email' ? <Loader2 size={16} className="animate-spin"/> : 'Save'}
                    </button>
                </div>
                {statusMsg?.section === 'email' && (
                    <p className={`mt-4 text-xs ${statusMsg.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {statusMsg.text}
                    </p>
                )}
            </div>

            {/* --- PASSWORD SECTION --- */}
            <div className="bg-[#0c0c0e] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white mb-2">Change Password</h2>
                    <p className="text-zinc-400 text-sm">Enter your current password and a new password.</p>
                </div>
                
                <div className="space-y-5 mb-8">
                    <div>
                        <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Current Password</label>
                        <input 
                            type="password" 
                            value={currentPwd}
                            onChange={(e) => setCurrentPwd(e.target.value)}
                            className="w-full bg-[#121214] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all text-sm"
                            placeholder="Current Password"
                        />
                    </div>
                    <div className="relative">
                        <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">New Password</label>
                        <input 
                            type={showPwd ? "text" : "password"} 
                            value={newPwd}
                            onChange={(e) => setNewPwd(e.target.value)}
                            className="w-full bg-[#121214] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all text-sm pr-10"
                            placeholder="New Password"
                        />
                        <button 
                            onClick={() => setShowPwd(!showPwd)}
                            className="absolute right-3 top-[34px] text-zinc-500 hover:text-zinc-300"
                        >
                            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-zinc-500">Please use 8 characters at minimum.</span>
                    <button 
                        onClick={handleUpdatePassword}
                        disabled={loadingSection === 'password'}
                        className="bg-white text-black hover:bg-zinc-200 px-6 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 flex items-center gap-2 min-w-[80px] justify-center"
                    >
                         {loadingSection === 'password' ? <Loader2 size={16} className="animate-spin"/> : 'Save'}
                    </button>
                </div>
                {statusMsg?.section === 'password' && (
                    <p className={`mt-4 text-xs ${statusMsg.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {statusMsg.text}
                    </p>
                )}
            </div>

            {/* --- DELETE ACCOUNT SECTION --- */}
            <div className="bg-[#0c0c0e] border border-red-500/20 rounded-2xl overflow-hidden shadow-xl shadow-red-900/5">
                <div className="p-6 md:p-8">
                    <h2 className="text-xl font-bold text-white mb-2">Delete Account</h2>
                    <p className="text-zinc-400 text-sm">Permanently remove your account and all of its contents. This action is not reversible, so please continue with caution.</p>
                </div>
                
                <div className="bg-[#1a0505] p-4 flex justify-end border-t border-red-500/10">
                    <button 
                        onClick={handleDeleteAccount}
                        disabled={loadingSection === 'delete'}
                        className="bg-[#451010] hover:bg-[#591414] text-red-200 hover:text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors border border-red-500/20 disabled:opacity-50 flex items-center gap-2"
                    >
                        {loadingSection === 'delete' ? <Loader2 size={16} className="animate-spin"/> : 'Delete Account'}
                    </button>
                </div>
                {statusMsg?.section === 'delete' && (
                    <p className="p-4 pt-0 text-xs text-red-400 text-right bg-[#1a0505]">
                        {statusMsg.text}
                    </p>
                )}
            </div>

        </div>
      </div>
    </div>
  );
};