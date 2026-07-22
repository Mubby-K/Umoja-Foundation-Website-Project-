import React from 'react';
import { TEAM, PILLARS } from '../data';
import { Users, FileText, Settings, ShieldCheck, Heart, Info, Landmark } from 'lucide-react';
import { Testimonials } from './Testimonials';
import { Language, TRANSLATIONS } from '../translations';
import { ImpactFAQ } from './ImpactFAQ';
import { UmojaEvents } from './UmojaEvents';

interface AboutViewProps {
  onNavigate: (view: string) => void;
  isLoggedIn: boolean;
  loggedInUser: string;
  lang?: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, isLoggedIn, loggedInUser, lang = 'en' }) => {
  const [selectedBio, setSelectedBio] = React.useState<string | null>(null);
  const t = TRANSLATIONS[lang];

  // Financial allocations for accountability
  const allocations = [
    { 
      label: lang === 'sw' ? 'Vifaa vya Miundombinu' : 'Ground Infrastructure Materials', 
      percent: 55, 
      color: 'bg-terracotta' 
    },
    { 
      label: lang === 'sw' ? 'Warsha za Afya na Vifaa vya Heshima' : 'Health Education Workshops & Dignity Kits', 
      percent: 24, 
      color: 'bg-dark-blue' 
    },
    { 
      label: lang === 'sw' ? 'Ukaguzi wa Usafi na Timu za Nyanjani' : 'School Sanitation Audits & Mobile Teams', 
      percent: 15, 
      color: 'bg-accent-gold' 
    },
    { 
      label: lang === 'sw' ? 'Uendeshaji wa Utawala na Usalama' : 'Administrative & Security Compliance Operations', 
      percent: 6, 
      color: 'bg-gray-400' 
    }
  ];

  return (
    <div className="space-y-16 py-4 animate-in fade-in duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-xl">
        <div className="absolute inset-0 bg-dark-blue/80 z-10" />
        <img 
          src="/src/assets/images/education_center_1784559922230.jpg" 
          alt="Umoja Foundation Community Education Center" 
          className="absolute inset-0 w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-8 py-20 text-center text-white space-y-4">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">
            {lang === 'sw' ? 'Hadithi Yetu' : 'Our Story'}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight leading-tight">
            {t.aboutTitle}
          </h1>
          <p className="font-sans text-sm sm:text-base text-clay max-w-2xl mx-auto leading-relaxed">
            {t.aboutSub}
          </p>
        </div>
      </section>

      {/* 2. THE MISSION STATEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="about-mission">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-dark-blue">
            {lang === 'sw' ? 'Kuwezesha Jamii, Kuinua Mustakabali' : 'Empowering Communities, Elevating Futures'}
          </h2>
          <p className="font-sans text-base sm:text-lg text-gray-600 leading-relaxed">
            {t.missionDesc}
          </p>
        </div>

        {/* Dynamic Image Split Section for Dialogues */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-sand-bg border border-clay rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="lg:col-span-7 space-y-4">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">
              {lang === 'sw' ? 'Ushiriki wa Ndani' : 'Local Engagement'}
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl text-dark-blue">
              {lang === 'sw' ? 'Mijadala ya Maendeleo ya Jamii' : 'Community Development Dialogues'}
            </h3>
            <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
              {lang === 'sw' 
                ? 'Hatutoi suluhisho kutoka juu kwenda chini. Badala yake, tunaanzisha mazungumzo ya moja kwa moja na machifu wa jadi wa kikanda, wazee, wazazi, na bodi za shule. Mbinu hii ya chini kwenda juu inaanzisha umiliki wa kina wa vifaa, kuhakikisha uendeshaji unaoendelea na usalama kwa wasichana wetu.' 
                : 'We do not impose top-down solutions. Instead, we initiate direct dialogue with local traditional chiefs, elders, parents, and school boards right under the shade of native trees. This bottom-up approach establishes deep local ownership of facilities, ensuring continuous operational maintenance and safety logs for our girls.'}
            </p>
            <div className="flex items-center space-x-2 text-xs font-bold text-dark-blue">
              <span className="w-2 h-2 rounded-full bg-terracotta" />
              <span>{lang === 'sw' ? 'Kuzingatia upelekaji katika wilaya za vijijini.' : 'Ashongman Estate, Accra and rural districts deployment focus.'}</span>
            </div>
          </div>
          <div className="lg:col-span-5 h-64 sm:h-80 rounded-2xl overflow-hidden border border-clay relative shadow-inner">
            <img 
              src="/src/assets/images/community_meeting_1784559901061.jpg" 
              alt="Community development meeting under tree" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 3. THE 3 GUIDING PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-sand-bg rounded-3xl border border-clay" id="about-pillars">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">
            {lang === 'sw' ? 'Mfumo wa Uendeshaji' : 'Operational Framework'}
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-dark-blue mt-1">
            {lang === 'sw' ? 'Nguzo Zetu Kuu' : 'Our Core Pillars'}
          </h2>
          <p className="font-sans text-sm text-gray-500 mt-2">
            {lang === 'sw' 
              ? 'Jinsi tunavyohakikisha kuwa kila mchango unafanikisha uboreshaji wa jamii wa muda mrefu.' 
              : 'How we ensure that every contribution results in long-term, self-sufficient community improvement.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => {
            const resolvedTitle = lang === 'sw' 
              ? (idx === 0 ? 'Ushirikiano wa Jamii' : idx === 1 ? 'Ukaguzi wa Data' : 'Suluhisho Endelevu')
              : pillar.title;
            const resolvedDesc = lang === 'sw'
              ? (idx === 0 
                  ? 'Tunafanya kazi bega kwa bega na watetezi wa kikanda, machifu wa jadi, na bodi za shule ili kujenga umiliki wa ndani.' 
                  : idx === 1 
                  ? 'Kukusanya mara kwa mara vipimo vya mazingira ya umma ili kuonyesha maeneo yenye upungufu na kufuatilia uwajibikaji.'
                  : 'Ujenzi wa miundombinu ya muda mrefu inayotumia nishati ya jua, mbolea ya viumbe hai, na vifaa vya ndani.')
              : pillar.description;

            return (
              <div 
                key={idx}
                className="bg-white border border-clay rounded-2xl p-8 hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-clay text-terracotta flex items-center justify-center">
                  {idx === 0 && <Users className="w-6 h-6" />}
                  {idx === 1 && <FileText className="w-6 h-6" />}
                  {idx === 2 && <Settings className="w-6 h-6" />}
                </div>
                <h3 className="font-display font-bold text-lg text-dark-blue uppercase tracking-wide">{resolvedTitle}</h3>
                <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">{resolvedDesc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. MEET THE TEAM / INTERACTIVE LEADERSHIP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about-team">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">
            {lang === 'sw' ? 'Watu Walio Mashambani' : 'People on the Ground'}
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-dark-blue mt-1">
            {t.teamTitle}
          </h2>
          <p className="font-sans text-sm text-gray-500 mt-2">
            {lang === 'sw' 
              ? 'Bofya kwenye mwakilishi yeyote kusoma wasifu na jukumu lao la kazi.' 
              : 'Click on any representative to review their professional bio and operational role.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div 
              key={member.name}
              onClick={() => setSelectedBio(selectedBio === member.name ? null : member.name)}
              className={`bg-white border rounded-2xl overflow-hidden cursor-pointer transition-all ${
                selectedBio === member.name 
                  ? 'border-terracotta ring-1 ring-terracotta shadow-md scale-[1.01]' 
                  : 'border-clay hover:border-terracotta/40 hover:shadow-sm'
              }`}
            >
              <div className="h-64 relative bg-gray-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale-20 hover:grayscale-0 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-xl border border-white/40">
                  <span className="block font-display font-bold text-xs text-dark-blue">{member.name}</span>
                  <span className="block font-sans text-[10px] text-terracotta font-semibold mt-0.5 uppercase tracking-wider">{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Bio Panel */}
        {selectedBio && (
          <div className="mt-8 bg-sand-bg border border-clay p-6 sm:p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-3 duration-200" id="about-active-bio">
            {(() => {
              const member = TEAM.find(m => m.name === selectedBio)!;
              return (
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border border-clay bg-white">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                      <h4 className="font-display font-black text-xl text-dark-blue">{member.name}</h4>
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-1 bg-terracotta/10 text-terracotta rounded-full self-start sm:self-auto">
                        {member.role}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-gray-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </section>

      {/* 4.5 UMOJA EVENTS COMMUNITY CALENDAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about-umoja-events">
        <UmojaEvents lang={lang} />
      </section>

      {/* 5. DONOR ACCREDITATION & FINANCIAL TRANSPARENCY CHART */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-dark-blue text-white rounded-3xl" id="about-transparency">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">
                {lang === 'sw' ? 'Uwajibikaji wa Kifedha' : 'Fiscal Accountability'}
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                {lang === 'sw' ? 'Jinsi Tunavyowianisha Fedha za Wafadhili' : "How We Align Donors' Funding"}
              </h2>
            </div>
            
            <p className="font-sans text-sm text-clay/80 leading-relaxed">
              {lang === 'sw' 
                ? 'Tunaamini uwajibikaji kamili wa kifedha hauwezi kujadiliwa. Kila dola inafuatiliwa, inathibitishwa, na kuamuliwa moja kwa moja kwenye uboreshaji wa shule. Mkakati huu unakuza ufanisi na kuweka uendeshaji wetu chini ya 6%.' 
                : 'We believe complete financial transparency is non-negotiable. Every dollar is tracked, verified, and mapped directly to school improvements. This strategic alignment maximizes effectiveness and keeps our operational overhead under 6%.'}
            </p>

            <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start space-x-3 text-xs text-clay/80">
              <Info className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
              <span>
                {lang === 'sw' 
                  ? 'Kumbukumbu zetu za benki, maagizo ya ununuzi wa mabomba ya jua, na ankara za vifaa vya heshima huchapishwa kila robo mwaka kwenye Tovuti ya Wanachama.' 
                  : 'Our direct bank records, purchase orders for solar piping, and dignity kit invoices are published quarterly on the Member Portal.'}
              </span>
            </div>

            <button
              onClick={() => onNavigate('donate')}
              className="inline-flex items-center px-6 py-3 rounded-xl font-display font-bold text-xs bg-terracotta hover:bg-terracotta-hover text-white transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Heart className="w-4 h-4 mr-2" />
              {lang === 'sw' ? 'Fadhili Kazi Zetu Mashambani' : 'Sponsor Our Ground Works'}
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-terracotta">
              {lang === 'sw' ? 'Mchanganuo wa Mgawanyo (%)' : 'Allocation breakdown (%)'}
            </h3>
            
            <div className="space-y-5">
              {allocations.map((alloc) => (
                <div key={alloc.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-sans text-clay">{alloc.label}</span>
                    <span className="font-display font-bold">{alloc.percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${alloc.color} rounded-full`} style={{ width: `${alloc.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 text-center">
              <span className="inline-flex items-center space-x-1 text-xs text-clay">
                <Landmark className="w-4 h-4 text-terracotta" />
                <span>
                  {lang === 'sw' ? 'Imekaguliwa kwa kujitegemea chini ya Viwango vya NGO GH-0241' : 'Audited independently under NGO Standards GH-0241'}
                </span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 5.5 DONOR ACCREDITATION IMPACT FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about-impact-faq">
        <ImpactFAQ lang={lang} />
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-clay/60 pt-12" id="about-testimonials">
        <Testimonials 
          isLoggedIn={isLoggedIn} 
          loggedInUser={loggedInUser} 
          onNavigate={onNavigate} 
        />
      </section>

    </div>
  );
};
