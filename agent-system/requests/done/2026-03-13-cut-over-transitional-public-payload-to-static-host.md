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
claim_id: 20260314T023416Z-d999ccc6
topic: requested-task

# Cut over transitional public payload to static host

## Requested Outcome

- remove the remaining transitional `public/` payload from `ohmic-audio-labs`
- serve static docs/tools/reference content from the dedicated `ohmic-audio-static-content` surface instead
- keep app/runtime links working through a configured static base URL rather than in-repo static pages

## Completion

- app/runtime cutover plumbing is in place
- static-host routing and fallback behavior are wired through the app
- verification notes already confirm the Workers-host path works for the existing external static base
- the remaining physical `public/` prune is split into `requests/blocked/2026-03-14-prune-legacy-public-payload-after-worktree-isolation.md`
- this request is done because the active next step is no longer a clean ready-task edit; it is a blocked follow-up waiting on worktree isolation

## Scope

- `/mnt/b/ohmic/repos/ohmic-audio-labs/public`
- `/mnt/b/ohmic/repos/ohmic-audio-labs/components/Landing/Dashboard.tsx`
- `/mnt/b/ohmic/repos/ohmic-audio-labs/index.html`
- `/mnt/b/ohmic/repos/ohmic-audio-labs/e2e/static-tier.spec.ts`
- static-host/deployment config once the destination URL is known

## Constraints

- do not break the current app build or local preview flow before the host URL is decided
- keep `favicon.svg` and `ohmic-logo.svg` available to the app until they have a stable external home
- treat `public/` as transitional until runtime and deployment assumptions are explicitly updated

## Notes

- `site/` and `content-work/` are already split to `ohmic-audio-static-content`
- `ohmic-audio-static-content` now has its own README and owns the content-maintenance scripts under `scripts/`
- `public/` was intentionally left in `ohmic-audio-labs` as the last transitional static payload
- `VITE_STATIC_CONTENT_BASE_URL` already exists in the app and is used by the landing dashboard gateway links
- app/runtime asset references now support external-host fallback through `utils/staticContent.ts` and an external-aware favicon path in `index.html`
- `e2e/static-tier.spec.ts` now supports `PLAYWRIGHT_STATIC_CONTENT_BASE_URL` so the same spec can verify either app-origin or external static-host routing
- `.github/workflows/ci-quality-gates.yml` now makes the `web-e2e` job the explicit CI injection point for external-host verification by reading the optional GitHub Actions variable `PLAYWRIGHT_STATIC_CONTENT_BASE_URL` and mirroring it into `VITE_STATIC_CONTENT_BASE_URL`
- user confirmed the canonical public domains should be `https://ohmicaudio.com` and `https://ohmicaudiolabs.com`
- working implementation assumption: use `https://ohmicaudiolabs.com` as the primary static-content base URL and treat `https://ohmicaudio.com` as an alias or redirect unless deployment says otherwise
- `B:\ohmic\repos\ohmic-audio-static-content\public` already contains `favicon.svg`, `ohmic-logo.svg`, `robots.txt`, `sitemap.xml`, `ai-index.json`, and `suite-index.json`
- `B:\ohmic\repos\ohmic-audio-static-content` now tracks `origin/main` at `https://github.com/Ohmicaudio/ohmic-audio-static-content.git`
- legacy `https://ohmicaudio.netlify.app` host references were normalized on 2026-03-13 across `ohmic-audio-static-content/public` and `content-work/reference-style`
- the static payload now points at `https://ohmicaudiolabs.com` as the working primary canonical host, while `https://ohmicaudio.com` still needs explicit alias or redirect handling in deployment
- `https://ohmic-audio-static-content.kzairsoft.workers.dev` is now a reachable Cloudflare Workers deployment for cutover verification, including a published root landing page plus working `/favicon.svg` and `/robots.txt`
- production app fallback in `ohmic-audio-labs` now defaults to the reachable Workers host when `VITE_STATIC_CONTENT_BASE_URL` is unset, while still allowing an explicit custom-domain override later
- `B:\ohmic\repos\ohmic-audio-labs\netlify.toml` now redirects the reserved static-content paths and root support files to `https://ohmic-audio-static-content.kzairsoft.workers.dev` instead of serving the app-owned `public/` copies in production
- `B:\ohmic\repos\ohmic-audio-labs\vite.config.ts` now mirrors that behavior for local dev whenever `VITE_STATIC_CONTENT_BASE_URL` is set, so app-host requests for `/design-suite`, `/measurement-suite`, `/apps`, `/reference`, and related static payload routes leave the app host cleanly
- `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts` now accepts the live Workers trailing-slash URL shape and explicitly verifies the app-host redirect behavior when the external static base is configured
- verified on 2026-03-13 with `PLAYWRIGHT_STATIC_CONTENT_BASE_URL` and `VITE_STATIC_CONTENT_BASE_URL` both set to `https://ohmic-audio-static-content.kzairsoft.workers.dev`: `npm run test:e2e:static -- --project=chromium` passed with 4/4 tests
- `ohmicaudiolabs.com` and `ohmicaudio.com` still need public DNS/custom-domain verification before they can replace the Workers fallback as the canonical cutover endpoint
- physical deletion of the duplicated legacy `public` payload is intentionally deferred until that repo's unrelated in-flight changes are separated, so the cleanup pass does not trample work outside the static cutover
- all app-side follow-up work for this request should happen from `B:\ohmic\repos\ohmic-audio-labs`, not any legacy/source copy

## Ready When

- a claim is active for the app-side cutover files
- the reachable Workers host is used for app/runtime and test verification, or the custom domains are live and chosen as canonical
- the favicon/logo serving plan is explicit
- the primary-vs-alias behavior between `ohmicaudiolabs.com` and `ohmicaudio.com` is explicit in deployment/config

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public`
- `B:\ohmic\repos\ohmic-audio-labs\components\Landing`
- `B:\ohmic\repos\ohmic-audio-labs\index.html`
- `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts`
- `B:\ohmic\repos\ohmic-audio-static-content`
