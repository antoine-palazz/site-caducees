import "server-only"

import { brandAssets, siteConfig, navigationItems, aboutContent, stats, values, events, teamMembers, poles, partners } from "@/lib/site-data"
import type { AboutContent, Event, NavigationItem, Partner, Pole, SiteConfig, Stat, TeamMember, Value } from "@/lib/content/types"
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

function getStaticHomePageContent(): HomePageContent {
  return {
    siteConfig,
    brandAssets,
    navigationItems,
    aboutContent,
    stats,
    values,
    events,
    teamMembers,
    poles,
    partners,
  }
}

/**
 * Fetch homepage content from Strapi when configured.
 *
 * This expects Strapi content-types aligned with your existing `lib/site-data.ts` shapes.
 * If Strapi isn't configured yet (or the schema is incomplete), we fall back to static content.
 */
export async function getHomePageContent(): Promise<HomePageContent> {
  if (!process.env.STRAPI_URL) {
    return getStaticHomePageContent()
  }

  try {
    const revalidate = (() => {
      const raw = process.env.STRAPI_REVALIDATE_SECONDS
      if (!raw) return 300
      const n = Number.parseInt(raw, 10)
      return Number.isFinite(n) && n >= 0 ? n : 300
    })()

    const [site, nav, homepage, ev, team, pl, part] = await Promise.all([
      strapiFetch<any>("/api/site-config", { tags: ["tag:siteConfig"], revalidate }),
      strapiFetch<any>("/api/navigation", { tags: ["tag:navigation"], revalidate }),
      strapiFetch<any>("/api/homepage", {
        tags: ["tag:home"],
        revalidate,
        query: {
          // Ensure media in nested component is populated (Strapi REST).
          "populate[brandAssets][populate][logo]": "*",
          "populate[brandAssets][populate][groupPhoto]": "*",
        },
      }),
      strapiFetch<any>("/api/events", {
        tags: ["tag:events"],
        revalidate,
        query: {
          ...strapiPagination(1, 100),
          "populate[image]": "*",
          "sort[0]": "date:desc",
        },
      }),
      strapiFetch<any>("/api/team-members", {
        tags: ["tag:team"],
        revalidate,
        query: {
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
          ...strapiPagination(1, 100),
          "populate[logo]": "*",
          "sort[0]": "order:asc",
          "sort[1]": "name:asc",
        },
      }),
    ])

    const fallbackToStatic = process.env.CMS_FALLBACK_TO_STATIC === "true" || process.env.NODE_ENV !== "production"

    if (!site?.data || !nav?.data || !homepage?.data) {
      if (fallbackToStatic) return getStaticHomePageContent()
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
      logo: mapStrapiMediaUrl(hpAttrs.brandAssets?.logo) ?? brandAssets.logo,
      groupPhoto: mapStrapiMediaUrl(hpAttrs.brandAssets?.groupPhoto) ?? brandAssets.groupPhoto,
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
            image: mapStrapiMediaUrl(attrs.image) ?? "/placeholder.jpg",
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
            image: mapStrapiMediaUrl(attrs.image) ?? "/placeholder-user.jpg",
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
            image: mapStrapiMediaUrl(attrs.image) ?? "/placeholder.jpg",
          }
        })
      : []

    const mappedPartners: Partner[] = Array.isArray(part?.data)
      ? part.data.map((row: any): Partner => {
          const attrs = unwrap<any>(row)
          return {
            name: ensureString(attrs.name, "partners[].name"),
            logo: mapStrapiMediaUrl(attrs.logo) ?? "/placeholder-logo.svg",
            href: typeof attrs.href === "string" ? attrs.href : undefined,
          }
        })
      : []

    return {
      siteConfig: mappedSiteConfig,
      brandAssets: mappedBrandAssets,
      navigationItems: mappedNavigation.length ? mappedNavigation : navigationItems,
      aboutContent: mappedAbout,
      stats: mappedStats.length ? mappedStats : stats,
      values: mappedValues.length ? mappedValues : values,
      events: mappedEvents.length ? mappedEvents : events,
      teamMembers: mappedTeam.length ? mappedTeam : teamMembers,
      poles: mappedPoles.length ? mappedPoles : poles,
      partners: mappedPartners.length ? mappedPartners : partners,
    }
  } catch (err) {
    if (process.env.CMS_FALLBACK_TO_STATIC === "true" || process.env.NODE_ENV !== "production") {
      return getStaticHomePageContent()
    }
    throw new Error("Failed to fetch/map homepage content from Strapi (and fallback is disabled).", { cause: err })
  }
}


