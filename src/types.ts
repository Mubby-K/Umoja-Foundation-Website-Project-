export interface Project {
  id: string;
  title: string;
  category: 'WASH' | 'Hygiene' | 'Audits' | 'Education';
  description: string;
  longDescription: string;
  location: string;
  image: string;
  status: 'Completed' | 'Active' | 'Planned';
  impactMetrics: string;
  fundingGoal: number;
  fundingRaised: number;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface ImpactPillar {
  title: string;
  description: string;
  icon: string;
}

export interface DonationOption {
  amount: number;
  impactDescription: string;
  illustration: string;
}

export interface SchoolAudit {
  id: string;
  schoolName: string;
  region: string;
  auditDate: string;
  sanitationScore: number; // 0 - 100
  needsWaterHookup: boolean;
  needsMenstrualHygieneKits: boolean;
  status: 'Audited' | 'WIP' | 'Resolved';
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface DonationRecord {
  id: string;
  amount: number;
  date: string;
  projectName: string;
  projectId?: string;
  frequency: 'onetime' | 'monthly';
  paymentMethod: 'card' | 'momo';
  receiptId: string;
}

