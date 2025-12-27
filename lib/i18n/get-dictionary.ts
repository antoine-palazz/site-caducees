import "server-only"
import type { Locale } from "./config"

// We use dynamic imports to only load the dictionary for the current locale
const dictionaries = {
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
}

export type Dictionary = Awaited<ReturnType<typeof dictionaries.fr>>

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}

