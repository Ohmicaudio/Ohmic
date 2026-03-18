Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Burst Generation Family Batching Rules

## Goal

Define how burst generation should batch child packets by initiative or task family.

## Focus

- family grouping
- mixed-family limits
- same-family reserve counts
- active-worker alignment
- batch size guidance

## Acceptance

- one family-batching packet is explicit
- burst refills become coherent family bundles instead of scattered one-offs
Claim ID: 20260316T102232Z-f0698b6a

## Result

Defined the family-batching rules so burst generation produces a bounded, coherent packet wave instead of random singles.
