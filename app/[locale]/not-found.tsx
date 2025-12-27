"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { locales, defaultLocale, type Locale } from "@/lib/i18n/config"

// Inline translations for 404 page (can't use async dictionary in not-found)
const translations = {
  fr: {
    title: "Page non trouvée",
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    backToHome: "Retour à l'accueil",
  },
  en: {
    title: "Page not found",
    description: "The page you are looking for does not exist or has been moved.",
    backToHome: "Back to home",
  },
}

// Locale-specific 404 page - uses the locale layout which provides html/body
export default function NotFound() {
  const pathname = usePathname()
  
  // Extract locale from pathname (e.g., /fr/some-page -> fr)
  const pathLocale = pathname.split("/")[1] as Locale
  const locale = locales.includes(pathLocale) ? pathLocale : defaultLocale
  const t = translations[locale]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-gold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">{t.title}</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        {t.description}
      </p>
      <Link
        href={`/${locale}`}
        className="inline-flex items-center px-6 py-3 bg-gold text-gold-foreground rounded-md font-medium hover:bg-gold/90 transition-colors"
      >
        {t.backToHome}
      </Link>
    </div>
  )
}
