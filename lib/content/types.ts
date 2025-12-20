// Centralized content types for the site (shared by static data + CMS mapping)

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  contact: {
    email: string
    address?: string
    phone?: string
  }
  social: {
    instagram?: string
    linkedin?: string
    twitter?: string
  }
}

export interface NavigationItem {
  label: string
  href: string
}

export interface Stat {
  value: number
  label: string
  suffix: string
}

export interface AboutContent {
  eyebrow: string
  title: string
  description: string
}

export interface Value {
  title: string
  description: string
  icon: "trophy" | "lightbulb" | "users" | "target"
}

export interface Event {
  id: string
  title: string
  date: string // ISO date string
  time?: string
  location: string
  description: string
  image: string
  category: string
  href?: string
  status?: "upcoming" | "past"
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
}

export interface Partner {
  name: string
  logo: string
  href?: string
}

export interface Pole {
  id: string
  name: string
  description: string
  image: string
}


