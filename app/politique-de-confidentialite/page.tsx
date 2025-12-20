import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de confidentialité | Les Caducées",
}

export default function PolitiqueDeConfidentialitePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-6">Politique de confidentialité</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Cette politique est un modèle. Avant mise en production, complétez-la en fonction de vos traitements (formulaire
          de contact, analytics, newsletter, inscriptions événements) et de votre base légale (RGPD).
        </p>
        <p>
          Données collectées (exemple) : nom, prénom, email, message lorsque vous nous contactez via le formulaire.
        </p>
        <p>
          Pour toute question :{" "}
          <a className="text-gold hover:underline" href="mailto:contact@lescaducees.fr">
            contact@lescaducees.fr
          </a>
        </p>
      </div>
    </main>
  )
}


