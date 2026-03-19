scope: project
authority: working
project: ohmic-administrator
status: ready
requested: 2026-03-19
requester: codex
origin: agent
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id:
topic: runtime-worker-feedback
queue_epoch: 2026-03-18-ohmic-administrator-product-extraction
review_after:
review_status: current
supersedes:

# surface-worker-status-failures-in-runtime-feedback

## Requested Outcome

- make paused or disabled worker failures obvious in runtime feedback banners and
  desk actions
- shorten the loop between failed dispatch and the next correct operator move

## Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api`

## Constraints

- use the existing worker control lifecycle
- do not redesign the runtime desk

## Notes

- the backend already rejects dispatch on non-active workers
- the desk should turn that into actionable operator feedback instead of a raw
  error feel

## Ready When

- the failure case and next recommended actions are clear enough to wire up

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api\src`
