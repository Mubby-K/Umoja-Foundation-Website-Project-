import React from 'react';
import { DonationOption } from '../types';
import { DONATION_OPTIONS } from '../data';
import { Heart, ShieldCheck, CreditCard, Phone, ArrowRight, User, Mail, Sparkles, CheckCircle2, Droplets, BookOpen, ClipboardCheck, Lock, Users, Coins, Info } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';

const PROJECT_TYPES = [
  {
    id: 'rainwater',
    name: 'Rainwater Harvesting',
    nameSw: 'Vunaji wa Mvua',
    nameFr: 'Collecte de l\'Eau',
    description: 'Harvesting seasonal rains to supply durable overhead storage tanks.',
    descriptionSw: 'Kuvuna mvua za msimu ili kusambaza matangi ya kuhifadhi maji yanayodumu.',
    descriptionFr: 'Récupération des pluies pour alimenter des réservoirs durables.',
    unitCost: 150,
    unitName: 'Tank',
    unitNamePlural: 'Tanks',
    unitNameSw: 'Tangi',
    unitNameSwPlural: 'Matangi',
    unitNameFr: 'Réservoir',
    unitNameFrPlural: 'Réservoirs',
    studentPerUnit: 35,
    icon: 'Droplets',
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    accentColor: 'bg-blue-500',
    progressText: {
      en: 'tank volume reached',
      sw: 'ujazo wa tangi uliofikiwa',
      fr: 'volume de réservoir atteint'
    }
  },
  {
    id: 'workshops',
    name: 'Hygiene Workshops',
    nameSw: 'Warsha za Usafi',
    nameFr: 'Ateliers d\'Hygiène',
    description: 'Sponsoring comprehensive hygiene seminars and distributing reusable dignity supply kits.',
    descriptionSw: 'Kufadhili semina za usafi za kila mwezi na kusambaza vifaa vya heshima.',
    descriptionFr: 'Parrainage de séminaires d\'hygiène et distribution de kits de dignité réutilisables.',
    unitCost: 10,
    unitName: 'Student',
    unitNamePlural: 'Students',
    unitNameSw: 'Mwanafunzi',
    unitNameSwPlural: 'Wanafunzi',
    unitNameFr: 'Élève',
    unitNameFrPlural: 'Élèves',
    studentPerUnit: 1,
    icon: 'BookOpen',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    accentColor: 'bg-emerald-500',
    progressText: {
      en: 'student package fully funded',
      sw: 'kifurushi cha mwanafunzi kimefadhiliwa kikamilifu',
      fr: 'colis d\'élève entièrement financé'
    }
  },
  {
    id: 'audits',
    name: 'WASH Audits',
    nameSw: 'Ukaguzi wa WASH',
    nameFr: 'Audits WASH',
    description: 'Underwriting detailed baseline health audits for vulnerable community schools.',
    descriptionSw: 'Kugharamia ukaguzi wa kina wa afya kwa shule za jamii zilizo hatarini.',
    descriptionFr: 'Financement d\'audits d\'assainissement détaillés pour les écoles vulnérables.',
    unitCost: 50,
    unitName: 'School Audited',
    unitNamePlural: 'Schools Audited',
    unitNameSw: 'Shule Iliyokaguliwa',
    unitNameSwPlural: 'Shule Zilizokaguliwa',
    unitNameFr: 'École Auditée',
    unitNameFrPlural: 'Écoles Auditées',
    studentPerUnit: 200,
    icon: 'ClipboardCheck',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    accentColor: 'bg-amber-500',
    progressText: {
      en: 'audit report fully sponsored',
      sw: 'ripoti ya ukaguzi imefadhiliwa kikamilifu',
      fr: 'rapport d\'audit entièrement sponsorisé'
    }
  },
  {
    id: 'cubicles',
    name: 'Privacy Cubicles',
    nameSw: 'Vyumba vya Vyoo vya Faragha',
    nameFr: 'Cabines WC',
    description: 'Restoring lockable privacy doors and fresh exhaust ventilation systems.',
    descriptionSw: 'Kukarabati milango ya faragha inayofungika na mifumo ya uingizaji hewa.',
    descriptionFr: 'Restauration de cabines verrouillables et de la ventilation.',
    unitCost: 75,
    unitName: 'Privacy Door',
    unitNamePlural: 'Privacy Doors',
    unitNameSw: 'Mlango wa Faragha',
    unitNameSwPlural: 'Milango ya Faragha',
    unitNameFr: 'Porte de Cabine',
    unitNameFrPlural: 'Portes de Cabines',
    studentPerUnit: 45,
    icon: 'Lock',
    color: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    accentColor: 'bg-pink-500',
    progressText: {
      en: 'cubicle assembly funded',
      sw: 'mshikamano wa chumba umefadhiliwa',
      fr: 'assemblage de cabine financé'
    }
  }
];

