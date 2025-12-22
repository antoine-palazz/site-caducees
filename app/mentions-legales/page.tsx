import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getLegalMentions } from "@/lib/content/get-legal"

export const metadata: Metadata = {
  title: "Mentions légales | Les Caducées",
}

export default async function MentionsLegalesPage() {
  const content = await getLegalMentions()

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Retour à l’accueil
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
