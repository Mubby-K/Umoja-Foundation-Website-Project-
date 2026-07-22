import { Project, TeamMember, ImpactPillar, DonationOption, SchoolAudit } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'proj-wash-rural',
    title: 'WASH Facilities in Rural Ghana',
    category: 'WASH',
    description: 'Providing clean running water, touchless washing stations, and secure plumbing to local schools.',
    longDescription: 'Our flagship WASH (Water, Sanitation, and Hygiene) project focuses on retrofitting rural elementary and junior high schools with critical infrastructure. By laying down solar-powered pumps and plumbing systems, we ensure students and staff have uninterrupted access to clean water, which is fundamental to avoiding preventable waterborne diseases and maintaining visual, tactile cleanliness.',
    location: 'Accra and Central Region, Ghana',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600',
    status: 'Completed',
    impactMetrics: '12 Schools Equipped • 4,500+ Students Benefiting',
    fundingGoal: 15000,
    fundingRaised: 15000
  },
  {
    id: 'proj-mhm-workshops',
    title: 'Menstrual Hygiene Management Workshops',
    category: 'Hygiene',
    description: 'Empowering girls through health education, custom workshops, and supply kits.',
    longDescription: 'Sanitation facilities are only half the battle. This initiative delivers peer-led health educational campaigns paired with local workshop toolkits. We distribute custom-made, biodegradable Menstrual Hygiene Management (MHM) kits containing washable, reusable pads and protective undergarments, dismantling biological stigmas and fostering high self-esteem.',
    location: 'Eastern and Ashanti Regions, Ghana',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600',
    status: 'Active',
    impactMetrics: '35 Workshops Hosted • 1,800+ Dignity Kits Distributed',
    fundingGoal: 8000,
    fundingRaised: 6200
  },
  {
    id: 'proj-school-audits',
    title: 'Data-Driven School Audits',
    category: 'Audits',
    description: 'Documenting environmental baseline statistics to drive government policy and resources.',
    longDescription: 'True advocacy is fueled by robust raw data. Our mobile tracking teams run extensive local facility audits across rural school blocks, documenting the presence of lockable doors, running water lines, and toilet-to-student ratios. We compile this data directly into dashboards to help public agencies allocate funds accurately.',
    location: 'Northern and Volta Regions, Ghana',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600',
    status: 'Active',
    impactMetrics: '64 Schools Audited • Over 120 Data Points Logged',
    fundingGoal: 5000,
    fundingRaised: 4800
  },
  {
    id: 'proj-safe-schools-infra',
    title: 'Safe Schools Infrastructure Uplift',
    category: 'Education',
    description: 'Constructing lockable, private sanitation complexes to keep adolescent girls safe in school.',
    longDescription: 'When sanitation facilities lack lockable doors and adequate privacy, adolescent girls are disproportionately forced to skip academic terms. This initiative constructs secure, well-lit, lockable private cubicles with dedicated waste disposal chutes, protecting female students and drastically reducing absenteeism rates.',
    location: 'Western Region, Ghana',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600',
    status: 'Active',
    impactMetrics: '8 Complexes Under Construction • 3,200 Girls Retained',
    fundingGoal: 20000,
    fundingRaised: 14500
  },
  {
    id: 'proj-clean-boreholes',
    title: 'Clean Water Boreholes & Solar Pumps',
    category: 'WASH',
    description: 'Harnessing solar power to deliver reliable running water from deep underground aquifers.',
    longDescription: 'Laying pipe networks is meaningless without a source. We dig sustainable deep-ground boreholes equipped with rugged submersible solar-powered pumps. This setup delivers high-volume water supply to storage overhead tanks, gravity-feeding sanitary school washbasins entirely offline from weak regional grids.',
    location: 'Brong-Ahafo Region, Ghana',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600',
    status: 'Completed',
    impactMetrics: '5 Boreholes Drilled • Clean Water for 9,000+ Citizens',
    fundingGoal: 18000,
    fundingRaised: 18000
  },
  {
    id: 'proj-eco-blocks',
    title: 'Eco-Sanitation Blocks',
    category: 'WASH',
    description: 'Building completely organic, self-composting toilets with rainwater harvesting roofs.',
    longDescription: 'Combining environmental safety with sanitation, our Eco-Sanitation Blocks capture rainwater on roofs to supply flushing networks. Using advanced self-composting bacterial layers, they process biological matter safely without leaching toxic materials into regional drinking aquifers.',
    location: 'Upper East Region, Ghana',
    image: '/src/assets/images/women_chili_field_1784559877719.jpg',
    status: 'Planned',
    impactMetrics: '4 Sites Evaluated • Material Procurement Pending',
    fundingGoal: 25000,
    fundingRaised: 3400
  }
];

