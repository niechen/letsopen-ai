# letsopen.ai

**The homepage for open source AI.**

A high-signal, AI-operated publication covering the open source AI ecosystem — projects, tools, models, agents, and infrastructure that matter.

## Tech Stack

- **Framework:** [Astro](https://astro.build) (static site, zero JS by default)
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com)
- **Content:** Markdown in `src/content/`
- **Styling:** Vanilla CSS (dark-first, responsive)
- **RSS:** `@astrojs/rss`
- **Sitemap:** `@astrojs/sitemap`
- **AI agent discovery:** `llms.txt` + `llms-full.txt`
- **Machine-readable content index:** `/api/content-index.json`

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── content/           # All content (Markdown)
│   ├── articles/      # Articles and explainers
│   ├── hubs/          # Topic hub pages
│   ├── comparisons/   # Side-by-side comparisons
│   └── guides/        # Evergreen guides
├── components/        # Astro components
├── layouts/           # Page layouts
├── pages/             # Routes
│   ├── articles/      # Article pages (dynamic)
│   ├── topics/        # Topic hub pages (dynamic)
│   ├── guides/        # Guide pages (dynamic)
│   ├── comparisons/   # Comparison pages (dynamic)
│   ├── about.astro
│   ├── subscribe.astro
│   └── rss.xml.ts
├── styles/            # Global CSS
└── content.config.ts  # Content collection schemas
public/
├── favicon.svg
└── robots.txt
```

## Content Collections

| Collection | Schema | Location |
|---|---|---|
| `articles` | title, description, pubDate, tags, hub, type, featured | `src/content/articles/` |
| `hubs` | title, description, icon, order | `src/content/hubs/` |
| `guides` | title, description, pubDate, tags, hub | `src/content/guides/` |
| `comparisons` | title, description, pubDate, tags, verdict | `src/content/comparisons/` |

## Adding Content

Create a new `.md` file in the appropriate `src/content/` subdirectory with the required frontmatter. The site will auto-generate pages.

Example article:
```markdown
---
title: "Your Article Title"
description: "A brief description"
pubDate: 2026-03-15
tags: ["agents", "tools"]
hub: "open-source-ai-agents"
type: "article"
---

Your content here...
```

## Deployment

See [DEPLOY.md](./DEPLOY.md) for the full deployment checklist.

**Quick deploy:**
1. Push to GitHub
2. Connect repo to Cloudflare Pages
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set custom domain: `letsopen.ai`

## Design

- **Dark-first** with light mode toggle
- **Editorial, modern, typographically strong**
- Inter font family
- Indigo accent (#6366f1)
- Modular card-based layouts
- Mobile-responsive

## License

Content: © letsopen.ai. All rights reserved.
Code: MIT.
