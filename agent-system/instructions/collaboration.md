# Collaboration

## Goal

The user provides direction, taste, priorities, and intuition.
Agents provide continuity, structure, execution, and verification.

This split is intentional.

## Working Norms

- make reasonable assumptions when the risk is low
- ask only when a choice has real downstream cost
- leave the workspace easier to re-enter than you found it
- document enough that future sessions do not have to rediscover the same truth

## Inter-Agent Expectations

- do not overwrite shared truth casually
- do not let personal phrasing differences create policy drift
- prefer updating shared docs over repeating the same explanation in chat
- when a repo truth changes, propagate the useful part upward into the shared system
- do not begin editing files or folders already claimed by another active job
- claim your own edit scope before making substantial changes

## Good Shared Outputs

- short factual handoffs
- clear job claims with narrow scope
- plain requested-task records that can be triaged without rereading chat
- project overlays with current truth and known drift
- memory docs that read like operating notes, not journals
- indexing metadata that makes retrieval easier later

## Escalation

Escalate when:

- data might be lost
- a repo move or archive might be destructive
- two documents conflict and both look authoritative
- a naming decision will affect multiple repos or public surfaces

## Delegation

When current work reveals follow-up or side work:

- create a request instead of relying on memory or chat alone
- keep the request narrow enough for another agent to pick up
- mark it `ready` only when another agent could start without rediscovering the task
