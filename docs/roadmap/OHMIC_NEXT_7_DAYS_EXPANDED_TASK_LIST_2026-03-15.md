scope: system
status: working_checklist
updated: 2026-03-15
horizon: 7_days

# Ohmic Next 7 Days Expanded Task List

## Purpose

This is the long-form companion to the 7-day working plan.

Use it when the shorter plan is too abstract and a longer execution list is
needed.

## Priority Rule

Software completion and reusable product logic stay above:

- loudspeaker page expansion
- image ingestion
- hardware planning growth
- broad business-ops follow-ons

## Week Lanes

### Lane A: Toolbox Product Surface

- expose finished shared math in visible UI surfaces
- keep app-local workflow clean
- avoid root-repo package churn

### Lane B: Shared Math And Reuse

- keep formulas canonical
- add fixtures before adding consumers when reasonable
- do not duplicate math in UI state

### Lane C: Smarter Speaker Tooling

- keep speaker load intelligence under `Wiring Lab`
- do not blur it with generic electrical math
- define recommendation and explanation layers before building a giant engine

### Lane D: Loudspeaker Data And Static Planning

- use `B:\junk` as source storage only
- normalize before generating
- define image and content boundaries before publishing

## Day 1 Detailed List

### Acoustic Gain UI

- review current `apps\ohmic-toolbox` panel structure
- choose the smallest surface where `Acoustic Gain` fits cleanly
- import `calculateAcousticGainResult` from the shared core only
- define minimal inputs for old power and new power
- define one output for dB gain
- keep any explanatory copy short and practical
- avoid redesigning the entire toolbox layout
- run toolbox tests after the UI slice lands
- update the toolbox README only if the surface meaning changes
- close the queue item immediately after verification

### Queue Hygiene

- confirm the `Acoustic Gain` task moved to `done`
- confirm the next visible task is correct
- confirm no stale claim remains

## Day 2 Detailed List

### Second-Wave Surface Strategy

- compare three surface options:
  - keep inside `ohmic-toolbox`
  - separate public mini-tool pages
  - mixed model
- judge each option for:
  - discoverability
  - reuse
  - SEO value
  - lead-gen flow
  - maintenance burden
- make one recommendation, not three “maybe” answers
- define the first exception rule if mixed model wins

### Follow-On Pick

- if the surface strategy is clear, choose one second-wave tool to expose next
- default preferred candidate remains `Ohm's Law`
- define what would make `Cone Area` go first instead

## Day 3 Detailed List

### One Sample Loudspeaker Normalization Map

- choose one representative CSV row
- copy the raw columns used for that row
- name the normalized target fields
- map:
  - brand
  - model
  - size
  - category
  - nominal impedance
  - source URL
  - source image URL
- note which raw columns remain unclear
- note which values are likely technical parameters
- explicitly mark unresolved fields instead of guessing

### Template Reconciliation

- compare the sample map against the static page template
- remove any template field that is unrealistic too early
- add any obviously missing required field
- keep the template usable for weak and strong records separately if needed

## Day 4 Detailed List

### Smart Wiring Lab Implementation Boundary

- translate the design note into an implementation-facing packet
- define target inputs for:
  - sub count
  - coil type
  - coil impedance
  - target amp load
  - amp configuration assumptions
- define target outputs for:
  - final load
  - match quality
  - recommendation text
  - warnings
  - alternative suggestions
- define recommendation categories:
  - good match
  - workable but awkward
  - poor fit
  - unsafe or discouraged
- define explanation templates for each category
- define what the first implementation will not do

### Shared-Core Review

- mark what can live in shared math
- mark what is presentation-only
- mark what is rule-based recommendation logic

## Day 5 Detailed List

### Time Alignment First-Consumer Decision

- compare:
  - tuning helper
  - handheld helper
  - hardware-linked setup flow
- judge each one for:
  - current code readiness
  - product fit
  - user value
  - implementation risk
- pick one first consumer
- define why the other two are not first

### Low-Risk Surface Hook

- if the chosen consumer already exists, decide whether a tiny integration stub
  is worth doing now
- do not widen into a full new feature
- if the hook would be messy, queue it instead

## Day 6 Detailed List

### Shared-Core Opportunity Review

- inventory current shared math consumers
- list what formulas still only exist in old incubator logic
- mark which remaining calculators are strong next shared-core candidates
- compare:
  - `System Health`
  - `Amp Strapping`
  - `Time Alignment`
  - `Lithium Lab`
- decide which two are the best future shared-core extractions

### Surface Alignment Review

- check whether current calculator surfaces match the offer ladder
- mark which belong in:
  - free/public
  - Pro/helper
  - hardware-linked/helper

## Day 7 Detailed List

### Week Review

- list completed tasks
- list slipped tasks
- list why slips happened
- list what assumptions proved wrong
- list what became easier than expected

### Queue Refresh

- move completed tasks to `done`
- remove stale `ready` items
- ensure no ghost claims remain
- ensure the next visible work is real

### Next Packet

- draft the next 7-day plan
- identify the next highest-leverage software lane
- identify the next loudspeaker/data lane only if software lane is stable

## Long Backlog For The Same Week If Momentum Is High

These are still valid, but should only be pulled in after the day-by-day core
items above stay healthy.

### Toolbox And Product

- expose `Ohm's Law` in UI after surface-strategy choice
- expose `Cone Area` in UI after surface-strategy choice
- add compact explanatory text to public mini-tools
- define one visual style rule for calculator outputs
- define one URL strategy for mini-tools if they become separate pages
- define one cross-linking rule between calculators and reference content

### Wiring Lab Future

- draft target amp-load presets for common mono and bridged use
- define safe-note language for oddball loads
- define recommendation language for common coil/sub combinations
- define diagram strategy for smarter `Wiring Lab`
- define when to suggest alternative driver count or impedance

### Loudspeaker Lane

- define “strong enough to publish” criteria for a speaker page
- define “too weak to publish” criteria
- define fallback no-image page behavior
- define brand-level aggregation page idea
- define comparison-page idea
- define source provenance minimum fields

### Coordination

- refresh the coordinated execution board at least once mid-week
- collapse duplicate queue items if they appear
- keep active claims visible before edits
- keep follow-through immediate after each completion

## Explicit Do-Not-Do List

- do not widen into all remaining calculators at once
- do not build a giant smart speaker engine in one pass
- do not hotlink images as if policy were solved
- do not generate speaker pages from raw scrape labels
- do not let the queue become a pile of filenames again
- do not let implementation outrun follow-through

## Success Markers

This expanded list is succeeding if:

- tasks are being finished in small clean slices
- queue truth stays aligned with repo truth
- shared math keeps expanding without duplication
- speaker-specific logic stays separate from generic electrical logic
- loudspeaker planning gets more concrete without becoming a production mess
