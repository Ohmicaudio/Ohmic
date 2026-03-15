Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Identify Ohmic Audio Labs Minimum Trusted Runtime Checks

## Goal

Define the smallest trustworthy runtime check set for `ohmic-audio-labs` now
that the repo-wide gates are still too noisy to trust globally.

## Why

The system-level trusted-checks note exists, but the app/runtime lane still
needs its own concrete, repeatable checks tied to the real current product
surface.

## Inputs

- `B:\ohmic\docs\systems\OHMIC_MINIMUM_TRUSTED_CHECKS_2026-03-15.md`
- `B:\ohmic\repos\ohmic-audio-labs\package.json`
- `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts`

## Deliverable

A short app-specific runtime check packet that names the minimum commands and
smokes that currently mean something.

## Constraints

- do not pretend repo-wide lint/type-check are clean if they are not
- current truth only

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\docs\roadmap\OHMIC_AUDIO_LABS_MINIMUM_TRUSTED_RUNTIME_CHECKS_2026-03-15.md`

Result:

- the app/runtime lane now has a truthful minimum check matrix
- toolbox, static boundary, backend, and OSM surfaces each have explicit checks
- repo-wide aggregate commands remain explicitly untrusted as general gates
