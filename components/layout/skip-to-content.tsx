"use client"

import type { Dictionary } from "@/lib/i18n/get-dictionary"

interface SkipToContentProps {
  dictionary: Dictionary
}

export function SkipToContent({ dictionary }: SkipToContentProps) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:text-gold-foreground focus:px-4 focus:py-2 focus:rounded-md focus:font-medium"
    >
      {dictionary.skipToContent}
    </a>
  )
}
