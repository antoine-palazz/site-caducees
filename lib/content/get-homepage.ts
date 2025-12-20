import "server-only"

import { brandAssets, siteConfig, navigationItems, aboutContent, stats, values, events, teamMembers, poles, partners } from "@/lib/site-data"
import type { AboutContent, Event, NavigationItem, Partner, Pole, SiteConfig, Stat, TeamMember, Value } from "@/lib/content/types"
import { strapiFetch } from "@/lib/cms/strapi/client"
import { strapiPopulateAll } from "@/lib/cms/strapi/queries"

export type BrandAssets = typeof brandAssets

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
    // Recommended Strapi model:
    // - singleton: /api/homepage (contains about/stats/values + hero copy if you choose)
    // - singleton: /api/site-config
    // - singleton: /api/navigation
    // - collections: /api/events, /api/team-members, /api/poles, /api/partners
    //
    // For now we keep mapping minimal; if endpoints aren't present yet, fallback.
    const [site, nav, homepage, ev, team, pl, part] = await Promise.all([
      strapiFetch<any>("/api/site-config", { query: strapiPopulateAll(), tags: ["tag:siteConfig"] }),
      strapiFetch<any>("/api/navigation", { query: strapiPopulateAll(), tags: ["tag:navigation"] }),
      strapiFetch<any>("/api/homepage", { query: strapiPopulateAll(), tags: ["tag:home"] }),
      strapiFetch<any>("/api/events", { query: strapiPopulateAll(), tags: ["tag:events"] }),
      strapiFetch<any>("/api/team-members", { query: strapiPopulateAll(), tags: ["tag:team"] }),
      strapiFetch<any>("/api/poles", { query: strapiPopulateAll(), tags: ["tag:poles"] }),
      strapiFetch<any>("/api/partners", { query: strapiPopulateAll(), tags: ["tag:partners"] }),
    ])

    // Schema-mapping is implemented in a later step once the Strapi models exist.
    // Until then, keep this opt-in only by requiring a `data` payload.
    if (!site?.data || !nav?.data || !homepage?.data) {
      return getStaticHomePageContent()
    }

    // Temporary minimal mapping: if your Strapi entries match the same shape,
    // you can store them directly in Strapi and it will work without complex mapping.
    const siteConfigFromStrapi = (site.data.attributes ?? site.data) as SiteConfig
    const navigationItemsFromStrapi = ((nav.data.attributes ?? nav.data)?.items ?? []) as NavigationItem[]

    const hp = (homepage.data.attributes ?? homepage.data) as any

    return {
      siteConfig: siteConfigFromStrapi,
      brandAssets: hp.brandAssets ?? brandAssets,
      navigationItems: navigationItemsFromStrapi.length ? navigationItemsFromStrapi : navigationItems,
      aboutContent: (hp.aboutContent ?? aboutContent) as AboutContent,
      stats: (hp.stats ?? stats) as Stat[],
      values: (hp.values ?? values) as Value[],
      events: ((ev.data ?? []) as any[]).map((x) => (x.attributes ?? x)) as Event[],
      teamMembers: ((team.data ?? []) as any[]).map((x) => (x.attributes ?? x)) as TeamMember[],
      poles: ((pl.data ?? []) as any[]).map((x) => (x.attributes ?? x)) as Pole[],
      partners: ((part.data ?? []) as any[]).map((x) => (x.attributes ?? x)) as Partner[],
    }
  } catch {
    return getStaticHomePageContent()
  }
}


