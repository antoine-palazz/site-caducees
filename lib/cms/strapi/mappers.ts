import "server-only"

import { getStrapiBaseUrl } from "./client"

export type StrapiMediaLike =
  | { url?: string | null }
  | { data?: { attributes?: { url?: string | null } | null } | null }
  | null
  | undefined

/**
 * Strapi often returns media URLs as relative paths like `/uploads/...`.
 * This helper makes them absolute (so `next/image` remotePatterns can match).
 */
export function mapStrapiMediaUrl(media: StrapiMediaLike): string | undefined {
  const base = getStrapiBaseUrl()

  const raw =
    (media as any)?.url ??
    (media as any)?.data?.attributes?.url ??
    undefined

  if (!raw || typeof raw !== "string") return undefined
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw
  if (!base) return raw
  return new URL(raw, base).toString()
}


