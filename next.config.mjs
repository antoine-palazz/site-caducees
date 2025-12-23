/** @type {import('next').NextConfig} */
import path from "node:path"

const normalizeBasePath = (raw) => {
  if (!raw) return ""
  const trimmed = String(raw).trim()
  if (!trimmed || trimmed === "/") return ""
  return trimmed.startsWith("/") ? trimmed.replace(/\/$/, "") : `/${trimmed.replace(/\/$/, "")}`
}

// Allow explicit basePath for local builds, e.g. BASE_PATH="/my-repo"
const explicitBasePath = normalizeBasePath(process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH)

// GitHub Pages mode is enabled either via GITHUB_PAGES=true (workflow) or an explicit basePath (local build).
const isGitHubPages = process.env.GITHUB_PAGES === "true" || !!explicitBasePath

const repoNameFromEnv = process.env.GITHUB_REPOSITORY?.split("/")[1]
// If building locally for Pages with only GITHUB_PAGES=true, fall back to folder name.
const repoName = repoNameFromEnv || (isGitHubPages ? path.basename(process.cwd()) : undefined)

const owner = process.env.GITHUB_REPOSITORY_OWNER
const isUserOrOrgPages = !!repoName && !!owner && repoName === `${owner}.github.io`

const basePath = explicitBasePath || (isGitHubPages && repoName && !isUserOrOrgPages ? `/${repoName}` : "")

function getImagesConfig() {
  const patterns = []
  const raw = process.env.STRAPI_URL
  if (raw) {
    try {
      const u = new URL(raw)
      patterns.push({
        protocol: u.protocol.replace(":", ""),
        hostname: u.hostname,
        port: u.port || "",
        pathname: "/**",
      })
    } catch {
      // ignore invalid STRAPI_URL
    }
  }

  /** @type {import('next').NextConfig['images']} */
  const images = patterns.length ? { remotePatterns: patterns } : {}

  // GitHub Pages is static hosting: disable Next Image optimization.
  if (isGitHubPages) images.unoptimized = true

  return images
}

const nextConfig = {
  /**
   * Production best practice:
   * - do NOT ignore TypeScript errors in CI/build
   * - keep Next.js image optimization enabled (except for GitHub Pages)
   */
  images: getImagesConfig(),

  /**
   * Expose the computed basePath to client/server code so we can prefix public asset URLs
   * (GitHub Pages serves the site under `/<repo>/`, so `/demo/x.jpg` would 404 without this).
   */
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  ...(isGitHubPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
        assetPrefix: basePath ? `${basePath}/` : undefined,
      }
    : {}),
}

export default nextConfig
