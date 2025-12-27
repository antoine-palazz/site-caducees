import "server-only"

import { getSiteDataForLocale } from "@/lib/site-data"
import type { AboutContent, Event, NavigationItem, Partner, Pole, SiteConfig, Stat, TeamMember, Value } from "@/lib/content/types"
import type { Locale } from "@/lib/i18n/config"
import { strapiFetch } from "@/lib/cms/strapi/client"
import { mapStrapiMediaUrl } from "@/lib/cms/strapi/mappers"
import { strapiPagination } from "@/lib/cms/strapi/queries"

export interface BrandAssets {
  logo: string
  groupPhoto: string
}

export interface HomePageContent {
  siteConfig: SiteConfig
  brandAssets: BrandAssets
  navigationItems: NavigationItem[]
  aboutContent: AboutContent
  stats: Stat[]
  values: Value[]
  events: Event[]
  teamMembers: TeamMember[]
  poles: Pole[]
  partners: Partner[]
}

function getStaticHomePageContent(locale: Locale): HomePageContent {
  const data = getSiteDataForLocale(locale)
  return {
    siteConfig: data.siteConfig,
    brandAssets: data.brandAssets,
    navigationItems: data.navigationItems,
    aboutContent: data.aboutContent,
    stats: data.stats,
    values: data.values,
    events: data.events,
    teamMembers: data.teamMembers,
    poles: data.poles,
    partners: data.partners,
  }
}

/**
 * Fetch homepage content from Strapi when configured.
 *
 * This expects Strapi content-types aligned with your existing `lib/site-data.ts` shapes.
 * If Strapi isn't configured yet (or the schema is incomplete), we fall back to static content.
 */
