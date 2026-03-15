Status: implementation_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Mobile-First Landing Hero Refinement

## What Changed

The landing dashboard hero was shifted away from a wide equal-weight gauge row
and toward a mobile-first ecosystem story.

Updated surface:

- `B:\ohmic\repos\ohmic-audio-labs\components\Landing\Dashboard.tsx`

## New Hero Shape

- one primary ecosystem story card
- one primary BassBuilder entry card
- one secondary module cluster for AmpLab, TuneScope, DASH Lab, and StreetHub
- stronger mobile-first hierarchy with tablet/desktop expansion

## Why This Is Better

- first-touch mobile visitors now get one clear story instead of five equal
  competing modules
- the landing page reflects the current expanded ecosystem, not the earlier
  four-gauge-only concept
- the app-side dashboard now acts as a stronger reference surface for the
  eventual static/public hero

## Verification

Ran:

- `npm run test:e2e -- e2e/amplab-shell.spec.ts`
- `npm run build`

Result:

- AmpLab browser shell smoke passed
- production build passed
