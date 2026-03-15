# Implement Page Report Button On Core Surfaces

Status: done  
Priority: high  
Owner: d  
Claim ID: 20260315T103754Z-3231bc4d
Repo: `B:\ohmic\repos\ohmic-audio-labs`

## Goal

Add a `Report issue` entry point on the most important user-facing surfaces first.

## Initial Surfaces

- main interactive app shell
- toolbox surfaces
- high-traffic static-adjacent app pages

## Deliverables

- reusable report-button component
- modal trigger and submission path
- route-aware context capture
- graceful no-screenshot fallback

## Acceptance

- a user can submit a page issue in one short flow
- report includes auto-captured page context
- implementation uses the existing support intake path

## Outcome

Completed on 2026-03-15.

Result:

- added a shared page-issue reporter helper with issue-kind/severity normalization,
  structured support payload formatting, route-aware context capture, and
  lightweight diagnostics hooks
- added a reusable `PageIssueButton` plus a `PageIssueReportModal` on the main
  BassBuilder app shell and dashboard/static-adjacent surface
- added a toolbox-specific report issue modal wired through the same shared
  helper and existing support intake path
- kept screenshot handling graceful by preserving the opt-in intent in the
  report details when inline screenshot capture is not available yet

## Verification

- `npx vitest run test/utils/pageIssueReporter.test.ts`
- `npm run build`
- `npm --prefix apps/ohmic-toolbox run build`
- `npm --prefix apps/ohmic-toolbox run test`
