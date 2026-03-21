## OHMIC Remote Transport Actions USB Result

Date: 2026-03-20

Summary:
- added a direct `USB` transport action on the CYD remote Actions screen
- tightened the shared-status summary so the handheld shows source, route preference, and subscriber topic together when shared transport truth is present
- reduced action button height to keep the expanded transport surface on one screen

Repos:
- `cyd-remote`
- `ohmic`

Why this mattered:
- the transport controller had reached useful source and route control, but it still hid `usb.local` behind other control surfaces
- the handheld also needed denser route feedback so transport validation can happen on-device without guessing from BLE or Fire logs

Implementation notes:
- `ui_actions.cpp` now exposes `Phone`, `SD`, `USB`, `Direct`, `Concert`, `Refresh`, and `Reconnect`
- the Actions status line now prefers shared transport truth in the form:
  - media source label
  - route preference label
  - active DSP subscriber topic

Validation:
- `pio run -e cyd24r`
- `pio run -e cyd24r -t upload --upload-port COM16`

Result:
- remote handheld transport control now covers the main planned source families
- the remote can show the operator enough route context to validate transport behavior locally before the first full audible test
