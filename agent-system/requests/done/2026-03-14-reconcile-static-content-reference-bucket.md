scope: project
authority: working
project: ohmic-audio-static-content
status: done
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: soon
blocking: yes
depends_on:
handoff_from:
claim_id:
topic: requested-task

# Reconcile static-content `reference` bucket

## Requested Outcome

- reconcile the `reference/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- preserve the stronger reference and calculation content in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\reference`
- `B:\ohmic\repos\ohmic-audio-static-content\public\reference`

## Completion

- canonical source for all `104` `reference/*` pages is `B:\ohmic\repos\ohmic-audio-static-content\public\reference`
- historical app-side comparison source was `ohmic-audio-labs` Git `HEAD` under `public/reference/*`
- all `104` historical app-side `reference/*` files still pointed at `https://ohmicaudio.netlify.app`
- all `104` static-host `reference/*` files already use the current `https://ohmicaudiolabs.com` canonical host
- after normalizing line endings and replacing the old/new host strings, all `104` pages match exactly
- no content promotion from app history was required for this bucket

## Notes

- representative comparisons that resolved cleanly to host-only drift:
  - `reference/index.html`
  - `reference/math-measurement/ohms-law-and-power/index.html`
  - `reference/math-measurement/parametric-eq-biquad-coefficients/index.html`
  - `reference/math-measurement/measuring-frequency-response/index.html`
  - `reference/math-measurement/box-volume-from-dimensions/index.html`
- this bucket resolves the same way as the smaller host-only buckets: host migration only, with no deeper content fork
