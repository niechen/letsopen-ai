# Deployment & Operations — Let's Open

## Current deployment status

The project is already set up.

### Current state
- GitHub repo exists: `niechen/letsopen-ai`
- Cloudflare Pages project exists: `letsopen-ai`
- GitHub Actions auto deploy is configured
- Repo variables are configured:
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_PAGES_PROJECT`
- Repo secret required for deploys:
  - `CLOUDFLARE_API_TOKEN`

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

Likely next DNS/domain tasks when ready:
1. add the custom domain to the Pages project
2. point apex/root appropriately in Cloudflare
3. optionally redirect `www` to apex

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
