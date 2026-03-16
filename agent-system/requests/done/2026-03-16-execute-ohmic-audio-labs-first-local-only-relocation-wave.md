Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T035733Z-5b4247de

# Execute Ohmic Audio Labs First Local-Only Relocation Wave

## Goal

Execute the safest first local-only relocation wave so repo-root staging clutter
starts leaving `ohmic-audio-labs` without touching source truth.

## Focus

- `content-work/*`
- `content-work.zip`
- `sigma-flow-xml-skill-v3.zip`
- selected `captures/*`
- selected `output/*`

## Acceptance

- first-wave local-only moves are explicit and bounded
- moved material lands in the planned `B:\ohmic-local\*` targets
- source-adjacent files are left alone

## Result

- executed the first bounded relocation wave into
  `B:\ohmic-local\working\ohmic-audio-labs-retained\2026-03-16-first-local-only-relocation-wave\`
- moved `content-work/**`, `content-work.zip`,
  `sigma-flow-xml-skill-v3.zip`, all of `captures/**`, and the selected
  `output/playwright/**`, `output/android-measure-smoke/**`, and
  `output/pc2a-web.log` artifacts out of the repo
- deliberately left the active phone-session artifacts in `output/` and the
  unpacked `sigma-flow-xml-skill-v3/**` directory in place
