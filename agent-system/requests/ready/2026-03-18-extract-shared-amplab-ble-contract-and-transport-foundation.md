Status: ready
Priority: high
Date: 2026-03-18
Project: ohmic-audio-labs

# Extract Shared AmpLab BLE Contract And Transport Foundation

## Goal

Stop duplicating BLE UUIDs, command payload shaping, and device identity helpers
across mobile and web BLE paths.

## Acceptance

- one shared BLE contract/transport foundation exists
- mobile test harness and web BLE provisioner consume that same foundation
- the first BLE setup/auth lane no longer starts from duplicated constants
