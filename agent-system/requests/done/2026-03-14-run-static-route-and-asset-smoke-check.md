scope: project
authority: working
project: ohmic-audio-static-content
status: done
requested: 2026-03-14
requester: codex-local
origin: split
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id: 20260314T105117Z-4215180b
topic: requested-task

# Run static route and asset smoke check

## Requested Outcome

- verify that the static tier still serves pages and graphic assets correctly after the graphics wave
- catch missing asset paths, broken links, and obvious route regressions

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public`
- `B:\ohmic\repos\ohmic-audio-static-content\site`
- `B:\ohmic\docs\migration\STATIC_POST_GRAPHICS_FINISHING_PLAYBOOK_2026-03-14.md`
- `B:\ohmic\docs\migration\STATIC_NEXT_WAVE_EXECUTION_GUIDE_2026-03-14.md`

## Completion

- checked these live routes on `https://ohmic-audio-static-content.kzairsoft.workers.dev`:
  - `/reference/`
  - `/reference/visual/`
  - `/reference/visual/speaker-anatomy-cross-section/`
  - `/reference/visual/complete-electrical-system-overview/`
  - `/reference/math-measurement/wavelength/`
  - `/reference/troubleshooting/alternator-whine/`
  - `/reference/math-measurement/ohms-law-and-power/`
  - `/reference/visual/amplifier-setup-card/`
- all checked routes returned `200`
- checked direct asset URLs for current reference SVGs:
  - `/assets/engineering-diagrams/images/diagrams/ohms_law_triangle.svg`
  - `/assets/engineering-diagrams/images/diagrams/amplifier_setup_quick_reference.svg`
  - `/assets/engineering-diagrams/images/diagrams/speaker_anatomy.svg`
- all checked asset URLs returned `200` with `image/svg+xml`
- verified live page source links for:
  - `ohms_law_triangle.svg` from `/reference/math-measurement/ohms-law-and-power/`
  - `amplifier_setup_quick_reference.svg` from `/reference/visual/amplifier-setup-card/`
- explicit note: `/reference/visual/speaker-anatomy-cross-section/` does not yet link `speaker_anatomy.svg`, but that matches the still-ready `Speaker Anatomy Detailed` graphics task rather than a broken route or missing asset regression
- no new broken route or missing-asset regressions were found in the smoke sample set

## Instructions

- sample index pages plus edited topic pages
- verify image paths load
- verify section pages and index pages still link cleanly
- report broken asset or route paths explicitly
- include this minimum sample set:
  - `/reference/`
  - `/reference/visual/`
  - `/reference/visual/speaker-anatomy-cross-section/`
  - `/reference/visual/complete-electrical-system-overview/`
  - `/reference/math-measurement/wavelength/`
  - `/reference/troubleshooting/alternator-whine/`
- check at least one direct asset URL for each newly added reference SVG

## Ready When

- checked routes/assets are listed
- any broken paths are fixed or queued explicitly
