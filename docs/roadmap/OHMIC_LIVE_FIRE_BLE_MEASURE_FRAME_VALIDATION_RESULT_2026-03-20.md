Date: 2026-03-20
Status: done
Project: ohmic-audio-labs

# Ohmic Live Fire BLE Measure Frame Validation Result

## Summary

The live Fire BLE card can now request and receive bridged
`measure.fft.frame` traffic from the AmpLab remote-source bridge on the real
device path.

## What Was Verified

- relaunched the Fire app on the current bundle:
  - `BLEFIX-20260319-2148`
- used Android WebView DevTools automation to drive the live BLE card:
  - `SCAN AMP`
  - select `OHMIC-AMP-75DC3C`
  - `CONNECT SELECTED`
  - `MEASURE FRAME`
- verified the Fire card text/log state:
  - target selected as `OHMIC-AMP-75DC3C`
  - card state `CONNECTED`
  - repeated `RX measure.fft.frame`
  - control state `Stream streaming (ble remote fft stream active)`
- verified live firmware status after the Fire-side request:
  - `stream.state=streaming`
  - `stream.reason=ble remote fft stream active`
  - `stream.subscribe_topic=measure.fft.frame`
  - `runtime.remote_fft.available=true`

## Current Live Truth

- BLE setup, control, telemetry, and remote FFT-frame transport are all real on
  the Fire + AmpLab path
- the remote bridge is now proven end to end rather than only on the board side
- the remaining honest gap is still the absence of a real local AmpLab
  measurement source
