# Ohmic Gemini Onboarding And Evaluation Rules

Date: 2026-03-16
Status: working design

## Purpose

Define how Gemini should be onboarded into the Ohmic system through bounded
real work, with explicit context control, correctness checks, and trust earned
through repetition.

## Working Assumption

Gemini can be useful if task shape is controlled.

Do not assume:

- broad repo judgment
- good priority selection
- safe queue reshaping
- reliable mixed-surface editing

Assume:

- bounded tasks can work
- verification matters more than confidence
- trust must be earned in live context

## Folder Rule

Gemini CLI should be launched from the folder that should act as its working
context for that run.

That means:

- launch from the repo or project root you want it to reason about
- keep each run scoped to one intended work area
- do not mix several unrelated repos into one Gemini session unless that is the
  actual task

If a task is for `B:\ohmic`, run from `B:\ohmic`.

If a task is for a child repo, run from that child repo unless the task is
explicitly umbrella-level.

## File Output Rule

Treat Gemini as writing into the current working task surface unless the prompt
explicitly names another destination.

Do not let it improvise output destinations.

## Initial Trust Tier

Gemini starts at:

- trust tier: fresh
- max active claims: `1`
- preferred stack depth: `2`
- max stack depth: `3`

## Allowed First Tasks

Good first task families:

- bounded doc packets
- schema-definition tasks
- verification note drafting from real output
- low-risk queue follow-ons
- narrow cleanup with exact file boundaries

## Avoid First

Do not start Gemini with:

- orchestration
- broad prioritization
- multi-surface commits
- ambiguous product naming
- large refactors
- queue reshaping
- public trust copy without review

## Context Control Rule

For each Gemini task:

- one repo or one coherent umbrella surface
- explicit file list when possible
- explicit acceptance checks
- explicit verification requirement
- explicit fallback if blocked

Do not test Gemini with chaos and then blame it for chaos.

## Evaluation Standard

Score Gemini on:

- correctness
- scope discipline
- verification honesty
- reopen/rework rate
- ability to stay within named boundaries

Do not score it mainly on speed or verbosity.

## Three-Pass Onboarding Shape

### Pass 1: Bounded Documentation

Goal:

- prove it can follow task shape and file boundaries

### Pass 2: Verification Packet

Goal:

- prove it can report reality from tests/builds without inventing success

### Pass 3: Narrow Implementation Slice

Goal:

- prove it can change one bounded surface and verify it honestly

Only after those passes should Gemini receive larger grouped packets.

## Review Rule

After each initial task:

- review result
- log reopen or correction
- note what context was missing
- tighten or widen the next packet accordingly

## Outcome Standard

If onboarding is working, Gemini becomes a real bounded worker instead of a
fresh model pretending to be trusted.
