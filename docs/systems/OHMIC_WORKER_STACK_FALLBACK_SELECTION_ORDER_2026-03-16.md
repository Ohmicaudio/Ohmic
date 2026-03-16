# Ohmic Worker Stack Fallback Selection Order

Date: 2026-03-16
Project: ohmic

## Purpose

Define the default order for choosing a fallback when the primary task blocks.

## Selection Order

1. same-family ready follow-on
2. same-project support slice that directly unblocks the lane
3. bounded verification slice tied to the touched surface
4. bounded maintenance slice with low collision risk
5. escalation

## Rule

Fallback choice should preserve context first, not maximize novelty.

The worker should not skip directly from a blocked primary into unrelated
backlog exploration.
