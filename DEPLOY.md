# Deployment & Operations — Let's Open

## Current deployment status

The Cloudflare Pages deployment path is set up, but the production custom domain is not currently serving the Cloudflare Pages project.

### Current state
- GitHub repo exists: `niechen/letsopen-ai`
- Cloudflare Pages project exists: `letsopen-ai`
- GitHub Actions auto deploy is configured
- Repo variables are configured:
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_PAGES_PROJECT`
- Repo secret required for deploys:
  - `CLOUDFLARE_API_TOKEN`
- Current public domain issue:
  - `https://letsopen.ai` is still served by GitHub Pages, not Cloudflare Pages
  - `curl -I https://letsopen.ai` currently returns `server: GitHub.com`
  - apex DNS currently resolves to GitHub Pages IPs (`185.199.108.153` through `185.199.111.153`)
  - `www.letsopen.ai` currently CNAMEs to `lets-open-ai.github.io`
  - the Cloudflare Pages default URL is `https://letsopen-ai.pages.dev`

Before expecting new site changes on `letsopen.ai`, make sure the desired changes are committed and pushed to `main`, then attach the custom domain to Cloudflare Pages and replace the old GitHub Pages DNS records.

## Auto-deploy workflow

Workflow file:
- `.github/workflows/deploy-cloudflare-pages.yml`

Behavior:
- pushes to `main` deploy production
- pull requests deploy preview branches

## Required GitHub configuration

### Repo variables
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_PAGES_PROJECT=letsopen-ai`

### Repo secret
- `CLOUDFLARE_API_TOKEN`

## Important credential decision

Use a **dedicated Cloudflare API Token for Pages deployments**.

Do **not** rely on:
- local Wrangler session tokens
- Workers AI-only tokens
- copied temporary CLI auth material

### Correct token type
Use a token with permission scope that can manage **Cloudflare Pages deployments** for the target account.

At minimum, it must be able to:
- access the Pages project
- create/update Pages deployments

If deploys fail with Cloudflare auth error `10000`, the most likely cause is that the token exists but does not have the correct Pages permissions.

## Setting the GitHub secret

Interactive:

```bash
gh secret set CLOUDFLARE_API_TOKEN --repo niechen/letsopen-ai
```

## Manual local deploy fallback

If needed, the site can still be deployed directly with Wrangler:

```bash
npm run build
wrangler pages deploy dist --project-name letsopen-ai
```

## Custom domain

Planned production domain:
- `letsopen.ai`

Required DNS/domain tasks:
1. commit and push the current site changes to `main`
2. wait for the GitHub Actions Cloudflare Pages deployment to complete
3. add `letsopen.ai` as a custom domain on the Cloudflare Pages project
4. remove the old GitHub Pages apex A records
5. remove or replace the `www.letsopen.ai -> lets-open-ai.github.io` CNAME
6. point apex/root and optionally `www` to the Cloudflare Pages custom-domain target
7. verify `curl -I https://letsopen.ai` no longer returns `server: GitHub.com`

## Post-deploy verification checklist

### Human-facing
- homepage loads
- topic hubs render correctly
- article/guide/comparison pages render correctly
- navigation works
- theme toggle works
- mobile layout looks clean
- OG metadata is present

### Machine-facing
- `/llms.txt`
- `/llms-full.txt`
- `/agent-manifest.json`
- `/api/content-index.json`
- `/api/search.json`
- `/agent/.../*.txt`
- `/rss.xml`
- `/sitemap-index.xml`
- `robots.txt`

## Newsletter / subscriptions

Current implementation assumes Buttondown embed flow.

If the Buttondown publication handle changes, update the form action in:
- `src/components/SubscribeForm.astro`

## Analytics

Recommended:
- Cloudflare Web Analytics

This is not a blocker for launch, but should be added before broader traffic push.

## Future operational improvements

- upgrade GitHub workflow actions if needed for future GitHub runtime changes
- add custom domain once final review is complete
- optionally add richer semantic retrieval infrastructure later (for example a Worker-backed search/retrieval layer)
