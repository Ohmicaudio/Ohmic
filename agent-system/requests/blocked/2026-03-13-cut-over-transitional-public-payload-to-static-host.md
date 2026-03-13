scope: project
authority: working
project: ohmic-audio-labs
status: blocked
requested: 2026-03-13
requester: codex-local
origin: dependency
priority: soon
blocking: no
depends_on: 
handoff_from: 
claim_id: 
topic: requested-task

# Cut over transitional public payload to static host

## Requested Outcome

- remove the remaining transitional `public/` payload from `ohmic-audio-labs`
- serve static docs/tools/reference content from the dedicated `ohmic-static-content` surface instead
- keep app/runtime links working through a configured static base URL rather than in-repo static pages

## Scope

- `/mnt/a/ohmic-audio-labs/public`
- `/mnt/a/ohmic-audio-labs/components/Landing/Dashboard.tsx`
- `/mnt/a/ohmic-audio-labs/index.html`
- `/mnt/a/ohmic-audio-labs/e2e/static-tier.spec.ts`
- static-host/deployment config once the destination URL is known

## Constraints

- do not break the current app build or local preview flow before the host URL is decided
- keep `favicon.svg` and `ohmic-logo.svg` available to the app until they have a stable external home
- treat `public/` as transitional until runtime and deployment assumptions are explicitly updated

## Notes

- `site/` and `content-work/` are already split to `ohmic-static-content`
- `ohmic-static-content` now has its own README and owns the content-maintenance scripts under `scripts/`
- `public/` was intentionally left in `ohmic-audio-labs` as the last transitional static payload
- `VITE_STATIC_CONTENT_BASE_URL` already exists in the app and is used by the landing dashboard gateway links
- app/runtime asset references now support external-host fallback through `utils/staticContent.ts` and an external-aware favicon path in `index.html`
- `e2e/static-tier.spec.ts` now supports `PLAYWRIGHT_STATIC_CONTENT_BASE_URL` so the same spec can verify either app-origin or external static-host routing
- `.github/workflows/ci-quality-gates.yml` now makes the `web-e2e` job the explicit CI injection point for external-host verification by reading the optional GitHub Actions variable `PLAYWRIGHT_STATIC_CONTENT_BASE_URL` and mirroring it into `VITE_STATIC_CONTENT_BASE_URL`
- user confirmed the canonical public domains should be `https://ohmicaudio.com` and `https://ohmicaudiolabs.com`
- working implementation assumption: use `https://ohmicaudiolabs.com` as the primary static-content base URL and treat `https://ohmicaudio.com` as an alias or redirect unless deployment says otherwise
- `B:\ohmic\repos\ohmic-static-content\public` already contains `favicon.svg`, `ohmic-logo.svg`, `robots.txt`, `sitemap.xml`, `ai-index.json`, and `suite-index.json`
- `B:\ohmic\repos\ohmic-static-content` currently has no configured Git remote, so deployment ownership cannot be inferred from repo metadata alone
- legacy `https://ohmicaudio.netlify.app` host references were normalized on 2026-03-13 across `ohmic-static-content/public` and `content-work/reference-style`
- the static payload now points at `https://ohmicaudiolabs.com` as the working primary canonical host, while `https://ohmicaudio.com` still needs explicit alias or redirect handling in deployment
- on 2026-03-13 from this workstation, `nslookup -type=A` and `nslookup -type=AAAA` returned no public address records for either `ohmicaudiolabs.com` or `ohmicaudio.com`, so live external-host verification is not available yet from this environment

## Ready When

- the deployment owner for `ohmic-static-content` is known
- `ohmicaudiolabs.com` and `ohmicaudio.com` resolve to a reachable external host, or another reachable static endpoint is explicitly chosen for cutover verification
- the favicon/logo serving plan is explicit
- the primary-vs-alias behavior between `ohmicaudiolabs.com` and `ohmicaudio.com` is explicit in deployment/config

## Suggested Claim Scope

- `A:\ohmic-audio-labs\public`
- `A:\ohmic-audio-labs\components\Landing`
- `A:\ohmic-audio-labs\index.html`
- `A:\ohmic-audio-labs\e2e\static-tier.spec.ts`
- `B:\ohmic\repos\ohmic-static-content`
