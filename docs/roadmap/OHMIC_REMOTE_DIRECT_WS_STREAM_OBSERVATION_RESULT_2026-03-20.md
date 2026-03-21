## OHMIC Remote Direct WS Stream Observation Result

Date: 2026-03-20

Summary:
- taught the CYD remote WS client to observe raw `audio.remote.*` traffic directly
- remote now promotes matching publish-lane events into local stream activity state without waiting for a later `sys.status.core` refresh

Repos:
- `cyd-remote`
- `ohmic`

Why this mattered:
- shared status already carried stream activity, but transport truth could still lag on the remote if a fresh status reply had not arrived yet
- the WS lane already exposes topic names, so the remote can use those directly to mark transport activity for the currently selected publish lane

Implementation notes:
- `sys_ws.cpp` now:
  - classifies stream topics locally
  - matches incoming `audio.remote.*` topics against the current subscriber/publish topic
  - updates:
    - `stream_state`
    - `stream_reason`
    - `stream_transport`
    - `stream_active_topic`
    - `stream_active_class`
    - `stream_last_event_ms`
    - `stream_event_count`
- this path updates transport activity only; it does not pretend a full shared-status reply was received

Validation:
- `pio run -e cyd24r`
- `pio run -e cyd24r -t upload --upload-port COM16`

Result:
- remote transport observability is now more immediate and less dependent on follow-up status polling
- this is a better bridge from route-control parity into the first live audio-transport validation pass
