# Project Status — Let's Open

## Purpose

Let's Open is being built as:
- a high-signal website about the open source AI ecosystem
- a mission-led argument for open source AI as the path to more trustworthy, transparent, secure, sovereign AI systems
- an **agent-first website** designed for both human readers and AI agents

## Current product position

Working positioning direction:
- **Let's Open — Open source AI people can trust**
- message emphasis: trust, transparency, security, sovereignty, openness, broad access

Important wording decision:
- prefer **"open source AI"**
- avoid loose phrasing like **"open AI"**

## Current implementation status

### Site structure
Implemented:
- homepage
- about page
- how-we-work page
- subscribe page
- 404 page
- topic index + 8 topic hubs
- guides index + guide pages
- comparisons index + comparison pages
- article pages

### Content currently in repo
#### Articles
- Why open source AI agents matter now
- OpenClaw: what it is and why it matters
- Why AI needs to be open

#### Guides
- The open source AI stack, explained
- Best open source AI tools for builders (2026)
- How to evaluate open source AI projects

#### Comparisons
- Codex CLI vs Claude Code vs Gemini CLI
- Open source AI agents vs closed AI assistants

#### Hubs
- Open Source AI Agents
- Coding Agents
- OpenClaw
- Local AI
- Open Models
- AI Infrastructure
- Open Source AI Tools
- Workflows & Orchestration

## Agent-first implementation

The site currently exposes multiple layers for agent consumption.

### Discovery layer
- `/llms.txt`
- `/llms-full.txt`
- `/agent-manifest.json`
- `/rss.xml`
- `/sitemap-index.xml`

### Structured layer
- `/api/content-index.json`
- `/api/search.json` — static search index for client-side filtering

### Token-efficient content layer
- `/agent/articles/{id}.txt`
- `/agent/guides/{id}.txt`
- `/agent/comparisons/{id}.txt`
- `/agent/topics/{id}.txt`

### Metadata layer
- page-level JSON-LD / schema on major content pages

## Major decisions already made

### Product / editorial
- the site should feel more like a movement/front door than a generic blog
- the site should explicitly make the case for open source AI
- the site should be AI-operated, human-edited
- the site should be useful to both humans and AI agents
- the site should be Cloudflare-first and operationally simple

### Technical
- Astro chosen as the core framework
- vanilla CSS over heavier UI frameworks
- Cloudflare Pages for hosting/deploy
- GitHub Actions for auto deploy
- MIT license
- machine-readable and token-efficient endpoints are first-class, not afterthoughts

### Deployment / operations
- use a dedicated Cloudflare API token for Pages deploys
- do not rely on local Wrangler session tokens as the long-term CI credential model

## Progress log (high level)

Completed so far:
- strategy pack created and revised
- first MVP site built
- GitHub repo created and pushed
- Cloudflare Pages project created
- direct deploy path verified
- GitHub auto-deploy workflow added and fixed
- MIT licensing added
- mission-led positioning pass completed
- multiple launch content pieces added
- agent-first surfaces added (`llms`, JSON index, text mirrors, search API, manifest)
- wording pass to prefer "open source AI" completed

## Current gaps / next priorities

### Product / content
- increase launch content depth further
- improve homepage so it feels even more essential and less like a shell
- add more flagship pieces and stronger category-defining content
- likely add richer visual/explainer content over time

### Agent-first / technical
- improve search ranking/relevance logic
- strengthen explicit relationships between content types
- consider richer semantic retrieval later
- evaluate whether an MCP-style surface is worthwhile later

### Launch / ops
- add custom domain when final review is complete
- add analytics
- check OG/social presentation more thoroughly
- continue content polish before broader announcement

## Suggested next milestones

### Milestone 1 — stronger launch surface
- homepage refinement
- 3–5 more strong launch pieces
- tighten visual hierarchy and featured content strategy

### Milestone 2 — stronger agent-first retrieval
- improve retrieval/search quality
- richer relationship graph between pages
- more explicit machine-readable summaries per page if needed

### Milestone 3 — launch readiness
- custom domain
- analytics
- final QA pass
- initial distribution / announcement
