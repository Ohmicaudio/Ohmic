Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Verify AmpLab Control Bridge Coverage In Node Shell

## Goal

Run the direct AmpLab control bridge tests in a working Node shell so the new
coverage commit is verified instead of only assumed from file presence.

## Source

- commit `8031c80` in `ohmic-audio-labs`
- `test/components/AmpLabControlHost.test.tsx`
- `test/components/AmpLabControlSurfaces.test.tsx`

## Focus

- targeted test invocation only
- correct Node-capable shell
- exact pass/fail note

## Acceptance

- the AmpLab control bridge tests are run or blocked precisely
- the result is recorded honestly
- next hardware validation need is clearer

## Completion Notes

- Verified from a Windows Node shell using:
  - `npm run test -- --run test/components/AmpLabControlHost.test.tsx test/components/AmpLabControlSurfaces.test.tsx`
- Result:
  - `test/components/AmpLabControlHost.test.tsx` passed
  - `test/components/AmpLabControlSurfaces.test.tsx` passed
- Coverage summary:
  - 2 test files passed
  - 3 tests passed
