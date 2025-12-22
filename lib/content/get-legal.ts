import "server-only"

import { strapiFetch } from "@/lib/cms/strapi/client"
import { strapiPopulateAll } from "@/lib/cms/strapi/queries"

export interface LegalPageContent {
  title: string
  body: string
  // Optional link to a PDF (for statuts)
  pdfUrl?: string
}

const FALLBACK_MENTIONS: LegalPageContent = {
  title: "Mentions légales",
  body: "Cette page est fournie à titre indicatif. Avant mise en production, renseignez les informations légales officielles (éditeur, hébergeur, responsable de publication, contact).\n\nContact : contact@lescaducees.fr",
}

const FALLBACK_PRIVACY: LegalPageContent = {
  title: "Politique de confidentialité",
  body: "Cette politique est un modèle. Avant mise en production, complétez-la en fonction de vos traitements (formulaire de contact, analytics, newsletter, inscriptions événements) et de votre base légale (RGPD).\n\nDonnées collectées (exemple) : nom, prénom, email, message lorsque vous nous contactez via le formulaire.\n\nPour toute question : contact@lescaducees.fr",
}

const FALLBACK_STATUTS: LegalPageContent = {
  title: "Statuts de l’association",
  body: "Ajoutez ici un lien vers le document officiel (PDF) ou publiez le texte.\n\nSi vous avez un PDF, placez-le dans public/ et liez-le ici.",
}

function mapLegalSingleton(x: any, fallback: LegalPageContent): LegalPageContent {
  const data = x?.data?.attributes ?? x?.data ?? null
  if (!data) return fallback
  return {
    title: data.title ?? fallback.title,
    body: data.body ?? data.content ?? fallback.body,
    pdfUrl: data.pdfUrl ?? data.pdf_url ?? undefined,
  }
}

export async function getLegalMentions(): Promise<LegalPageContent> {
  if (!process.env.STRAPI_URL) return FALLBACK_MENTIONS
  try {
    const x = await strapiFetch<any>("/api/legal-mention", { query: strapiPopulateAll(), tags: ["tag:legal"] })
    return mapLegalSingleton(x, FALLBACK_MENTIONS)
  } catch {
    return FALLBACK_MENTIONS
  }
}

export async function getLegalPrivacy(): Promise<LegalPageContent> {
  if (!process.env.STRAPI_URL) return FALLBACK_PRIVACY
  try {
    const x = await strapiFetch<any>("/api/legal-privacy", { query: strapiPopulateAll(), tags: ["tag:legal"] })
    return mapLegalSingleton(x, FALLBACK_PRIVACY)
  } catch {
    return FALLBACK_PRIVACY
  }
}

export async function getLegalStatuts(): Promise<LegalPageContent> {
  if (!process.env.STRAPI_URL) return FALLBACK_STATUTS
  try {
    const x = await strapiFetch<any>("/api/legal-statut", { query: strapiPopulateAll(), tags: ["tag:legal"] })
    return mapLegalSingleton(x, FALLBACK_STATUTS)
  } catch {
    return FALLBACK_STATUTS
  }
}


