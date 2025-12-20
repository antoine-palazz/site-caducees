import "server-only"

import { draftMode } from "next/headers"

type StrapiFetchOptions = {
  query?: Record<string, string | number | boolean | undefined>
  tags?: string[]
}

function getEnv(name: string): string | undefined {
  const v = process.env[name]
  return v && v.trim().length > 0 ? v : undefined
}

export function getStrapiBaseUrl(): string | undefined {
  return getEnv("STRAPI_URL")?.replace(/\/$/, "")
}

export function getStrapiApiToken(): string | undefined {
  return getEnv("STRAPI_API_TOKEN")
}

function withQuery(url: URL, query?: StrapiFetchOptions["query"]) {
  if (!query) return url
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) continue
    url.searchParams.set(key, String(value))
  }
  return url
}

async function fetchOnce<T>(apiPath: string, options: StrapiFetchOptions): Promise<T> {
  const base = getStrapiBaseUrl()
  if (!base) {
    throw new Error("STRAPI_URL is not set")
  }

  const url = withQuery(new URL(apiPath, base), options.query)
  const token = getStrapiApiToken()
  const isDraft = draftMode().isEnabled

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: isDraft ? "no-store" : "force-cache",
    next: options.tags?.length ? { tags: options.tags } : undefined,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    const msg = text ? text.slice(0, 600) : res.statusText
    throw new Error(`Strapi request failed (${res.status}) ${url.toString()} :: ${msg}`)
  }

  return (await res.json()) as T
}

/**
 * Server-only fetch wrapper for Strapi.
 *
 * Notes:
 * - Uses `draftMode()` to disable caching for previews.
 * - In preview mode, Strapi v4 commonly uses `publicationState=preview`,
 *   while Strapi v5 commonly uses `status=draft`. We attempt v4 first,
 *   then retry with v5 params if needed.
 */
export async function strapiFetch<T>(apiPath: string, options: StrapiFetchOptions = {}): Promise<T> {
  const isDraft = draftMode().isEnabled

  if (!isDraft) {
    return await fetchOnce<T>(apiPath, options)
  }

  // Try Strapi v4 preview semantics first.
  try {
    return await fetchOnce<T>(apiPath, {
      ...options,
      query: { ...options.query, publicationState: "preview" },
    })
  } catch (err) {
    // Retry with Strapi v5 draft semantics.
    return await fetchOnce<T>(apiPath, {
      ...options,
      query: { ...options.query, status: "draft" },
    })
  }
}


