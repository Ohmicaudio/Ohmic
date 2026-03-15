Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Backend Next Control Plane Safe Slice

## Purpose

Define the next bounded backend slice after the already-landed measurement
capture family.

## Recommended Next Slice

Take an auth and policy control-plane slice rather than reopening the whole
backend service surface.

This slice should focus on policy, entitlement, and auth logic, not registry,
design-state, support, or broad router/index churn.

## Exact Candidate Files

### Primary source files

- `services/backend/src/accessPolicy.ts`
- `services/backend/src/auth.ts`
- `services/backend/src/featureGatePolicy.ts`
- `services/backend/src/syncRelayAuth.ts`

### Primary test files

- `test/backend/accessPolicyAndDiagnostic.test.ts`
- `test/backend/featureGatePolicy.test.ts`
- `test/backend/oidcAuthEndpoints.test.ts`
- `test/backend/oidcProvidersEndpoint.test.ts`
- `test/backend/sessionTokenValidation.test.ts`
- `test/backend/syncRelayAuth.test.ts`

## Why This Slice Next

- these files form one coherent control-plane family
- they are cleaner than bundling `index.ts`, registry, feature data, and
  websocket plumbing together
- they have a clearer verification surface than broad backend churn
- they keep the backend lane moving without pretending the whole service stack
  can be cleaned in one pass

## Explicitly Out Of Scope

- `services/backend/src/index.ts`
- `services/backend/src/deviceRegistry.ts`
- `services/backend/src/featureData.ts`
- `services/backend/src/types.ts`
- `services/backend/src/wsHub.ts`
- `services/backend/src/designData.ts`
- `services/backend/src/contractsManifest.ts`
- `services/backend/src/osmData.ts`
- `services/backend/src/supportIssueBridge.ts`
- `services/backend/sql/001_device_registry.sql`
- `services/backend/storage/*`
- `services/backend/dist/`
- `services/backend/node_modules/`
- `services/backend/tools/__pycache__/`
- `services/backend/tools/generate_chirp_fixture.py`
- `services/backend/tools/verify_chirp_fixture.py`
- `services/backend/package.json`
- `services/backend/package-lock.json`
- `services/backend/tsconfig.json`

## Verification

For the eventual implementation slice, use:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
npm run backend:type-check
npm run test -- --run \
  test/backend/accessPolicyAndDiagnostic.test.ts \
  test/backend/featureGatePolicy.test.ts \
  test/backend/oidcAuthEndpoints.test.ts \
  test/backend/oidcProvidersEndpoint.test.ts \
  test/backend/sessionTokenValidation.test.ts \
  test/backend/syncRelayAuth.test.ts
```

## Finish Condition

- the backend lane has one clean next executable slice
- broad `index.ts` and storage/tool noise are kept out
- the next ready task can point at one explicit control-plane implementation
  family
