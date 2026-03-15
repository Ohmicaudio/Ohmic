Status: audit
Date: 2026-03-15
Project: ohmic

# Ohmic Shared Agent System Consistency Audit

## Purpose

Review the shared file-backed coordination system for:

- logical consistency
- memory horizon clarity
- queue and claim correctness
- generated snapshot trustworthiness
- retrieval/index layering
- unnecessary complexity

## Overall Assessment

The architecture is directionally correct.

The system is strongest where it is:

- file-backed
- human-readable
- explicit about authority order
- explicit that retrieval is not truth

The system is weakest where live coordination depends on:

- PowerShell-only write paths
- manual file edits that bypass refresh
- duplicate state representations
- inconsistent claim file formats

So the main problem is not the model. The main problem is brittle operational
plumbing.

## What Is Working Well

### 1. Authority is defined clearly

The authority order in `agent-system/AGENTS.md` is good.

It correctly says:

- shared source Markdown outranks generated surfaces
- repo inspection outranks memory
- retrieval/index output is not authority

### 2. Memory horizons are conceptually sound

The split across `short-term`, `mid-term`, and `long-term` is useful and easy
to reason about.

Current model:

- `short-term` = live context and watchouts
- `mid-term` = active initiatives and recurring lessons
- `long-term` = durable truths only

That is a good structure.

### 3. Requests and claims are the right conceptual split

The distinction between:

- `requests/` as queue/intake
- `jobs/active/` as lock/coordination

is correct and should be preserved.

### 4. Retrieval/index is layered correctly

The Chroma semantic index is correctly framed as:

- acceleration
- lookup
- re-entry help

not as the source of truth.

That is the right rule.

## Main Logical Weaknesses

### 1. Claim format inconsistency

This is the highest-confidence defect.

The active claim tooling only parses the YAML-style claim format:

- `claim_id:`
- `status:`
- `owner:`
- `project:`
- `task:`
- `started:`
- `expires:`
- `# Files`

But live claim files currently exist in two incompatible forms:

- valid YAML-style claim files
- older Markdown-header claim files using `Status:`, `Date:`, `Owner:`, `Task:`

That means some live claims are effectively invisible to:

- overlap detection
- generated snapshots
- status listings

This is a real coordination bug, not a cosmetic one.

### 2. Generated snapshot freshness is not trustworthy enough

The generated files under `generated/agent-work/` are helpful, but they are too
easy to let drift out of date.

Current weakness:

- snapshots refresh when the official scripts are used
- manual file edits and moves bypass refresh
- stale generated JSON can continue to look authoritative

This makes the system confusing in exactly the moments when agents most need a
clear live picture.

### 3. The system has too many coordination surfaces

Truth is currently spread across:

- request file location
- request frontmatter
- active claims
- generated JSON snapshots
- memory files
- board docs and roadmap docs

That is workable, but it is too easy for one layer to be updated while another
is not.

### 4. PowerShell-only mutation paths are too fragile

The system is operating in a mixed environment:

- Windows
- WSL/bash
- PowerShell

But the official mutation flows for claims and requests are strongly tied to
PowerShell scripts.

When agents cannot or do not use those scripts, they hand-edit files. That is
how the claim-format split happened.

### 5. The system is becoming doc-heavy

The rules are mostly good, but there are now many coordination surfaces that
must be mentally loaded:

- `AGENTS.md`
- `instructions/*`
- `memory/*`
- `requests/*`
- `jobs/*`
- generated snapshots
- roadmap/board docs

This is still manageable, but it is drifting toward higher overhead than it
needs for routine execution.

## Database / Retrieval Assessment

## What exists

The shared system currently uses:

- Markdown source files as authority
- generated JSON snapshots as machine-readable derived state
- Chroma as a retrieval/index layer

## What is good about that

- human repair is easy
- git diff/history is meaningful
- no opaque DB migration burden for core memory
- retrieval can be rebuilt from source

## What should not change

Do not make the retrieval DB authoritative.

The current rule is right:

- Markdown = truth
- generated JSON = derived state
- vector DB = retrieval helper

## Real retrieval weakness

The DB/index is not the dangerous part.

The dangerous part is stale operational JSON and inconsistent claim parsing.

Those are coordination-state issues, not retrieval-model issues.

## What Feels Too Convoluted

### 1. Mixed live state plus board-doc duplication

The queue already exists in `requests/`.

Board docs are useful, but once they start acting like a second queue, they add
friction.

### 2. Claim lifecycle without validation

Claims are intended to be simple, but they currently allow silent schema drift.

That is too permissive for something that protects edit safety.

### 3. Refresh logic hidden inside tool scripts

The system assumes mutation happens through the scripts.

That is fine in theory, but not in practice once agents and humans also edit
files directly.

## What Should Be Improved First

### Immediate repair priorities

1. standardize one claim file schema only
2. add validation for active claims and request metadata
3. make snapshot freshness visible and easy to repair
4. reduce dependence on PowerShell-only mutation paths

### Recommended next implementation bundle

1. claim schema normalization and repair
2. generated snapshot freshness check and repair
3. shared validator for:
   - claim files
   - request metadata
   - memory headers
4. cross-platform coordination CLI path

## Better Solutions Not Yet Implemented

### Best fit

Keep the current file-backed model, but add:

- strict schema validation
- auto-generated JSON
- cross-platform mutation tools

This keeps the good parts without turning the system into a database-heavy
control plane.

### Optional future improvement

If machine-level querying becomes more important later:

- generate a small SQLite index from Markdown and requests/claims

but keep it explicitly read-only and rebuildable.

That would be useful for:

- fast dashboards
- queue analytics
- stale-claim detection

without making SQLite the truth source.

## Recommended Simplicity Rule

The system should have:

- one canonical queue
- one canonical claim format
- one generated snapshot family
- one retrieval layer

It should not have multiple informal live-state systems competing with one
another.

## Final Assessment

How are we?

Architecturally: good.

Operationally: brittle in the coordination plumbing.

The design is worth keeping.

The next step is not redesign.

The next step is to harden:

- claim schema
- snapshot freshness
- cross-platform tooling
- validation
