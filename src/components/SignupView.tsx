import React, { useState } from 'react';
import { User, Mail, Phone, Landmark, CheckCircle2 } from 'lucide-react';
import { Language } from '../translations';

interface SignupViewProps {
  onNavigate: (view: string) => void;
  onAutoLogin?: (name: string) => void;
  lang?: Language;
}

export const SignupView: React.FC<SignupViewProps> = ({ onNavigate, onAutoLogin, lang = 'en' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (onAutoLogin) {
      onAutoLogin(name);
    }
    setSuccess(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      {success ? (
        <div className="bg-sand-bg border border-clay rounded-3xl p-12 text-center space-y-6 max-w-xl mx-auto" id="signup-success-container">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="font-display font-black text-2xl text-dark-blue">Welcome, {name}!</h2>
          <p className="font-sans text-sm text-gray-600 leading-relaxed">
            Your member profile has been registered successfully. You have been logged in automatically. We have queued a welcome kit, resource materials, and onboarding booklets to be delivered to <strong className="text-dark-blue">{email}</strong>.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('profile')}
              className="px-6 py-3 rounded-xl bg-terracotta text-white font-display font-bold text-sm cursor-pointer hover:bg-terracotta-hover transition-colors"
            >
              Go to My Profile
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-xl bg-dark-blue text-white font-display font-bold text-sm cursor-pointer hover:bg-clay transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-clay rounded-3xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-12" id="member-signup-wrapper">
          
          {/* Left Side: Dynamic Story Narrative */}
          <div className="md:col-span-5 terracotta-gradient p-8 sm:p-10 text-white flex flex-col justify-between space-y-12 relative">
            <div className="space-y-4">
              <Landmark className="w-12 h-12 text-white/90" />
              <h2 className="font-display font-black text-3xl leading-tight">Support Local Water Autonomy</h2>
              <p className="font-sans text-xs sm:text-sm text-clay/90 leading-relaxed">
                Sign up as a registered community member to stay updated on school construction timelines, local volunteer opportunities, and receive detailed quarterly hygiene audits.
              </p>
            </div>
            <div className="space-y-2 border-t border-white/10 pt-6">
              <span className="block font-display font-bold text-xs uppercase tracking-wide text-white/80">Authorized Registry</span>
              <p className="text-[10px] text-clay/60 leading-relaxed">
                Umoja is offline-first compliant. There is no financial fee to register. We welcome your voice, skills, and local structural advocacy to spread sanitation safety.
              </p>
            </div>
          </div>

          {/* Right Side: Interactive Inputs form */}
          <div className="md:col-span-7 p-6 sm:p-10 space-y-6">
            <div>
              <h2 className="font-display font-black text-2xl text-dark-blue">Become a Member</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Fill out the parameters below to launch your community member profile.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs sm:text-sm" id="react-signup-form">
              <div className="space-y-1.5 text-left">
                <label className="block font-semibold text-dark-blue">Your Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta text-sm"
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block font-semibold text-dark-blue">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta text-sm"
                    placeholder="e.g. john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block font-semibold text-dark-blue">Phone Number (Optional)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta text-sm"
                    placeholder="e.g. +254 700 000 000"
                  />
                </div>
              </div>

              <div className="pt-2 text-left">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isVolunteer}
                    onChange={(e) => setIsVolunteer(e.target.checked)}
                    className="w-4 h-4 rounded border-clay text-terracotta mt-0.5" 
                  />
                  <span className="text-xs text-gray-500 leading-relaxed select-none">
                    I would like to receive notifications for regional volunteering days or local construction audits.
                  </span>
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-dark-blue hover:bg-terracotta text-white font-display font-bold text-sm transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
                  id="react-signup-submit-btn"
                >
                  Join Our Mission
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-clay text-center text-xs text-gray-400">
              <p>By boarding the Umoja Advocate system, you agree to our direct compliance frameworks and data transparency integrity rules.</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
