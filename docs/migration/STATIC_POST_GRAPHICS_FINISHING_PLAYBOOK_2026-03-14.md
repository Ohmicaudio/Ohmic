# Static Post-Graphics Finishing Playbook

Date: 2026-03-14

## Purpose

Define the cleanup and verification work that follows graphics insertion in
`ohmic-audio-static-content`.

This is the pass that turns:

- placeholder replacement
- one-off edits
- opportunistic cleanup

into a stable, publishable static surface.

## Core Rule

Do not treat graphics insertion as the end of the job.

Every graphics wave should be followed by:

1. encoding verification
2. page-level QA
3. route/asset QA
4. app/static-boundary verification where relevant

## Required Order

### 1. Graphics production

- create or place the visual asset
- remove the placeholder marker
- keep edits narrow to the target family/pages

### 2. Encoding pass

- scan edited pages for mojibake, broken punctuation, replacement chars, and malformed metadata
- normalize only the defective pages; do not run blind repo-wide rewrites

### 3. Page QA pass

Check each affected bucket for:

- broken layout
- oversized or misaligned figures
- weak or missing alt text
- bad captions
- placeholder text left in body or metadata
- broken links introduced by the new asset

### 4. Route and asset QA

Check that:

- asset paths resolve
- images load from the expected static host path
- no page now references a missing file
- section and index pages still render cleanly

### 5. App/static boundary verification

Where the app still links into the static tier, confirm:

- links point to the canonical static surface
- no old app-side static assumptions are reintroduced
- no fallback behavior regresses due to asset-path changes

## Do / Do Not

Do:

- keep tasks small and bucketed
- prefer one family or one verification surface per task
- record concrete defects and outcomes
- reuse the graphics production catalog instead of inventing assets ad hoc

Do not:

- reopen parity work
- do broad copy rewrites during QA passes
- mix graphics production and route verification into one giant task
- claim a whole bucket if the real work is one family or one QA surface

## Deliverable Shapes

### Graphics task

- asset created
- target pages updated
- placeholder removed

### Encoding task

- affected files listed
- defect type stated
- normalization completed without content drift

### Page QA task

- pages checked
- failures listed
- fixes applied or follow-ups queued

### Route/asset QA task

- URLs or paths checked
- pass/fail stated
- broken asset references listed explicitly

### Boundary task

- app-side entrypoints checked
- static host assumptions verified
- regressions listed explicitly

## Current Post-Graphics Buckets

After the current graphics wave, use these work classes:

- encoding cleanup
- page QA by bucket
- route and asset smoke checks
- app/static boundary verification
- coordination cleanup

## Source Surfaces

- `B:\ohmic\repos\ohmic-audio-static-content\content-work\GRAPHICS_PRODUCTION_CATALOG_2026-03-14.md`
- `B:\ohmic\repos\ohmic-audio-static-content\content-work\ENCODING_AUDIT_2026-03-13.md`
- `B:\ohmic\repos\ohmic-audio-static-content\content-work\STATIC_PREVIEW_QA_2026-03-13.md`
- `B:\ohmic\agent-system\requests\ready\`

