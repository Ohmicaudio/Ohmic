# OHMIC Security Reconciliation

Date: 2026-03-20

## Executive Summary

This pass reconciled the pasted security audit against the current live repos instead of the older pre-extraction paths.

Result:

- two low-risk secure-default fixes were applied immediately
- several high-risk firmware defaults are still real, but were left as explicit device-lane debt because changing them tonight would interfere with active transport work
- a few audit claims were stale or overstated against current code

## Fixed Today

### SEC-2026-03-20-01: administrator PowerShell calls no longer force blanket execution-policy bypass

Current code now uses `RemoteSigned` instead of `Bypass` for the local PowerShell bridge:

- `B:\ohmic\repos\ohmic-administrator\services\admin-api\src\powershellRunner.ts:1197`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api\src\queueActions.ts:173`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api\src\queueActions.ts:214`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api\src\queueActions.ts:247`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api\src\queueActions.ts:285`

Impact:

- reduces the admin app’s reliance on a blanket policy bypass for local script execution
- keeps the bounded local script bridge working for repo-local scripts

Residual note:

- this is still a local trusted execution bridge and should remain treated as high-trust operator infrastructure

### SEC-2026-03-20-02: backend CORS is no longer “reflect everything”

Current code now restricts CORS to:

- explicit allowlist via `OHMIC_ALLOWED_CORS_ORIGINS`
- localhost / loopback
- private-LAN IPv4 origins

Relevant lines:

- `B:\ohmic\repos\ohmic-audio-labs\services\backend\src\config.ts:77`
- `B:\ohmic\repos\ohmic-audio-labs\services\backend\src\config.ts:99`
- `B:\ohmic\repos\ohmic-audio-labs\services\backend\src\index.ts:202`
- `B:\ohmic\repos\ohmic-audio-labs\services\backend\src\index.ts:204`

Impact:

- removes the previous `origin: true` posture
- keeps local development and same-LAN laptop access working
- gives production a clear explicit allowlist path

Validation:

- `npm exec vitest run test/backend/corsPolicy.test.ts test/backend/supportRequestEndpoint.test.ts`
- `npm run backend:type-check`
- `npm run build`

### SEC-2026-03-20-03: browser sync no longer reads a shared key from Vite env

The browser client no longer reads `VITE_SYNC_SHARED_KEY` or sends `x-ohmic-key` directly.

Current code path:

- `B:\ohmic\repos\ohmic-audio-labs\services\CloudSync.ts:1370`
- `B:\ohmic\repos\ohmic-audio-labs\services\CloudSync.ts:1375`

Backend note updated at:

- `B:\ohmic\repos\ohmic-audio-labs\services\backend\README.md:207`

Impact:

- removes a browser-bundled shared secret path
- keeps sync auth on bearer sessions or backend-side trusted callers

Validation:

- `npm run type-check`
- `npm run build`

## Confirmed Still Real

### SEC-2026-03-20-04: firmware AP password is hardcoded

Still present:

- `B:\ohmic\repos\ohmic-audio-labs\firmware\esp32-amplab-sim\src\main.cpp:94`

And still used in runtime paths:

- `B:\ohmic\repos\ohmic-audio-labs\firmware\esp32-amplab-sim\src\main.cpp:2073`
- `B:\ohmic\repos\ohmic-audio-labs\firmware\esp32-amplab-sim\src\main.cpp:2378`
- `B:\ohmic\repos\ohmic-audio-labs\firmware\esp32-amplab-sim\src\main.cpp:2647`
- `B:\ohmic\repos\ohmic-audio-labs\firmware\esp32-amplab-sim\src\main.cpp:2686`
- `B:\ohmic\repos\ohmic-audio-labs\firmware\esp32-amplab-sim\src\main.cpp:2874`

Current assessment:

- real
- high priority
- not changed in this pass because active firmware/network work is still relying on permissive bootstrap defaults

