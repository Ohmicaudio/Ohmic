Date: 2026-03-17
Project: firmware
Status: done

# Ohmic Live DSP Status Surface Capture Result

Live DSP-adjacent status capture on March 17, 2026 showed that the current DSP
node is not yet participating in the same LAN-visible status path as the live
AmpLab node.

## Evidence

- Serial capture on `COM27` reported:
  - `AP_IP=192.168.4.1`
  - `AP_clients=0`
  - `STA=disconnected`
  - `WS=0`
  - `CAN=on`
  - `HTTP_ROOT=0`
- No responsive `/api/status` surface was observed on the likely LAN neighbors
  checked during this pass.

## Comparison To Shared Contract

- `shared core status on LAN`: not yet visible
- `station join / LAN target truth`: absent in the live DSP state captured here
- `AP recovery posture`: present
- `CAN posture`: present
- `websocket session`: absent

## Result

The current DSP runtime is still effectively in a recovery or off-LAN posture.
That means the next consolidation slice should not guess at DSP parity from
code alone. The higher-value follow-on is to carry the real AmpLab
network/status floor into the shared-core runtime and then bring DSP onto that
same floor.
