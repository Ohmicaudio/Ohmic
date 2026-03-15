Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Verify First OSM Slice In Correct Node Shell

## Goal

Run truthful verification for the first completed OSM slice from an environment
that can actually resolve the nested OSM workspace tools.

## Why This Is Needed

- the first OSM slice is committed
- bash/WSL verification was not trustworthy because nested workspace tool
  resolution pointed at Windows-style paths and `pnpm` was not usable here
- the slice should be either verified honestly or recorded as concretely blocked

## Scope

- `products/ohmic-osm`
- the first OSM editor-shell slice only

## Required Output

- exact command or commands that were used in the correct shell
- pass/fail result
- if still blocked, the exact environment/tooling blocker and the shell that
  should be used next time

## Acceptance

- no vague “could not verify” state remains
- the queue reflects either a verified slice or a concrete recorded blocker
