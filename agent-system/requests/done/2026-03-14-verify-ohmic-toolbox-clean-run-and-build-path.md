Status: done
Priority: high
Date: 2026-03-14
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T025851Z-f4cf455f

# Verify Ohmic Toolbox Clean Run And Build Path

## Goal

Prove the imported toolbox app can be entered, run, tested, and built cleanly from its own app folder without relying on repo accident or undocumented setup.

## Why

The toolbox app now exists as real product code.

It needs a reliable operator path so future work does not keep rediscovering how to launch it.

## Inputs

- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\README.md`
- `B:\ohmic\repos\ohmic-audio-labs\apps\README.md`
- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\package.json`

## Deliverable

A verified app-local workflow that confirms:

- install command
- dev command
- test command
- build command

And updates docs only if the clean path differs from what is already written.

## Constraints

- do not widen into root-repo package surgery
- do not redesign the app
- preserve the current narrow first-wave scope

## Completion

- verified the app-local install path remains `npm install` by running `npm install --dry-run` in `apps\ohmic-toolbox`
- verified the app-local test path with `npm run test` in `apps\ohmic-toolbox`
- verified the app-local build path with `npm run build` in `apps\ohmic-toolbox`
- updated the toolbox docs to state explicitly that no root-level package surgery is required
- confirmed the documented app-local dev command remains `npm run dev`
- attempted a live HTTP smoke on the dev port, but background-process orchestration was blocked by the current shell policy, so the verification is command-path based rather than a captured browser hit
