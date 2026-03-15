Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: codex
Claim ID: 20260315T214117Z-a741f91f

# Implement Phone AmpLab Discovery Link Fix Slice

## Goal

Fix or precisely isolate the phone-side AmpLab discovery/link failure now that
phone reachability and backend participation are already proven.

## Source

- `docs/roadmap/OHMIC_PHONE_AMPLAB_DISCOVERY_LINK_FIX_SLICE_2026-03-15.md`
- `docs/roadmap/OHMIC_PHONE_ASSISTED_AMPLAB_LIVE_SMOKE_RESULT_2026-03-15.md`
- `docs/roadmap/OHMIC_BROWSER_UI_LIVE_AMPLAB_LINK_FLOW_2026-03-15.md`
- `docs/roadmap/OHMIC_PHONE_AMPLAB_DISCOVERY_LINK_FIX_RESULT_2026-03-15.md`

## Focus

- phone-side discovery candidate generation
- phone-side refresh/link behavior
- parity with the browser path that succeeds after explicit refresh/link

## Result

- discovery now prefers the established sync/backend origin for proxy probes
  when one already exists
- the change stays inside shared discovery transport behavior instead of adding
  phone-specific AmpLab logic
- targeted regression coverage now proves discovery can auto-link through the
  explicit discovery origin
- a fresh live phone re-check is queued separately

## Verification

- `npm run test -- --run test/components/AmpLabDiscoveryTelemetryHooks.test.tsx`