export const TEAM: TeamMember[] = [
  {
    name: 'Mubaarakah Salwat Rashid',
    role: 'Executive Director',
    image: '/src/assets/images/mubaarakah_salwat_rashid_1784732734921.jpg',
    bio: 'An impassioned advocate for public health and gender equality, Mubaarakah directs our central vision. She spearheads policy frameworks, international partner collaborations, and community integration to secure clean environments for girls across Ghana.'
  },
  {
    name: 'Dr. Kofi Asante',
    role: 'Program Director',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300',
    bio: 'With over 12 years of structural engineering and hydrology expertise, Dr. Asante supervises our physical designs. He oversees borehole drilling precision, water purification standards, and long-term facility health checkups.'
  },
  {
    name: 'Evelyn Mensah',
    role: 'Field Lead & Health Educator',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300',
    bio: 'Evelyn leads our ground education campaigns. She facilitates localized Menstrual Hygiene Management workshops, manages physical kit distributions, and builds trusted alliances with regional parent-teacher associations.'
  },
  {
    name: 'Ibrahim Yakubu',
    role: 'Communications Chief',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300',
    bio: 'Ibrahim ensures transparency. He coordinates our public metrics publication, maintains communication lines between our Ghana office and donor groups, and captures the human stories of our WASH installations.'
  }
];

export const PILLARS: ImpactPillar[] = [
  {
    title: 'Community Partnerships',
    description: 'We work hand-in-hand with regional advocates, traditional chiefs, and academic school boards to build deep, respectful local ownership of facilities.',
    icon: 'Users'
  },
  {
    title: 'Data-Driven Audits',
    description: 'Consistently compiling public environmental metrics to highlight policy failures, document progress, and track real project accountability.',
    icon: 'BarChart3'
  },
  {
    title: 'Sustainable Solutions',
    description: 'Architecting long-lasting infrastructure tailored to tropical weather elements, utilizing offline solar energy, composting, and local materials.',
    icon: 'Leaf'
  }
];

export const DONATION_OPTIONS: DonationOption[] = [
  {
    amount: 25,
    impactDescription: 'Provides a private Menstrual Hygiene Management kit and term-long dignity supplies for 5 female students in rural schools.',
    illustration: 'Kit'
  },
  {
    amount: 50,
    impactDescription: 'Funds a detailed hygiene educational workshop and trained health educator session for a complete classroom block.',
    illustration: 'Workshop'
  },
  {
    amount: 100,
    impactDescription: 'Constructs two gravity-fed, touchless handwashing stations with local soap provisions for safe school environments.',
    illustration: 'Station'
  },
  {
    amount: 250,
    impactDescription: 'Underwrites an exhaustive sanitation audit for a community school, capturing baseline data for public policy lobbies.',
    illustration: 'Audit'
  },
  {
    amount: 500,
    impactDescription: 'Supplies hardware repairs (lockable privacy doors, fresh ventilating shafts) for a school sanitation block.',
    illustration: 'Doors'
  },
  {
    amount: 1000,
    impactDescription: 'Directly co-sponsors the drilling of a solar-powered borehole, delivering water security to an entire educational compound.',
    illustration: 'Borehole'
  }
];

export const INITIAL_AUDITS: SchoolAudit[] = [
  {
    id: 'aud-001',
    schoolName: 'Aburi Methodist Primary',
    region: 'Eastern Region',
    auditDate: '2026-02-14',
    sanitationScore: 82,
    needsWaterHookup: false,
    needsMenstrualHygieneKits: true,
    status: 'Resolved'
  },
  {
    id: 'aud-002',
    schoolName: 'Danyame Junior High',
    region: 'Ashanti Region',
    auditDate: '2026-03-22',
    sanitationScore: 35,
    needsWaterHookup: true,
    needsMenstrualHygieneKits: true,
    status: 'WIP'
  },
  {
    id: 'aud-003',
    schoolName: 'Tamale Girls Senior High',
    region: 'Northern Region',
    auditDate: '2026-04-10',
    sanitationScore: 91,
    needsWaterHookup: false,
    needsMenstrualHygieneKits: false,
    status: 'Resolved'
  },
  {
    id: 'aud-004',
    schoolName: 'Kpetoe Basic School',
    region: 'Volta Region',
    auditDate: '2026-05-18',
    sanitationScore: 18,
    needsWaterHookup: true,
    needsMenstrualHygieneKits: true,
    status: 'Audited'
  },
  {
    id: 'aud-005',
    schoolName: 'Sefwi Wiawso Anglican Primary',
    region: 'Western North Region',
    auditDate: '2026-06-02',
    sanitationScore: 54,
    needsWaterHookup: true,
    needsMenstrualHygieneKits: false,
    status: 'WIP'
  }
];
