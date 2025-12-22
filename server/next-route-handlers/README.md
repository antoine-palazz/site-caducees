## Archived Next Route Handlers (not used on GitHub Pages)

GitHub Pages is **static hosting**, so Next.js **Route Handlers** under `app/api/*` are not supported when using `output: "export"`.

This folder keeps the previous Route Handler implementations so you can re-enable them on a platform that supports serverless/Node runtimes (e.g. Vercel).

To restore them, copy the `app/` subtree from this folder back to the project root:

- from `server/next-route-handlers/app/api/*`
- to `app/api/*`


