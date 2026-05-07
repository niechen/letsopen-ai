# Let's Open

**Open source AI people can trust.**

Let's Open is an AI-operated, human-edited website about the open source AI ecosystem: agents, tools, models, infrastructure, workflows, and the broader case for open source AI.

This repo contains the live site for **letsopen.ai**.

## Current status

The project is already live and deployed.

- **GitHub repo:** `niechen/letsopen-ai`
- **Hosting:** Cloudflare Pages
- **Framework:** Astro
- **Auto deploy:** GitHub Actions → Cloudflare Pages
- **License:** MIT

The site currently includes:
- homepage + about + subscribe + how-we-work pages
- 8 topic hubs
- multiple launch articles, guides, and comparisons
- RSS + human sitemap + agent sitemap + robots.txt
- agent-first discovery surfaces (`llms.txt`, `llms-full.txt`, `/agent-manifest.json`)
- structured agent endpoints (`/api/content-index.json`, `/api/search.json`, `/agent/.../*.txt`)
- intent metadata for agent routing (`audience`, `builderStage`, `stackLayers`, `useCases`, `opennessSignals`)
- task-routing hints for agents (`exampleQueries`, `nextActions`) in `/agent-manifest.json`
- related-content graph edges for human pages and machine endpoints
- page-level structured metadata / JSON-LD schema

## Product direction

Let's Open is not just a content site. It is meant to be:
- a high-signal front door to open source AI
- a mission-led argument for open source AI as the path to more trustworthy, transparent, secure, sovereign AI systems
- an **agent-first website** that is easy for both humans and LLMs/agents to consume
- a practical builder map for people choosing open source AI agents, app stacks, source posture, and tools worth building with

## Tech stack

- **Framework:** [Astro](https://astro.build)
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com)
- **Content:** Markdown in `src/content/`
- **Styling:** Vanilla CSS
- **Feeds:** `@astrojs/rss`, `@astrojs/sitemap`
- **Machine-readable surfaces:** `llms.txt`, `llms-full.txt`, JSON APIs, agent sitemap, agent text mirrors

## Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project structure

```text
src/
├── content/
│   ├── articles/
│   ├── comparisons/
│   ├── guides/
│   └── hubs/
├── components/
├── layouts/
├── pages/
│   ├── agent/
│   ├── api/
│   ├── articles/
│   ├── comparisons/
│   ├── guides/
│   ├── topics/
│   ├── about.astro
│   ├── how-we-work.astro
│   ├── index.astro
│   ├── llms-full.txt.ts
│   ├── llms.txt.ts
│   ├── rss.xml.ts
│   ├── sitemap-agents.xml.ts
│   └── subscribe.astro
├── styles/
├── utils/
└── content.config.ts
```

## Key machine-readable endpoints

### Discovery
- `/llms.txt`
- `/llms-full.txt`
- `/agents` — human-readable guide to the agent/retrieval surfaces
- `/agent-manifest.json`
- `/rss.xml`
- `/sitemap-index.xml`
- `/sitemap-agents.xml`

### Structured retrieval
- `/api/content-index.json`
- `/api/search.json` — static search index for client-side filtering

Both JSON endpoints include `schemaVersion`, `fieldDefinitions`, and a retrieval protocol. Content entries also expose intent fields for routing:
- `audience`
- `builderStage`
- `stackLayers`
- `useCases`
- `opennessSignals`
- `intentKeywords`
- `related` — deterministic graph edges to topic hubs and sibling content

The agent manifest also exposes builder entry points with:
- `exampleQueries` — natural-language questions that should route to the entry point
- `nextActions` — suggested retrieval or verification steps after selecting that entry point

### Token-efficient text mirrors
- `/agent/articles/{id}.txt`
- `/agent/guides/{id}.txt`
- `/agent/comparisons/{id}.txt`
- `/agent/topics/{id}.txt`

Text mirrors include canonical/machine URLs, intent metadata, and `Related:` links so agents can traverse from one page to its hub or sibling pages without fetching the full JSON index first.

## Editorial standards

The site is AI-operated and human-edited. Coverage should keep these distinctions explicit:
- **Source posture:** open source, open-weight, source-available, open-adjacent, or closed comparison point
- **Builder usefulness:** whether a serious builder can run, inspect, integrate, or replace the component
- **Operational risk:** license, hosted dependency, data policy, credential, and evaluation concerns before adoption
- **Freshness:** important updates should surface through `updatedDate`, `freshnessDate`, human pages, JSON indexes, search results, and agent text mirrors

## Content collections

| Collection | Purpose | Location |
|---|---|---|
| `articles` | editorials, explainers, timely pieces | `src/content/articles/` |
| `guides` | evergreen practical guides | `src/content/guides/` |
| `comparisons` | tool/category comparisons | `src/content/comparisons/` |
| `hubs` | topic hub landing pages | `src/content/hubs/` |

## Deployment

This repo auto-deploys via GitHub Actions.

See [DEPLOY.md](./DEPLOY.md) for operational details.

## Planning and project context

See:
- [PROJECT_STATUS.md](./PROJECT_STATUS.md) — current status, decisions, progress, next steps
- [DEPLOY.md](./DEPLOY.md) — deployment and operational notes

## License

MIT.
