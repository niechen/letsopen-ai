# Deployment Checklist — letsopen.ai

## Prerequisites

- [ ] GitHub repo created (public or private)
- [ ] Cloudflare account with Pages access
- [ ] Domain `letsopen.ai` managed in Cloudflare DNS

## GitHub Setup

1. [ ] Initialize git and push:
   ```bash
   cd letsopen-ai-site
   git init
   git add .
   git commit -m "Initial site build"
   git remote add origin git@github.com:<org>/letsopen-ai-site.git
   git push -u origin main
   ```

## Cloudflare Pages Setup

1. [ ] Go to **Cloudflare Dashboard → Pages → Create a project**
2. [ ] Connect GitHub repo
3. [ ] Configure build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** 20+ (set `NODE_VERSION=20` in environment variables if needed)
4. [ ] Deploy

## Custom Domain

1. [ ] In Cloudflare Pages project → **Custom domains**
2. [ ] Add `letsopen.ai`
3. [ ] Add `www.letsopen.ai` (redirect to apex)
4. [ ] Verify DNS records are set (Cloudflare auto-configures if domain is on CF)

## Post-Deploy Checks

- [ ] Homepage loads at `https://letsopen.ai`
- [ ] All navigation links work
- [ ] Article/guide/comparison pages render
- [ ] RSS feed at `/rss.xml`
- [ ] Sitemap at `/sitemap-index.xml`
- [ ] `robots.txt` accessible
- [ ] `llms.txt` and `llms-full.txt` accessible
- [ ] `/api/content-index.json` accessible
- [ ] 404 page shows custom design
- [ ] Dark mode default, light mode toggle works
- [ ] Mobile responsive
- [ ] Open Graph tags render (test with https://opengraph.dev)
- [ ] Subscribe form submits to Buttondown

## Newsletter (Buttondown)

1. [ ] Create Buttondown account at https://buttondown.com
2. [ ] Set publication name to `letsopenai` (or update form action URL in `SubscribeForm.astro`)
3. [ ] Configure welcome email
4. [ ] Test subscribe flow end-to-end

## Analytics

1. [ ] Enable **Cloudflare Web Analytics** in dashboard
2. [ ] Verify data collection after deploy

## Optional: Cloudflare Workers

If you need server-side form handling instead of direct Buttondown embed:
1. Create a Worker for `/api/subscribe`
2. Proxy to Buttondown API
3. Add rate limiting

## OG Image

- [ ] Create `public/og-default.png` (1200×630px) with site branding
- [ ] Per-article OG images can be added later via `heroImage` frontmatter

## Go Live

1. [ ] Final content review
2. [ ] Check all links
3. [ ] Deploy production
4. [ ] Announce 🚀
