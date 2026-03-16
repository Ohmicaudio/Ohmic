Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T161520Z-843e5b96

# Prefer Current Backend Status Preferred IP Over Stale Host Hints

## Goal

Use the backend's current preferred IP as a stronger host-origin source than
older remembered LAN host hints.

## Source

- `docs/roadmap/OHMIC_CURRENT_HOST_ORIGIN_PROPAGATION_WAVE_2026-03-16.md`

## Focus

- `api/status` preferred IP
- link/origin selection

## Acceptance

- current backend preferred IP wins over stale remembered host hints where
  appropriate
- host-origin selection becomes more resilient to adapter rollover

## Result

Completed on 2026-03-16.

Outputs:

- `B:\ohmic\repos\ohmic-audio-labs\services\linkDeviceOrigins.ts`
- `B:\ohmic\docs\roadmap\OHMIC_CURRENT_HOST_ORIGIN_PROPAGATION_WAVE_2026-03-16.md`

Outcome:

- backend-reported current LAN hosts now outrank and suppress stale browser or sync-origin hints
