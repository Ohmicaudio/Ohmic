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
- `public/` was intentionally left in `ohmic-audio-labs` as the last transitional static payload
- `VITE_STATIC_CONTENT_BASE_URL` already exists in the app and is used by the landing dashboard gateway links
- current app code still directly references `/favicon.svg` and `/ohmic-logo.svg`
- current e2e static tests still assume static pages resolve from the app origin

## Ready When

- the static host/base URL is decided
- the deployment owner for `ohmic-static-content` is known
- the favicon/logo serving plan is explicit

## Suggested Claim Scope

- `A:\ohmic-audio-labs\public`
- `A:\ohmic-audio-labs\components\Landing`
- `A:\ohmic-audio-labs\index.html`
- `A:\ohmic-audio-labs\e2e\static-tier.spec.ts`
- `B:\ohmic\repos\ohmic-static-content`
