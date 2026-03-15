Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard History Scroll Return Anchor Rule

## Goal

Define where the user should land when expanded history must abandon a stored
scroll position and return to a safer default anchor.

## Focus

- return-anchor target
- relationship to newest visible command
- restored-context clarity

## Acceptance

- one bounded scroll-return-anchor packet exists
- it fits the history scroll restore position rule
- it stays lightweight and dashboard-focused
