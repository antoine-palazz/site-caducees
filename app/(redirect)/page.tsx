"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { defaultLocale } from "@/lib/i18n/config"

// Root page redirects to the default locale (client-side for static export compatibility)
export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace(`/${defaultLocale}`)
  }, [router])

  // Show nothing while redirecting
  return null
}

