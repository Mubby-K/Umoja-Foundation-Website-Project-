import React from 'react';
import { Project } from '../types';
import { PROJECTS as initialProjects } from '../data';
import { 
  Filter, MapPin, Target, Landmark, CheckCircle2, AlertCircle, 
  Heart, Search, X, Share2, Twitter, Facebook, Linkedin, Copy, 
  Check, Sparkles, MessageSquare, ChevronDown, ChevronUp, Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, TRANSLATIONS } from '../translations';

interface ProjectsViewProps {
  onNavigate: (view: string) => void;
  selectedProjectId: string | null;
  onClearSelectedProject: () => void;
  onSponsorProjectDirectly: (projectId: string, amount: number) => void;
  allProjectsState: Project[];
  lang?: Language;
  isLoggedIn?: boolean;
  loggedInUser?: string;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ 
  onNavigate, 
  selectedProjectId, 
  onClearSelectedProject,
  onSponsorProjectDirectly,
  allProjectsState,
  lang = 'en',
  isLoggedIn = false,
  loggedInUser = ''
}) => {
  const [activeCategory, setActiveCategory] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [localSelectedId, setLocalSelectedId] = React.useState<string | null>(selectedProjectId);
  const [sponsorAmountInput, setSponsorAmountInput] = React.useState<string>('50');
  const [contributionSuccess, setContributionSuccess] = React.useState<string | null>(null);

  // 'Share Impact' state managers
  const [isShareExpanded, setIsShareExpanded] = React.useState<boolean>(true);
  const [selectedVibe, setSelectedVibe] = React.useState<'inspirational' | 'stat' | 'urgent'>('stat');
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [showSimulatedShareModal, setShowSimulatedShareModal] = React.useState<boolean>(false);
  const [sharingPlatform, setSharingPlatform] = React.useState<string>('');

  // Dropdown & Admin controls for platform coverage
  const [simulateAdmin, setSimulateAdmin] = React.useState<boolean>(false);
  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = React.useState<boolean>(false);
  const [selectedPlatform, setSelectedPlatform] = React.useState<{
    icon: React.ReactNode;
    name: string;
    color: string;
    label: string;
  } | null>(null);

  const getShareText = (project: Project | null) => {
    const percent = project ? Math.min(100, Math.round((project.fundingRaised / project.fundingGoal) * 100)) : 85;
    const title = project ? project.title : "Umoja WASH Campaign";
    const location = project ? project.location : "Ghana's rural school districts";
    const metrics = project ? project.impactMetrics : "providing clean sanitation and water blocks to 1,200+ students";
    const goal = project ? `$${project.fundingGoal.toLocaleString()}` : "$45,000";

    if (selectedVibe === 'inspirational') {
      return lang === 'sw'
        ? `💧 Maji ni Uzima! Ninajivunia kuunga mkono mpango wa Taasisi ya Umoja: "${title}" huko ${location}. Pamoja tunaleta utu shuleni!`
        : `💧 Water is Life! So proud to support the Umoja Foundation's initiative: "${title}" in ${location}. Together, we are restoring student dignity! #UmojaImpact`;
    } else if (selectedVibe === 'stat') {
      return lang === 'sw'
        ? `📈 Ripoti ya Mafanikio: "${metrics}"! Mradi wa "${title}" umefikia ${percent}% ya lengo la kufadhiliwa kwa ${goal}. Shiriki nasi mabadiliko haya!`
        : `📈 School Impact Milestone: "${metrics}"! The "${title}" initiative is already ${percent}% funded towards its goal of ${goal}. Check out the progress! #WASHGhana`;
    } else {
      return lang === 'sw'
        ? `🚨 HARAKA: Mradi wa "${title}" umefikia ${percent}% ya lengo. Mchango mdogo tu huleta usafi na afya bora kwa watoto huko ${location}. Hebu tuufanye 100%!`
        : `🚨 Action Needed: The "${title}" program is currently at ${percent}% of its funding goal. A small contribution brings clean sanitization to students in ${location}. Let's hit 100%! #SafeSchools`;
    }
  };

  const t = TRANSLATIONS[lang];

  React.useEffect(() => {
    if (selectedProjectId) {
      setLocalSelectedId(selectedProjectId);
    }
  }, [selectedProjectId]);

  const categories = ['All', 'WASH', 'Hygiene', 'Audits', 'Education'];

  const filteredProjects = allProjectsState.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedProject = allProjectsState.find(p => p.id === localSelectedId);
  const shareTargetProject = selectedProject || (allProjectsState && allProjectsState.length > 0 ? allProjectsState[0] : null);

  const handleContribute = (projectId: string) => {
    const amt = parseFloat(sponsorAmountInput);
    if (!isNaN(amt) && amt > 0) {
      onSponsorProjectDirectly(projectId, amt);
      const successText = lang === 'sw' 
        ? `Asante! Mchango wako wa simulated wa $${amt} umerekodiwa kwa mafanikio.`
        : `Thank you! Simulated contribution of $${amt} successfully logged.`;
      setContributionSuccess(successText);
      setTimeout(() => setContributionSuccess(null), 5000);
    }
  };

  return (
    <div className="space-y-12 py-4 animate-in fade-in duration-300">
      
      {/* 1. SECTION INTRO */}
      <section className="bg-sand-bg border border-clay rounded-3xl p-8 sm:p-12 mx-4 sm:mx-6 lg:mx-8 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">
            {lang === 'sw' ? 'Mipango Yetu' : 'Our Initiatives'}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-dark-blue">{t.projectsTitle}</h1>
          <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
            {t.projectsSub}
          </p>
        </div>
      </section>

      {/* 2. DYNAMIC SPLIT SYSTEM: MAIN LIST OR DETAIL FOCUS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedProject ? (
          /* SELECTED PROJECT DEEP DIVE VIEW */
          <div className="bg-white border border-clay rounded-3xl overflow-hidden shadow-md animate-in zoom-in-95 duration-200" id="project-detail-panel">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Image side */}
              <div className="lg:col-span-5 h-64 lg:h-auto relative bg-clay">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <span className="absolute top-4 left-4 px-3.5 py-1 bg-dark-blue/95 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-full">
                  {selectedProject.category}
                </span>
                <button 
                  onClick={() => { onClearSelectedProject(); setLocalSelectedId(null); }}
                  className="absolute bottom-4 left-4 bg-white hover:bg-clay text-dark-blue font-sans font-bold text-xs px-3 py-2 rounded-lg shadow-md cursor-pointer"
                >
                  ← {t.backToProjects}
                </button>
              </div>

              {/* Text / Details side */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-terracotta">
                    <MapPin className="w-4 h-4" />
                    <span>{lang === 'sw' ? 'Mahali: ' : 'Location: '}{selectedProject.location}</span>
                  </div>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-dark-blue leading-tight">
                    {selectedProject.title}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                    selectedProject.status === 'Completed' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : selectedProject.status === 'Active' 
                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200' 
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    {lang === 'sw' 
                      ? (selectedProject.status === 'Completed' ? 'Ilikamilika' : selectedProject.status === 'Active' ? 'Inaendelea' : 'Imepangwa')
                      : selectedProject.status}
                  </span>
                  <span className="px-3 py-1 bg-clay text-dark-blue font-sans font-medium text-xs rounded-full">
                    {selectedProject.impactMetrics}
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-display font-bold text-sm text-dark-blue uppercase tracking-wide">
                    {lang === 'sw' ? 'Upeo wa Mpango kwa Kina' : 'Detailed Program Scope'}
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Progress Indicators */}
                <div className="p-6 bg-sand-bg border border-clay rounded-2xl space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="block text-xs text-gray-500 font-sans uppercase tracking-wider">
                        {lang === 'sw' ? 'Maendeleo ya Kuchangisha Fedha' : 'Fundraising Progress'}
                      </span>
                      <span className="block font-display font-black text-xl text-dark-blue mt-0.5">
                        ${selectedProject.fundingRaised.toLocaleString()} {lang === 'sw' ? 'zilizopatikana kati ya' : 'raised of'} ${selectedProject.fundingGoal.toLocaleString()}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-terracotta text-white font-sans font-bold text-xs rounded-full self-start sm:self-auto">
                      {Math.min(100, Math.round((selectedProject.fundingRaised / selectedProject.fundingGoal) * 100))}% {lang === 'sw' ? 'Imefadhiliwa' : 'Sponsored'}
                    </span>
                  </div>

                  <div className="w-full h-3 bg-white border border-clay rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-terracotta rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, (selectedProject.fundingRaised / selectedProject.fundingGoal) * 100)}%` }} 
                    />
                  </div>

                  {/* Immediate Interactive sponsorship portal for real state update */}
                  {selectedProject.status !== 'Completed' && (
                    <div className="pt-4 border-t border-clay/60 space-y-3">
                      <h5 className="font-display font-bold text-xs uppercase tracking-wide text-dark-blue">
                        {lang === 'sw' ? 'Fanya Udhamini wa Mfano' : 'Perform Simulated Contribution'}
                      </h5>
                      
                      {contributionSuccess && (
                        <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-lg font-sans">
                          {contributionSuccess}
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="relative flex-grow max-w-xs">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 font-bold font-sans text-sm">$</span>
                          <input 
                            type="number" 
                            value={sponsorAmountInput}
                            onChange={(e) => setSponsorAmountInput(e.target.value)}
                            className="w-full pl-7 pr-3 py-2 border border-clay rounded-xl bg-white text-sm font-semibold focus:outline-none focus:border-terracotta text-dark-blue"
                            placeholder="Enter amount"
                          />
                        </div>
                        <button
                          onClick={() => handleContribute(selectedProject.id)}
                          className="px-5 py-2 rounded-xl bg-dark-blue text-white hover:bg-terracotta transition-colors font-display font-bold text-xs cursor-pointer inline-flex items-center"
                        >
                          <Heart className="w-3.5 h-3.5 mr-1.5 fill-white" />
                          {lang === 'sw' ? 'Tumia Athari' : 'Apply Impact'}
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-500">
                        {lang === 'sw' 
                          ? '*Kikashata hiki cha mchango kinasasisha vipimo vya lengo la mradi moja kwa moja kwenye kipindi hiki.'
                          : '*This immediate contribution simulated widget directly updates the real-time goal metrics inside this session.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* ALL PROJECTS CATEGORIZED LIST VIEW */
          <div className="space-y-8">
            
            {/* Search and Category Filters Control Bar */}
            <div className="bg-sand-bg/60 border border-clay rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs" id="projects-controls">
              
              {/* Search input with icons */}
              <div className="space-y-2">
                <label htmlFor="project-search-input" className="block text-xs font-bold text-dark-blue uppercase tracking-widest flex items-center">
                  <Search className="w-4 h-4 mr-1.5 text-terracotta" />
                  {lang === 'sw' ? 'Tafuta Miradi:' : lang === 'fr' ? 'Rechercher des projets :' : 'Search Projects:'}
                </label>
                <div className="relative">
                  <input
                    id="project-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      lang === 'sw'
                        ? 'Tafuta kwa jina la mradi au eneo (mkoa)...'
                        : lang === 'fr'
                          ? 'Rechercher par titre de projet ou région...'
                          : 'Search by project title or region...'
                    }
                    className="w-full pl-10 pr-10 py-3 border border-clay rounded-xl bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta text-dark-blue shadow-xs"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-4.5 h-4.5 text-gray-400" />
                  </div>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-dark-blue cursor-pointer"
                      title={lang === 'sw' ? 'Futa utafutaji' : lang === 'fr' ? 'Effacer la recherche' : 'Clear search'}
                    >
                      <X className="w-4.5 h-4.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-2 border-t border-clay/50 pt-4" id="project-filters">
                <span className="text-xs font-bold text-dark-blue uppercase tracking-widest flex items-center mr-2">
                  <Filter className="w-4 h-4 mr-1 text-terracotta" />
                  {lang === 'sw' ? 'Chuja Kundi:' : lang === 'fr' ? 'Catégories :' : 'Filter Category:'}
                </span>
                {categories.map(cat => {
                  const translatedCategory = lang === 'sw'
                    ? (cat === 'All' ? 'Zote' : cat === 'WASH' ? 'WASH' : cat === 'Hygiene' ? 'Usafi' : cat === 'Audits' ? 'Ukaguzi' : 'Elimu')
                    : lang === 'fr'
                      ? (cat === 'All' ? 'Tous' : cat === 'WASH' ? 'WASH' : cat === 'Hygiene' ? 'Hygiène' : cat === 'Audits' ? 'Audits' : 'Éducation')
                      : cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        activeCategory === cat
                          ? 'bg-terracotta text-white shadow-sm'
                          : 'bg-white border border-clay text-dark-blue hover:bg-clay/50 hover:text-terracotta'
                      }`}
                    >
                      {translatedCategory}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* List Grid or Empty State */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-sand-bg/40 border border-clay rounded-3xl space-y-4 shadow-sm animate-in fade-in duration-200">
                <AlertCircle className="w-12 h-12 mx-auto text-gray-400/80" />
                <h3 className="font-display font-bold text-lg text-dark-blue">
                  {lang === 'sw' ? 'Hakuna miradi iliyopatikana' : lang === 'fr' ? 'Aucun projet trouvé' : 'No projects found'}
                </h3>
                <p className="font-sans text-sm text-gray-500 max-w-md mx-auto">
                  {lang === 'sw' 
                    ? `Hakuna matokeo yanayolingana na utafutaji wako "${searchQuery}". Jaribu kurekebisha maneno yako ya utafutaji au ubadilishe kundi.`
                    : lang === 'fr'
                      ? `Aucun résultat ne correspond à votre recherche "${searchQuery}". Essayez de modifier vos mots-clés ou de changer de catégorie.`
                      : `No results matching your search "${searchQuery}". Try adjusting your query terms or changing the active category.`}
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 bg-dark-blue text-white font-sans font-bold text-xs rounded-xl hover:bg-terracotta transition-colors shadow-xs"
                    >
                      {lang === 'sw' ? 'Futa Utafutaji' : lang === 'fr' ? 'Effacer la recherche' : 'Clear Search'}
                    </button>
                  )}
                  {activeCategory !== 'All' && (
                    <button
                      onClick={() => setActiveCategory('All')}
                      className="px-4 py-2 bg-clay text-dark-blue font-sans font-bold text-xs rounded-xl hover:bg-dark-blue hover:text-white transition-colors shadow-xs"
                    >
                      {lang === 'sw' ? 'Onyesha Zote' : lang === 'fr' ? 'Voir tout' : 'Show All Categories'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="projects-list-grid">
                {filteredProjects.map((project) => {
                  const percent = Math.min(100, Math.round((project.fundingRaised / project.fundingGoal) * 100));
                  return (
                    <div 
                      key={project.id}
                      className="bg-white border border-clay rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="h-52 bg-clay relative overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" referrerPolicy="no-referrer" />
                        <span className="absolute top-4 left-4 px-2.5 py-1 bg-white/95 text-dark-blue font-sans font-bold text-[10px] uppercase tracking-widest rounded-full shadow-sm">
                          {project.category}
                        </span>
                      </div>

                      <div className="p-6 space-y-4 flex flex-col justify-between flex-grow">
                        <div className="space-y-1.5">
                          <div className="flex items-center text-xs text-gray-500 font-sans">
                            <MapPin className="w-3.5 h-3.5 mr-1 text-terracotta" />
                            <span>{project.location}</span>
                          </div>
                          <h3 className="font-display font-bold text-base sm:text-lg text-dark-blue leading-snug group-hover:text-terracotta transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                          <p className="font-sans text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* Goal tracking progress bar */}
                        <div className="space-y-1.5 pt-2 border-t border-clay/60">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-terracotta">
                              {percent}% {lang === 'sw' ? 'Imefadhiliwa' : lang === 'fr' ? 'Soutenu' : 'Sponsored'}
                            </span>
                            <span className="text-dark-blue">${project.fundingRaised.toLocaleString()} / ${project.fundingGoal.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-1.5 bg-clay rounded-full overflow-hidden">
                            <div className="h-full bg-terracotta rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                        </div>

                        <button
                          onClick={() => setLocalSelectedId(project.id)}
                          className="w-full py-2.5 rounded-xl bg-clay text-dark-blue hover:bg-dark-blue hover:text-white font-display font-bold text-xs transition-colors cursor-pointer"
                        >
                          {lang === 'sw' ? 'Kagua Kina' : lang === 'fr' ? 'Détails du Projet' : 'Inspect Deep Dive'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}
      </section>

      {/* 3. SUPPORT A SCHOLARSHIP CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-clay/30 py-12 rounded-3xl border border-clay/60 text-center space-y-6">
        <h2 className="font-display font-black text-2xl sm:text-3xl text-dark-blue">
          {lang === 'sw' ? 'Je, una mradi mwingine wa kijamii unaofikiria?' : 'Have a Custom Community Project in Mind?'}
        </h2>
        <p className="font-sans text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {lang === 'sw' 
            ? 'Umoja inakubali ufadhili wa ushirika na wa kibinafsi unaolenga moja kwa moja shule za kikanda. Wasiliana na timu yetu ya upangaji sasa.'
            : 'Umoja accepts corporate and private foundational sponsorships targeting regional school blocks directly. Contact our Greater Accra team to review baseline blueprints.'}
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-display font-bold text-sm transition-transform hover:-translate-y-0.5 cursor-pointer shadow-md"
          >
            {lang === 'sw' ? 'Wasiliana na Wapangaji Wetu' : 'Connect With Our Planners'}
          </button>
        </div>
      </section>

      {/* --- SHARE IMPACT FLOATING COMPONENT --- */}
      {shareTargetProject && (
        <div className="fixed bottom-6 right-6 z-40 max-w-sm w-full px-4 sm:px-0 font-sans" id="share-impact-floating-container">
          {!isShareExpanded ? (
            /* Minimized Floating Circular Trigger */
            <button
              onClick={() => setIsShareExpanded(true)}
              className="ml-auto flex items-center space-x-2 bg-dark-blue hover:bg-terracotta text-white font-display font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-full shadow-2xl transition-all hover:scale-105 cursor-pointer ring-4 ring-white/90 border border-clay animate-bounce"
              title="Expand Impact Sharing Hub"
              id="expand-share-hub-btn"
            >
              <Share2 className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span>Share Impact</span>
            </button>
          ) : (
            /* Fully Expanded Interactive Hub Card */
            <div className="bg-white/95 backdrop-blur-md border border-clay shadow-2xl rounded-3xl p-5 space-y-4 text-left animate-in slide-in-from-bottom-6 duration-300 relative overflow-hidden ring-4 ring-dark-blue/5">
              
              {/* Subtle background color gradients */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-terracotta/5 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-center border-b border-clay/40 pb-2.5">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-terracotta font-bold">Advocacy Hub</span>
                    <h4 className="font-display font-black text-xs text-dark-blue">Share Success Metrics</h4>
                  </div>
                </div>
                <button
                  onClick={() => setIsShareExpanded(false)}
                  className="p-1 rounded-md hover:bg-clay text-gray-400 hover:text-dark-blue transition-colors cursor-pointer"
                  title="Minimize Panel"
                  id="minimize-share-hub-btn"
                >
                  <ChevronDown className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Project Metric Highlights Mini Card */}
              <div className="bg-sand-bg border border-clay/60 rounded-2xl p-3.5 space-y-2">
                <span className="block text-[8px] uppercase tracking-widest text-gray-500 font-bold">Active Sharing Target</span>
                <div className="flex items-start justify-between gap-2">
                  <span className="font-display font-bold text-xs text-dark-blue line-clamp-1">
                    {selectedProject ? selectedProject.title : "Umoja Campaign Overview"}
                  </span>
                  <span className="shrink-0 text-[10px] font-bold text-terracotta bg-white px-2 py-0.5 rounded-full border border-clay">
                    {selectedProject ? selectedProject.category : "Overall"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-clay/40 text-[10px]">
                  <div>
                    <span className="block text-gray-400">Success Metric:</span>
                    <span className="block font-bold text-dark-blue truncate">
                      {selectedProject ? selectedProject.impactMetrics : "1,200+ Students Impacted"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Funding Progress:</span>
                    <span className="block font-bold text-dark-blue">
                      {selectedProject 
                        ? `${Math.min(100, Math.round((selectedProject.fundingRaised / selectedProject.fundingGoal) * 100))}% Sponsored` 
                        : "85% Achieved"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vibe Tabs Segmented Controls */}
              <div className="space-y-1.5">
                <label className="block text-[9px] uppercase tracking-widest font-sans font-extrabold text-gray-500">
                  Select Narrative Vibe
                </label>
                <div className="grid grid-cols-3 gap-1 bg-clay/35 p-1 rounded-xl">
                  {(['stat', 'inspirational', 'urgent'] as const).map((vibe) => (
                    <button
                      key={vibe}
                      onClick={() => setSelectedVibe(vibe)}
                      className={`py-1.5 px-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedVibe === vibe
                          ? 'bg-white text-dark-blue shadow-xs'
                          : 'text-gray-500 hover:text-dark-blue hover:bg-white/40'
                      }`}
                    >
                      {vibe === 'stat' ? 'Data Stat' : vibe === 'inspirational' ? 'Inspire' : 'Urgent'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Captions Preview Textbox */}
              <div className="space-y-1.5 relative">
                <div className="flex justify-between items-center">
                  <label className="block text-[9px] uppercase tracking-widest font-sans font-extrabold text-gray-500">
                    Post Preview
                  </label>
                  <button
                    onClick={() => {
                      const text = getShareText(selectedProject);
                      navigator.clipboard.writeText(text);
                      setIsCopied(true);
                      confetti({
                        particleCount: 40,
                        spread: 50,
                        origin: { x: 0.85, y: 0.85 }
                      });
                      setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className="text-[9px] font-bold text-terracotta hover:text-dark-blue flex items-center space-x-1 cursor-pointer"
                    title="Copy to clipboard"
                    id="copy-preview-text-btn"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy Post'}</span>
                  </button>
                </div>
                <div className="bg-white border border-clay rounded-2xl p-3 h-24 overflow-y-auto text-xs font-sans text-gray-700 leading-relaxed font-medium shadow-inner select-all whitespace-pre-wrap scrollbar-thin">
                  {getShareText(selectedProject)}
                </div>
              </div>

              {/* Social Channels Share Actions */}
              {!isLoggedIn && !simulateAdmin ? (
                <div className="space-y-1.5 border-t border-clay/40 pt-3 text-center">
                  <span className="block text-[9px] uppercase tracking-widest font-sans font-extrabold text-gray-500">
                    Platform Coverage Under Project
                  </span>
                  <div className="bg-sand-bg/80 border border-clay rounded-2xl p-3.5 space-y-2.5 text-center">
                    <Lock className="w-5 h-5 mx-auto text-terracotta" />
                    <div className="space-y-1">
                      <h5 className="font-display font-bold text-xs text-dark-blue">Restricted to Administrators</h5>
                      <p className="text-[10px] text-gray-500 leading-normal">
                        Geographic platform sharing and social media broadcast tools are restricted to certified Umoja executors.
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center pt-1">
                      <button
                        onClick={() => onNavigate('login')}
                        className="px-3 py-1.5 bg-dark-blue hover:bg-terracotta text-white font-display font-bold text-[10px] rounded-lg cursor-pointer transition-colors shadow-xs"
                      >
                        Log In
                      </button>
                      <button
                        onClick={() => setSimulateAdmin(true)}
                        className="px-3 py-1.5 bg-clay/60 hover:bg-clay text-dark-blue font-display font-bold text-[10px] rounded-lg cursor-pointer transition-colors"
                      >
                        Simulate Admin
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 border-t border-clay/40 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="block text-[9px] uppercase tracking-widest font-sans font-extrabold text-gray-500">
                      Share Now ({isLoggedIn ? `Admin: ${loggedInUser}` : 'Simulating Admin'})
                    </span>
                    {simulateAdmin && (
                      <button
                        onClick={() => { setSimulateAdmin(false); setSelectedPlatform(null); }}
                        className="text-[9px] font-bold text-terracotta hover:underline cursor-pointer"
                      >
                        Exit Simulation
                      </button>
                    )}
                  </div>

                  {/* CUSTOM DROPDOWN CONTAINER */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsPlatformDropdownOpen(!isPlatformDropdownOpen)}
                      className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-clay rounded-xl text-xs font-semibold text-dark-blue hover:bg-gray-50 focus:outline-none transition-colors cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center space-x-2">
                        {selectedPlatform ? (
                          <>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${selectedPlatform.color}`}>
                              {selectedPlatform.icon}
                            </div>
                            <span>{selectedPlatform.name}</span>
                          </>
                        ) : (
                          <span className="text-gray-400">Select Platform Coverage...</span>
                        )}
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    {/* DROPDOWN MENU PANEL */}
                    {isPlatformDropdownOpen && (
                      <div className="absolute left-0 right-0 mt-1.5 bg-white border border-clay rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-clay/40 animate-in fade-in slide-in-from-top-1 duration-100">
                        {[
                          { icon: <Twitter className="w-3.5 h-3.5" />, name: 'Twitter / X', color: 'bg-black text-white hover:bg-black/80', label: 'Twitter/X' },
                          { icon: <Facebook className="w-3.5 h-3.5" />, name: 'Facebook', color: 'bg-blue-600 text-white hover:bg-blue-700', label: 'Facebook' },
                          { icon: <Linkedin className="w-3.5 h-3.5" />, name: 'LinkedIn', color: 'bg-blue-700 text-white hover:bg-blue-800', label: 'LinkedIn' },
                          { icon: <MessageSquare className="w-3.5 h-3.5" />, name: 'WhatsApp', color: 'bg-green-600 text-white hover:bg-green-700', label: 'WhatsApp' }
                        ].map((platform) => (
                          <button
                            key={platform.name}
                            type="button"
                            onClick={() => {
                              setSelectedPlatform(platform);
                              setIsPlatformDropdownOpen(false);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-clay/35 hover:text-dark-blue text-left cursor-pointer transition-colors"
                          >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${platform.color}`}>
                              {platform.icon}
                            </div>
                            <span>{platform.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* BROADCAST BUTTON FOR SELECTED PLATFORM */}
                  {selectedPlatform && (
                    <button
                      onClick={() => {
                        setSharingPlatform(selectedPlatform.label);
                        setShowSimulatedShareModal(true);
                        confetti({
                          particleCount: 80,
                          spread: 60,
                          origin: { x: 0.5, y: 0.6 }
                        });
                      }}
                      className={`w-full py-2.5 rounded-xl text-white font-display font-bold text-xs uppercase tracking-wider transition-all hover:scale-102 hover:shadow-md cursor-pointer flex items-center justify-center space-x-1.5 ${selectedPlatform.color}`}
                      id="broadcast-platform-share-btn"
                    >
                      {selectedPlatform.icon}
                      <span>Broadcast via {selectedPlatform.name}</span>
                    </button>
                  )}
                </div>
              )}

              <div className="text-[9px] text-center text-gray-400 font-medium">
                {lang === 'sw' 
                  ? '💧 Kiini cha utetezi huria huchochea uhamasishaji.' 
                  : '💧 Real-time school impact metrics spark empathy.'}
              </div>

            </div>
          )}
        </div>
      )}

      {/* --- MOCK SOCIAL SHARING SUCCESS SIMULATION MODAL --- */}
      {showSimulatedShareModal && shareTargetProject && (
        <div className="fixed inset-0 bg-dark-blue/80 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="simulated-share-modal">
          <div className="bg-white border border-clay rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative overflow-hidden text-left">
            
            {/* Ambient gradients */}
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-yellow-400/10 rounded-full blur-xl" />
            <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-teal-400/10 rounded-full blur-xl" />

            {/* Header Success Badge */}
            <div className="flex items-center space-x-3 pb-3 border-b border-clay/60">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 border border-green-200">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-sans font-black text-[10px] uppercase tracking-widest text-terracotta">Simulated Sharing Broadcast</span>
                <h3 className="font-display font-extrabold text-lg text-dark-blue">Successfully Posted!</h3>
              </div>
            </div>

            <p className="font-sans text-xs text-gray-600 leading-relaxed">
              Your generated advocacy message has been formatted and shared with our simulated <strong>{sharingPlatform}</strong> server hook! Here is how your post is currently broadcasting:
            </p>

            {/* Simulated Social Post Feed Card */}
            <div className="bg-sand-bg border border-clay rounded-2xl p-4 space-y-3.5 shadow-sm">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white text-xs font-bold font-display">
                  U
                </div>
                <div>
                  <span className="block text-xs font-bold text-dark-blue">Umoja Community Advocate</span>
                  <span className="block text-[9px] text-gray-400 font-mono">@umoja_advocate • Just now</span>
                </div>
                <div className="ml-auto px-2 py-0.5 rounded-md bg-white border border-clay text-[9px] font-bold text-dark-blue uppercase tracking-wider">
                  {sharingPlatform}
                </div>
              </div>

              {/* Caption */}
              <p className="font-sans text-xs text-gray-700 leading-relaxed italic font-medium whitespace-pre-wrap">
                "{getShareText(selectedProject)}"
              </p>

              {/* Nested Project Attachment card */}
              <div className="bg-white border border-clay/70 rounded-xl overflow-hidden flex shadow-2xs">
                <img 
                  src={shareTargetProject.image} 
                  alt={shareTargetProject.title} 
                  className="w-16 sm:w-20 h-16 sm:h-20 object-cover border-r border-clay shrink-0" 
                  referrerPolicy="no-referrer"
                />
                <div className="p-2.5 flex flex-col justify-center min-w-0">
                  <span className="block text-[8px] uppercase tracking-wider text-terracotta font-bold">Umoja Impact Showcase</span>
                  <span className="block font-display font-bold text-xs text-dark-blue truncate">{shareTargetProject.title}</span>
                  <span className="block text-[10px] text-gray-500 font-medium truncate">{shareTargetProject.impactMetrics}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { x: 0.5, y: 0.5 },
                    colors: ['#c2410c', '#3b82f6', '#10b981', '#f59e0b']
                  });
                }}
                className="w-full py-2.5 rounded-xl bg-dark-blue hover:bg-dark-blue/90 text-white font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                id="modal-replay-confetti-btn"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Trigger Celebratory Confetti!</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSimulatedShareModal(false)}
                className="w-full py-2.5 rounded-xl border border-clay bg-white text-dark-blue hover:bg-gray-50 font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                id="modal-close-share-btn"
              >
                Done & Return
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
