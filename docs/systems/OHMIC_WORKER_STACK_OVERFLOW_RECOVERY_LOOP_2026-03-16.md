# Ohmic Worker Stack Overflow Recovery Loop

Date: 2026-03-16
Project: ohmic

## Purpose

Define the bounded loop a worker should run when its stack is too deep.

## Recovery Loop

1. stop adding new stack entries
2. identify the lowest-value spillback candidate
3. preserve primary and only-safe fallback entries
4. spill back one item
5. re-check stack depth and family count
6. repeat only until back inside policy

## Rule

Overflow recovery should converge quickly. If it cannot, escalate instead of
mutating the stack forever.
