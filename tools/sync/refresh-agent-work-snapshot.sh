#!/usr/bin/env bash
set -euo pipefail

SCRIPT_WIN='B:\ohmic\tools\sync\refresh-agent-work-snapshot.ps1'

project_arg=""
out_file_arg=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --project)
      project_arg="${2:-}"
      shift 2
      ;;
    --out-file)
      out_file_arg="${2:-}"
      shift 2
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

args=()
if [[ -n "$project_arg" ]]; then
  args+=("-Project" "$project_arg")
fi
if [[ -n "$out_file_arg" ]]; then
  args+=("-OutFile" "$out_file_arg")
fi

if command -v pwsh >/dev/null 2>&1; then
  exec pwsh -NoLogo -NoProfile -File "$SCRIPT_WIN" "${args[@]}"
fi

if command -v powershell.exe >/dev/null 2>&1; then
  exec powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "$SCRIPT_WIN" "${args[@]}"
fi

echo "No usable PowerShell runtime found for refresh-agent-work-snapshot." >&2
exit 1
