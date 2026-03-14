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
claim_id: 20260314T052718Z-3d3620c4
topic: requested-task

# Produce `DSP Block Diagram` graphic

## Requested Outcome

- create one reusable `DSP Block Diagram` asset
- use the tuning diagram asset path:
  - `assets/engineering-diagrams/images/diagrams/dsp_signal_chain.svg`
- replace the placeholder in exactly these pages:
  - `tuning/beginner-level-understanding-dsp-hardware/index.html`
  - `tuning/sections/4-5-advanced-dsp-programming/index.html`

## Path Check

Verified against the current `B:\ohmic\repos\ohmic-audio-static-content\public\tuning` tree on 2026-03-14:

- `tuning/beginner-level-understanding-dsp-hardware/index.html`
- `tuning/sections/4-5-advanced-dsp-programming/index.html`

## Completion

- reused the shared tuning diagram asset at `public/assets/engineering-diagrams/images/diagrams/dsp_signal_chain.svg`
- cleaned the remaining visible mojibake in that SVG's labels while keeping the same asset path
- replaced the DSP block diagram placeholder in both target pages with real `<figure><img>` markup
- reused the same asset in:
  - `tuning/beginner-level-understanding-dsp-hardware/index.html`
  - `tuning/sections/4-5-advanced-dsp-programming/index.html`
- verification confirmed the `DSP Block Diagram` placeholder marker is gone from both target pages
- unrelated placeholder blocks in `4-5-advanced-dsp-programming` were left for their own follow-up tasks

## Ready When

- one asset exists and is reused in both target pages
- both placeholder markers are gone
