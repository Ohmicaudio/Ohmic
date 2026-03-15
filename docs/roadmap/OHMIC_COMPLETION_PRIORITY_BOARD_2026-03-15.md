scope: system
status: working_plan
updated: 2026-03-15

# Ohmic Completion Priority Board

## Purpose

Define the current completion-first work order across `B:\ohmic` and all active
child repos.

This is not a dream roadmap.

This is the current practical split board for getting the ecosystem into a more
finished, trustworthy state.

## Current Reality

### Highest completion pressure

- `B:\ohmic\repos\ohmic-audio-labs`

Reason:

- extremely dirty worktree
- broad active implementation surface
- largest risk of drift, loss, or unfinished user-facing behavior
- still the center of gravity for software revenue and product value

### Medium completion pressure

- `B:\ohmic`
- `B:\ohmic\repos\ohmic-audio-static-content`

Reason:

- umbrella repo still carries planning, queue, and decision durability
- static-content repo still needs disciplined finishing passes and remote
  durability

### Lower completion pressure

- `B:\ohmic\repos\amplab-firmware`
- `B:\ohmic\repos\cyd-remote`
- `B:\ohmic\repos\hardware-specs`

Reason:

- comparatively calmer repo state
- fewer immediate finish risks than the main software lane

## Top-Level Priority Order

### Priority 1: Stabilize and complete `ohmic-audio-labs`

This is the main completion lane.

Work here should outrank nearly everything else unless:

- a schema or queue failure would corrupt multiple repos
- a deployment blocker is preventing current software from shipping

### Priority 2: Keep `Ohmic` honest

The umbrella repo should reflect reality:

- queue state
- memory state
- active claims
- decision notes
- completion board

### Priority 3: Finish static-content follow-through only when it directly
supports current software completion

Do not let graphics/content polish outrank product completion unless it is
actively blocking delivery.

### Priority 4: Firmware and hardware stay warm, but do not dominate current
execution unless a specific blocker appears

## Split-Ready Task Board

## Current Ready Queue

### Mandatory-first execution slices

Do these first unless they are already actively claimed or truly blocked.

- `fix-backend-index-type-check-spill-after-auth-policy-slice`
- `commit-osm-canvas-theme-token-slice`
- `enforce-public-and-archive-freeze-boundary-in-handoff-and-queue-surfaces`

Rule:

- do not pick safer editorial, support, or polish work while any of these
  lanes are sitting open and unblocked
- if an agent skips one of these lanes, they should record the blocker rather
  than silently drifting to easier work

### Secondary completion support

- `define-next-backend-post-auth-router-safe-slice`
- `define-next-osm-post-canvas-safe-slice`
- `define-live-agent-state-json-contract`
- `define-agent-inbox-outbox-event-model`
- `define-orchestrator-lock-and-worker-heartbeat-model`
- `define-stable-idle-stop-and-crash-recovery-rules`
- `define-runner-wrapper-cycle-for-json-agent-loop`
- `define-json-dashboard-render-surface`

These support the main completion lane but should not outrank it.

### Lower-priority public cleanup

- site audit cleanup bundle remains valid, but it stays below the current app
  and system lanes unless it directly blocks trust or deployment

Rule:

- these are valid tasks, but they are not acceptable substitutes for the
  mandatory-first app lanes while those lanes are open

### Queue Floor Rule

- keep at least `4` executable ready tasks available
- if the board drops under that floor, replenish it before drifting to unrelated
  work

## Horizon Links

- immediate post-error-reporting burst:
  - `docs/roadmap/OHMIC_POST_ERROR_REPORTING_20_MINUTE_QUEUE_2026-03-15.md`
- next 72 hours:
  - `docs/roadmap/OHMIC_NEXT_72_HOURS_EXECUTION_LADDER_2026-03-15.md`

## A. `ohmic-audio-labs` Completion Board

### A1. Lock the toolbox wave

Priority: now

Why:

- recent work landed here
- shared math is becoming real product surface
- this is a clean software-first completion lane

Tasks:

- keep `Ohm's Law`, `Cone Area`, and `Acoustic Gain` behavior stable
- avoid formula drift from shared math
- keep the current toolbox surface documented cleanly enough for pickup

Current state:

- recent toolbox extraction and shared-math slices are now committed and pushed
- the next risk is no longer missing implementation; it is drift and silent
  regression

Split:

- one person on toolbox implementation
- one person on verification/docs only if needed

### A2. Define the smarter `Wiring Lab` implementation packet

Priority: now

Why:

- product value is high
- user explicitly called out this gap
- the rules now exist and should become implementation guidance

Tasks:

- convert amp-match rules into an implementation packet
- define exact UI states and result classes
- define safe/awkward/unsafe wording
- define first supported amplifier target presets

Split:

- product/rules packet
- later UI implementation packet

### A3. Triage and isolate the giant dirty worktree

Priority: now

Why:

- this is the biggest ecosystem risk
- too much unfinished work is mixed together

Tasks:

- inventory broad dirty areas by domain
- separate active product work from archive/churn
- identify which surfaces are safe to commit next
- identify which surfaces need freezing instead of more edits

Split:

- runtime/app surfaces
- Android wrapper surfaces
- hardware/control UI surfaces
- archive/legacy/doc surfaces

