import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ProjectsView } from './components/ProjectsView';
import { SafeSchoolsView } from './components/SafeSchoolsView';
import { DonateView } from './components/DonateView';
import { ContactView } from './components/ContactView';
import { SignupView } from './components/SignupView';
import { LoginView } from './components/LoginView';
import { UserProfileView } from './components/UserProfileView';

import { PROJECTS, INITIAL_AUDITS } from './data';
import { Project, SchoolAudit, ContactMessage, DonationRecord } from './types';
import { Language, TRANSLATIONS } from './translations';


export default function App() {
  // Language switcher state
  const [lang, setLang] = useState<Language>('en');

  // Navigation Routing State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Global Sandbox Metric Counters
  const [donorCount, setDonorCount] = useState<number>(1482);
  const [totalDonated, setTotalDonated] = useState<number>(41450);

  // Reactive Data Collections
  const [allProjectsState, setAllProjectsState] = useState<Project[]>(PROJECTS);
  const [auditsState, setAuditsState] = useState<SchoolAudit[]>(INITIAL_AUDITS);
  const [sentMessagesState, setSentMessagesState] = useState<ContactMessage[]>([]);

  // Authenticated Member State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<string>('');

  const [userDonations, setUserDonations] = useState<DonationRecord[]>([
    {
      id: 'don-init-1',
      amount: 250,
      date: '2026-03-12',
      projectName: 'WASH Facilities in Rural Ghana',
      projectId: 'proj-wash-rural',
      frequency: 'onetime',
      paymentMethod: 'card',
      receiptId: 'TX-481943'
    },
    {
      id: 'don-init-2',
      amount: 120,
      date: '2026-04-20',
      projectName: 'Menstrual Hygiene Management Workshops',
      projectId: 'proj-mhm-workshops',
      frequency: 'monthly',
      paymentMethod: 'momo',
      receiptId: 'TX-938102'
    },
    {
      id: 'don-init-3',
      amount: 100,
      date: '2026-05-18',
      projectName: 'Data-Driven School Audits',
      projectId: 'proj-school-audits',
      frequency: 'onetime',
      paymentMethod: 'card',
      receiptId: 'TX-551029'
    }
  ]);

  // Handle Dynamic Direct Project Sponsorship
  const handleSponsorProjectDirectly = (projectId: string, amount: number) => {
    const proj = allProjectsState.find(p => p.id === projectId);
    
    setAllProjectsState(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          fundingRaised: Math.min(p.fundingGoal, p.fundingRaised + amount)
        };
      }
      return p;
    }));
    
    // Create new ledger entry
    const newRecord: DonationRecord = {
      id: `don-${Date.now()}`,
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      projectName: proj ? proj.title : 'Direct Project Sponsorship',
      projectId: projectId,
      frequency: 'onetime',
      paymentMethod: 'card',
      receiptId: `TX-${Math.floor(100000 + Math.random() * 900000)}`
    };
    setUserDonations(prev => [newRecord, ...prev]);
    
    // Also increment general stats
    setDonorCount(prev => prev + 1);
    setTotalDonated(prev => prev + amount);
  };

  // Handle General Donation checkout
  const handleDonateSuccess = (amount: number) => {
    // Create new general ledger entry
    const newRecord: DonationRecord = {
      id: `don-${Date.now()}`,
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      projectName: 'General WASH & Hygiene Fund',
      frequency: 'onetime',
      paymentMethod: 'card',
      receiptId: `TX-${Math.floor(100000 + Math.random() * 900000)}`
    };
    setUserDonations(prev => [newRecord, ...prev]);

    setDonorCount(prev => prev + 1);
    setTotalDonated(prev => prev + amount);
    
    // Distribute a tiny mock allocation to active under-funded projects
    setAllProjectsState(prev => prev.map(p => {
      if (p.status !== 'Completed' && p.fundingRaised < p.fundingGoal) {
        const share = Math.round(amount * 0.4); // Allocate a portion directly
        return {
          ...p,
          fundingRaised: Math.min(p.fundingGoal, p.fundingRaised + share)
        };
      }
      return p;
    }));
  };


  // Navigate to particular project details page
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add a newly logged school audit
  const handleAddNewAudit = (newAudit: SchoolAudit) => {
    setAuditsState(prev => [newAudit, ...prev]);
  };

  // Submit Contact message
  const handleSendMessage = (msg: ContactMessage) => {
    setSentMessagesState(prev => [msg, ...prev]);
  };

  const handleLoginStateChange = (state: boolean, username: string) => {
    setIsLoggedIn(state);
    setLoggedInUser(username);
  };

  const onNavigateView = (view: string) => {
    setCurrentView(view);
    setSelectedProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Component Router
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView 
            onNavigate={onNavigateView} 
            onSelectProject={handleSelectProject} 
            lang={lang}
          />
        );
      case 'about':
        return (
          <AboutView 
            onNavigate={onNavigateView} 
            isLoggedIn={isLoggedIn}
            loggedInUser={loggedInUser}
            lang={lang}
          />
        );
      case 'projects':
        return (
          <ProjectsView 
            onNavigate={onNavigateView}
            selectedProjectId={selectedProjectId}
            onClearSelectedProject={() => setSelectedProjectId(null)}
            onSponsorProjectDirectly={handleSponsorProjectDirectly}
            allProjectsState={allProjectsState}
            lang={lang}
            isLoggedIn={isLoggedIn}
            loggedInUser={loggedInUser}
          />
        );
      case 'safe-schools':
        return (
          <SafeSchoolsView 
            onNavigate={onNavigateView}
            auditsState={auditsState}
            onAddNewAudit={handleAddNewAudit}
            isLoggedIn={isLoggedIn}
            lang={lang}
          />
        );
      case 'donate':
        return (
          <DonateView 
            onDonateSuccess={handleDonateSuccess} 
            lang={lang}
          />
        );
      case 'contact':
        return (
          <ContactView 
            onSendMessage={handleSendMessage}
            sentMessagesState={sentMessagesState}
            lang={lang}
          />
        );
      case 'signup':
        return (
          <SignupView 
            onNavigate={onNavigateView}
            onAutoLogin={(name) => handleLoginStateChange(true, name)}
            lang={lang}
          />
        );
      case 'login':
        return (
          <LoginView 
            onNavigate={onNavigateView}
            isLoggedIn={isLoggedIn}
            onLoginStateChange={handleLoginStateChange}
            loggedInUser={loggedInUser}
            lang={lang}
          />
        );
      case 'profile':
        return (
          <UserProfileView 
            isLoggedIn={isLoggedIn}
            loggedInUser={loggedInUser}
            onNavigate={onNavigateView}
            allProjects={allProjectsState}
            donations={userDonations}
            onAddDonation={(record) => setUserDonations(prev => [record, ...prev])}
            onSponsorProjectDirectly={handleSponsorProjectDirectly}
            lang={lang}
          />
        );
      default:
        return (
          <HomeView 
            onNavigate={onNavigateView} 
            onSelectProject={handleSelectProject} 
            lang={lang}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      
      {/* Dynamic Header with SPA routing */}
      <Header 
        currentView={currentView} 
        onNavigate={onNavigateView} 
        isLoggedIn={isLoggedIn}
        loggedInUser={loggedInUser}
        onLogout={() => handleLoginStateChange(false, '')}
        lang={lang}
        onLanguageChange={setLang}
      />
      
      {/* Primary Dynamic Main Body */}
      <main className="flex-grow">
        {renderView()}
      </main>
      
      {/* Global Dynamic Footer with stats tracker */}
      <Footer 
        onNavigate={onNavigateView} 
        donorCount={donorCount} 
        totalDonated={totalDonated} 
        lang={lang}
      />
      
    </div>
  );
}

