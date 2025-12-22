import { draftMode } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

function isSafeReturnTo(path: string | null): path is string {
  return !!path && path.startsWith("/") && !path.startsWith("//")
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const returnTo = url.searchParams.get("returnTo")

  ;(await draftMode()).disable()

  const path = isSafeReturnTo(returnTo) ? returnTo : "/"
  return NextResponse.redirect(new URL(path, req.url))
}


