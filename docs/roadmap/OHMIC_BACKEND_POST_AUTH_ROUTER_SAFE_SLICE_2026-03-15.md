Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Backend Post-Auth Router Safe Slice

## Purpose

Define the next bounded backend router family after the auth/policy slice and
the support-intake type-spill fix.

## Recommended Next Slice

Take the sync relay session router family next.

This is the strongest truthful follow-on slice because:

- the current backend worktree pressure is concentrated in
  `services/backend/src/wsHub.ts`
- the live backend test pressure is concentrated in
  `test/backend/syncRelayEndpoints.test.ts`
- the core route family in `services/backend/src/index.ts` is already bounded to
  `/__sync/state` and `/__sync/update`
- it stays narrower than reopening support, store, device registry, or broader
  backend platform surfaces

## Exact Candidate Files

### Primary source files

- `services/backend/src/index.ts`
  - only the `/__sync/state` and `/__sync/update` route family
- `services/backend/src/wsHub.ts`

### Primary test files

- `test/backend/syncRelayEndpoints.test.ts`

## Why This Slice Next

- it is the only backend router family showing real current worktree pressure
- it has one clear verification target
- it follows the already-landed auth/policy work naturally without mixing in
  support triage or admin/auth control-plane churn
- it can absorb the `physicalDeviceId` handshake update and multi-device relay
  merge behavior as one coherent session-relay packet

## Explicitly Out Of Scope

- `services/backend/src/auth.ts`
- `services/backend/src/accessPolicy.ts`
- `services/backend/src/featureGatePolicy.ts`
- `services/backend/src/syncRelayAuth.ts`
- support intake and triage endpoints
- store/community/billing router families
- device registry and manufacturer settings routes
- measurement capture and analysis routes outside sync relay merging
- `services/backend/storage/*`
- `services/backend/dist/`
- `services/backend/node_modules/`

## Verification

For the eventual implementation slice, use:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
npm run backend:type-check
npm run test -- --run test/backend/syncRelayEndpoints.test.ts
```

## Finish Condition

- the next backend pickup starts from one named sync relay packet
- the packet stays bounded to the relay/router family
- unrelated backend lanes stay fenced out
