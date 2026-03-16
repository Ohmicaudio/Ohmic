# Ohmic Worker Stack Stale Local Task Trim Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how stale local entries should be trimmed from a worker stack.

## Stale Signals

- referenced queue task no longer exists
- local entry no longer matches the active lane
- verification or maintenance slice already became irrelevant
- fallback lost its adjacency or safety value

## Trim Rule

Trim stale local entries before adding new ones. Do not let stale stack records
quietly inflate stack depth.
