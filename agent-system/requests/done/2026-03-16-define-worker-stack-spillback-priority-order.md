Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Worker Stack Spillback Priority Order

## Goal

Define the exact priority order used when several local stack items are
eligible for spillback.

## Focus

- stale-first behavior
- cross-family fallback trimming
- same-family reserve reduction
- protected slot exceptions
- operator-pinned item handling

## Acceptance

- one spillback-priority packet is explicit
- overflow trimming order becomes deterministic instead of ad hoc
Claim ID: 20260316T101338Z-c9964bc3

## Result

Defined the spillback order that sheds stale maintenance and low-value local work before protected stack entries.
