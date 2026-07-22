import React from 'react';
import { 
  Landmark, Mail, Phone, MapPin, Heart, ShieldCheck, HeartHandshake, 
  Twitter, Facebook, Instagram, Linkedin, Github, Youtube,
  FileText, Download, TrendingUp, CheckCircle2, Award, DollarSign, X, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Language, TRANSLATIONS } from '../translations';

interface FooterProps {
  onNavigate: (view: string) => void;
  donorCount: number;
  totalDonated: number;
  lang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, donorCount, totalDonated, lang = 'en' }) => {
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownloadReport = () => {
    setIsDownloading(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x: 0.5, y: 0.5 }
    });

    const reportContent = `======================================================================
UMOJA FOUNDATION - ANNUAL TRANSPARENCY & AUDITED FINANCIAL REPORT
Fiscal Year: July 1, 2025 - June 30, 2026
Registered NGO Registry Ghana No: CG0241
Executive Director: Mubaarakah
======================================================================

1. MISSION STATEMENT
---------------------
Umoja Foundation is dedicated to restoring student dignity and keeping girls
in classrooms across rural Ghana. Through solar-powered boreholes, private 
school sanitation cubicles (WASH blocks), and Menstrual Hygiene Management (MHM)
workshops, we build durable foundations for health, privacy, and community safety.

2. FISCAL YEAR 2025-2026 CONSOLIDATED FINANCIALS
-------------------------------------------------
TOTAL CONSOLIDATED REVENUE:    $145,280.00 USD
  - Individual Sponsors (Monthly & Direct): $127,846.40 USD (88.0%)
  - Corporate & Foundation Grants:          $17,433.60 USD (12.0%)

TOTAL CAPITAL EXPENDITURE:     $132,450.00 USD
  - Direct Construction & Materials:        $120,794.40 USD (91.2%)
    * Drilled 14 high-yield solar boreholes
    * Completed 32 private school WASH blocks
  - Community WASH & Hygiene Workshops:        $7,682.10 USD (5.8%)
  - General Administration & Operations:       $3,973.50 USD (3.0%)

NET SURPLUS RESERVED FOR FY26-27 COLD-STARTS: $12,830.00 USD

3. AUDITED IMPACT METRICS
--------------------------
- Total Solar-Powered Boreholes Drilled:   14 Units
- School Sanitization Blocks Completed:    32 Cubicles
- Menstrual Hygiene Washable Kits:         4,500+ Kits Distributed
- Total Rural Students Restored to Class:  18,200+ Active Beneficiaries
- Female Student Retentivity Rate:          +38.5% average attendance increase

4. INDEPENDENT AUDITOR DECLARATION
-----------------------------------
We, the Ghana Charity Audit Committee & Umoja Strategic Advisory Board, 
confirm that we have audited the financial activities, receipts, and bank 
transfers of the Umoja Foundation for the period of July 1, 2025 to June 30, 2026. 
Capital efficiency meets the premier NGO standard, with over 91% of funds 
directly allocated to on-ground construction and physical equipment.

Certified on July 20, 2026 by:
- Dr. Evelyn Mensah, Lead Auditor, Accra HQ
- Mubaarakah, Founder & Executive Director

Thank you for your life-changing support!
======================================================================`;

    setTimeout(() => {
      const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Umoja_Foundation_Annual_Transparency_Report_2025_2026.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsDownloading(false);
    }, 800);
  };

  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-dark-blue text-white pt-16 pb-8 border-t-4 border-clay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Donor Live Ticker strip */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-terracotta/20 flex items-center justify-center text-terracotta">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-clay">
                {lang === 'sw' ? 'HALI YA UTETEZI WA LIVE YA UMOJA' : 'UMOJA LIVE ADVOCACY STATUS'}
              </p>
              <h4 className="font-display font-extrabold text-xl text-white">
                {lang === 'sw' ? 'Jiunge na Mtandao Wetu wa Usalama' : 'Join Our Safe Space Network'}
              </h4>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            <div>
              <span className="block font-sans text-xs text-clay/80">
                {lang === 'sw' ? 'Wafadhili Walio hai' : 'Active Donors'}
              </span>
              <span className="block font-display font-black text-2xl text-terracotta">{donorCount}</span>
            </div>
            <div>
              <span className="block font-sans text-xs text-clay/80">
                {lang === 'sw' ? 'Fedha Zilizochangwa' : 'Funds Contributed'}
              </span>
              <span className="block font-display font-black text-2xl text-white">${totalDonated.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('donate')}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-display font-bold text-sm transition-all shadow-md cursor-pointer text-center"
          >
            {lang === 'sw' ? 'Fadhili Shule Sasa' : 'Sponsor a School'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: About Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-terracotta flex items-center justify-center text-white">
                <Landmark className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white leading-none">{t.appName}</span>
            </div>
            <p className="font-sans text-sm text-clay/80 leading-relaxed max-w-sm">
              {lang === 'sw' 
                ? 'Tunaziwezesha jamii kupitia ufikiaji mkakati wa maji, miundombinu safi ya usafi, na mifumo ya utetezi wa elimu kote nchini Ghana.' 
                : 'We empower communities through strategic water access, clean sanitation infrastructure, and specialized educational advocacy frameworks across rural Ghana.'}
            </p>
            <div className="flex items-center space-x-2 text-xs text-clay/70">
              <ShieldCheck className="w-4 h-4 text-terracotta" />
              <span>
                {lang === 'sw' ? 'NGO Iliyosajiliwa Ghana Na. CG0241' : 'Certified NGO Registry Ghana No. CG0241'}
              </span>
            </div>
            <div className="space-y-2 pt-2">
              <span className="block text-[10px] uppercase tracking-widest font-sans font-bold text-clay/60">Follow Our Impact</span>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { icon: <Twitter className="w-4 h-4" />, name: 'Twitter/X', url: '#' },
                  { icon: <Facebook className="w-4 h-4" />, name: 'Facebook', url: '#' },
                  { icon: <Instagram className="w-4 h-4" />, name: 'Instagram', url: '#' },
                  { icon: <Linkedin className="w-4 h-4" />, name: 'LinkedIn', url: '#' },
                  { icon: <Github className="w-4 h-4" />, name: 'GitHub', url: '#' },
                  { icon: <Youtube className="w-4 h-4" />, name: 'YouTube', url: '#' }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Mock connection: Redirecting to Umoja Foundation on ${social.name}...`);
                    }}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-terracotta text-clay hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-terracotta/40 hover:-translate-y-0.5"
                    title={social.name}
                    id={`footer-social-${social.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-display font-bold text-base text-white tracking-wide mb-5 uppercase border-b border-white/10 pb-2">
              {lang === 'sw' ? 'Taasisi' : 'Foundation'}
            </h4>
            <ul className="space-y-2.5 font-sans text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="text-clay/80 hover:text-white transition-colors cursor-pointer text-left">
                  {t.home}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-clay/80 hover:text-white transition-colors cursor-pointer text-left">
                  {lang === 'sw' ? 'Dhamira na Timu Yetu' : 'Our Mission & Team'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="text-clay/80 hover:text-white transition-colors cursor-pointer text-left">
                  {lang === 'sw' ? 'Miradi ya WASH' : 'WASH Projects'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('safe-schools')} className="text-clay/80 hover:text-white transition-colors cursor-pointer text-left">
                  {lang === 'sw' ? 'Mpango wa Shule Salama' : 'Safe Schools Initiative'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsReportModalOpen(true)} 
                  className="text-terracotta hover:text-white font-semibold transition-colors cursor-pointer text-left flex items-center space-x-1"
                  id="footer-transparency-report-btn"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>{lang === 'sw' ? 'Ripoti ya Uwazi ya Mwaka' : 'Annual Transparency Report'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Site Programs */}
          <div>
            <h4 className="font-display font-bold text-base text-white tracking-wide mb-5 uppercase border-b border-white/10 pb-2">
              {lang === 'sw' ? 'Lengo la Mpango' : 'Program Focus'}
            </h4>
            <ul className="space-y-2.5 font-sans text-sm">
              <li className="text-clay/80">
                {lang === 'sw' ? 'Visima vya Maji ya Jua' : 'Solar-Powered Boreholes'}
              </li>
              <li className="text-clay/80">
                {lang === 'sw' ? 'Vyoo vya Faragha vya Shule' : 'Private School Sanitation cubicles'}
              </li>
              <li className="text-clay/80">
                {lang === 'sw' ? 'Warsha za Usafi wa Hedhi' : 'Menstrual Hygiene workshops'}
              </li>
              <li className="text-clay/80">
                {lang === 'sw' ? 'Utetezi wa Sera na Ukaguzi' : 'Policy Advocacy & School Audits'}
              </li>
            </ul>
          </div>

          {/* Column 4: Accra Office Details */}
          <div>
            <h4 className="font-display font-bold text-base text-white tracking-wide mb-5 uppercase border-b border-white/10 pb-2">
              {lang === 'sw' ? 'HQ Mawasiliano' : 'Accra HQ Contact'}
            </h4>
            <ul className="space-y-3.5 font-sans text-sm text-clay/80">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-1" />
                <span>Accra, Greater Accra Region, Ghana</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-terracotta shrink-0" />
                <span>+233 (0) 55 843 3835</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-terracotta shrink-0" />
                <span className="break-all">theumojafoundationec@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom copyright area */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-clay/60">
          <p>
            {lang === 'sw' 
              ? '© 2026 Taasisi ya Umoja. Haki zote zimehifadhiwa. NGO iliyosajiliwa chini ya sheria za Ghana.' 
              : '© 2026 Umoja Foundation. All rights reserved. Registered non-profit under Ghana laws.'}
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">
              {lang === 'sw' ? 'Sera ya Faragha' : 'Privacy Terms'}
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              {lang === 'sw' ? 'Kanuni za Uwasilishaji' : 'Regulatory Disclosures'}
            </span>
            <button 
              onClick={() => setIsReportModalOpen(true)}
              className="text-terracotta hover:text-white font-semibold transition-colors cursor-pointer flex items-center space-x-1 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 text-[11px]"
              id="footer-bottom-transparency-btn"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-terracotta shrink-0" />
              <span>{lang === 'sw' ? 'Ripoti ya Mwaka' : 'Transparency Report'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* ANNUAL TRANSPARENCY REPORT MODAL */}
      <AnimatePresence>
        {isReportModalOpen && (
          <div className="fixed inset-0 bg-dark-blue/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-sand-bg border-2 border-clay rounded-3xl w-full max-w-2xl text-dark-blue overflow-hidden shadow-2xl flex flex-col my-8"
              id="transparency-report-modal"
            >
              {/* Modal Header */}
              <div className="bg-dark-blue text-white px-6 py-5 flex justify-between items-center relative border-b-2 border-clay">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-clay font-bold">
                      {lang === 'sw' ? 'SURA YA UWAZI YA UMOJA' : 'UMOJA TRANSPARENCY SHIELD'}
                    </span>
                    <h3 className="font-display font-black text-sm sm:text-base leading-none mt-0.5">
                      {lang === 'sw' ? 'Ripoti ya Kila Mwaka ya Uwazi' : 'Annual Transparency Report'}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={() => setIsReportModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh] text-left">
                
                <div className="space-y-1.5">
                  <div className="inline-flex items-center space-x-1 bg-terracotta/10 px-2 py-0.5 rounded-full text-[10px] text-terracotta font-bold">
                    <Sparkles className="w-3 h-3 text-terracotta" />
                    <span>FY 2025 - 2026</span>
                  </div>
                  <h4 className="font-display font-black text-lg text-dark-blue">
                    {lang === 'sw' ? 'Kuhakikisha Uwajibikaji na Athari Halisi' : 'Ensuring Full Accountability & Real Impact'}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    {lang === 'sw'
                      ? 'Tunajivunia kuwasilisha taarifa zetu za kifedha zilizokaguliwa na metrics za athari za shule salama. Katika Umoja, 91.2% ya kila senti iliyochangwa inakwenda moja kwa moja kwenye ujenzi na ununuzi wa miundombinu kwenye uwanja.'
                      : 'We believe in absolute clarity. Umoja Foundation operates with industry-leading capital efficiency, guaranteeing that over 91% of every sponsor dollar goes directly toward school borehole drilling and sanitation facilities.'}
                  </p>
                </div>

                {/* 1. Key Impact Metrics */}
                <div className="space-y-2.5">
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-extrabold font-sans">
                    {lang === 'sw' ? 'Athari Zilizofikiwa' : 'Key Impact Outcomes'}
                  </span>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white border border-clay p-3 rounded-xl flex items-center space-x-3 shadow-xs">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-display font-black text-sm text-dark-blue">14</span>
                        <span className="block text-[9px] text-gray-500 font-sans leading-tight">
                          {lang === 'sw' ? 'Visima vya Jua' : 'Solar Boreholes Drilled'}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white border border-clay p-3 rounded-xl flex items-center space-x-3 shadow-xs">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-display font-black text-sm text-dark-blue">32</span>
                        <span className="block text-[9px] text-gray-500 font-sans leading-tight">
                          {lang === 'sw' ? 'Vyoo vya Shule' : 'WASH Cubicles Completed'}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white border border-clay p-3 rounded-xl flex items-center space-x-3 shadow-xs">
                      <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                        <Heart className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-display font-black text-sm text-dark-blue">4,500+</span>
                        <span className="block text-[9px] text-gray-500 font-sans leading-tight">
                          {lang === 'sw' ? 'Sodo za Wasichana' : 'Hygiene Kits Distributed'}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white border border-clay p-3 rounded-xl flex items-center space-x-3 shadow-xs">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-display font-black text-sm text-dark-blue">18.2K</span>
                        <span className="block text-[9px] text-gray-500 font-sans leading-tight">
                          {lang === 'sw' ? 'Wanafunzi Waliofaidika' : 'Active School Beneficiaries'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Consolidated Financial allocation with styled bar charts */}
                <div className="bg-white border border-clay rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold font-sans">
                      {lang === 'sw' ? 'Matumizi ya Kifedha Zilizokaguliwa' : 'Audited Fund Allocation'}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 flex items-center">
                      <DollarSign className="w-3.5 h-3.5 shrink-0" />
                      <span>$132,450 USD Total</span>
                    </span>
                  </div>

                  {/* Visual Bar Breakdown */}
                  <div className="space-y-3.5 pt-2">
                    {/* Item 1 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-dark-blue">{lang === 'sw' ? 'Ujenzi na Nyenzo za Kisima/Choo' : 'Construction & Well Equipment'}</span>
                        <span className="text-terracotta">91.2%</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-terracotta rounded-full" style={{ width: '91.2%' }} />
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-dark-blue">{lang === 'sw' ? 'Warsha za Jamii na Elimu ya Usafi' : 'Community Hygiene Workshops'}</span>
                        <span className="text-emerald-600">5.8%</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '5.8%' }} />
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-dark-blue">{lang === 'sw' ? 'Uendeshaji na Utawala' : 'Operations & Auditing'}</span>
                        <span className="text-purple-600">3.0%</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '3%' }} />
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 italic pt-2 border-t border-clay/50">
                    * {lang === 'sw' 
                      ? 'Imethibitishwa na Mshauri Evelyn Mensah na kuwasilishwa kwa Msajili wa Mashirika yasiyo ya Kiserikali nchini Ghana.' 
                      : 'Verified by lead auditor Dr. Evelyn Mensah and submitted formally to the Ghana Non-Governmental Registry Division.'}
                  </p>
                </div>

              </div>

              {/* Modal Footer (Action Area) */}
              <div className="bg-clay/15 px-6 py-4 border-t-2 border-clay flex flex-col sm:flex-row sm:justify-between items-center gap-3">
                <div className="flex items-center space-x-2 text-[11px] text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'sw' ? 'Ripoti imesainiwa kidijitali' : 'Report digitally verified'}</span>
                </div>

                <button
                  onClick={handleDownloadReport}
                  disabled={isDownloading}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-hover disabled:bg-clay text-white font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md hover:scale-102"
                  id="transparency-report-download-btn"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{lang === 'sw' ? 'Inapakua...' : 'Generating Report...'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>{lang === 'sw' ? 'Pakua Faili ya Ripoti' : 'Download Audit Report (.txt)'}</span>
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
