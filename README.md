# Exalt Studio

Marketing site for Exalt Studio — a product design and development studio
working with B2B SaaS, AI startups and complex enterprise software.

Single-page site built with Next.js (App Router), TypeScript and Tailwind CSS,
deployed on Vercel.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script              | Purpose                        |
| ------------------- | ------------------------------ |
| `npm run dev`       | Development server             |
| `npm run build`     | Production build               |
| `npm run start`     | Serve the production build     |
| `npm run lint`      | ESLint                         |
| `npm run typecheck` | TypeScript, no emit            |

## Environment

Copy `.env.example` to `.env.local`. `NEXT_PUBLIC_SITE_URL` sets the canonical
origin used for metadata, Open Graph URLs and the sitemap.

## Project layout

See [CLAUDE.md](CLAUDE.md) for structure, design-token architecture and
conventions.
