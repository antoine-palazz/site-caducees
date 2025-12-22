# Les Caducées — Site

Site vitrine (Next.js App Router) pour l’association **Les Caducées** (ESCP Business School).

## Développement

```bash
pnpm install
pnpm dev
```

## Qualité

```bash
pnpm lint
pnpm build
```

## Contenu

Le contenu “éditorial” (texte, événements, équipe, partenaires, navigation) est centralisé dans `lib/site-data.ts`.

Pour une mise en production, l’étape suivante naturelle est de brancher un CMS (Sanity/Contentful/Strapi) ou une base
de données, en remplaçant ces exports statiques par des fonctions de fetch (voir commentaires dans le fichier).

## CMS (Strapi)

Le site peut charger le contenu depuis Strapi via `lib/content/get-homepage.ts` et `lib/content/get-legal.ts` (server-only).

### Content-types attendus (Strapi)

| Type | UID(s) |
| --- | --- |
| Single types | `site-config`, `navigation`, `homepage`, `legal-mention`, `legal-privacy`, `legal-statut` |
| Collection types | `events`, `team-members`, `poles`, `partners` |

Notes:

Les médias Strapi peuvent être absents au début (le site utilise des **placeholders**).

En production, gardez **`CMS_FALLBACK_TO_STATIC=false`** pour éviter tout “fallback silencieux”.

### Variables d’environnement

| Variable | Description |
| --- | --- |
| `STRAPI_URL` | URL de base de Strapi (inclure le protocole, sans slash final). Exemple : `https://cms.lescaducees.fr` |
| `STRAPI_API_TOKEN` | (Recommandé) API Token Strapi utilisé côté serveur (lecture). Alias supporté : `STRAPI_TOKEN` |
| `STRAPI_REVALIDATE_SECONDS` | (Optionnel) TTL ISR en secondes pour les GET Strapi hors preview (défaut : 300) |
| `CMS_FALLBACK_TO_STATIC` | (Optionnel) `true` pour autoriser un fallback vers `lib/site-data.ts` si Strapi est incomplet/injoignable |
| `STRAPI_WEBHOOK_SECRET` | Secret pour la route `POST /api/revalidate` (revalidation ISR via webhook Strapi) |
| `STRAPI_PREVIEW_SECRET` | Secret pour la route `GET /api/draft` (preview / draftMode) |

Notes:

En mode **Draft/Preview** (Next `draftMode()`), les requêtes passent en `no-store`.

Les médias Strapi sont normalisés en **URLs absolues** pour fonctionner avec `next/image` (voir `lib/cms/strapi/mappers.ts`).
