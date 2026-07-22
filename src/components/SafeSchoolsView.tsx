import React from 'react';
import { SchoolAudit } from '../types';
import { INITIAL_AUDITS } from '../data';
import { ShieldCheck, ClipboardCheck, Waves, AlertTriangle, CheckCircle2, Landmark, Plus, FileText, ArrowRight, Eye, Play, Sliders, Calculator, RotateCcw } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';

interface SafeSchoolsViewProps {
  onNavigate: (view: string) => void;
  auditsState: SchoolAudit[];
  onAddNewAudit: (newAudit: SchoolAudit) => void;
  isLoggedIn: boolean;
  lang?: Language;
}

export const SafeSchoolsView: React.FC<SafeSchoolsViewProps> = ({
  onNavigate,
  auditsState,
  onAddNewAudit,
  isLoggedIn,
  lang = 'en'
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedSchoolId, setSelectedSchoolId] = React.useState<string>(auditsState[0]?.id || '');
  const [showIframeViewer, setShowIframeViewer] = React.useState<boolean>(false);
  
  // New Audit Form State
  const [showAddForm, setShowAddForm] = React.useState<boolean>(false);
  const [formSchoolName, setFormSchoolName] = React.useState('');
  const [formRegion, setFormRegion] = React.useState('Eastern Region');
  const [formScore, setFormScore] = React.useState('50');
  const [formWater, setFormWater] = React.useState(false);
  const [formHygiene, setFormHygiene] = React.useState(false);
  const [formSuccessMsg, setFormSuccessMsg] = React.useState<string | null>(null);

  // WASH Audit Simulator State
  const [calcWater, setCalcWater] = React.useState<string>('well');
  const [calcToilet, setCalcToilet] = React.useState<string>('latrine');
  const [calcHygiene, setCalcHygiene] = React.useState<string>('disposable');
  const [calcEdu, setCalcEdu] = React.useState<string>('occasional');
  const [calcName, setCalcName] = React.useState<string>('');
  const [calcSelectedRegion, setCalcSelectedRegion] = React.useState<string>('Eastern Region');
  const [calcSavedSuccess, setCalcSavedSuccess] = React.useState<string | null>(null);

  const getWaterPoints = (val: string) => {
    if (val === 'solar') return 30;
    if (val === 'well') return 15;
    if (val === 'stream') return 5;
    return 0;
  };

  const getToiletPoints = (val: string) => {
    if (val === 'lockable') return 30;
    if (val === 'latrine') return 10;
    return 0;
  };

  const getHygienePoints = (val: string) => {
    if (val === 'full') return 30;
    if (val === 'disposable') return 15;
    return 0;
  };

  const getEduPoints = (val: string) => {
    if (val === 'weekly') return 10;
    if (val === 'occasional') return 5;
    return 0;
  };

  const simulatedScore = getWaterPoints(calcWater) + getToiletPoints(calcToilet) + getHygienePoints(calcHygiene) + getEduPoints(calcEdu);

  const getGradeInfo = (score: number) => {
    if (score >= 85) {
      return { 
        grade: 'A', 
        status: 'Excellent Compliance', 
        color: 'text-green-700 bg-green-50 border-green-200', 
        desc: 'Outstanding baseline parameters. School meets optimal international SDG-6 milestones!' 
      };
    }
    if (score >= 70) {
      return { 
        grade: 'B', 
        status: 'Satisfactory Compliance', 
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200', 
        desc: 'Acceptable baseline. Clean water systems are active; minor sanitation privacy upgrades recommended.' 
      };
    }
    if (score >= 50) {
      return { 
        grade: 'C', 
        status: 'Basic Services', 
        color: 'text-amber-700 bg-amber-50 border-amber-200', 
        desc: 'Moderate deficits. Water lines or dignity supplies are under-funded or lack consistent availability.' 
      };
    }
    if (score >= 30) {
      return { 
        grade: 'D', 
        status: 'Limited Services', 
        color: 'text-orange-700 bg-orange-50 border-orange-200', 
        desc: 'High health exposure risk. Toilets lack functional lockable privacy doors, or clean water lines are offline.' 
      };
    }
    return { 
      grade: 'F', 
      status: 'Critical Deficit', 
      color: 'text-red-700 bg-red-50 border-red-200', 
      desc: 'Severe emergency deficit. Immediate gravity cistern block builds, dignity packs, and school latrines construction needed.' 
    };
  };

  const gradeInfo = getGradeInfo(simulatedScore);

  const handleSaveSimulatedAudit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSchoolName = calcName.trim() || 'Simulated District Center';
    
    const newAudit: SchoolAudit = {
      id: `aud-sim-${Date.now()}`,
      schoolName: finalSchoolName,
      region: calcSelectedRegion,
      auditDate: new Date().toISOString().split('T')[0],
      sanitationScore: simulatedScore,
      needsWaterHookup: calcWater !== 'solar',
      needsMenstrualHygieneKits: calcHygiene !== 'full',
      status: 'Audited'
    };

    onAddNewAudit(newAudit);
    setSelectedSchoolId(newAudit.id);
    setCalcSavedSuccess(`Successfully logged and registered "${finalSchoolName}" into baseline audit registry with an estimated WASH Grade of ${gradeInfo.grade}!`);
    setCalcName('');
    setTimeout(() => {
      setCalcSavedSuccess(null);
      const element = document.getElementById('audit-sandbox-dashboard');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 4500);
  };

  const selectedSchool = auditsState.find(s => s.id === selectedSchoolId);

  const regions = [
    'Eastern Region', 'Ashanti Region', 'Northern Region', 'Volta Region', 
    'Western Region', 'Central Region', 'Upper East Region', 'Western North Region'
  ];

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSchoolName.trim()) return;

    const newAudit: SchoolAudit = {
      id: `aud-${Date.now()}`,
      schoolName: formSchoolName,
      region: formRegion,
      auditDate: new Date().toISOString().split('T')[0],
      sanitationScore: parseInt(formScore) || 50,
      needsWaterHookup: formWater,
      needsMenstrualHygieneKits: formHygiene,
      status: 'Audited'
    };

    onAddNewAudit(newAudit);
    setSelectedSchoolId(newAudit.id);
    setFormSchoolName('');
    setFormWater(false);
    setFormHygiene(false);
    setShowAddForm(false);
    setFormSuccessMsg(`School audit for "${newAudit.schoolName}" added successfully to baseline logs!`);
    setTimeout(() => setFormSuccessMsg(null), 4000);
  };

  const milestones = [
    { year: 'Phase 1: Baseline', title: 'District Field Surveys', desc: 'Audited initial 40 academic centers to document baseline lockable privacy deficits.' },
    { year: 'Phase 2: Water Access', title: 'Solar Borehole Drilling', desc: 'Installed sustainable solar water pumps supplying gravity cistern blocks at 5 core schools.' },
    { year: 'Phase 3: Dignity Supply', title: 'Hygiene Kit Distribution', desc: 'Underwrote reusable menstrual products, eliminating attendance dropouts.' },
    { year: 'Phase 4: Scaling', title: 'Policy Advocacy Frameworks', desc: 'Exporting raw scorecards directly to district planners to lobby for public utility hookups.' }
  ];

  return (
    <div className="space-y-16 py-4 animate-in fade-in duration-300">
      
      {/* 1. HERO CONTEXT BANNER */}
      <section className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-xl">
        <div className="absolute inset-0 bg-dark-blue/85 z-10" />
        <img 
          src="/src/assets/images/school_latrines_wash_1784559855476.jpg" 
          alt="Clean concrete school latrines with WASH station" 
          className="absolute inset-0 w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-8 py-16 text-center text-white space-y-4">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">
            {lang === 'sw' ? 'Mfumo Wetu Mkuu' : 'Flagship Framework'}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl leading-tight tracking-tight">
            {lang === 'sw' ? 'Shule Salama, Wasichana Salama' : 'Safe Schools, Safe Girls'}
          </h1>
          <p className="font-sans text-sm sm:text-base text-clay max-w-2xl mx-auto leading-relaxed">
            {lang === 'sw' 
              ? 'Heshima ni sharti la kwanza la elimu. Tunajenga mazingira salama ya shule kwa kutoa milango ya faragha ya miundombinu, ufikiaji wa maji safi ya bomba, na usimamizi endelevu wa usafi.' 
              : 'Dignity is a prerequisite for education. We build safe school spaces by providing structural privacy gates, active water hookups, and continuous hygiene oversight.'}
          </p>
          
          <div className="pt-2 flex justify-center space-x-4">
            <button
              onClick={() => setShowIframeViewer(!showIframeViewer)}
              className="inline-flex items-center px-6 py-3 rounded-xl font-display font-bold text-xs bg-terracotta hover:bg-terracotta-hover text-white transition-all shadow-md cursor-pointer"
            >
              <Eye className="w-4 h-4 mr-1.5" />
              {showIframeViewer 
                ? (lang === 'sw' ? 'Funga Kitazamaji cha Mpango' : 'Close Initiative Viewer') 
                : (lang === 'sw' ? 'Tazama Tovuti ya Mpango' : 'See Live Initiative Site')}
            </button>
          </div>
        </div>
      </section>

      {/* 2. SLIDING IFRAME WEB VIEWER CONTAINER */}
      {showIframeViewer && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in slide-in-from-top-4 duration-300" id="website-viewer-container">
          <div className="bg-white border border-clay rounded-3xl overflow-hidden shadow-lg">
            <div className="bg-dark-blue px-6 py-3.5 flex justify-between items-center text-white">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-clay">Safe Schools Live Project Viewer</span>
              <button 
                onClick={() => setShowIframeViewer(false)}
                className="text-xs hover:text-terracotta transition-colors font-bold cursor-pointer"
              >
                ✕ Close Preview
              </button>
            </div>
            <div className="bg-clay/40 p-4 border-b border-clay text-xs text-dark-blue font-sans">
              📍 Showcase Reference Node: <strong>Umoja Sanitation & Development Map Hub</strong> • Loaded securely in isolated frame.
            </div>
            <iframe 
              src="https://theumojafoundation.org" 
              title="Umoja External Showcase Node" 
              className="w-full h-[520px] bg-white border-none"
              sandbox="allow-scripts allow-same-origin allow-popups"
              referrerPolicy="no-referrer"
              onError={() => console.log('Iframe failed to load')}
            />
          </div>
        </section>
      )}

      {/* 3. DYNAMIC SCHOOL SANITATION AUDIT TRACKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="audit-sandbox-dashboard">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Audit Selector Column (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1.5">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">
                {lang === 'sw' ? 'Sajili ya Data ya Umma' : 'Public Data Registry'}
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-dark-blue">
                {lang === 'sw' ? 'Ukaguzi wa Usafi wa Shule' : 'School Sanitation Audits'}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-gray-500">
                {lang === 'sw' 
                  ? 'Kagua kumbukumbu za ukaguzi wa usafi wa mazingira zilizorekodiwa na timu zetu za nyanjani kwenye shule za jamii.' 
                  : 'Inspect physical sanitation audit logs recorded by our mobile mapping teams across community schools.'}
              </p>
            </div>

            {formSuccessMsg && (
              <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl font-sans text-xs animate-pulse">
                {formSuccessMsg}
              </div>
            )}

            {/* Selector Buttons */}
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 border-b border-clay pb-4">
              {auditsState.map((audit) => {
                const getScoreColor = (score: number) => {
                  if (score >= 80) return 'text-green-600';
                  if (score >= 50) return 'text-yellow-600';
                  return 'text-red-600';
                };
                
                return (
                  <button
                    key={audit.id}
                    onClick={() => setSelectedSchoolId(audit.id)}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border transition-all flex justify-between items-center cursor-pointer ${
                      selectedSchoolId === audit.id
                        ? 'bg-dark-blue border-dark-blue text-white shadow-md'
                        : 'bg-white border-clay text-dark-blue hover:bg-clay/40'
                    }`}
                  >
                    <div>
                      <span className="block font-display font-bold text-sm truncate max-w-[200px]">{audit.schoolName}</span>
                      <span className={`block text-xs mt-0.5 ${selectedSchoolId === audit.id ? 'text-clay/90' : 'text-gray-500'}`}>
                        {audit.region} • {audit.auditDate}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`block font-display font-extrabold text-sm ${selectedSchoolId === audit.id ? 'text-white' : getScoreColor(audit.sanitationScore)}`}>
                        {audit.sanitationScore}%
                      </span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        audit.status === 'Resolved' 
                          ? 'bg-green-100 text-green-800' 
                          : audit.status === 'WIP' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {audit.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Create Audit Form Trigger */}
            <div className="pt-2">
              {showAddForm ? (
                <form onSubmit={handleAuditSubmit} className="bg-sand-bg border border-clay p-5 rounded-2xl space-y-4 animate-in slide-in-from-bottom-2 duration-150">
                  <h3 className="font-display font-bold text-sm text-dark-blue uppercase tracking-wider">Log New School Audit</h3>
                  
                  <div className="space-y-3.5 font-sans text-xs">
                    <div>
                      <label className="block font-semibold mb-1 text-gray-700">School Name</label>
                      <input 
                        type="text" 
                        value={formSchoolName}
                        onChange={(e) => setFormSchoolName(e.target.value)}
                        placeholder="e.g. Aburi Methodist Primary"
                        className="w-full px-3 py-2 border border-clay rounded-xl bg-white text-dark-blue text-sm focus:outline-none focus:border-terracotta"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1 text-gray-700">Region</label>
                        <select 
                          value={formRegion}
                          onChange={(e) => setFormRegion(e.target.value)}
                          className="w-full px-3 py-2 border border-clay rounded-xl bg-white text-dark-blue text-xs focus:outline-none"
                        >
                          {regions.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold mb-1 text-gray-700">Sanitation Score (0-100)</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="100"
                          value={formScore}
                          onChange={(e) => setFormScore(e.target.value)}
                          className="w-full px-3 py-2 border border-clay rounded-xl bg-white text-dark-blue text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <label className="flex items-center space-x-2.5 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formWater}
                          onChange={(e) => setFormWater(e.target.checked)}
                          className="w-4 h-4 rounded border-clay text-terracotta" 
                        />
                        <span className="font-medium text-gray-700">Needs Water Infrastructure Hookup</span>
                      </label>

                      <label className="flex items-center space-x-2.5 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formHygiene}
                          onChange={(e) => setFormHygiene(e.target.checked)}
                          className="w-4 h-4 rounded border-clay text-terracotta" 
                        />
                        <span className="font-medium text-gray-700">Needs Menstrual Hygiene Kits</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 text-xs">
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-terracotta hover:bg-terracotta-hover text-white font-bold rounded-xl cursor-pointer"
                    >
                      Save Audit Log
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 bg-clay text-dark-blue font-bold rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full py-3.5 border-2 border-dashed border-clay hover:border-terracotta rounded-xl text-center font-display font-bold text-xs text-dark-blue/80 hover:text-terracotta transition-colors cursor-pointer inline-flex items-center justify-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log New School Baseline Survey</span>
                </button>
              )}
            </div>

          </div>

          {/* Audit Details Panel (Right) */}
          <div className="lg:col-span-7 bg-white border border-clay p-6 sm:p-8 rounded-3xl shadow-sm min-h-[480px]">
            {selectedSchool ? (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="border-b border-clay pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-xs uppercase font-sans tracking-widest text-terracotta font-bold">{selectedSchool.region}</span>
                      <h3 className="font-display font-black text-2xl text-dark-blue mt-1">{selectedSchool.schoolName}</h3>
                    </div>
                    <div className="p-4 rounded-2xl bg-clay/50 border border-clay flex flex-col items-center">
                      <span className="text-[10px] text-gray-500 font-semibold font-sans uppercase">SANITATION HEALTH</span>
                      <span className="font-display font-black text-3xl text-dark-blue">{selectedSchool.sanitationScore}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-clay rounded-2xl space-y-2">
                    <h4 className="font-display font-bold text-xs uppercase tracking-wide text-gray-500">Water Network Hookup</h4>
                    <div className="flex items-center space-x-2">
                      {selectedSchool.needsWaterHookup ? (
                        <>
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                          <span className="text-sm font-semibold text-red-700">Deficit: No running water lines</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                          <span className="text-sm font-semibold text-green-700">Equipped: Clean running solar water</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      {selectedSchool.needsWaterHookup 
                        ? 'Requires urgent borehole mapping or pipeline connections from the regional grid.' 
                        : 'Connected directly to a 10,000-liter storage cistern fed via deep-aquifer pumps.'}
                    </p>
                  </div>

                  <div className="p-4 border border-clay rounded-2xl space-y-2">
                    <h4 className="font-display font-bold text-xs uppercase tracking-wide text-gray-500">Menstrual Hygiene kit Status</h4>
                    <div className="flex items-center space-x-2">
                      {selectedSchool.needsMenstrualHygieneKits ? (
                        <>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                          <span className="text-sm font-semibold text-yellow-700">Pending supply deployment</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                          <span className="text-sm font-semibold text-green-700">Kits supplied & integrated</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      {selectedSchool.needsMenstrualHygieneKits 
                        ? 'Health educational campaigns and dignidad products slated for the next term delivery.' 
                        : 'Workshops successfully held by Evelyn Mensah. Girls equipped with washable, reusable cotton dignity pads.'}
                    </p>
                  </div>
                </div>

                {/* Audit Action Callout */}
                <div className="p-5 rounded-2xl bg-sand-bg border border-clay space-y-3">
                  <h4 className="font-display font-bold text-sm text-dark-blue uppercase tracking-wide">Infrastructure Recommendation</h4>
                  <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {selectedSchool.sanitationScore < 50 
                      ? `Abysmal baseline scores. This center is prioritized for full-scale reconstruction. Your donation towards the Safe Schools fund will help us build secure lockable cubicle networks right here.`
                      : selectedSchool.sanitationScore < 85 
                        ? `Moderate facilities present, but lacks sufficient water networks. Targeted pipeline upgrades are ongoing.`
                        : `A model academic sanitation node. Continuous quarterly audits will be logged to verify operations sustainability.`}
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <span className="text-[11px] text-gray-500">Record updated: {selectedSchool.auditDate}</span>
                    <button
                      onClick={() => onNavigate('donate')}
                      className="px-5 py-2 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-display font-bold text-xs transition-colors cursor-pointer inline-flex items-center"
                    >
                      Sponsor This School
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-20">
                <ClipboardCheck className="w-12 h-12 text-clay animate-bounce" />
                <h3 className="font-display font-bold text-lg text-dark-blue">No School Selected</h3>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3.5 YEARLY SANITATION PROGRESS & HEALTH SAFETY INFOGRAPHICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="yearly-progress-infographics">
        <div className="bg-white border border-clay rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">Measured Outcomes & Impact</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-dark-blue mt-1">
              Annual Progress & Safety Metrics
            </h2>
            <p className="font-sans text-xs sm:text-sm text-gray-500 mt-2">
              Our verified annual indicators show significant improvements in sanitation infrastructure, directly correlating to better healthcare standards and student retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Infographic 1: Yearly Sanitation Progress */}
            <div className="space-y-4 bg-sand-bg/40 border border-clay/60 p-5 rounded-2xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-2.5">
                  <span className="p-1.5 rounded-lg bg-terracotta/10 text-terracotta">
                    <Waves className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-base text-dark-blue">Yearly Infrastructure Evolution</h3>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Metrics: 2024 - 2026</span>
                  </div>
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-clay bg-white relative">
                  <img 
                    src="/src/assets/images/yearly_sanitation_progress_1784563533677.jpg" 
                    alt="Infographic showing school water and latrine infrastructure progress by year" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  Through active community drilling and solar pump installations, our model schools transitioned from unprotected seasonal water streams to continuous high-pressure deep boreholes.
                </p>
              </div>

              <div className="pt-4 border-t border-clay/50 grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="block font-display font-black text-lg text-dark-blue">15%</span>
                  <span className="text-[9px] uppercase font-bold text-gray-500">2024 Baseline</span>
                </div>
                <div>
                  <span className="block font-display font-black text-lg text-terracotta">58%</span>
                  <span className="text-[9px] uppercase font-bold text-gray-500">2025 Phase</span>
                </div>
                <div>
                  <span className="block font-display font-black text-lg text-green-600">85%+</span>
                  <span className="text-[9px] uppercase font-bold text-gray-500">2026 Target</span>
                </div>
              </div>
            </div>

            {/* Infographic 2: Health Safety & Dignity Improvements */}
            <div className="space-y-4 bg-sand-bg/40 border border-clay/60 p-5 rounded-2xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-2.5">
                  <span className="p-1.5 rounded-lg bg-dark-blue/10 text-dark-blue">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-base text-dark-blue">School Health & Safety Gains</h3>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Social Impact Outcomes</span>
                  </div>
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-clay bg-white relative">
                  <img 
                    src="/src/assets/images/health_safety_improvements_1784563550316.jpg" 
                    alt="Infographic representing girls hygiene and lockable latrine safety outcomes" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  Integrating dignity packs with secure, lockable sanitation cubicles restored privacy and security, completely eliminating menstrual-related academic absenteeism in target schools.
                </p>
              </div>

              <div className="pt-4 border-t border-clay/50 grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="block font-display font-black text-lg text-dark-blue">92%</span>
                  <span className="text-[9px] uppercase font-bold text-gray-500">Absence Drop</span>
                </div>
                <div>
                  <span className="block font-display font-black text-lg text-terracotta">1,200+</span>
                  <span className="text-[9px] uppercase font-bold text-gray-500">Dignity Packs</span>
                </div>
                <div>
                  <span className="block font-display font-black text-lg text-green-600">100%</span>
                  <span className="text-[9px] uppercase font-bold text-gray-500">Privacy Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: INTERACTIVE SCHOOL WASH ASSESSMENT CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-sand-bg/60 border border-clay rounded-3xl space-y-8" id="wash-assessment-calculator">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">WASH Diagnostics Sandbox</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-dark-blue mt-1">School WASH Safety Calculator</h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 mt-2">
            Simulate regional school infrastructure scenarios to compute their WASH Compliance Score (0-100%) and instantly log them in our public registry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Survey Input Panel (Left) */}
          <div className="lg:col-span-7 bg-white border border-clay p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex items-center space-x-2 border-b border-clay pb-4">
              <Sliders className="w-5 h-5 text-terracotta" />
              <h3 className="font-display font-bold text-base text-dark-blue">Diagnostic Survey Parameters</h3>
            </div>

            <div className="space-y-5 font-sans text-xs sm:text-sm">
              {/* Question 1: Water Source */}
              <div className="space-y-2">
                <label className="block font-bold text-dark-blue uppercase tracking-wider text-[10px]">1. Water Infrastructure Source</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'solar', label: 'Solar-Powered Piped Tap', desc: 'Direct high-pressure gravity-fed network.', points: '+30 pts' },
                    { id: 'well', label: 'Deep Borehole / Hand Pump', desc: 'Reliable water table, requires physical labor.', points: '+15 pts' },
                    { id: 'stream', label: 'Unprotected Stream / Rainwater', desc: 'Highly subject to seasonal cholera outbreaks.', points: '+5 pts' },
                    { id: 'none', label: 'No On-Site Water Source', desc: 'Pupils must carry water from off-site.', points: '0 pts' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCalcWater(opt.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                        calcWater === opt.id
                          ? 'bg-dark-blue border-dark-blue text-white shadow-sm'
                          : 'bg-sand-bg/40 border-clay text-gray-700 hover:bg-clay/25'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-bold text-xs">{opt.label}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          calcWater === opt.id ? 'bg-terracotta text-white' : 'bg-clay/50 text-dark-blue'
                        }`}>{opt.points}</span>
                      </div>
                      <p className={`text-[10px] leading-relaxed mt-1 ${calcWater === opt.id ? 'text-clay' : 'text-gray-400'}`}>
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Toilet Privacy */}
              <div className="space-y-2 pt-2">
                <label className="block font-bold text-dark-blue uppercase tracking-wider text-[10px]">2. Latrine Privacy & Cubicle Status</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'lockable', label: 'Lockable Cubicles', desc: 'Full lockable doors.', points: '+30 pts' },
                    { id: 'latrine', label: 'Unlocked Latrines', desc: 'Open stalls, no secure locks.', points: '+10 pts' },
                    { id: 'none', label: 'Critically Deficient', desc: 'No separation or structure.', points: '0 pts' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCalcToilet(opt.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                        calcToilet === opt.id
                          ? 'bg-dark-blue border-dark-blue text-white shadow-sm'
                          : 'bg-sand-bg/40 border-clay text-gray-700 hover:bg-clay/25'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-bold text-xs">{opt.label}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          calcToilet === opt.id ? 'bg-terracotta text-white' : 'bg-clay/50 text-dark-blue'
                        }`}>{opt.points}</span>
                      </div>
                      <p className={`text-[10px] leading-snug mt-1 ${calcToilet === opt.id ? 'text-clay' : 'text-gray-400'}`}>
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Menstrual Hygiene */}
              <div className="space-y-2 pt-2">
                <label className="block font-bold text-dark-blue uppercase tracking-wider text-[10px]">3. Menstrual Hygiene supplies</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'full', label: 'Full Supply & Disposal', desc: 'Reusable kits + sanitary bin.', points: '+30 pts' },
                    { id: 'disposable', label: 'Disposable Only', desc: 'Pads available, no disposal bin.', points: '+15 pts' },
                    { id: 'none', label: 'No Hygiene Supplies', desc: 'Zero kits or sanitary support.', points: '0 pts' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCalcHygiene(opt.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                        calcHygiene === opt.id
                          ? 'bg-dark-blue border-dark-blue text-white shadow-sm'
                          : 'bg-sand-bg/40 border-clay text-gray-700 hover:bg-clay/25'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-bold text-xs">{opt.label}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          calcHygiene === opt.id ? 'bg-terracotta text-white' : 'bg-clay/50 text-dark-blue'
                        }`}>{opt.points}</span>
                      </div>
                      <p className={`text-[10px] leading-snug mt-1 ${calcHygiene === opt.id ? 'text-clay' : 'text-gray-400'}`}>
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 4: Hygiene Education */}
              <div className="space-y-2 pt-2">
                <label className="block font-bold text-dark-blue uppercase tracking-wider text-[10px]">4. Structured Hygiene Curriculum</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'weekly', label: 'Weekly Curriculum', desc: 'Structured peer support blocks.', points: '+10 pts' },
                    { id: 'occasional', label: 'Occasional Seminars', desc: 'Ad-hoc regional worker visits.', points: '+5 pts' },
                    { id: 'none', label: 'No Active Seminars', desc: 'No specialized hygiene guidance.', points: '0 pts' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCalcEdu(opt.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                        calcEdu === opt.id
                          ? 'bg-dark-blue border-dark-blue text-white shadow-sm'
                          : 'bg-sand-bg/40 border-clay text-gray-700 hover:bg-clay/25'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-bold text-xs">{opt.label}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          calcEdu === opt.id ? 'bg-terracotta text-white' : 'bg-clay/50 text-dark-blue'
                        }`}>{opt.points}</span>
                      </div>
                      <p className={`text-[10px] leading-snug mt-1 ${calcEdu === opt.id ? 'text-clay' : 'text-gray-400'}`}>
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Assessment Report Card Column (Right) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Report Card Card */}
            <div className="bg-white border-2 border-dark-blue rounded-3xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Calculator className="w-32 h-32 text-dark-blue" />
              </div>

              <div className="space-y-1.5 border-b border-clay pb-4">
                <span className="text-[10px] uppercase font-sans tracking-widest text-terracotta font-extrabold">Active Assessment Node</span>
                <h3 className="font-display font-black text-lg text-dark-blue">WASH Compliance Report</h3>
              </div>

              {/* Circular score gauge or badge block */}
              <div className="flex items-center space-x-6">
                <div className={`w-24 h-24 rounded-2xl border flex flex-col items-center justify-center shrink-0 ${gradeInfo.color}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-sans">GRADE</span>
                  <span className="font-display font-black text-4xl">{gradeInfo.grade}</span>
                  <span className="text-[10px] font-semibold mt-0.5">{simulatedScore}% score</span>
                </div>
                <div className="space-y-1 text-left">
                  <span className="text-xs font-sans font-bold text-dark-blue uppercase tracking-wider block">Compliance Rating</span>
                  <h4 className="font-display font-black text-lg text-dark-blue">{gradeInfo.status}</h4>
                  <p className="font-sans text-[11px] text-gray-500 leading-relaxed max-w-[200px]">
                    This score dictates priority for Umoja ground coordination funds.
                  </p>
                </div>
              </div>

              {/* Assessment analysis summary */}
              <div className="p-4 bg-sand-bg/60 border border-clay rounded-2xl text-left text-xs font-sans space-y-2">
                <h5 className="font-bold text-dark-blue uppercase text-[10px] tracking-wide">Analysis Report</h5>
                <p className="text-gray-600 leading-relaxed text-[11px]">{gradeInfo.desc}</p>
              </div>

              {/* Checklist details */}
              <div className="space-y-2.5 text-left text-xs font-sans border-t border-clay/60 pt-4">
                <span className="block font-bold text-dark-blue uppercase text-[10px] tracking-wider">Dynamic Recommendations checklist</span>
                
                <div className="space-y-2 text-[11px]">
                  <div className="flex items-start space-x-2">
                    <span className="mt-0.5 font-bold text-terracotta shrink-0">✓</span>
                    <span className="text-gray-600">
                      {calcWater === 'solar' 
                        ? 'Solar piped pressure network is active. Quarterly valve flow audits required.' 
                        : 'Water infrastructure deficient. Prioritize solar-powered borehole drilling.'}
                    </span>
                  </div>

                  <div className="flex items-start space-x-2">
                    <span className="mt-0.5 font-bold text-terracotta shrink-0">✓</span>
                    <span className="text-gray-600">
                      {calcToilet === 'lockable' 
                        ? 'Lockable cubicles protect student safety. Keep hinges oiled.' 
                        : 'Sanitation privacy deficit. Secure wooden/metal latch cubicle doors.'}
                    </span>
                  </div>

                  <div className="flex items-start space-x-2">
                    <span className="mt-0.5 font-bold text-terracotta shrink-0">✓</span>
                    <span className="text-gray-600">
                      {calcHygiene === 'full' 
                        ? 'Menstrual hygiene kit logistics and bins are active. Maintain supply levels.' 
                        : 'Deploy dignity workshops with reusable cotton pads and sanitization bins.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* SAVE / REGISTER PORTAL FORM */}
              <div className="border-t border-clay/60 pt-4 text-left">
                {calcSavedSuccess ? (
                  <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl font-sans text-xs font-medium text-center animate-pulse">
                    {calcSavedSuccess}
                  </div>
                ) : (
                  <form onSubmit={handleSaveSimulatedAudit} className="space-y-3 font-sans text-xs">
                    <div className="space-y-1">
                      <label className="block font-bold text-gray-700">School Name for Baseline Log</label>
                      <input
                        type="text"
                        value={calcName}
                        onChange={(e) => setCalcName(e.target.value)}
                        placeholder="e.g. Aburi Methodist School"
                        className="w-full px-3 py-2 border border-clay rounded-xl bg-white text-dark-blue text-xs focus:outline-none focus:border-terracotta"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-bold text-gray-700">Select Region Block</label>
                      <select
                        value={calcSelectedRegion}
                        onChange={(e) => setCalcSelectedRegion(e.target.value)}
                        className="w-full px-3 py-2 border border-clay rounded-xl bg-white text-dark-blue text-xs focus:outline-none"
                      >
                        {regions.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
                    >
                      Register in Audit Database
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. FRAMEWORK MILESTONES TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-clay/30 border border-clay/60 rounded-3xl" id="safe-schools-framework">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">Implementation Sequence</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-dark-blue mt-1">Our Rigorous Ground Framework</h2>
          <p className="font-sans text-sm text-gray-500 mt-2">How we transform rural schools into safe, encouraging academic compounds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {milestones.map((milestone, idx) => (
            <div key={idx} className="bg-white border border-clay p-6 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
              <span className="absolute -top-3.5 left-6 bg-dark-blue text-white font-display font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-clay">
                {milestone.year}
              </span>
              <div className="pt-3 space-y-2">
                <h4 className="font-display font-bold text-base text-dark-blue">{milestone.title}</h4>
                <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
