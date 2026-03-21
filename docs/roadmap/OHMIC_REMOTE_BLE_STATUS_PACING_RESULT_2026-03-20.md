# OHMIC Remote BLE Status Pacing Result

Date: 2026-03-20

## Summary

Remote BLE command parity was already fixed, but Fire still showed `amplab.ack` lines without the follow-up `sys.status.core` status that should have arrived after route/source commands.

This pass tightened both sides of that seam:

- `cyd-remote` now queues and paces BLE notifications instead of sending `ack` and `sys.status.core` back-to-back on the same characteristic write callback.
- `ohmic-audio-labs` now retries `sys.status.core` refresh after successful remote `media.source.select` and `media.route.preference.set` acknowledgements so the Fire UI is resilient even if one notify is missed.

## Live Results

- remote pacing fix built and flashed successfully on `COM16`
- Fire app rebuilt, synced, installed, and relaunched successfully
- DSP BLE parity remained live on `COM27`

## Notes

- Fire screenshots before the pacing fix consistently showed route/source `ack` lines without a matching surfaced `sys.status.core`
- the updated remote transport should now serialize those notifications cleanly instead of relying on immediate back-to-back notify calls
- the updated Fire BLE suite now requests a few follow-up `sys.status.core` refreshes after accepted remote routing changes

## Remaining Gap

The remaining step is a clean post-flash live validation pass on the Fire screen to confirm a remote route/source action now produces both:

- `RX amplab.ack`
- `RX sys.status.core` with refreshed media-route details

