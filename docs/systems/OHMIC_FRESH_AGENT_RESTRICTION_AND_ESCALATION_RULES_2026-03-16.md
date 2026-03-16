# Ohmic Fresh Agent Restriction And Escalation Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define what fresh agents should not touch yet, and when they must escalate
instead of freelancing into broad or ambiguous work.

## Core Rule

Fresh agents should operate in narrow, high-truth lanes first.

They should escalate early rather than improvising across broad or sensitive
surfaces.

## Default Fresh-Agent Boundaries

Fresh agents may safely handle:

- bounded docs packets
- narrow contract updates
- low-collision verification slices
- small regression additions
- queue-truth cleanup with clear evidence

Fresh agents should not default into:

- broad multi-surface churn
- high-trust public content changes
- architecture direction changes
- ambiguous repo-wide reconciliation
- sensitive production or credential-adjacent work

## Public Trust Restrictions

Fresh agents should not independently own:

- live canonical/public copy rewrites
- public landing-page truth changes
- externally visible policy or trust wording
- safety-critical or brand-critical public guidance

They may assist with bounded cleanup or evidence gathering, but high-trust
public changes should escalate to a more trusted lane or require explicit user
direction.

## Architecture Decision Restrictions

Fresh agents should not make new core architecture decisions alone.

Examples:

- changing domain boundaries
- introducing new source-of-truth models
- redefining system trust boundaries
- changing routing/control-plane ownership

They may:

- draft bounded notes
- map current state
- compare alternatives

But final direction should escalate.

## Broad Churn Restrictions

Fresh agents should avoid packets that:

- span many unrelated directories
- require many simultaneous claims
- blend product, docs, infra, and queue cleanup together
- are likely to reopen hidden migration drift

If a task starts widening in this way, the correct move is split or escalate,
not "push through."

## Escalation Triggers

Fresh agents must escalate when:

- the task becomes architecturally ambiguous
- the task touches public-trust surfaces
- the task requires changing more than one domain boundary
- the next files are under another active claim
- verification evidence is weak but the change is high-impact
- token/context budget suggests widening beyond the original packet

## Allowed Escalation Shapes

Fresh agents may escalate by:

- recommending the next bounded slice
- writing a short status note
- moving a task to blocked with reason
- queuing a narrower follow-on packet
- handing off to a more trusted worker lane

Escalation should be useful and specific, not just "I am stuck."

## Operator Override Interaction

Explicit operator direction can widen the safe envelope, but it should still be
logged clearly.

Examples:

- user explicitly asks a fresh agent to take a higher-trust docs slice
- operator forces fallback into manual handling
- operator approves a one-time broader packet

Even then, the override should not erase the fact that the work exceeded normal
fresh-agent boundaries.

## Minimal Fresh-Agent Safety Ladder

Recommended ladder:

1. take bounded ready work in a known lane
2. verify whether the task stays narrow
3. if it widens, split first
4. if it becomes sensitive or ambiguous, escalate
5. do not substitute confidence for permission

## Example Restricted Cases

Escalate:

- "change the canonical public host and sweep all product defaults"
- "reconcile several dirty repos with naming drift"
- "design the new worker trust model from scratch"

Safe to proceed:

- "close one bounded docs request with explicit acceptance"
- "add one narrow regression test"
- "fix one queue-truth mismatch with clear evidence"

## First Safe Implementation

The first implementation only needs:

1. a fresh-agent restriction list
2. escalation triggers
3. an explicit handoff/escalation record shape

That is enough to reduce early-agent damage without freezing fresh agents out
of all useful work.

## Immediate Follow-On

These rules should feed:

1. agent trust tier model
2. worker registry schema
3. Gemini first bounded-doc and verification packets
