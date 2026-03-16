Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Worker Stack Family Balance Rules

## Goal

Define how much a worker stack may mix families before it should be rebalanced.

## Focus

- same-family clustering
- cross-family cap
- maintenance exceptions
- queue-refill exceptions
- rebalance triggers

## Acceptance

- one family-balance packet is explicit
- worker stacks stop drifting into unrelated grab-bags
Claim ID: 20260316T101338Z-c9964bc3

## Result

Defined the family-balance rules that separate coherent worker stacks from mixed grab-bags.
