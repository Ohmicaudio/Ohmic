scope: system
status: working_plan
updated: 2026-03-15

# Ohmic Second-Wave Toolbox Surface Strategy

## Decision

Use a staged mixed model.

Near term:

- keep `Ohm's Law`
- keep `Cone Area`
- keep `Acoustic Gain`

inside the existing `ohmic-toolbox` app first.

Later:

- expose the strongest second-wave tools as separate public mini-tool pages
- keep the shared math and core UI logic sourced from the same toolbox lane

## Why

This gives the fastest clean path to shipping without fragmenting the product
surface too early.

It preserves:

- one implementation lane
- one shared math source
- one consistent utility experience

It also keeps the option open to publish the best-performing utilities as
search-entry pages later without rewriting their logic.

## Recommended Model

### Stage 1: Toolbox-first

Ship second-wave utilities inside `apps/ohmic-toolbox`.

Reason:

- fastest route to completion
- least routing and navigation churn
- easiest place to validate shared math, copy, and UX patterns
- keeps maintenance concentrated while the utility set is still small

### Stage 2: Public-page extraction

Promote individual tools into separate public mini-tool surfaces only when they
earn it.

Promotion triggers:

- strong search intent
- strong standalone value
- clear free-to-Pro funnel role
- stable inputs/outputs and copy
- no ambiguity with deeper tool lanes

## Tool-by-Tool Recommendation

### Ohm's Law

Stage 1 role:

- toolbox utility
- educational electrical helper

Stage 2 candidate:

- yes, strong public mini-tool candidate

Why:

- broad search value
- broad education value
- easy to understand immediately

Guardrail:

- do not let it drift into speaker load or final impedance logic
- that stays in `Wiring Lab`

### Cone Area

Stage 1 role:

- toolbox utility
- SPL and enclosure support helper

Stage 2 candidate:

- yes, but lower priority than `Ohm's Law`

Why:

- useful as both a standalone calculator and a support tool for BassBuilder
- better once comparison copy and adjacent design context are cleaner

### Acoustic Gain

Stage 1 role:

- toolbox utility
- upgrade-comparison helper

Stage 2 candidate:

- yes, after wording and educational framing are proven

Why:

- useful and marketable
- better when paired with stronger explanatory copy and adjacent upgrade
  workflows

## What Not To Do

Do not:

- split all second-wave utilities into separate public pages immediately
- create separate math implementations for public vs toolbox surfaces
- bury the utilities in Pro before the free utility value is established
- confuse `Ohm's Law` with the smarter `Wiring Lab` speaker-match lane

## Implementation Rule

One math source, many surfaces.

That means:

- shared formulas stay in the toolbox/shared engineering layer
- toolbox remains the first consumer
- later public mini-tool pages should reuse the same logic and fixtures

## Immediate Next Step

Keep the second-wave tools in `ohmic-toolbox` for now, then decide which single
utility should be the first standalone public extraction candidate after:

- UI implementation is stable
- fixture coverage is stable
- copy is strong enough for direct public entry

## First Public Extraction Candidate

Recommendation:

- `Ohm's Law`

Reason:

- best standalone utility fit
- highest broad-search usefulness
- clearest free-entry educational surface
