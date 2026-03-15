Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T222000Z-livelinkcopy

# Harmonize Live Link Shell Copy Leftovers

## Goal

Clean up remaining shell/mock/test wording that still mixes:

- generic Live Link discovery/link language
- deck surface language
- device identity language

## Focus

- shell smoke tests and mocks
- host-level UI copy that still says `linked:` or similar transitional text
- low-risk naming cleanup only

## Acceptance

- leftover shell wording drift is identified and reduced
- no live link behavior or hardware transport logic changes are required
- future UI work has a cleaner naming baseline

## Result

- generic shell actions now use device wording:
  - `Refresh Devices`
  - `Link Device`
  - `Open Device Page`
- overlay copy now distinguishes the deck surface:
  - `Focus AmpLab Deck`
- generic discovery and offline status copy now uses device language instead of
  treating every endpoint as an AmpLab unit
- shell smoke and panel tests now expect the harmonized wording

## Verification

- `npx vitest run test/components/AmpLabHardwareDeckPanel.test.tsx`
- `npm run test:e2e -- e2e/amplab-shell.spec.ts`
