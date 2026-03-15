Status: done
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard History Reset On Navigation Return Rule

## Goal

Define whether command-history expansion should reset when the user leaves the
dashboard and later returns through normal navigation.

## Focus

- navigation-return reset behavior
- relationship to state persistence
- compact default restoration

## Acceptance

- one bounded navigation-return reset packet exists
- it fits the history state reset boundary rule
- it stays lightweight and dashboard-focused
