# Dynamic Memory And Coordination Proposal

This proposal describes how to make the shared memory and coordination system easier to use without weakening truth discipline.

## Goal

Keep the current model:

- source Markdown stays the authority
- memory stays horizon-based
- requests and claims stay explicit
- the DB stays retrieval-only

But make day-to-day execution lighter by reducing how many files an agent must inspect manually before becoming effective.

## Current Pain

The system is rigorous, but information is spread across many surfaces:

- `AGENTS.md`
- `instructions/`
- `memory/`
- project overlays
- `requests/`
- `jobs/`
- open questions
- resolved questions

That is acceptable for truth preservation, but heavier than it needs to be for execution.

## Proposal

### 1. Generated Per-Project Session Brief

Add one generated brief per active project:

- `B:\ohmic\generated\agent-work\projects\<project>\session-brief.md`

It should summarize:

- active work
- current blockers
- open questions
- most recent resolved questions
- active claims
- likely next actions

This is not a truth surface. It is a synthesized re-entry surface.

### 2. Machine-Readable State Mirrors

Generate lightweight JSON mirrors beside the human-readable summaries:

- `current-state.json`
- `ready-requests.json`
- `active-claims.json`
- `open-questions.json`

Use these for:

- queue polling
- session bootstrap
- DB ingestion
- future notification or watch scripts

The JSON mirrors are derived artifacts only.

### 3. Post-Task Promotion Helper

Add a helper that runs after meaningful completed work and prompts the agent to decide whether to:

- create a follow-on request
- add an open question
- add a resolved-question trace
- promote something into short-, mid-, or long-term memory
- update a project overlay

The point is not to automate judgment. The point is to reduce dropped follow-up work.

### 4. Stronger Project Overlays

Normalize project overlays so each one always answers:

- what this repo is for
- what it is not for
- current initiatives
- risky surfaces
- canonical docs
- next likely tasks

This keeps re-entry cheap and makes the DB more useful.

### 5. Normalized Claim Scope

Standardize claim type labels:

- `file`
- `folder`
- `repo-wide`
- `docs-only`
- `code-only`

This improves:

- overlap detection
- claim readability
- future queue/report generation

### 6. Environment Fingerprint

Generate a lightweight session environment note:

- shell
- cwd
- repo
- path boundary warnings
- native tool expectations

This reinforces the situational-awareness rule and reduces repeated WSL/Windows/PowerShell mistakes.

### 7. Recent-Changes Surface

Generate:

- `B:\ohmic\generated\agent-work\recent-changes.md`

It should summarize:

- recent commits across tracked repos
- recently completed requests
- newly resolved questions
- newly blocked items

This gives fast session re-entry and cross-agent awareness.

## What Should Not Change

Do not replace:

- source Markdown as authority
- memory horizons
- request and claim discipline
- project overlays
- repo inspection

Do not let generated summaries become primary truth.

## Recommended Rollout Order

### Phase 1

- generated per-project `session-brief.md`
- machine-readable state mirrors
- `recent-changes.md`

### Phase 2

- post-task promotion helper
- normalized claim scopes

### Phase 3

- environment fingerprint generation
- optional watcher/notification helpers for the human operator

## Operational Law To Preserve

The system should remain:

- additive
- inspectable
- file-backed
- local-first
- DB-indexed for retrieval
- strict about truth surfaces

## Recommendation

Adopt this proposal incrementally.

Do not pause active repo cleanup to perfect the memory system. Use the existing system now, and add the generated layers only where they clearly reduce friction.
