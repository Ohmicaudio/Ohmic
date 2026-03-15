Status: working plan
Date: 2026-03-14
Scope: cross-repo execution
Priority rule: current software completion outranks planning, hardware, and exploratory data work

# Ohmic Next 10 Hours Execution Plan

## Current Truth

This plan reflects the actual state of the codebase now, not the earlier estimate.

Already done:

- first-wave `ohmic-toolbox` app imported into `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox`
- shared toolbox math extracted into `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.ts`
- toolbox regression coverage added in `B:\ohmic\repos\ohmic-audio-labs\test\utils\toolboxMath.test.ts`
- `A:\designlab\ohmic-osm` reviewed and explicitly treated as incubation history, not the active OSM home
- `A:\designlab\ohmic-speaker-db` reviewed and explicitly treated as a crawler / ETL incubator lane, not a production database

Working assumption for this window:

- the crawl side of `ohmic-speaker-db` is far enough along that the next useful move is correlation and shaping, not more crawler work

## Main Goal

Use the next 10 hours to convert recent salvage work into reliable, reusable product surface while keeping speculative or non-blocking work parked.

## Priority Order

### 1. Software Completion Now

These tasks are the top lane because they strengthen current product code directly.

1. wire `ohmic-toolbox` into the main product surface
2. add canonical fixtures and cross-surface test vectors for shared math

### 2. Data Correlation After Software

This lane matters, but it should not preempt current app work:

3. correlate `ohmic-speaker-db` crawl output into a first governed fitment seed shape

### 3. Durability / Follow-Through

Do this when the above work lands or when a push/auth window is available:

4. push local commits and verify branch durability across affected repos

## Parallel Split

### Lane A: Product Surface

Repo:

- `B:\ohmic\repos\ohmic-audio-labs`

Task:

- expose `ohmic-toolbox` as a real product surface instead of only a nested app folder

Outputs:

- documented entrypoint
- discoverable local run path
- clear relationship to main app shell
- no root-level drift or unsafe package surgery

Task stack:

- wire `ohmic-toolbox` into the main product surface
- verify clean local run and build path for the imported app

### Lane B: Shared Math Hardening

Repo:

- `B:\ohmic\repos\ohmic-audio-labs`

Task:

- harden `utils\toolboxMath.ts` as canonical shared math for the first-wave calculators

Outputs:

- canonical fixtures
- stable input/output examples
- explicit test vectors for future consumers
- proof that future surfaces can consume the same answers

Task stack:

- add canonical fixtures and cross-surface tests
- document the shared math consumer contract for future calculator surfaces

### Lane C: Fitment Correlation

Repo:

- planning/docs in `B:\ohmic`
- source review against `A:\designlab\ohmic-speaker-db` only as harvest input

Task:

- correlate crawl output into a first fitment seed model

Outputs:

- map likely source fields to normalized fitment fields
- define confidence buckets
- define which entities we actually care about first for speakers
- do not redesign the crawler in this window

Task stack:

- inventory current crawl output artifacts
- rank initial speaker-related entities and manufacturers we actually care about
- map current fields into a fitment seed shape

## Not-To-Do List For This Window

These are low-priority current work and should stay parked unless one directly blocks the top lanes.

- OSM UI expansion
- hero page or public homepage rewrite
- hardware planning expansion
- speaker-db crawler redesign
- speaker-db repo creation
- second-wave toolbox calculators
- broad schema-repo extraction into `ohmic-schemas`
- marketing and business-ops follow-ons
- content polish unrelated to current software tasks

## Definition Of Success

The next 10 hours are successful if:

1. `ohmic-toolbox` is easier to find, run, and reason about inside `ohmic-audio-labs`
2. the first-wave formulas are clearly canonical and reusable
3. the fitment lane has a real correlation shape instead of just a crawler pile
4. the board reflects the new split instead of stale earlier tasks

## Finish Condition

At the end of this window, we should be able to say:

- current software work stayed on top
- the shared math core is not just extracted but stabilized
- speaker-db work advanced from “crawler exists” to “data can be correlated”
- nothing important was lost in vague backlog language
