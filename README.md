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

## Déploiement (GitHub Pages)

Ce repo peut être déployé sur **GitHub Pages** via une **GitHub Action** (déploiement statique).

### Pré-requis

- Dans GitHub : **Settings → Pages → Source → GitHub Actions**
- La branche de déploiement ciblée par défaut est `main` (voir `.github/workflows/deploy-pages.yml`)

### Comment ça marche

- Le workflow `.github/workflows/deploy-pages.yml` build le site avec `GITHUB_PAGES=true`
- `next.config.mjs` active alors `output: "export"` + le `basePath` automatiquement (pour les project pages)
- Le site généré est publié depuis le dossier `out/`

### Build avec contenu Strapi (build-time)

Ajoutez ces **GitHub Secrets** dans le repo du site (Settings → Secrets and variables → Actions):

- `STRAPI_URL` (ex: `https://cms.lescaducees.fr`)
- `STRAPI_API_TOKEN`

Le workflow injecte ces variables au build pour récupérer le contenu Strapi.

### Rebuild automatique quand Strapi change (optionnel)

GitHub Pages étant statique, le plus simple est:

- rebuild sur push (déjà en place)
- rebuild **tous les jours à minuit UTC** (déjà en place)

Si vous voulez rebuild “à chaque publish/update Strapi”, ce repo Strapi peut déclencher un `workflow_dispatch` côté GitHub Actions via des variables d’env (voir `site-les-caducees-strapi/env.example`).

### URL de sortie

- **Project pages**: `https://<owner>.github.io/<repo>/`
- **User/Org pages** (repo nommé `<owner>.github.io`): `https://<owner>.github.io/`

### Limitations importantes (Pages = statique)

- Pas de runtime Node/serverless: **pas de `app/api/*`**, pas de Draft/Preview, pas de revalidation ISR “à la volée”.
- Si vous consommez Strapi, le contenu est figé **au moment du build**. Pour “mettre à jour”, il faut **relancer un build** (push, ou `workflow_dispatch`).

Les route handlers précédents ont été archivés dans `server/next-route-handlers/` (pour restauration sur une plateforme type Vercel).

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
