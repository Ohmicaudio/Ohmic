# Ohmic Backend Measurement Capture Retention Execution Slice

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Define the concrete execution slice for backend measurement captures so runtime
evidence can be retained or moved without being mistaken for source truth.

## Current Surface

In scope:

- `services/backend/storage/measurement-captures.v1.json`
- `services/backend/storage/measurement-captures/**`

Observed snapshot:

- `measurement-captures/**` currently contains `63` files
- total capture payload is about `27,628,756` bytes
- `measurement-captures.v1.json` is a `55,968` byte index/summary file

## Classification

These files are:

- runtime evidence
- short-term retained operational output
- not durable source truth

## Execution Slice

### Move Set

Move together as one retained packet:

- `services/backend/storage/measurement-captures.v1.json`
- `services/backend/storage/measurement-captures/**`

### Local-Only Target

Move into:

- `B:\\ohmic-local\\working\\ohmic-audio-labs-retained\\backend-measurement-captures\\2026-03-16\\`

Recommended shape:

- `index\\measurement-captures.v1.json`
- `payload\\measurement-captures\\*`

## Explicit Hold-Outs

Do not touch in this slice:

- `services/backend/storage/device-registry.test.json`
- `services/backend/storage/auth-control-plane.v1.sqlite*`

Why:

- `device-registry.test.json` is source-visible support truth
- auth sqlite files are a separate runtime-state class and should not be mixed
  with capture retention

## Verification Checks

Before move:

- count capture files
- record the index file size and timestamp
- confirm both surfaces are untracked runtime artifacts

After move:

- `measurement-captures.v1.json` no longer appears in repo status
- `measurement-captures/**` no longer appears in repo status
- `device-registry.test.json` and auth sqlite files remain untouched
- the local-only target contains both the index file and the payload set

## Non-Goals

This slice does not:

- purge capture evidence
- promote captures into fixtures
- alter backend source code
- touch auth control-plane sqlite state

## Outcome

After this slice executes, backend measurement evidence stops living inside the
repo worktree while still remaining available for short-term retention or later
fixture promotion.
