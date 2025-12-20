export type StrapiQuery = Record<string, string | number | boolean | undefined>

/**
 * Minimal helper for common Strapi REST query patterns.
 * We keep this intentionally simple to avoid adding dependencies (e.g. qs).
 */
export function strapiPopulateAll(): StrapiQuery {
  return { populate: "*" }
}

export function strapiPagination(page: number, pageSize: number): StrapiQuery {
  return {
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
  }
}


