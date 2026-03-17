Date: 2026-03-17
Project: firmware
Status: done

# Ohmic Shared Firmware Network Core Extraction Result

The first real shared network-core cut now exists inside `amplab-firmware`:

- shared network state moved behind `src/core/ohmic_core_network.*`
- recovery AP defaults, station/AP state, BLE activity, and target host/port
  now publish through one core snapshot writer instead of scattered status code
- `main.cpp` now consumes that core seam for `/api/status`, plugin target
  reporting, and network bootstrap logging

This is intentionally not a full shared Wi-Fi client yet. It is the extraction
step that defines the common network truth layer so remote and other firmware
targets can stop growing local-only network divergence on top of ad hoc status
fields.

Direction correction:

- scan, join, saved target, retry, probe, and host-selection behavior should
  converge under this shared core
- device UI should invoke that behavior, not reimplement it locally
- manual host entry remains a recovery tool, not the primary network model
