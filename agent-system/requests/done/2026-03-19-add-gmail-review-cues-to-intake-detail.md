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

# add gmail review cues to intake detail

## Requested Outcome

- surface Gmail duplicate-review status directly in intake detail
- show safe Gmail attachment preview cues in the selected intake lane so operators do not have to bounce to the attachment panel for first review

## Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`

## Constraints

- keep the floor bounded to intake detail and related read helpers
- do not add live Gmail auth
- reuse stored preview data already captured for the Gmail fixture lane

## Notes

- Gmail fixture import, live context synthesis, duplicate review, attachment context, and attachment preview floor are already landed
- this pass should tighten the middle-lane operator loop, not widen into a new connector or business surface

## Ready When

- ready now

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`

