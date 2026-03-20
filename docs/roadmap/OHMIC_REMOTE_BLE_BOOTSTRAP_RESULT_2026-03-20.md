# OHMIC Remote BLE Bootstrap Result 2026-03-20

## Outcome

The `cyd-remote` runtime now has a real first-pass BLE bootstrap lane instead
of only aligned identity strings.

## What Landed

- shared Ohmic-link BLE service UUIDs now advertise from the remote
- remote BLE identity now presents as:
  - device name: `OHMIC-REMOTE-<suffix>`
  - device id: `remote-<chiphex>`
- remote BLE bootstrap currently supports:
  - `sys.capabilities`
  - `sys.status.core`
  - `sys.network.status`
- remote BLE auto-publishes capabilities and core status shortly after connect
- BLE active state now feeds back into shared core network status on the remote

## Validation

- `cyd24r` build passed with BLE bootstrap enabled
- live flash to `COM16` passed

## Remaining Gap

This is bootstrap parity, not full remote BLE feature parity yet.

Still outstanding:

- Fire-side live scan/connect validation against the remote
- richer remote BLE control topics beyond bootstrap/status
- alignment of any future remote Bluetooth-audio ingest controls with the
  shared Ohmic-link device model
