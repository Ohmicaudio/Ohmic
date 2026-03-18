Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Worker Stack Stale Local Task Trim Rules

## Goal

Define how stale or no-longer-relevant local stack items should be trimmed.

## Focus

- stale age
- superseded task removal
- blocked fallback trimming
- auditability
- safe spillback

## Acceptance

- one stale-trim packet is explicit
- local stacks stop carrying dead weight too long
Claim ID: 20260316T101814Z-dc6366f5

## Result

Defined the stale-local-task trim rules so obsolete stack entries do not quietly inflate depth.
