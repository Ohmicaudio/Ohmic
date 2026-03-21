## OHMIC Remote BLE Transport Truth Alignment Result

Date: 2026-03-20

Summary:
- aligned remote BLE `sys.status.core` replies with the same shared transport telemetry used by the handheld UI
- mirrored local BLE route/source intent into shared telemetry so operator actions immediately update both the remote screen and BLE status output
- kept local fallback behavior when fresher shared transport truth is not yet available

Repos:
- `cyd-remote`
- `ohmic`

Why this mattered:
- Fire BLE logs and remote on-device transport state could drift because BLE status replies were built from local placeholder fields while the handheld UI was reading `g_telemetry`
- this made transport validation noisier than it needed to be during live route testing

Implementation notes:
- `sys_ble.cpp` now imports `sys_telemetry.hpp`
- BLE `media.source.select` and `media.route.preference.set` update shared telemetry immediately
- BLE `sys.status.core` now prefers fresh shared transport telemetry for:
  - media source transport/upstream/producer/consumer/route/preference
  - stream state/reason/transport/subscriber topic/class/active topic/class
- fallback values remain in place when no fresher shared transport state is present

Validation:
- `pio run -e cyd24r`
- `pio run -e cyd24r -t upload --upload-port COM16`

Result:
- remote handheld screen and Fire BLE status should now converge on the same transport truth surface
- this reduces controller/log drift ahead of the first full audio transport validation pass