### SEC-2026-03-20-04: firmware API auth is still disabled by default

Still present:

- `B:\ohmic\repos\ohmic-audio-labs\firmware\esp32-amplab-sim\src\main.cpp:98`

Related defaults:

- query token fallback becomes disabled when auth is enabled:
  - `B:\ohmic\repos\ohmic-audio-labs\firmware\esp32-amplab-sim\src\main.cpp:109`
  - `B:\ohmic\repos\ohmic-audio-labs\firmware\esp32-amplab-sim\src\main.cpp:110`
  - `B:\ohmic\repos\ohmic-audio-labs\firmware\esp32-amplab-sim\src\main.cpp:111`
  - `B:\ohmic\repos\ohmic-audio-labs\firmware\esp32-amplab-sim\src\main.cpp:113`
- nonce enforcement is still off by default:
  - `B:\ohmic\repos\ohmic-audio-labs\firmware\esp32-amplab-sim\src\main.cpp:117`
  - `B:\ohmic\repos\ohmic-audio-labs\firmware\esp32-amplab-sim\src\main.cpp:118`

Important nuance:

- the replay / nonce implementation exists
- it is not absent
- the risk is that the secure path is not the default path

## Audit Claims That Were Stale or Overstated

### SEC-2026-03-20-05: “administrator extraction not started”

Stale.

The extracted product repo is live and active at:

- `B:\ohmic\repos\ohmic-administrator`

### SEC-2026-03-20-06: “GitHub migration blocked”

Stale as a general claim.

Current work was pushed today to:

- `B:\ohmic\repos\ohmic-administrator`
- `B:\ohmic\repos\ohmic-audio-labs`
- `B:\ohmic`

### SEC-2026-03-20-07: “/api/devices only requires authenticated tier” needed more context

Partially true, but incomplete as stated.

Route policy:

- `B:\ohmic\repos\ohmic-audio-labs\services\backend\src\accessPolicy.ts:186`
- `B:\ohmic\repos\ohmic-audio-labs\services\backend\src\accessPolicy.ts:192`
- `B:\ohmic\repos\ohmic-audio-labs\services\backend\src\accessPolicy.ts:198`

Important current protections:

- list and record routes are owner-filtered for non-admin callers:
  - `B:\ohmic\repos\ohmic-audio-labs\services\backend\src\index.ts:2064`
  - `B:\ohmic\repos\ohmic-audio-labs\services\backend\src\index.ts:2118`
- signal reads are already `trusted` tier:
  - `B:\ohmic\repos\ohmic-audio-labs\services\backend\src\accessPolicy.ts:198`
  - `B:\ohmic\repos\ohmic-audio-labs\services\backend\src\index.ts:2150`

Current assessment:

- this area should still be reviewed during launch hardening
- but the pasted claim was stronger than the current code reality

## Lower-Priority Current Security Debt

### SEC-2026-03-20-08: design sandbox still renders raw pasted HTML

Still present:

- `B:\ohmic\repos\ohmic-audio-labs\components\DesignSandbox\StitchPreview.tsx:133`

Current assessment:

- low priority because it is a design-sandbox surface, not a production end-user lane
- still worth isolating or sanitizing before any broader exposure

## Validation Run

Administrator:

- `npm run test --workspace @ohmic/admin-api`
- `npm run type-check --workspace @ohmic/admin-api`
- `npm run build --workspace @ohmic/admin-api`

Audio Labs:

- `npm exec vitest run test/backend/corsPolicy.test.ts test/backend/supportRequestEndpoint.test.ts`
- `npm run backend:type-check`
- `npm run build`

## Recommended Next Security Packets

1. Flip firmware auth defaults to secure-by-default with explicit dev override.
2. Replace hardcoded firmware AP password with generated or environment-provided bootstrap secret.
3. Review whether device list/read routes should remain `authenticated` or move to tighter launch posture.
