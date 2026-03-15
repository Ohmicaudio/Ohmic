Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T131306Z-74c4c5fb

# Define Next Backend Post-Auth Router Safe Slice

## Goal

Define the next bounded backend slice that should follow the auth and policy
control-plane family once it lands.

## Focus

- pick one coherent router or endpoint family
- keep `index.ts`, storage, websocket, and broad backend noise out unless they
  are truly required
- identify the exact tests that would verify the slice honestly

## Acceptance

- one explicit backend follow-on packet exists
- scope is narrow enough to commit cleanly
- the backend queue stays ahead of execution

## Outcome

Completed on 2026-03-15.

Result:

- defined the next backend follow-on as the sync relay session router family
- bounded it to the `/__sync/state` and `/__sync/update` route family in
  `services/backend/src/index.ts`, plus `services/backend/src/wsHub.ts` and
  `test/backend/syncRelayEndpoints.test.ts`
- chose this family because it is the only backend router lane showing live
  worktree pressure after the auth/policy slice closed cleanly
- kept support, store, device, billing, storage, and broader backend surfaces
  explicitly out of scope

## Verification

- inspected current backend worktree pressure with:
  `git status --short -- services/backend/src test/backend`
- reviewed the active sync relay diffs with:
  `git diff -- services/backend/src/wsHub.ts`
  and
  `git diff -- test/backend/syncRelayEndpoints.test.ts`
- mapped the relevant route family in:
  `services/backend/src/index.ts`

## Follow-Up

- `2026-03-15-implement-next-backend-sync-relay-router-slice.md`
