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
handoff_from: 2026-03-14-polish-static-content-installation-quality-bucket
claim_id: 20260314T035611Z-3d6dd7d6
topic: requested-task

# Clean up static-content `installation` graphics placeholder bucket

## Requested Outcome

- remove or replace publication-time `[VISUAL PLACEHOLDER: ...]` blocks across the remaining installation pages
- leave illustration requests explicit and publish-safe instead of shipping raw placeholders

## Completion

- converted raw `[VISUAL PLACEHOLDER: ...]` blocks into publish-safe `Illustration note:` callouts across all remaining installation pages
- changed `30` installation pages in total:
  - `11` base installation pages
  - `4` base section pages
  - `10` advanced installation pages
  - `5` advanced section pages
- reduced raw installation placeholder pages from `30` to `0`
- installation now has no remaining generic landing pages, expanded-marker text, or raw publication-time placeholder blocks

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public\installation`
- `B:\ohmic\docs\migration\STATIC_CONTENT_QUALITY_AUDIT_PLAN_2026-03-13.md`

## Notes

- installation landing pages are already rewritten and expanded-marker debt is already removed
- remaining installation pages with raw `[VISUAL PLACEHOLDER: ...]` markers: `30`
- representative cleanup targets:
  - `installation/advanced/beginner-level-enclosure-types-explained/index.html`
  - `installation/advanced/beginner-level-multi-amplifier-systems/index.html`
  - `installation/advanced/engineer-level-emi-theory-and-advanced-mitigation/index.html`
  - `installation/advanced/installer-level-practical-enclosure-design/index.html`
  - `installation/sections/2-5-power-and-power-wiring/index.html`

## Ready When

- placeholder blocks are removed, replaced, or intentionally converted into publish-safe illustration callouts
- the remaining installation pages read as finished publishing surfaces rather than draft production notes
