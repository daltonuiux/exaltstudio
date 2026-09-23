# Exalt Studio — project conventions

Single-page marketing site for Exalt Studio (product design & development studio
for B2B SaaS, AI startups and complex enterprise software).

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · npm · Vercel.

Deliberately lightweight. Do **not** add shadcn, MUI, Chakra, Bootstrap, a CMS,
an animation library, or any large component library unless explicitly asked.

## Structure

```
src/app/                 routes, layout, metadata, robots, sitemap
src/components/ui/       reusable primitives (Container, Section, …)
src/components/sections/ page sections built from Figma (Hero, Work, …)
src/lib/                 site config and small helpers
public/images/           work | studio | logos | decorative
```

## Design tokens

All tokens live in the `@theme` block of `src/app/globals.css`. Tailwind v4
generates utilities from them, so update tokens rather than sprinkling arbitrary
values. Figma variables map onto them:

| Figma            | Token namespace  |
| ---------------- | ---------------- |
| colour variables | `--color-*`      |
| type scale       | `--text-*`       |
| spacing scale    | `--spacing-*`    |
| corner radius    | `--radius-*`     |
| frame widths     | `--container-*` / `--breakpoint-*` |

**Colour is decided: Tailwind's built-in `mauve` scale** (a near-neutral grey,
hue ~322, chroma 0.003–0.034). Semantic tokens (`--color-background`,
`--color-foreground`, …) map onto `mauve-*` steps, so components should use the
semantic names and a palette change stays a one-line edit. `mauve-*` utilities
remain available for one-offs Figma calls for.

**Type is decided: Asta Sans** (variable 300-800) for UI and headings, **DM Mono
Medium** for uppercase eyebrow labels. Both load via `next/font/google` in the
root layout and are exposed as `--font-sans` / `--font-mono`.

Spacing, sizing and radius are still **temporary placeholders**. Figma remains
the source of truth for spacing, sizing, grid, borders, radius, imagery, layout
and responsive behaviour.

## Logos

Brand SVGs live in `public/images/logos/`, exported from Figma and cleaned of
export artefacts (backdrop rect, page-background rect, baked-in 50% opacity).
They carry a literal `#161218` fill — do **not** convert them to
`currentColor`: they render via `<img>`, where `currentColor` resolves to black.
Every export reuses the same clip/mask ids, so they must stay separate
documents rather than being inlined into one page.

## Layout primitives

- `<Container>` owns horizontal gutters + max width (`content` | `site` | `wide` | `full`).
- `<Section>` owns vertical rhythm (`sm` | `md` | `lg` | `none`).

Sections should be `<Section id="…" aria-labelledby="…">` wrapping a
`<Container>`, so landmarks stay named and gutters stay consistent.

## Rules

- Server Components by default. Add `"use client"` only where interactivity
  genuinely requires it, and push it as far down the tree as possible.
- Mobile-first and fluid. Treat desktop/mobile Figma frames as one responsive
  system — never duplicate implementations per viewport.
- Semantic HTML, real landmarks, sensible heading order, visible focus states.
  The global reduced-motion block in `globals.css` must keep working.
- Use `next/image` with explicit dimensions to avoid layout shift.
- Use `cn()` from `src/lib/utils.ts` when a component accepts `className`.

## Figma implementation workflow

Inspect the frame first, identify the layout system and repeated patterns,
reuse existing components, map Figma variables onto the tokens above, preserve
responsive intent rather than fixed coordinates, and pull assets from Figma.
Do not redesign or "improve" the design unless asked. Prefer visual accuracy.

## Checks

```
npm run typecheck && npm run lint && npm run build
```
