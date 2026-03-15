Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement Next Backend Auth Policy Control Plane Slice

## Goal

Implement the next bounded backend slice as the auth and policy control-plane
family.

## Use

- `docs/roadmap/OHMIC_BACKEND_NEXT_CONTROL_PLANE_SAFE_SLICE_2026-03-15.md`

## Scope

- `services/backend/src/accessPolicy.ts`
- `services/backend/src/auth.ts`
- `services/backend/src/featureGatePolicy.ts`
- `services/backend/src/syncRelayAuth.ts`
- `test/backend/accessPolicyAndDiagnostic.test.ts`
- `test/backend/featureGatePolicy.test.ts`
- `test/backend/oidcAuthEndpoints.test.ts`
- `test/backend/oidcProvidersEndpoint.test.ts`
- `test/backend/sessionTokenValidation.test.ts`
- `test/backend/syncRelayAuth.test.ts`

## Acceptance

- one bounded backend control-plane family lands
- `index.ts`, registry, feature-data, websocket, storage, and tool noise stay
  out
- verification is recorded honestly with the listed backend checks
