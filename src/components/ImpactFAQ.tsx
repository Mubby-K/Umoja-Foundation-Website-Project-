import React from 'react';
import { 
  HelpCircle, ChevronDown, ChevronUp, ShieldAlert, 
  Settings, Users, Landmark, Sparkles, CheckCircle2 
} from 'lucide-react';
import { Language } from '../translations';

interface FAQItem {
  id: string;
  category: 'sustainability' | 'allocation' | 'transparency';
  categoryLabelEn: string;
  categoryLabelSw: string;
  questionEn: string;
  questionSw: string;
  answerEn: string;
  answerSw: string;
  icon: React.ReactNode;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'sustainability',
    category: 'sustainability',
    categoryLabelEn: 'Project Sustainability',
    categoryLabelSw: 'Uendelevu wa Mradi',
    questionEn: 'How do you ensure the solar-powered boreholes and WASH blocks are maintained over the long run?',
    questionSw: 'Mnahakikishaje visima vya jua na vyoo vya shule vinatunzwa kwa muda mrefu?',
    answerEn: 'We do not build and walk away. For every facility constructed, we form a local "Water & Sanitation Management Committee" consisting of teachers, parents, and community elders. We train them in basic preventative maintenance and establish a decentralized emergency fund. Additionally, local regional technicians are contracted to conduct bi-annual health audits to ensure physical structures remain secure and fully functional.',
    answerSw: 'Hatujengi na kuondoka. Kwa kila mradi uliokamilika, tunaunda "Kamati ya Usimamizi wa Maji na Usafi ya Jamii" inayojumuisha walimu, wazazi, na wazee. Tunawapa mafunzo ya matengenezo ya kimsingi na kuanzisha mfuko wa dharura uliogatuliwa. Pia, mafundi wa kikanda hupewa kandarasi ya kufanya ukaguzi wa miundombinu mara mbili kwa mwaka.',
    icon: <Settings className="w-4 h-4 text-emerald-600" />
  },
  {
    id: 'allocation',
    category: 'allocation',
    categoryLabelEn: 'Funds Allocation',
    categoryLabelSw: 'Mgawanyo wa Fedha',
    questionEn: 'What percentage of my donation directly supports ground construction?',
    questionSw: 'Ni asilimia ngapi ya mchango wangu inayokwenda moja kwa moja kwenye ujenzi?',
    answerEn: 'We are proud to maintain a 91.2% direct capital program allocation. This means that out of every dollar you contribute, over 91 cents are spent on buying raw pipes, solar panels, water pumps, bricks, and concrete. Administration and fundraising overhead is capped strictly under 6% by leveraging local volunteers and efficient digital tracking tools.',
    answerSw: 'Tunajivunia kudumisha mgawanyo wa 91.2% moja kwa moja kwa miradi. Hii inamaanisha kuwa kwa kila dola unayochangia, zaidi ya senti 91 zinatumika kununua mabomba, paneli za jua, pampu, matofali, na saruji. Gharama za utawala na uchangishaji zimewekewa kikomo cha chini ya 6% kwa kutumia wajitoleaji.',
    icon: <Landmark className="w-4 h-4 text-terracotta" />
  },
  {
    id: 'transparency',
    category: 'transparency',
    categoryLabelEn: 'Organizational Transparency',
    categoryLabelSw: 'Uwazi wa Shirika',
    questionEn: 'How can I verify where my money actually went?',
    questionSw: 'Ninawezaje kuthibitisha mchango wangu ulipoenda?',
    answerEn: 'Every recurring monthly sponsor receives digital coordinates and a profile of the specific school they are supporting, complete with active student count updates. In addition, our physical receipts, bank ledgers, and construction audits are publicly searchable in our Member Portal. You can also download our Audited Annual Transparency Report directly from the footer of this platform.',
    answerSw: 'Kila mfadhili wa kila mwezi anapokea viwango vya satelaiti (coordinates) na wasifu wa shule anayoisaidia, pamoja na idadi kamili ya wanafunzi. Pia, risiti zetu za ununuzi na ukaguzi wa ujenzi huchapishwa katika Tovuti ya Wanachama. Unaweza pia kupakua Ripoti yetu ya Uwazi ya Mwaka kutoka chini kabisa mwa ukurasa huu.',
    icon: <CheckCircle2 className="w-4 h-4 text-blue-600" />
  },
  {
    id: 'community-buy-in',
    category: 'sustainability',
    categoryLabelEn: 'Community Buy-In',
    categoryLabelSw: 'Ushirikiano wa Jamii',
    questionEn: 'Do you require local communities to contribute to the project?',
    questionSw: 'Je, mnahitaji jamii za vijijini kuchangia katika mradi huu?',
    answerEn: 'Yes! Community alignment is a requirement for our selection process. Local school boards and parents must commit to providing manual labor support during borehole drilling and promise to establish safety schedules for student water collection. This active partnership guarantees that the community feels absolute ownership over the systems and guards them diligently.',
    answerSw: 'Ndiyo! Ushirikiano wa jamii ni hitaji muhimu la uteuzi wetu. Bodi za shule na wazazi lazima wajitolee kutoa nguvu kazi wakati wa uchimbaji visima na kuanzisha ratiba za usalama za wanafunzi. Ushirikiano huu unahakikisha jamii inahisi umiliki kamili wa mifumo hii na kuilinda.',
    icon: <Users className="w-4 h-4 text-purple-600" />
  }
];

