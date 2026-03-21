# Flash remote BLE command parity and retry Fire route

## Goal

Flash the already-built remote BLE command parity patch once `COM16` is free, then retry Fire route/source controls against the remote.

## Expected validation

- remote no longer replies `unknown cmd` for:
  - `sys.status.core`
  - `media.source.select`
  - `media.route.preference.set`
- Fire BLE card shows remote route/source state instead of generic ack errors
