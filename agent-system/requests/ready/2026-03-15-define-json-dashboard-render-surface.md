Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define JSON Dashboard Render Surface

## Goal

Define the first minimal user-facing page or surface that would render the live
JSON agent state loop without turning the system into a full app rewrite.

## Focus

- one minimal read/write dashboard surface
- where `state`, `inbox`, and `response` should appear
- what stays JSON-only vs what needs human-friendly rendering

## Acceptance

- one bounded dashboard packet exists
- it fits the JSON loop model already queued
- it stays lower priority than the current product implementation slices
