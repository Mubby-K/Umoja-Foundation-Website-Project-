import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, ClipboardCheck, ArrowRight, Activity, Users, Waves, BookOpen, Leaf, BarChart3 } from 'lucide-react';
import { PROJECTS } from '../data';
import { Language, TRANSLATIONS } from '../translations';
import { NewsletterSubscribe } from './NewsletterSubscribe';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onSelectProject: (projectId: string) => void;
  lang?: Language;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectProject, lang = 'en' }) => {
  const [selectedRegion, setSelectedRegion] = React.useState<string | null>(null);
  const t = TRANSLATIONS[lang];

  const keyMetrics = [
    { 
      label: lang === 'sw' ? 'Wasichana Waliowezeshwa' : lang === 'fr' ? 'Filles Émancipées' : 'Girls Empowered', 
      value: '4,500+', 
      icon: Users, 
      desc: lang === 'sw' ? 'Vifaa vya heshima na usafi vimetolewa' : lang === 'fr' ? 'Kits de dignité et sanitaires fournis' : 'Dignity kits and sanitations supplied' 
    },
    { 
      label: lang === 'sw' ? 'Shule Zilizokaguliwa' : lang === 'fr' ? 'Écoles Auditées' : 'Schools Audited', 
      value: '64', 
      icon: ClipboardCheck, 
      desc: lang === 'sw' ? 'Nyaraka za msingi za mazingira' : lang === 'fr' ? 'Données de référence documentées' : 'Documented environmental baselines' 
    },
    { 
      label: lang === 'sw' ? 'Usafi wa Maji' : lang === 'fr' ? "Pureté de l'Eau" : 'Water Cleanliness', 
      value: '100%', 
      icon: Waves, 
      desc: lang === 'sw' ? 'Visima vya jua vilivyothibitishwa kuwa safi' : lang === 'fr' ? 'Forages solaires certifiés purs' : 'Solar deep-boreholes certified pure' 
    },
    { 
      label: lang === 'sw' ? 'Ongezeko la Mahudhurio' : lang === 'fr' ? 'Taux de Rétention' : 'Retention Lift', 
      value: '38%', 
      icon: Activity, 
      desc: lang === 'sw' ? 'Wastani wa ongezeko la mahudhurio ya wasichana' : lang === 'fr' ? "Hausse moyenne de l'assiduité des filles" : 'Average increase in girls attendance' 
    }
  ];

  const ghanaRegions = [
    { 
      id: 'eastern', 
      name: lang === 'sw' ? 'Mkoa wa Mashariki' : lang === 'fr' ? "Région de l'Est" : 'Eastern Region', 
      status: lang === 'sw' ? 'Miradi 8 Imekamilika' : lang === 'fr' ? '8 Projets Actifs' : '8 Projects Active', 
      details: lang === 'sw' ? 'Warsha za hedhi, vituo vya kunawia mikono vya nguvu ya uvutano katika vituo 12 vya msingi.' : lang === 'fr' ? 'Ateliers sur les règles, stations de lavage des mains par gravité dans 12 écoles primaires.' : 'Menstrual workshops, gravity-fed handwashing facilities at 12 primary centers.', 
      schools: 14 
    },
    { 
      id: 'ashanti', 
      name: lang === 'sw' ? 'Mkoa wa Ashanti' : lang === 'fr' ? "Région d'Ashanti" : 'Ashanti Region', 
      status: lang === 'sw' ? 'Miradi 6 Inaendelea' : lang === 'fr' ? '6 Projets Actifs' : '6 Projects Active', 
      details: lang === 'sw' ? 'Kufanya ukaguzi 5 wa usafi wa shule na ujenzi wa vyoo vya faragha.' : lang === 'fr' ? "Réalisation de 5 audits d'assainissement et construction de cabines privées verrouillables." : 'Undergoing 5 heavy school baseline sanitation audits and lockable cubicle construction.', 
      schools: 11 
    },
    { 
      id: 'northern', 
      name: lang === 'sw' ? 'Mkoa wa Kaskazini' : lang === 'fr' ? 'Région du Nord' : 'Northern Region', 
      status: lang === 'sw' ? 'Miradi 11 Imekamilika' : lang === 'fr' ? '11 Projets Réalisés' : '11 Projects Completed', 
      details: lang === 'sw' ? 'Ilikamilisha visima 3 vya maji ya jua kutoa mifumo thabiti kwa raia zaidi ya 4,000.' : lang === 'fr' ? 'Construction de 3 forages solaires profonds desservant plus de 4 000 citoyens.' : 'Completed 3 deep ground solar boreholes providing stable water networks to over 4,000 citizens.', 
      schools: 22 
    },
    { 
      id: 'volta', 
      name: lang === 'sw' ? 'Mkoa wa Volta' : lang === 'fr' ? 'Région de la Volta' : 'Volta Region', 
      status: lang === 'sw' ? 'Miradi 9 Inaendelea' : lang === 'fr' ? '9 Projets Actifs' : '9 Projects Active', 
      details: lang === 'sw' ? 'Ukaguzi wa data ili kugundua maswala ya usafi na kusambaza vifaa vya heshima.' : lang === 'fr' ? "Audits de données actifs pour identifier les besoins urgents et déployer des kits de santé." : 'Active data audits uncovering priority hygiene concerns and deploying health kits.', 
      schools: 15 
    },
    { 
      id: 'western', 
      name: lang === 'sw' ? 'Mkoa wa Magharibi' : lang === 'fr' ? "Région de l'Ouest" : 'Western Region', 
      status: lang === 'sw' ? 'Miradi 4 Inaendelea' : lang === 'fr' ? '4 Projets en Cours' : '4 Projects WIP', 
      details: lang === 'sw' ? 'Hivi sasa tunajenga majengo ya vyoo vya faragha ya kufuli ili kulinda heshima ya wasichana.' : lang === 'fr' ? "Construction de blocs sanitaires privés verrouillables pour préserver la dignité des filles." : 'Currently constructing high-privacy lockable restroom blocks protecting female dignity.', 
      schools: 8 
    }
  ];

  const pillarsList = [
    {
      title: lang === 'sw' ? 'Ushirikiano wa Jamii' : lang === 'fr' ? 'Partenariats Communautaires' : 'Community Partnerships',
      description: lang === 'sw' ? 'Tunafanya kazi bega kwa bega na watetezi wa kikanda, machifu wa jadi, na bodi za shule ili kujenga umiliki wa kina wa ndani.' : lang === 'fr' ? "Nous collaborons avec les défenseurs régionaux, les chefs traditionnels et les comités scolaires pour encourager l'engagement local." : 'We work hand-in-hand with regional advocates, traditional chiefs, and academic school boards to build deep, respectful local ownership of facilities.',
      icon: Users
    },
    {
      title: lang === 'sw' ? 'Ukaguzi wa Data' : lang === 'fr' ? 'Audits Basés sur les Données' : 'Data-Driven Audits',
      description: lang === 'sw' ? 'Kukusanya mara kwa mara vipimo vya mazingira ya umma ili kuonyesha maeneo yenye upungufu na kufuatilia uwajibikaji.' : lang === 'fr' ? "Compilation constante d'indicateurs environnementaux publics pour révéler les failles, mesurer les progrès et garantir la transparence." : 'Consistently compiling public environmental metrics to highlight policy failures, document progress, and track real project accountability.',
      icon: BarChart3
    },
    {
      title: lang === 'sw' ? 'Suluhisho Endelevu' : lang === 'fr' ? 'Solutions Durables' : 'Sustainable Solutions',
      description: lang === 'sw' ? 'Ujenzi wa miundombinu ya muda mrefu inayotumia nishati ya jua, mbolea ya viumbe hai, na vifaa vya ndani.' : lang === 'fr' ? "Conception d'infrastructures durables adaptées au climat, alimentées par l'énergie solaire et utilisant des matériaux locaux." : 'Architecting long-lasting infrastructure tailored to tropical weather elements, utilizing offline solar energy, composting, and local materials.',
      icon: Leaf
    }
  ];

  const activeSelectedRegion = ghanaRegions.find(r => r.id === selectedRegion);

  return (
    <div className="space-y-16 py-4 animate-in fade-in duration-300">
      
      {/* 1. HERO SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-xl" 
        id="home-hero"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark-blue/95 via-dark-blue/80 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1400" 
          alt="Smiling girls with clean water facilities" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-102 hover:scale-105 transition-transform duration-700"
        />
        
        <div className="relative z-20 max-w-4xl px-8 py-20 sm:px-12 sm:py-28 lg:py-36 text-white space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="inline-flex items-center space-x-2 bg-terracotta/20 border border-terracotta/30 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-terracotta uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
            <span>{lang === 'sw' ? 'Taarifa Mpya ya Athari 2026' : 'Active Impact Update 2026'}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight"
          >
            {lang === 'sw' ? 'Shule Salama.' : 'Safe Schools.'}<br />
            <span className="text-terracotta">{lang === 'sw' ? 'Wasichana Salama.' : 'Safe Girls.'}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="font-sans text-base sm:text-lg text-clay/90 max-w-2xl leading-relaxed"
          >
            {t.heroSub}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button
              onClick={() => onNavigate('donate')}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-display font-bold text-sm bg-terracotta text-white hover:bg-terracotta-hover transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <Heart className="w-4 h-4 mr-2 fill-white" />
              {t.donateNow}
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-display font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all backdrop-blur-sm cursor-pointer"
            >
              {t.exploreProjects}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* 2. LIVE METRICS COUNTER GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-metrics">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-dark-blue">
            {t.impactTitle}
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-500 mt-2">
            {t.impactSub}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric, idx) => {
            const IconComponent = metric.icon;
            return (
              <div 
                key={idx}
                className="bg-sand-bg border border-clay p-6 rounded-2xl flex items-start space-x-4 shadow-sm hover:shadow-md transition-all duration-300 hover:border-terracotta/45"
              >
                <div className="p-3 bg-white rounded-xl shadow-inner text-terracotta shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="block font-display font-black text-3xl text-dark-blue tracking-tight">{metric.value}</span>
                  <span className="block font-sans font-semibold text-sm text-dark-blue mt-0.5">{metric.label}</span>
                  <span className="block font-sans text-xs text-gray-500 mt-1 leading-relaxed">{metric.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE DEVELOPMENT MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-clay/30 rounded-3xl border border-clay/60" id="home-interactive-map">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Map Left description and selector */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">
                {lang === 'sw' ? 'Kanda Zinazotumika za Matokeo' : lang === 'fr' ? "Zones d'Impact Actives" : 'Active Zones of Impact'}
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-dark-blue">
                {lang === 'sw' ? 'Ramani ya Kikanda ya Umoja' : lang === 'fr' ? 'Carte de Déploiement Régional' : 'Umoja Regional Deployment Map'}
              </h2>
            </div>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
              {lang === 'sw' 
                ? 'Tunalenga rasilimali zetu moja kwa moja ambapo viashiria vya wasichana kuacha shule viko juu zaidi. Chagua mkoa hapa chini ili kuona ukaguzi uliokamilika na mipango inayoendelea.' 
                : lang === 'fr'
                  ? "Nous concentrons nos ressources directement là où les taux d'abandon scolaire des filles sont les plus élevés. Sélectionnez une région active pour consulter nos audits."
                  : 'We focus resources directly where school drop-out indicators are highest. Select an active region on the side to audit our completed work and ongoing development plans.'}
            </p>
            
            <div className="space-y-3">
              {ghanaRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl border font-sans transition-all flex justify-between items-center cursor-pointer ${
                    selectedRegion === region.id
                      ? 'bg-dark-blue border-dark-blue text-white shadow-md scale-[1.01]'
                      : 'bg-white border-clay text-dark-blue hover:bg-clay/40'
                  }`}
                >
                  <div>
                    <span className="block font-display font-bold text-sm">{region.name}</span>
                    <span className={`block text-xs mt-0.5 ${selectedRegion === region.id ? 'text-clay/95' : 'text-terracotta font-medium'}`}>
                      {region.status}
                    </span>
                  </div>
                  <div className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                    selectedRegion === region.id ? 'bg-terracotta text-white' : 'bg-sand-bg border border-clay text-dark-blue'
                  }`}>
                    {region.schools} {lang === 'sw' ? 'Shule' : lang === 'fr' ? 'Écoles' : 'Schools'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Map Right visual dashboard or interactive readout */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-clay space-y-6">
            {activeSelectedRegion ? (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex justify-between items-start border-b border-clay pb-4">
                  <div>
                    <span className="font-sans font-bold text-[10px] text-terracotta uppercase tracking-wider">
                      {lang === 'sw' ? 'Mkoa Uliochaguliwa' : lang === 'fr' ? 'Région Sélectionnée' : 'Selected Active Region'}
                    </span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-dark-blue">{activeSelectedRegion.name}</h3>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 font-sans font-bold text-xs uppercase">
                    {activeSelectedRegion.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-sm text-dark-blue">
                      {lang === 'sw' ? 'Muhtasari wa Ground Impact' : lang === 'fr' ? 'Résumé de l\'Impact de Terrain' : 'Ground Impact Summary'}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {activeSelectedRegion.details}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-sand-bg rounded-xl border border-clay text-left">
                      <span className="block font-display font-black text-2xl text-dark-blue">{activeSelectedRegion.schools}</span>
                      <span className="block font-sans text-[11px] text-gray-500 font-medium mt-0.5">
                        {lang === 'sw' ? 'Shule za Msingi Zilizosajiliwa' : lang === 'fr' ? 'Écoles Primaires Enregistrées' : 'Registered Baseline Schools'}
                      </span>
                    </div>
                    <div className="p-4 bg-sand-bg rounded-xl border border-clay text-left">
                      <span className="block font-display font-black text-2xl text-terracotta">100%</span>
                      <span className="block font-sans text-[11px] text-gray-500 font-medium mt-0.5">
                        {lang === 'sw' ? 'Udhibiti wa Uwazi wa Ndani' : lang === 'fr' ? 'Audit Local de Transparence' : 'Local Transparency Audit'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-clay flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onNavigate('safe-schools')}
                    className="flex-1 py-3 px-4 rounded-xl text-center font-display font-bold text-xs uppercase tracking-wider bg-dark-blue text-white hover:bg-dark-blue/90 cursor-pointer"
                  >
                    {lang === 'sw' ? 'Kagua Hifadhidata ya Shule' : lang === 'fr' ? 'Consulter les Audits' : 'Inspect Audit Registry'}
                  </button>
                  <button
                    onClick={() => onNavigate('donate')}
                    className="py-3 px-6 rounded-xl text-center font-display font-bold text-xs uppercase tracking-wider bg-terracotta text-white hover:bg-terracotta-hover cursor-pointer"
                  >
                    {t.donateNow}
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center space-y-4 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-clay/35 flex items-center justify-center text-terracotta">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h4 className="font-display font-bold text-base text-dark-blue">
                    {lang === 'sw' ? 'Chagua Mkoa Kwanza' : lang === 'fr' ? 'Sélectionnez une région' : 'Select a Region Area'}
                  </h4>
                  <p className="font-sans text-xs text-gray-400">
                    {lang === 'sw' 
                      ? 'Bofya kwenye mkoa wowote wa kushoto ili kuona ukaguzi, shule, na maendeleo yetu.' 
                      : lang === 'fr'
                        ? 'Cliquez sur l\'une des régions du panneau de gauche pour inspecter nos audits de terrain et rapports.'
                        : 'Click on any regional block on the left panel to inspect real telemetry readout and student safety reports.'}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRegion('eastern')}
                  className="mt-2 py-2 px-4 rounded-full border border-clay text-xs font-bold text-dark-blue hover:bg-clay/30"
                >
                  {lang === 'sw' ? 'Onyesha Mkoa wa Mashariki' : lang === 'fr' ? "Région de l'Est" : 'Load Eastern Region Block'}
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 4. THE CORE PILLARS FRAMEWORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="home-pillars">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">{t.pillarsTitle}</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-dark-blue mt-1">
            {lang === 'sw' ? 'Mbinu Yetu ya Kazi' : 'How We Maintain 100% Transparency'}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 mt-2">
            {t.pillarsSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillarsList.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div key={idx} className="bg-white border border-clay p-6 sm:p-8 rounded-3xl space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-dark-blue">{pillar.title}</h3>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 bg-sand-bg border border-clay rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 mt-12 text-left">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-dark-blue">
              {lang === 'sw' ? 'Je, unataka kuona data halisi ya Shule?' : 'Interested in reviewing verified regional audits?'}
            </h4>
            <p className="font-sans text-xs text-gray-500">
              {lang === 'sw' 
                ? 'Tunachapisha kila ripoti ya ukaguzi wa shule, kiasi cha maji, na mahitaji ya usafi.' 
                : 'We make our complete school sanitation database open-source to track regional baseline needs.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('safe-schools')}
            className="py-2.5 px-5 rounded-xl bg-dark-blue hover:bg-dark-blue/90 text-white font-sans text-xs font-bold shrink-0 cursor-pointer"
          >
            {t.viewAudits}
          </button>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">
              {lang === 'sw' ? 'Sponsor a Living Initiative' : 'Sponsor a Living Initiative'}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-dark-blue">
              {lang === 'sw' ? 'Fadhili Mpango Inayoendelea' : 'Sponsor a Living Initiative'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="font-sans font-bold text-xs sm:text-sm text-terracotta hover:text-terracotta-hover flex items-center space-x-1 cursor-pointer group"
          >
            <span>{lang === 'sw' ? 'Tazama Miradi Yote' : 'View All Projects'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.slice(0, 3).map((project) => {
            const fundingPercent = Math.min(100, Math.round((project.fundingRaised / project.fundingGoal) * 100));
            return (
              <div 
                key={project.id}
                className="bg-white border border-clay rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-dark-blue font-sans font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {project.category}
                  </span>
                </div>
                <div className="p-6 space-y-4 flex flex-col justify-between flex-grow">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-base sm:text-lg text-dark-blue leading-snug group-hover:text-terracotta transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Progress Goal */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-terracotta">
                        {fundingPercent}% {lang === 'sw' ? 'Imefadhiliwa' : 'Sponsored'}
                      </span>
                      <span className="text-dark-blue">${project.fundingRaised.toLocaleString()} / ${project.fundingGoal.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-clay rounded-full overflow-hidden">
                      <div className="h-full bg-terracotta rounded-full transition-all duration-500" style={{ width: `${fundingPercent}%` }} />
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProject(project.id)}
                    className="w-full mt-4 py-2.5 text-center font-display font-bold text-xs rounded-xl bg-clay text-dark-blue hover:bg-terracotta hover:text-white transition-all cursor-pointer"
                  >
                    {lang === 'sw' ? 'Kagua Maelezo' : 'Inspect Details'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. NEWSLETTER SUBSCRIPTION FOR IMPACT UPDATES */}
      <NewsletterSubscribe lang={lang} />

    </div>
  );
};
