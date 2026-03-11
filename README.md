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
- RSS + sitemap + robots.txt
- agent-first discovery surfaces (`llms.txt`, `llms-full.txt`)
- structured agent endpoints (`/api/content-index.json`, `/api/search.json`, `/agent-manifest.json`, `/agent/.../*.txt`)
- page-level structured metadata / JSON-LD schema

## Product direction

Let's Open is not just a content site. It is meant to be:
- a high-signal front door to open source AI
- a mission-led argument for open source AI as the path to more trustworthy, transparent, secure, sovereign AI systems
- an **agent-first website** that is easy for both humans and LLMs/agents to consume

## Tech stack

- **Framework:** [Astro](https://astro.build)
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com)
- **Content:** Markdown in `src/content/`
- **Styling:** Vanilla CSS
- **Feeds:** `@astrojs/rss`, `@astrojs/sitemap`
- **Machine-readable surfaces:** `llms.txt`, `llms-full.txt`, JSON APIs, agent text mirrors

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
│   └── subscribe.astro
├── styles/
└── content.config.ts
```

## Key machine-readable endpoints

### Discovery
- `/llms.txt`
- `/llms-full.txt`
- `/agent-manifest.json`
- `/rss.xml`
- `/sitemap-index.xml`

### Structured retrieval
- `/api/content-index.json`
- `/api/search.json?q=...`

### Token-efficient text mirrors
- `/agent/articles/{id}.txt`
- `/agent/guides/{id}.txt`
- `/agent/comparisons/{id}.txt`
- `/agent/topics/{id}.txt`

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
