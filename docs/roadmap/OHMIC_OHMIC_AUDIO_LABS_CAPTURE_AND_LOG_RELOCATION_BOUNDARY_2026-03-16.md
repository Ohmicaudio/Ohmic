Status: implementation_packet
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Audio Labs Capture And Log Relocation Boundary

## Purpose

Define where local logs, staging bundles, and retained runtime captures should
live if they still have operational value but do not belong in the repo root.

## Core Rule

If a local artifact is useful but not source, move it out of the repo root and
out of ambient source status.

## Relocation Targets

### Disposable Local Exhaust

Examples:

- `backend_*.txt`
- `dev.log`
- `dev-mobile.log`
- `playwright-report/*`
- `test-results/*`
- `tmp/*`

Target:

- no long-term target

Rule:

- purge after the immediate session unless a specific debugging need says
  otherwise

### Retained Local Evidence

Examples:

- selected files from `captures/*`
- selected files from `output/*`
- selected backend measurement capture bundles

Target:

- `B:\ohmic-local\retained-evidence\ohmic-audio-labs\*`

Rule:

- move there when the artifact still matters but should not remain in repo
  status

### Local Staging Or Import Material

Examples:

- `content-work/*`
- `content-work.zip`
- `sigma-flow-xml-skill-v3.zip`

Target:

- `B:\ohmic-local\staging\ohmic-audio-labs\*`

Rule:

- keep staging/import bundles in local-only storage, not repo root

### Durable Reference Fixtures

Examples:

- one promoted measurement capture set
- one promoted stable verification artifact

Target:

- a deliberate named fixture location, either:
  - source-controlled fixture path if it is meant for repeated project
    verification
  - `B:\ohmic-local\fixtures\ohmic-audio-labs\*` if it is local-only

Rule:

- do not leave durable reference candidates in ad hoc root folders

## Repo Root Prohibition

These should not remain as ambient repo-root clutter once classified:

- loose logs
- loose zip bundles
- loose capture folders
- loose report output

## Boundary

This packet defines relocation targets.

It does not by itself change ignore rules or perform cleanup.
