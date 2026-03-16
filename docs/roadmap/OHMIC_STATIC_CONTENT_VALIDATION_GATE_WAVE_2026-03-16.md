Status: implementation_packet
Date: 2026-03-16
Project: ohmic-audio-static-content

# Ohmic Static Content Validation Gate Wave

## Purpose

Stage a first-class validation gate for the static-content repo so preview and
deploy stop depending on manual spot checking alone.

## Included Outputs

- `B:\ohmic\agent-system\requests\ready\2026-03-16-stage-static-content-validation-gate-wave.md`
- `B:\ohmic\agent-system\requests\ready\2026-03-16-audit-static-content-predeploy-validation-surface.md`
- `B:\ohmic\agent-system\requests\ready\2026-03-16-add-first-class-static-content-validate-command.md`
- `B:\ohmic\agent-system\requests\ready\2026-03-16-record-static-content-deploy-gate-and-failure-handling.md`

## Unified Outcome

The repo should gain a truthful validation lane between edit and deploy,
without blurring ownership with the main app repo.

## Audit Finding

Repo truth before this slice:

- `package.json` only exposed:
  - `cf:dev`
  - `cf:deploy`
  - `cf:versions:upload`
- there was no first-class validation command between edit and deploy
- deploy and version upload could run without checking the deployable `public/`
  surface for obvious configuration or host-drift mistakes

## What Changed

In `B:\ohmic\repos\ohmic-audio-static-content`:

- added `scripts/validate-static-content.mjs`
- added `npm run validate`
- made `cf:deploy` and `cf:versions:upload` run validation before publishing
- updated the repo README with deploy-gate usage and failure handling

The first validation gate checks:

- `wrangler.jsonc` still points assets at `./public`
- required deploy-root files still exist:
  - `public/index.html`
  - `public/robots.txt`
  - `public/llms.txt`
  - `public/ai-index.json`
- the deployable `public/` surface no longer contains the old Netlify or
  temporary `workers.dev` host markers

## Verification

Ran:

- `npm run validate`

Result:

- validation passed on the current static-content repo state

## Operator Rule

Use `npm run validate` as the local predeploy gate.

If validation fails:

- do not run deploy or version upload yet
- fix the reported deploy-surface problem
- rerun `npm run validate`
- only then rerun `npm run cf:deploy` or `npm run cf:versions:upload`