const DONOR_TIERS = [
  {
    id: 'friend',
    minAmount: 10,
    maxAmount: 24,
    name: 'Water Friend',
    nameSw: 'Rafiki wa Maji',
    color: 'bg-blue-50 text-blue-800 border-blue-200',
    accentColor: 'bg-blue-500',
    icon: 'Droplets',
    benefits: [
      'Bi-monthly digital progress newsletter',
      'Direct impact metrics dashboard access',
      'Invitations to virtual regional townhalls'
    ],
    benefitsSw: [
      'Jarida la kila miezi miwili la maendeleo ya kidijitali',
      'Ufikiaji wa dashibodi ya athari za moja kwa moja',
      'Mialiko ya mikutano ya mtandaoni ya kikanda'
    ]
  },
  {
    id: 'advocate',
    minAmount: 25,
    maxAmount: 49,
    name: 'Clean Water Advocate',
    nameSw: 'Mtetezi wa Maji Safi',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    accentColor: 'bg-emerald-500',
    icon: 'ShieldCheck',
    benefits: [
      'All previous benefits included',
      'Personalized Digital Certificate of Appreciation',
      'Name listed on our global digital Wall of Honor'
    ],
    benefitsSw: [
      'Manufaa yote yaliyotangulia yanajumuishwa',
      'Cheti cha Dijitali cha Shukrani kilichobinafsishwa',
      'Jina lako kuorodheshwa kwenye Ukuta wa Heshima wa kimataifa'
    ]
  },
  {
    id: 'hero',
    minAmount: 50,
    maxAmount: 99,
    name: 'Sanitation Hero',
    nameSw: 'Shujaa wa Usafi',
    color: 'bg-amber-50 text-amber-800 border-amber-200',
    accentColor: 'bg-amber-500',
    icon: 'Heart',
    benefits: [
      'All previous benefits included',
      'Physical postcard hand-signed by Ghanaian headteachers',
      'Exclusive invitation to live-streamed ground-impact audits'
    ],
    benefitsSw: [
      'Manufaa yote yaliyotangulia yanajumuishwa',
      'Postikadi halisi iliyosainiwa na walimu wakuu wa Ghana',
      'Mwaliko wa kipekee wa ukaguzi wa athari unaopeperushwa moja kwa moja'
    ]
  },
  {
    id: 'guardian',
    minAmount: 100,
    maxAmount: 249,
    name: 'School Block Guardian',
    nameSw: 'Mlinzi wa Shule',
    color: 'bg-pink-50 text-pink-800 border-pink-200',
    accentColor: 'bg-pink-500',
    icon: 'Lock',
    benefits: [
      'All previous benefits included',
      'Brass nameplate custom-engraved on a physical school washbasin',
      'Quarterly diagnostic report of female student class attendance'
    ],
    benefitsSw: [
      'Manufaa yote yaliyotangulia yanajumuishwa',
      'Kibao cha shaba chenye jina lako kwenye beseni la kunawia shuleni',
      'Ripoti ya kila robo mwaka ya mahudhurio ya wanafunzi wa kike'
    ]
  },
  {
    id: 'champion',
    minAmount: 250,
    maxAmount: Infinity,
    name: 'Community Champion',
    nameSw: 'Bingwa wa Jamii',
    color: 'bg-purple-50 text-purple-800 border-purple-200',
    accentColor: 'bg-purple-500',
    icon: 'Sparkles',
    benefits: [
      'All previous benefits included',
      'Personal video message of appreciation from the school community',
      'Permanent plaque embedded on a newly drilled borehole site',
      '1-on-1 annual strategic updates virtual call with Mubaarakah'
    ],
    benefitsSw: [
      'Manufaa yote yaliyotangulia yanajumuishwa',
      'Ujumbe wa video wa shukrani kutoka kwa jamii ya shule',
      'Kibao cha kudumu kwenye kisima kipya kilichochimbwa',
      'Mkutano wa kila mwaka wa mtandaoni na Mkurugenzi Mubaarakah'
    ]
  }
];

const renderIcon = (iconName: string, className: string = 'w-5 h-5') => {
  switch (iconName) {
    case 'Droplets': return <Droplets className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'ClipboardCheck': return <ClipboardCheck className={className} />;
    case 'Lock': return <Lock className={className} />;
    default: return <Sparkles className={className} />;
  }
};

interface DonateViewProps {
  onDonateSuccess: (amount: number) => void;
  lang?: Language;
}

