# Static Next Task Sequence

Date: 2026-03-14

## Purpose

Give the next few tasks an explicit execution order so the graphics and QA work can move without re-planning each pickup.

This is a short-horizon sequence, not a full roadmap.

## Current Truth

- migration rescue is not the active problem anymore
- the `public` encoding scan is done
- the only urgent metadata contamination found by that scan was fixed in `ohmic-audio-static-content` commit `2265e3f`
- the remaining work is reusable-family graphics production followed by QA and boundary verification

## Recommended Sequence

### Wave A: highest-leverage reusable families

Do these first because each clears multiple pages and unlocks later QA.

1. `produce-subwoofer-ts-parameter-design-flowchart-graphic`
2. `produce-subwoofer-enclosure-bracing-diagram-graphic`
3. `produce-reference-speaker-anatomy-detailed-graphic`
4. `produce-reference-wavelength-frequency-chart-graphic`

## Why Wave A first

- `T/S Parameter Design Flowchart` clears 3 subwoofer pages
- `Enclosure Bracing Diagram` clears 3 subwoofer pages
- `Speaker Anatomy Detailed` is already partially scaffolded by an existing asset family
- `Wavelength Frequency Chart` is a compact, high-value chart reused twice

### Wave B: second line of reusable families

Start these after Wave A is underway or complete.

5. `produce-subwoofer-bandpass-response-curves-graphic`
6. `produce-subwoofer-ported-enclosure-diagram-graphic`
7. `produce-reference-full-electrical-system-diagram-graphic`
8. `produce-reference-alternator-whine-diagnostic-flowchart-graphic`

## Why Wave B next

- keeps focus on repeated families before one-off cleanup
- avoids jumping into lower-leverage specialist diagrams too early
- gives the reference bucket enough new work to justify a page QA pass

### Wave C: remaining subwoofer specialist families

9. `produce-subwoofer-fourth-order-bandpass-diagram-graphic`
10. `produce-subwoofer-slot-port-detail-graphic`
11. `produce-subwoofer-sealed-enclosure-diagram-graphic`
12. `produce-subwoofer-sealed-box-blueprint-12inch-graphic`
13. `produce-subwoofer-sealed-box-panel-layout-graphic`
14. `produce-subwoofer-passive-radiator-system-graphic`
15. `produce-subwoofer-constrained-layer-damping-cross-section-graphic`
16. `produce-subwoofer-competition-sub-comparison-chart-graphic`
17. `produce-subwoofer-qts-enclosure-matching-chart-graphic`

## QA and Verification Follow-On

Run these only after a meaningful graphics wave lands.

18. `run-post-graphics-page-qa-reference`
19. `run-static-route-and-asset-smoke-check`
20. `verify-app-static-boundary-after-graphics-wave`

## Parallel Split

If two people are working:

- person 1:
  - `produce-subwoofer-ts-parameter-design-flowchart-graphic`
  - `produce-subwoofer-enclosure-bracing-diagram-graphic`
- person 2:
  - `produce-reference-speaker-anatomy-detailed-graphic`
  - `produce-reference-wavelength-frequency-chart-graphic`

If three people are working:

- person 1:
  - subwoofer flowchart / enclosure families
- person 2:
  - reference anatomy / wavelength families
- person 3:
  - route + boundary prep only after the first four graphics tasks are merged

## Do Not

- do not reopen encoding scan as a vague cleanup lane
- do not mix route smoke checks into graphics production commits
- do not claim a whole bucket when one family task will do
- do not consume unrelated placeholders from a shared section page unless the task explicitly includes them

## Finish Condition For This Sequence

This short sequence is complete when:

- Wave A and Wave B graphics families are landed
- reference QA is ready to run against meaningful new asset coverage
- route/asset smoke check and app/static boundary verification have a stable post-wave target
