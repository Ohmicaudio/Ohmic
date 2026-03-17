Date: 2026-03-17
Project: firmware
Status: done

# Ohmic AP Vs LAN Target Selection Normalization Result

The shared firmware network core now classifies saved targets explicitly as
`recovery_ap`, `lan_live`, `manual_target`, or `none`, and it publishes whether
the current target fits the active network.

## Result

- recovery AP targets now stay recovery-only truth instead of acting like blind
  default live targets
- shared snapshots now expose:
  - `network.target.class`
  - `network.target.fits_current_network`
  - `network.target.route_note`
  - `network.target.recovery_host`
- the remote websocket client and connection UI now consume that shared target
  truth instead of hardcoding `192.168.4.1` checks

## Verification

- `amplab-firmware`
  - built `esp32s3_dsp`
  - flashed live DSP board on `COM27`
  - verified `/api/status/core` on `192.168.1.113` now reports:
    - `target.class = recovery_ap`
    - `target.fits_current_network = false`
    - `target.route_note = Recovery target off current LAN`
- `cyd-remote`
  - built `cyd24r`
  - branch pushed with shared target-routing changes

## Honest Gap

The handheld runtime branch was not flashed in this pass because the remote
serial port disappeared during upload and Windows no longer reported `COM16`.
The code path is built and pushed, but live handheld validation remains covered
by the existing live validation lane rather than this result note.
