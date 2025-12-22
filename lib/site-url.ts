function githubPagesSiteUrl(): string | undefined {
  if (process.env.GITHUB_PAGES !== "true") return undefined

  const owner = process.env.GITHUB_REPOSITORY_OWNER
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1]
  if (!owner || !repo) return undefined

  // User/Org pages: https://<owner>.github.io (repo is "<owner>.github.io")
  if (repo === `${owner}.github.io`) return `https://${repo}`

  // Project pages: https://<owner>.github.io/<repo>
  return `https://${owner}.github.io/${repo}`
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  githubPagesSiteUrl() ||
  "https://www.lescaducees.fr"


