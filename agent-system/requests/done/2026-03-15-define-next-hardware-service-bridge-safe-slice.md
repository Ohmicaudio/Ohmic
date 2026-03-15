Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Define Next Hardware Service Bridge Safe Slice

## Goal

Identify the next bounded hardware/control slice after the shell-host wave.

## Focus

Promote one narrow bridge between the new hardware shell and directly related
service/hook files without absorbing the whole `services/hardware/*` lane.

## Expected Shape

- exact candidate files
- explicit out-of-scope files
- one coherent reason this slice belongs together
- suggested verification commands

## Acceptance

- produces one concrete next hardware implementation task
- avoids reopening the entire hardware/control subsystem as one giant bucket

## Outcome

Completed on 2026-03-15.

Result:

- defined the next hardware slice as an AmpLab control bridge
- bounded it to `AmpLabControlHost`, `AmpLabControlSurfaces`,
  `useAmpLabControlPlane`, and the narrow supporting AmpLab session/command
  contract files
- explicitly fenced off discovery, telemetry, remote-session, measurement,
  transport, DSP, and Android lanes
