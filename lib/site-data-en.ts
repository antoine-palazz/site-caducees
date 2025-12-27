// =============================================================================
// ENGLISH SITE DATA
// =============================================================================

import type {
  AboutContent,
  Event,
  NavigationItem,
  Partner,
  Pole,
  SiteConfig,
  Stat,
  TeamMember,
  Value,
} from "./content/types"

// -----------------------------------------------------------------------------
// SITE CONFIGURATION
// -----------------------------------------------------------------------------

export const siteConfig: SiteConfig = {
  name: "Les Caducées",
  tagline: "Student association of the MSc Biopharmaceutical Management — ESCP Business School",
  description:
    "Student association of the MSc Biopharmaceutical Management at ESCP Business School (Paris): events, partnerships, and public health initiatives.",
  contact: {
    email: "contact@lescaducees.fr",
    address: "3, Rue Armand Moisant, 75015 Paris, France",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/les-caducees-escp/",
    instagram: "https://www.instagram.com/les_caducees_escp/",
  },
}

// -----------------------------------------------------------------------------
// BRAND ASSETS
// -----------------------------------------------------------------------------

export const brandAssets = {
  logo: "/logo.JPG",
  groupPhoto: "/full_group.jpg",
} as const

// -----------------------------------------------------------------------------
// ABOUT
// -----------------------------------------------------------------------------

export const aboutContent: AboutContent = {
  eyebrow: "About us",
  title: "Our mission",
  description:
    "Les Caducées is the student association of the MSc Biopharmaceutical Management at ESCP Business School. Our mission: to build connections between students, alumni, and professionals through flagship events, partnerships, and public health initiatives.",
}

// -----------------------------------------------------------------------------
// COMMITTEES (PÔLES)
// -----------------------------------------------------------------------------

export const poles: Pole[] = [
  {
    id: "bureau-restreint",
    name: "Executive Board",
    description: "Leads the association, coordinates all committees, and ensures day-to-day governance.",
    image: "/poles/bureau_restreint.jpg",
    icon: "shield",
  },
  {
    id: "communication",
    name: "Communication",
    description: "Deploys brand identity and content strategy (social media, materials, website).",
    image: "/poles/communication.jpg",
    icon: "megaphone",
  },
  {
    id: "partenariats",
    name: "Partnerships",
    description: "Develops relationships with the healthcare ecosystem and secures resources for our projects.",
    image: "/poles/partenariats.jpg",
    icon: "handshake",
  },
  {
    id: "alumni-cohesion",
    name: "Alumni & Cohesion",
    description: "Energizes the network, builds connections, and organizes community highlights.",
    image: "/poles/alumni_cohesion.jpg",
    icon: "users",
  },
  {
    id: "table-ronde",
    name: "Round Table",
    description: "Organizes the annual conference: program, speakers, logistics, and attendee experience.",
    image: "/poles/table_ronde.jpg",
    icon: "mic",
  },
  {
    id: "nuit-des-caducees",
    name: "Night of the Caducées",
    description: "Prepares the gala and award ceremony: production, staging, guests, and partners.",
    image: "/poles/nuit_des_caducees.jpg",
    icon: "sparkles",
  },
  {
    id: "sante-publique",
    name: "Public Health",
    description: "Leads prevention, awareness, and high-impact health initiatives.",
    image: "/poles/sante_publique.jpg",
    icon: "heart-pulse",
  },
]

// -----------------------------------------------------------------------------
// NAVIGATION
// -----------------------------------------------------------------------------

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Team", href: "#team" },
  { label: "Committees", href: "#poles" },
  { label: "Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
]

// -----------------------------------------------------------------------------
// STATISTICS (About Section)
// -----------------------------------------------------------------------------

export const stats: Stat[] = [
  { value: 30, label: "years of existence", suffix: "+" },
  { value: 3, label: "flagship events", suffix: "" },
  { value: 300, label: "attendees at the 2024 Gala", suffix: "+" },
  { value: 31, label: "projects in competition (2024)", suffix: "" },
]

// -----------------------------------------------------------------------------
// VALUES (About Section)
// -----------------------------------------------------------------------------

export const values: Value[] = [
  {
    title: "Excellence",
    description:
      "We strive for excellence in every initiative, combining scientific rigor with entrepreneurial vision.",
    icon: "trophy",
  },
  {
    title: "Innovation",
    description:
      "We push the boundaries of what's possible by building bridges between pharmacology and business.",
    icon: "lightbulb",
  },
  {
    title: "Community",
    description: "We nurture a strong network of students and professionals who share the same passion.",
    icon: "users",
  },
  {
    title: "Impact",
    description: "We act to create a positive impact on tomorrow's health and economy.",
    icon: "target",
  },
]

// -----------------------------------------------------------------------------
// EVENTS
// -----------------------------------------------------------------------------

