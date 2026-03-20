# Ohmic System-Wide User Feedback Reporting

Date: 2026-03-20

## Purpose

Define one consistent user-facing reporting outcome across Ohmic surfaces:

- user-facing web pages
- Business/ops surfaces
- mobile-adjacent views
- future Android-wrapped views

The implementation can differ by surface, but the outcome should stay consistent:

1. text report is always available
2. screenshot is optional
3. route/page/build/session context is attached automatically when available
4. reports land in one structured support/triage lane
5. review and escalation can happen without hunting across repos

## Current Floor

The first real implementation now lives in `ohmic-audio-labs`:

- shared support payload contract in `services/featureApi.ts`
- shared page issue helpers in `utils/pageIssueReporter.ts`
- backend support intake in `services/backend/src/index.ts`
- support request normalization/dedupe in `services/backend/src/featureData.ts`
- support triage and GitHub bridge in `services/backend/src/supportIssueBridge.ts`

## System-Wide Rules

### 1. Text first, screenshot optional

Every user-facing report flow should require enough text to answer:

- what the user was trying to do
- what happened instead

Screenshot should stay optional because:

- it adds privacy and friction concerns
- some device/browser contexts make capture awkward
- text is still the searchable, clusterable source of truth

### 2. One outcome, many wrappers

Different surfaces may render the reporter differently:

- modal
- embedded card
- floating feedback button
- mobile sheet

But they should all normalize into the same support request shape and land in the same intake/triage lane.

### 3. Filesystem paths are provenance, not UX

From a laptop/browser, the user should not need a `B:\...` path to report a problem.

The browser workflow should remain:

- open report form
- write text
- optionally attach screenshot
- send

### 4. Screenshot storage is explicit

Screenshot uploads should be:

- optional
- bounded in type/size
- stored under explicit support screenshot storage
- referenced by `screenshot_ref`

They should not be silently auto-captured by default.

### 5. Routing stays centralized

Surface UIs should not invent their own inboxes.

They should all submit through the shared support request path so the system can:

- dedupe reports
- cluster repeated faults
- escalate high-severity pages
- route to GitHub / admin / review lanes later

## Initial Implementation Choice

The first system-wide floor uses:

- required text
- optional manual screenshot attachment
- automatic context capture:
  - route
  - page id/title
  - app surface
  - viewport
  - build/app version
  - session/node/trace ids when available
  - optional lightweight diagnostics

This is preferred over screenshot-only or screenshot-required reporting.

## Next Follow-On

1. expose triage view in the operator/business surfaces
2. add reviewer ownership and resolution flow for user-facing reports
3. reuse the same support payload for non-bug feedback:
   - confusing behavior
   - UI improvement suggestion
   - feature suggestion
4. decide where final production accounts can enable/disable the reporter:
   - overlay policy
   - account flags
   - surface profile

## Boundary

This note belongs in the umbrella roadmap because it defines a cross-surface operating rule, not a single repo-local implementation detail.
