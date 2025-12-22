import { NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

function getSecret(req: NextRequest): string | null {
  const url = new URL(req.url)
  return url.searchParams.get("secret") ?? req.headers.get("x-revalidate-secret")
}

function normalizeModelName(payload: any): string | undefined {
  return (
    payload?.model ??
    payload?.contentType ??
    payload?.content_type ??
    payload?.collection ??
    payload?.uid ??
    payload?.data?.model ??
    payload?.event?.model ??
    undefined
  )
}

function tagsForModel(model: string | undefined): string[] {
  const m = (model ?? "").toLowerCase()

  // Strapi can send UIDs like `api::event.event` or plain names like `event`.
  if (m.includes("site") || m.includes("site-config")) return ["tag:siteConfig"]
  if (m.includes("navigation")) return ["tag:navigation"]
  if (m.includes("home")) return ["tag:home"]
  if (m.includes("event")) return ["tag:events"]
  if (m.includes("team")) return ["tag:team"]
  if (m.includes("pole")) return ["tag:poles"]
  if (m.includes("partner")) return ["tag:partners"]
  if (m.includes("legal") || m.includes("mentions") || m.includes("privacy") || m.includes("statuts")) return ["tag:legal"]

  // Unknown model: revalidate all site content tags.
  return ["tag:siteConfig", "tag:navigation", "tag:home", "tag:events", "tag:team", "tag:poles", "tag:partners", "tag:legal"]
}

function pathsForTags(tags: string[]): string[] {
  const paths = new Set<string>()
  if (tags.includes("tag:home") || tags.includes("tag:siteConfig") || tags.includes("tag:navigation")) paths.add("/")
  if (tags.includes("tag:legal")) {
    paths.add("/mentions-legales")
    paths.add("/politique-de-confidentialite")
    paths.add("/statuts")
  }
  return [...paths]
}

export async function POST(req: NextRequest) {
  if (!process.env.STRAPI_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, error: "Missing STRAPI_WEBHOOK_SECRET" }, { status: 500 })
  }

  const secret = getSecret(req)
  if (secret !== process.env.STRAPI_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 })
  }

  let payload: any = null
  try {
    payload = await req.json()
  } catch {
    // some webhook providers can send empty body; still revalidate a safe set
    payload = {}
  }

  const model = normalizeModelName(payload)
  const tags = tagsForModel(model)
  const paths = pathsForTags(tags)

  for (const tag of tags) revalidateTag(tag, "default")
  for (const path of paths) revalidatePath(path)

  return NextResponse.json({ ok: true, model, tags, paths, now: Date.now() })
}


