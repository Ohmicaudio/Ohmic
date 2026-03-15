Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T130903Z-4f2b7ad9

# Fix Backend Index Type-Check Spill After Auth Policy Slice

## Goal

Fix the backend type-check failure that remained after the bounded auth/policy
control-plane slice verified cleanly.

## Scope

- `services/backend/src/index.ts`
- any directly required shared type file if needed for the narrow fix

## Out Of Scope

- auth/policy file churn already verified in the previous slice
- registry, storage, websocket, or tool cleanup
- broad backend refactors

## Verification

- `npm run backend:type-check`

## Acceptance

- the `category` typing mismatch at the support issue bridge path is resolved
- the fix stays bounded to the backend index/support-bridge typing edge
- no unrelated backend cleanup gets folded into the slice

## Outcome

Completed on 2026-03-15.

Result:

- fixed the backend support-intake callsite by reusing the existing support
  field normalizers from `featureData.ts` instead of passing raw request-body
  strings into stricter support record types
- exported the existing support normalizers and applied them to
  `category`, `severity`, `issue_kind`, and `app_surface` at the `index.ts`
  boundary before calling `appendSupportRequestRecord`
- kept the change bounded to the support issue bridge typing edge without
  reopening broader backend lanes

## Verification

- passed: `npm run backend:type-check`
- passed: `npm run test -- --run test/backend/supportRequestEndpoint.test.ts`

