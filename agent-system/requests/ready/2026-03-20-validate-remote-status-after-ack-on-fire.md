# Validate Remote Status After Ack On Fire

## Goal

Confirm that a remote BLE route/source action on the Fire now surfaces the follow-up `sys.status.core` after the `amplab.ack`.

## Done When

- Fire connects to remote BLE peer
- pressing a remote source or route-preference control yields:
  - `RX amplab.ack`
  - `RX sys.status.core`
- Fire log and on-screen BLE log both reflect the updated route/media summary clearly

## Context

- remote BLE command parity is already live
- remote notify pacing is now live on `COM16`
- Fire BLE suite now retries `sys.status.core` after route/source ack

