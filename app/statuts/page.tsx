import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Statuts | Les Caducées",
}

export default function StatutsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-6">Statuts de l’association</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Ajoutez ici un lien vers le document officiel (PDF) ou publiez le texte. Pour l’instant, cette page sert de
          placeholder “production-ready” pour éviter les liens morts dans le footer.
        </p>
        <p>
          Si vous avez un PDF, placez-le dans <code className="text-foreground">public/</code> et liez-le ici.
        </p>
        <p>
          Retour à l’<Link className="text-gold hover:underline" href="/">accueil</Link>.
        </p>
      </div>
    </main>
  )
}


