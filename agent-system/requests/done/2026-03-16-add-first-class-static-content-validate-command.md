Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-static-content
Owner: d
Claim ID: 20260316T111500Z-6d3a1e2c

# Add First Class Static Content Validate Command

## Goal

Add one first-class validation command for the static-content repo so there is
an explicit gate between edit and deploy.

## Source

- `docs/roadmap/OHMIC_STATIC_CONTENT_VALIDATION_GATE_WAVE_2026-03-16.md`

## Focus

- package script shape
- validation command naming
- minimum check bundle

## Acceptance

- the repo has one explicit validation entrypoint
- the command is suitable for both local and future CI use

## Result

- added `npm run validate` to `B:\ohmic\repos\ohmic-audio-static-content\package.json`
- added `scripts/validate-static-content.mjs`
- verified the new command passes on the current repo state
