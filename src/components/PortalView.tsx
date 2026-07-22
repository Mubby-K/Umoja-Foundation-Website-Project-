import React from 'react';
import { Landmark, User, Mail, Lock, CheckCircle2, Award, Users2, Download, ClipboardCheck, ArrowRight, HelpCircle } from 'lucide-react';

interface PortalViewProps {
  isLoggedIn: boolean;
  onLoginStateChange: (state: boolean, username: string) => void;
  loggedInUser: string;
}

export const PortalView: React.FC<PortalViewProps> = ({
  isLoggedIn,
  onLoginStateChange,
  loggedInUser
}) => {
  const [activeTab, setActiveTab] = React.useState<'login' | 'signup'>('signup');
  
  // Auth Form Inputs
  const [authName, setAuthName] = React.useState('');
  const [authEmail, setAuthEmail] = React.useState('');
  const [authPass, setAuthPass] = React.useState('');

  // Volunteer Coordinator Panel State
  const [volunteerSlots, setVolunteerSlots] = React.useState([
    { id: 'v-1', role: 'Menstrual Health Educator', location: 'Eastern Region Primary', date: '2026-08-05', seatsLeft: 3, claimed: false },
    { id: 'v-2', role: 'Borehole Flow Auditor', location: 'Brong-Ahafo Compound', date: '2026-08-12', seatsLeft: 1, claimed: false },
    { id: 'v-3', role: 'WASH Materials Logistics', location: 'Accra Office Headquarters', date: '2026-08-20', seatsLeft: 5, claimed: false }
  ]);

  const [downloadProgress, setDownloadProgress] = React.useState<string | null>(null);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'signup' && !authName.trim()) return;
    if (!authEmail.trim() || !authPass.trim()) return;

    const username = activeTab === 'signup' ? authName : authEmail.split('@')[0];
    onLoginStateChange(true, username);
  };

  const handleClaimSlot = (id: string) => {
    setVolunteerSlots(prev => prev.map(slot => {
      if (slot.id === id) {
        if (slot.claimed) {
          return { ...slot, seatsLeft: slot.seatsLeft + 1, claimed: false };
        } else if (slot.seatsLeft > 0) {
          return { ...slot, seatsLeft: slot.seatsLeft - 1, claimed: true };
        }
      }
      return slot;
    }));
  };

  const handleDownloadToolkit = (filename: string) => {
    setDownloadProgress(`Preparing direct download queue for "${filename}"...`);
    setTimeout(() => {
      setDownloadProgress(`Successfully downloaded: ${filename}.pdf (Simulated in local sandbox)`);
      setTimeout(() => setDownloadProgress(null), 4000);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      
      {isLoggedIn ? (
        /* LOGGED IN MEMBER PANEL INTERFACE */
        <div className="space-y-12" id="member-active-dashboard">
          
          {/* Welcome Dashboard Strip */}
          <div className="bg-dark-blue rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Landmark className="w-48 h-48" />
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-terracotta/20 border border-terracotta/30 text-terracotta text-xs font-bold uppercase rounded-full">
                <Award className="w-4 h-4" />
                <span>Verified Field Advocate</span>
              </div>
              <div className="space-y-1">
                <h1 className="font-display font-black text-3xl sm:text-4xl">Welcome, {loggedInUser}!</h1>
                <p className="font-sans text-sm text-clay/90">
                  Umoja Coordinator Portal • Active session mapped from Accra baseline database.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onLoginStateChange(false, '')}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-sans font-bold text-xs cursor-pointer border border-white/20 self-start"
                >
                  Sign Out of Session
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* VOLUNTEER COORDINATION LIST (LEFT) */}
            <div className="lg:col-span-7 bg-white border border-clay p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
              <div className="space-y-1.5">
                <h2 className="font-display font-black text-lg sm:text-xl text-dark-blue flex items-center">
                  <Users2 className="w-5.5 h-5.5 mr-1.5 text-terracotta" />
                  <span>Your Active Ground Missions</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-gray-500">
                  Register directly for upcoming health workshop coordination cycles or borehole flow audits in Ghana.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                {volunteerSlots.map(slot => (
                  <div key={slot.id} className="p-4 bg-sand-bg border border-clay rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <span className="block font-display font-bold text-dark-blue">{slot.role}</span>
                      <span className="block text-xs text-gray-500">{slot.location} • slates for: <strong className="text-dark-blue">{slot.date}</strong></span>
                      <span className="inline-block text-[10px] uppercase font-bold text-terracotta">
                        {slot.claimed ? 'Joined successfully ✓' : `${slot.seatsLeft} slot(s) remaining`}
                      </span>
                    </div>

                    <button
                      onClick={() => handleClaimSlot(slot.id)}
                      disabled={slot.seatsLeft === 0 && !slot.claimed}
                      className={`w-full sm:w-auto px-4 py-2 rounded-xl font-display font-bold text-xs transition-colors cursor-pointer text-center ${
                        slot.claimed 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : slot.seatsLeft === 0 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-dark-blue text-white hover:bg-terracotta'
                      }`}
                    >
                      {slot.claimed ? 'Leave Slot' : slot.seatsLeft === 0 ? 'Full' : 'Join Mission'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* DOWNLOADABLE ADVOCACY CAMPAIGN TOOLKITS (RIGHT) */}
            <div className="lg:col-span-5 bg-clay/30 border border-clay p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-black text-base sm:text-lg text-dark-blue flex items-center">
                  <Download className="w-5 h-5 mr-1.5 text-terracotta" />
                  <span>Advocacy Campaign Media Kit</span>
                </h3>
                <p className="font-sans text-xs text-gray-500">
                  Download certified blueprints and informational whitepapers to lobby local agencies.
                </p>
              </div>

              {downloadProgress && (
                <div className="p-3 bg-white/80 border border-clay text-dark-blue font-sans text-xs rounded-xl animate-pulse">
                  {downloadProgress}
                </div>
              )}

              <div className="space-y-2.5 pt-2">
                {[
                  { name: 'Umoja_Sanitation_Baseline_Checklist', size: '2.4 MB' },
                  { name: 'Menstrual_Hygiene_Educators_Guide', size: '4.8 MB' },
                  { name: 'Solar_Water_Borehole_Blueprint', size: '12.1 MB' }
                ].map(file => (
                  <button
                    key={file.name}
                    onClick={() => handleDownloadToolkit(file.name)}
                    className="w-full text-left px-4 py-3 bg-white border border-clay rounded-xl hover:border-terracotta hover:shadow-sm transition-all flex justify-between items-center text-xs cursor-pointer group"
                  >
                    <div className="font-sans">
                      <span className="block font-medium text-dark-blue group-hover:text-terracotta truncate max-w-[200px]">{file.name}.pdf</span>
                      <span className="block text-gray-400 mt-0.5">{file.size}</span>
                    </div>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-terracotta group-hover:translate-y-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* LOGIN / SIGNUP PORTAL GATEWAY */
        <div className="bg-white border border-clay rounded-3xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-12" id="member-gateway-wrapper">
          
          {/* LEFT STORY NARRATIVE BLOCK */}
          <div className="md:col-span-5 terracotta-gradient p-8 sm:p-10 text-white flex flex-col justify-between space-y-12 relative">
            <div className="space-y-4">
              <Landmark className="w-12 h-12 text-white/90" />
              <h2 className="font-display font-black text-3xl leading-tight">Join Our Global Advocate Circle</h2>
              <p className="font-sans text-xs sm:text-sm text-clay/90 leading-relaxed">
                Unlock specialized volunteer databases, download complete campaign materials, and report custom regional sanitation data directly to public planners.
              </p>
            </div>
            <div className="space-y-2 border-t border-white/10 pt-6">
              <span className="block font-display font-bold text-xs uppercase tracking-wide text-white/80">Authorized Node Security</span>
              <p className="text-[10px] text-clay/60 leading-relaxed">
                By boarding the Umoja Advocate system, you agree to our direct compliance frameworks and data transparency integrity rules.
              </p>
            </div>
          </div>

          {/* RIGHT CREDENTIAL FORM Portal */}
          <div className="md:col-span-7 p-6 sm:p-10 space-y-6">
            
            {/* Selector tabs */}
            <div className="flex border-b border-clay pb-4">
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2.5 text-center font-display font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer ${
                  activeTab === 'signup' ? 'border-terracotta text-terracotta font-extrabold' : 'border-transparent text-gray-400'
                }`}
              >
                Become a Member (Signup)
              </button>
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 text-center font-display font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer ${
                  activeTab === 'login' ? 'border-terracotta text-terracotta font-extrabold' : 'border-transparent text-gray-400'
                }`}
              >
                Admin / Coordinator Login
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4 font-sans text-xs sm:text-sm" id="auth-portal-form">
              
              {activeTab === 'signup' && (
                <div className="space-y-1.5">
                  <label className="block font-semibold text-dark-blue">Full Legal Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta text-sm"
                      placeholder="e.g. Ama Serwaa"
                      required={activeTab === 'signup'}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block font-semibold text-dark-blue">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="email" 
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta text-sm"
                    placeholder="e.g. ama@domain.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-dark-blue">Security Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="password" 
                    value={authPass}
                    onChange={(e) => setAuthPass(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {activeTab === 'signup' && (
                <div className="pt-1">
                  <label className="flex items-start space-x-2.5 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-clay text-terracotta mt-0.5" required />
                    <span className="text-xs text-gray-500 leading-relaxed">
                      I agree to the <span className="text-terracotta underline">Terms of Service</span> and <span className="text-terracotta underline">Transparency Policy</span>.
                    </span>
                  </label>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-dark-blue hover:bg-terracotta text-white font-display font-bold text-sm transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  {activeTab === 'signup' ? 'Create Advocate Account' : 'Authenticate Credentials'}
                </button>
              </div>

            </form>

            <div className="pt-4 border-t border-clay text-center text-xs text-gray-400">
              <p>For urgent secure registry problems, contact the Greater Accra coordination node.</p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
