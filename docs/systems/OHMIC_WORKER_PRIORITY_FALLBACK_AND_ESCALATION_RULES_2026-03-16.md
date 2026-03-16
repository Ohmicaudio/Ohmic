# Ohmic Worker Priority Fallback And Escalation Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how workers should pick primary work, fall back when blocked, and
escalate when scope, trust, or budget boundaries are exceeded.

## Core Rule

Workers should prefer the highest-value eligible work in their lane.

If that work is blocked, they should fall back predictably.

If safe fallback is exhausted, they should escalate instead of thrashing.

## Worker Priority Classes

Recommended first priority classes:

### 1. Claimed Active Work

Highest priority.

Meaning:

- finish the task already claimed unless a stronger operator override exists

### 2. Ready Work In Current Domain

Next priority.

Meaning:

- take ready work that matches the worker's current context and trust tier

### 3. Adjacent Supporting Work

Fallback priority.

Meaning:

- pick tightly related support slices that unblock or clarify the current lane

Examples:

- contract doc that unblocks an implementation slice
- regression coverage for a just-touched surface
- queue truth cleanup directly tied to a current lane

### 4. Safe Maintenance Work

Lower fallback priority.

Meaning:

- do bounded cleanup only when higher-value domain work is unavailable

Examples:

- stale queue truth cleanup
- naming cleanup with low collision risk
- bounded docs-truth correction

### 5. Escalation Required

No safe work remains in scope.

Meaning:

- stop autonomous wandering and raise an explicit escalation

## Preferred Task Family Order

Within an eligible lane, workers should prefer:

1. explicit user-requested work
2. active claimed work
3. ready tasks directly continuing the current context
4. ready tasks in the same project/domain family
5. safe support tasks that unblock higher-value work

This keeps local continuity strong and reduces random context switching.

## Fallback Ordering

When a worker's preferred task is blocked, use this order:

1. adjacent ready task in the same lane
2. same-project support task that clarifies or unblocks the lane
3. bounded queue truth or docs truth cleanup
4. explicit escalation

Workers should not skip straight from "blocked" to random unrelated backlog
digging.

## Escalation Triggers

Escalate when any of these are true:

- required files are under another active claim
- the task depends on unavailable external access
- trust tier forbids the next action
- the task boundary is too ambiguous to proceed safely
- token/context budget would be exceeded by continuing
- the only remaining options are unrelated or speculative

## Trust-Tier Restrictions

Worker priority is constrained by trust tier.

Examples:

- fresh workers may handle narrow docs, low-risk cleanup, or bounded support
  tasks
- experienced workers may take cross-cutting changes and ambiguous
  reconciliation work
- sensitive routes may require explicit operator direction regardless of
  worker capability

Trust restrictions outrank fallback desire.

## Collision Behavior

If a task or path is already claimed:

- do not work around the claim by editing overlapping files
- look for the next eligible ready task
- if the blocked task is the only high-value path, escalate

Claims are a routing boundary, not a suggestion.

## Blocked-Task Behavior

When a worker encounters a blocked task:

1. record the blocking reason truthfully
2. stop trying to brute-force the blocked path
3. follow fallback ordering
4. escalate if no safe fallback remains

The goal is useful progress, not activity theater.

## Operator Override Interaction

Operator overrides change the priority ladder immediately.

Examples:

- `pause` removes the task from eligible active work
- `reroute` changes where fallback should look next
- `force_fallback` skips the preferred lane deliberately
- `reassign` changes worker ownership

Workers should not treat the old priority order as still valid after an
explicit override.

## Minimal Decision Ladder

Suggested worker loop:

1. do I have active claimed work?
2. if yes, is it still eligible and unblocked?
3. if no, is there ready work in the current lane?
4. if no, is there a tightly adjacent support slice?
5. if no, is there safe maintenance work?
6. if no, escalate

## Example Fallback

```text
worker starts on ready implementation task
-> blocked by active claim overlap
-> looks for same-lane contract or regression slice
-> none available
-> checks safe queue-truth cleanup
-> none available
-> escalates instead of random backlog hopping
```

## Immediate Follow-On

These rules should feed:

1. worker context and token budget policy
2. live task route training lane
3. global vs worker queue boundary
