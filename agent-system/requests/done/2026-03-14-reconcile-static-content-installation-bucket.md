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
claim_id: 20260314T030539Z-55c0112e
topic: requested-task

# Reconcile static-content `installation` bucket

## Requested Outcome

- reconcile the `installation/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- preserve the stronger install-oriented content in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\installation`
- `B:\ohmic\repos\ohmic-audio-static-content\public\installation`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `46`
- this is one of the first recommended follow-on buckets after the highest-visibility sections
- examples include:
  - `installation/advanced/beginner-level-understanding-noise/index.html`
  - `installation/advanced/engineer-level-power-system-analysis/index.html`
  - `installation/advanced/engineer-level-vibration-dynamics/index.html`

## Completion

- canonical source for all `46` `installation/*` pages is `B:\ohmic\repos\ohmic-audio-static-content\public\installation`
- historical app-side comparison source was `ohmic-audio-labs` Git `HEAD` under `public/installation/*`
- all `46` historical app-side `installation/*` files still pointed at `https://ohmicaudio.netlify.app`
- all `46` static-host `installation/*` files already use the current `https://ohmicaudiolabs.com` canonical host
- after normalizing line endings and replacing the old/new host strings, all `46` pages match exactly
- no content promotion from app history was required for this bucket

## Notes

- representative comparisons that resolved cleanly to host-only drift:
  - `installation/index.html`
  - `installation/beginner-level-understanding-wiring-basics/index.html`
  - `installation/installer-level-complex-wiring-systems/index.html`
  - `installation/advanced/engineer-level-power-system-analysis/index.html`
  - `installation/sections/table-of-contents/index.html`
- no follow-up graphics or style bucket was created from this reconciliation pass because there is no deeper content fork inside `installation/*`
