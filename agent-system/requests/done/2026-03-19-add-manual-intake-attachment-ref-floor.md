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

# add-manual-intake-attachment-ref-floor

## Requested Outcome

- let file-backed manual intake produce stable attachment refs instead of only a
  body import
- preserve attachment truth into the envelope shape for later provider work

## Scope

- `B:\ohmic\repos\ohmic-administrator\services\connectors\manual-intake`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web`

## Constraints

- keep manual intake first-class before Gmail
- do not jump ahead to full provider console behavior

## Notes

- current manual intake supports file-backed drafts but not richer attachment
  reference handling yet

## Ready When

- the connector can add attachment refs without breaking the current desk loop

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\services\connectors\manual-intake`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src`

