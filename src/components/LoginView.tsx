import React, { useState } from 'react';
import { Mail, Lock, Landmark, CheckCircle2 } from 'lucide-react';
import { Language } from '../translations';

interface LoginViewProps {
  onNavigate: (view: string) => void;
  isLoggedIn: boolean;
  onLoginStateChange: (state: boolean, username: string) => void;
  loggedInUser: string;
  lang?: Language;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onNavigate,
  isLoggedIn,
  onLoginStateChange,
  loggedInUser,
  lang = 'en'
}) => {
  const [email, setEmail] = useState('david.otieno@umoja.org');
  const [password, setPassword] = useState('umoja2026');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const username = email.split('@')[0];
      onLoginStateChange(true, username);
      // Automatically redirect them to safe schools audit view after login
      onNavigate('safe-schools');
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      
      {isLoggedIn ? (
        <div className="bg-sand-bg border border-clay rounded-3xl p-12 text-center space-y-6 max-w-xl mx-auto" id="login-active-container">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="font-display font-black text-2xl text-dark-blue">Session Active</h2>
          <p className="font-sans text-sm text-gray-600 leading-relaxed">
            You are currently authenticated as coordinator <strong className="text-dark-blue">{loggedInUser}</strong>. You have permissions to submit new school audits.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('safe-schools')}
              className="px-6 py-3 rounded-xl bg-dark-blue text-white font-display font-bold text-sm cursor-pointer hover:bg-terracotta transition-colors"
            >
              Go to Safe Schools
            </button>
            <button
              onClick={() => onLoginStateChange(false, '')}
              className="px-6 py-3 rounded-xl bg-red-100 text-red-800 font-display font-bold text-sm cursor-pointer hover:bg-red-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-clay rounded-3xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-12" id="member-login-wrapper">
          
          {/* Left Side: Story & Context Narrative */}
          <div className="md:col-span-5 terracotta-gradient p-8 sm:p-10 text-white flex flex-col justify-between space-y-12 relative">
            <div className="space-y-4">
              <Landmark className="w-12 h-12 text-white/90" />
              <h2 className="font-display font-black text-3xl leading-tight">Umoja Coordinator Portal</h2>
              <p className="font-sans text-xs sm:text-sm text-clay/90 leading-relaxed">
                This secure portal is reserved for certified Umoja regional field coordinators, engineering auditors, and program directors.
              </p>
            </div>
            <div className="space-y-2 border-t border-white/10 pt-6 text-left">
              <span className="block font-display font-bold text-xs uppercase tracking-wide text-white/80">Staff Integrity</span>
              <p className="text-[10px] text-clay/60 leading-relaxed">
                Authorized session tracking logs location and diagnostic signatures to maintain full data integrity of community W.A.S.H. audits.
              </p>
            </div>
          </div>

          {/* Right Side: Interactive Inputs form */}
          <div className="md:col-span-7 p-6 sm:p-10 space-y-6">
            <div className="text-left">
              <h2 className="font-display font-black text-2xl text-dark-blue">Coordinator Sign In</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Verify credentials to edit school sanitation databases or file diagnostics.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs sm:text-sm" id="react-login-form">
              
              <div className="space-y-1.5 text-left">
                <label className="block font-semibold text-dark-blue">Authorized Staff Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta text-sm"
                    placeholder="coordinator@umoja.org"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block font-semibold text-dark-blue">Secret Password Token</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-clay text-terracotta" />
                  <span className="text-xs text-gray-500 select-none">Remember Device Security</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password recovery has been routed to the global Umoja technical support desk.')}
                  className="text-xs text-terracotta font-semibold hover:underline bg-transparent border-none cursor-pointer"
                >
                  Reset Password?
                </button>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl bg-dark-blue hover:bg-terracotta text-white font-display font-bold text-sm transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2"
                  id="react-login-submit-btn"
                >
                  {isLoading ? 'Securing Session...' : 'Authenticate & Sync'}
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-clay text-center text-xs text-gray-400">
              <p>For urgent secure registry problems, contact the East Africa regional helpdesk node.</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
