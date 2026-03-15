# Ohmic Page Error Reporting System

Updated: 2026-03-15  
Scope: page-level issue capture across Ohmic web/app surfaces  
Priority: high after current completion slices  
Owner: platform/runtime

## Core Decision

Use the Ohmic backend as the primary intake system.

Do not use Git or GitHub as the direct destination for raw user reports.

Why:

- user reports need screenshots, route context, build context, and dedupe before they become engineering work
- GitHub is too noisy for raw duplicate user submissions
- privacy and redaction are easier to control in the Ohmic intake path first
- the repo already has support intake and triage surfaces to extend

## Target Flow

1. User presses `Report issue` on a page.
2. A small modal asks for category, severity, expected vs actual, and optional note.
3. Frontend auto-captures route/build/browser/session context and optional screenshot.
4. Backend stores a normalized support report.
5. Triage groups duplicates into a cluster keyed by fingerprint.
6. Admin review queue shows clustered page reports by severity and recency.
7. GitHub sync opens or updates one engineering issue for the cluster when needed.

## V1 Reporter Options

### Category

- Broken page
- Wrong result
- Visual/layout issue
- Missing image/content
- Button/link not working
- Slow/frozen
- Other

### Severity

- Blocking
- Annoying
- Minor

### User Inputs

- what were you trying to do
- what happened instead
- optional freeform note

### Auto Context

- route
- page id or slug
- app version / build hash
- browser / platform / viewport
- session id
- trace id if present
- relevant feature flags if present
- screenshot if capture succeeds
- recent console/network failure summary if available

## Admin Queue Requirements

- filter by route
- filter by category
- filter by severity
- dedupe by fingerprint
- show first seen / last seen / duplicate count
- show affected build versions
- show GitHub issue link when a cluster is escalated

## Boundary Rules

- raw reports stay in Ohmic first
- GitHub only receives triaged cluster summaries
- screenshots and diagnostics are opt-in where required
- PII must be redacted before external sync
- page reporting must extend the existing support request path, not fork into a separate service

## Recommended Build Order

1. define the page reporter UI contract
2. extend backend support intake schema for page-specific capture
3. add screenshot/context capture helper on the frontend
4. expose triage queue filters for page-route clusters
5. wire GitHub cluster sync after the local queue is trustworthy

## Success Condition

When a user sees a page problem, one click should produce:

- a reproducible report
- enough context for engineering to locate the page and build
- a clustered triage entry instead of duplicate noise
- a clean path from report to fix
