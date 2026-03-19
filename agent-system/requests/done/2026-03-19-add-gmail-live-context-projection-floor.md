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

# add gmail live context projection floor

## Requested Outcome

- make imported Gmail fixture envelopes synthesize the same first desk context that manual intake already does
- expose Gmail-created note, tag, and audit rows through the live projection merge surfaces

## Scope

- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`
- any Gmail connector read surface needed to support context synthesis
- desk surfaces that already consume note, tag, and audit projections

## Constraints

- do not add live Gmail auth yet
- keep this slice bounded to live projection/context synthesis, not a brand new Gmail UI
- preserve the existing projection names and desk behavior

## Notes

- Gmail fixture intake floor landed on `main` in the extracted product repo
- the next maturity step is making Gmail packets feel first-class in note/tag/audit history the same way manual intake now does
- this should stay in the same control-plane desk, not the future separate social/business ops surface

## Ready When

- ready now

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\packages\contracts`

