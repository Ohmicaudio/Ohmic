# Ohmic Support Operations Checklist

Date: 2026-03-20
Scope: `ohmic-audio-labs` support capture, `ohmic-administrator` review and Business Ops follow-through

## Escalation Thresholds

- `Aged critical`
  critical support older than `1h`
- `Aging first response`
  no response draft older than `2h`
- `Aging follow-up`
  `needs_follow_up` older than `1d`

## Daily Operator Loop

1. Review `Warning Review` in `ohmic-administrator` for critical or screenshot-backed support.
2. Use `Business Ops > Support Feedback Review` for day-to-day triage, owner assignment, and response drafting.
3. Clear `Aged critical` items before widening into other queue work.
4. Clear `Aging first response` items before widening into outbound or docs work.
5. Clear `Aging follow-up` items before treating the support lane as healthy.
6. Mark support items with one explicit resolution state:
   - `acknowledged`
   - `fixed`
   - `needs_follow_up`
7. Hand back to `Administrator` when queue ownership, runtime action, audit-heavy routing, or cross-lane note/tag work is needed.

## Launch-Read Checks

- User-facing report entry is available on main app surfaces.
- Screenshot upload is optional, not required.
- Recent report status is visible back in the main app.
- Administrator imports support reports into:
  - intake queue
  - notes
  - tags
  - audit
  - warning review
- Business Ops can:
  - assign owner
  - save triage note
  - draft response
  - set resolution
  - mark responded
  - reopen or clear response state
- Response and resolution state persist across reloads and return to the user-facing app history.

## Boundary Rule

Keep this checklist in umbrella docs, not in a product root. Product repos should hold only bounded implementation-local notes; cross-product support operations live here.
