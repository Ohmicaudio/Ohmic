Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T060435Z-30dab42d

# Scaffold Administrator Reopen Writeback Seam

## Goal

Define or scaffold the seam that writes reopen requests back into reconciled
administrator state.

## Focus

- reopen request payload
- validation
- resulting status
- audit linkage
- projection refresh

## Acceptance

- one reopen-writeback packet is explicit
- reopen behavior has a concrete runtime seam

## Result

Done. The reopen writeback seam now lives in
`tools/sync/administrator/reopen-writeback.ps1` and emits one explicit reopen
request object, one updated intake state, one reopen audit event, and the
projection refresh targets needed after acceptance.
