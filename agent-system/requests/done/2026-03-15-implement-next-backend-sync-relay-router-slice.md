Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T131603Z-e0fa10f6

# Implement Next Backend Sync Relay Router Slice

## Goal

Commit the next bounded backend router slice around the sync relay session
family.

## Use

- `docs/roadmap/OHMIC_BACKEND_POST_AUTH_ROUTER_SAFE_SLICE_2026-03-15.md`

## Scope

- `services/backend/src/index.ts`
  - only the `/__sync/state` and `/__sync/update` family
- `services/backend/src/wsHub.ts`
- `test/backend/syncRelayEndpoints.test.ts`

## Out Of Scope

- auth/policy files already verified
- support/store/community/billing/device router families
- storage, dist, node_modules, and backend tool noise

## Verification

- `npm run backend:type-check`
- `npm run test -- --run test/backend/syncRelayEndpoints.test.ts`

## Acceptance

- one bounded sync relay router family lands
- the `physicalDeviceId`/multi-device relay behavior is captured without
  widening into unrelated backend work
- verification is recorded honestly from the Windows shell

## Outcome

Completed on 2026-03-15.

Result:

- landed the bounded sync relay family by extending the websocket peer handshake
  to preserve an optional `physicalDeviceId`
- strengthened the sync relay regression coverage with the multi-device run
  merge scenario in `test/backend/syncRelayEndpoints.test.ts`
- no `index.ts` code change was needed because the existing `/__sync/state` and
  `/__sync/update` route family already supported the exercised merge behavior

## Verification

- passed: `npm run backend:type-check`
- passed: `npm run test -- --run test/backend/syncRelayEndpoints.test.ts`

