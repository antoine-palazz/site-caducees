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


