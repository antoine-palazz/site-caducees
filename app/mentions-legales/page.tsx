import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions légales | Les Caducées",
}

export default function MentionsLegalesPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-6">Mentions légales</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Cette page est fournie à titre indicatif. Avant mise en production, renseignez les informations légales
          officielles (éditeur, hébergeur, responsable de publication, contact).
        </p>
        <p>
          Contact : <a className="text-gold hover:underline" href="mailto:contact@lescaducees.fr">contact@lescaducees.fr</a>
        </p>
      </div>
    </main>
  )
}


