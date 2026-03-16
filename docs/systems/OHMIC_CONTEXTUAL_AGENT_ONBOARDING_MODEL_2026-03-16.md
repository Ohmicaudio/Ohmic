# Ohmic Contextual Agent Onboarding Model

Date: 2026-03-16
Status: working design

## Purpose

Define how fresh agents and models should be onboarded through real work in
real project context instead of being treated as trustworthy after only a
handoff or prompt briefing.

## Core Truth

Fresh agents are usually weak in the first hours.

Common failure modes:

- chasing tidy but lower-value work
- misreading project boundaries
- missing local naming and house rules
- declaring completion without real correctness
- treating handoff context as equivalent to lived route knowledge

The system should assume this weakness and design around it.

## Handoff Is Not Enough

A handoff is compressed context.

It helps, but it is not the same as:

- seeing the real queue
- touching the real repos
- encountering the real edge cases
- being corrected after actual mistakes

The missing layer is live route training.

## Live Route Training Model

New agents should be trained through bounded real tasks inside the actual
project context.

Training loop:

1. give a bounded real task
2. require verification
3. inspect correctness, not just activity
4. give feedback and correction
5. repeat across several task families
6. raise trust only after repeated passes

## Trust Tiers

### Tier 0: Fresh

Assume:

- low trust
- high supervision
- no broad queue reshaping
- no wide repo churn

Allowed:

- bounded tasks
- documentation or narrow cleanup
- low-risk verification work

### Tier 1: Route Learning

Assume:

- some local context is forming
- still error-prone

Allowed:

- bounded implementation slices
- small queue follow-ons
- narrow verification and smoke work

Needs:

- close correctness review
- explicit feedback after mistakes

### Tier 2: Trusted Performer

Assume:

- agent can complete bounded real work with acceptable correctness

Allowed:

- normal performer tasks
- grouped implementation slices
- follow-on task shaping

Still needs:

- periodic audit
- correctness measurement

### Tier 3: Trusted Orchestrator

Assume:

- agent can keep the board honest
- agent can prioritize without hiding from hard work
- agent can shape waves without causing drift

Allowed:

- orchestration responsibility
- grouped queue design
- cross-lane promotion and sequencing

## Restriction Rule For Fresh Agents

Fresh agents should not start with:

- broad refactors
- mixed-surface commits
- major queue reshaping
- ambiguous product-architecture decisions
- unreviewed public trust edits

They should earn their way into those lanes through repeated live passes.

## Graduation Model

Trust should rise only after:

- repeated completed tasks
- repeated correctness passes
- acceptable verification discipline
- low reopen/rework rate
- evidence the agent learned local naming/boundaries

## Evaluation Relationship

This model depends on the evaluation/reporting layer:

- sanity checks
- error checks
- correctness checks
- agent/model performance reports

Without those, trust tiers become vibes.

## Outcome Standard

If onboarding is working, then:

- fresh agents stop being treated as fully trusted by default
- route learning happens in real project context
- correctness improves with repetitions
- trust is earned, not assumed

## Immediate Next Tasks

1. define agent trust tier model
2. define live-task route training lane
3. define fresh-agent restriction and escalation rules
4. define agent graduation checkpoints
