scope: project
authority: working
project: ohmic-administrator
status: done
requested: 2026-03-19
requester: codex
origin: agent
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id:
topic: runtime-stack-mode
queue_epoch: 2026-03-18-ohmic-administrator-product-extraction
review_after:
review_status: current
supersedes: 2026-03-16-define-hybrid-stack-mode-switch-audit-event-family

# add-hybrid-stack-mode-switch-audit-events

## Requested Outcome

- add an auditable event family when hybrid dominant mode changes
- make stack-mode changes traceable instead of only visible in the current
  projection

## Scope

- `B:\ohmic\repos\ohmic-administrator\services\runtime-core`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web` if a small event display
  is needed

## Constraints

- extend the current extracted runtime-core instead of inventing a second event
  system
- do not redesign the desk

## Notes

- this is the post-extraction successor to the older hybrid-mode audit packet
- current runtime stack summary already computes dominant mode and threshold

## Ready When

- the event payload and trigger points are clear enough to implement

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\services\runtime-core`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`
- `B:\ohmic\repos\ohmic-administrator\docs\local`

