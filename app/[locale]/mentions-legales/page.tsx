import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { getLegalMentions } from "@/lib/content/get-legal"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { isValidLocale, locales } from "@/lib/i18n/config"

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === "fr"
  return {
    title: isFr ? "Mentions légales | Les Caducées" : "Legal Mentions | Les Caducées",
  }
}

export default async function MentionsLegalesPage({ params }: Props) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const [content, dictionary] = await Promise.all([
    getLegalMentions(locale),
    getDictionary(locale),
  ])

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        {dictionary.legal.backToHome}
      </Link>
      <h1 className="text-3xl font-bold text-foreground mb-6">{content.title}</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed prose prose-sm max-w-none">
        {content.body.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </main>
  )
}
