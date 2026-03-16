# Ohmic Administrator Stack Cohesion Score Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define a compact score that expresses how coherent an administrator-heavy local
stack is so runtime and audit layers can summarize stack quality without reading
the whole stack by hand.

## Core Rule

Administrator stack quality is mostly about coherence, not raw size.

A strong score should reflect:

- close adjacency of related policy and filing work
- low fallback noise
- good filing continuity
- low projection spill
- controlled overload pressure

## Score Inputs

### 1. Adjacency Strength

Measures how tightly the stack clusters related admin families such as:

- filing
- note/tag/annotation
- intake-state follow-ons
- nearby routing policy

Higher adjacency should increase cohesion.

### 2. Filing Continuity

Measures whether filing-related work stays contiguous enough to preserve one
operational desk thread.

Higher continuity should increase cohesion.

### 3. Fallback Noise

Measures how many local items are low-value, duplicated, distant, or generic.

Higher fallback noise should lower cohesion.

### 4. Projection Spill

Measures whether projection or shell-seam fallbacks are crowding out core
administrator continuity.

Higher spill should lower cohesion unless the active lane is explicitly
projection-heavy.

### 5. Overload Pressure

Measures whether the stack is carrying too many distant or marginally related
items.

Higher overload pressure should lower cohesion.

## Recommended Score Shape

```text
administrator_stack_cohesion
- score_0_to_100
- adjacency_strength
- filing_continuity
- fallback_noise
- projection_spill
- overload_pressure
- status_band
```

## Scoring Direction

Guidance:

- adjacency strength: positive
- filing continuity: positive
- fallback noise: negative
- projection spill: negative
- overload pressure: negative

The exact formula can evolve later, but the direction should stay stable.

## Interpretation Bands

Suggested interpretation:

- `strong`
  - stack is tightly clustered and low-noise
- `stable`
  - stack is workable with minor drift
- `fraying`
  - stack is still functional but cohesion is slipping
- `scattered`
  - stack is overloaded, noisy, or too distant to trust

## Operational Use

This score should be usable for:

1. runtime comparison cards
2. audit summaries
3. overload warnings
4. administrator-vs-orchestrator mode comparison

## Non-Goal

This score does not judge worker intelligence.

It only summarizes how coherent the current administrator-heavy local stack is.

## Immediate Follow-On

This cohesion model should feed:

1. administrator stack cohesion status band model
2. admin-vs-orchestrator local stack comparison card
3. administrator fallback noise reduction rules
4. administrator cluster distance thresholds
