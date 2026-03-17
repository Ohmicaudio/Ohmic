Date: 2026-03-17
Project: firmware
Status: done

# Ohmic Shared Status Control And Stream Contract Result

The active producer/consumer pair now speaks one clearer status/control/stream
contract family:

- the live DSP node publishes explicit shared `stream` status in
  `/api/status/core` and in `dsp.stream.subscribe` replies
- missing-stream truth is represented explicitly as `available: false`,
  `state: missing`, and `reason: stream source not implemented`
- the remote now requests shared `dsp.stream.subscribe` status directly instead
  of depending on legacy `stream.start` as the primary stream truth path
- shared control and stream replies/rejects now surface as explicit handheld
  contract results instead of silently disappearing behind optimistic UI state

## Evidence

- live DSP on `192.168.1.113` reports:
  - `schema = ohmic.firmware.core.status.v1`
  - `stream.state = missing`
  - `stream.available = false`
  - `stream.reason = stream source not implemented`
- remote branch `remote-shared-runtime-core` now parses and stores:
  - shared stream subscribe replies
  - shared control apply replies
  - unsupported/shared reject reasons
- remote was rebuilt, flashed to `COM16`, and serial after reboot showed:
  - `wifi=1`
  - `ssid=NETGEAR54`
  - `ws=1`
  - `host=192.168.1.113`

This closes the active-node floor for the current DSP-plus-remote path, but it
does not yet replace the later live display stream surface or the remaining
broader multi-node/hub contract work. Those remain separate follow-on items.
