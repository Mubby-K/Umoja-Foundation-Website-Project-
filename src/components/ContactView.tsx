import React from 'react';
import { ContactMessage } from '../types';
import { Mail, Phone, MapPin, Send, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';

interface ContactViewProps {
  onSendMessage: (msg: ContactMessage) => void;
  sentMessagesState: ContactMessage[];
  lang?: Language;
}

export const ContactView: React.FC<ContactViewProps> = ({ onSendMessage, sentMessagesState, lang = 'en' }) => {
  const [formName, setFormName] = React.useState('');
  const [formEmail, setFormEmail] = React.useState('');
  const [formSubject, setFormSubject] = React.useState('');
  const [formMessage, setFormMessage] = React.useState('');
  
  const [showNotification, setShowNotification] = React.useState(false);

  const t = TRANSLATIONS[lang];

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) return;

    const newMsg: ContactMessage = {
      name: formName,
      email: formEmail,
      subject: formSubject || 'General Inquiry',
      message: formMessage,
      date: new Date().toLocaleTimeString()
    };

    onSendMessage(newMsg);
    setFormName('');
    setFormEmail('');
    setFormSubject('');
    setFormMessage('');
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: OFFICE CONTACT INFORMATION DETAILS */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">
              {lang === 'sw' ? 'Unganisha Nyanjani' : 'Connect on the Ground'}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-dark-blue">
              {t.contact}
            </h1>
            <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed">
              {lang === 'sw' 
                ? 'Je, una maswali kuhusu vipimo vyetu vya kodi, ramani za visima vya nishati ya jua, au vifaa vya heshima vya wasichana? Waratibu wetu nyanjani wako tayari kutoa msaada.' 
                : 'Have questions about our tax-deductible metrics, borehole blueprints, or dignity kit supply intervals? Our operations coordinators are ready to support your inquiry.'}
            </p>
          </div>

          <div className="bg-sand-bg border border-clay p-6 rounded-2xl space-y-6">
            <h3 className="font-display font-bold text-sm uppercase tracking-wide text-dark-blue border-b border-clay pb-2">
              {lang === 'sw' ? 'Maelezo ya Ofisi Kuu ya Accra' : 'HQ Accra Office Details'}
            </h3>
            
            <ul className="space-y-4 font-sans text-sm text-gray-700">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                <span>Accra Central Business District, Greater Accra Region, Ghana</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-terracotta shrink-0" />
                <span>+233 (0) 55 843 3835</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-terracotta shrink-0" />
                <span className="break-all">theumojafoundationec@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* DYNAMIC SIMULATED OUTBOX CONTAINER */}
          {sentMessagesState.length > 0 && (
            <div className="bg-clay/30 border border-clay p-6 rounded-2xl space-y-4" id="simulated-contact-outbox">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-dark-blue flex items-center">
                <FileText className="w-4 h-4 mr-1.5 text-terracotta" />
                <span>
                  {lang === 'sw' ? `Kikasha cha Mfano cha Outbox (${sentMessagesState.length})` : `Simulated Message Outbox (${sentMessagesState.length})`}
                </span>
              </h3>
              <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                {sentMessagesState.map((msg, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-clay space-y-1 text-xs">
                    <div className="flex justify-between font-semibold text-dark-blue">
                      <span className="truncate max-w-[120px]">{msg.name}</span>
                      <span className="text-gray-400 font-normal">{msg.date}</span>
                    </div>
                    <span className="block text-[11px] font-medium text-terracotta truncate">{msg.subject}</span>
                    <p className="text-gray-500 italic mt-1 line-clamp-2 leading-relaxed">
                      "{msg.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: MESSAGING FORM INPUT CONSOLE */}
        <div className="lg:col-span-7 bg-white border border-clay p-6 sm:p-10 rounded-3xl shadow-sm relative">
          
          <div className="space-y-1.5 mb-6">
            <h2 className="font-display font-black text-xl sm:text-2xl text-dark-blue">Send Us A Message</h2>
            <p className="font-sans text-xs sm:text-sm text-gray-500">
              Complete the credentials below to register your inquiry on our communication channel.
            </p>
          </div>

          {showNotification && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs rounded-2xl font-sans flex items-center mb-6 animate-in slide-in-from-top-2">
              <CheckCircle2 className="w-4.5 h-4.5 mr-2 text-green-600 shrink-0" />
              <span>Your message has been securely sent! It was added to your simulated browser outbox on the left.</span>
            </div>
          )}

          <form onSubmit={handleMessageSubmit} className="space-y-4 font-sans text-xs sm:text-sm">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-semibold text-dark-blue">Your Name</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta"
                  placeholder="e.g. Ama Serwaa"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-semibold text-dark-blue">Your Email Address</label>
                <input 
                  type="email" 
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta"
                  placeholder="e.g. ama@domain.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-semibold text-dark-blue">Subject Category</label>
              <input 
                type="text" 
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                className="w-full px-4 py-2.5 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta"
                placeholder="e.g. Water borehole sponsorship, corporate partnership"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-semibold text-dark-blue">Your Message Contents</label>
              <textarea 
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta resize-none leading-relaxed"
                placeholder="Type your inquiry details here..."
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-dark-blue hover:bg-terracotta text-white font-display font-bold text-xs sm:text-sm transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2"
                id="submit-contact-form"
              >
                <Send className="w-4 h-4" />
                <span>Submit Secure Inquiry</span>
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};
