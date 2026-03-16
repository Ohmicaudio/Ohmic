# Ohmic Multi-Agent Provider Interface Administration Model

Date: 2026-03-16
Status: working design

## Purpose

Define the next-layer shape for the Master Administrator system so it can grow
into a multi-agent, multi-provider, multi-interface platform without hardcoding
project-specific assumptions into the core.

## Core Principle

Design for evolution, not a one-off build.

That means:

- project-specific logic belongs in overlays/configuration
- intake should normalize external input into native internal structures early
- providers and interfaces should plug into stable adapters
- non-API interfaces must be treated as first-class citizens, not edge cases

## Canonical Split

### 1. Core Administration Engine

Owns:

- intake normalization
- routing and filing
- aggregation
- orchestration handoff
- audit trail

This layer should stay provider-agnostic and project-agnostic where possible.

### 2. Provider Adapters

Own:

- provider auth/session rules
- provider fetch/send semantics
- rate limits and retries
- provider-specific event translation

Examples:

- email adapter
- form/bug-report adapter
- content platform adapter
- file-drop or upload adapter

### 3. Interface Adapters

Own:

- browser/web UI interaction
- command-box writeback
- file-drop interaction
- local folder watchers
- manual operator import surfaces
- future device or kiosk surfaces

This is where non-API interfaces belong.

### 4. Project Overlay Layer

Owns:

- project-specific routing rules
- naming conventions
- folder targets
- provider/account mapping
- custom intake categories
- downstream task destinations

This is where evolving project-specific behavior should live.

## Administrator vs Orchestrator

### Master Administrator

Handles outside-world intake:

- email
- uploads
- bug reports
- content drafts
- external requests
- files and operator notes

### Orchestrator

Handles internal execution:

- task shaping
- queue health
- worker assignment
- completion pressure

The administrator may notify the orchestrator, but these are not the same role
by default.

## Native-Format Ingestion Rule

External input should be normalized into native internal structures as early as
possible.

Reason:

- fewer transcription passes
- fewer edit errors
- lower token waste
- less prompt-fragile reformatting later

## Intake Normalization Pipeline

Preferred path:

1. raw external input arrives
2. provider adapter captures provider-specific metadata
3. interface adapter preserves local context like upload source or operator note
4. normalization layer converts it into a provider-agnostic intake envelope
5. project overlay adds project-specific routing hints
6. administrator routes, files, or escalates

## Provider-Agnostic Intake Envelope

Every intake item should normalize into one stable object family.

Minimum fields:

- intake id
- source type
- source account
- received timestamp
- normalized text/body
- attachment references
- native format kind
- parsing confidence
- routing suggestion
- project overlay tags

## Non-API Interfaces

Treat these as legitimate intake paths:

- drag-and-drop file import
- watched local folders
- manual operator paste/import
- structured upload forms
- device-assisted small command surfaces

The system should not assume every useful interface is an authenticated remote
API.

## Web Admin Rule

The browser is the best primary administration surface, but not the provider
execution layer.

Use:

- web admin shell
- backend administration API
- provider adapters
- interface adapters

Do not:

- put provider credentials in the browser
- let the browser become the only intake path

## First Build Order

1. define project overlay configuration layer
2. define provider-agnostic intake envelope
3. define non-API interface adapter model
4. define native-format ingestion normalization pipeline
5. scaffold master administrator web shell against current JSON state

## Outcome Standard

If this model is working, then:

- a new provider plugs in through an adapter, not a rewrite
- a new interface plugs in through an adapter, not a rewrite
- project-specific behavior grows through overlays/configuration
- outside-world intake becomes structured early
- orchestration and administration stay related but distinct
