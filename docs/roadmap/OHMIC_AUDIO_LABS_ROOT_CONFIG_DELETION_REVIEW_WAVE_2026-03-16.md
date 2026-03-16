# Ohmic Audio Labs Root Config Deletion Review Wave

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Define one bounded review wave for the risky root-level config deletions in
`ohmic-audio-labs` so setup-critical files can be audited without mixing into
product cleanup.

## Files In Scope

Review only these deleted files:

- `.gitignore`
- `.env.example`
- `.github/workflows/ci-quality-gates.yml`
- `.github/workflows/index-consistency.yml`
- `.prettierignore`
- `.prettierrc`

## Why This Wave Exists

These files are operating guardrails, not casual scaffolding.

If they remain deleted without an explicit decision, the repo can lose:

- ignore boundaries for local/generated junk
- visible environment contract guidance
- CI enforcement
- formatting defaults

## Review Questions

For each file, answer only one of:

1. restore as-is
2. restore with edits
3. replace with umbrella-level or repo-level alternative
4. confirm intentional retirement

Do not use vague "probably obsolete" reasoning.

## Expected Output Per File

Each file should be assigned:

- decision
- reason
- risk if left deleted
- follow-on action

## Suggested Decision Order

### 1. `.gitignore`

Review first because it controls whether local junk re-enters source control.

### 2. `.env.example`

Review second because it communicates the operator/runtime contract.

### 3. GitHub workflows

Review third because they define CI and index consistency enforcement.

### 4. Prettier files

Review last because they are lower operational risk than ignore or CI, but
still important for contributor behavior.

## Explicit Out Of Scope

Do not mix in:

- `.claude/*`
- `.vscode/extensions.json`
- `AGENT_MEMORY/*`
- product source cleanup
- docs cleanup
- generated/runtime exhaust cleanup

Those belong to separate waves.

## Acceptance Standard

This review wave is complete when:

- the six risky root config deletions are covered explicitly
- each has a concrete keep/restore/replace/retire decision path
- the next execution packet can restore or confirm deletion without guessing

## Follow-On

The next safe execution step after this review is a root-config restore or
replacement packet, not a broad cleanup sweep.
