import "server-only"

import { strapiFetch } from "@/lib/cms/strapi/client"
import { strapiPopulateAll } from "@/lib/cms/strapi/queries"
import type { Locale } from "@/lib/i18n/config"

export interface LegalPageContent {
  title: string
  body: string
  // Optional link to a PDF (for statuts)
  pdfUrl?: string
}

const FALLBACK_MENTIONS_FR: LegalPageContent = {
  title: "Mentions légales",
  body: "Cette page est fournie à titre indicatif. Avant mise en production, renseignez les informations légales officielles (éditeur, hébergeur, responsable de publication, contact).\n\nContact : contact@lescaducees.fr",
}

const FALLBACK_MENTIONS_EN: LegalPageContent = {
  title: "Legal Mentions",
  body: "This page is provided for informational purposes. Before going to production, please fill in the official legal information (publisher, host, publication manager, contact).\n\nContact: contact@lescaducees.fr",
}

const FALLBACK_PRIVACY_FR: LegalPageContent = {
  title: "Politique de confidentialité",
  body: "Cette politique est un modèle. Avant mise en production, complétez-la en fonction de vos traitements (formulaire de contact, analytics, newsletter, inscriptions événements) et de votre base légale (RGPD).\n\nDonnées collectées (exemple) : nom, prénom, email, message lorsque vous nous contactez via le formulaire.\n\nPour toute question : contact@lescaducees.fr",
}

const FALLBACK_PRIVACY_EN: LegalPageContent = {
  title: "Privacy Policy",
  body: "This policy is a template. Before going to production, complete it according to your data processing (contact form, analytics, newsletter, event registrations) and your legal basis (GDPR).\n\nData collected (example): name, first name, email, message when you contact us via the form.\n\nFor any questions: contact@lescaducees.fr",
}

const FALLBACK_STATUTS_FR: LegalPageContent = {
  title: "Statuts de l'association",
  body: "Ajoutez ici un lien vers le document officiel (PDF) ou publiez le texte.\n\nSi vous avez un PDF, placez-le dans public/ et liez-le ici.",
}

const FALLBACK_STATUTS_EN: LegalPageContent = {
  title: "Association Statutes",
  body: "Add here a link to the official document (PDF) or publish the text.\n\nIf you have a PDF, place it in public/ and link it here.",
}

function getFallbackMentions(locale: Locale): LegalPageContent {
  return locale === "en" ? FALLBACK_MENTIONS_EN : FALLBACK_MENTIONS_FR
}

function getFallbackPrivacy(locale: Locale): LegalPageContent {
  return locale === "en" ? FALLBACK_PRIVACY_EN : FALLBACK_PRIVACY_FR
}

function getFallbackStatuts(locale: Locale): LegalPageContent {
  return locale === "en" ? FALLBACK_STATUTS_EN : FALLBACK_STATUTS_FR
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

export async function getLegalMentions(locale: Locale = "fr"): Promise<LegalPageContent> {
  const fallback = getFallbackMentions(locale)
  if (!process.env.STRAPI_URL) return fallback
  try {
    const x = await strapiFetch<any>("/api/legal-mention", { 
      query: { ...strapiPopulateAll(), locale }, 
      tags: ["tag:legal"] 
    })
    return mapLegalSingleton(x, fallback)
  } catch {
    return fallback
  }
}

export async function getLegalPrivacy(locale: Locale = "fr"): Promise<LegalPageContent> {
  const fallback = getFallbackPrivacy(locale)
  if (!process.env.STRAPI_URL) return fallback
  try {
    const x = await strapiFetch<any>("/api/legal-privacy", { 
      query: { ...strapiPopulateAll(), locale }, 
      tags: ["tag:legal"] 
    })
    return mapLegalSingleton(x, fallback)
  } catch {
    return fallback
  }
}

export async function getLegalStatuts(locale: Locale = "fr"): Promise<LegalPageContent> {
  const fallback = getFallbackStatuts(locale)
  if (!process.env.STRAPI_URL) return fallback
  try {
    const x = await strapiFetch<any>("/api/legal-statut", { 
      query: { ...strapiPopulateAll(), locale }, 
      tags: ["tag:legal"] 
    })
    return mapLegalSingleton(x, fallback)
  } catch {
    return fallback
  }
}