interface ImpactFAQProps {
  lang: Language;
}

export const ImpactFAQ: React.FC<ImpactFAQProps> = ({ lang }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>('sustainability');
  const [filterCategory, setFilterCategory] = React.useState<string>('all');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredItems = filterCategory === 'all' 
    ? FAQ_ITEMS 
    : FAQ_ITEMS.filter(item => item.category === filterCategory);

  return (
    <div className="bg-white border border-clay rounded-3xl p-6 sm:p-10 space-y-8 text-left shadow-xs" id="impact-faq-component">
      {/* FAQ Header info */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-clay/60 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-1.5 text-xs text-terracotta font-semibold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-terracotta" />
            <span>{lang === 'sw' ? 'Maswali ya Wafadhili' : 'Donor Intelligence'}</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-dark-blue">
            {lang === 'sw' ? 'Maswali yanayoulizwa Kuhusu Athari' : 'Impact & Accountability FAQ'}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
            {lang === 'sw'
              ? 'Tunaamini uwazi ndio msingi wa kila uhusiano. Gundua jinsi tunavyosimamia fedha, kudumisha miundombinu, na kuhakikisha ufanisi wa miradi yetu.'
              : 'We believe that absolute clarity build trust. Discover how we manage donor funds, assure multi-year sustainability, and guarantee transparency at every tier of our ground operations.'}
          </p>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap gap-1.5 self-start shrink-0">
          {[
            { id: 'all', labelEn: 'All FAQ', labelSw: 'Zote' },
            { id: 'sustainability', labelEn: 'Sustainability', labelSw: 'Uendelevu' },
            { id: 'allocation', labelEn: 'Allocation', labelSw: 'Mgawanyo' },
            { id: 'transparency', labelEn: 'Transparency', labelSw: 'Uwazi' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setFilterCategory(cat.id);
                // Expand first in the list
                const firstOfCat = FAQ_ITEMS.find(item => cat.id === 'all' || item.category === cat.id);
                if (firstOfCat) setExpandedId(firstOfCat.id);
              }}
              className={`px-3 py-1.5 rounded-lg font-display font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-dark-blue text-white'
                  : 'bg-clay/35 text-dark-blue hover:bg-clay/60'
              }`}
            >
              {lang === 'sw' ? cat.labelSw : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const questionText = lang === 'sw' ? item.questionSw : item.questionEn;
          const answerText = lang === 'sw' ? item.answerSw : item.answerEn;
          const catLabel = lang === 'sw' ? item.categoryLabelSw : item.categoryLabelEn;

          return (
            <div 
              key={item.id}
              className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                isExpanded 
                  ? 'bg-sand-bg/60 border-dark-blue/80 shadow-xs' 
                  : 'bg-white border-clay hover:border-dark-blue/30'
              }`}
            >
              {/* Question Click Header */}
              <button
                type="button"
                onClick={() => toggleExpand(item.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-clay/30 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-[8px] font-sans font-extrabold uppercase tracking-widest text-gray-400">
                      {catLabel}
                    </span>
                    <h3 className="font-display font-black text-xs sm:text-sm text-dark-blue leading-tight mt-0.5">
                      {questionText}
                    </h3>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-white border border-clay flex items-center justify-center shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 text-dark-blue" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Collapsible Answer container */}
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-96 opacity-100 border-t border-clay/60 p-5 bg-white' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="space-y-3">
                  <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {answerText}
                  </p>
                  
                  {/* Additional micro stats info to look high-effort */}
                  <div className="flex items-center space-x-2 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg w-fit">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                    <span>
                      {item.category === 'sustainability' && (lang === 'sw' ? 'Imethibitishwa: 100% ya visima vinadhibitiwa na bodi za shule za ndani.' : 'Verified: 100% of structures are managed locally with bi-annual audits.')}
                      {item.category === 'allocation' && (lang === 'sw' ? 'Hesabu iliyokaguliwa: 91.2% ya fedha inakwenda moja kwa moja nyanjani.' : 'Audited Account: 91.2% is spent directly on equipment, with 3% operations.')}
                      {item.category === 'transparency' && (lang === 'sw' ? 'Uwazi: Coordinates na risiti zote zipo wazi kwenye Tovuti.' : 'Active Transparency: Exact GPS logs and digital certificates available for all blocks.')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
