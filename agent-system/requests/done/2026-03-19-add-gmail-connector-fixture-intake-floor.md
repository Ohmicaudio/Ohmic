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

# add gmail connector fixture intake floor

## Requested Outcome

- add the first bounded Gmail intake floor using local fixtures, not live auth
- normalize Gmail-shaped receipts into the provider-agnostic envelope and make them visible to the administrator runtime

## Scope

- `B:\ohmic\repos\ohmic-administrator\services\connectors\gmail`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`
- any intake-queue merge surface needed to make imported Gmail fixtures visible

## Constraints

- do not implement live Gmail auth yet
- use local fixture files to prove the connector shape first
- keep the first slice bounded to receipt storage, envelope normalization, and desk visibility

## Notes

- manual-intake and drop-folder seams are now mature enough to move to the next connector
- this first Gmail slice should prove provider-shaped normalization without bringing OAuth or background sync into scope

## Ready When

- ready now

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\services\connectors\gmail`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`