export const events: Event[] = [
  {
    id: "1",
    title: "35th Round Table — 'Net-Zero in Healthcare'",
    date: "2025-02-04",
    location: "Future4Care (Paris)",
    description:
      "An interactive conference bringing together experts and professionals to discuss transformation and sustainability challenges in the healthcare sector.",
    image: "/demo/pharmaceutical-conference-business-professionals.jpg",
    category: "Round Table",
    status: "past",
  },
  {
    id: "2",
    title: "Charity Evening — supporting a health cause",
    date: "2025-03-18",
    location: "ESCP Business School — Montparnasse Campus (Paris)",
    description:
      "A solidarity evening organized to rally the community around a cause, in partnership with committed stakeholders.",
    image: "/demo/elegant-gala-dinner-pharmaceutical-event.jpg",
    category: "Charity",
    status: "past",
  },
  {
    id: "3",
    title: "35th Night of the Caducées — 'Imagine, Heal, Innovate'",
    date: "2025-05-14",
    location: "Pavillon d'Armenonville (Paris)",
    description:
      "The flagship ceremony of Les Caducées, showcasing inspiring projects and initiatives driving healthcare innovation.",
    image: "/demo/elegant-gala-dinner-pharmaceutical-event.jpg",
    category: "Night of the Caducées",
    status: "past",
  },
  {
    id: "4",
    title: "Night of the Caducées — 34th edition (2024 retrospective)",
    date: "2024-05-30",
    location: "Pavillon Royal (Paris)",
    description:
      "An edition focused on health innovations & technologies, bringing together students, alumni, startups, agencies, and industry experts.",
    image: "/demo/pharmaceutical-conference-business-professionals.jpg",
    category: "Highlight",
    status: "past",
  },
]

// -----------------------------------------------------------------------------
// TEAM MEMBERS
// -----------------------------------------------------------------------------

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Léna Palazzolo",
    role: "President",
    bio: "Carries the association's vision and coordinates all committees (events, partnerships, communication).",
    image: "/demo/professional-woman-portrait-event-planner.jpg",
    linkedin: "https://www.linkedin.com/in/léna-palazzolo/",
  },
  {
    id: "2",
    name: "Mikael Ziade",
    role: "Vice-President",
    bio: "Supports the presidency and contributes to cross-functional projects and external relations.",
    image: "/demo/professional-young-man-portrait-business-suit.jpg",
    linkedin: "https://www.linkedin.com/in/mikaelziade/",
  },
  {
    id: "3",
    name: "Léa Fritsch",
    role: "Manager",
    bio: "Ensures operational execution, schedule coordination, and monitoring of committee actions.",
    image: "/demo/professional-young-woman-portrait-business.jpg",
    linkedin: "https://www.linkedin.com/in/l%C3%A9a-fritsch-7803bb219/",
  },
  {
    id: "4",
    name: "Dorian Blintz",
    role: "Treasurer",
    bio: "Manages the budget, commitments, and financial tracking for events and partnerships.",
    image: "/demo/professional-man-portrait-business-development.jpg",
    linkedin: "https://www.linkedin.com/in/dorian-blintz-b4844b242/",
  },
  {
    id: "5",
    name: "Lou‑Anne Schwartz",
    role: "Vice-Treasurer",
    bio: "Supports the treasury and administrative tracking, especially for event logistics.",
    image: "/demo/professional-woman-portrait-finance.jpg",
    linkedin: "https://www.linkedin.com/in/lou-anne-schwartz/",
  },
  {
    id: "6",
    name: "Syrine Lazrak",
    role: "Secretary",
    bio: "Handles administrative tracking and document coordination (meetings, minutes, formalities).",
    image: "/demo/creative-young-man-portrait-marketing.jpg",
    linkedin: "https://www.linkedin.com/in/syrine-lazrak-4009b1334/",
  },
  {
    id: "7",
    name: "First Last",
    role: "Partnerships Committee",
    bio: "Develops partner relationships and coordinates collaborations that make our events possible.",
    image: "/placeholders/placeholder-user.jpg",
    linkedin: "https://www.linkedin.com/in/prenom-nom/",
  },
  {
    id: "8",
    name: "First Last",
    role: "Public Health Committee",
    bio: "Designs and leads awareness actions on campus and beyond (prevention, information, engagement).",
    image: "/placeholders/placeholder-user.jpg",
    linkedin: "https://www.linkedin.com/in/prenom-nom/",
  },
  {
    id: "9",
    name: "First Last",
    role: "Communication Committee",
    bio: "Manages communication strategy and promotes projects on social media and editorial materials.",
    image: "/placeholders/placeholder-user.jpg",
    linkedin: "https://www.linkedin.com/in/prenom-nom/",
  },
]

// -----------------------------------------------------------------------------
// PARTNERS
// -----------------------------------------------------------------------------

export const partners: Partner[] = [
  { name: "ESCP Business School", logo: "/placeholders/placeholder-logo.svg", href: "https://escp.eu" },
  { name: "Future4Care", logo: "/demo/healthcare-company-logo-professional.jpg" },
  { name: "Partner — Industry", logo: "/demo/pharmaceutical-company-logo-modern.jpg" },
  { name: "Partner — Health Tech", logo: "/demo/medical-tech-logo.png" },
  { name: "Partner — Biotech", logo: "/demo/biotech-startup-logo-modern.jpg" },
  { name: "Partner — Laboratory", logo: "/demo/science-laboratory-logo-modern.jpg" },
]

