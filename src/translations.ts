export type Language = 'en' | 'sw' | 'fr';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  donateNow: string;
  home: string;
  aboutUs: string;
  projects: string;
  safeSchools: string;
  contact: string;
  memberSignup: string;
  adminLogin: string;
  myProfile: string;
  logout: string;
  
  // Home View
  heroTitle: string;
  heroSub: string;
  exploreProjects: string;
  viewAudits: string;
  impactTitle: string;
  impactSub: string;
  activeCampaigns: string;
  donorImpact: string;
  schoolsAudited: string;
  boreholesDrilled: string;
  communityLed: string;
  pillarsTitle: string;
  pillarsSub: string;

  // About View
  aboutTitle: string;
  aboutSub: string;
  missionTitle: string;
  missionDesc: string;
  teamTitle: string;
  teamSub: string;

  // Projects View
  projectsTitle: string;
  projectsSub: string;
  fundingRaised: string;
  fundingGoal: string;
  sponsorBtn: string;
  sponsorTitle: string;
  customAmount: string;
  successSponsor: string;
  backToProjects: string;

  // Safe Schools View
  safeSchoolsTitle: string;
  safeSchoolsSub: string;
  diagnosticTitle: string;
  diagnosticSub: string;
  complianceReport: string;
  registerAudit: string;
  schoolName: string;
  selectRegion: string;
  yearlyProgressTitle: string;
  yearlyProgressSub: string;

  // Donate View
  donationTitle: string;
  donationSub: string;
  oneTime: string;
  monthly: string;
  chooseAmount: string;
  secureDonation: string;
  selectProjectToFund: string;
  allProjectsFund: string;
  successDonation: string;

  // Contact View
  contactTitle: string;
  contactSub: string;
  sendMessage: string;
  yourName: string;
  yourEmail: string;
  subject: string;
  message: string;
  successMessage: string;

  // Auth / Login / Signup
  signupTitle: string;
  signupSub: string;
  loginTitle: string;
  loginSub: string;
  username: string;
  password: string;
  submit: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    appName: "UMOJA",
    tagline: "FOUNDATION",
    donateNow: "Donate Now",
    home: "Home",
    aboutUs: "About Us",
    projects: "Projects",
    safeSchools: "Safe Schools",
    contact: "Contact",
    memberSignup: "Member Signup",
    adminLogin: "Admin Login",
    myProfile: "My Profile",
    logout: "Logout",

    // Home View
    heroTitle: "Dignified Sanitation & Clean Water for Every Student",
    heroSub: "Umoja Foundation acts locally in East and West Africa to construct solar-powered water networks, private lockable latrines, and Menstrual Hygiene Management resources.",
    exploreProjects: "Explore Active Projects",
    viewAudits: "WASH Audit Sandbox",
    impactTitle: "Our Measurable Ground Footprint",
    impactSub: "No estimates, no vague numbers. Real-time community telemetry driven by regional field assessments.",
    activeCampaigns: "Active Campaigns",
    donorImpact: "Donor Contributions",
    schoolsAudited: "Schools Audited",
    boreholesDrilled: "Boreholes Drilled",
    communityLed: "100% Community Led",
    pillarsTitle: "The Umoja Framework",
    pillarsSub: "Our methodology blends hard engineering, data collection, and local peer workshops for multi-decade viability.",

    // About View
    aboutTitle: "We Are Umoja Foundation",
    aboutSub: "Uniting global resources with local leadership to build resilient school water networks and restore student dignity.",
    missionTitle: "Our Core Mission",
    missionDesc: "We believe that access to clean water, lockable private toilets, and reliable menstrual hygiene products are not luxuries. They are fundamental rights that keep girls in school, improve general health outcomes, and lay down the foundation for community-wide economic prosperity.",
    teamTitle: "Meet Our Leadership Team",
    teamSub: "Led by passionate humanitarians, structural engineers, and public health educators working on-site.",

    // Projects View
    projectsTitle: "Our Active & Completed Projects",
    projectsSub: "Sponsor community boreholes, eco-sanitation complexes, or peer-led health education blocks directly.",
    fundingRaised: "Funding Raised",
    fundingGoal: "Funding Goal",
    sponsorBtn: "Sponsor Project",
    sponsorTitle: "Sponsor This Specific Initiative",
    customAmount: "Or enter custom amount ($USD)",
    successSponsor: "Thank you for sponsoring this project directly!",
    backToProjects: "Back to All Projects",

    // Safe Schools View
    safeSchoolsTitle: "Safe Schools baseline registry",
    safeSchoolsSub: "Interactive dashboard displaying regional school water & sanitation audits, and our live diagnostics playground.",
    diagnosticTitle: "School WASH Safety Calculator",
    diagnosticSub: "Simulate regional school infrastructure scenarios to compute their WASH Compliance Score (0-100%) and instantly log them in our public registry.",
    complianceReport: "WASH Compliance Report",
    registerAudit: "Register in Audit Database",
    schoolName: "School Name for Baseline Log",
    selectRegion: "Select Region Block",
    yearlyProgressTitle: "Annual Progress & Safety Metrics",
    yearlyProgressSub: "Our verified annual indicators show significant improvements in sanitation infrastructure, directly correlating to better healthcare standards and student retention.",

    // Donate View
    donationTitle: "Support Dignified Sanitation",
    donationSub: "Choose a funding option to instantly construct handwashing stations, supply reusable dignity kits, or co-sponsor deep solar boreholes.",
    oneTime: "One-Time Donation",
    monthly: "Sustaining Monthly Support",
    chooseAmount: "Choose Sponsorship Tier",
    secureDonation: "Submit Secure Donation",
    selectProjectToFund: "Optionally direct your donation",
    allProjectsFund: "General WASH & Hygiene Fund",
    successDonation: "Donation processed successfully! Receipt generated.",

    // Contact View
    contactTitle: "Get in Touch With Us",
    contactSub: "Have questions about our school audits, partner networks, or project budgets? Reach our regional support team instantly.",
    sendMessage: "Send Message",
    yourName: "Your Full Name",
    yourEmail: "Your Email Address",
    subject: "Subject Matter",
    message: "Message Body",
    successMessage: "Message sent! Our communication team will respond shortly.",

    // Auth / Login / Signup
    signupTitle: "Join Our Member Network",
    signupSub: "Create a supporter account to track your donation receipts, explore local field reports, and manage custom monthly contributions.",
    loginTitle: "Administrative access",
    loginSub: "Sign in with your regional credentials to manage baseline audit records, approve projects, and update telemetry.",
    username: "User / Email Address",
    password: "Password Key",
    submit: "Submit",
    dontHaveAccount: "Don't have a supporter account? Sign up here",
    alreadyHaveAccount: "Already have a member account? Log in here"
  },
  sw: {
    appName: "UMOJA",
    tagline: "TAASISI",
    donateNow: "Changia Sasa",
    home: "Mwanzo",
    aboutUs: "Kuhusu Sisi",
    projects: "Miradi",
    safeSchools: "Shule Salama",
    contact: "Wasiliana Nasi",
    memberSignup: "Jisajili",
    adminLogin: "Ingia",
    myProfile: "Wasifu Wangu",
    logout: "Ondoka",

    // Home View
    heroTitle: "Usafi wa Heshima na Maji Safi kwa Kila Mwanafunzi",
    heroSub: "Taasisi ya Umoja inafanya kazi mashambani huko Afrika Mashariki na Magharibi kujenga mifumo ya maji ya jua, vyoo salama vyenye kufuli, na kutoa rasilimali za Usafi wa Hedhi.",
    exploreProjects: "Gundua Miradi Inayoendelea",
    viewAudits: "Uwanja wa Ukaguzi wa WASH",
    impactTitle: "Matokeo Yetu Yanayopimika Mashambani",
    impactSub: "Hakuna makadirio, hakuna nambari zisizo wazi. Vipimo vya moja kwa moja vinavyoendeshwa na tathmini za kikanda.",
    activeCampaigns: "Kampeni Zinazoendelea",
    donorImpact: "Michango ya Wafadhili",
    schoolsAudited: "Shule Zilizokaguliwa",
    boreholesDrilled: "Visima Vilivyochimbwa",
    communityLed: "100% Inaongozwa na Jamii",
    pillarsTitle: "Mfumo wa Umoja",
    pillarsSub: "Mbinu yetu inachanganya uhandisi madhubuti, ukusanyaji wa data, na warsha za ndani kwa uendelevu wa miongo kadhaa.",

    // About View
    aboutTitle: "Sisi ni Taasisi ya Umoja",
    aboutSub: "Kuunganisha rasilimali za kimataifa na uongozi wa ndani ili kujenga mifumo thabiti ya maji ya shule na kurudisha heshima ya wanafunzi.",
    missionTitle: "Dhamira Yetu Kuu",
    missionDesc: "Tunaamini kwamba kupata maji safi, vyoo vya faragha vyenye kufuli, na bidhaa za kuaminika za usafi wa hedhi si anasa. Ni haki za kimsingi zinazowaweka wasichana shuleni, kuboresha matokeo ya afya kwa ujumla, na kuweka msingi wa ustawi wa kiuchumi wa jamii nzima.",
    teamTitle: "Kutana na Timu Yetu ya Uongozi",
    teamSub: "Inaongozwa na wafanyakazi wa kibinadamu wenye shauku, wahandisi wa miundo, na waelimishaji wa afya ya jamii wanaofanya kazi papo hapo.",

    // Projects View
    projectsTitle: "Miradi Yetu Inayoendelea na Iliyokamilika",
    projectsSub: "Fadhili visima vya jamii, majengo ya usafi wa mazingira, au vitalu vya elimu ya afya vinavyoongozwa na marika moja kwa moja.",
    fundingRaised: "Fedha Zilizopatikana",
    fundingGoal: "Lengo la Fedha",
    sponsorBtn: "Fadhili Mradi huu",
    sponsorTitle: "Fadhili Mpango Huu Maalum",
    customAmount: "Au weka kiasi chako ($USD)",
    successSponsor: "Asante kwa kufadhili mradi huu moja kwa moja!",
    backToProjects: "Rudi kwenye Miradi Yote",

    // Safe Schools View
    safeSchoolsTitle: "Sajili ya Msingi ya Shule Salama",
    safeSchoolsSub: "Dashibodi inayoingiliana inayoonyesha ukaguzi wa kikanda wa maji na usafi wa shule, na uwanja wetu wa uchunguzi wa moja kwa moja.",
    diagnosticTitle: "Kikokotoo cha Usalama wa WASH Shuleni",
    diagnosticSub: "Wasilisha au uiga matukio ya miundombinu ya shule za kikanda ili kukokotoa Alama ya Utii wa WASH (0-100%) na uisajili mara moja kwenye sajili yetu ya umma.",
    complianceReport: "Ripoti ya Utii wa WASH",
    registerAudit: "Sajili kwenye Hifadhidata ya Ukaguzi",
    schoolName: "Jina la Shule kwa Kumbukumbu",
    selectRegion: "Chagua Kitalu cha Mkoa",
    yearlyProgressTitle: "Maendeleo ya Kila Mwaka na Vipimo vya Usalama",
    yearlyProgressSub: "Viashiria vyetu vilivyothibitishwa vya kila mwaka vinaonyesha maboresho makubwa katika miundombinu ya usafi, inayohusiana moja kwa moja na viwango bora vya afya na uhifadhi wa wanafunzi.",

    // Donate View
    donationTitle: "Saidia Usafi wa Heshima",
    donationSub: "Chagua chaguo la ufadhili ili kujenga vituo vya kunawia mikono mara moja, kusambaza vifaa vya heshima vinavyoweza kutumika tena, au kufadhili visima virefu vya jua.",
    oneTime: "Mchango wa Mara Moja",
    monthly: "Msaada Endelevu wa Kila Mwezi",
    chooseAmount: "Chagua Kiwango cha Udhamini",
    secureDonation: "Wasilisha Mchango Salama",
    selectProjectToFund: "Chagua kuelekeza mchango wako (Chaguo)",
    allProjectsFund: "Mfuko Mkuu wa WASH na Usafi",
    successDonation: "Mchango umekamilika kikamilifu! Stakabadhi imetengenezwa.",

    // Contact View
    contactTitle: "Wasiliana Nasi",
    contactSub: "Je, una maswali kuhusu ukaguzi wetu wa shule, mitandao ya washirika, au bajeti ya mradi? Wasiliana na timu yetu ya usaidizi wa kikanda mara moja.",
    sendMessage: "Tuma Ujumbe",
    yourName: "Jina Lako Kamili",
    yourEmail: "Barua Pepe Yako",
    subject: "Mada",
    message: "Mwili wa Ujumbe",
    successMessage: "Ujumbe umetumwa! Timu yetu ya mawasiliano itakujibu hivi karibuni.",

    // Auth / Login / Signup
    signupTitle: "Jiunge na Mtandao Wetu wa Wanachama",
    signupSub: "Fungua akaunti ya mfadhili ili kufuatilia stakabadhi zako za michango, kuchunguza ripoti za kikanda za nyanjani, na kudhibiti michango ya kila mwezi.",
    loginTitle: "Ufikiaji wa Utawala",
    loginSub: "Ingia na kitambulisho chako cha kikanda ili kudhibiti rekodi za ukaguzi, kuidhinisha miradi, na kusasisha vipimo vya mashambani.",
    username: "Mtumiaji / Barua Pepe",
    password: "Nenosiri",
    submit: "Tuma",
    dontHaveAccount: "Huna akaunti ya mfadhili? Jisajili hapa",
    alreadyHaveAccount: "Tayari una akaunti ya mwanachama? Ingia hapa"
  },
  fr: {
    appName: "UMOJA",
    tagline: "FONDATION",
    donateNow: "Faire un don",
    home: "Accueil",
    aboutUs: "À propos",
    projects: "Projets",
    safeSchools: "Écoles Sûres",
    contact: "Contact",
    memberSignup: "S'inscrire",
    adminLogin: "Connexion",
    myProfile: "Mon Profil",
    logout: "Se déconnecter",

    // Home View
    heroTitle: "Assainissement Digne et Eau Propre Pour Chaque Élève",
    heroSub: "La Fondation Umoja agit localement en Afrique de l'Est et de l'Ouest pour construire des réseaux d'eau solaires, des latrines privées verrouillables et des ressources de gestion de l'hygiène menstruelle.",
    exploreProjects: "Explorer les Projets Actifs",
    viewAudits: "Espace d'Audit WASH",
    impactTitle: "Notre Empreinte Mesurable Sur Le Terrain",
    impactSub: "Pas d'estimations, pas de chiffres vagues. Télémétrie communautaire en temps réel issue des évaluations de terrain régionales.",
    activeCampaigns: "Campagnes Actives",
    donorImpact: "Contributions des Donateurs",
    schoolsAudited: "Écoles Auditées",
    boreholesDrilled: "Forages Réalisés",
    communityLed: "100% Géré par la Communauté",
    pillarsTitle: "Le Cadre Umoja",
    pillarsSub: "Notre méthodologie associe l'ingénierie rigoureuse, la collecte de données et des ateliers locaux pour une viabilité sur plusieurs décennies.",

    // About View
    aboutTitle: "Nous Sommes la Fondation Umoja",
    aboutSub: "Unir les ressources mondiales au leadership local pour construire des réseaux d'eau scolaires résilients et restaurer la dignité des élèves.",
    missionTitle: "Notre Mission Principale",
    missionDesc: "Nous croyons que l'accès à l'eau potable, à des toilettes privées verrouillables et à des produits d'hygiène menstruelle fiables ne sont pas des luxes. Ce sont des droits fondamentaux qui maintiennent les filles à l'école, améliorent la santé générale et posent les bases d'une prospérité économique durable pour toute la communauté.",
    teamTitle: "Rencontrez Notre Équipe de Direction",
    teamSub: "Dirigée par des humanitaires passionnés, des ingénieurs en structure et des éducateurs en santé publique travaillant directement sur site.",

    // Projects View
    projectsTitle: "Nos Projets Actifs et Réalisés",
    projectsSub: "Parrainez directement des forages communautaires, des complexes d'éco-assainissement ou des programmes d'éducation sanitaire.",
    fundingRaised: "Fonds Collectés",
    fundingGoal: "Objectif de Financement",
    sponsorBtn: "Soutenir ce Projet",
    sponsorTitle: "Soutenir cette Initiative Spécifique",
    customAmount: "Ou entrez un montant personnalisé ($USD)",
    successSponsor: "Merci de parrainer ce projet directement !",
    backToProjects: "Retour à tous les projets",

    // Safe Schools View
    safeSchoolsTitle: "Registre de Référence des Écoles Sûres",
    safeSchoolsSub: "Tableau de bord interactif affichant les audits régionaux d'eau et d'assainissement scolaires, et notre simulateur de diagnostic en direct.",
    diagnosticTitle: "Calculateur de Sécurité WASH Scolaire",
    diagnosticSub: "Simulez des scénarios d'infrastructures scolaires régionales pour calculer leur score de conformité WASH (0-100%) et les enregistrer instantanément dans notre registre public.",
    complianceReport: "Rapport de Conformité WASH",
    registerAudit: "Enregistrer dans la Base d'Audits",
    schoolName: "Nom de l'école pour le registre",
    selectRegion: "Sélectionner la Région",
    yearlyProgressTitle: "Progrès Annuels et Mesures de Sécurité",
    yearlyProgressSub: "Nos indicateurs annuels vérifiés montrent des améliorations significatives dans les infrastructures d'assainissement, directement corrélées à de meilleurs standards de santé et à la rétention des élèves.",

    // Donate View
    donationTitle: "Soutenir un Assainissement Digne",
    donationSub: "Choisissez une option de financement pour construire instantanément des stations de lavage des mains, fournir des kits de dignité réutilisables ou co-parrainer des forages solaires profonds.",
    oneTime: "Don Unique",
    monthly: "Soutien Mensuel Durable",
    chooseAmount: "Choisir le Niveau de Parrainage",
    secureDonation: "Soumettre un Don Sécurisé",
    selectProjectToFund: "Orienter éventuellement votre don",
    allProjectsFund: "Fonds Général WASH & Hygiène",
    successDonation: "Don traité avec succès ! Reçu généré.",

    // Contact View
    contactTitle: "Entrer en Contact Avec Nous",
    contactSub: "Vous avez des questions sur nos audits scolaires, nos réseaux partenaires ou les budgets de projet ? Contactez instantanément notre équipe d'assistance régionale.",
    sendMessage: "Envoyer le Message",
    yourName: "Votre Nom Complet",
    yourEmail: "Votre Adresse Email",
    subject: "Sujet du Message",
    message: "Corps du Message",
    successMessage: "Message envoyé ! Notre équipe de communication vous répondra sous peu.",

    // Auth / Login / Signup
    signupTitle: "Rejoindre Notre Réseau de Soutiens",
    signupSub: "Créez un compte de donateur pour suivre vos reçus de dons, explorer les rapports de terrain locaux et gérer vos contributions mensuelles.",
    loginTitle: "Accès Administratif",
    loginSub: "Connectez-vous avec vos identifiants régionaux pour gérer les dossiers d'audit de référence, approuver les projets et mettre à jour la télémétrie.",
    username: "Utilisateur / Adresse Email",
    password: "Mot de Passe",
    submit: "Soumettre",
    dontHaveAccount: "Vous n'avez pas de compte de soutien ? Inscrivez-vous ici",
    alreadyHaveAccount: "Vous avez déjà un compte ? Connectez-vous ici"
  }
};
