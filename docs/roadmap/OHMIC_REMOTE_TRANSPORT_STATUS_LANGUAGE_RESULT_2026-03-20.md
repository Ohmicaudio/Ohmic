## OHMIC Remote Transport Status Language Result

Date: 2026-03-20

Summary:
- clarified remote transport/operator wording so the UI no longer treats route readiness as equivalent to live audio transport
- split `host alive`, `WS linked`, and `stream activity observed` into clearer distinct states

Repos:
- `cyd-remote`
- `ohmic`

Why this mattered:
- the remote DSP screen and action summaries were overstating transport health with phrases like `stream live`
- that made it too easy to read control-plane readiness as if the data plane were already carrying audio

Implementation notes:
- `sys_connection.cpp`
  - route/source actions now distinguish:
    - `target host offline`
    - `host alive, WS offline`
- `ui_dsp.cpp`
  - `stream live` wording was replaced with more honest transport language
  - route readiness now reads as waiting for activity unless actual stream activity has been observed

Validation:
- `pio run -e cyd24r`

Result:
- the remote operator surface should now be less misleading during transport bring-up
- this reduces debugging noise while we close the actual audio/data-plane gap
