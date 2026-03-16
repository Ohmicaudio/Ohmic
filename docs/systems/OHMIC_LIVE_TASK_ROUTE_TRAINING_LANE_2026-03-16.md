# Ohmic Live Task Route Training Lane

Date: 2026-03-16
Project: ohmic

## Purpose

Define how new agents should be trained through bounded real tasks in actual
project context instead of relying only on handoffs and static briefings.

## Core Rule

Reading context is necessary.

Bounded live-task exposure is what actually teaches the route.

That means onboarding should not stop at:

- AGENTS files
- README files
- memory docs
- one static briefing

It should continue through controlled real work with feedback.

## Why Handoff-Only Onboarding Is Not Enough

Handoff-only onboarding fails to teach:

- local naming collisions
- queue and claim hygiene under pressure
- verification habits
- real project drift
- how local context actually behaves over several tasks

Those are learned best through repeated small live packets, not just written
instructions.

## Training Lane Shape

Recommended route-training flow:

1. bounded real task
2. explicit verification
3. closure review
4. correction loop if needed
5. another bounded task in the same lane

This creates repeated exposure without giving the learner full-trust autonomy
too early.

## Training Packet Characteristics

Good first training packets are:

- narrow
- low collision
- easy to verify
- local to one domain or repo lane
- small enough to review quickly

Examples:

- bounded docs-truth correction
- narrow regression addition
- queue-truth fix with clear evidence
- one contained architecture note packet

## Verification Requirement

Every training packet should include a relevant check when available.

Examples:

- run the test tied to the change
- verify the route or endpoint
- check queue/claim truth
- record when no automated check exists

This trains both correctness and honesty about verification limits.

## Correction Loop

A training lane must include visible correction, not just pass/fail judgment.

Correction signals may include:

- reopened task
- scope-drift note
- naming-boundary correction
- verification gap note
- trust hold instead of promotion

This is how the route learns the local operating shape.

## Repeated Exposure Rule

A route should not graduate on one clean packet.

It should demonstrate:

- repeated bounded completions
- stable verification habits
- improving local naming and boundary awareness
- decreasing correction frequency over time

## Suggested Training Stages

### Stage 1. Guided Packet

Characteristics:

- one narrow live task
- high review attention
- explicit expected checks

### Stage 2. Repeated Similar Packet

Characteristics:

- same lane, new bounded slice
- less hand-holding, same review discipline

### Stage 3. Adjacent Lane Packet

Characteristics:

- still bounded, but with one adjacent concept or repo surface

### Stage 4. Evaluation Packet

Characteristics:

- live packet used to decide whether the route can move from `fresh` to
  `route_learning` or beyond

## Minimal Training Record

Suggested fields:

- `route_id`
- `training_packet_ref`
- `task_family`
- `verification_result`
- `correction_count`
- `review_notes`
- `promotion_signal`

## Example Shape

```json
{
  "route_id": "gemini-docs-eval",
  "training_packet_ref": "2026-03-16-run-gemini-first-bounded-doc-packet",
  "task_family": "docs",
  "verification_result": "pass_with_review",
  "correction_count": 1,
  "review_notes": "Good task closure, but local naming boundary needed one correction.",
  "promotion_signal": "continue_training"
}
```

## Relationship To Trust Tiers

Training packets should map directly into the trust model:

- `fresh` routes get narrow packets
- `route_learning` routes get repeated bounded packets
- promotion only follows repeated acceptable or strong outcomes

This makes route learning part of the trust system, not a side process.

## First Safe Implementation

The first implementation only needs:

1. one bounded-doc packet
2. one verification packet
3. one review packet

That is enough to make route training real without inventing a large academy.

## Immediate Follow-On

This lane should feed:

1. Gemini first bounded-doc packet
2. Gemini first verification packet
3. Gemini initial correctness and rework review
