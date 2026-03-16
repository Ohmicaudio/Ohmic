Status: planned_wave
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Live Link Failure Classification And Route Truth Wave

## Purpose

Make live-link diagnostics stop flattening distinct failure modes into one vague
`device_not_reachable` result.

## Why This Exists

The current observation packet proved multiple different failure surfaces:

- Windows host direct LAN probe failure
- non-routable device AP target from the current host context
- WSL-only `No route to host` behavior for the LAN device
- backend proxy collapse into one `device_not_reachable` response

That is enough evidence to justify a dedicated diagnostic clarification wave.

## Included Outputs

- `B:\ohmic\agent-system\requests\done\2026-03-16-improve-live-link-failure-classification-and-route-truth-wave.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-split-live-link-proxy-failures-into-timeout-route-and-unreachable-buckets.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-surface-probe-origin-and-host-context-in-live-link-diagnostics.md`

## Unified Outcome

Future smoke reruns should be able to tell the difference between:

- timeout
- unroutable host context
- non-joined device AP
- backend availability
- live device refusal or absence

## Implementation

- `B:\ohmic\repos\ohmic-audio-labs\services\backend\src\index.ts`
  now classifies proxy failures into:
  - `device_probe_timeout`
  - `device_probe_route_unreachable`
  - `device_ap_context_required`
  - `device_probe_connection_refused`
  - `device_probe_unreachable`
- the proxy response now includes:
  - `legacyError: "device_not_reachable"` for compatibility
  - `routeTruth`
  - `diagnostics.targetHost`
  - `diagnostics.targetContext`
  - `diagnostics.localSubnetMatch`
  - `diagnostics.likelyDeviceApContextRequired`
  - `diagnostics.probeOrigin` with backend platform, request host hint, request host IP, preferred IP, and local IP list
- added backend regression coverage in
  `B:\ohmic\repos\ohmic-audio-labs\test\backend\liveLinkProxyDiagnostics.test.ts`

## Verification

- `npx vitest run test/backend/liveLinkProxyDiagnostics.test.ts`
  - passed: `1` file, `3` tests
- `npm run backend:test`
  - passed: `19` files, `53` tests
