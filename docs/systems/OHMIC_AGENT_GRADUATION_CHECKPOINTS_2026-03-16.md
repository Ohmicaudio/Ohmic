# Ohmic Agent Graduation Checkpoints

Date: 2026-03-16
Project: ohmic

## Purpose

Define the checkpoints that let an agent graduate from fresh to trusted based
on repeated live-task performance instead of intuition alone.

## Core Rule

Trust growth should follow demonstrated outcomes.

An agent should graduate because it repeatedly handles real tasks well, not
because it had one clean run or sounds confident.

## Suggested Trust Stages

Recommended first stages:

- `fresh`
- `guided`
- `trusted`
- `high-trust`

These are operating states, not personality judgments.

## Stage Meanings

### `fresh`

Profile:

- newly introduced worker
- limited live-task history
- higher supervision needs

Allowed work:

- narrow docs or support slices
- bounded cleanup
- low-collision verification packets

### `guided`

Profile:

- has multiple stable completions
- still benefits from tighter scope and explicit lanes

Allowed work:

- medium bounded packets
- regression additions
- contract and queue-truth work
- carefully scoped implementation slices

### `trusted`

Profile:

- reliable task closure with good correctness and low reopen rate

Allowed work:

- broader implementation slices
- multi-file reconciliations
- ambiguous support work
- higher-value routing without constant supervision

### `high-trust`

Profile:

- sustained strong performance across multiple task families

Allowed work:

- cross-cutting or sensitive lanes
- higher ambiguity
- stronger autonomy before escalation

## Graduation Inputs

Checkpoint decisions should use:

- completion count
- correctness distribution
- reopen rate
- rework rate
- verification discipline
- scope adherence
- local-context retention
- escalation behavior

This keeps graduation grounded in actual live work.

## Minimum Checkpoint Signals

### Fresh -> Guided

Should show:

- repeated bounded-task completions
- no serious scope violations
- consistent request/claim hygiene
- at least acceptable correctness on most tasks

### Guided -> Trusted

Should show:

- stable correctness over a meaningful sample
- low reopen and rework rate
- reliable verification habit
- good context discipline without repeated overflow behavior

### Trusted -> High-Trust

Should show:

- strong or acceptable outcomes across varied task families
- low avoidable escalation rate
- low collision/thrash behavior
- resilient handling of ambiguous work

## Verification Discipline Requirement

Graduation should not look only at whether tasks were closed.

Agents should demonstrate:

- they run the relevant checks when available
- they record when checks are unavailable
- they do not over-claim confidence without evidence

This is a core graduation signal, not a nice-to-have.

## Local-Context Retention

Graduation should also consider whether the agent can stay coherent within a
lane over time.

Positive signs:

- keeps naming and boundaries consistent
- reuses recent context well
- avoids repeated re-onboarding for the same live lane

Negative signs:

- repeated contradiction inside one lane
- forgetting active boundary decisions
- reopening solved ambiguity from a few tasks earlier

## Demotion Or Hold Rules

Trust should not only move upward.

An agent may stay in place or be temporarily held if:

- reopen rate climbs
- verification discipline drops
- scope drift becomes common
- operator overrides become frequent
- claims and queue hygiene become unreliable

This is a control safeguard, not punishment.

## Minimal Checkpoint Record

Suggested object:

- `agent_id`
- `current_stage`
- `candidate_stage`
- `evaluation_window`
- `tasks_evaluated`
- `correctness_summary`
- `reopen_rate`
- `rework_rate`
- `verification_score`
- `context_retention_score`
- `recommendation`
- `notes`

## Example Shape

```json
{
  "agent_id": "worker_docs_01",
  "current_stage": "guided",
  "candidate_stage": "trusted",
  "evaluation_window": "last_25_tasks",
  "tasks_evaluated": 25,
  "correctness_summary": {
    "strong": 9,
    "acceptable": 12,
    "uncertain": 4,
    "weak": 0
  },
  "reopen_rate": 0.08,
  "rework_rate": 0.12,
  "verification_score": "good",
  "context_retention_score": "good",
  "recommendation": "promote",
  "notes": "Stable verification habit and low reopen rate across bounded docs and contract work."
}
```

## First Safe Implementation

The first implementation only needs:

1. one checkpoint evaluation packet per agent
2. performance summary inputs
3. correctness and reopen inputs
4. a recommendation field

That is enough to turn trust growth into a measurable process.

## Immediate Follow-On

These checkpoints should feed:

1. fresh agent restriction and escalation rules
2. Gemini initial correctness and rework review
3. later trust-tier assignment automation
