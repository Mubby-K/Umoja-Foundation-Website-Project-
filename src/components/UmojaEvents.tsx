import React from 'react';
import { 
  Calendar, MapPin, Clock, Users, Award, 
  Sparkles, Landmark, ChevronRight, X, 
  CheckCircle2, Mail, User, Info, MessageSquare 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../translations';

interface UmojaEvent {
  id: string;
  titleEn: string;
  titleSw: string;
  date: string;
  time: string;
  locationEn: string;
  locationSw: string;
  type: 'audit' | 'workshop' | 'gala' | 'field';
  typeLabelEn: string;
  typeLabelSw: string;
  descEn: string;
  descSw: string;
  rsvpCount: number;
  volunteerCount: number;
  icon: 'Landmark' | 'Sparkles' | 'Award' | 'Users';
}

const INITIAL_EVENTS: UmojaEvent[] = [
  {
    id: 'evt-ashongman-handover',
    titleEn: 'Ashongman Estate WASH Handover',
    titleSw: 'Kabidhi ya Usafi Ashongman Estate',
    date: '2026-08-14',
    time: '10:00 AM GMT',
    locationEn: 'Ashongman Estate School, Accra',
    locationSw: 'Shule ya Ashongman Estate, Accra',
    type: 'audit',
    typeLabelEn: 'Audit & Handover Ceremony',
    typeLabelSw: 'Sherehe ya Ukaguzi na Makabidhiano',
    descEn: 'Join us and school administration officials in celebrating the physical completion and key handover of our newest private school hygiene block.',
    descSw: 'Ungana nasi na maafisa wa shule kusherehekea ukamilifu na makabidhiano ya vyoo vipya vya kisasa vya wasichana.',
    rsvpCount: 28,
    volunteerCount: 5,
    icon: 'Landmark'
  },
  {
    id: 'evt-dignity-sewing',
    titleEn: 'Dignity Menstrual Hygiene Kit Workshop',
    titleSw: 'Warsha ya Kutengeneza Sodo za Heshima',
    date: '2026-09-12',
    time: '09:00 AM GMT',
    locationEn: 'Regional Education Hub, Tamale (Hybrid)',
    locationSw: 'Kituo cha Elimu cha Kikanda, Tamale (Mseto)',
    type: 'workshop',
    typeLabelEn: 'Community Workshop',
    typeLabelSw: 'Warsha ya Jamii',
    descEn: 'Help sew washable organic sanitary pads and pack complete dignity hygiene kits to be distributed to girls across rural schools.',
    descSw: 'Saidia kushona sodo za kitambaa zinazoweza kufuliwa na kufungasha vifurushi vya usafi kwa ajili ya wasichana shuleni.',
    rsvpCount: 42,
    volunteerCount: 16,
    icon: 'Sparkles'
  },
  {
    id: 'evt-gala-summit',
    titleEn: 'Umoja Annual Impact Summit & Gala',
    titleSw: 'Mkutano Mkuu na Gala ya Mwaka ya Umoja',
    date: '2026-10-24',
    time: '06:00 PM GMT',
    locationEn: 'Golden Tulip Hotel, Accra & Zoom Broadcast',
    locationSw: 'Hoteli ya Golden Tulip, Accra na Matangazo ya Zoom',
    type: 'gala',
    typeLabelEn: 'Annual Fundraising Gala',
    typeLabelSw: 'Chakula cha Jioni cha Mwaka cha Uchangishaji',
    descEn: 'An evening of powerful storytelling, traditional music, and financial pledges to support our 2027 clean water pipeline expansions.',
    descSw: 'Mkutano wa hadithi zenye nguvu, muziki wa kitamaduni, na ahadi za kifedha kufanikisha visima vipya vya mwaka 2027.',
    rsvpCount: 94,
    volunteerCount: 8,
    icon: 'Award'
  },
  {
    id: 'evt-filter-install',
    titleEn: 'Rural School Water Filter Installation Day',
    titleSw: 'Siku ya Ufungaji wa Vichungi vya Maji Shuleni',
    date: '2026-11-18',
    time: '08:00 AM GMT',
    locationEn: 'Volta Region School Districts',
    locationSw: 'Wilaya za Shule Mkoa wa Volta',
    type: 'field',
    typeLabelEn: 'On-Ground Volunteer Deployment',
    typeLabelSw: 'Kazi ya Wajitoleaji Mashambani',
    descEn: 'Hands-on training! Help our engineering team install and test physical bio-sand filters alongside students and local water committees.',
    descSw: 'Mafunzo kwa vitendo! Saidia timu yetu ya kiufundi kufunga vichungi vya mchanga vya asili na kuvifanyia majaribio.',
    rsvpCount: 19,
    volunteerCount: 12,
    icon: 'Users'
  }
];

interface UmojaEventsProps {
  lang: Language;
}

export const UmojaEvents: React.FC<UmojaEventsProps> = ({ lang }) => {
  const [events, setEvents] = React.useState<UmojaEvent[]>(() => {
    const saved = localStorage.getItem('umoja_events_rsvp_state');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [activeTab, setActiveTab] = React.useState<'all' | 'audit' | 'workshop' | 'gala' | 'field'>('all');
  const [selectedEvent, setSelectedEvent] = React.useState<UmojaEvent | null>(null);
  const [actionType, setActionType] = React.useState<'rsvp' | 'volunteer'>('rsvp');
  
  // Registration Form
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [customNote, setCustomNote] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccessCard, setShowSuccessCard] = React.useState(false);

  // Users registration log for simulation
  const [registrations, setRegistrations] = React.useState<Array<{
    eventId: string;
    fullName: string;
    email: string;
    actionType: 'rsvp' | 'volunteer';
    timestamp: string;
  }>>(() => {
    const saved = localStorage.getItem('umoja_events_registrations_log');
    return saved ? JSON.parse(saved) : [];
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !fullName.trim() || !email.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Update Event Count
      const updatedEvents = events.map(evt => {
        if (evt.id === selectedEvent.id) {
          return {
            ...evt,
            rsvpCount: actionType === 'rsvp' ? evt.rsvpCount + 1 : evt.rsvpCount,
            volunteerCount: actionType === 'volunteer' ? evt.volunteerCount + 1 : evt.volunteerCount
          };
        }
        return evt;
      });

      setEvents(updatedEvents);
      localStorage.setItem('umoja_events_rsvp_state', JSON.stringify(updatedEvents));

      // Append Registration log
      const newReg = {
        eventId: selectedEvent.id,
        fullName,
        email,
        actionType,
        timestamp: new Date().toLocaleDateString()
      };
      const updatedRegs = [...registrations, newReg];
      setRegistrations(updatedRegs);
      localStorage.setItem('umoja_events_registrations_log', JSON.stringify(updatedRegs));

      setIsSubmitting(false);
      setShowSuccessCard(true);

      // Party confetti celebration
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { x: 0.5, y: 0.6 }
      });
    }, 900);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setShowSuccessCard(false);
    setFullName('');
    setEmail('');
    setCustomNote('');
  };

  const filteredEvents = activeTab === 'all' 
    ? events 
    : events.filter(evt => evt.type === activeTab);

  const getEventIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark': return <Landmark className="w-5 h-5 text-terracotta" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'Award': return <Award className="w-5 h-5 text-amber-500" />;
      case 'Users': return <Users className="w-5 h-5 text-purple-600" />;
      default: return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white border border-clay rounded-3xl p-6 sm:p-10 space-y-8 text-left shadow-xs" id="umoja-events-component">
      
      {/* Header text */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-clay/60 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-1.5 text-xs text-terracotta font-semibold uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-terracotta" />
            <span>{lang === 'sw' ? 'Shughuli za Umoja' : 'Community Calendar'}</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-dark-blue">
            {lang === 'sw' ? 'Matukio na Warsha za Umoja' : 'Upcoming Umoja Events'}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
            {lang === 'sw'
              ? 'Fuatilia na ujiunge na mikutano yetu ya makabidhiano, warsha za usafi, na chakula cha jioni cha uchangishaji. Unaweza kujiandikisha kama mhudhuriaji au msaidizi wa kujitolea.'
              : 'Track and participate in our school facility audits, menstrual health workshops, and fundraising summits. RSVP as an attendee or register as a volunteer on specific deployment dates.'}
          </p>
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap gap-1.5 self-start shrink-0">
          {[
            { id: 'all', labelEn: 'All Events', labelSw: 'Zote' },
            { id: 'audit', labelEn: 'Audits', labelSw: 'Ukaguzi' },
            { id: 'workshop', labelEn: 'Workshops', labelSw: 'Warsha' },
            { id: 'gala', labelEn: 'Galas & Summits', labelSw: 'Chakula cha Jioni' },
            { id: 'field', labelEn: 'Field Days', labelSw: 'Kazi Nyanjani' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-display font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-dark-blue text-white'
                  : 'bg-clay/35 text-dark-blue hover:bg-clay/60'
              }`}
            >
              {lang === 'sw' ? tab.labelSw : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Events Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((evt) => {
          const title = lang === 'sw' ? evt.titleSw : evt.titleEn;
          const loc = lang === 'sw' ? evt.locationSw : evt.locationEn;
          const desc = lang === 'sw' ? evt.descSw : evt.descEn;
          const typeLabel = lang === 'sw' ? evt.typeLabelSw : evt.typeLabelEn;

          // Check if user already registered for this event
          const isRegistered = registrations.some(r => r.eventId === evt.id);

          return (
            <div 
              key={evt.id}
              className="bg-sand-bg/35 border border-clay hover:border-dark-blue/30 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200"
            >
              <div className="space-y-4 text-left">
                {/* Meta details */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-white border border-clay flex items-center justify-center shrink-0 shadow-2xs">
                      {getEventIcon(evt.icon)}
                    </div>
                    <div>
                      <span className="block text-[8px] font-sans font-black uppercase tracking-widest text-terracotta">
                        {typeLabel}
                      </span>
                      <span className="block text-[11px] font-bold text-dark-blue">
                        {new Date(evt.date).toLocaleDateString(lang === 'sw' ? 'sw-TZ' : 'en-US', {
                          weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {isRegistered && (
                    <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] rounded-full font-bold uppercase tracking-wider">
                      Signed Up
                    </span>
                  )}
                </div>

                {/* Info and desc */}
                <div className="space-y-1.5">
                  <h3 className="font-display font-black text-sm sm:text-base text-dark-blue leading-tight">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans line-clamp-3">
                    {desc}
                  </p>
                </div>

                {/* Logistics */}
                <div className="space-y-1 text-[11px] text-gray-600 font-sans border-t border-clay/60 pt-3">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{loc}</span>
                  </div>
                </div>
              </div>

              {/* Counts & Actions */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-clay/60 mt-4">
                <div className="flex space-x-3 text-[10px] text-gray-500 font-bold font-sans">
                  <span>👍 {evt.rsvpCount} Attending</span>
                  <span>🤝 {evt.volunteerCount} Volunteers</span>
                </div>

                <div className="flex space-x-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEvent(evt);
                      setActionType('rsvp');
                    }}
                    className="px-2.5 py-1.5 bg-white hover:bg-dark-blue hover:text-white border border-clay hover:border-dark-blue text-dark-blue font-display font-bold text-[10px] rounded-lg cursor-pointer transition-colors"
                  >
                    RSVP
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEvent(evt);
                      setActionType('volunteer');
                    }}
                    className="px-2.5 py-1.5 bg-terracotta hover:bg-terracotta-hover text-white font-display font-bold text-[10px] rounded-lg cursor-pointer transition-colors shadow-2xs"
                  >
                    Volunteer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RSVP / VOLUNTEER DIALOG MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-dark-blue/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-clay rounded-3xl w-full max-w-md text-dark-blue overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-dark-blue text-white px-5 py-4 flex justify-between items-center border-b border-clay">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-terracotta" />
                <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-wider">
                  {actionType === 'rsvp' 
                    ? (lang === 'sw' ? 'HIFADHI NAFASI' : 'CONFIRM ATTENDANCE')
                    : (lang === 'sw' ? 'JISAJILI KUJITOLEA' : 'REGISTER TO VOLUNTEER')
                  }
                </h3>
              </div>
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="p-5 text-left">
              {!showSuccessCard ? (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {/* Event Summary Brief */}
                  <div className="bg-sand-bg border border-clay p-3 rounded-xl space-y-1 text-xs">
                    <span className="block text-[8px] uppercase tracking-widest text-gray-400 font-extrabold font-sans">
                      Target Engagement
                    </span>
                    <h4 className="font-display font-black text-dark-blue">
                      {lang === 'sw' ? selectedEvent.titleSw : selectedEvent.titleEn}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-medium">
                      📅 {selectedEvent.date} @ {selectedEvent.time}
                    </p>
                  </div>

                  {/* Input fields */}
                  <div className="space-y-3">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold font-sans">
                        Full Name / Jina Kamili
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Mina Mensah"
                          className="w-full pl-10 pr-4 py-2 bg-white border border-clay rounded-xl text-xs font-semibold text-dark-blue focus:outline-none focus:border-dark-blue focus:ring-1 focus:ring-dark-blue/20"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold font-sans">
                        Email Address / Barua Pepe
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="mina@example.com"
                          className="w-full pl-10 pr-4 py-2 bg-white border border-clay rounded-xl text-xs font-semibold text-dark-blue focus:outline-none focus:border-dark-blue focus:ring-1 focus:ring-dark-blue/20"
                        />
                      </div>
                    </div>

                    {/* Optional Note */}
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold font-sans">
                        {actionType === 'rsvp' ? 'Special Requests' : 'Skills / Relevant Experience'}
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                        <textarea
                          value={customNote}
                          onChange={(e) => setCustomNote(e.target.value)}
                          placeholder={actionType === 'rsvp' ? "Let us know if you have accessibility requests..." : "WASH logistics, nursing student, plumbing technician, local language translator..."}
                          rows={2}
                          className="w-full pl-10 pr-4 py-2 bg-white border border-clay rounded-xl text-xs font-semibold text-dark-blue focus:outline-none focus:border-dark-blue focus:ring-1 focus:ring-dark-blue/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-clay flex space-x-2">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-1/3 py-2 border border-clay hover:bg-gray-50 rounded-xl text-dark-blue text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 py-2 bg-dark-blue hover:bg-terracotta disabled:bg-clay text-white rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-1"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1.5" />
                          <span>Registering...</span>
                        </>
                      ) : (
                        <span>Confirm Slot</span>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-black text-base text-dark-blue">
                      {lang === 'sw' ? 'Usajili Umefanikiwa!' : 'Registration Confirmed!'}
                    </h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed font-sans">
                      {lang === 'sw'
                        ? `Asante sana, ${fullName}. Tumehifadhi slot yako kama ${actionType === 'rsvp' ? 'mhudhuriaji' : 'msaidizi wa kujitolea'} kwa ajili ya: ${lang === 'sw' ? selectedEvent.titleSw : selectedEvent.titleEn}. Tutaongeza barua pepe yako (${email}) kwenye orodha ya uendeshaji.`
                        : `Thank you so much, ${fullName}! We have successfully reserved your slot as a ${actionType === 'rsvp' ? 'general attendee' : 'registered volunteer'} for "${selectedEvent.titleEn}". Operational coordinates and instructions have been dispatched to ${email}.`}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-5 py-2 bg-dark-blue hover:bg-terracotta text-white rounded-xl text-xs font-display font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-sm"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
