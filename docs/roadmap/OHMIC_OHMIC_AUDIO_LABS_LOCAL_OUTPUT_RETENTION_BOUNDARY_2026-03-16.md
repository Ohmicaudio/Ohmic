Status: implementation_packet
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Audio Labs Local Output Retention Boundary

## Purpose

Define how long local runtime output in `ohmic-audio-labs` should be kept,
moved, or purged so useful short-term evidence survives without turning into
permanent repo dirt.

## Scope

Retention boundary applies to:

- `captures/*`
- `output/*`
- `services/backend/storage/measurement-captures/*`

This boundary does not apply to tracked source or tracked support fixtures.

## Retention Classes

### 1. Session-Disposable

Meaning:

- safe to purge after the immediate debugging or review session

Examples:

- ad hoc captures created only for one manual check
- throwaway export folders under `output/*`

### 2. Short-Term Evidence

Meaning:

- keep temporarily because it may support debugging, measurement comparison, or
  user follow-up
- should not remain in the repo indefinitely

Examples:

- recent backend measurement captures
- recent manual comparison captures tied to a bug or smoke run

### 3. Durable Fixture Candidate

Meaning:

- useful enough to promote into a deliberate fixture or sample artifact
- should move into a named source-controlled or local-only fixture location

Examples:

- one representative capture set used for recurring verification
- one stable measurement sample supporting a known workflow

## Default Rules

### `captures/*`

Default:

- short-term evidence

Rule:

- keep only while it is supporting an active measurement or debugging loop
- promote only named representative captures

### `output/*`

Default:

- session-disposable

Rule:

- purge once the immediate review loop ends unless a specific artifact is named
  for retention

### `services/backend/storage/measurement-captures/*`

Default:

- short-term evidence

Rule:

- keep long enough for smoke review or backend verification follow-up
- do not let it accumulate indefinitely in ambient repo status

## Promotion Rule

If runtime output needs to survive beyond the short-term window, it must be
explicitly promoted as one of:

- durable fixture
- named sample
- local-only retained evidence

Unlabeled accumulation is not retention policy.

## Purge Rule

Purge is safe when:

- the session or debugging loop is complete
- no active task or open bug depends on the files
- the artifact has not been promoted to a fixture or named retained sample

## Boundary

This packet defines retention classes only.

It does not define the relocation path. That belongs to the relocation
boundary.
