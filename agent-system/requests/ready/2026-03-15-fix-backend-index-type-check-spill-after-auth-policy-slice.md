Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

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
