# Ohmic Support Launch-Read Review

Date: 2026-03-20
Scope: `ohmic-audio-labs` user-facing feedback surfaces + `ohmic-administrator` support connector, warning review, and Business Ops support flow

## Current Path

1. User-facing pages in `ohmic-audio-labs` expose a consistent text-first support report action with optional screenshot upload.
2. Reports persist into the shared support request feed and screenshot storage.
3. `ohmic-administrator` imports that feed through the `support-feedback` connector into:
   - intake queue
   - notes
   - tags
   - audit
   - warning review
4. Business Ops can triage the report, assign an owner, draft a response, and now set a support resolution state:
   - `acknowledged`
   - `fixed`
   - `needs_follow_up`
5. The persisted response/writeback feed flows back into `ohmic-audio-labs`, where the reporting user can now see recent report status and the latest saved response context.

## What Is Launch-Ready Enough

- The support loop is no longer trapped in one app.
- Screenshot-backed reports can be triaged from both the control plane and Business Ops.
- Support response drafts and support resolution states now share one persisted writeback record instead of fragmented local-only state.
- The main app can show a clearer user-facing status ladder:
  - `Received`
  - `Draft reply`
  - `Responded`
  - `Acknowledged`
  - `Fixed`
  - `Needs follow-up`
- The cross-product support review note lives in the umbrella roadmap instead of product repos.

## Remaining Gaps Before Calling It Launch-Clean

### 1. Actual outbound user reply transport is still implied, not fully provider-backed.

Business Ops can now persist response drafts and response/resolution state through the connector writeback lane, but the system still behaves more like "recorded support follow-through" than a full end-user messaging transport.

For launch, this is acceptable if:

- the immediate goal is owner/operator support coordination
- user-facing status updates are enough
- direct reply transport is still handled manually or by a separate bounded channel

For post-launch hardening, the next seam is a real support reply transport/writeback adapter.

### 2. Support SLA/aging pressure is not yet explicit.

The system now shows queue pressure, response state, and ownership, but it does not yet elevate "old unresolved support" as a first-class timing signal.

Recommended next metric lane:

- age of oldest `critical` support item
- age of oldest `no response` item
- count of `needs_follow_up` items older than one day

### 3. Launch instructions for support operations should stay umbrella-level.

Do not put a cross-project launch playbook into product roots. Keep it under umbrella docs so operators can answer:

- where reports enter
- where triage happens
- where status is visible
- who owns response decisions

## Recommended Launch Posture

Use this support operating model at launch:

- `ohmic-audio-labs`
  - users submit support reports
  - users can see recent report status and latest saved reply/update
- `ohmic-administrator`
  - warning review is the control-plane escalation surface
  - Business Ops is the day-to-day support triage and response surface
- owner/operator workflow
  - triage
  - assign
  - draft response
  - set support resolution
  - hand off to Administrator if needed
  - reflect the latest status back to the user-facing app

## Bottom Line

The support lane is now strong enough for launch-mode use as an operator support system.

It is not yet a full automated customer-support transport stack, but it is now a coherent loop across:

- report capture
- screenshot context
- admin intake
- warning review
- business triage
- response drafting
- resolution tracking
- user-facing status visibility

That is a launch-capable floor.
