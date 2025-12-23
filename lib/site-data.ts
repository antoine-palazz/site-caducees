// =============================================================================
// SITE DATA CONFIGURATION
// =============================================================================
// This file contains all dynamic content for the website.
//
// CMS INTEGRATION GUIDE:
// To integrate with a CMS (e.g., Sanity, Contentful, Strapi), replace each
// export with an async function that fetches from your CMS API.
//
// Example with Sanity:
// export async function getEvents() {
//   return await sanityClient.fetch(`*[_type == "event"] | order(date desc)`)
// }
//
// Example with Supabase:
// export async function getTeamMembers() {
//   const { data } = await supabase.from('team_members').select('*')
//   return data
// }
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

export type { AboutContent, Event, NavigationItem, Partner, Pole, SiteConfig, Stat, TeamMember, Value } from "./content/types"

// -----------------------------------------------------------------------------
// SITE CONFIGURATION
// -----------------------------------------------------------------------------

export const siteConfig: SiteConfig = {
  name: "Les Caducées",
  tagline: "Association étudiante du MSc Management Pharmaceutique et des Biotechnologies — ESCP Business School",
  description:
    "Association des étudiants du MSc Management Pharmaceutique et des Biotechnologies de l’ESCP Business School (Paris) : événements, partenariats et actions de santé publique.",
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
  eyebrow: "À propos",
  title: "Notre mission",
  description:
    "Les Caducées est l’association des étudiants du MSc Management Pharmaceutique et des Biotechnologies de l’ESCP Business School. Notre mission : créer du lien entre étudiants, alumni et professionnels à travers des événements phares, des partenariats et des initiatives de santé publique.",
}

// -----------------------------------------------------------------------------
// PÔLES
// -----------------------------------------------------------------------------

export const poles: Pole[] = [
  {
    id: "bureau-restreint",
    name: "Bureau Restreint",
    description: "Pilote l’association, coordonne les pôles et assure la gouvernance au quotidien.",
    image: "/poles/bureau_restreint.jpg",
    icon: "shield",
  },
  {
    id: "communication",
    name: "Communication",
    description: "Déploie l’identité de marque et la stratégie de contenus (réseaux sociaux, supports, site).",
    image: "/poles/communication.jpg",
    icon: "megaphone",
  },
  {
    id: "partenariats",
    name: "Partenariats",
    description: "Développe les relations avec l’écosystème santé et sécurise les ressources pour nos projets.",
    image: "/poles/partenariats.jpg",
    icon: "handshake",
  },
  {
    id: "alumni-cohesion",
    name: "Alumni & Cohésion",
    description: "Anime le réseau, crée du lien, et organise des temps forts pour la communauté.",
    image: "/poles/alumni_cohesion.jpg",
    icon: "users",
  },
  {
    id: "table-ronde",
    name: "Table Ronde",
    description: "Organise la conférence annuelle : programme, intervenants, logistique et expérience participants.",
    image: "/poles/table_ronde.jpg",
    icon: "mic",
  },
  {
    id: "nuit-des-caducees",
    name: "Nuit des Caducées",
    description: "Prépare le gala et la remise des prix : production, scénographie, invités et partenaires.",
    image: "/poles/nuit_des_caducees.jpg",
    icon: "sparkles",
  },
  {
    id: "sante-publique",
    name: "Santé Publique",
    description: "Porte les initiatives de prévention, sensibilisation et actions à impact en santé.",
    image: "/poles/sante_publique.jpg",
    icon: "heart-pulse",
  },
] as const

// -----------------------------------------------------------------------------
// NAVIGATION
// -----------------------------------------------------------------------------

export const navigationItems: NavigationItem[] = [
  { label: "Accueil", href: "#hero" },
  { label: "À Propos", href: "#about" },
  { label: "Événements", href: "#events" },
  { label: "Équipe", href: "#team" },
  { label: "Pôles", href: "#poles" },
  { label: "Partenaires", href: "#partners" },
  { label: "Contact", href: "#contact" },
]

// -----------------------------------------------------------------------------
// STATISTICS (About Section)
// -----------------------------------------------------------------------------

export const stats: Stat[] = [
  { value: 30, label: "ans d’existence", suffix: "+" },
  { value: 3, label: "événements phares", suffix: "" },
  { value: 300, label: "participants à la Nuit 2024", suffix: "+" },
  { value: 31, label: "projets en compétition (2024)", suffix: "" },
]

// -----------------------------------------------------------------------------
// VALUES (About Section)
// -----------------------------------------------------------------------------

export const values: Value[] = [
  {
    title: "Excellence",
    description:
      "Nous visons l'excellence dans chaque initiative, combinant rigueur scientifique et vision entrepreneuriale.",
    icon: "trophy",
  },
  {
    title: "Innovation",
    description:
      "Nous repoussons les limites du possible en créant des ponts entre pharmacologie et monde des affaires.",
    icon: "lightbulb",
  },
  {
    title: "Communauté",
    description: "Nous cultivons un réseau solide d'étudiants et de professionnels partageant la même passion.",
    icon: "users",
  },
  {
    title: "Impact",
    description: "Nous agissons pour créer un impact positif sur la santé et l'économie de demain.",
    icon: "target",
  },
]

// -----------------------------------------------------------------------------
// EVENTS
// -----------------------------------------------------------------------------

