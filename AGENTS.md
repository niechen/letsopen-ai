# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project

Let's Open (letsopen.ai) — an AI-operated, human-edited website about the open source AI ecosystem. Built to serve both human readers and AI agents as first-class consumers.

## Commands

```bash
npm run dev        # Local dev server
npm run build      # Production build (output: dist/)
npm run preview    # Preview production build locally
```

No test suite or linter is configured. Deployment is automated via GitHub Actions on push to `main` (Cloudflare Pages).

## Architecture

**Stack:** Astro 5 (static SSG) + Vanilla CSS + Markdown content → Cloudflare Pages

**Content collections** (`src/content/`):
- `articles/` — Timely editorials (frontmatter: title, description, pubDate, author; optional: featured, hub, type, tags)
- `guides/` — Evergreen practical content
- `comparisons/` — Tool/category comparisons (optional: verdict, hub)
- `hubs/` — Topic landing pages (optional: icon, order)

Content filenames become URL slugs. Frontmatter `featured: true` highlights articles on the homepage.

**Page routing** (`src/pages/`):
- Dynamic routes via `[id].astro` in `articles/`, `guides/`, `comparisons/`, `topics/` — each uses `getStaticPaths()` over collections
- Static pages: `index.astro`, `about.astro`, `how-we-work.astro`, `subscribe.astro`, `404.astro`

**Agent/machine endpoints** (auto-generated from collections at build time):
- `/llms.txt`, `/llms-full.txt` — LLM discovery
- `/agents` — Human-readable guide to the agent/retrieval surfaces
- `/agent-manifest.json` — Agent discovery manifest
- `/api/content-index.json` — Structured content index
- `/api/search.json` — Static search index for client-side filtering
- `/agent/{collection}/{id}.txt` — Token-efficient plain text mirrors
- `/sitemap-agents.xml` — Machine-readable sitemap for agent endpoints
- `/rss.xml`, `/sitemap-index.xml`

Agent endpoint conventions:
- Shared routing metadata is generated in `src/utils/content-intents.ts`
- Related-content graph edges are generated in `src/utils/content-relations.ts` and should stay consistent across `/agent-manifest.json`, `/api/content-index.json`, `/api/search.json`, and `/agent/...txt` mirrors
- JSON endpoint schema text lives in `src/utils/agent-schema.ts`
- Agent text mirror metadata lives in `src/utils/agent-text.ts`
- `/agent-manifest.json` entry points include `exampleQueries` and `nextActions`; keep `/llms.txt`, `/llms-full.txt`, `/agents`, and schema descriptions aligned when these routing concepts change
- Keep `/llms.txt`, `/llms-full.txt`, `/agent-manifest.json`, `/api/content-index.json`, `/api/search.json`, and `/sitemap-agents.xml` consistent when adding new discovery concepts
- `BaseLayout.astro` emits global alternate links to key AI discovery endpoints; content pages add page-specific alternate links to their `/agent/...txt` mirrors

**Layout:** Single `BaseLayout.astro` handles SEO metadata, JSON-LD, OpenGraph, and theme toggle script.

**Styling** (`src/styles/global.css`): Bright editorial design with CSS custom properties for theme switching. Inter + JetBrains Mono fonts are bundled via `@fontsource`; the layout does not depend on hosted font providers. Max-width 1240px site / 760px content.

## Key Conventions

- All content is Markdown with Zod-validated frontmatter schemas defined in `src/content.config.ts`
- Adding a new markdown file to a collection automatically generates its page route and agent text mirror
- When adding a flagship builder guide, consider whether it should be added to homepage builder paths, `agent-manifest.json` entry points, and `llms` indexes
- When making content recommendations, distinguish open source, open-weight, source-available, open-adjacent, and closed comparison points
- Important guide/comparison updates should set `updatedDate`; freshness propagates to human cards, JSON indexes, search, and agent text mirrors
- Preserve the builder-first newsletter promise: open source AI agents, app stacks, source posture, and practical tools worth building with
- Site config (URL, integrations) in `astro.config.mjs`
- Newsletter form uses Buttondown embed (`src/components/SubscribeForm.astro`)
- Deployment requires GitHub secrets: `CLOUDFLARE_API_TOKEN` and variables: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_PAGES_PROJECT`
