#!/usr/bin/env bash
set -euo pipefail

ROOT_WIN='B:\ohmic'
SCRIPT_WIN='B:\ohmic\tools\sync\validate-agent-system.ps1'

json_flag=""
if [[ "${1:-}" == "--json" ]]; then
  json_flag="-Json"
fi

if command -v pwsh >/dev/null 2>&1; then
  exec pwsh -NoLogo -NoProfile -File "$SCRIPT_WIN" $json_flag
fi

if command -v powershell.exe >/dev/null 2>&1; then
  exec powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "$SCRIPT_WIN" $json_flag
fi

cat >&2 <<EOF
No usable PowerShell runtime was found for shared agent system validation.

Expected one of:
- pwsh
- powershell.exe

Tried to run:
- $ROOT_WIN\tools\sync\validate-agent-system.ps1
EOF
exit 1
