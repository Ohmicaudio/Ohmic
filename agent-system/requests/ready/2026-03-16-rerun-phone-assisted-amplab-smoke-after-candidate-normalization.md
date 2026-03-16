Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Rerun Phone Assisted AmpLab Smoke After Candidate Normalization

## Goal

Repeat the bounded phone-assisted AmpLab smoke flow only after the candidate
normalization fixes land.

## Focus

- corrected candidate list
- AP/LAN identity behavior
- refresh and link attempt
- honest post-fix outcome packet

## Acceptance

- the rerun happens against corrected candidate truth
- the resulting pass or blocker is attributable to a narrower remaining seam

## Current Truth

- the current truthful host-side smoke inputs are:
  - `http://192.168.1.115:4175`
  - `http://192.168.1.115:8787`
- stale `192.168.1.91` host links should not be used
- `http://192.168.1.113/api/status` still times out from the current Windows
  host
- proxy classification now narrows that seam to `504 device_probe_timeout`
- `http://192.168.4.1` is AP-only context and should only be tested when the
  current client is actually on the device-generated Ohmic AP

## Ready Inputs

- rerun on the Fire/handset against `http://192.168.1.115:4175`
- keep Windows host truth as the source of record
- treat raw device endpoint checks as diagnostics, not the sole rerun gate
