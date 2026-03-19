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
supersedes:

# add-runtime-stack-history-card

## Requested Outcome

- surface recent stack-mode shifts as a compact desk history card
- make it easier to see whether the local stack is stable, mixed, or changing

## Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web`
- `B:\ohmic\repos\ohmic-administrator\services\runtime-core`

## Constraints

- reuse the current runtime worker and snapshot surfaces
- keep the UI lightweight

## Notes

- this follows the new stack comparison card and runtime badge model
- it should consume runtime truth, not duplicate the calculation in the browser

## Ready When

- a compact history shape is explicit enough to implement without a redesign

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`
- `B:\ohmic\repos\ohmic-administrator\services\runtime-core\src`
- `B:\ohmic\repos\ohmic-administrator\docs\local`

