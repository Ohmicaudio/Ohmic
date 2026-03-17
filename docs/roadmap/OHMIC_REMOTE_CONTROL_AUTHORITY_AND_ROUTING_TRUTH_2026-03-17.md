Date: 2026-03-17
Status: active decision
Project: cyd-remote

# Ohmic Remote Control Authority And Routing Truth

## Rule

Authority and routing are shared-contract truth, not UI implication.

Any surface may invoke a command, but the command itself must say:

- what target it addresses
- whether it is supported
- whether it was accepted
- what authority/routing state applied

## Current Safe Control Floor

For the handheld today:

- `audio.master.volume_norm`
- `audio.master.mute.state`
- status refresh / reconnect / connection actions

These are allowed because they already map to explicit shared or legacy-safe
commands.

## Routing Labels

A handheld control should eventually surface routing like:

- `DSP master`
- `transport source`
- `local monitor`
- `run trigger`

Until that routing is available from the shared contract, the handheld should
stay narrow instead of implying more target authority than it really has.

## Rejection Rule

Unsupported or unavailable targets must reject cleanly and visibly. Silence is
not acceptable.

The active path is:

- shared envelope reply/reject first
- legacy fallback only where still required
- handheld displays the resulting contract reason