export const events: Event[] = [
  {
    id: "1",
    title: "35e Table Ronde — « Net‑Zero dans la santé »",
    date: "2025-02-04",
    location: "Future4Care (Paris)",
    description:
      "Conférence interactive réunissant experts et professionnels pour débattre des enjeux de transformation et de soutenabilité dans le secteur de la santé.",
    image: "/demo/pharmaceutical-conference-business-professionals.jpg",
    category: "Table Ronde",
    status: "past",
  },
  {
    id: "2",
    title: "Soirée de Charité — soutien à une cause de santé",
    date: "2025-03-18",
    location: "ESCP Business School — Campus Montparnasse (Paris)",
    description:
      "Une soirée solidaire organisée pour mobiliser la communauté autour d’une cause, en partenariat avec des acteurs engagés.",
    image: "/demo/elegant-gala-dinner-pharmaceutical-event.jpg",
    category: "Charité",
    status: "past",
  },
  {
    id: "3",
    title: "35e Nuit des Caducées — « Imaginer, soigner, innover »",
    date: "2025-05-14",
    location: "Pavillon d’Armenonville (Paris)",
    description:
      "La cérémonie phare des Caducées, qui met en lumière des projets et initiatives inspirantes au service de l’innovation en santé.",
    image: "/demo/elegant-gala-dinner-pharmaceutical-event.jpg",
    category: "Nuit des Caducées",
    status: "past",
  },
  {
    id: "4",
    title: "Nuit des Caducées — 34e édition (retour sur 2024)",
    date: "2024-05-30",
    location: "Pavillon Royal (Paris)",
    description:
      "Une édition placée sous le signe des innovations & technologies en santé, rassemblant étudiants, alumni, startups, agences et experts du secteur.",
    image: "/demo/pharmaceutical-conference-business-professionals.jpg",
    category: "Temps fort",
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
    role: "Présidente",
    bio: "Porte la vision de l’association et coordonne l’ensemble des pôles (événements, partenariats, communication).",
    image: "/demo/professional-woman-portrait-event-planner.jpg",
    linkedin: "https://www.linkedin.com/in/léna-palazzolo/",
  },
  {
    id: "2",
    name: "Mikael Ziade",
    role: "Vice-Président",
    bio: "Accompagne la présidence et contribue au pilotage des projets transverses et des relations externes.",
    image: "/demo/professional-young-man-portrait-business-suit.jpg",
    linkedin: "https://www.linkedin.com/in/mikaelziade/",
  },
  {
    id: "3",
    name: "Léa Fritsch",
    role: "Manager",
    bio: "Assure l’exécution opérationnelle, la coordination du planning et le suivi des actions des pôles.",
    image: "/demo/professional-young-woman-portrait-business.jpg",
    linkedin: "https://www.linkedin.com/in/l%C3%A9a-fritsch-7803bb219/",
  },
  {
    id: "4",
    name: "Dorian Blintz",
    role: "Trésorier",
    bio: "Gère le budget, les engagements et le suivi financier des événements et partenariats.",
    image: "/demo/professional-man-portrait-business-development.jpg",
    linkedin: "https://www.linkedin.com/in/dorian-blintz-b4844b242/",
  },
  {
    id: "5",
    name: "Lou‑Anne Schwartz",
    role: "Vice‑Trésorière",
    bio: "Soutient la trésorerie et le suivi administratif, en particulier sur la logistique des événements.",
    image: "/demo/professional-woman-portrait-finance.jpg",
    linkedin: "https://www.linkedin.com/in/lou-anne-schwartz/",
  },
  {
    id: "6",
    name: "Syrine Lazrak",
    role: "Secrétaire",
    bio: "Assure le suivi administratif et la coordination documentaire (réunions, comptes rendus, formalités).",
    image: "/demo/creative-young-man-portrait-marketing.jpg",
    linkedin: "https://www.linkedin.com/in/syrine-lazrak-4009b1334/",
  },
  {
    id: "7",
    name: "Prénom Nom",
    role: "Pôle Partenariats",
    bio: "Développe les relations partenaires et coordonne les collaborations qui rendent possibles nos événements.",
    image: "/placeholders/placeholder-user.jpg",
    linkedin: "https://www.linkedin.com/in/prenom-nom/",
  },
  {
    id: "8",
    name: "Prénom Nom",
    role: "Pôle Santé Publique",
    bio: "Conçoit et anime des actions de sensibilisation sur le campus et au-delà (prévention, information, engagement).",
    image: "/placeholders/placeholder-user.jpg",
    linkedin: "https://www.linkedin.com/in/prenom-nom/",
  },
  {
    id: "9",
    name: "Prénom Nom",
    role: "Pôle Communication",
    bio: "Assure la stratégie de communication et la mise en valeur des projets sur les réseaux et supports éditoriaux.",
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
  { name: "Partenaire — Industrie", logo: "/demo/pharmaceutical-company-logo-modern.jpg" },
  { name: "Partenaire — Tech santé", logo: "/demo/medical-tech-logo.png" },
  { name: "Partenaire — Biotech", logo: "/demo/biotech-startup-logo-modern.jpg" },
  { name: "Partenaire — Laboratoire", logo: "/demo/science-laboratory-logo-modern.jpg" },
]
