## OHMIC Remote Stream Activity Truth Result

Date: 2026-03-20

Summary:
- carried stream activity counters through the remote shared telemetry model
- extended remote BLE `sys.status.core` replies to include stream activity fields
- updated the handheld Live screen to surface observed transport activity, not just selected route intent

Repos:
- `cyd-remote`
- `ohmic`

Why this mattered:
- the remote already knew source selection and route preference truth, but it was still weak on displaying actual stream motion
- host shared status already publishes `stream.last_event_ms` and `stream.event_count`; the remote was dropping those fields
- this left the operator with route intent but not a clear on-device sign that transport activity had actually been observed

Implementation notes:
- `sys_telemetry.hpp` now carries:
  - `stream_last_event_ms`
  - `stream_event_count`
- `sys_ws.cpp` now hydrates those fields from shared `stream` status
- `sys_ble.cpp` now includes them in remote BLE `sys.status.core` replies
- `ui_visual.cpp` now prefers active lane and event count when stream activity exists

Validation:
- `pio run -e cyd24r`
- `pio run -e cyd24r -t upload --upload-port COM16`

Result:
- remote BLE status, handheld transport UI, and shared WS status now preserve more of the observed transport story
- this gives a better operator floor for the first real audio-transport validation pass
