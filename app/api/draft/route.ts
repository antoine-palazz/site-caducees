import { draftMode } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

function isSafeReturnTo(path: string | null): path is string {
  return !!path && path.startsWith("/") && !path.startsWith("//")
}

function resolvePreviewPath(type: string | null, slug: string | null): string {
  switch (type) {
    case "homepage":
      return "/"
    case "legalMentions":
      return "/mentions-legales"
    case "legalPrivacy":
      return "/politique-de-confidentialite"
    case "legalStatuts":
      return "/statuts"
    default:
      // For future dynamic routes, Strapi can send an explicit slug.
      if (slug && slug.startsWith("/")) return slug
      if (slug) return `/${slug}`
      return "/"
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const secret = url.searchParams.get("secret")
  const type = url.searchParams.get("type")
  const slug = url.searchParams.get("slug")
  const returnTo = url.searchParams.get("returnTo")

  if (!process.env.STRAPI_PREVIEW_SECRET) {
    return new NextResponse("Missing STRAPI_PREVIEW_SECRET", { status: 500 })
  }

  if (secret !== process.env.STRAPI_PREVIEW_SECRET) {
    return new NextResponse("Invalid preview secret", { status: 401 })
  }

  draftMode().enable()

  const path = isSafeReturnTo(returnTo) ? returnTo : resolvePreviewPath(type, slug)
  return NextResponse.redirect(new URL(path, req.url))
}


