scope: system
status: active
updated: 2026-03-14

# Ohmic Plan Status Definitions

## Purpose

Make planning language unambiguous so `working plan`, `proposal`, `review`, and
`approval` mean the same thing across agents, docs, and execution.

## Core Rule

Time horizon determines default plan class:

- `0-2 days`: working plan intended for approval
- `more than 2 days`: proposal for review

This rule applies unless a doc says otherwise explicitly.

## Definitions

### Working Plan

A `working plan` is near-term execution work that is specific enough to be
approved or rejected now.

Required traits:

- concrete scope
- named outputs
- named owners or owner classes
- explicit order of operations
- dependencies and blockers called out
- exit criteria that can be checked

Default use:

- next 48 hours
- active execution packet
- intended for approval

### Proposal For Review

A `proposal for review` is a definite recommendation for what should happen
next, but it is not yet approved execution.

Required traits:

- clear recommendation, not vague brainstorming
- explicit assumptions
- explicit tradeoffs
- enough structure to critique or expand
- clear boundary between what is recommended and what is already committed

Default use:

- one week and beyond
- roadmap shaping
- packaging, market, channel, and product sequencing

### Review

`Review` is the decision stage where a proposal or working plan is examined for:

- fit
- risk
- sequencing
- missing work
- approval readiness

Review is not execution and is not approval.

### Approval

`Approval` is the explicit go decision to execute a working plan or to adopt a
proposal as the active plan.

Approval means:

- the direction is accepted
- the scope is active
- execution can proceed without re-arguing the baseline every step

Approval does not mean every detail is frozen forever.

## Decision States

Use these states explicitly in planning docs:

- `working_plan_for_approval`
- `proposal_for_review`
- `approved_for_execution`
- `blocked_pending_decision`
- `deferred`
- `done`

Avoid fuzzy status language like:

- `rough draft`
- `kind of active`
- `maybe next`
- `probably approved`

## Required Sections By Plan Type

### Working Plan Required Sections

- objective
- why now
- scope in
- scope out
- owners
- ordered steps
- dependencies
- exit criteria

### Proposal Required Sections

- objective
- why this direction
- assumptions
- proposed sequence
- dependencies
- risks
- review questions

## Completeness Rule

`Proposal` does not mean vague.

A proposal must still be definite enough that someone can:

- disagree with it
- approve it
- break it into work

If a document cannot be critiqued or approved because it is too mushy, it is not
yet a proposal.

## Current Application

For the current Ohmic planning cycle:

- the next `2 days` should be written as a working plan for approval
- `1 week`, `1 month`, `quarter`, and `year` horizons should be written as
  proposal for review
- hardware beyond immediate intake stays in proposal territory unless explicitly
  promoted into approved execution
