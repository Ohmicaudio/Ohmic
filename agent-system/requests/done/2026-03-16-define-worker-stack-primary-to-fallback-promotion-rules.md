Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Worker Stack Primary To Fallback Promotion Rules

## Goal

Define how a same-stack fallback becomes the new primary when the current task
finishes or blocks.

## Focus

- automatic promotion
- same-family preference
- verification interruption
- queue reconciliation
- operator override

## Acceptance

- one promotion packet is explicit
- worker stacks have a clean local promotion rule
Claim ID: 20260316T101338Z-c9964bc3

## Result

Defined the explicit promotion rules that let a fallback become the new primary without hidden drift.
