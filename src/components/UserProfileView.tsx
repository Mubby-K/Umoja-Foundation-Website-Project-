import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, ShieldCheck, Droplets, Sparkles, Heart, History, 
  Download, User, MapPin, Calendar, DollarSign, CheckCircle2, 
  Lock, Unlock, Send, Info, ExternalLink, Trophy, Target, 
  TrendingUp, Flame, Settings2, Trash2, X, Eye, FileText,
  Clock, Plus, Bell, Smartphone, Mail
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project, DonationRecord } from '../types';
import { Language } from '../translations';

interface UserProfileViewProps {
  isLoggedIn: boolean;
  loggedInUser: string;
  onNavigate: (view: string) => void;
  allProjects: Project[];
  donations: DonationRecord[];
  onAddDonation: (donation: DonationRecord) => void;
  onSponsorProjectDirectly: (projectId: string, amount: number) => void;
  lang?: Language;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  isLoggedIn,
  loggedInUser,
  onNavigate,
  allProjects,
  donations,
  onAddDonation,
  onSponsorProjectDirectly,
  lang = 'en'
}) => {
  // Local profile states
  const [displayName, setDisplayName] = useState(
    loggedInUser ? loggedInUser.split('.')[0].replace(/^\w/, c => c.toUpperCase()) : 'Sarah Jenkins'
  );
  const [bio, setBio] = useState('Passionate about clean water autonomy and menstrual hygiene retention in rural district assemblies.');
  const [location, setLocation] = useState('Accra / San Francisco');
  const [memberSince, setMemberSince] = useState('2025-05-12');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200');
  
  // Interactive editing mode
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(displayName);
  const [editBio, setEditBio] = useState(bio);
  const [editLocation, setEditLocation] = useState(location);

  // Filter & Search states for Ledger
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProject, setFilterProject] = useState('all');

  // Quick donate launcher inside profile
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [quickAmount, setQuickAmount] = useState('50');
  const [quickFrequency, setQuickFrequency] = useState<'onetime' | 'monthly'>('onetime');
  const [quickSuccess, setQuickSuccess] = useState(false);

  // Tax Receipt Modal
  const [selectedReceipt, setSelectedReceipt] = useState<DonationRecord | null>(null);

  // Direct Message to Project Team
  const [messageProject, setMessageProject] = useState<string | null>(null);
  const [projectMessageText, setProjectMessageText] = useState('');
  const [messageSentSuccess, setMessageSentSuccess] = useState(false);

  // Volunteer hour tracking states
  const [volunteerLog, setVolunteerLog] = useState([
    { id: 'v-1', date: '2026-06-14', hours: 6, activity: 'Water Filtration Tank Assembly', role: 'Technical Assistant', notes: 'Helped mount the overhead filtration canisters and plumbing seals in Ashongman.' },
    { id: 'v-2', date: '2026-06-28', hours: 4, activity: 'MHM Hygiene Kit Distribution', role: 'Supply Lead', notes: 'Managed logistics of pack distribution for 150 school students.' },
    { id: 'v-3', date: '2026-07-05', hours: 2, activity: 'Regional Schools Baseline Audit', role: 'Data Scribe', notes: 'Recorded washroom lock audits for three sub-district schools.' }
  ]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [logTitle, setLogTitle] = useState('Water Filtration Tank Assembly');
  const [logHours, setLogHours] = useState('4');
  const [logRole, setLogRole] = useState('Field Assistant');
  const [logNotes, setLogNotes] = useState('');
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [unlockedMilestoneModal, setUnlockedMilestoneModal] = useState<{title: string; desc: string; level: string} | null>(null);

  // -------------------------------------------------------------
  // NEW FEATURE: REMINDERS & NOTIFICATION PREFERENCES STATES
  // -------------------------------------------------------------
  const [emailRemindersEnabled, setEmailRemindersEnabled] = useState<boolean>(() => {
    return localStorage.getItem('umoja_pref_email_reminders') !== 'false';
  });
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState<boolean>(() => {
    return localStorage.getItem('umoja_pref_push_notifications') === 'true';
  });
  const [reminderDayOfMonth, setReminderDayOfMonth] = useState<string>(() => {
    return localStorage.getItem('umoja_pref_reminder_day') || '1';
  });
  const [reminderAmount, setReminderAmount] = useState<string>(() => {
    return localStorage.getItem('umoja_pref_reminder_amount') || '50';
  });
  const [notifyOnMilestone, setNotifyOnMilestone] = useState<boolean>(() => {
    return localStorage.getItem('umoja_pref_notify_milestone') !== 'false';
  });
  const [notifyOnNewProjects, setNotifyOnNewProjects] = useState<boolean>(() => {
    return localStorage.getItem('umoja_pref_notify_new_projects') !== 'false';
  });
  const [notificationSavedToast, setNotificationSavedToast] = useState<boolean>(false);
  const [simulatedAlert, setSimulatedAlert] = useState<{
    title: string;
    body: string;
    icon: string;
    type: 'push' | 'email';
  } | null>(null);

  // -------------------------------------------------------------
  // NEW FEATURE: VOLUNTEER OPPORTUNITY BOARD STATES
  // -------------------------------------------------------------
  const [oppsFilter, setOppsFilter] = useState<string>('all');
  const [signUpOpportunity, setSignUpOpportunity] = useState<any | null>(null);
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [selectedRoleOption, setSelectedRoleOption] = useState<string>('');
  const [signedUpOpportunityDetails, setSignedUpOpportunityDetails] = useState<any | null>(null);
  const [userSignups, setUserSignups] = useState<any[]>(() => {
    const saved = localStorage.getItem('umoja_volunteer_user_signups');
    return saved ? JSON.parse(saved) : [];
  });

  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-clay/10 rounded-full flex items-center justify-center mx-auto text-dark-blue">
          <Lock className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h2 className="font-display font-black text-2xl text-dark-blue">Access Restricted</h2>
        <p className="font-sans text-sm text-gray-500 max-w-md mx-auto">
          Please sign in to view your donor dashboard, check your tax receipt records, track active project sponsorships, and inspect your impact milestones.
        </p>
        <button
          onClick={() => onNavigate('login')}
          className="px-6 py-3 rounded-full bg-terracotta hover:bg-terracotta-hover text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          Sign In to Portal
        </button>
      </div>
    );
  }

  // Handle saving profile changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayName(editName);
    setBio(editBio);
    setLocation(editLocation);
    setIsEditingProfile(false);
  };

  // Generate and download a beautifully styled, printable HTML receipt
  const handleDownloadReceipt = (receipt: DonationRecord) => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tax-Deductible Donation Receipt - Umoja Foundation</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #0f172a;
      background-color: #ffffff;
      margin: 0;
      padding: 40px;
    }
    .receipt-container {
      max-width: 650px;
      margin: 0 auto;
      border: 2px solid #0f172a;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      position: relative;
    }
    .watermark {
      position: absolute;
      top: 40px;
      right: 40px;
      width: 80px;
      height: 80px;
      opacity: 0.1;
      color: #0f172a;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 20px;
    }
    .org-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .receipt-title {
      font-size: 11px;
      font-weight: 700;
      color: #c2410c; /* terracotta color */
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .org-sub {
      font-size: 10px;
      color: #64748b;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }
    .grid-item h3 {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
      margin: 0 0 4px 0;
    }
    .grid-item p {
      font-size: 13px;
      font-weight: 600;
      color: #0f172a;
      margin: 0;
    }
    .ledger {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 30px;
    }
    .ledger-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px dashed #e2e8f0;
      font-size: 13px;
    }
    .ledger-row:last-child {
      border-bottom: none;
      padding-top: 15px;
      font-size: 16px;
      font-weight: 800;
    }
    .label {
      color: #64748b;
    }
    .value {
      font-weight: 600;
      color: #0f172a;
      text-align: right;
    }
    .value-total {
      color: #c2410c;
    }
    .footer-note {
      font-size: 11px;
      color: #64748b;
      line-height: 1.6;
      text-align: center;
      margin-top: 30px;
      border-top: 1px solid #e2e8f0;
      padding-top: 20px;
    }
    .signature {
      margin-top: 15px;
      font-weight: 700;
      font-size: 12px;
      color: #0f172a;
    }
    @media print {
      body {
        padding: 0;
      }
      .receipt-container {
        border: none;
        box-shadow: none;
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <svg class="watermark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
    
    <div class="header">
      <div class="org-title">UMOJA FOUNDATION ADVOCACY</div>
      <div class="receipt-title">OFFICIAL TAX SPONSORSHIP RECEIPT</div>
      <div class="org-sub">Ashongman Traditional Block &bull; 501(c)(3) Non-Profit Entity ID #94-384391</div>
    </div>

    <div class="grid">
      <div class="grid-item">
        <h3>Authorized Representative</h3>
        <p>${displayName}</p>
        <p style="font-size: 11px; color: #64748b; font-weight: normal; margin-top: 2px;">${location}</p>
      </div>
      <div class="grid-item" style="text-align: right;">
        <h3>Handshake Date</h3>
        <p>${receipt.date}</p>
        <p style="font-size: 11px; color: #64748b; font-weight: normal; margin-top: 2px;">Receipt: #${receipt.receiptId}</p>
      </div>
    </div>

    <div class="ledger">
      <div class="ledger-row">
        <span class="label">Sponsorship Project Target</span>
        <span class="value">${receipt.projectName}</span>
      </div>
      <div class="ledger-row">
        <span class="label">Gateway Authorization ID</span>
        <span class="value" style="font-family: monospace;">${receipt.id}</span>
      </div>
      <div class="ledger-row">
        <span class="label">Donation Mode Channel</span>
        <span class="value" style="text-transform: capitalize;">${receipt.frequency} Support</span>
      </div>
      <div class="ledger-row">
        <span class="label">Payment Gateway Channel</span>
        <span class="value" style="text-transform: capitalize;">${receipt.paymentMethod === 'card' ? 'Credit / Debit Card' : 'Mobile Money'}</span>
      </div>
      <div class="ledger-row">
        <span class="label" style="font-weight: 800; color: #0f172a;">Tax-Deductible Contribution Volume</span>
        <span class="value value-total">$${receipt.amount.toLocaleString()} USD</span>
      </div>
    </div>

    <div class="footer-note">
      <p>This contribution has been authorized inside the regional Umoja ledgers. No products or personal services were supplied in consideration for this financial grant.</p>
      <div class="signature">Verified by executive director Mubaarakah Salwat Rashid</div>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Umoja_Receipt_${receipt.receiptId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate and download a comprehensive donation history summary for tax purposes
  const handleDownloadTaxSummary = () => {
    const sortedDonations = [...donations].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const tableRowsHtml = sortedDonations.map(d => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">${d.receiptId}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${d.projectName}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-transform: capitalize;">${d.frequency === 'onetime' ? 'One-Time' : 'Monthly'}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${d.date}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; text-align: right; color: #c2410c;">$${d.amount.toLocaleString()} USD</td>
      </tr>
    `).join('');

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Annual Tax-Deductible Contribution Statement - Umoja Foundation</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #0f172a;
      background-color: #ffffff;
      margin: 0;
      padding: 40px;
      line-height: 1.5;
    }
    .statement-container {
      max-width: 750px;
      margin: 0 auto;
      border: 1px solid #cbd5e1;
      border-radius: 20px;
      padding: 45px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.03);
      position: relative;
    }
    .watermark {
      position: absolute;
      top: 45px;
      right: 45px;
      width: 90px;
      height: 90px;
      opacity: 0.08;
      color: #0f172a;
    }
    .header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 25px;
      margin-bottom: 30px;
    }
    .org-title {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin: 0 0 6px 0;
    }
    .statement-title {
      font-size: 13px;
      font-weight: 800;
      color: #c2410c; /* terracotta */
      letter-spacing: 0.2em;
      text-transform: uppercase;
      margin: 0 0 8px 0;
    }
    .org-sub {
      font-size: 11px;
      color: #64748b;
      margin: 0;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 30px;
      margin-bottom: 35px;
    }
    .meta-box {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px;
    }
    .meta-box h3 {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #64748b;
      margin: 0 0 8px 0;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
    }
    .meta-box p {
      font-size: 13px;
      margin: 4px 0;
      color: #334155;
    }
    .meta-box strong {
      color: #0f172a;
    }
    .summary-card {
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .summary-card .label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #166534;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .summary-card .amount {
      font-size: 28px;
      font-weight: 900;
      color: #15803d;
      margin: 0;
    }
    .summary-card .subtext {
      font-size: 11px;
      color: #166534;
      margin-top: 4px;
      font-weight: 500;
    }
    .table-container {
      margin-bottom: 35px;
    }
    .ledger-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      text-align: left;
    }
    .ledger-table th {
      background-color: #f1f5f9;
      color: #475569;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: 0.05em;
      padding: 12px;
      border-bottom: 2px solid #cbd5e1;
    }
    .ledger-table tr:hover {
      background-color: #f8fafc;
    }
    .footer-disclaimer {
      font-size: 11px;
      color: #64748b;
      line-height: 1.6;
      text-align: center;
      margin-top: 40px;
      border-top: 1px solid #e2e8f0;
      padding-top: 25px;
    }
    .signature-area {
      margin-top: 25px;
      text-align: center;
    }
    .signature-title {
      font-weight: 800;
      font-size: 13px;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .signature-role {
      font-size: 11px;
      color: #64748b;
    }
    @media print {
      body {
        padding: 0;
      }
      .statement-container {
        border: none;
        box-shadow: none;
        padding: 0;
      }
      .no-print {
        display: none;
      }
    }
    .print-instructions {
      background-color: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 12px;
      padding: 12px;
      margin-bottom: 25px;
      font-size: 12px;
      color: #1e40af;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .print-btn {
      background-color: #1e40af;
      color: #ffffff;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: background-color 0.2s;
    }
    .print-btn:hover {
      background-color: #1d4ed8;
    }
  </style>
</head>
<body>
  <div class="print-instructions no-print">
    <span><strong>Print / Save as PDF:</strong> This document is formatted for clean printing. Click 'Print / Save PDF' to trigger your system dialogue.</span>
    <button class="print-btn" onclick="window.print()">Print / Save PDF</button>
  </div>

  <div class="statement-container">
    <svg class="watermark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
    
    <div class="header">
      <div class="org-title">UMOJA FOUNDATION ADVOCACY</div>
      <div class="statement-title">Official Tax Donation Statement</div>
      <div class="org-sub">Ashongman Traditional Block &bull; 501(c)(3) Registered Public Charity ID #94-384391</div>
    </div>

    <div class="meta-grid">
      <div class="meta-box">
        <h3>Donor profile details</h3>
        <p>Donor Name: <strong>${displayName}</strong></p>
        <p>Location / Region: <strong>${location}</strong></p>
        <p>Sponsorship Member Since: <strong>${memberSince}</strong></p>
        <p>Official Record Email: <strong>${loggedInUser || 'donor@umoja-advocacy.org'}</strong></p>
      </div>

      <div class="summary-card">
        <div class="label">Total Tax-Deductible Contribution</div>
        <div class="amount">$${totalContributed.toLocaleString()}</div>
        <div class="subtext">For Tax Reporting Purposes</div>
        <div style="font-size: 9px; color: #166534; font-weight: bold; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.05em;">Statement Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
      </div>
    </div>

    <div class="table-container">
      <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #475569; margin-bottom: 12px; border-left: 3px solid #c2410c; padding-left: 8px;">Contributions History Log</h3>
      <table class="ledger-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Campaign Target / Project</th>
            <th>Type</th>
            <th>Handshake Date</th>
            <th style="text-align: right;">Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>
    </div>

    <div class="footer-disclaimer">
      <p>The Umoja Foundation Advocacy is a registered 501(c)(3) non-profit organization. We confirm that no goods, services, or tangible benefits were supplied in consideration for any of the financial contributions listed above. All donations represent voluntary, tax-deductible grants dedicated entirely to clean water development, menstrual health workshops, and school audits in our partner districts.</p>
      
      <div class="signature-area">
        <div class="signature-title">Mubaarakah Salwat Rashid</div>
        <div class="signature-role">Executive Director, Umoja Foundation Advocacy</div>
      </div>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        if (window.self === window.top) {
          window.print();
        }
      }, 600);
    };
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Umoja_Tax_Donations_Statement_${new Date().getFullYear()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Helper: Filter donations for ledger
  const filteredDonations = donations.filter(d => {
    const matchesSearch = d.projectName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.receiptId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = filterProject === 'all' || d.projectId === filterProject;
    return matchesSearch && matchesProject;
  });

  // Helper: Get unique sponsored projects from donations
  const sponsoredProjectIds = Array.from(new Set(donations.map(d => d.projectId).filter(Boolean)));
  const sponsoredProjects = allProjects.filter(p => sponsoredProjectIds.includes(p.id));

  // Compute stats
  const totalContributed = donations.reduce((sum, d) => sum + d.amount, 0);
  const hasMonthlyActive = donations.some(d => d.frequency === 'monthly');
  const totalVolHours = volunteerLog.reduce((sum, item) => sum + item.hours, 0);

  // Badge thresholds and logic
  const isTopSupporter = totalContributed >= 500;
  const isWASHChampion = donations.some(d => d.projectName.toLowerCase().includes('wash') || d.projectName.toLowerCase().includes('borehole'));
  const isHygieneHero = donations.some(d => d.projectName.toLowerCase().includes('menstrual') || d.projectName.toLowerCase().includes('hygiene'));
  const isAuditGuardian = donations.some(d => d.projectName.toLowerCase().includes('audit') || d.projectName.toLowerCase().includes('data'));
  const isSustainer = hasMonthlyActive;

  // Volunteer Hero Badges
  const isBronzeHero = totalVolHours >= 10;
  const isSilverHero = totalVolHours >= 25;
  const isGoldHero = totalVolHours >= 50;
  const isPlatinumHero = totalVolHours >= 100;

  const badges = [
    {
      id: 'badge-bronze-hero',
      title: 'Bronze Community Hero',
      description: 'Awarded to volunteers completing 10 hours of hands-on community service.',
      color: 'bg-amber-50 text-amber-900 border-amber-200',
      unlocked: isBronzeHero,
      reqText: 'Log 10 hours of volunteer service.',
      renderSVG: (unlocked: boolean) => (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 relative overflow-visible">
          <defs>
            <linearGradient id="bronzeHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={unlocked ? "#D97706" : "#D1D5DB"} />
              <stop offset="100%" stopColor={unlocked ? "#78350F" : "#4B5563"} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="38" fill={unlocked ? "#FEF3C7" : "#F3F4F6"} stroke={unlocked ? "#78350F" : "#9CA3AF"} strokeWidth="2.5" />
          <g style={unlocked ? { animation: 'floatBadge 3.5s ease-in-out infinite' } : {}} className="origin-center">
            <polygon points="50,25 57,38 72,40 62,50 65,65 50,58 35,65 38,50 28,40 43,38" fill="url(#bronzeHeroGrad)" stroke={unlocked ? "#78350F" : "#4B5563"} strokeWidth="1.5" />
          </g>
        </svg>
      )
    },
    {
      id: 'badge-silver-hero',
      title: 'Silver Community Hero',
      description: 'Awarded to volunteers completing 25 hours of active field coordination.',
      color: 'bg-slate-50 text-slate-900 border-slate-200',
      unlocked: isSilverHero,
      reqText: 'Log 25 hours of volunteer service.',
      renderSVG: (unlocked: boolean) => (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 relative overflow-visible">
          <defs>
            <linearGradient id="silverHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={unlocked ? "#94A3B8" : "#D1D5DB"} />
              <stop offset="100%" stopColor={unlocked ? "#475569" : "#4B5563"} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="38" fill={unlocked ? "#F1F5F9" : "#F3F4F6"} stroke={unlocked ? "#475569" : "#9CA3AF"} strokeWidth="2.5" />
          <g style={unlocked ? { animation: 'floatBadge 3.2s ease-in-out infinite' } : {}} className="origin-center">
            <path d="M50,24 L68,30 V50 C68,62 50,74 50,74 C50,74 32,62 32,50 V30 Z" fill="url(#silverHeroGrad)" stroke={unlocked ? "#475569" : "#4B5563"} strokeWidth="1.5" />
            <path d="M42,48 L48,54 L58,40" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      )
    },
    {
      id: 'badge-gold-hero',
      title: 'Gold Community Hero',
      description: 'Awarded to volunteers completing 50 hours of impactful sub-district leadership.',
      color: 'bg-yellow-50 text-yellow-950 border-yellow-200',
      unlocked: isGoldHero,
      reqText: 'Log 50 hours of volunteer service.',
      renderSVG: (unlocked: boolean) => (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 relative overflow-visible">
          <defs>
            <linearGradient id="goldHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={unlocked ? "#FBBF24" : "#D1D5DB"} />
              <stop offset="100%" stopColor={unlocked ? "#D97706" : "#4B5563"} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="38" fill={unlocked ? "#FEF3C7" : "#F3F4F6"} stroke={unlocked ? "#D97706" : "#9CA3AF"} strokeWidth="2.5" />
          <g style={unlocked ? { animation: 'floatBadge 3.1s ease-in-out infinite' } : {}} className="origin-center">
            <path d="M35,32 H65 V48 C65,56 59,62 50,62 C41,62 35,56 35,48 Z" fill="url(#goldHeroGrad)" stroke={unlocked ? "#D97706" : "#4B5563"} strokeWidth="1.5" />
            <path d="M45,62 H55 V72 H45 Z" fill={unlocked ? "#D97706" : "#4B5563"} />
            <path d="M38,72 H62 V76 H38 Z" fill={unlocked ? "#92400E" : "#374151"} />
          </g>
        </svg>
      )
    },
    {
      id: 'badge-platinum-hero',
      title: 'Platinum Community Hero',
      description: 'The highest operational honor for individuals completing 100 hours of regional campaign stewardship.',
      color: 'bg-teal-50 text-teal-950 border-teal-200',
      unlocked: isPlatinumHero,
      reqText: 'Log 100 hours of volunteer service.',
      renderSVG: (unlocked: boolean) => (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 relative overflow-visible">
          <defs>
            <linearGradient id="tealHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={unlocked ? "#14B8A6" : "#D1D5DB"} />
              <stop offset="100%" stopColor={unlocked ? "#0F766E" : "#4B5563"} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="38" fill={unlocked ? "#F0FDFA" : "#F3F4F6"} stroke={unlocked ? "#0F766E" : "#9CA3AF"} strokeWidth="2.5" />
          <g style={unlocked ? { animation: 'floatBadge 2.8s ease-in-out infinite' } : {}} className="origin-center">
            <polygon points="50,22 62,35 76,35 70,48 76,62 62,62 50,75 38,62 24,62 30,48 24,35 38,35" fill="url(#tealHeroGrad)" stroke={unlocked ? "#0F766E" : "#4B5563"} strokeWidth="1.5" />
            <circle cx="50" cy="46" r="4" fill="white" />
          </g>
        </svg>
      )
    },
    {
      id: 'badge-top-supporter',
      title: 'Top Supporter',
      description: 'Awarded to generous donors with total contributions exceeding $500.',
      color: 'bg-amber-100/75 text-amber-900 border-amber-300',
      unlocked: isTopSupporter,
      reqText: 'Contribute $500 or more in total.',
      renderSVG: (unlocked: boolean) => (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 relative overflow-visible">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={unlocked ? "#FBBF24" : "#D1D5DB"} />
              <stop offset="50%" stopColor={unlocked ? "#F59E0B" : "#9CA3AF"} />
              <stop offset="100%" stopColor={unlocked ? "#B45309" : "#4B5563"} />
            </linearGradient>
          </defs>
          {unlocked && (
            <circle cx="50" cy="50" r="44" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="5 5" className="origin-center" style={{ animation: 'rotateGlow 15s linear infinite' }} />
          )}
          <circle cx="50" cy="50" r="38" fill={unlocked ? "#FEF3C7" : "#F3F4F6"} stroke={unlocked ? "#D97706" : "#9CA3AF"} strokeWidth="2.5" />
          <g style={unlocked ? { animation: 'floatBadge 3s ease-in-out infinite' } : {}} className="origin-center">
            <path d="M30 40 C22 40 22 50 30 50" fill="none" stroke={unlocked ? "#D97706" : "#4B5563"} strokeWidth="3" strokeLinecap="round" />
            <path d="M70 40 C78 40 78 50 70 50" fill="none" stroke={unlocked ? "#D97706" : "#4B5563"} strokeWidth="3" strokeLinecap="round" />
            <path d="M34 34 H66 V52 C66 60 59 66 50 66 C41 66 34 60 34 52 Z" fill="url(#goldGrad)" stroke={unlocked ? "#D97706" : "#4B5563"} strokeWidth="2" />
            <path d="M47 66 H53 V75 H47 Z" fill={unlocked ? "#D97706" : "#4B5563"} />
            <path d="M38 75 H62 V79 H38 Z" fill={unlocked ? "#B45309" : "#374151"} rx="1" />
          </g>
          {unlocked && (
            <>
              <path d="M50 14 L52 18 L56 18 L53 20 L54 24 L50 21 L46 24 L47 20 L44 18 L48 18 Z" fill="#FBBF24" style={{ animation: 'twinkle 1.8s ease-in-out infinite' }} />
              <circle cx="23" cy="28" r="2.5" fill="#FBBF24" style={{ animation: 'twinkle 2.2s ease-in-out infinite 0.4s' }} />
              <circle cx="77" cy="28" r="2.5" fill="#FBBF24" style={{ animation: 'twinkle 2.2s ease-in-out infinite 0.8s' }} />
            </>
          )}
        </svg>
      )
    },
    {
      id: 'badge-first-handshake',
      title: 'First Handshake',
      description: 'Your inaugural community contribution supporting local autonomy.',
      color: 'bg-emerald-100/75 text-emerald-900 border-emerald-300',
      unlocked: donations.length > 0,
      reqText: 'Complete 1 donation.',
      renderSVG: (unlocked: boolean) => (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 relative overflow-visible">
          <defs>
            <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={unlocked ? "#34D399" : "#D1D5DB"} />
              <stop offset="100%" stopColor={unlocked ? "#047857" : "#4B5563"} />
            </linearGradient>
          </defs>
          {unlocked && (
            <circle cx="50" cy="50" r="44" fill="none" stroke="#34D399" strokeWidth="1.5" strokeDasharray="6 3" className="origin-center" style={{ animation: 'rotateGlow 20s linear infinite' }} />
          )}
          <circle cx="50" cy="50" r="38" fill={unlocked ? "#D1FAE5" : "#F3F4F6"} stroke={unlocked ? "#047857" : "#9CA3AF"} strokeWidth="2.5" />
          <g style={unlocked ? { animation: 'handshakeSqueeze 2.5s ease-in-out infinite' } : {}} className="origin-center">
            <path d="M22 56 L35 48 C37 46 40 48 42 50 L46 54" fill="none" stroke={unlocked ? "#047857" : "#4B5563"} strokeWidth="3" strokeLinecap="round" />
            <path d="M78 56 L65 48 C63 46 60 48 58 50 L54 54" fill="none" stroke={unlocked ? "#047857" : "#4B5563"} strokeWidth="3" strokeLinecap="round" />
            <path d="M44 52 C46 50 50 50 52 52 C54 54 54 58 50 60 L46 56" fill="none" stroke={unlocked ? "#047857" : "#4B5563"} strokeWidth="3" strokeLinecap="round" />
            <path d="M50 32 C48 30 45 30 44 32 C43 34 45 37 50 40 C55 37 57 34 56 32 C55 30 52 30 50 32 Z" fill={unlocked ? "#10B981" : "#9CA3AF"} style={unlocked ? { animation: 'heartBeat 1.5s ease-in-out infinite' } : {}} className="origin-center" />
          </g>
        </svg>
      )
    },
    {
      id: 'badge-wash-champ',
      title: 'WASH Champion',
      description: 'Direct sponsor of solar-powered borehole infrastructure or clean water lines.',
      color: 'bg-blue-100/75 text-blue-900 border-blue-300',
      unlocked: isWASHChampion,
      reqText: 'Sponsor any WASH or Borehole campaign.',
      renderSVG: (unlocked: boolean) => (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 relative overflow-visible">
          <defs>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={unlocked ? "#60A5FA" : "#D1D5DB"} />
              <stop offset="50%" stopColor={unlocked ? "#3B82F6" : "#9CA3AF"} />
              <stop offset="100%" stopColor={unlocked ? "#1D4ED8" : "#4B5563"} />
            </linearGradient>
            <clipPath id="dropClip">
              <path d="M50 22 C50 22 30 46 30 58 C30 69 39 76 50 76 C61 76 70 69 70 58 C70 46 50 22 50 22 Z" />
            </clipPath>
          </defs>
          <circle cx="50" cy="50" r="38" fill={unlocked ? "#DBEAFE" : "#F3F4F6"} stroke={unlocked ? "#1D4ED8" : "#9CA3AF"} strokeWidth="2.5" />
          <g style={unlocked ? { animation: 'floatBadge 4s ease-in-out infinite' } : {}} className="origin-center">
            <path d="M50 22 C50 22 30 46 30 58 C30 69 39 76 50 76 C61 76 70 69 70 58 C70 46 50 22 50 22 Z" fill="url(#blueGrad)" stroke={unlocked ? "#1D4ED8" : "#4B5563"} strokeWidth="2.5" />
            {unlocked && (
              <g clipPath="url(#dropClip)">
                <path d="M20 62 Q 35 55, 50 62 T 80 62" fill="none" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" style={{ animation: 'waveShift 2.2s linear infinite' }} />
                <path d="M20 69 Q 35 62, 50 69 T 80 69" fill="none" stroke="#DBEAFE" strokeWidth="2" strokeLinecap="round" style={{ animation: 'waveShift 1.7s linear infinite reverse' }} />
              </g>
            )}
            <path d="M38 52 C36 56 38 60 40 62" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </g>
        </svg>
      )
    },
    {
      id: 'badge-hygiene-hero',
      title: 'Hygiene Hero',
      description: 'Champion of menstrual hygiene training and dignity supplies distribution.',
      color: 'bg-rose-100/75 text-rose-900 border-rose-300',
      unlocked: isHygieneHero,
      reqText: 'Sponsor a Menstrual Hygiene campaign.',
      renderSVG: (unlocked: boolean) => (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 relative overflow-visible">
          <defs>
            <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={unlocked ? "#FB7185" : "#D1D5DB"} />
              <stop offset="50%" stopColor={unlocked ? "#F43F5E" : "#9CA3AF"} />
              <stop offset="100%" stopColor={unlocked ? "#BE123C" : "#4B5563"} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="38" fill={unlocked ? "#FFE4E6" : "#F3F4F6"} stroke={unlocked ? "#BE123C" : "#9CA3AF"} strokeWidth="2.5" />
          <g style={unlocked ? { animation: 'heartBeat 1.8s ease-in-out infinite' } : {}} className="origin-center">
            <path d="M50 35 C45 28 32 28 28 35 C24 42 28 52 50 70 C72 52 76 42 72 35 C68 28 55 28 50 35 Z" fill="url(#roseGrad)" stroke={unlocked ? "#BE123C" : "#4B5563"} strokeWidth="2" />
            {unlocked && (
              <>
                <circle cx="50" cy="46" r="3" fill="#FFE4E6" />
                <circle cx="50" cy="40" r="2.5" fill="#FDA4AF" />
                <circle cx="50" cy="52" r="2.5" fill="#FDA4AF" />
                <circle cx="44" cy="46" r="2.5" fill="#FDA4AF" />
                <circle cx="56" cy="46" r="2.5" fill="#FDA4AF" />
              </>
            )}
          </g>
        </svg>
      )
    },
    {
      id: 'badge-audit-guardian',
      title: 'Data Guardian',
      description: 'Sponsor of environmental school audits driving public policy changes.',
      color: 'bg-purple-100/75 text-purple-900 border-purple-300',
      unlocked: isAuditGuardian,
      reqText: 'Sponsor a School Audit campaign.',
      renderSVG: (unlocked: boolean) => (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 relative overflow-visible">
          <defs>
            <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={unlocked ? "#A78BFA" : "#D1D5DB"} />
              <stop offset="50%" stopColor={unlocked ? "#8B5CF6" : "#9CA3AF"} />
              <stop offset="100%" stopColor={unlocked ? "#6D28D9" : "#4B5563"} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="38" fill={unlocked ? "#F5F3FF" : "#F3F4F6"} stroke={unlocked ? "#6D28D9" : "#9CA3AF"} strokeWidth="2.5" />
          <g style={unlocked ? { animation: 'floatBadge 4.5s ease-in-out infinite' } : {}} className="origin-center">
            <path d="M32 32 C32 32 40 28 50 25 C60 28 68 32 68 32 C68 48 62 65 50 72 C38 65 32 48 32 32 Z" fill="url(#purpleGrad)" stroke={unlocked ? "#6D28D9" : "#4B5563"} strokeWidth="2.5" />
            <path d="M42 47 L48 53 L58 39" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                  style={unlocked ? { strokeDasharray: '30', strokeDashoffset: '30', animation: 'drawCheck 1.2s ease-out forwards 0.4s' } : {}} />
            {unlocked && (
              <line x1="33" y1="32" x2="67" y2="32" stroke="#C084FC" strokeWidth="2" opacity="0.7" style={{ animation: 'scanLine 3.2s linear infinite' }} />
            )}
          </g>
        </svg>
      )
    },
    {
      id: 'badge-monthly-sustainer',
      title: 'Monthly Sustainer',
      description: 'Maintained an active continuous monthly pipeline to regional teams.',
      color: 'bg-orange-100/75 text-orange-900 border-orange-300',
      unlocked: isSustainer,
      reqText: 'Enable any recurring monthly subscription.',
      renderSVG: (unlocked: boolean) => (
        <svg viewBox="0 0 100 100" className="w-16 h-16 shrink-0 relative overflow-visible">
          <defs>
            <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={unlocked ? "#FB923C" : "#D1D5DB"} />
              <stop offset="50%" stopColor={unlocked ? "#F97316" : "#9CA3AF"} />
              <stop offset="100%" stopColor={unlocked ? "#C2410C" : "#4B5563"} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="38" fill={unlocked ? "#FFEDD5" : "#F3F4F6"} stroke={unlocked ? "#C2410C" : "#9CA3AF"} strokeWidth="2.5" />
          <g style={unlocked ? { animation: 'flickerFlame 1.4s ease-in-out infinite' } : {}} className="origin-center">
            <path d="M50 24 C50 24 34 44 34 58 C34 68 41 74 50 74 C59 74 66 68 66 58 C66 44 50 24 50 24 Z" fill="url(#orangeGrad)" stroke={unlocked ? "#C2410C" : "#4B5563"} strokeWidth="2" />
            {unlocked && (
              <path d="M50 38 C50 38 40 50 40 60 C40 66 44 70 50 70 C56 70 60 66 60 60 C60 50 50 38 50 38 Z" fill="#FBBF24" opacity="0.95" style={{ animation: 'flickerFlame 0.8s ease-in-out infinite alternate' }} className="origin-center" />
            )}
          </g>
        </svg>
      )
    }
  ];

  // Next Milestone Rank Calculator
  const getMilestoneRank = (total: number) => {
    if (total < 100) return { rank: 'Bronze Advocate', next: 100, progress: (total / 100) * 100, label: 'Silver Advocate' };
    if (total < 250) return { rank: 'Silver Advocate', next: 250, progress: ((total - 100) / 150) * 100, label: 'Gold Benefactor' };
    if (total < 500) return { rank: 'Gold Benefactor', next: 500, progress: ((total - 250) / 250) * 100, label: 'Top Supporter Tier' };
    if (total < 1000) return { rank: 'Top Supporter Tier', next: 1000, progress: ((total - 500) / 500) * 100, label: 'Strategic Global Patron' };
    return { rank: 'Strategic Global Patron', next: 5000, progress: 100, label: 'Maximum Tier Attained' };
  };

  const milestone = getMilestoneRank(totalContributed);

  // Dynamic Impact Estimation Calculations
  const estimateImpact = (total: number) => {
    const hygieneKits = Math.floor(total / 5);
    const handwashBasins = Math.floor(total / 50);
    const daysAttendedSaved = hygieneKits * 12; // Assuming average 12 academic days retained per term with kit

    return {
      hygieneKits,
      handwashBasins,
      daysAttendedSaved
    };
  };

  const impactStats = estimateImpact(totalContributed);

  // Handle Profile Quick Donation
  const handleQuickDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(quickAmount);
    if (!selectedProjectId || isNaN(amt) || amt <= 0) return;

    const proj = allProjects.find(p => p.id === selectedProjectId);
    if (!proj) return;

    // Create record
    const record: DonationRecord = {
      id: `don-${Date.now()}`,
      amount: amt,
      date: new Date().toISOString().split('T')[0],
      projectName: proj.title,
      projectId: proj.id,
      frequency: quickFrequency,
      paymentMethod: 'card',
      receiptId: `TX-${Math.floor(100000 + Math.random() * 900000)}`
    };

    onAddDonation(record);
    onSponsorProjectDirectly(proj.id, amt);

    setQuickSuccess(true);
    setTimeout(() => {
      setQuickSuccess(false);
      setSelectedProjectId('');
    }, 4000);
  };

  // Handle Project Message
  const handleSendProjectMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectMessageText.trim()) return;

    setMessageSentSuccess(true);
    setProjectMessageText('');
    setTimeout(() => {
      setMessageSentSuccess(false);
      setMessageProject(null);
    }, 3000);
  };

  // Handle Volunteer Hours Logging
  const handleLogVolunteerHours = (e: React.FormEvent) => {
    e.preventDefault();
    const hrs = parseInt(logHours, 10);
    if (!logTitle || isNaN(hrs) || hrs <= 0) return;

    const previousHours = totalVolHours;
    const newHours = previousHours + hrs;

    const newActivity = {
      id: `v-${Date.now()}`,
      date: logDate,
      hours: hrs,
      activity: logTitle,
      role: logRole,
      notes: logNotes || 'Field operation support.'
    };

    setVolunteerLog(prev => [newActivity, ...prev]);

    // Check if new milestone reached and unlock modal/trigger confetti
    const milestoneThresholds = [
      { threshold: 10, title: 'Bronze Community Hero', desc: 'Completed 10 total logged service hours of hands-on community service!', level: 'Bronze' },
      { threshold: 25, title: 'Silver Community Hero', desc: 'Demonstrating superb regional teamwork with 25 total logged service hours!', level: 'Silver' },
      { threshold: 50, title: 'Gold Community Hero', desc: 'Directing field installations and sub-district coordination with 50 total logged service hours!', level: 'Gold' },
      { threshold: 100, title: 'Platinum Community Hero', desc: 'Reaching the peak of community service dedication with 100 total logged service hours!', level: 'Platinum' }
    ];

    const unlockedNew = milestoneThresholds.find(
      m => previousHours < m.threshold && newHours >= m.threshold
    );

    if (unlockedNew) {
      setUnlockedMilestoneModal({
        title: unlockedNew.title,
        desc: unlockedNew.desc,
        level: unlockedNew.level
      });
      
      // Multi-layer high-fidelity confetti burst
      const triggerMilestoneConfetti = () => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.8 },
          colors: ['#c2410c', '#0f172a', '#d4a373', '#22c55e', '#3b82f6']
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.8 },
          colors: ['#c2410c', '#0f172a', '#d4a373', '#22c55e', '#3b82f6']
        });
        
        setTimeout(() => {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { x: 0.5, y: 0.6 },
            colors: ['#c2410c', '#f59e0b', '#10b981', '#3b82f6']
          });
        }, 200);
      };
      triggerMilestoneConfetti();
    } else {
      // Small feedback burst
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { x: 0.5, y: 0.7 }
      });
    }

    // Reset notes and close form
    setLogNotes('');
    setShowLogForm(false);
  };

  const VOLUNTEER_OPPORTUNITIES = [
    {
      id: 'opp-1',
      title: 'WASH Facility Site Auditor',
      category: 'audit',
      categoryLabel: 'Data & Auditing',
      description: 'Conduct comprehensive hygiene and infrastructure surveys. Inspect physical toilets, overhead handwash canisters, lock hardware, water pressure, and soap logs at regional primary schools.',
      regions: 'Tamale, Volta Region, Ashongman',
      dates: ['2026-08-14', '2026-08-28', '2026-09-10'],
      roles: ['Audit Scribe', 'Site Inspector', 'Technical Assistant'],
      difficulty: 'Medium',
      duration: '4 hours/slot'
    },
    {
      id: 'opp-2',
      title: 'MHM Hygiene Education Facilitator',
      category: 'mhm',
      categoryLabel: 'Menstrual Health (MHM)',
      description: 'Facilitate physical hygiene education workshops, lead interactive menstrual health training loops for female students, and manage regional reusable pad kit packs assembly and distribution.',
      regions: 'Eastern Region Assemblies, Central Accra',
      dates: ['2026-09-12', '2026-09-26', '2026-10-05'],
      roles: ['Lead Educator', 'Logistics Coordinator', 'Support Facilitator'],
      difficulty: 'High',
      duration: '6 hours/slot'
    },
    {
      id: 'opp-3',
      title: 'Bio-sand Filter Deployment Engineer',
      category: 'engineering',
      categoryLabel: 'Water Engineering',
      description: 'Work alongside regional specialists to install physical heavy-duty bio-sand filters, clean filtration sand and gravel beds, test turbidity levels, and demonstrate proper usage to local community leaders.',
      regions: 'Volta District Basin, Ashongman Traditional Block',
      dates: ['2026-11-18', '2026-12-02', '2026-12-15'],
      roles: ['Filtration Assistant', 'Plumbing Lead', 'Water Quality Tester'],
      difficulty: 'High',
      duration: '8 hours/slot'
    },
    {
      id: 'opp-4',
      title: 'Community Chief Outreach Liaison',
      category: 'liaison',
      categoryLabel: 'Community Liaison',
      description: 'Coordinate initial outreach visits, draft sub-district memorandum briefs, serve as local translator during traditional council assemblies, and document pre-installation baseline feedback.',
      regions: 'Central Region Sub-Districts, Tamale Basin',
      dates: ['2026-08-20', '2026-09-08', '2026-10-12'],
      roles: ['Liaison Lead', 'Traditional Council Scribe', 'Local Translator'],
      difficulty: 'Medium',
      duration: '5 hours/slot'
    }
  ];

  const handleSaveNotificationPreferences = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('umoja_pref_email_reminders', String(emailRemindersEnabled));
    localStorage.setItem('umoja_pref_push_notifications', String(pushNotificationsEnabled));
    localStorage.setItem('umoja_pref_reminder_day', reminderDayOfMonth);
    localStorage.setItem('umoja_pref_reminder_amount', reminderAmount);
    localStorage.setItem('umoja_pref_notify_milestone', String(notifyOnMilestone));
    localStorage.setItem('umoja_pref_notify_new_projects', String(notifyOnNewProjects));
    
    setNotificationSavedToast(true);
    setTimeout(() => setNotificationSavedToast(false), 4000);

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#c2410c', '#0f172a']
    });
  };

  const triggerSimulatedTestNotification = (type: 'push' | 'email') => {
    if (type === 'push') {
      setSimulatedAlert({
        title: "🔔 Umoja Push Update: Ashongman Borehole",
        body: "Milestone Reached: The heavy-duty plumbing seals are complete! Clean water is flowing at school #2. Thank you for your support!",
        icon: "Bell",
        type: 'push'
      });
    } else {
      setSimulatedAlert({
        title: "✉️ Simulated Email Sent: Monthly Reminder",
        body: `Dear ${displayName},\n\nThis is your monthly sponsorship reminder from Umoja Advocacy. Your upcoming monthly support of $${reminderAmount} USD is scheduled to occur on day ${reminderDayOfMonth} of the month.\n\nYour support funds 100% reusable menstrual pads and school baseline plumbing audits. We thank you!\n\nBest regards,\nMubaarakah Rashid`,
        icon: "Mail",
        type: 'email'
      });
    }
  };

  const handleSignUpForOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpOpportunity || !scheduledDate || !selectedRoleOption) return;

    const newSignup = {
      id: `signup-${Date.now()}`,
      opportunityId: signUpOpportunity.id,
      title: signUpOpportunity.title,
      categoryLabel: signUpOpportunity.categoryLabel,
      date: scheduledDate,
      role: selectedRoleOption,
      regions: signUpOpportunity.regions,
      timestamp: new Date().toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })
    };

    const updatedSignups = [newSignup, ...userSignups];
    setUserSignups(updatedSignups);
    localStorage.setItem('umoja_volunteer_user_signups', JSON.stringify(updatedSignups));

    // Show simulated email confirmation modal for high-fidelity engagement
    setSignedUpOpportunityDetails({
      opportunity: signUpOpportunity,
      signup: newSignup
    });

    // Clean up
    setSignUpOpportunity(null);
    setScheduledDate('');
    setSelectedRoleOption('');

    // Happy confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCancelSignup = (signupId: string) => {
    const updated = userSignups.filter(s => s.id !== signupId);
    setUserSignups(updated);
    localStorage.setItem('umoja_volunteer_user_signups', JSON.stringify(updated));

    confetti({
      particleCount: 15,
      spread: 30,
      colors: ['#ef4444', '#cbd5e1']
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in duration-300">
      
      {/* 1. COVER HERO & AVATAR PROFILE INFO */}
      <div className="relative bg-dark-blue rounded-3xl overflow-hidden shadow-xl border border-clay/30">
        {/* Abstract background graphics representing connection */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-terracotta blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-clay blur-3xl" />
          <div className="w-full h-full bg-[radial-gradient(#d4a373_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 text-white flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-terracotta bg-white shadow-lg">
                <img 
                  src={avatarUrl} 
                  alt={displayName} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Presets dropdown for demo ease */}
              <div className="absolute -bottom-2 -right-2 bg-white text-dark-blue p-1.5 rounded-full border border-clay cursor-pointer hover:bg-clay/45 transition-colors shadow" title="Choose Avatar Preset">
                <Settings2 className="w-4 h-4" onClick={() => {
                  const presets = [
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200'
                  ];
                  const currentIdx = presets.indexOf(avatarUrl);
                  const nextUrl = presets[(currentIdx + 1) % presets.length];
                  setAvatarUrl(nextUrl);
                }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tight">
                  {displayName}
                </h1>
                <span className="px-3 py-1 bg-terracotta/90 text-[10px] font-sans font-bold tracking-widest uppercase rounded-full border border-terracotta shadow-sm">
                  {milestone.rank}
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-clay max-w-xl font-medium">
                {bio}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-300 pt-1.5 font-sans">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-terracotta" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-terracotta" />
                  <span>Sponsor Since: {memberSince}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                setEditName(displayName);
                setEditBio(bio);
                setEditLocation(location);
                setIsEditingProfile(true);
              }}
              className="px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Settings2 className="w-4 h-4" />
              <span>Modify Profile</span>
            </button>
            <button
              onClick={() => onNavigate('donate')}
              className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Sponsor New Campaign</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. PROFILE EDIT MODAL */}
      <AnimatePresence>
        {isEditingProfile && (
          <div className="fixed inset-0 bg-dark-blue/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-clay rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsEditingProfile(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-dark-blue p-1 rounded-full hover:bg-clay/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1.5 text-left">
                <h3 className="font-display font-black text-xl text-dark-blue">Edit Profile Fields</h3>
                <p className="font-sans text-xs text-gray-500">Customize your public supporter profile card.</p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 font-sans text-xs sm:text-sm text-left">
                <div className="space-y-1.5">
                  <label className="block font-semibold text-gray-700">Display Name</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-gray-700">Location Base</label>
                  <input 
                    type="text" 
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-gray-700">Short Bio</label>
                  <textarea 
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta text-sm h-24 resize-none"
                    maxLength={160}
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-dark-blue hover:bg-terracotta text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Commit Profile Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. BENTO GRID: STATS & MILESTONE METERS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="donor-impact-grid">
        {/* Dynamic Rank Progress meter */}
        <div className="md:col-span-8 bg-sand-bg border border-clay rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-terracotta">Milestone Rank Channel</span>
              <h3 className="font-display font-extrabold text-xl text-dark-blue">Regional Accountability Progress</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-semibold text-gray-500">
              <span>Current Status: <strong className="text-dark-blue">{milestone.rank}</strong></span>
              <span>Next Goal: <strong className="text-terracotta">{milestone.label} (${milestone.next})</strong></span>
            </div>
            <div className="w-full h-3.5 bg-clay/30 rounded-full overflow-hidden p-0.5 border border-clay/60">
              <div 
                className="h-full rounded-full terracotta-gradient transition-all duration-1000" 
                style={{ width: `${milestone.progress}%` }} 
              />
            </div>
            <p className="font-sans text-[11px] text-gray-500 leading-relaxed italic">
              Your overall financial volume of <strong className="text-dark-blue">${totalContributed.toLocaleString()} USD</strong> directly impacts regional operations. Increase total sponsorships to unlock higher ranks and exclusive physical ground audit updates.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-clay/40 text-center">
            <div className="space-y-0.5">
              <span className="block font-display font-black text-lg sm:text-2xl text-dark-blue">${totalContributed.toLocaleString()}</span>
              <span className="block font-sans text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Total Donated</span>
            </div>
            <div className="space-y-0.5">
              <span className="block font-display font-black text-lg sm:text-2xl text-dark-blue">{donations.length}</span>
              <span className="block font-sans text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Contributions</span>
            </div>
            <div className="space-y-0.5">
              <span className="block font-display font-black text-lg sm:text-2xl text-dark-blue">{sponsoredProjects.length}</span>
              <span className="block font-sans text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Projects Funded</span>
            </div>
          </div>
        </div>

        {/* Live Estimated Impact Box */}
        <div className="md:col-span-4 bg-white border border-clay rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-terracotta">Estimated Field Impact</span>
            <h3 className="font-display font-extrabold text-xl text-dark-blue">Water & Dignity Ledger</h3>
          </div>

          <div className="space-y-4 font-sans text-xs">
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                <Heart className="w-4 h-4 fill-rose-600" />
              </div>
              <div>
                <span className="block font-extrabold text-dark-blue text-sm">~{impactStats.hygieneKits} MHM Dignity Kits</span>
                <span className="block text-gray-500 text-[10px]">Sourced and deployed to adolescent girls.</span>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-extrabold text-dark-blue text-sm">~{impactStats.handwashBasins} WASH Stations</span>
                <span className="block text-gray-500 text-[10px]">Gravity washbasins built at school boundaries.</span>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-extrabold text-dark-blue text-sm">~{impactStats.daysAttendedSaved} School Days Retained</span>
                <span className="block text-gray-500 text-[10px]">Attendance protection estimations.</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 font-sans leading-relaxed pt-2 border-t border-clay/40">
            *Estimations based on terms retention statistics verified by Dr. Evelyn Mensah and school administration logs.
          </p>
        </div>
      </div>

      {/* 4. GAMIFIED BADGES CORNER */}
      <div className="bg-white border border-clay rounded-3xl p-6 sm:p-8 space-y-6" id="donor-profile-badges">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="space-y-1">
            <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-terracotta">Your Achievement Milestones</span>
            <h2 className="font-display font-extrabold text-2xl text-dark-blue">Supporter Badges & Credentials</h2>
          </div>
          <div className="px-3.5 py-1.5 bg-clay/20 text-dark-blue font-sans font-bold text-xs rounded-xl flex items-center gap-1.5">
            <Award className="w-4 h-4 text-terracotta" />
            <span>{badges.filter(b => b.unlocked).length} / {badges.length} Badges Unlocked</span>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes rotateGlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes floatBadge {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.35; transform: scale(0.85); }
            50% { opacity: 1; transform: scale(1.15); }
          }
          @keyframes heartBeat {
            0%, 100% { transform: scale(1); }
            20% { transform: scale(1.08); }
            40% { transform: scale(1.03); }
            60% { transform: scale(1.12); }
          }
          @keyframes handshakeSqueeze {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(0.97) rotate(-1deg); }
          }
          @keyframes waveShift {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -30; }
          }
          @keyframes drawCheck {
            to { stroke-dashoffset: 0; }
          }
          @keyframes scanLine {
            0% { transform: translateY(0px); }
            50% { transform: translateY(32px); }
            100% { transform: translateY(0px); }
          }
          @keyframes flickerFlame {
            0%, 100% { transform: scale(1) skewX(0deg); opacity: 0.95; }
            25% { transform: scale(1.03) skewX(1deg); opacity: 1; }
            50% { transform: scale(0.97) skewX(-1deg); opacity: 0.9; }
            75% { transform: scale(1.05) skewX(0.5deg); opacity: 0.98; }
          }
        `}} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {badges.map((b) => {
            return (
              <div 
                key={b.id} 
                className={`border rounded-2xl p-5 flex items-start space-x-4 transition-all duration-300 relative ${
                  b.unlocked 
                    ? `${b.color} shadow-sm hover:shadow-md` 
                    : 'bg-gray-50/50 text-gray-400 border-gray-200 opacity-60'
                }`}
              >
                <div className="shrink-0">
                  {b.renderSVG(b.unlocked)}
                </div>
                <div className="space-y-1 text-left flex-1">
                  <div className="flex items-center space-x-1.5">
                    <h4 className="font-display font-bold text-sm text-gray-900">{b.title}</h4>
                    {b.unlocked ? (
                      <Unlock className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="Unlocked!" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-gray-400 shrink-0" title="Locked" />
                    )}
                  </div>
                  <p className="font-sans text-[11px] leading-relaxed">
                    {b.description}
                  </p>
                  {!b.unlocked && (
                    <span className="block text-[10px] font-sans font-bold text-terracotta mt-2 uppercase tracking-wide bg-white/60 px-2 py-0.5 rounded-md inline-block">
                      Req: {b.reqText}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. ACTIVE SPONSORED PROJECTS TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="donor-sponsored-projects">
        
        {/* Left column: List of sponsored projects with live communication */}
        <div className="lg:col-span-8 space-y-6 text-left">
          <div className="space-y-1">
            <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-terracotta">Regional Pipeline Tracking</span>
            <h2 className="font-display font-extrabold text-2xl text-dark-blue">Your Sponsored Projects</h2>
          </div>

          {sponsoredProjects.length === 0 ? (
            <div className="bg-sand-bg border border-clay/60 rounded-3xl p-10 text-center space-y-4">
              <p className="font-sans text-sm text-gray-500">
                You have not sponsored any campaigns yet. Support active water projects, hygiene workshops, or safe private toilet complex construction below!
              </p>
              <button
                onClick={() => {
                  const quickSec = document.getElementById('profile-quick-sponsor');
                  quickSec?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-dark-blue hover:bg-terracotta text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Sponsor Your First Campaign
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {sponsoredProjects.map((p) => {
                const projectDonationTotal = donations
                  .filter(d => d.projectId === p.id)
                  .reduce((sum, d) => sum + d.amount, 0);

                return (
                  <div key={p.id} className="bg-white border border-clay rounded-3xl overflow-hidden hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-4 h-48 md:h-full relative min-h-[150px] bg-clay">
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                      <span className={`absolute top-4 left-4 px-2.5 py-1 text-[9px] font-sans font-extrabold uppercase tracking-widest rounded-full text-white shadow-sm ${
                        p.status === 'Completed' ? 'bg-emerald-600' : p.status === 'Active' ? 'bg-amber-600' : 'bg-blue-600'
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    <div className="md:col-span-8 p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="font-sans font-bold text-[9px] text-terracotta uppercase tracking-widest">{p.category} • {p.location}</span>
                            <h4 className="font-display font-extrabold text-base text-dark-blue leading-snug mt-0.5">{p.title}</h4>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="block font-display font-black text-sm text-terracotta">${projectDonationTotal.toLocaleString()}</span>
                            <span className="block font-sans text-[9px] text-gray-400 font-semibold uppercase tracking-wider">Your Funding</span>
                          </div>
                        </div>
                        <p className="font-sans text-xs text-gray-500 leading-relaxed line-clamp-2">
                          {p.description}
                        </p>
                      </div>

                      {/* Project Funding Progress */}
                      <div className="space-y-1.5 font-sans text-xs">
                        <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
                          <span>Overall Funding Raised: ${p.fundingRaised.toLocaleString()} / ${p.fundingGoal.toLocaleString()}</span>
                          <span>{Math.round((p.fundingRaised / p.fundingGoal) * 100)}%</span>
                        </div>
                        <div className="w-full h-2 bg-clay/35 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-dark-blue rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, (p.fundingRaised / p.fundingGoal) * 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Action Triggers: View and Direct Contact */}
                      <div className="flex justify-between items-center pt-3 border-t border-clay/40">
                        <button
                          onClick={() => {
                            // Direct feedback message trigger
                            setMessageProject(p.title);
                            setProjectMessageText('');
                            setMessageSentSuccess(false);
                          }}
                          className="text-xs text-terracotta font-semibold hover:underline flex items-center space-x-1 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Direct Message Project Team</span>
                        </button>
                        <span className="text-[10px] text-gray-400 font-medium">
                          Active Metric: {p.impactMetrics}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right column: Quick sponsorship launcher right inside profile! */}
        <div className="lg:col-span-4 space-y-6 text-left" id="profile-quick-sponsor">
          <div className="space-y-1">
            <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-terracotta">Direct Launcher</span>
            <h2 className="font-display font-extrabold text-2xl text-dark-blue">Quick Support</h2>
          </div>

          <div className="bg-sand-bg border border-clay rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-base text-dark-blue">Allocate Instant Support</h3>
              <p className="font-sans text-xs text-gray-500">Directly fund field installations to unlock more badges and tier levels immediately.</p>
            </div>

            {quickSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl font-sans text-[11px] flex items-center space-x-2 animate-pulse">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>Transaction authorized! Dashboard updated in real-time.</span>
              </div>
            )}

            <form onSubmit={handleQuickDonate} className="space-y-4 font-sans text-xs">
              <div className="space-y-1">
                <label className="block font-semibold text-gray-700">Select Campaign Target</label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-clay rounded-xl bg-white text-dark-blue text-xs focus:outline-none focus:border-terracotta font-medium"
                  required
                >
                  <option value="">-- Choose active campaign --</option>
                  {allProjects.filter(p => p.status !== 'Completed').map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-semibold text-gray-700">Sponsorship Volume</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 font-bold">$</span>
                    <input
                      type="number"
                      value={quickAmount}
                      onChange={(e) => setQuickAmount(e.target.value)}
                      className="w-full pl-6 pr-2 py-2.5 border border-clay rounded-xl bg-white text-dark-blue font-semibold text-xs focus:outline-none focus:border-terracotta"
                      placeholder="Amount"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-gray-700">Sponsorship Mode</label>
                  <select
                    value={quickFrequency}
                    onChange={(e) => setQuickFrequency(e.target.value as 'onetime' | 'monthly')}
                    className="w-full px-2 py-2.5 border border-clay rounded-xl bg-white text-dark-blue text-xs focus:outline-none focus:border-terracotta font-medium"
                  >
                    <option value="onetime">One-time</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Authorize Sponsorship
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 5.5 VOLUNTEER MILESTONES TRACKER */}
      <div className="bg-white border border-clay rounded-3xl p-6 sm:p-8 space-y-6 text-left" id="volunteer-milestones-section">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-terracotta">Hands-On Community Service</span>
            <h2 className="font-display font-extrabold text-2xl text-dark-blue">Volunteer Service & Milestones</h2>
          </div>
          <button
            onClick={() => {
              setShowLogForm(!showLogForm);
              setLogDate(new Date().toISOString().split('T')[0]);
            }}
            className="px-4 py-2.5 rounded-xl bg-dark-blue hover:bg-terracotta text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            {showLogForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{showLogForm ? 'Close Session Logger' : 'Log Volunteer Session'}</span>
          </button>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-sand-bg border border-clay/60 rounded-2xl p-5">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-display font-black text-xl text-dark-blue">{totalVolHours} Hours</span>
              <span className="block font-sans text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Total Service Logged</span>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-display font-black text-xl text-dark-blue">
                {[10, 25, 50, 100].filter(h => totalVolHours >= h).length} / 4
              </span>
              <span className="block font-sans text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Milestones Achieved</span>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-display font-bold text-sm text-dark-blue">
                {totalVolHours >= 100 ? 'Platinum Sovereign' : totalVolHours >= 50 ? 'Gold Guardian' : totalVolHours >= 25 ? 'Silver Champion' : totalVolHours >= 10 ? 'Bronze Catalyst' : 'Active Aspirant'}
              </span>
              <span className="block font-sans text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Volunteer Rank Status</span>
            </div>
          </div>
        </div>

        {/* EXPANDABLE INLINE LOG FORM */}
        <AnimatePresence>
          {showLogForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border border-clay rounded-2xl p-5 sm:p-6 bg-sand-bg/30 space-y-4"
            >
              <h3 className="font-display font-bold text-base text-dark-blue border-b border-clay/50 pb-2">Log New Field Service Hours</h3>
              <form onSubmit={handleLogVolunteerHours} className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                <div className="space-y-1">
                  <label className="block font-semibold text-gray-700">Service Activity Target</label>
                  <select
                    value={logTitle}
                    onChange={(e) => setLogTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-clay rounded-xl bg-white text-dark-blue text-xs focus:outline-none focus:border-terracotta font-medium"
                    required
                  >
                    <option value="Water Filtration Tank Assembly">Water Filtration Tank Assembly</option>
                    <option value="MHM Hygiene Kit Distribution">MHM Hygiene Kit Distribution</option>
                    <option value="Regional Schools Baseline Audit">Regional Schools Baseline Audit</option>
                    <option value="School Sanitization Demonstration">School Sanitization Demonstration</option>
                    <option value="Community Pipe Network Excavation">Community Pipe Network Excavation</option>
                    <option value="Other Field Logistics">Other Field Logistics</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-semibold text-gray-700">Hours Served</label>
                    <input
                      type="number"
                      value={logHours}
                      onChange={(e) => setLogHours(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-clay rounded-xl bg-white text-dark-blue font-semibold text-xs focus:outline-none focus:border-terracotta"
                      min="1"
                      max="24"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-semibold text-gray-700">Assigned Field Role</label>
                    <select
                      value={logRole}
                      onChange={(e) => setLogRole(e.target.value)}
                      className="w-full px-2 py-2.5 border border-clay rounded-xl bg-white text-dark-blue text-xs focus:outline-none focus:border-terracotta font-medium"
                    >
                      <option value="Field Assistant">Field Assistant</option>
                      <option value="Lead Facilitator">Lead Facilitator</option>
                      <option value="Logistics Coordinator">Logistics Coordinator</option>
                      <option value="Technical Scribe">Technical Scribe</option>
                      <option value="Safety Supervisor">Safety Supervisor</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-gray-700">Session Date</label>
                  <input
                    type="date"
                    value={logDate}
                    onChange={(e) => setLogDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-clay rounded-xl bg-white text-dark-blue text-xs focus:outline-none focus:border-terracotta font-medium"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="block font-semibold text-gray-700">Field Notes & Observations</label>
                  <textarea
                    value={logNotes}
                    onChange={(e) => setLogNotes(e.target.value)}
                    placeholder="Describe your active contributions, issues fixed, or feedback from local community stakeholders..."
                    className="w-full px-3.5 py-2.5 border border-clay rounded-xl bg-white text-xs text-dark-blue focus:outline-none focus:border-terracotta h-20 resize-none font-medium"
                    maxLength={300}
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowLogForm(false)}
                    className="px-4 py-2 border border-clay rounded-xl font-bold cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl font-display font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Log Service Hours</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MILESTONE TIMELINE / BAR */}
        <div className="space-y-3.5 pt-2">
          <h3 className="text-xs font-display font-bold uppercase tracking-widest text-gray-500">Milestone Progress Pathway</h3>
          <div className="relative py-4">
            {/* The background track */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-clay/35 -translate-y-1/2 rounded-full z-0" />
            
            {/* The active track */}
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-teal-500 -translate-y-1/2 rounded-full z-0 transition-all duration-1000"
              style={{ width: `${Math.min(100, (totalVolHours / 100) * 100)}%` }}
            />

            {/* The milestone nodes */}
            <div className="relative z-10 flex justify-between items-center w-full">
              {[
                { label: 'Bronze Catalyst', value: 10, bgClass: 'bg-amber-100 text-amber-800 border-amber-300', icon: <polygon points="12,5 15,11 22,12 17,17 19,23 12,20 5,23 7,17 2,12 9,11" fill="currentColor" className="w-3.5 h-3.5" /> },
                { label: 'Silver Champion', value: 25, bgClass: 'bg-slate-100 text-slate-800 border-slate-300', icon: <path d="M12,2 L20,5 V12 C20,17 12,22 12,22 C12,22 4,17 4,12 V5 Z" fill="currentColor" className="w-3.5 h-3.5" /> },
                { label: 'Gold Guardian', value: 50, bgClass: 'bg-yellow-100 text-yellow-900 border-yellow-300', icon: <path d="M6,5 H18 V11 C18,14 15,17 12,17 C9,17 6,14 6,11 Z" fill="currentColor" className="w-3.5 h-3.5" /> },
                { label: 'Platinum Sovereign', value: 100, bgClass: 'bg-teal-100 text-teal-900 border-teal-300', icon: <polygon points="12,4 16,9 21,9 19,14 21,19 16,19 12,24 8,19 3,19 5,14 3,9 8,9" fill="currentColor" className="w-3.5 h-3.5" /> }
              ].map((node) => {
                const isUnlocked = totalVolHours >= node.value;
                return (
                  <div key={node.value} className="flex flex-col items-center space-y-1.5 shrink-0">
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 shadow-sm transition-all duration-500 ${
                        isUnlocked 
                          ? `${node.bgClass} scale-110 ring-4 ring-white` 
                          : 'bg-white text-gray-300 border-gray-200'
                      }`}
                      title={`${node.label} (${node.value} hours req.)`}
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {node.icon}
                      </svg>
                    </div>
                    <div className="text-center">
                      <span className={`block text-[10px] font-display font-extrabold ${isUnlocked ? 'text-dark-blue' : 'text-gray-400'}`}>
                        {node.label}
                      </span>
                      <span className="block text-[8px] font-mono text-gray-400">
                        {node.value} hrs {isUnlocked ? '✓' : ''}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* VOLUNTEER ACTIVITY LIST LEDGER */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-display font-bold uppercase tracking-widest text-gray-500">Service Activity History Ledger</h3>
          <div className="overflow-hidden border border-clay/50 rounded-2xl bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs border-collapse">
                <thead>
                  <tr className="bg-sand-bg border-b border-clay text-dark-blue/80 uppercase tracking-wider text-[9px] font-extrabold">
                    <th className="p-3">Date</th>
                    <th className="p-3">Activity</th>
                    <th className="p-3 text-center">Hours Logged</th>
                    <th className="p-3">Assigned Field Role</th>
                    <th className="p-3">Field Notes / Observations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-clay/40">
                  {volunteerLog.map((log) => (
                    <tr key={log.id} className="hover:bg-sand-bg/20 transition-colors text-gray-700 text-[11px]">
                      <td className="p-3 font-mono font-semibold text-gray-500 whitespace-nowrap">{log.date}</td>
                      <td className="p-3 font-bold text-dark-blue">{log.activity}</td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                          {log.hours} hrs
                        </span>
                      </td>
                      <td className="p-3 text-gray-600 font-medium whitespace-nowrap">{log.role}</td>
                      <td className="p-3 text-gray-500 max-w-xs truncate" title={log.notes}>{log.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 5.6 VOLUNTEER OPPORTUNITY BOARD */}
      <div className="bg-white border border-clay rounded-3xl p-6 sm:p-8 space-y-6 text-left" id="volunteer-opportunity-board">
        <div className="space-y-1">
          <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-terracotta">Frontline Engagement Board</span>
          <h2 className="font-display font-extrabold text-2xl text-dark-blue">Volunteer Opportunity Board</h2>
          <p className="font-sans text-xs text-gray-500 max-w-2xl">
            Filter open deployment openings across partner districts. Secure your role, select a scheduled date, and instantly simulate your automated briefing instructions.
          </p>
        </div>

        {/* Categories / Filters row */}
        <div className="flex flex-wrap items-center gap-2 border-b border-clay/40 pb-4">
          {[
            { id: 'all', label: 'All Opportunities' },
            { id: 'mhm', label: 'Menstrual Health (MHM)' },
            { id: 'engineering', label: 'Water Engineering' },
            { id: 'liaison', label: 'Community Liaison' },
            { id: 'audit', label: 'Data & Auditing' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setOppsFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                oppsFilter === cat.id
                  ? 'bg-dark-blue text-white shadow-xs'
                  : 'bg-sand-bg text-dark-blue hover:bg-clay/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Opportunities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VOLUNTEER_OPPORTUNITIES.filter(o => oppsFilter === 'all' || o.category === oppsFilter).map((opp) => {
            const hasSignedUp = userSignups.some(s => s.opportunityId === opp.id);
            return (
              <div 
                key={opp.id} 
                className="border border-clay rounded-2xl p-5 bg-sand-bg/15 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Decorative border on top for premium accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-terracotta" />

                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className="px-2 py-0.5 rounded bg-terracotta/10 text-terracotta text-[9px] font-sans font-bold uppercase tracking-wider">
                      {opp.categoryLabel}
                    </span>
                    <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-semibold font-mono">
                      <span>{opp.difficulty}</span>
                      <span>•</span>
                      <span>{opp.duration}</span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-dark-blue leading-tight">
                    {opp.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-gray-600 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="space-y-1 text-[11px] font-sans text-gray-500 pt-1">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0" />
                      <span>Regions: <strong>{opp.regions}</strong></span>
                    </div>
                  </div>
                </div>

                {hasSignedUp ? (
                  <div className="pt-3 border-t border-clay/35 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-green-600 font-sans text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Slot Reserved Successfully</span>
                    </div>
                    <button
                      onClick={() => {
                        const existing = userSignups.find(s => s.opportunityId === opp.id);
                        if (existing) {
                          setSignedUpOpportunityDetails({
                            opportunity: opp,
                            signup: existing
                          });
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-dark-blue/5 text-dark-blue hover:bg-dark-blue hover:text-white transition-colors font-sans text-xs font-bold cursor-pointer"
                    >
                      View Briefing
                    </button>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-clay/35 space-y-3.5">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-0.5">
                        <label className="block text-[10px] text-gray-400 font-semibold font-sans uppercase">Select Date</label>
                        <select
                          id={`date-select-${opp.id}`}
                          className="w-full px-2 py-1.5 border border-clay rounded-lg bg-white text-dark-blue font-sans text-xs focus:outline-none focus:border-terracotta font-medium"
                        >
                          <option value="">-- Choose Date --</option>
                          {opp.dates.map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-0.5">
                        <label className="block text-[10px] text-gray-400 font-semibold font-sans uppercase">Select Role</label>
                        <select
                          id={`role-select-${opp.id}`}
                          className="w-full px-2 py-1.5 border border-clay rounded-lg bg-white text-dark-blue font-sans text-xs focus:outline-none focus:border-terracotta font-medium"
                        >
                          <option value="">-- Choose Role --</option>
                          {opp.roles.map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const dateEl = document.getElementById(`date-select-${opp.id}`) as HTMLSelectElement;
                        const roleEl = document.getElementById(`role-select-${opp.id}`) as HTMLSelectElement;
                        if (!dateEl?.value || !roleEl?.value) {
                          alert("Please select both a date and a role to register.");
                          return;
                        }
                        setSignUpOpportunity(opp);
                        setScheduledDate(dateEl.value);
                        setSelectedRoleOption(roleEl.value);
                      }}
                      className="w-full py-2 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl font-display font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Register Service Slot</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* User Signups Summary Ledger */}
        <div className="pt-6 border-t border-clay/40 space-y-4">
          <h3 className="text-xs font-display font-bold uppercase tracking-widest text-gray-500">Your Scheduled Service Engagements</h3>
          
          {userSignups.length === 0 ? (
            <div className="py-8 text-center text-gray-400 font-sans text-xs border border-dashed border-clay/60 rounded-2xl">
              You haven't scheduled any field support operations yet. Review open opportunities above to get on-ground!
            </div>
          ) : (
            <div className="overflow-hidden border border-clay/50 rounded-2xl bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="bg-sand-bg border-b border-clay text-dark-blue/80 uppercase tracking-wider text-[9px] font-extrabold">
                      <th className="p-3">Registered Time</th>
                      <th className="p-3">Activity / Project</th>
                      <th className="p-3">Assigned Role</th>
                      <th className="p-3">Scheduled Date</th>
                      <th className="p-3">Target Regions</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-clay/40 text-gray-700">
                    {userSignups.map((s) => {
                      const matchedOpp = VOLUNTEER_OPPORTUNITIES.find(o => o.id === s.opportunityId);
                      return (
                        <tr key={s.id} className="hover:bg-sand-bg/20 transition-colors text-[11px]">
                          <td className="p-3 font-mono font-semibold text-gray-400 whitespace-nowrap">{s.timestamp}</td>
                          <td className="p-3 font-bold text-dark-blue">{s.title}</td>
                          <td className="p-3 font-medium text-gray-600 whitespace-nowrap">{s.role}</td>
                          <td className="p-3 font-semibold text-terracotta whitespace-nowrap">{s.date}</td>
                          <td className="p-3 text-gray-500 max-w-xs truncate">{s.regions}</td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  if (matchedOpp) {
                                    setSignedUpOpportunityDetails({
                                      opportunity: matchedOpp,
                                      signup: s
                                    });
                                  } else {
                                    alert("Opportunity details not found.");
                                  }
                                }}
                                className="px-2.5 py-1 rounded-md border border-clay bg-white text-dark-blue hover:text-terracotta hover:border-terracotta transition-colors font-bold text-[10px] inline-flex items-center space-x-1 cursor-pointer"
                                title="View Email Briefing Simulation"
                              >
                                <Mail className="w-3 h-3 text-dark-blue" />
                                <span>Briefing</span>
                              </button>
                              <button
                                onClick={() => handleCancelSignup(s.id)}
                                className="px-2 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors font-bold text-[10px] inline-flex items-center space-x-0.5 cursor-pointer"
                                title="Cancel Scheduled Engagement"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Cancel</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5.7 REMINDERS & NOTIFICATION PREFERENCES */}
      <div className="bg-white border border-clay rounded-3xl p-6 sm:p-8 space-y-6 text-left" id="notifications-control-panel">
        <div className="space-y-1">
          <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-terracotta">Real-time Information Bridges</span>
          <h2 className="font-display font-extrabold text-2xl text-dark-blue">Reminders & Notification Center</h2>
          <p className="font-sans text-xs text-gray-500 max-w-2xl">
            Configure periodic email reminders for your ongoing sponsorships, and authorize local browser-based push notifications for progress audits.
          </p>
        </div>

        {notificationSavedToast && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl font-sans text-xs flex items-center space-x-2 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            <span>Notification preferences updated successfully! Stored securely in profile settings.</span>
          </div>
        )}

        <form onSubmit={handleSaveNotificationPreferences} className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
          {/* Card 1: Email reminders for monthly contributions */}
          <div className="border border-clay rounded-2xl p-5 sm:p-6 bg-sand-bg/10 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-clay/35">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-terracotta flex items-center justify-center border border-orange-100 shrink-0">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-dark-blue">Monthly Sponsorship Reminders</h3>
                  <p className="text-[10px] text-gray-500 font-medium">Auto-notifies you prior to scheduled recurring support drafts.</p>
                </div>
              </div>

              {/* Toggle switch */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700 text-xs">Enable Email Notifications</span>
                <button
                  type="button"
                  onClick={() => setEmailRemindersEnabled(!emailRemindersEnabled)}
                  className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                    emailRemindersEnabled ? 'bg-terracotta' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform duration-200 ${
                    emailRemindersEnabled ? 'translate-x-4.5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {emailRemindersEnabled && (
                <div className="grid grid-cols-2 gap-3 pt-1 animate-in slide-in-from-top-1 duration-200">
                  <div className="space-y-1">
                    <label className="block font-semibold text-gray-600">Reminder Day</label>
                    <select
                      value={reminderDayOfMonth}
                      onChange={(e) => setReminderDayOfMonth(e.target.value)}
                      className="w-full px-2.5 py-2 border border-clay rounded-lg bg-white text-dark-blue text-[11px] focus:outline-none font-medium"
                    >
                      <option value="1">1st of month</option>
                      <option value="5">5th of month</option>
                      <option value="10">10th of month</option>
                      <option value="15">15th of month</option>
                      <option value="28">28th of month</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-semibold text-gray-600">Sponsorship Volume</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-gray-400 font-bold">$</span>
                      <input
                        type="number"
                        value={reminderAmount}
                        onChange={(e) => setReminderAmount(e.target.value)}
                        className="w-full pl-5 pr-1 py-1.5 border border-clay rounded-lg bg-white text-dark-blue font-semibold text-[11px] focus:outline-none"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-clay/30 flex gap-2">
              <button
                type="button"
                onClick={() => triggerSimulatedTestNotification('email')}
                className="w-full py-2 rounded-xl border border-clay bg-white text-dark-blue font-display font-bold text-[10px] uppercase tracking-wider hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center space-x-1"
              >
                <Send className="w-3 h-3 text-dark-blue" />
                <span>Dispatch Test Email</span>
              </button>
            </div>
          </div>

          {/* Card 2: Browser push alerts */}
          <div className="border border-clay rounded-2xl p-5 sm:p-6 bg-sand-bg/10 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-clay/35">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                  <Bell className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-dark-blue">Live Field Progress Push Alerts</h3>
                  <p className="text-[10px] text-gray-500 font-medium">Instant alerts on clean water borehole or school auditing phases.</p>
                </div>
              </div>

              {/* Toggle switch */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700 text-xs">Enable Browser Push Alerts</span>
                <button
                  type="button"
                  onClick={() => setPushNotificationsEnabled(!pushNotificationsEnabled)}
                  className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                    pushNotificationsEnabled ? 'bg-terracotta' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform duration-200 ${
                    pushNotificationsEnabled ? 'translate-x-4.5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-gray-600">
                  <span className="font-medium text-xs">Notify on personal impact milestone reached</span>
                  <input
                    type="checkbox"
                    checked={notifyOnMilestone}
                    onChange={(e) => setNotifyOnMilestone(e.target.checked)}
                    className="w-4.5 h-4.5 accent-terracotta border-clay rounded-md cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span className="font-medium text-xs">Notify on new sub-district field campaign launch</span>
                  <input
                    type="checkbox"
                    checked={notifyOnNewProjects}
                    onChange={(e) => setNotifyOnNewProjects(e.target.checked)}
                    className="w-4.5 h-4.5 accent-terracotta border-clay rounded-md cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-clay/30 flex gap-2">
              <button
                type="button"
                onClick={() => triggerSimulatedTestNotification('push')}
                className="w-full py-2 rounded-xl border border-clay bg-white text-dark-blue font-display font-bold text-[10px] uppercase tracking-wider hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center space-x-1"
              >
                <Smartphone className="w-3 h-3 text-dark-blue" />
                <span>Simulate Push Update</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Profile Preferences</span>
            </button>
          </div>
        </form>
      </div>

      {/* 6. COMPREHENSIVE DETAILED DONATION HISTORY LEDGER */}
      <div className="bg-white border border-clay rounded-3xl p-6 sm:p-8 space-y-6 text-left" id="donor-ledger-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-terracotta">Transparent Accounting Logs</span>
            <h2 className="font-display font-extrabold text-2xl text-dark-blue">Donation History Ledger</h2>
          </div>

          {/* Filters controls row */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto font-sans text-xs">
            <button
              type="button"
              onClick={handleDownloadTaxSummary}
              className="px-3.5 py-2 bg-dark-blue hover:bg-terracotta text-white rounded-xl font-display font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="Download Complete Tax Statement Summary (PDF)"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>Tax Summary (PDF)</span>
            </button>
            <input 
              type="text"
              placeholder="Search receipt ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3.5 py-2 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta text-xs w-full sm:w-44"
            />
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="px-3.5 py-2 border border-clay rounded-xl bg-white text-dark-blue focus:outline-none focus:border-terracotta text-xs w-full sm:w-auto"
            >
              <option value="all">All Campaign Targets</option>
              {allProjects.map(p => (
                <option key={p.id} value={p.id}>{p.title.substring(0, 24)}...</option>
              ))}
            </select>
          </div>
        </div>

        {filteredDonations.length === 0 ? (
          <div className="py-12 text-center text-gray-400 font-sans text-sm border-2 border-dashed border-clay/60 rounded-2xl">
            No transaction records found matching those query filters.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-clay/60">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-sand-bg border-b border-clay text-dark-blue/80 uppercase tracking-wider text-[10px] font-bold">
                  <th className="p-3.5">Transaction ID</th>
                  <th className="p-3.5">Campaign Target</th>
                  <th className="p-3.5">Amount (USD)</th>
                  <th className="p-3.5">Frequency</th>
                  <th className="p-3.5">Handshake Date</th>
                  <th className="p-3.5">Gateway Channel</th>
                  <th className="p-3.5 text-center">Tax Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-clay/40">
                {filteredDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-sand-bg/40 transition-colors text-gray-700">
                    <td className="p-3.5 font-mono font-bold text-dark-blue">{d.receiptId}</td>
                    <td className="p-3.5 font-medium">{d.projectName}</td>
                    <td className="p-3.5 font-bold text-terracotta">${d.amount.toLocaleString()}</td>
                    <td className="p-3.5 capitalize">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.frequency === 'monthly' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {d.frequency === 'onetime' ? 'One-Time' : 'Monthly'}
                      </span>
                    </td>
                    <td className="p-3.5 text-gray-500">{d.date}</td>
                    <td className="p-3.5 capitalize text-gray-500 font-medium">
                      {d.paymentMethod === 'card' ? 'Credit / Debit Card' : 'Mobile Money'}
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedReceipt(d)}
                          className="px-2.5 py-1.5 rounded-lg border border-clay bg-white text-dark-blue hover:text-terracotta hover:border-terracotta transition-colors font-semibold text-[10px] inline-flex items-center space-x-1 cursor-pointer"
                          title="View Official Receipt"
                        >
                          <Eye className="w-3 h-3 text-dark-blue" />
                          <span>View Receipt</span>
                        </button>
                        <button
                          onClick={() => handleDownloadReceipt(d)}
                          className="px-2.5 py-1.5 rounded-lg border border-terracotta/30 bg-terracotta/5 text-terracotta hover:bg-terracotta hover:text-white transition-colors font-semibold text-[10px] inline-flex items-center space-x-1 cursor-pointer"
                          title="Download Receipt (Offline Printable)"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download Receipt</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 7. PRINTABLE OFFICIAL TAX RECEIPT MODAL */}
      <AnimatePresence>
        {selectedReceipt && (
          <div className="fixed inset-0 bg-dark-blue/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="bg-white border-2 border-dark-blue rounded-3xl p-8 max-w-xl w-full space-y-6 shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setSelectedReceipt(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-dark-blue p-1 rounded-full hover:bg-clay/20 transition-colors"
                id="close-receipt-modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Styled like an official tax-deductible receipt */}
              <div className="space-y-6 border border-dark-blue/40 p-6 rounded-2xl relative" id="official-tax-receipt">
                
                {/* Official seal watermark in corner */}
                <div className="absolute top-4 right-4 text-terracotta/10 pointer-events-none select-none">
                  <Award className="w-16 h-16 stroke-[1.5]" />
                </div>

                <div className="text-center space-y-1">
                  <span className="font-display font-extrabold text-lg text-dark-blue tracking-wider block">UMOJA FOUNDATION ADVOCACY</span>
                  <span className="font-sans font-bold text-[9px] tracking-widest text-terracotta uppercase block">OFFICIAL TAX SPONSORSHIP RECEIPT</span>
                  <p className="font-sans text-[8px] text-gray-400">Ashongman Traditional Block • 501(c)(3) Non-Profit Entity ID #94-384391</p>
                </div>

                <div className="h-px bg-dark-blue/20" />

                <div className="grid grid-cols-2 gap-4 font-sans text-xs">
                  <div>
                    <span className="block text-[9px] text-gray-400 uppercase font-semibold">Authorized Representative</span>
                    <strong className="text-dark-blue block mt-0.5">{displayName}</strong>
                    <span className="text-gray-500 text-[10px] block mt-0.5">{location}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[9px] text-gray-400 uppercase font-semibold">Handshake Date</span>
                    <strong className="text-dark-blue block mt-0.5">{selectedReceipt.date}</strong>
                    <span className="text-gray-500 text-[10px] block mt-0.5">Receipt: #{selectedReceipt.receiptId}</span>
                  </div>
                </div>

                <div className="bg-sand-bg border border-clay/60 rounded-xl p-4 space-y-3 font-sans text-xs">
                  <div className="flex justify-between border-b border-clay/40 pb-1.5 font-semibold text-dark-blue">
                    <span>Sponsorship Project target</span>
                    <span className="text-right">{selectedReceipt.projectName}</span>
                  </div>
                  <div className="flex justify-between border-b border-clay/40 pb-1.5 text-gray-500">
                    <span>Gateway Authorization ID</span>
                    <span className="font-mono">{selectedReceipt.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-clay/40 pb-1.5 text-gray-500">
                    <span>Donation Mode Channel</span>
                    <span className="capitalize">{selectedReceipt.frequency} Support</span>
                  </div>
                  <div className="flex justify-between pt-1 font-extrabold text-sm text-dark-blue">
                    <span>Tax-Deductible Contribution Volume</span>
                    <span className="text-terracotta">${selectedReceipt.amount.toLocaleString()} USD</span>
                  </div>
                </div>

                <div className="text-[10px] text-gray-500 font-sans leading-relaxed text-center space-y-1">
                  <p>
                    *This contribution has been authorized inside the regional Umoja ledgers. No products or personal services were supplied in consideration for this financial grant.
                  </p>
                  <p className="font-bold text-[9px] text-dark-blue">
                    Verified by executive director Mubaarakah Salwat Rashid
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 justify-end pt-2">
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="px-4 py-2 border border-clay rounded-xl text-xs font-display font-bold text-dark-blue cursor-pointer hover:bg-clay/20 transition-colors"
                >
                  Close Document
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-2 border border-dark-blue text-dark-blue hover:bg-clay/10 rounded-xl text-xs font-display font-bold transition-colors cursor-pointer flex items-center space-x-1"
                  title="Trigger native system printing"
                >
                  <Eye className="w-4 h-4" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => handleDownloadReceipt(selectedReceipt)}
                  className="px-5 py-2 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-display font-bold transition-colors cursor-pointer flex items-center space-x-1"
                  title="Download self-contained offline PDF receipt"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Receipt</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. DIRECT MESSAGE MODAL TO FIELD TEAM */}
      <AnimatePresence>
        {messageProject && (
          <div className="fixed inset-0 bg-dark-blue/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-clay rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setMessageProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-dark-blue p-1 rounded-full hover:bg-clay/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1.5">
                <h3 className="font-display font-black text-lg text-dark-blue">Message Campaign Team</h3>
                <p className="font-sans text-xs text-gray-500">
                  Target Project: <strong className="text-terracotta">{messageProject}</strong>
                </p>
              </div>

              {messageSentSuccess && (
                <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl font-sans text-xs flex items-center space-x-2 animate-pulse">
                  <CheckCircle2 className="w-4.5 h-4.5 text-green-600 shrink-0" />
                  <span>Message successfully dispatched directly to Regional Coordinators!</span>
                </div>
              )}

              <form onSubmit={handleSendProjectMessage} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Your Inquiry / Message Note</label>
                  <textarea
                    value={projectMessageText}
                    onChange={(e) => setProjectMessageText(e.target.value)}
                    placeholder="Ask about materials logs, project construction phase timeline, or coordinate local support visits..."
                    className="w-full px-3.5 py-2.5 border border-clay rounded-xl bg-white text-sm text-dark-blue focus:outline-none focus:border-terracotta h-28 resize-none font-medium"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3.5">
                  <button
                    type="button"
                    onClick={() => setMessageProject(null)}
                    className="px-4 py-2 border border-clay rounded-xl text-xs font-semibold text-dark-blue cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-display font-bold flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message Node</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. VOLUNTEER MILESTONE CONGRATULATORY MODAL */}
      <AnimatePresence>
        {unlockedMilestoneModal && (
          <div className="fixed inset-0 bg-dark-blue/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border border-clay rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Confetti decoration inside the modal too */}
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-yellow-400/20 rounded-full blur-xl" />
              <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-teal-400/20 rounded-full blur-xl" />

              <div className="w-20 h-20 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mx-auto border border-yellow-200 animate-bounce">
                <Trophy className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="font-sans font-black text-[10px] uppercase tracking-widest text-terracotta">Milestone Achieved!</span>
                <h3 className="font-display font-black text-xl text-dark-blue leading-snug">
                  {unlockedMilestoneModal.title} Unlocked
                </h3>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">
                  {unlockedMilestoneModal.desc}
                </p>
              </div>

              <div className="p-4 bg-sand-bg border border-clay/60 rounded-2xl flex flex-col items-center justify-center space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-gray-400">Awarded Credential Badge</span>
                <div className="text-dark-blue font-display font-extrabold text-sm flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-terracotta" />
                  <span>Community Hero: {unlockedMilestoneModal.level} Tier</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    confetti({
                      particleCount: 150,
                      spread: 80,
                      origin: { x: 0.5, y: 0.5 }
                    });
                  }}
                  className="w-full py-2.5 rounded-xl bg-dark-blue hover:bg-dark-blue/90 text-white font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Replay Confetti Burst</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUnlockedMilestoneModal(null)}
                  className="w-full py-2.5 rounded-xl border border-clay bg-white text-dark-blue hover:bg-gray-50 font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Close & Continue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SIMULATED PUSH/EMAIL NOTIFICATION POPUP */}
      <AnimatePresence>
        {simulatedAlert && (
          <div className="fixed top-6 right-6 z-[100] max-w-sm w-full bg-white border-2 border-dark-blue rounded-2xl shadow-2xl p-4 overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 border border-terracotta/20 animate-bounce">
                {simulatedAlert.icon === 'Bell' ? <Bell className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
              </div>
              <div className="space-y-1 text-left flex-1">
                <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-terracotta">
                  {simulatedAlert.type === 'push' ? 'Real-time Push Notification' : 'Mock Email Dispatched'}
                </span>
                <h4 className="font-display font-bold text-xs sm:text-sm text-dark-blue leading-tight">
                  {simulatedAlert.title}
                </h4>
                <p className="font-sans text-xs text-gray-500 whitespace-pre-line leading-relaxed">
                  {simulatedAlert.body}
                </p>
              </div>
              <button 
                onClick={() => setSimulatedAlert(null)}
                className="text-gray-400 hover:text-dark-blue cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-clay/35 flex justify-end">
              <button
                onClick={() => setSimulatedAlert(null)}
                className="px-3 py-1 bg-dark-blue text-white rounded-lg text-[10px] font-sans font-bold uppercase tracking-wider hover:bg-terracotta transition-colors cursor-pointer"
              >
                Dismiss Alert
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* VOLUNTEER REGISTRATION INTAKE FORM MODAL */}
      <AnimatePresence>
        {signUpOpportunity && (
          <div className="fixed inset-0 bg-dark-blue/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-clay rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative text-left font-sans text-xs"
            >
              <button 
                onClick={() => {
                  setSignUpOpportunity(null);
                  setScheduledDate('');
                  setSelectedRoleOption('');
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-dark-blue p-1 rounded-full hover:bg-clay/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pb-2 border-b border-clay/35">
                <span className="text-[10px] uppercase tracking-widest font-bold text-terracotta font-sans">Deployment Intake Form</span>
                <h3 className="font-display font-black text-xl text-dark-blue leading-tight">Review Field Service Details</h3>
                <p className="text-[11px] text-gray-500">Verify your assigned details and sign off to register your service slot.</p>
              </div>

              <div className="space-y-2 bg-sand-bg/30 p-4 border border-clay rounded-xl">
                <div className="flex justify-between border-b border-clay/35 pb-1">
                  <span className="text-gray-500">Project Mission</span>
                  <strong className="text-dark-blue text-right">{signUpOpportunity.title}</strong>
                </div>
                <div className="flex justify-between border-b border-clay/35 pb-1">
                  <span className="text-gray-500">Selected Action Date</span>
                  <strong className="text-terracotta font-mono">{scheduledDate}</strong>
                </div>
                <div className="flex justify-between border-b border-clay/35 pb-1">
                  <span className="text-gray-500">Assigned Operational Role</span>
                  <strong className="text-dark-blue">{selectedRoleOption}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Field Target Location</span>
                  <strong className="text-gray-700 text-right">{signUpOpportunity.regions}</strong>
                </div>
              </div>

              <form onSubmit={handleSignUpForOpportunity} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block font-semibold text-gray-700">Supporter Contact Email</label>
                  <input
                    type="email"
                    value={loggedInUser}
                    className="w-full px-3 py-2 border border-clay rounded-lg bg-gray-100 text-gray-500 text-xs focus:outline-none"
                    disabled
                  />
                  <p className="text-[9px] text-gray-400">Briefing instructions will be simulated to this email coordinate.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-gray-700">Special Logistics / Equipment Needs</label>
                  <textarea
                    placeholder="E.g., require shared 4x4 transport from assembly point, bringing personal water testing probes, food allergies, etc."
                    className="w-full px-3 py-2 border border-clay rounded-lg bg-white text-dark-blue text-xs focus:outline-none focus:border-terracotta h-20 resize-none font-medium"
                  />
                </div>

                <div className="flex items-start space-x-2 text-[10px] text-gray-500 leading-relaxed">
                  <input type="checkbox" className="mt-0.5 accent-terracotta" required />
                  <span>I agree to represent Umoja Advocacy with professional integrity on-ground and comply with local regional chiefs' cultural protocols.</span>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSignUpOpportunity(null);
                      setScheduledDate('');
                      setSelectedRoleOption('');
                    }}
                    className="px-4 py-2 border border-clay rounded-xl font-bold text-dark-blue cursor-pointer hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl font-display font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Dispatch Briefing</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HIGH-FIDELITY SIMULATED EMAIL CLIENT PANEL */}
      <AnimatePresence>
        {signedUpOpportunityDetails && (
          <div className="fixed inset-0 bg-dark-blue/85 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full text-left"
            >
              {/* Email client header */}
              <div className="bg-slate-800 px-5 py-3.5 border-b border-slate-700 flex items-center justify-between text-slate-200 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 pl-2">umoja-mail-gateway-client v1.4 // Inbox</span>
                </div>
                <button
                  onClick={() => setSignedUpOpportunityDetails(null)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Message metadata pane */}
              <div className="bg-slate-800/50 p-4.5 border-b border-slate-700/80 space-y-1.5 font-sans text-xs text-slate-300">
                <div className="flex justify-between">
                  <span><strong>Subject:</strong> [CONFIRMED BRIEFING] Action Deployment Slot for {signedUpOpportunityDetails.signup.role}</span>
                  <span className="font-mono text-[10px] text-slate-400">{signedUpOpportunityDetails.signup.timestamp}</span>
                </div>
                <div><strong>From:</strong> Umoja Logistics Office &lt;logistics@umoja-advocacy.org&gt;</div>
                <div><strong>To:</strong> {loggedInUser} &lt;supporter-partner&gt;</div>
              </div>

              {/* Email letter body (rendered with premium white newsletter branding style) */}
              <div className="bg-white p-6 sm:p-8 overflow-y-auto max-h-[60vh] font-sans text-xs sm:text-sm text-gray-800">
                <div className="space-y-6 max-w-lg mx-auto">
                  {/* Branding Header */}
                  <div className="flex items-center justify-between border-b pb-4 border-gray-100">
                    <div>
                      <h1 className="font-display font-black text-lg text-dark-blue tracking-wide">UMOJA ADVOCACY GROUP</h1>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Field Deployment & Logistics Hub</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center border border-terracotta/20 font-bold">
                      U
                    </div>
                  </div>

                  {/* Letter content */}
                  <div className="space-y-4">
                    <p className="font-semibold text-dark-blue">
                      Hello {displayName},
                    </p>
                    <p className="leading-relaxed text-gray-600">
                      This formal briefing node confirms your registration as a front-line volunteer. Your service dedication is vital in establishing regional sanitation structures and providing dignity access.
                    </p>

                    {/* Operational Details Box */}
                    <div className="bg-sand-bg border border-clay rounded-2xl p-4 space-y-2.5 text-xs">
                      <h4 className="font-display font-black text-dark-blue text-xs uppercase tracking-wider border-b border-clay/50 pb-1">
                        Deployment Operations Sheet
                      </h4>
                      <div className="grid grid-cols-2 gap-y-1.5 text-gray-700">
                        <div>
                          <span className="block text-[9px] text-gray-400 uppercase">Mission Action</span>
                          <strong>{signedUpOpportunityDetails.opportunity.title}</strong>
                        </div>
                        <div>
                          <span className="block text-[9px] text-gray-400 uppercase">Assigned Service Role</span>
                          <strong>{signedUpOpportunityDetails.signup.role}</strong>
                        </div>
                        <div>
                          <span className="block text-[9px] text-gray-400 uppercase">Deployment Date</span>
                          <strong className="text-terracotta">{signedUpOpportunityDetails.signup.date}</strong>
                        </div>
                        <div>
                          <span className="block text-[9px] text-gray-400 uppercase">Field Coordinates</span>
                          <strong>{signedUpOpportunityDetails.opportunity.regions}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-gray-600 border-l-2 border-terracotta pl-3">
                      <h5 className="font-bold text-dark-blue">Pre-Deployment Briefing Guidelines</h5>
                      <p className="leading-relaxed">
                        <strong>1. Footwear & Apparel:</strong> Sturdy, closed-toe tactical or hiking shoes are mandatory. Wear breathable athletic apparel suitable for humid outdoor temperatures.
                      </p>
                      <p className="leading-relaxed">
                        <strong>2. Assembly Coordinate:</strong> Report directly to the regional coordination hub at 08:00 AM sharp on deployment morning.
                      </p>
                      <p className="leading-relaxed">
                        <strong>3. Cultural Protocol:</strong> During school baseline audits and community chief councils, please adhere strictly to Umoja's guided coordination protocols to respect local customs.
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 italic">
                      A regional coordinator has flagged your signup sheet and will contact you via text or secondary email 48 hours prior to action day to finalize carpooling logistics.
                    </p>

                    <p className="text-xs font-semibold text-dark-blue border-t pt-4 border-gray-100">
                      Salwat Rashid • Coordinator General, Umoja Field Ops
                    </p>
                  </div>
                </div>
              </div>

              {/* Email actions footer bar */}
              <div className="bg-slate-800 px-6 py-4 border-t border-slate-700 flex flex-wrap gap-2 justify-between items-center">
                <span className="text-[10px] text-slate-400 font-mono">Simulated email handshake active</span>
                <div className="flex gap-2.5">
                  <button
                    onClick={() => {
                      alert("Successfully simulated adding 'Umoja Field Service' to your local calendar!");
                    }}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-600 hover:border-slate-400 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Add to Calendar</span>
                  </button>
                  <button
                    onClick={() => setSignedUpOpportunityDetails(null)}
                    className="px-4 py-1.5 rounded-lg bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Close Inbox Client
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
