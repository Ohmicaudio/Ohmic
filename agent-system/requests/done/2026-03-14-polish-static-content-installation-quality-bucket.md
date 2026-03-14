scope: project
authority: working
project: ohmic-audio-static-content
status: done
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: now
blocking: no
depends_on:
handoff_from: 2026-03-14-audit-static-content-quality-buckets
claim_id: 20260314T034847Z-5462bd2e
topic: requested-task

# Polish static-content `installation` quality bucket

## Requested Outcome

- replace the generic `installation` landing pages with real section hubs
- clean up expanded markers and publication-time visual placeholders in the bucket
- leave the highest-debt first-wave section clearly improved and easier to finish

## Completion

- rewrote `installation/index.html` into a real section hub with routing by job, experience level, and section map
- rewrote `installation/advanced/index.html` into a real advanced-installation hub with goal-based routing and a chapter map
- removed the remaining `Content from original document, expanded` markers from:
  - `installation/index.html`
  - `installation/beginner-level-understanding-power-requirements/index.html`
  - `installation/sections/2-5-power-and-power-wiring/index.html`
- reduced generic installation landing pages from `2` to `0`
- reduced expanded-marker pages from `3` to `0`
- intentionally split the remaining `30` illustration-placeholder pages into a dedicated follow-up bucket so the rest of the cleanup can stay small and traceable

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public\installation`
- `B:\ohmic\docs\migration\STATIC_CONTENT_QUALITY_AUDIT_PLAN_2026-03-13.md`

## Notes

- bucket pages audited: `46`
- pages with `[VISUAL PLACEHOLDER: ...]` markers: `30`
- generic section landing pages still present:
  - `installation/index.html`
  - `installation/advanced/index.html`
- pages still containing `Content from original document, expanded`: `3`
- representative cleanup targets:
  - `installation/index.html`
  - `installation/advanced/index.html`
  - `installation/advanced/beginner-level-enclosure-types-explained/index.html`
  - `installation/beginner-level-understanding-power-requirements/index.html`
  - `installation/sections/2-5-power-and-power-wiring/index.html`

## Ready When

- the main installation landing pages read like real hubs instead of auto-indexes
- expanded-marker debt is removed
- placeholder-heavy pages are cleaned up or intentionally triaged
