Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T013136Z-b9a1b70c

# Implement Handset Live Device Candidate Parity Wave

## Goal

Execute the next parity packet so the handset/browser path receives the same
usable live-device candidates and linked/current-device presentation as the
desktop/browser path.

## Source

- `docs/roadmap/OHMIC_POST_LINK_LIVE_PATH_PARITY_WAVE_2026-03-15.md`

## Focus

- handset live-device candidate propagation
- linked/current-device presentation parity
- shell and deck readiness parity
- desktop and handset rerun expectations

## Acceptance

- the remaining parity gap is narrower than generic network debugging
- desktop and handset expectations are aligned
- targeted regression coverage travels with the parity fix

## Result

- propagated already-known live device candidates through shared sync presence
  so handset/browser discovery can consume the same usable AmpLab endpoint list
  as desktop/browser instead of relying only on local fallback candidates
- updated `useAmpLabDiscoveryPlane` to prefer peer-shared device candidates
  before local host/IP sweep fallbacks
- verified:
  - `npx vitest run test/components/AmpLabDiscoveryTelemetryHooks.test.tsx`
  - `npm run backend:type-check`
  - `npx playwright test e2e/amplab-shell.spec.ts`
