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
topic: requested-task
queue_epoch: 2026-03-18-ohmic-administrator-product-extraction
review_after:
review_status: current
supersedes:

# add business ops overview and handoff floor

## Requested Outcome

- give the Business Ops workspace a real overview and current-work summary
- make the screen show queue pressure, next-action posture, and explicit handoff guidance back to Administrator

## Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web`
- `B:\ohmic\repos\ohmic-administrator\README.md`

## Constraints

- keep the floor bounded to Business Ops workspace composition and local helpers
- do not add a full scheduler or analytics backend yet
- keep Administrator as the control plane and use handoff cues rather than duplicating its controls

## Notes

- Business Ops shell and first outbound/reply queues are already landed
- this pass should make that new screen read like a real operating workspace instead of a shell plus cards

## Ready When

- ready now

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web`
- `B:\ohmic\repos\ohmic-administrator\README.md`

