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

# add manual attachment desk priming

## Requested Outcome

- let the manual attachment review surface prime richer desk actions directly from attachment preview context
- shorten the path from attachment review into Step 2 without making routing decisions automatic

## Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\AttachmentPreviewPanel.tsx`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\manualAttachmentReviewContext.ts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels\manualAttachmentReviewContext.test.ts`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store\commandStore.ts`
- optional note in `B:\ohmic\repos\ohmic-administrator\docs\local`

## Constraints

- keep this in the browser/desk layer; no new backend route unless clearly needed
- make the actions explicit operator priming, not auto-execution
- keep existing note priming behavior intact while making it attachment-preview-aware

## Notes

- the previous packet added a safe text preview floor for text-like manual attachments
- the next gap is that attachment preview mostly stops at `Prime review note`
- use preview text, parse hints, and attachment metadata to seed desk actions more effectively

## Ready When

- ready now

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\panels`
- `B:\ohmic\repos\ohmic-administrator\apps\admin-web\src\store`

