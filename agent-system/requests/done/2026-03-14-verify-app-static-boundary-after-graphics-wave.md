scope: project
authority: working
project: ohmic-audio-labs
status: done
requested: 2026-03-14
requester: codex-local
origin: split
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id: 20260314T104542Z-5d422f6b
topic: requested-task

# Verify app/static boundary after graphics wave

## Requested Outcome

- verify that the app-facing side still points at the canonical static surface after the current graphics and static edits
- catch any regressions in asset assumptions or link routing between `ohmic-audio-labs` and `ohmic-audio-static-content`

## Scope

- `B:\ohmic\repos\ohmic-audio-labs`
- `B:\ohmic\repos\ohmic-audio-static-content`
- `B:\ohmic\docs\migration\STATIC_POST_GRAPHICS_FINISHING_PLAYBOOK_2026-03-14.md`
- `B:\ohmic\docs\migration\STATIC_NEXT_WAVE_EXECUTION_GUIDE_2026-03-14.md`

## Completion

- checked these exact app boundary surfaces:
  - `B:\ohmic\repos\ohmic-audio-labs\utils\staticContent.ts`
  - `B:\ohmic\repos\ohmic-audio-labs\index.html`
  - `B:\ohmic\repos\ohmic-audio-labs\vite.config.ts`
  - `B:\ohmic\repos\ohmic-audio-labs\netlify.toml`
  - `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts`
- confirmed the default static base still points at `https://ohmic-audio-static-content.kzairsoft.workers.dev`
- confirmed reserved root assets and redirects still target the static host, including:
  - `/favicon.svg`
  - `/ohmic-logo.svg`
  - `/reference`
  - `/tuning`
  - `/mobile-electronics`
- verified the live static host returns `200` for:
  - `https://ohmic-audio-static-content.kzairsoft.workers.dev/favicon.svg`
  - `https://ohmic-audio-static-content.kzairsoft.workers.dev/ohmic-logo.svg`
  - `https://ohmic-audio-static-content.kzairsoft.workers.dev/reference/`
  - `https://ohmic-audio-static-content.kzairsoft.workers.dev/tuning/`
  - `https://ohmic-audio-static-content.kzairsoft.workers.dev/mobile-electronics/`
- fixed a stale Playwright expectation in `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts` so `/reference/` now expects the current `Reference` heading instead of the older `Knowledge Base` heading
- verification passed with:
  - `npm run test:e2e:static -- --project=chromium`
- residual note: the static-tier test run still logs expected `ECONNREFUSED` proxy noise for `/api` and `/__sync` because `127.0.0.1:8787` was not running, but the static boundary assertions themselves passed

## Instructions

- check app entry points that link into the static tier
- verify canonical host/path assumptions
- verify that no old app-owned static paths were silently reintroduced
- check these exact surfaces:
  - `B:\ohmic\repos\ohmic-audio-labs\utils\staticContent.ts`
  - `B:\ohmic\repos\ohmic-audio-labs\index.html`
  - `B:\ohmic\repos\ohmic-audio-labs\vite.config.ts`
  - `B:\ohmic\repos\ohmic-audio-labs\netlify.toml`
  - `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts`
- confirm the default static base still points at the current canonical static host
- confirm favicon/logo and reserved static route redirects still resolve externally

## Ready When

- checked boundary surfaces are listed
- any regressions are fixed or queued explicitly
