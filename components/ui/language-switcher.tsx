"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { locales, type Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/get-dictionary"

interface LanguageSwitcherProps {
  locale: Locale
  dictionary: Dictionary
  className?: string
}

export function LanguageSwitcher({ locale, dictionary, className }: LanguageSwitcherProps) {
  const pathname = usePathname()

  // Get the path without the locale prefix
  const getPathWithoutLocale = () => {
    const segments = pathname.split("/")
    // Remove the locale segment (first segment after empty string from leading /)
    if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
      segments.splice(1, 1)
    }
    return segments.join("/") || "/"
  }

  const pathWithoutLocale = getPathWithoutLocale()

  return (
    <div 
      className={cn(
        "flex items-center border border-gold/30 rounded-md overflow-hidden text-xs font-medium",
        className
      )}
      role="group"
      aria-label={dictionary.languageSwitcher.label}
    >
      {locales.map((loc) => {
        const isActive = loc === locale
        const href = `/${loc}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`
        
        return (
          <Link
            key={loc}
            href={href}
            className={cn(
              "px-2.5 py-1.5 uppercase tracking-wide transition-colors",
              isActive
                ? "bg-gold text-gold-foreground"
                : "text-primary-foreground/70 hover:text-gold hover:bg-gold/10"
            )}
            aria-current={isActive ? "page" : undefined}
            lang={loc}
          >
            {loc}
          </Link>
        )
      })}
    </div>
  )
}
