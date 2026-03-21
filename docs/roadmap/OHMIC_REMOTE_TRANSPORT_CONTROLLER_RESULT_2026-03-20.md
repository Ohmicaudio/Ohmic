# OHMIC Remote Transport Controller Result

Date: 2026-03-20

## Summary

The remote handheld now issues real transport commands over the shared WebSocket contract instead of only observing shared status.

## Added

- remote-side WebSocket requests for:
  - `media.source.select`
  - `media.route.preference.set`
- remote-side contract-result hydration for those replies
- handheld Actions screen transport controls for:
  - `Phone`
  - `SD`
  - `Direct`
  - `Concert`

## Live Result

- `cyd-remote` built successfully
- updated remote firmware flashed successfully to `COM16`

## Why This Matters

This moves the remote from passive route visibility into actual transport control:

- source ownership can now be requested from the handheld
- route preference can now be changed from the handheld
- shared status is immediately re-requested after accepted contract replies so the controller can converge on real runtime truth

## Next

- validate these new handheld controls against the live shared-status session
- use that control seam to drive actual audio transport validation

