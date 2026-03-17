Date: 2026-03-17
Project: cyd-remote
Status: done

# Ohmic Remote Shared Network Core Convergence Result

The handheld now uses the same network-core vocabulary as the extracted AmpLab
firmware seam:

- target host/port state lives under `src/core/ohmic_core_network.*`
- AP and station state are refreshed into the shared network core from
  `sys_wifi.cpp`
- WebSocket target gating now uses the shared `ohmic_core_network_should_attempt_target`
  helper instead of a remote-only subnet guard copy

This is a real convergence step, but not the full end state yet. The remote
still keeps its scan/join/operator flow in local UI code for now; what changed
is that network mode, target truth, and AP-vs-LAN route guard are no longer
invented separately on the handheld.
