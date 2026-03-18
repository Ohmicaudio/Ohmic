# OHMIC AmpLab vs DSP Shared Contract Comparison Result

Date: 2026-03-18
Status: completed

## Summary

The new 16MB AmpLab board was brought onto the same shared firmware contract path as the live DSP bench and compared directly against it.

Live nodes:

- DSP producer: `192.168.1.113`
- AmpLab producer: `192.168.1.56`

AmpLab was provisioned through the same command-first network surface used elsewhere:

- serial transport schema: `ohmic.dsp.firmware.transport.v1`
- command: `sys.network.connect`
- outcome: joined `NETGEAR54`, saved as profile `0`

## What matched

Both producers now expose the shared core status surface:

- `schema: ohmic.firmware.core.status.v1`
- shared `identity`, `topology`, `capabilities`, `network`, `runtime`, `stream`, and `plugins` sections
- shared `sys.network.*` request handling
- shared hybrid legacy HTTP wrapper on `/api/status`

Both nodes also reported truthful live network state on LAN:

- `network.mode: ap+sta_live`
- `station_active: true`
- `soft_ap_active: true`
- `http_server_started: true`

## Expected profile differences

DSP:

- `node_kind: dsp_1701`
- `board_profile: dsp_apm2_esp32s3`
- `runtime_role: controlled_node`
- `dsp_1701: true`
- DSP plugin enabled

AmpLab:

- `node_kind: amplab`
- `board_profile: amplab_esp32s3`
- `runtime_role: master`
- `measurement_adc: true`
- DSP plugin disabled

These differences are now profile-level and expected, not a sign of contract drift.

## Carry-forward result

The cross-profile comparison confirms that the shared core status and network contract is now viable across both active firmware classes.

The remaining cleanup should focus on profile/default convergence and any remaining `main.cpp` glue, not on redesigning the transport/status contract again.
