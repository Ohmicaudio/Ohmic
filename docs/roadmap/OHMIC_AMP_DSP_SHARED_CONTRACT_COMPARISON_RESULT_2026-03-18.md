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

Follow-up carry-forward on the same date also moved shared runtime identity off
profile-generic values and onto per-device values:

- DSP: `dsp_1701-24DA5ED4DB1C`
- AmpLab: `amplab-E4876E75DC3C`

That prevents multiple boards of the same class from collapsing onto the same
shared `unit_id`.

Recovery AP naming was also converged onto shared identity-derived public names
instead of generic profile strings:

- DSP recovery AP: `OHMIC-DSP-D4DB1C-SETUP`
- AmpLab recovery AP: `OHMIC-AMP-75DC3C-SETUP`

That keeps setup-mode discovery aligned with the public-facing per-device
designator instead of generic `OHMIC-SETUP` naming.

The shared status surface now exposes that public-facing identifier directly:

- DSP `identity.public_designator: OHMIC-DSP-D4DB1C`
- AmpLab `identity.public_designator: OHMIC-AMP-75DC3C`

The hybrid legacy wrapper also carries the same value under:

- `identity.public_designator`
- `device.public_designator`

The shared core `identity` block also now carries the lower-level stable fields
that previously only appeared in the legacy wrapper:

- `device_id`
- `chip_id`

The shared core status now also carries basic device/profile posture directly,
instead of forcing consumers back into the hybrid legacy wrapper:

- `runtime.transport_mode`
- `device.public_designator`
- `device.name`
- `device.input_profile`
- `device.output_profile`
- `device.ui_mode`

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
