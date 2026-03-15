Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T124239Z-4c3f0550

# Verify First OSM Slice In Correct Node Shell

## Goal

Run truthful verification for the first completed OSM slice from an environment
that can actually resolve the nested OSM workspace tools.

## Why This Is Needed

- the first OSM slice is committed
- bash/WSL verification was not trustworthy because nested workspace tool
  resolution pointed at Windows-style paths and `pnpm` was not usable there
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

- no vague "could not verify" state remains
- the queue reflects either a verified slice or a concrete recorded blocker

## Outcome

Completed on 2026-03-15.

Result:

- verified the first OSM editor-shell slice truthfully from the Windows
  PowerShell host
- the earlier "wrong shell" suspicion was only part of the story; the real
  blocker was an unhydrated nested OSM workspace install
- after refreshing the nested workspace install with `CI=true`, both OSM build
  and OSM test passed

## Verification

- initial failing proof from the correct shell:
  - `pnpm build`
  - `pnpm test`
  - run from `B:\ohmic\repos\ohmic-audio-labs\products\ohmic-osm`
  - result: failed because package-local tool entry points like
    `packages/schema/node_modules/typescript/bin/tsc` and
    `packages/tests/node_modules/vitest/vitest.mjs` were missing
- install-state resolution:
  - `pnpm install --frozen-lockfile`
    - first result: non-TTY abort without `CI=true`
  - `CI=true pnpm install --frozen-lockfile`
    - result: nested workspace install completed successfully in this shell
- final truthful verification commands:
  - `pnpm build`
  - `pnpm test`
  - run from `B:\ohmic\repos\ohmic-audio-labs\products\ohmic-osm`
  - result: both passed in this Windows shell

## Notes

- `pnpm build` still emitted the existing Tailwind `content` warning inside
  `apps/osm-web`, but the workspace build completed successfully
- this task did not produce a code commit because it was a verification pass,
  not a source edit
