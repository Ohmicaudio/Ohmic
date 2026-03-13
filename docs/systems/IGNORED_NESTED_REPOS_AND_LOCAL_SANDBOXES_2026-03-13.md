## Ignored Nested Repos And Local Sandboxes

This note exists to prevent confusion between the tracked umbrella system in
`B:/ohmic` and local-only nested repos that happen to live under the same
filesystem tree.

### Rule

Ignored nested repos are not authoritative by default.

They are:

- local sandboxes
- imported references
- abandoned or defunct clone state
- experimental work areas

They are not:

- startup dependencies
- migration targets
- shared coordination truth
- valid sources of record unless explicitly harvested

### Current Known Example

- `B:/ohmic/ohmic-audio-universe/`

### Operational Meaning

- shared tooling must not assume ignored nested repos are part of the active system
- umbrella docs must not point to them as required surfaces
- decisions or specs found there must be intentionally harvested before promotion
- their uncommitted state does not imply damage to the tracked umbrella repo
