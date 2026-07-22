import React from 'react';
import { Heart, Menu, X, Landmark, User, LogOut, Languages } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isLoggedIn?: boolean;
  loggedInUser?: string;
  onLogout?: () => void;
  lang?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onNavigate,
  isLoggedIn = false,
  loggedInUser = '',
  onLogout,
  lang = 'en',
  onLanguageChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = TRANSLATIONS[lang];

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.aboutUs },
    { id: 'projects', label: t.projects },
    { id: 'safe-schools', label: t.safeSchools },
    { id: 'contact', label: t.contact },
    ...(isLoggedIn 
      ? [{ id: 'profile', label: t.myProfile }]
      : [
          { id: 'signup', label: t.memberSignup },
          { id: 'login', label: t.adminLogin }
        ]
    )
  ];


  return (
    <header className="sticky top-0 z-50 bg-white border-b border-clay shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand area */}
          <div 
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} 
            className="flex items-center space-x-3 cursor-pointer group"
            id="header-brand-logo"
          >
            <div className="w-11 h-11 rounded-full bg-terracotta flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-dark-blue block leading-none">{t.appName}</span>
              <span className="font-sans font-semibold text-[10px] tracking-widest text-terracotta uppercase block mt-1">{t.tagline}</span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex space-x-6 items-center" id="desktop-nav-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-sans font-medium text-sm transition-colors cursor-pointer py-2 ${
                  currentView === item.id 
                    ? 'text-terracotta font-semibold border-b-2 border-terracotta' 
                    : 'text-dark-blue/85 hover:text-terracotta'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 border border-clay rounded-full p-1 bg-sand-bg/40 font-sans text-[11px] font-bold">
              <Languages className="w-3.5 h-3.5 text-gray-400 ml-1.5 mr-0.5 shrink-0" />
              <button
                onClick={() => onLanguageChange?.('en')}
                className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'en' 
                    ? 'bg-dark-blue text-white shadow-sm' 
                    : 'text-dark-blue/80 hover:text-dark-blue'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange?.('sw')}
                className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'sw' 
                    ? 'bg-dark-blue text-white shadow-sm' 
                    : 'text-dark-blue/80 hover:text-dark-blue'
                }`}
              >
                SW
              </button>
              <button
                onClick={() => onLanguageChange?.('fr')}
                className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'fr' 
                    ? 'bg-dark-blue text-white shadow-sm' 
                    : 'text-dark-blue/80 hover:text-dark-blue'
                }`}
              >
                FR
              </button>
            </div>

            <button
              onClick={() => onNavigate('donate')}
              className="inline-flex items-center px-5 py-2.5 rounded-full font-display font-bold text-sm bg-terracotta text-white hover:bg-terracotta-hover transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              id="desktop-quick-donate-btn"
            >
              <Heart className="w-4 h-4 mr-2 fill-white" />
              {t.donateNow}
            </button>

            {isLoggedIn && (
              <div className="flex items-center space-x-3 pl-4 border-l border-clay">
                <button
                  onClick={() => onNavigate('profile')}
                  className={`flex items-center space-x-2 text-dark-blue hover:text-terracotta transition-colors font-sans text-xs font-bold py-1.5 px-2.5 rounded-xl border border-clay bg-sand-bg/40 ${
                    currentView === 'profile' ? 'bg-clay/35 text-terracotta font-extrabold border-terracotta' : ''
                  }`}
                  title="View Your Supporter Dashboard"
                >
                  <User className="w-3.5 h-3.5 text-terracotta shrink-0" />
                  <span className="max-w-[100px] truncate">{loggedInUser}</span>
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="p-1.5 rounded-xl border border-clay hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all cursor-pointer shadow-xs"
                    title="Sign Out Session"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Hamburguer trigger */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Language Switcher */}
            <div className="flex items-center space-x-1 border border-clay rounded-full p-1 bg-sand-bg/40 font-sans text-[10px] font-bold">
              <button
                onClick={() => onLanguageChange?.('en')}
                className={`px-1.5 py-0.5 rounded-full transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-dark-blue text-white' : 'text-dark-blue/80'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange?.('sw')}
                className={`px-1.5 py-0.5 rounded-full transition-all cursor-pointer ${
                  lang === 'sw' ? 'bg-dark-blue text-white' : 'text-dark-blue/80'
                }`}
              >
                SW
              </button>
              <button
                onClick={() => onLanguageChange?.('fr')}
                className={`px-1.5 py-0.5 rounded-full transition-all cursor-pointer ${
                  lang === 'fr' ? 'bg-dark-blue text-white' : 'text-dark-blue/80'
                }`}
              >
                FR
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-dark-blue p-2 hover:bg-clay/50 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-clay animate-in fade-in slide-in-from-top-4 duration-200" id="mobile-drawer-menu">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {isLoggedIn && (
              <div className="p-3.5 bg-sand-bg border border-clay rounded-2xl flex items-center justify-between text-xs font-sans">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-terracotta" />
                  <span className="font-extrabold text-dark-blue truncate max-w-[140px]">{loggedInUser}</span>
                </div>
                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-red-600 font-bold hover:underline flex items-center space-x-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t.logout}</span>
                  </button>
                )}
              </div>
            )}

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl font-sans font-medium text-sm transition-all ${
                  currentView === item.id 
                    ? 'bg-terracotta text-white font-semibold' 
                    : 'text-dark-blue hover:bg-clay/50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-clay">
              <button
                onClick={() => {
                  onNavigate('donate');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-display font-bold shadow-md text-sm"
                id="mobile-quick-donate-btn"
              >
                <Heart className="w-4 h-4 mr-2 fill-white" />
                {t.donateNow}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
