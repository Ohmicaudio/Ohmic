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
topic: manual-intake
queue_epoch: 2026-03-18-ohmic-administrator-product-extraction
review_after:
review_status: current
supersedes:

# add-manual-intake-duplicate-review-signal

## Requested Outcome

- detect and surface likely duplicate manual packets before the operator routes
  them again
- make reuse and correction easier than accidental duplicate queue churn

## Scope

- `B:\ohmic\repos\ohmic-administrator\services\connectors\manual-intake`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web`

## Constraints

- lightweight signal first, not a heavy dedupe subsystem
- keep the operator in control

## Notes

- current manual intake can reload and reuse older packets, but it does not yet
  flag likely duplicates clearly

## Ready When

- there is a deterministic similarity floor good enough for a first signal

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\services\connectors\manual-intake`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store`

