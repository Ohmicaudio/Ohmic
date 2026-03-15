# Build Page Report Triage Queue View

Status: done  
Priority: high  
Owner: d  
Claim ID: 20260315T103419Z-78e6fa8c
Repo: `B:\ohmic\repos\ohmic-audio-labs`

## Goal

Make page issue reports visible and actionable in the admin triage queue.

## Deliverables

- route-filtered cluster list
- category/severity filters
- duplicate count and first/last seen
- build/version grouping
- GitHub sync status per cluster

## Acceptance

- triage view can isolate one broken page quickly
- duplicate user submissions cluster instead of flooding the queue
- escalated engineering issues are linked back to the cluster

## Outcome

Completed on 2026-03-15.

Result:

- extended `/api/support/triage` with route, category, severity, build, and
  version filtering
- decorated triage clusters with GitHub link status from the existing support
  issue-link feed
- added an admin triage queue panel in the community workspace with filters,
  grouped build/version summary, duplicate counts, and linked issue status

## Verification

- `npx vitest run test/backend/supportRequestEndpoint.test.ts test/backend/supportTriageEndpoints.test.ts`
- `npm run build`
