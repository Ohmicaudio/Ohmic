Status: done
Priority: high
Date: 2026-03-15
Project: cross-project
Owner: d
Claim ID: 20260315T031910Z-bcde18a6

# Propose Ohmic Minimum Trusted Checks

## Goal

Define a small trusted-checks set we can actually believe after local work,
instead of pretending the whole repo is healthy when only a few surfaces were touched.

## Why

The current repos are too noisy to treat broad root lint/type-check commands as
truth. We still need a repeatable baseline that tells us whether the changed
surface is likely safe.

## Inputs

- `B:\ohmic\repos\ohmic-audio-labs\package.json`
- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\package.json`
- `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts`
- current deploy/domain behavior on `ohmicaudio.com` and `ohmicaudiolabs.com`

## Deliverable

A concise proposal that defines:

- which commands count as minimum trusted checks per surface
- which broad commands are currently untrusted or noisy
- when to run domain/asset smoke checks
- what should become automated later

## Constraints

- keep it pragmatic and short
- do not pretend broken root-wide checks are reliable
- prefer a surface-by-surface trust model over one giant gate

## Completion

- added `B:\ohmic\docs\systems\OHMIC_MINIMUM_TRUSTED_CHECKS_2026-03-15.md`
- defined trusted minimum checks for shared toolbox math, the toolbox app, the app/static boundary, public host smoke, backend-only work, and OSM-only work
- explicitly marked root `type-check`, `lint`, `check`, and `validate:surfaces` as advisory-only until repo-wide noise is reduced
- verified the current live front-door expectations with `https://ohmicaudio.com/` returning `200`, `https://ohmicaudiolabs.com/` returning `301` to `https://ohmicaudio.com/`, and `https://ohmic-audio-static-content.kzairsoft.workers.dev/robots.txt` returning `200`
