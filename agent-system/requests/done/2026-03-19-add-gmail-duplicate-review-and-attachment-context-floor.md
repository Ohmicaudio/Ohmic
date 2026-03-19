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

# add gmail duplicate review and attachment context floor

## Requested Outcome

- add the first duplicate-review signal for imported Gmail fixtures
- surface Gmail attachment refs and safe review context in the desk so Gmail packets feel closer to the manual intake lane

## Scope

- `B:\ohmic\repos\ohmic-administrator\services\connectors\gmail`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web`

## Constraints

- do not add live Gmail auth
- keep the floor bounded to duplicate/review and attachment context, not full Gmail sync
- prefer the same operator patterns already used by manual intake where practical

## Notes

- Gmail fixture intake, queue visibility, runtime handoff, and note/tag/audit synthesis are already landed
- this is the next maturity pass for the bounded Gmail floor before widening toward live auth or a separate business surface

## Ready When

- ready now

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\services\connectors\gmail`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web`

