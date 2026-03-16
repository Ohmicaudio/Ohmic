Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

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
