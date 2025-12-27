import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-url"
import { locales } from "@/lib/i18n/config"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", changeFrequency: "monthly" as const, priority: 1 },
    { path: "/mentions-legales", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/politique-de-confidentialite", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/statuts", changeFrequency: "yearly" as const, priority: 0.2 },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const page of pages) {
      sitemapEntries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}${page.path}`])
          ),
        },
      })
    }
  }

  return sitemapEntries
}
