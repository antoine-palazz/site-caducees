export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "")

/**
 * Prefix a public asset path with `basePath` when deployed under a subpath (GitHub Pages).
 *
 * - Leaves absolute URLs untouched (http/https/data/blob).
 * - Leaves non-leading-slash paths untouched (caller should pass `/...` for public assets).
 */
export function withBasePath(src: string): string {
  if (!src) return src
  if (/^(https?:)?\/\//i.test(src)) return src
  if (/^(data:|blob:)/i.test(src)) return src
  if (!src.startsWith("/")) return src
  return `${BASE_PATH}${src}`
}


