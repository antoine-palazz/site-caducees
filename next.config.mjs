/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Production best practice:
   * - do NOT ignore TypeScript errors in CI/build
   * - keep Next.js image optimization enabled
   */
  images: (() => {
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

    return patterns.length ? { remotePatterns: patterns } : undefined
  })(),
}

export default nextConfig
