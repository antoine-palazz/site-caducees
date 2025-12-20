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
  logo: "/icon.svg",
  // Replace with the official full group picture once added to /public
  // Suggested filename: /public/group-photo.jpg
  groupPhoto: "/placeholder.jpg",
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
    id: "partenariats",
    name: "Partenariats",
    description: "Développe les relations avec les acteurs de l’écosystème santé et finance les événements.",
    image: "/professional-man-portrait-business-development.jpg",
  },
  {
    id: "annonceurs",
    name: "Annonceurs",
    description: "Coordonne les partenariats annonceurs et assure la visibilité des marques sur nos supports.",
    image: "/professional-woman-portrait-finance.jpg",
  },
  {
    id: "sante-publique",
    name: "Santé Publique",
    description: "Porte les initiatives de prévention, sensibilisation et actions à impact en santé.",
    image: "/health-innovation-workshop-students.jpg",
  },
  {
    id: "alumni-cohesion",
    name: "Alumni & Cohésion",
    description: "Anime le réseau, crée du lien, et organise des temps forts pour la communauté.",
    image: "/creative-young-man-portrait-marketing.jpg",
  },
  {
    id: "table-ronde",
    name: "Table Ronde",
    description: "Organise la conférence annuelle : programme, intervenants, logistique et expérience participants.",
    image: "/pharmaceutical-conference-business-professionals.jpg",
  },
  {
    id: "nuit-des-caducees",
    name: "Nuit des Caducées",
    description: "Prépare le gala et la remise des prix : production, scénographie, invités et partenaires.",
    image: "/elegant-gala-dinner-pharmaceutical-event.jpg",
  },
  {
    id: "communication",
    name: "Communication",
    description: "Déploie l’identité de marque et la stratégie de contenus (réseaux sociaux, supports, site).",
    image: "/professional-young-woman-portrait-business.jpg",
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
    image: "/pharmaceutical-conference-business-professionals.jpg",
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
    image: "/elegant-gala-dinner-pharmaceutical-event.jpg",
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
    image: "/elegant-gala-dinner-pharmaceutical-event.jpg",
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
    image: "/pharmaceutical-conference-business-professionals.jpg",
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
    image: "/professional-woman-portrait-event-planner.jpg",
  },
  {
    id: "2",
    name: "Mikael Ziade",
    role: "Vice-Président",
    bio: "Accompagne la présidence et contribue au pilotage des projets transverses et des relations externes.",
    image: "/professional-young-man-portrait-business-suit.jpg",
  },
  {
    id: "3",
    name: "Léa Fritsch",
    role: "Manager",
    bio: "Assure l’exécution opérationnelle, la coordination du planning et le suivi des actions des pôles.",
    image: "/professional-young-woman-portrait-business.jpg",
  },
  {
    id: "4",
    name: "Dorian Blintz",
    role: "Trésorier",
    bio: "Gère le budget, les engagements et le suivi financier des événements et partenariats.",
    image: "/professional-man-portrait-business-development.jpg",
  },
  {
    id: "5",
    name: "Lou‑Anne Schwartz",
    role: "Vice‑Trésorière",
    bio: "Soutient la trésorerie et le suivi administratif, en particulier sur la logistique des événements.",
    image: "/professional-woman-portrait-finance.jpg",
  },
  {
    id: "6",
    name: "Syrine Lazrak",
    role: "Secrétaire",
    bio: "Assure le suivi administratif et la coordination documentaire (réunions, comptes rendus, formalités).",
    image: "/creative-young-man-portrait-marketing.jpg",
  },
  {
    id: "7",
    name: "Prénom Nom",
    role: "Pôle Partenariats",
    bio: "Développe les relations partenaires et coordonne les collaborations qui rendent possibles nos événements.",
    image: "/placeholder-user.jpg",
  },
  {
    id: "8",
    name: "Prénom Nom",
    role: "Pôle Santé Publique",
    bio: "Conçoit et anime des actions de sensibilisation sur le campus et au-delà (prévention, information, engagement).",
    image: "/placeholder-user.jpg",
  },
  {
    id: "9",
    name: "Prénom Nom",
    role: "Pôle Communication",
    bio: "Assure la stratégie de communication et la mise en valeur des projets sur les réseaux et supports éditoriaux.",
    image: "/placeholder-user.jpg",
  },
]

// -----------------------------------------------------------------------------
// PARTNERS
// -----------------------------------------------------------------------------

export const partners: Partner[] = [
  { name: "ESCP Business School", logo: "/placeholder-logo.svg", href: "https://escp.eu" },
  { name: "Future4Care", logo: "/healthcare-company-logo-professional.jpg" },
  { name: "Partenaire — Industrie", logo: "/pharmaceutical-company-logo-modern.jpg" },
  { name: "Partenaire — Tech santé", logo: "/medical-tech-logo.png" },
  { name: "Partenaire — Biotech", logo: "/biotech-startup-logo-modern.jpg" },
  { name: "Partenaire — Laboratoire", logo: "/science-laboratory-logo-modern.jpg" },
]
