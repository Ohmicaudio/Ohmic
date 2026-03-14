# Static Next-Wave Execution Guide

Date: 2026-03-14

## Purpose

Turn the current ready queue into explicit execution order with concrete targets,
asset names, and finish checks.

Use this guide for:

- remaining `reference` graphics production
- encoding-defect scanning
- post-graphics route smoke checks
- app/static boundary verification

## Execution Order

### 1. Encoding scan first

Run the encoding scan before adding more assets to unknown-dirty pages.

Primary task:

- `agent-system/requests/ready/2026-03-14-scan-static-pages-for-remaining-encoding-defects.md`

Goal:

- produce a concrete defect list
- decide whether fixes are tiny enough to do immediately or need split follow-up tasks

## Suggested scan commands

From `B:\ohmic\repos\ohmic-audio-static-content`:

```bash
rg -n '�|â€”|â€“|â€œ|â€|â€™|Ã|Â' public
rg -n '<meta name="description".*(VISUAL PLACEHOLDER|â|Ã|�)' public
rg -n '\[VISUAL PLACEHOLDER:' public
```

Record:

- file path
- defect class
- whether it is body text, metadata, caption, or heading

### 2. Reference graphics production

Work these as separate reusable-family tasks.

Recommended order:

1. `Speaker Anatomy Detailed`
2. `Wavelength Frequency Chart`
3. `Full Electrical System Diagram`
4. `Alternator Whine Diagnostic Flowchart`

Reason:

- `speaker_anatomy.svg` already exists and may only need placement or refinement
- `wavelength` is compact and repeated twice
- `full electrical` is high value but sits near other placeholders, so it needs a careful narrow edit
- `alternator whine` is also narrow and repeated twice

### 3. Reference page QA

After the current reference graphics wave:

- `agent-system/requests/ready/2026-03-14-run-post-graphics-page-qa-reference.md`

### 4. Static route and asset smoke check

Then run:

- `agent-system/requests/ready/2026-03-14-run-static-route-and-asset-smoke-check.md`

### 5. App/static boundary verification

Then run:

- `agent-system/requests/ready/2026-03-14-verify-app-static-boundary-after-graphics-wave.md`

## Reference Graphics Asset Map

### Speaker Anatomy Detailed

Use or extend:

- `assets/engineering-diagrams/images/diagrams/speaker_anatomy.svg`

Target pages:

- `reference/visual/speaker-anatomy-cross-section/index.html`
- `reference/visual/sections/9-3-speaker-and-enclosure-reference-diagrams/index.html`

Placeholder brief:

- cross-section woofer diagram
- label dust cap, cone, surround, spider, voice coil former, windings, top plate, magnet, back plate/yoke, pole piece, basket/frame, and terminal cup
- keep labels instructional, not decorative

Important:

- do not also replace the T/S parameter or enclosure blueprint placeholders in the section page during this task

### Wavelength Frequency Chart

Create:

- `assets/engineering-diagrams/images/diagrams/wavelength_frequency_chart.svg`

Target pages:

- `reference/math-measurement/wavelength/index.html`
- `reference/math-measurement/sections/6-2-acoustic-formulas/index.html`

Placeholder brief:

- log-log wavelength vs frequency chart
- cover `20 Hz` through `20 kHz`
- mark car-relevant dimensions such as door width and cabin length

Important:

- keep the chart readable on narrow mobile widths
- use a true chart layout, not decorative infographic styling

### Full Electrical System Diagram

Create:

- `assets/engineering-diagrams/images/diagrams/full_electrical_system_diagram.svg`

Target pages:

- `reference/visual/complete-electrical-system-overview/index.html`
- `reference/visual/sections/9-4-electrical-reference-diagrams/index.html`

Placeholder brief:

- alternator -> battery -> main fuse -> distribution block -> individual amplifier fuses -> amplifiers
- show ground paths from each amp to chassis to battery
- show remote turn-on chain from head unit
- label wire gauges and fuse ratings

Important:

- do not absorb the other remaining placeholders in the section page (`Fuse Type Reference Chart`, `Proper Ground Point Preparation`, `Big Three Upgrade Diagram`)
- replace only the `Full Electrical System Diagram` family in this task

### Alternator Whine Diagnostic Flowchart

Create:

- `assets/engineering-diagrams/images/diagrams/alternator_whine_diagnostic_flowchart.svg`

Target pages:

- `reference/troubleshooting/alternator-whine/index.html`
- `reference/troubleshooting/sections/7-2-noise-and-interference-troubleshooting/index.html`

Placeholder brief:

- start at `whine present?`
- branch through engine on/off test
- branch through RCA disconnect test
- branch through ground-point checks
- end with repair/action suggestions such as ground correction or noise filter

Important:

- keep the flow readable as a troubleshooting decision tree
- prefer square decision boxes and labeled yes/no branches over generic icons

## Graphics Insertion Rules

For each graphics task:

1. create or refine the SVG asset
2. add or update metadata text file if the family does not already have one
3. replace only the matching placeholder block
4. use real `alt` text and a useful `figcaption`
5. do not silently fix unrelated placeholders on the same page unless the request explicitly says to

## Minimum Verification Per Graphics Task

- target asset exists in `public/assets/engineering-diagrams/images/diagrams/`
- target pages no longer contain that exact placeholder family marker
- no other placeholder family was removed accidentally
- inserted figure uses the shared styling path in `assets.css`
- metadata and captions remain human-readable

## Route Smoke Sample Set

Use these for the smoke check task:

- `/reference/`
- `/reference/visual/`
- `/reference/visual/speaker-anatomy-cross-section/`
- `/reference/visual/complete-electrical-system-overview/`
- `/reference/math-measurement/wavelength/`
- `/reference/troubleshooting/alternator-whine/`
- at least one direct asset URL for each newly added reference SVG

## App/Static Boundary Sample Set

Check these surfaces:

- `B:\ohmic\repos\ohmic-audio-labs\utils\staticContent.ts`
- `B:\ohmic\repos\ohmic-audio-labs\index.html`
- `B:\ohmic\repos\ohmic-audio-labs\vite.config.ts`
- `B:\ohmic\repos\ohmic-audio-labs\netlify.toml`
- `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts`

Confirm:

- default static base still points at the current static host
- reserved static routes still redirect cleanly
- favicon and logo still resolve externally
- no repo-local `public` assumption has crept back in
