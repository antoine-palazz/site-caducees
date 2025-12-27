// =============================================================================
// SITE DATA - Locale-aware wrapper
// =============================================================================
// This file provides locale-aware access to static site content.
// For direct imports (legacy), it defaults to French.
// =============================================================================

import type { Locale } from "./i18n/config"
import * as fr from "./site-data-fr"
import * as en from "./site-data-en"

// Re-export types for convenience
export type {
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

// Default exports (French) for backwards compatibility
export const siteConfig = fr.siteConfig
export const brandAssets = fr.brandAssets
export const aboutContent = fr.aboutContent
export const poles = fr.poles
export const navigationItems = fr.navigationItems
export const stats = fr.stats
export const values = fr.values
export const events = fr.events
export const teamMembers = fr.teamMembers
export const partners = fr.partners

// Locale-aware getters
export function getSiteDataForLocale(locale: Locale) {
  const data = locale === "en" ? en : fr
  return {
    siteConfig: data.siteConfig,
    brandAssets: data.brandAssets,
    aboutContent: data.aboutContent,
    poles: data.poles,
    navigationItems: data.navigationItems,
    stats: data.stats,
    values: data.values,
    events: data.events,
    teamMembers: data.teamMembers,
    partners: data.partners,
  }
}
