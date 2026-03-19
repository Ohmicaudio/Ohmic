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
topic: requested-task
queue_epoch: 2026-03-18-ohmic-administrator-product-extraction
review_after:
review_status: current
supersedes:

# add gmail attachment preview floor

## Requested Outcome

- add a bounded safe preview floor for Gmail fixture attachments
- let the desk show actual stored text preview context for supported Gmail attachment types instead of metadata only

## Scope

- `B:\ohmic\repos\ohmic-administrator\services\connectors\gmail`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web`

## Constraints

- do not add live Gmail auth
- keep previews bounded to safe stored text-like content
- do not turn this into a full document viewer
- reuse the same preview patterns already used for manual intake where practical

## Notes

- Gmail fixture intake, queue/runtime visibility, live note/tag/audit synthesis, duplicate review signal, and attachment review context are already landed
- this is the next Gmail maturity pass before deciding whether to widen into live provider auth or a separate business surface

## Ready When

- ready now

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\services\connectors\gmail`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web`
