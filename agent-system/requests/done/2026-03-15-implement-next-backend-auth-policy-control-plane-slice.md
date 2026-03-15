Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T130425Z-c7ce9c16

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

## Outcome

Completed on 2026-03-15.

Result:

- the auth/policy control-plane family was already present on the current
  branch, so this pickup validated and closed the bounded slice rather than
  inventing a fake code diff
- the scoped files and tests align with the planned backend control-plane slice
- targeted backend verification passed for the exact slice test set
- the broader `backend:type-check` command still fails in
  `services/backend/src/index.ts`, which was explicitly out of scope for this
  task and should be treated as the next backend type-check cleanup lane rather
  than as a failure of the auth/policy slice itself

## Verification

- passed:
  `npm run test -- --run test/backend/accessPolicyAndDiagnostic.test.ts test/backend/featureGatePolicy.test.ts test/backend/oidcAuthEndpoints.test.ts test/backend/oidcProvidersEndpoint.test.ts test/backend/sessionTokenValidation.test.ts test/backend/syncRelayAuth.test.ts`
  - result: `6` files passed, `24` tests passed
- failed outside the slice:
  `npm run backend:type-check`
  - result: TypeScript error in `services/backend/src/index.ts` at the support
    issue bridge callsite, caused by `category` being widened to `string |
    undefined`

## Follow-Up

- `2026-03-15-fix-backend-index-type-check-spill-after-auth-policy-slice.md`
