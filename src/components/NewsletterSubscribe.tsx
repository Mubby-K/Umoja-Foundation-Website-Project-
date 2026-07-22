import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { Language } from '../translations';

interface NewsletterSubscribeProps {
  lang?: Language;
}

export const NewsletterSubscribe: React.FC<NewsletterSubscribeProps> = ({ lang = 'en' }) => {
  const [email, setEmail] = useState('');
  const [subscribedEmails, setSubscribedEmails] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Translations dictionary
  const t = {
    en: {
      title: "Receive Monthly Impact Reports",
      subtitle: "Stay updated with real-time solar pump telemetry, newly completed deep-boreholes, and public WASH audit registers from the field.",
      placeholder: "Enter your primary email address",
      buttonText: "Subscribe for Updates",
      success: "Thank you for subscribing! We've sent a simulated confirmation to",
      alreadySubscribed: "This email is already subscribed to our monthly updates.",
      invalidEmail: "Please enter a valid email address.",
      secureNotice: "Your email is protected by NGO data compliance rules. No spam, ever.",
      recentSubscribers: "Active Subscribers (In this session)",
      loadingText: "Processing..."
    },
    sw: {
      title: "Pokea Ripoti za Athari za Kila Mwezi",
      subtitle: "Pata taarifa za hivi punde kuhusu vipimo vya pampu za jua, visima vipya vilivyokamilika, na kumbukumbu za ukaguzi wa WASH nyanjani.",
      placeholder: "Weka barua pepe yako ya msingi",
      buttonText: "Jisajili kwa Taarifa",
      success: "Asante kwa kujiunga! Tumetuma uthibitisho wa mfano kwa",
      alreadySubscribed: "Barua pepe hii tayari imesajiliwa kwenye taarifa zetu za kila mwezi.",
      invalidEmail: "Tafadhali weka barua pepe halali.",
      secureNotice: "Barua pepe yako inalindwa na sheria za NGO. Hakuna barua taka, kamwe.",
      recentSubscribers: "Wanaofuatilia kwa Sasa (Katika kipindi hiki)",
      loadingText: "Inatayarisha..."
    }
  };

  const currentTranslations = t[lang] || t.en;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setErrorMessage(currentTranslations.invalidEmail);
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage(currentTranslations.invalidEmail);
      return;
    }

    if (subscribedEmails.includes(trimmedEmail)) {
      setErrorMessage(currentTranslations.alreadySubscribed);
      return;
    }

    setLoading(true);

    // Simulate short network delay for polished UX
    setTimeout(() => {
      setLoading(false);
      setSubscribedEmails(prev => [trimmedEmail, ...prev]);
      setSuccessMessage(`${currentTranslations.success} ${trimmedEmail}`);
      setEmail('');
    }, 800);
  };

  return (
    <section 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" 
      id="newsletter-subscribe-section"
    >
      <div className="bg-white border-2 border-clay rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-dark-blue/5 rounded-tr-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Header & text content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-terracotta/10 border border-terracotta/20 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider text-terracotta uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'sw' ? 'Habari za Athari' : 'Impact Newsletter'}</span>
            </div>
            
            <h2 className="font-display font-black text-2xl sm:text-3xl text-dark-blue leading-tight">
              {currentTranslations.title}
            </h2>
            
            <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xl">
              {currentTranslations.subtitle}
            </p>

            <div className="flex items-center space-x-2 text-[11px] text-gray-400 font-sans pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
              <span>{currentTranslations.secureNotice}</span>
            </div>
          </div>

          {/* Form and submission status */}
          <div className="lg:col-span-5 space-y-4">
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative rounded-2xl border border-clay bg-sand-bg/30 focus-within:border-terracotta focus-within:ring-1 focus-within:ring-terracotta/30 transition-all p-1.5 flex items-center">
                <div className="pl-3 text-gray-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={currentTranslations.placeholder}
                  disabled={loading}
                  className="w-full pl-2.5 pr-2 py-2 bg-transparent text-xs sm:text-sm text-dark-blue font-sans focus:outline-none placeholder-gray-400/80 disabled:opacity-60"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl font-display font-bold text-xs bg-dark-blue text-white hover:bg-terracotta transition-colors shadow-sm disabled:opacity-60 shrink-0 cursor-pointer"
                >
                  {loading ? currentTranslations.loadingText : currentTranslations.buttonText}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </div>

              {/* Mobile layout fallback button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:hidden flex items-center justify-center py-3 rounded-xl font-display font-bold text-xs bg-dark-blue text-white hover:bg-terracotta transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
              >
                {loading ? currentTranslations.loadingText : currentTranslations.buttonText}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </form>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-sans flex items-start space-x-2 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl font-sans flex items-start space-x-2 animate-in fade-in duration-200">
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Simulated Live Subscribers List to show state changes */}
            {subscribedEmails.length > 0 && (
              <div className="pt-4 border-t border-clay/60 space-y-2 animate-in fade-in duration-300">
                <span className="block font-sans font-bold text-[10px] uppercase tracking-wider text-gray-400">
                  {currentTranslations.recentSubscribers}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {subscribedEmails.map((sub, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 bg-clay/40 border border-clay text-dark-blue font-sans text-[10px] rounded-lg animate-in slide-in-from-top-1 duration-200"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
