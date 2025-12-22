import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getLegalStatuts } from "@/lib/content/get-legal"

export const metadata: Metadata = {
  title: "Statuts | Les Caducées",
}

export default async function StatutsPage() {
  const content = await getLegalStatuts()

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
        {content.pdfUrl ? (
          <p>
            <a
              className="text-gold hover:underline"
              href={content.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Télécharger les statuts (PDF)
            </a>
          </p>
        ) : null}
        {content.body.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </main>
  )
}