export async function getHomePageContent(locale: Locale = "fr"): Promise<HomePageContent> {
  const staticData = getStaticHomePageContent(locale)

  if (!process.env.STRAPI_URL) {
    return staticData
  }

  try {
    const revalidate = (() => {
      const raw = process.env.STRAPI_REVALIDATE_SECONDS
      if (!raw) return 300
      const n = Number.parseInt(raw, 10)
      return Number.isFinite(n) && n >= 0 ? n : 300
    })()

    // Add locale to all Strapi queries
    const localeQuery = { locale }

    const [site, nav, homepage, ev, team, pl, part] = await Promise.all([
      strapiFetch<any>("/api/site-config", { 
        tags: ["tag:siteConfig"], 
        revalidate,
        query: localeQuery,
      }),
      strapiFetch<any>("/api/navigation", { 
        tags: ["tag:navigation"], 
        revalidate,
        query: localeQuery,
      }),
      strapiFetch<any>("/api/homepage", {
        tags: ["tag:home"],
        revalidate,
        query: {
          ...localeQuery,
          // Ensure media in nested component is populated (Strapi REST).
          "populate[brandAssets][populate][logo]": "*",
          "populate[brandAssets][populate][groupPhoto]": "*",
        },
      }),
      strapiFetch<any>("/api/events", {
        tags: ["tag:events"],
        revalidate,
        query: {
          ...localeQuery,
          ...strapiPagination(1, 100),
          "populate[image]": "*",
          "sort[0]": "date:desc",
        },
      }),
      strapiFetch<any>("/api/team-members", {
        tags: ["tag:team"],
        revalidate,
        query: {
          ...localeQuery,
          ...strapiPagination(1, 100),
          "populate[image]": "*",
          "sort[0]": "order:asc",
          "sort[1]": "name:asc",
        },
      }),
      strapiFetch<any>("/api/poles", {
        tags: ["tag:poles"],
        revalidate,
        query: {
          ...localeQuery,
          ...strapiPagination(1, 100),
          "populate[image]": "*",
          "sort[0]": "order:asc",
          "sort[1]": "name:asc",
        },
      }),
      strapiFetch<any>("/api/partners", {
        tags: ["tag:partners"],
        revalidate,
        query: {
          ...localeQuery,
          ...strapiPagination(1, 100),
          "populate[logo]": "*",
          "sort[0]": "order:asc",
          "sort[1]": "name:asc",
        },
      }),
    ])

    const fallbackToStatic = process.env.CMS_FALLBACK_TO_STATIC === "true" || process.env.NODE_ENV !== "production"

    if (!site?.data || !nav?.data || !homepage?.data) {
      if (fallbackToStatic) return staticData
      throw new Error("Strapi returned empty payload for one or more single-types (site-config/navigation/homepage).")
    }

    const unwrap = <T,>(x: any): T => (x?.attributes ?? x) as T

    const ensureString = (value: unknown, name: string): string => {
      if (typeof value === "string" && value.trim().length > 0) return value
      throw new Error(`Missing required string field: ${name}`)
    }

    const ensureNumber = (value: unknown, name: string): number => {
      if (typeof value === "number" && Number.isFinite(value)) return value
      // Strapi can serialize integers as numbers; still guard.
      throw new Error(`Missing required number field: ${name}`)
    }

    const ensureIcon = (value: unknown): Value["icon"] => {
      if (value === "trophy" || value === "lightbulb" || value === "users" || value === "target") return value
      throw new Error(`Invalid value.icon: ${String(value)}`)
    }

    const siteAttrs = unwrap<any>(site.data)
    const navAttrs = unwrap<any>(nav.data)
    const hpAttrs = unwrap<any>(homepage.data)

    const mappedBrandAssets: BrandAssets = {
      // Allow Strapi to omit media during initial setup; fall back to static site assets.
      logo: mapStrapiMediaUrl(hpAttrs.brandAssets?.logo) ?? staticData.brandAssets.logo,
      groupPhoto: mapStrapiMediaUrl(hpAttrs.brandAssets?.groupPhoto) ?? staticData.brandAssets.groupPhoto,
    }

    const mappedSiteConfig: SiteConfig = {
      name: ensureString(siteAttrs.name, "siteConfig.name"),
      tagline: ensureString(siteAttrs.tagline, "siteConfig.tagline"),
      description: ensureString(siteAttrs.description, "siteConfig.description"),
      contact: {
        email: ensureString(siteAttrs.contact?.email, "siteConfig.contact.email"),
        address: typeof siteAttrs.contact?.address === "string" ? siteAttrs.contact.address : undefined,
        phone: typeof siteAttrs.contact?.phone === "string" ? siteAttrs.contact.phone : undefined,
      },
      social: {
        instagram: typeof siteAttrs.social?.instagram === "string" ? siteAttrs.social.instagram : undefined,
        linkedin: typeof siteAttrs.social?.linkedin === "string" ? siteAttrs.social.linkedin : undefined,
        twitter: typeof siteAttrs.social?.twitter === "string" ? siteAttrs.social.twitter : undefined,
      },
    }

    const mappedNavigation: NavigationItem[] = Array.isArray(navAttrs.items)
      ? navAttrs.items.map((it: any): NavigationItem => ({
          label: ensureString(it?.label, "navigation.items[].label"),
          href: ensureString(it?.href, "navigation.items[].href"),
        }))
      : []

    const mappedAbout: AboutContent = {
      eyebrow: ensureString(hpAttrs.aboutContent?.eyebrow, "homepage.aboutContent.eyebrow"),
      title: ensureString(hpAttrs.aboutContent?.title, "homepage.aboutContent.title"),
      description: ensureString(hpAttrs.aboutContent?.description, "homepage.aboutContent.description"),
    }

    const mappedStats: Stat[] = Array.isArray(hpAttrs.stats)
      ? hpAttrs.stats.map((s: any): Stat => ({
          value: ensureNumber(s?.value, "homepage.stats[].value"),
          label: ensureString(s?.label, "homepage.stats[].label"),
          suffix: ensureString(s?.suffix, "homepage.stats[].suffix"),
        }))
      : []

    const mappedValues: Value[] = Array.isArray(hpAttrs.values)
      ? hpAttrs.values.map((v: any): Value => ({
          title: ensureString(v?.title, "homepage.values[].title"),
          description: ensureString(v?.description, "homepage.values[].description"),
          icon: ensureIcon(v?.icon),
        }))
      : []

    const mappedEvents: Event[] = Array.isArray(ev?.data)
      ? ev.data.map((row: any): Event => {
          const attrs = unwrap<any>(row)
          return {
            id: String(row?.id ?? attrs.externalId ?? attrs.title ?? ""),
            title: ensureString(attrs.title, "events[].title"),
            date: ensureString(attrs.date, "events[].date"),
            time: typeof attrs.time === "string" ? attrs.time : undefined,
            location: ensureString(attrs.location, "events[].location"),
            description: ensureString(attrs.description, "events[].description"),
            image: mapStrapiMediaUrl(attrs.image) ?? "/placeholders/placeholder.jpg",
            category: ensureString(attrs.category, "events[].category"),
            href: typeof attrs.href === "string" ? attrs.href : undefined,
            status: attrs.status === "upcoming" || attrs.status === "past" ? attrs.status : undefined,
          }
        })
      : []

    const mappedTeam: TeamMember[] = Array.isArray(team?.data)
      ? team.data.map((row: any): TeamMember => {
          const attrs = unwrap<any>(row)
          return {
            id: String(row?.id ?? attrs.externalId ?? attrs.name ?? ""),
            name: ensureString(attrs.name, "teamMembers[].name"),
            role: ensureString(attrs.role, "teamMembers[].role"),
            bio: ensureString(attrs.bio, "teamMembers[].bio"),
            image: mapStrapiMediaUrl(attrs.image) ?? "/placeholders/placeholder-user.jpg",
            linkedin: typeof attrs.linkedin === "string" ? attrs.linkedin : undefined,
          }
        })
      : []

    const mappedPoles: Pole[] = Array.isArray(pl?.data)
      ? pl.data.map((row: any): Pole => {
          const attrs = unwrap<any>(row)
          return {
            id: String(row?.id ?? attrs.externalId ?? attrs.name ?? ""),
            name: ensureString(attrs.name, "poles[].name"),
            description: ensureString(attrs.description, "poles[].description"),
            image: mapStrapiMediaUrl(attrs.image) ?? "/placeholders/placeholder.jpg",
          }
        })
      : []

    const mappedPartners: Partner[] = Array.isArray(part?.data)
      ? part.data.map((row: any): Partner => {
          const attrs = unwrap<any>(row)
          return {
            name: ensureString(attrs.name, "partners[].name"),
            logo: mapStrapiMediaUrl(attrs.logo) ?? "/placeholders/placeholder-logo.svg",
            href: typeof attrs.href === "string" ? attrs.href : undefined,
          }
        })
      : []

    return {
      siteConfig: mappedSiteConfig,
      brandAssets: mappedBrandAssets,
      navigationItems: mappedNavigation.length ? mappedNavigation : staticData.navigationItems,
      aboutContent: mappedAbout,
      stats: mappedStats.length ? mappedStats : staticData.stats,
      values: mappedValues.length ? mappedValues : staticData.values,
      events: mappedEvents.length ? mappedEvents : staticData.events,
      teamMembers: mappedTeam.length ? mappedTeam : staticData.teamMembers,
      poles: mappedPoles.length ? mappedPoles : staticData.poles,
      partners: mappedPartners.length ? mappedPartners : staticData.partners,
    }
  } catch (err) {
    if (process.env.CMS_FALLBACK_TO_STATIC === "true" || process.env.NODE_ENV !== "production") {
      return staticData
    }
    throw new Error("Failed to fetch/map homepage content from Strapi (and fallback is disabled).", { cause: err })
  }
}
