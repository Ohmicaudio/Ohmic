Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard History Reset After Deep Link Entry Rule

## Goal

Define whether entering the dashboard through a deep link or direct entry should
start history in collapsed state regardless of prior local expansion state.

## Focus

- deep-link entry behavior
- relationship to navigation-return resets
- default compact-state restoration

## Acceptance

- one bounded deep-link reset packet exists
- it fits the history reset rules
- it stays lightweight and dashboard-focused