### A4. Protect the main app/runtime path

Priority: now

Why:

- software funds everything else

Tasks:

- verify main app routes still work after toolbox/product additions
- verify no current product-critical surfaces are silently regressing
- identify minimum trusted checks for current app/runtime

Split:

- product route smoke checks
- critical workflow sanity checks

### A5. Decide how toolbox graduates into public surfaces

Priority: next

Why:

- `Ohm's Law` is now the first standalone candidate
- this needs a clean path before more extraction churn starts

Tasks:

- define route strategy for first standalone extraction
- define CTA flow back into toolbox/app
- define copy/SEO role

## B. `Ohmic` Umbrella Completion Board

### B1. Keep the queue truthful

Priority: now

Why:

- this system falls apart when the queue lies

Tasks:

- close done tasks immediately
- do not leave stale ready-path deletions unstaged
- keep active claims visible
- keep ready list small and real

### B2. Keep memory limited to survival truths

Priority: now

Why:

- overgrown memory becomes noise

Tasks:

- keep only durable immediate truths in short/mid-term memory
- avoid stuffing chat residue into memory
- keep repo-root and priority truths alive

### B3. Turn finished decisions into implementation packets

Priority: next

Why:

- design notes are only half-finished work

Tasks:

- convert completed product notes into actionable packets
- especially for `Wiring Lab`
- and for first standalone extraction

## C. `ohmic-audio-static-content` Completion Board

### C1. Push and verify the current clean local static-content slice

Priority: now if still unpushed

Why:

- unfinished local-only work is risk

Tasks:

- ensure the latest local static-content cleanup is remote
- keep repo state clean

Current state:

- `ohmic-audio-static-content` is currently clean but still ahead of
  `origin/main` by one commit
- this remains a real durability task, not a hypothetical one

### C2. Only do blocker-level content work

Priority: next

Why:

- polish can swallow days

Tasks:

- only continue if it directly supports current software completion
- avoid reopening broad graphics waves without a hard reason

### C3. Preserve the speaker-content boundary

Priority: next

Why:

- loudspeaker pages can easily turn into duplicate database chaos

Tasks:

- keep data lane and content lane separate
- do not mass-generate pages from raw data

## D. Loudspeaker Data Lane

### D1. Finish the grouped-field parser prototype

Priority: done

Why:

- the parser proof and sample normalized packet now exist

Tasks:

- preserve the current proof without widening into mass extraction

### D2. Stop before mass extraction

Priority: now

Why:

- premature conversion will create junk data

Tasks:

- no bulk import yet
- no broad page generation yet
- no image scraping surge yet

### D3. Build the first normalized seed shape only after parser proof

Priority: partial

Tasks:

- keep the sample normalized packet as the current trusted seed
- do not treat the seed packet as license for broad import yet
- only widen this lane when the main software completion pressure is lower

## E. `amplab-firmware`

### E1. Preserve contract integrity

Priority: keep warm

Tasks:

- do not allow schema drift
- keep docs and contracts aligned with canonical source

### E2. Avoid random side work

Priority: keep warm

Tasks:

- only take firmware work that is clearly blocking app/runtime progress or
  contract stability

## F. `cyd-remote`

### F1. Keep it stable

Priority: keep warm

Tasks:

- treat bring-up truth as settled unless a real bug appears
- avoid unnecessary churn

### F2. Only do documentation and contract hygiene when needed

Priority: keep warm

## G. `hardware-specs`

### G1. Continue as planning only

Priority: low

Why:

- software completion still outranks hardware expansion

Tasks:

- collect research
- define requirements and module packets
- do not let hardware planning consume prime software time

## Best Split For Multiple People

### Person 1

- `ohmic-audio-labs` implementation
- toolbox
- `Wiring Lab` packet

### Person 2

- `ohmic-audio-labs` verification and worktree triage
- runtime/app smoke checks
- Android/runtime cleanup inventory

### Person 3

- loudspeaker parser prototype
- data-lane documentation
- static/data boundary enforcement

### Person 4

- umbrella queue/memory hygiene
- decision-to-implementation packet conversion
- repo coordination

## Do-Not-Do List Right Now

Do not spend current completion time on:

- broad OSM expansion
- hero page redesign
- major hardware feature ideation
- new repo creation unless blocking
- giant graphics/content waves
- mass loudspeaker page generation
- firmware side quests with no software blocker

## Immediate Next 8 Tasks

1. push the current clean `ohmic-audio-static-content` slice so the canonical-host follow-through is durable
2. write the `Wiring Lab` implementation packet from the safe amp-match rules
3. inventory and split the `ohmic-audio-labs` dirty worktree by domain
4. identify minimum trusted app/runtime checks in `ohmic-audio-labs`
5. define the first standalone `Ohm's Law` extraction route/copy packet
6. keep the toolbox wave stable and document the current consumer boundaries
7. preserve the loudspeaker lane in prototype mode without widening into mass extraction
8. keep the umbrella queue and memory surfaces truthful after each slice

## Summary

The completion-first truth is:

- `ohmic-audio-labs` is the main problem and main opportunity
- `Ohmic` must stay truthful so the work can be split safely
- loudspeaker work should stay in prototype mode
- everything else should be kept warm, not allowed to steal the center lane
