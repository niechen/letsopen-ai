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
- A practical open source AI agent app blueprint
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
- `/agents` — human-readable guide to the agent/retrieval surfaces
- `/agent-manifest.json`
- `/rss.xml`
- `/sitemap-index.xml`
- `/sitemap-agents.xml` — sitemap for machine-readable JSON and text endpoints

### Structured layer
- `/api/content-index.json`
- `/api/search.json` — static search index for client-side filtering
- shared schema metadata (`schemaVersion`, `fieldDefinitions`, retrieval protocol)
- intent routing fields (`audience`, `builderStage`, `stackLayers`, `useCases`, `opennessSignals`, `intentKeywords`)
- deterministic related-content graph edges (`related`) for hub and sibling traversal
- manifest entry points include `exampleQueries` and `nextActions` for natural-language builder routing

### Token-efficient content layer
- `/agent/articles/{id}.txt`
- `/agent/guides/{id}.txt`
- `/agent/comparisons/{id}.txt`
- `/agent/topics/{id}.txt`
- text mirrors include canonical URL, machine URL, hub, tags, intent metadata, and related links

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
- source posture, freshness, and operational risk should be explicit editorial dimensions
- the newsletter is positioned as a builder brief for open source AI agents, app stacks, source posture, and practical tools

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
- agent sitemap, page-level alternate links, and visible footer links for machine endpoints added
- public `/agents` page added to explain retrieval flow and machine-readable endpoints
- practical agent app blueprint added as the primary builder starting point
- intent metadata and endpoint schema descriptions added for agent routing
- wording pass to prefer "open source AI" completed
- freshness metadata added through `updatedDate` / `freshnessDate`
- related-content graph exposed in JSON endpoints, agent text mirrors, and human content footers
- manifest routing strengthened with `exampleQueries` and `nextActions`
- how-we-work page expanded with editorial checks for source posture, builder usefulness, operational risk, and freshness
- newsletter positioning tightened around the builder brief

## Current gaps / next priorities

### Product / content
- increase launch content depth further
- add more flagship pieces and stronger category-defining content
- add more implementation-grade content around open source agent architecture, evaluation, and local deployment
- add more proof-oriented content: concrete tool workflows, local deployment walkthroughs, and real builder decision trees
- likely add richer visual/explainer content over time

### Agent-first / technical
- improve search ranking/relevance logic
- strengthen relationship labels beyond hub/sibling edges when the corpus is larger
- consider richer semantic retrieval or MCP-style access later

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
