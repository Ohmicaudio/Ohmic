scope: project
authority: working
project: ohmic-audio-labs
status: done
requested: 2026-03-13
requester: codex-local
origin: dependency
priority: soon
blocking: no
depends_on: 
handoff_from: 
claim_id: 20260314T004725Z-0ed5d638
topic: requested-task

# Cut over transitional public payload to static host

## Requested Outcome

- remove the remaining transitional `public/` payload from `ohmic-audio-labs`
- serve static docs/tools/reference content from the dedicated `ohmic-audio-static-content` surface instead
- keep app/runtime links working through a configured static base URL rather than in-repo static pages

## Completion

- `B:\ohmic\repos\ohmic-audio-labs\public` was removed from the app repo
- app/runtime branding assets and dashboard gateway links now resolve through `B:\ohmic\repos\ohmic-audio-labs\utils\staticContent.ts`
- `B:\ohmic\repos\ohmic-audio-labs\index.html` now sources the favicon from the live static host, with `VITE_STATIC_CONTENT_BASE_URL` override support
- `B:\ohmic\repos\ohmic-audio-labs\vite.config.ts` now redirects reserved static-content routes to `https://ohmic-audio-static-content.kzairsoft.workers.dev` during local dev instead of serving repo-local files
- `B:\ohmic\repos\ohmic-audio-labs\netlify.toml` now redirects the reserved static-content paths and root support files to the same live Workers deployment in production
- `B:\ohmic\repos\ohmic-audio-labs\playwright.config.ts` now mirrors `PLAYWRIGHT_STATIC_CONTENT_BASE_URL` into `VITE_STATIC_CONTENT_BASE_URL` for local test runs
- `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts` now expects the external static-host URL shape instead of repo-local `public` pages
- verification passed after the delete with `npm run test:e2e:static -- --project=chromium` and `npm run build`

## Notes

- `site/` and `content-work/` are already split to `ohmic-audio-static-content`
- `ohmic-audio-static-content` now has its own README and owns the content-maintenance scripts under `scripts/`
- user confirmed the canonical public domains should be `https://ohmicaudio.com` and `https://ohmicaudiolabs.com`
- working implementation assumption: use `https://ohmicaudiolabs.com` as the primary static-content base URL and treat `https://ohmicaudio.com` as an alias or redirect unless deployment says otherwise
- `B:\ohmic\repos\ohmic-audio-static-content\public` already contains `favicon.svg`, `ohmic-logo.svg`, `robots.txt`, `sitemap.xml`, `ai-index.json`, and `suite-index.json`
- `B:\ohmic\repos\ohmic-audio-static-content` now tracks `origin/main` at `https://github.com/Ohmicaudio/ohmic-audio-static-content.git`
- legacy `https://ohmicaudio.netlify.app` host references were normalized on 2026-03-13 across `ohmic-audio-static-content/public` and `content-work/reference-style`
- the static payload now points at `https://ohmicaudiolabs.com` as the working primary canonical host, while `https://ohmicaudio.com` still needs explicit alias or redirect handling in deployment
- `https://ohmic-audio-static-content.kzairsoft.workers.dev` is now a reachable Cloudflare Workers deployment for cutover verification, including a published root landing page plus working `/favicon.svg` and `/robots.txt`
- production app fallback in `ohmic-audio-labs` now defaults to the reachable Workers host when `VITE_STATIC_CONTENT_BASE_URL` is unset, while still allowing an explicit custom-domain override later
- `npm run test:e2e:static -- --project=chromium` passed 3/3 after the `public` tree was removed
- `npm run build` passed after the cutover, confirming the app shell still bundles with no repo-local `public` payload
- `ohmicaudiolabs.com` and `ohmicaudio.com` still need public DNS/custom-domain verification before they can replace the Workers fallback as the canonical cutover endpoint
- all app-side follow-up work for this request should happen from `B:\ohmic\repos\ohmic-audio-labs`, not any legacy/source copy
