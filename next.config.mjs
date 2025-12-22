/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true"
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1]
const isUserOrOrgPages = !!repoName && !!process.env.GITHUB_REPOSITORY_OWNER && repoName === `${process.env.GITHUB_REPOSITORY_OWNER}.github.io`
const basePath = isGitHubPages && repoName && !isUserOrOrgPages ? `/${repoName}` : ""

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
