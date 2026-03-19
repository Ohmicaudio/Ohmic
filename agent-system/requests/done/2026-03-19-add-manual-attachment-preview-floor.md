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

# add manual attachment preview floor

## Requested Outcome

- let text-like manual intake attachments carry a safe persisted preview excerpt that can be reviewed from the administrator desk
- keep the preview floor bounded to manual-intake attachments already imported through the current file-backed lane

## Scope

- `packages/contracts/src/admin/manual-intake.ts`
- `services/connectors/manual-intake/src/manualIntake.ts`
- `services/connectors/manual-intake/src/manualIntake.test.ts`
- `services/admin-api/src/index.ts`
- `services/admin-api/src/index.test.ts`
- `apps/admin-web/src/api/manualIntake.ts`
- `apps/admin-web/src/panels/AttachmentPreviewPanel.tsx`

## Constraints

- do not add arbitrary file reads from the browser
- preview only text-like content already captured during manual import
- keep existing attachment review and runtime handoff behavior intact
- land this as one bounded slice with green validation

## Notes

- manual intake already persists attachment metadata JSON under `manual-intake/attachments`
- the next step is to persist safe preview text alongside that metadata and expose it through a narrow API route
- the attachment review lane already knows the selected manual envelope and attachment ids

## Ready When

- ready now

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\packages\contracts`
- `B:\ohmic\repos\ohmic-administrator\services\connectors\manual-intake`
- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\api`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`

