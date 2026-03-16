Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Worker Stack Fallback Selection Order

## Goal

Define how the worker chooses among several eligible fallback items.

## Focus

- same-family preference
- verification interruption rules
- maintenance fallback timing
- queue-refill fallback timing
- operator override

## Acceptance

- one fallback-order packet is explicit
- local fallback choice stops being ambiguous
Claim ID: 20260316T101338Z-c9964bc3

## Result

Defined the fallback selection order so blocked workers prefer same-family and adjacent support work before wandering.