export const DonateView: React.FC<DonateViewProps> = ({ onDonateSuccess, lang = 'en' }) => {
  const [selectedAmount, setSelectedAmount] = React.useState<number | 'custom'>(50);
  const [customAmount, setCustomAmount] = React.useState<string>('');
  const [frequency, setFrequency] = React.useState<'onetime' | 'monthly'>('onetime');
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'momo'>('card');
  const [activeProjectType, setActiveProjectType] = React.useState<string>('rainwater');
  
  // Donor information
  const [donorName, setDonorName] = React.useState('');
  const [donorEmail, setDonorEmail] = React.useState('');
  
  // Card checkout details
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardExpiry, setCardExpiry] = React.useState('');
  const [cardCvv, setCardCvv] = React.useState('');

  // Mobile Money details
  const [momoNumber, setMomoNumber] = React.useState('');
  const [momoNetwork, setMomoNetwork] = React.useState('MTN');

  // Processing state
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingStep, setProcessingStep] = React.useState('');
  const [checkoutDone, setCheckoutDone] = React.useState(false);
  const [receiptId, setReceiptId] = React.useState('');

  const activeAmount = selectedAmount === 'custom' ? (parseFloat(customAmount) || 0) : selectedAmount;
  const t = TRANSLATIONS[lang];

  // Custom live impact helper to display how money converts to ground solutions
  const getImpactExplanation = (amt: number): string => {
    if (lang === 'sw') {
      if (amt <= 0) return 'Tafadhali weka kiasi cha mchango ili uone athari yako ya moja kwa moja.';
      if (amt < 25) return `Inafadhili vifurushi vya usafi kwa wasichana ${Math.round(amt / 5) || 1} kusaidia kuhakikisha mahudhurio ya shule.`;
      if (amt < 50) return `Inafadhili vifaa vya usafi na taulo za kike kwa wasichana 5 muhula huu wa masomo.`;
      if (amt < 100) return `Inafadhili warsha ya usafi inayoongozwa na Evelyn Mensah na kutoa vifaa vya usafi kwa wasichana 15+.`;
      if (amt < 250) return `Inajenga vyoo na mabomba ya kunawia mikono kwa shule nzima ya jamii.`;
      if (amt < 500) return `Inagharimia ukaguzi wa kina wa usafi wa mazingira kwa shule 2 za msingi.`;
      if (amt < 1000) return `Inafadhili milango thabiti ya faragha na ukarabati wa vyoo vya wasichana shuleni.`;
      return `Inachangia kuchimba kisima kirefu kinachotumia nishati ya jua kinachotoa maji safi ya bomba kwa jamii nzima.`;
    }
    if (amt <= 0) return 'Please enter a donation amount to see your direct impact.';
    if (amt < 25) return `Sponsors biodegradable hygiene packs for ${Math.round(amt / 5) || 1} female student(s) protecting school attendance.`;
    if (amt < 50) return `Sponsors dignity hygiene supply kits and private sanitary towels for 5 female students this academic term.`;
    if (amt < 100) return `Funds a detailed hygiene workshop led by Evelyn Mensah and physical supply toolkits for 15+ students.`;
    if (amt < 250) return `Constructs gravity-fed touchless wash basins with locally sourced soaps for an entire community school block.`;
    if (amt < 500) return `Underwrites an extensive baseline sanitation audit for 2 primary schools and funds material logs for district planners.`;
    if (amt < 1000) return `Sponsors solid lockable privacy doors and fresh exhaust ventilation repairs for a school's girls sanitation complex.`;
    return `Co-sponsors drilling a deep solar-powered borehole delivering infinite safe running water to an entire community.`;
  };

  const handleProcessCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeAmount <= 0) return;

    setIsProcessing(true);
    setProcessingStep('Establishing secure handshake...');
    
    setTimeout(() => {
      setProcessingStep('Authorizing financial gateway nodes...');
      setTimeout(() => {
        setProcessingStep('Securing transactional tokens...');
        setTimeout(() => {
          setIsProcessing(false);
          setCheckoutDone(true);
          onDonateSuccess(activeAmount);
          setReceiptId(`TX-${Math.floor(100000 + Math.random() * 900000)}`);
        }, 1200);
      }, 1000);
    }, 1000);
  };

  const resetCheckout = () => {
    setCheckoutDone(false);
    setSelectedAmount(50);
    setCustomAmount('');
    setDonorName('');
    setDonorEmail('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setMomoNumber('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      
      {/* HEADER STATEMENT */}
      <div className="text-center space-y-3 mb-10">
        <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">
          {lang === 'sw' ? 'Tovuti ya Udhamini' : 'Sponsorship Portal'}
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-dark-blue">
          {t.donateTitle}
        </h1>
        <p className="font-sans text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
          {t.donateSub}
        </p>
      </div>

      {checkoutDone ? (
        /* CHECKOUT SUCCESS RECEIPT SCREEN */
        <div className="bg-white border-2 border-terracotta rounded-3xl p-8 text-center space-y-6 shadow-lg animate-in zoom-in-95 duration-200" id="donation-success-panel">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <div className="space-y-2">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-dark-blue">Transaction Complete!</h2>
            <p className="font-sans text-sm text-gray-600">
              Thank you, <strong className="text-dark-blue">{donorName || 'Generous Donor'}</strong>. Your contribution has been securely logged on our regional ledger.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-sand-bg border border-clay p-6 rounded-2xl space-y-4 text-left">
            <div className="flex justify-between text-xs border-b border-clay pb-2 text-gray-500">
              <span>Receipt Identifier</span>
              <span className="font-mono font-bold text-dark-blue">{receiptId}</span>
            </div>
            <div className="flex justify-between text-sm border-b border-clay pb-2 font-semibold">
              <span className="text-gray-700">Donation Volume</span>
              <span className="text-terracotta">${activeAmount.toLocaleString()} USD</span>
            </div>
            <div className="flex justify-between text-xs border-b border-clay pb-2 text-gray-500">
              <span>Frequency Channel</span>
              <span className="capitalize">{frequency === 'onetime' ? 'One-time sponsorship' : 'Monthly continuous sponsorship'}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Primary Allocation Target</span>
              <span className="font-medium text-dark-blue">WASH Infrastructure Build</span>
            </div>
          </div>

          <p className="font-sans text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
            *An official IRS tax-deductible document has been dispatch-queued to <strong className="text-dark-blue">{donorEmail || 'your email'}</strong>.
          </p>

          <button
            onClick={resetCheckout}
            className="px-6 py-3 rounded-xl bg-dark-blue hover:bg-terracotta hover:text-white text-white font-display font-bold text-xs transition-colors cursor-pointer"
          >
            Sponsor Another Project
          </button>
        </div>
      ) : (
        /* CORE CHECKOUT FLOW FORM */
        <div className="bg-white border border-clay rounded-3xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-12" id="donation-form-wrapper">
          
          {/* LEFT: FORM SELECTIONS PANEL */}
          <form onSubmit={handleProcessCheckout} className="md:col-span-7 p-6 sm:p-10 space-y-6">
            
            {/* 1. Predefined amounts selection list */}
            <div className="space-y-3">
              <label className="block font-display font-bold text-xs uppercase tracking-wider text-dark-blue">Select Amount (USD)</label>
              <div className="grid grid-cols-3 gap-2.5">
                {[25, 50, 100, 250, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelectedAmount(amt); }}
                    className={`py-3 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                      selectedAmount === amt
                        ? 'bg-dark-blue border-dark-blue text-white shadow-md'
                        : 'bg-clay/40 border-clay text-dark-blue hover:bg-clay hover:border-terracotta/40'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              
              {/* Custom amount switch */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAmount('custom')}
                  className={`w-full py-2 text-center rounded-xl font-sans text-xs font-semibold transition-all border ${
                    selectedAmount === 'custom'
                      ? 'bg-dark-blue border-dark-blue text-white shadow-sm'
                      : 'bg-clay/30 border-clay text-dark-blue hover:bg-clay'
                  }`}
                >
                  Custom Amount Choice
                </button>
                {selectedAmount === 'custom' && (
                  <div className="relative mt-2 animate-in slide-in-from-top-1 duration-150">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500 font-bold font-sans text-sm">$</span>
                    <input 
                      type="number" 
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 border border-clay rounded-xl text-dark-blue bg-white font-semibold text-sm focus:outline-none focus:border-terracotta"
                      placeholder="Enter custom dollar amount"
                      required={selectedAmount === 'custom'}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 2. Frequency selectors */}
            <div className="space-y-3">
              <label className="block font-display font-bold text-xs uppercase tracking-wider text-dark-blue">Donation Frequency</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFrequency('onetime')}
                  className={`py-2.5 rounded-xl font-sans text-xs font-bold border transition-all cursor-pointer ${
                    frequency === 'onetime' ? 'bg-terracotta border-terracotta text-white' : 'bg-clay/30 border-clay text-dark-blue hover:bg-clay'
                  }`}
                >
                  One-time Contribution
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`py-2.5 rounded-xl font-sans text-xs font-bold border transition-all cursor-pointer ${
                    frequency === 'monthly' ? 'bg-terracotta border-terracotta text-white' : 'bg-clay/30 border-clay text-dark-blue hover:bg-clay'
                  }`}
                >
                  Sponsor Monthly
                </button>
              </div>
            </div>

            {/* 3. Donor Personal identity fields */}
            <div className="space-y-3 pt-2 border-t border-clay">
              <label className="block font-display font-bold text-xs uppercase tracking-wider text-dark-blue">Donor Information</label>
              <div className="space-y-2.5 font-sans text-xs">
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-clay rounded-xl bg-white text-sm font-medium focus:outline-none focus:border-terracotta text-dark-blue"
                    placeholder="First and last name"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input 
                    type="email" 
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-clay rounded-xl bg-white text-sm font-medium focus:outline-none focus:border-terracotta text-dark-blue"
                    placeholder="Email address for tax receipt"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 4. Payment channel selection and channel forms */}
            <div className="space-y-3 pt-2 border-t border-clay">
              <label className="block font-display font-bold text-xs uppercase tracking-wider text-dark-blue">Payment Gateway</label>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 flex items-center justify-center rounded-xl font-sans text-xs font-bold border transition-all cursor-pointer ${
                    paymentMethod === 'card' ? 'bg-dark-blue border-dark-blue text-white' : 'bg-clay/30 border-clay text-dark-blue hover:bg-clay'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mr-1.5" />
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('momo')}
                  className={`py-2 flex items-center justify-center rounded-xl font-sans text-xs font-bold border transition-all cursor-pointer ${
                    paymentMethod === 'momo' ? 'bg-dark-blue border-dark-blue text-white' : 'bg-clay/30 border-clay text-dark-blue hover:bg-clay'
                  }`}
                >
                  <Phone className="w-4 h-4 mr-1.5" />
                  Mobile Money (Ghana)
                </button>
              </div>

              {/* CARD DETAILED SUBFORM */}
              {paymentMethod === 'card' ? (
                <div className="space-y-2.5 font-sans text-xs animate-in fade-in duration-150">
                  <input 
                    type="text" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                    maxLength={19}
                    className="w-full px-4 py-2.5 border border-clay rounded-xl bg-white text-sm font-medium focus:outline-none focus:border-terracotta text-dark-blue"
                    placeholder="Card Number (4000 1234 5678 9010)"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                      className="w-full px-4 py-2.5 border border-clay rounded-xl bg-white text-xs font-medium focus:outline-none focus:border-terracotta text-dark-blue"
                      placeholder="MM/YY"
                      required
                    />
                    <input 
                      type="password" 
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={3}
                      className="w-full px-4 py-2.5 border border-clay rounded-xl bg-white text-xs font-medium focus:outline-none focus:border-terracotta text-dark-blue"
                      placeholder="CVV"
                      required
                    />
                  </div>
                </div>
              ) : (
                /* MOBILE MONEY DETAILED SUBFORM (GHANA) */
                <div className="space-y-2.5 font-sans text-xs animate-in fade-in duration-150">
                  <div className="grid grid-cols-3 gap-2">
                    {['MTN', 'Telecel', 'AirtelTigo'].map(net => (
                      <button
                        key={net}
                        type="button"
                        onClick={() => setMomoNetwork(net)}
                        className={`py-1.5 rounded-xl font-bold border text-center cursor-pointer ${
                          momoNetwork === net ? 'bg-terracotta/10 border-terracotta text-terracotta' : 'bg-clay/20 border-clay text-gray-500 hover:bg-clay'
                        }`}
                      >
                        {net}
                      </button>
                    ))}
                  </div>
                  <input 
                    type="text" 
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    maxLength={10}
                    className="w-full px-4 py-2.5 border border-clay rounded-xl bg-white text-sm font-medium focus:outline-none focus:border-terracotta text-dark-blue"
                    placeholder="Momo Mobile Number (e.g. 0558433835)"
                    required
                  />
                </div>
              )}
            </div>

            {/* SUBMIT TRIGGERS */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={activeAmount <= 0}
                className="w-full py-4 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-display font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center space-x-2"
                id="submit-donation-checkout"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Authorize ${activeAmount.toLocaleString()} USD Contribution</span>
              </button>
            </div>

          </form>

          {/* RIGHT: SMART LIVE IMPACT EXPLANATION SCREEN */}
          <div className="md:col-span-5 bg-dark-blue p-6 sm:p-8 text-white flex flex-col justify-between space-y-6 relative border-t md:border-t-0 md:border-l border-clay/10">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-1.5 text-xs text-terracotta font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'sw' ? 'Kikokotoo cha Athari' : lang === 'fr' ? 'Calculateur d\'Impact' : 'Live Impact Calculator'}</span>
                </div>
                {activeAmount > 0 && (
                  <span className="text-[9px] bg-white/10 border border-white/10 px-2 py-0.5 rounded-full font-mono text-clay/90">
                    {lang === 'sw' ? 'Kiwango Kilicho hai' : lang === 'fr' ? 'Flux en direct' : 'Live State'}
                  </span>
                )}
              </div>
              
              <div className="space-y-1">
                <h3 className="font-display font-black text-2xl leading-tight">
                  {lang === 'sw' ? 'Athari Yako ya Moja kwa Moja' : lang === 'fr' ? 'Votre Impact Direct' : 'Your Direct Impact'}
                </h3>
                <p className="font-sans text-[11px] text-clay/70 leading-relaxed">
                  {lang === 'sw' 
                    ? 'Chagua kategoria hapa chini ili kuona jinsi mchango wako wa kikanda utakavyobadilishwa kuwa miundombinu thabiti.'
                    : lang === 'fr'
                      ? 'Sélectionnez une catégorie pour modéliser la conversion de votre don en infrastructures scolaires physiques.'
                      : 'Select a category below to visualize how your specific dollar volume converts to physical school infrastructure.'}
                </p>
              </div>

              {/* PROJECT TYPE TABS */}
              <div className="space-y-1.5">
                <span className="block text-[10px] font-display font-bold uppercase tracking-wider text-clay/50">
                  {lang === 'sw' ? 'Chagua Njia ya Mradi:' : lang === 'fr' ? 'Type de Projet :' : 'Select Project Focus :'}
                </span>
                <div className="grid grid-cols-4 gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                  {PROJECT_TYPES.map((proj) => {
                    const isSelected = activeProjectType === proj.id;
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => setActiveProjectType(proj.id)}
                        className={`py-2 rounded-lg flex flex-col items-center justify-center transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-white text-dark-blue border-white shadow-md'
                            : 'bg-transparent border-transparent text-clay/60 hover:text-white hover:bg-white/5'
                        }`}
                        title={lang === 'sw' ? proj.nameSw : lang === 'fr' ? proj.nameFr : proj.name}
                      >
                        {renderIcon(proj.icon, `w-4 h-4 ${isSelected ? 'text-dark-blue' : 'text-clay/60'}`)}
                        <span className="text-[8px] font-sans font-bold mt-1 truncate max-w-full px-1">
                          {lang === 'sw' ? proj.unitNameSw : lang === 'fr' ? proj.unitNameFr : proj.unitName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DYNAMIC CALCULATIONS & DESCRIPTION CARD */}
              {(() => {
                const currentProject = PROJECT_TYPES.find(p => p.id === activeProjectType) || PROJECT_TYPES[0];
                const unitsCount = Math.floor(activeAmount / currentProject.unitCost);
                const remainder = activeAmount % currentProject.unitCost;
                const nextUnitProgress = Math.round((remainder / currentProject.unitCost) * 100);

                const projectTitle = lang === 'sw' ? currentProject.nameSw : lang === 'fr' ? currentProject.nameFr : currentProject.name;
                const projectDesc = lang === 'sw' ? currentProject.descriptionSw : lang === 'fr' ? currentProject.descriptionFr : currentProject.description;
                const projectUnitLabel = unitsCount === 1 
                  ? (lang === 'sw' ? currentProject.unitNameSw : lang === 'fr' ? currentProject.unitNameFr : currentProject.unitName)
                  : (lang === 'sw' ? currentProject.unitNameSwPlural : lang === 'fr' ? currentProject.unitNameFrPlural : currentProject.unitNamePlural);

                const totalStudentsImpacted = Math.round(
                  unitsCount * currentProject.studentPerUnit + 
                  (remainder / currentProject.unitCost) * currentProject.studentPerUnit
                );

                return (
                  <div className="space-y-4">
                    {/* Value Readout Box */}
                    <div className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-3.5">
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <div>
                          <span className="text-[9px] text-clay/60 uppercase tracking-widest block font-sans">
                            {lang === 'sw' ? 'Kiasi cha Udhamini' : lang === 'fr' ? 'Sponsorisé' : 'Donation Size'}
                          </span>
                          <span className="text-xl font-display font-extrabold text-white">
                            ${activeAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-clay/60 uppercase tracking-widest block font-sans">
                            {lang === 'sw' ? 'Vitengo Vilivyofadhiliwa' : lang === 'fr' ? 'Unités Financées' : 'Funded Volume'}
                          </span>
                          <span className="text-xl font-display font-extrabold text-terracotta">
                            {unitsCount} {projectUnitLabel}
                          </span>
                        </div>
                      </div>

                      {/* Project info details */}
                      <div className="space-y-1 text-left">
                        <h4 className="text-xs font-display font-bold text-white flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                          <span>{projectTitle}</span>
                        </h4>
                        <p className="text-[11px] text-clay/80 font-sans leading-relaxed">
                          {projectDesc}
                        </p>
                      </div>
                    </div>

                    {/* PROJECTED VISUALIZATION FOOTPRINT */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-clay/60 font-sans">
                        <span>
                          {lang === 'sw' ? 'Onyesho la Athari ya Macho' : lang === 'fr' ? 'Aperçu de l\'impact' : 'Projected Footprint'}
                        </span>
                        {totalStudentsImpacted > 0 && (
                          <span className="text-emerald-400 font-bold font-sans">
                            ~{totalStudentsImpacted.toLocaleString()} {lang === 'sw' ? 'Wanafunzi wanufaika' : lang === 'fr' ? 'Élèves aidés' : 'Students supported'}
                          </span>
                        )}
                      </div>

                      {/* Graphic grid layout representation */}
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-center items-center min-h-[110px] relative overflow-hidden">
                        {unitsCount > 0 ? (
                          <div className="w-full">
                            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 justify-center">
                              {Array.from({ length: Math.min(unitsCount, 16) }).map((_, idx) => (
                                <div
                                  key={idx}
                                  className={`aspect-square rounded-lg flex items-center justify-center border transition-all duration-300 animate-in zoom-in-90 ${currentProject.color} hover:scale-110`}
                                  title={`${idx + 1} ${currentProject.unitName}`}
                                >
                                  {renderIcon(currentProject.icon, 'w-3.5 h-3.5')}
                                </div>
                              ))}
                              {unitsCount > 16 && (
                                <div className="aspect-square rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-white font-display text-[9px] font-black">
                                  +{unitsCount - 16}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          /* 0 Units Fully Funded - show visual helper of pending sponsorship */
                          <div className="text-center py-2 space-y-1.5">
                            <div className="w-9 h-9 rounded-full bg-white/5 border border-dashed border-white/15 flex items-center justify-center mx-auto text-clay/40 animate-pulse">
                              {renderIcon(currentProject.icon, 'w-4 h-4')}
                            </div>
                            <p className="text-[10px] text-clay/50 font-sans max-w-[190px] mx-auto leading-normal">
                              {lang === 'sw' 
                                ? 'Ongeza kiasi cha mchango ili kuanza kufadhili kitengo kamili vya mradi huu.'
                                : lang === 'fr'
                                  ? 'Augmentez le montant de votre don pour commencer à financer une unité complète.'
                                  : 'Increase donation volume to fund a complete physical unit of this category.'}
                            </p>
                          </div>
                        )}

                        {/* Remainder Progress bar toward funding next unit */}
                        {activeAmount > 0 && remainder > 0 && (
                          <div className="w-full mt-3.5 pt-3 border-t border-white/5 space-y-1">
                            <div className="flex justify-between items-center text-[9px] text-clay/80 font-sans font-semibold">
                              <span className="flex items-center gap-1 text-terracotta">
                                <Info className="w-3 h-3" />
                                {lang === 'sw' ? 'Ufadhili Unaofuata:' : lang === 'fr' ? 'Unité Suivante :' : 'Next Unit Progress:'}
                              </span>
                              <span className="text-white font-mono">{nextUnitProgress}% ({lang === 'sw' ? currentProject.progressText.sw : lang === 'fr' ? currentProject.progressText.fr : currentProject.progressText.en})</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                              <div 
                                className={`h-full ${currentProject.accentColor} transition-all duration-500 ease-out`}
                                style={{ width: `${nextUnitProgress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Secure banking badges */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex items-center space-x-2 text-xs text-clay/80 font-semibold">
                <ShieldCheck className="w-4 h-4 text-terracotta" />
                <span>PCI-DSS SSL Encrypted Gateway</span>
              </div>
              <p className="text-[9px] text-clay/55 leading-relaxed font-sans">
                All financial transfers operate as safe mock authorization handshakes. No real monetary withdrawals are processed on card details in this AI developer preview container.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* DONOR TIER BENEFITS SECTION */}
      {!checkoutDone && (
        <section className="mt-16 bg-sand-bg border border-clay rounded-3xl p-6 sm:p-10 space-y-8 text-left animate-in fade-in duration-300" id="donor-tier-benefits-section">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs text-terracotta font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-terracotta" />
              <span>{lang === 'sw' ? 'Manufaa ya Washirika' : 'Empowerment Tiers'}</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-dark-blue">
              {lang === 'sw' ? 'Mifumo ya Tuzo na Shukrani za Kila Mwezi' : 'Monthly Donor Tier Benefits'}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
              {lang === 'sw'
                ? 'Udhamini endelevu wa kila mwezi unaruhusu timu yetu ya kijamii kupanga mifumo thabiti ya ujenzi. Kama mshirika wa kila mwezi, utapokea shukrani maalum katika viwango mbalimbali.'
                : 'Consistent monthly sponsorships empower our engineering team to plan construction cycles with absolute security. By joining as a recurring donor, you unlock specific, incremental rewards and special acknowledgments.'}
            </p>
          </div>

          {/* Current status banner */}
          <div className="p-4 bg-white border border-clay rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left shadow-xs">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold">Your Current Selection</span>
              <span className="block font-display font-black text-base text-dark-blue mt-0.5">
                ${activeAmount.toLocaleString()} USD / {frequency === 'monthly' ? (lang === 'sw' ? 'Kila Mwezi' : 'month') : (lang === 'sw' ? 'Mchango wa Mara Moja' : 'one-time')}
              </span>
            </div>
            {frequency === 'monthly' ? (
              <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-sans font-bold flex items-center space-x-1.5 animate-pulse">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {lang === 'sw' 
                    ? 'Umeamilisha manufaa ya kila mwezi!' 
                    : `Active Tier: ${DONOR_TIERS.find(t => activeAmount >= t.minAmount && activeAmount <= t.maxAmount)?.name || 'Custom Plan'}`}
                </span>
              </div>
            ) : (
              <p className="text-[11px] text-gray-500 leading-normal max-w-sm">
                💡 {lang === 'sw'
                  ? 'Badilisha hadi "Sponsor Monthly" juu iti kuanza kupokea tuzo hizi za kipekee za washirika.'
                  : 'Switch to "Sponsor Monthly" above to join our circle of impact and unlock these recurring rewards.'}
              </p>
            )}
          </div>

          {/* Bento Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {DONOR_TIERS.map((tier) => {
              const isSelectedTier = frequency === 'monthly' && activeAmount >= tier.minAmount && activeAmount <= tier.maxAmount;
              const isHighestTier = frequency === 'monthly' && tier.id === 'champion' && activeAmount >= 250;
              const isActive = isSelectedTier || isHighestTier;

              const nameText = lang === 'sw' ? tier.nameSw : tier.name;
              const benefitsList = lang === 'sw' ? tier.benefitsSw : tier.benefits;

              return (
                <div
                  key={tier.id}
                  className={`border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative ${
                    isActive
                      ? 'bg-white border-dark-blue shadow-lg ring-2 ring-dark-blue/20 scale-102 z-10'
                      : 'bg-white/60 border-clay hover:border-dark-blue/40 hover:bg-white'
                  }`}
                >
                  {isActive && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-dark-blue text-white font-sans font-bold text-[9px] uppercase tracking-widest rounded-full shadow-md">
                      Unlocked
                    </span>
                  )}

                  <div className="space-y-4">
                    {/* Header info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${tier.color}`}>
                          ${tier.minAmount}{tier.maxAmount === Infinity ? '+' : ` - $${tier.maxAmount}`}
                        </span>
                        {tier.icon === 'Droplets' && <Droplets className="w-4 h-4 text-blue-500" />}
                        {tier.icon === 'ShieldCheck' && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                        {tier.icon === 'Heart' && <Heart className="w-4 h-4 text-amber-500 fill-amber-50" />}
                        {tier.icon === 'Lock' && <Lock className="w-4 h-4 text-pink-500" />}
                        {tier.icon === 'Sparkles' && <Sparkles className="w-4 h-4 text-purple-500" />}
                      </div>
                      <h3 className="font-display font-black text-xs sm:text-sm text-dark-blue tracking-tight leading-snug">
                        {nameText}
                      </h3>
                    </div>

                    {/* Benefits items */}
                    <ul className="space-y-2 pt-3 border-t border-clay text-left">
                      {benefitsList.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start text-[11px] text-gray-600 leading-normal font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mr-1.5 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Micro CTA */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAmount(tier.minAmount);
                        setFrequency('monthly');
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className={`w-full py-1.5 rounded-lg font-display font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-dark-blue text-white hover:bg-terracotta'
                          : 'bg-clay/35 text-dark-blue hover:bg-dark-blue hover:text-white'
                      }`}
                    >
                      {isActive ? (lang === 'sw' ? 'Imeteuliwa' : 'Active Tier') : (lang === 'sw' ? 'Chagua Hii' : `Pledge $${tier.minAmount}/mo`)}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. SECURE HANDSHAKE GATEWAY OVERLAY MODAL */}
      {isProcessing && (
        <div className="fixed inset-0 bg-dark-blue/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-clay p-8 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full border-4 border-clay border-t-terracotta animate-spin mx-auto" />
            <h3 className="font-display font-bold text-lg text-dark-blue">Authorizing Sandbox...</h3>
            <p className="font-sans text-xs text-gray-500 animate-pulse">{processingStep}</p>
          </div>
        </div>
      )}

    </div>
  );
};
