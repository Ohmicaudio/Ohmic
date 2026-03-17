Date: 2026-03-17
Project: cyd-remote
Status: done

# Ohmic Remote Wifi Join And Network Enrollment Floor Wave Result

The handheld now has a bounded operator join floor:

- scanned SSIDs can be selected directly from the Wi-Fi page
- `Join` performs a real action instead of acting like a placeholder
- open networks can be joined and saved immediately
- secure networks prompt for a password and can reuse saved credentials
- join status text now tells the operator whether the device is joining,
  connected, disconnected, missing the SSID, or failing auth

This remains intentionally smaller than full onboarding. It gives the handheld a
real join surface without pretending discovery, pairing, ownership, or fleet
network management are solved.
