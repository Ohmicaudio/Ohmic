scope: system
status: working_plan_for_approval
updated: 2026-03-15
horizon: 7_days

# Ohmic Next 7 Days Working Plan

## Objective

Use the next 7 days to turn the current rescued software state into bounded,
claimable completion slices across the main app, while extending the new page
error-reporting lane without letting it consume the whole board.

## Why This Week Matters

- the migration and coordination layer is finally stable enough that planning
  will stick
- the next risk is no longer “what should we do,” it is letting the main app
  stay one giant dirty subsystem
- the queue is finally small and real again
- the page error reporting lane now has a concrete path because the backend
  support/triage surfaces already exist

## Execution Priority Rule

Current software completion stays on top.

That means this week should prioritize:

- first bounded app commit slices
- error-reporting implementation and triage extension
- code and queue durability
- subsystem isolation that makes later code completion easier

before:

- hardware planning expansion
- crawler redesign
- broad business-ops follow-ons
- homepage or brand-surface rewrites

## Scope In

- close the remaining umbrella artifact ambiguity
- move the first real `products/ohmic-osm` slice from planning to execution
- isolate the first hardware/control and backend commit slices
- extend the support/triage pipeline into per-page issue reporting
- inventory the Android wrapper lane and freeze noisy archive/public surfaces

## Scope Out

- broad OSM feature expansion
- full loudspeaker page generation
- broad archive cleanup
- hardware schematic capture
- broad marketing or business-ops expansion
- speculative new app surfaces unless they directly support completion

## Working Lanes

### Lane A: Page Error Reporting

Repos:

- `B:\ohmic`
- `B:\ohmic\repos\ohmic-audio-labs`

Focus:

- define UI contract
- extend support intake for page-specific capture
- build triage view support
- add the first reusable page report button on core surfaces

### Lane B: Main App Completion Slices

Repos:

- `B:\ohmic\repos\ohmic-audio-labs`

Focus:

- `products/ohmic-osm` editor-shell slice
- first hardware/control safe slice
- first backend safe slice
- Android wrapper inventory

### Lane C: Boundary And Drift Control

Repos:

- `B:\ohmic`
- `B:\ohmic\repos\ohmic-audio-labs`
- `B:\ohmic\repos\ohmic-audio-static-content`

Focus:

- generated loudspeaker artifact disposition
- static-content remote durability
- public/archive freeze boundary

## Day-By-Day Breakdown

## Day 1

### 1. Finish the page error reporting contract lane

Tasks:

- `define-page-issue-reporter-ui-contract`
- `extend-support-intake-for-page-error-capture`

Output:

- one durable UI/input contract
- one durable backend-intake extension note

### 2. Start implementation-facing error reporting work

Tasks:

- `build-page-report-triage-queue-view`
- `implement-page-report-button-on-core-surfaces`

Exit criteria:

- route/context capture path is explicit
- the triage queue shape is no longer vague

## Day 2

### 3. Close top-level drift and start the first app slice

Tasks:

- `resolve-generated-loudspeaker-output-disposition`
- `commit-first-ohmic-osm-editor-shell-safe-slice`

Output:

- umbrella repo loses one ambiguous artifact
- OSM moves from inventory into one bounded slice

## Day 3

### 4. Shape the next two major app lanes

Tasks:

- `split-first-hardware-control-safe-commit-slice`
- `split-first-backend-safe-commit-slice`

Output:

- exact first hardware/control slice
- exact first backend slice

## Day 4

### 5. Triage Android wrapper risk and confirm static-content durability

Tasks:

- `inventory-android-wrapper-dirty-subsystem`
- `push-static-content-clean-slice-if-remote-not-aligned`

Output:

- Android wrapper dirty-shape summary
- static-content local/remote answer

## Day 5

### 6. Lock the freeze boundary for noisy zones

Task:

- `define-public-and-archive-freeze-boundary`

Why:

- this keeps active completion work from dissolving back into giant legacy
  cleanup

## Day 6

### 7. Convert the first completed slice decisions into new executable tasks

Output:

- if OSM slice lands, queue the second OSM slice or close it
- if hardware/control split lands, queue the first actual implementation slice
- if backend split lands, queue the first actual implementation slice

## Day 7

### 8. Review, collapse, and reseed

Output:

- completed tasks moved to `done`
- stale `ready` tasks removed
- next 7-day plan written from actual throughput, not inflated estimates

- one concrete first-consumer decision

### 9. If safe, connect that decision to an existing surface

Only if low-risk.

No full expansion required.

## Day 6

### 10. Review toolbox and loudspeaker lanes for shared-core opportunities

Focus:

- identify what should become canonical logic
- identify what must stay presentation-only

Why:

- week-two implementation should build on shared-core discipline, not branch
  drift

Output:

- short reuse map for next-wave implementation

## Day 7

### 11. Week review and next packet

Why:

- every 7-day plan should end with a real review and a next packet, not a fade
  into chat

Output:

- completed vs slipped tasks
- reasons for slips
- next 7-day packet draft

Exit criteria:

- queue reflects the new week state
- no important truth remains only in chat

## Recommended Order Of Attack

1. `implement-acoustic-gain-in-toolbox-ui`
2. `decide-second-wave-toolbox-surface-strategy`
3. `build-one-sample-loudspeaker-normalization-map`
4. smart `Wiring Lab` implementation packet
5. `Time Alignment` first-consumer decision

## Do-Not-Do List This Week

- do not start broad loudspeaker page generation
- do not start image scraping bursts
- do not reopen OSM surface expansion
- do not jump to hardware schematics
- do not widen into all remaining toolbox calculators at once
- do not let queue hygiene slip while implementation is moving

## Definition Of Success

At the end of 7 days, we should be able to say:

- the toolbox lane is materially more product-like
- second-wave tool direction is chosen, not guessed
- loudspeaker data is proven workable on at least one real sample
- smarter `Wiring Lab` work can begin from a defined boundary
- next-week planning is easier because this week ended in durable state

## Companion Checklist

Use the expanded companion when the week needs more granular task slicing:

- `OHMIC_NEXT_7_DAYS_EXPANDED_TASK_LIST_2026-03-15.md`
