# Ohmic Audio Labs Tracked Root Deletion Intent Classification

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Classify the tracked root-level deletions in `ohmic-audio-labs` so intentional
cleanup, accidental churn, and risky operating-boundary removals stop living in
one pile.

## Scope

This packet covers the current tracked root deletions under:

- `.gitignore`
- `.env.example`
- `.github/workflows/*`
- `.claude/*`
- `.prettier*`
- `.vscode/*`
- `AGENT_MEMORY/*`

## Core Rule

Root deletions should be grouped by operating role, not by filesystem
proximity.

The key question is not "was it deleted?" but "what system behavior disappears
if it stays deleted?"

## Intent Buckets

### 1. High-Risk Operating Guardrail Deletions

These should not be treated as casual cleanup:

- `.gitignore`
- `.env.example`
- `.github/workflows/ci-quality-gates.yml`
- `.github/workflows/index-consistency.yml`
- `.prettierignore`
- `.prettierrc`

Why high risk:

- `.gitignore` defines what local/generated junk stays out of source control
- `.env.example` is the visible runtime/config contract for new operators
- GitHub workflows define CI enforcement and index freshness checks
- Prettier files define repository formatting behavior

Intent read:

- unclear or risky if left deleted without an explicit replacement decision

Required next step:

- dedicated restore-or-replace review wave

### 2. Likely Intentional Per-Repo AI Or Editor Scaffolding Retirements

These look more like local or superseded repo-scaffold removal:

- `.claude/settings.json`
- `.claude/settings.local.json`
- `.vscode/extensions.json`
- `AGENT_MEMORY/README.md`
- `AGENT_MEMORY/architecture_notes.md`
- `AGENT_MEMORY/known_issues.md`
- `AGENT_MEMORY/recent_tasks.md`

Why they read differently:

- `AGENT_MEMORY/*` overlaps conceptually with the umbrella-level
  `B:\\ohmic\\agent-system\\memory\\*` system
- `.claude/*` reads like tool-specific local policy rather than product source
  truth
- `.vscode/extensions.json` is recommendation-level editor guidance, not a core
  runtime control file

Intent read:

- likely deliberate retirement or consolidation
- still worth explicit confirmation, but not the same risk class as deleting
  `.gitignore` or CI workflows

Required next step:

- confirm deprecation and, if desired, archive rationale in one small note

### 3. Mixed Boundary Deletions Needing Explicit Decision Before Execution

Some deleted files are small, but their role is still operational enough that
they should not ride inside the low-risk bucket automatically:

- `.env.example`
- `.prettierignore`
- `.prettierrc`

Why called out again:

- they are smaller than CI or `.gitignore`, but still shape repo behavior for
  developers
- if they are being intentionally retired, the replacement path should be named

Intent read:

- likely part of a broader normalization sweep
- not safe to assume permanent deletion without operator confirmation

## Classification Summary

### Probably Intentional Consolidation

- `.claude/*`
- `.vscode/extensions.json`
- `AGENT_MEMORY/*`

### Needs Explicit Restore-Or-Replace Review

- `.gitignore`
- `.env.example`
- `.github/workflows/*`
- `.prettier*`

## Recommended Next Review Order

1. root config and CI deletion review
   - `.gitignore`
   - `.env.example`
   - `.github/workflows/*`
   - `.prettier*`
2. confirm retirement of per-repo AI/editor scaffolding
   - `.claude/*`
   - `.vscode/extensions.json`
   - `AGENT_MEMORY/*`

## Outcome

The root deletion wave is now split into:

- risky operating-boundary removals that need review
- likely intentional scaffolding retirements that only need confirmation

That makes the next restore or cleanup wave obvious instead of guessy.
