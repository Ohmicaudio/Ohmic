scope: project
authority: working
project: ohmic-audio-static-content
status: done
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: soon
blocking: no
depends_on:
handoff_from: 2026-03-14-audit-static-content-quality-buckets
claim_id: 20260314T040055Z-220bda74
topic: requested-task

# Polish static-content `dsp` quality bucket

## Requested Outcome

- replace the generic `dsp/index.html` landing page with a real section hub
- clean up or explicitly triage publication-time visual placeholders in the bucket
- preserve the current static-host content while making the section presentation more production-ready

## Completion

- rewrote `dsp/index.html` into a real section hub with routing by task, experience level, workflow, and chapter map
- converted raw `[VISUAL PLACEHOLDER: ...]` blocks into publish-safe `Illustration note:` callouts across all remaining DSP pages that needed them
- reduced generic DSP landing pages from `1` to `0`
- reduced raw DSP placeholder pages from `11` to `0`
- the DSP bucket now has no remaining generic landing-page metadata or publication-time placeholder markers

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public\dsp`
- `B:\ohmic\docs\migration\STATIC_CONTENT_QUALITY_AUDIT_PLAN_2026-03-13.md`

## Notes

- bucket pages audited: `36`
- pages with `[VISUAL PLACEHOLDER: ...]` markers: `11`
- generic section landing page still present: `dsp/index.html`
- representative cleanup targets:
  - `dsp/index.html`
  - `dsp/beginner-level-do-you-need-a-dsp/index.html`
  - `dsp/installer-level-eq-workflow-and-filter-strategy/index.html`
  - `dsp/sections/12-1-dsp-platform-selection/index.html`

## Ready When

- the section landing page reads like a real hub instead of an auto-index
- visual placeholder debt is reduced, replaced, or explicitly isolated
- remaining graphics requests are captured intentionally instead of shipping as raw placeholders
