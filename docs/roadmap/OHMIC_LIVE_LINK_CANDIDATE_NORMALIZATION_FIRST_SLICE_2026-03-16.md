Status: implementation_note
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Live Link Candidate Normalization First Slice

## Scope

First bottom-up implementation slice for the AP/LAN candidate normalization wave.

## What Changed

In `services/ohmicLiveLink/ConnectionManager.ts`:

- promoted explicit live identities from reachable status payloads:
  - `connection.sta.ip`
  - `ap_ip` / `connection.ap.ip`
- stopped injecting loopback self-origins like `127.0.0.1` into the candidate
  pool by default
- allowed the reserved device AP identity `192.168.4.1` to survive candidate
  filtering
- merged duplicate candidate surfaces by normalized base URL while preserving
  the strongest reachable/linked entry

In `test/services/ohmicLiveLinkConnectionManager.test.ts`:

- added regression coverage proving loopback self-origins are not injected by
  default
- added regression coverage proving a reachable alias payload now promotes both
  the explicit LAN and AP identities

## Why This Slice Matters

The live smoke packet showed the current shell could reach the live device via
`amplab.local`, but still failed to normalize that device into portable,
explicit addresses for later phone/browser reruns.

This slice makes the candidate model less alias-only and more transport-truthful
without changing the AmpLab-specific control plane yet.

## Verification

Ran:

- `npx vitest run test/services/ohmicLiveLinkConnectionManager.test.ts test/components/AmpLabDiscoveryTelemetryHooks.test.tsx`

Result:

- `2` files passed
- `9` tests passed

## Remaining Work

- verify the live shell now surfaces explicit `192.168.1.113` and
  `192.168.4.1` candidates in practice
- rerun the bounded phone-assisted AmpLab smoke flow against the corrected
  candidate model
