Date: 2026-03-15
Status: working
Project: ohmic

# Ohmic Shared System Canonical Control Surfaces

## Purpose

Reduce coordination confusion by making the role of each live surface explicit.

The goal is not to delete useful surfaces.

The goal is to stop them from competing for authority.

## Canonical Roles

### 1. Queue Truth

Canonical surfaces:

- `agent-system/requests/*`
- `agent-system/jobs/*`

Meaning:

- requests are the actionable queue
- jobs are the active lock and execution layer

If a board doc disagrees with request or job files, the queue wins.

### 2. Memory Truth

Canonical surfaces:

- `agent-system/memory/short-term.md`
- `agent-system/memory/mid-term.md`
- `agent-system/memory/long-term.md`

Meaning:

- these files carry horizon context
- they are not task locks
- they are not substitutes for repo inspection

### 3. Generated State

Canonical role:

- derived convenience only

Surfaces:

- `generated/agent-work/*`

Meaning:

- useful for fast pickup
- not authoritative
- must be treated as stale if validation has not run after manual edits

### 4. Roadmap And Board Docs

Canonical role:

- orientation and orchestration

Surfaces:

- `docs/roadmap/*`
- `docs/systems/*`

Meaning:

- these docs explain the current operating model
- they should point to the queue
- they should not become a second hidden queue

### 5. Repo Truth

Canonical role:

- actual implementation truth

Surfaces:

- active repo files under `B:\ohmic\repos\*`

Meaning:

- no shared doc outranks inspected repo state for implementation facts

## Practical Rules

### Rule A

If work is actionable, it belongs in `requests/` first.

### Rule B

If work is actively being edited, it needs a claim in `jobs/active/`.

### Rule C

If a roadmap doc invents tasks that are not mirrored in `requests/`, the queue
is incomplete and should be repaired.

### Rule D

If generated state disagrees with source files, source files win and validation
or refresh should follow.

### Rule E

If memory and repo truth disagree, repo truth wins and memory should be updated.

## Simplification Standard

The shared system is simplified enough when:

- agents can tell where to look for truth without guessing
- board docs guide work instead of shadowing it
- generated state accelerates pickup instead of creating false certainty
