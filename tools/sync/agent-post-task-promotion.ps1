param(
    [string]$Project = '',
    [string]$Task = '',
    [string]$ClaimId = '',
    [string]$OutFile = ''
)

if (-not $OutFile) {
    $safeProject = if ($Project) { $Project } else { 'org-wide' }
    $OutFile = "B:\ohmic\generated\agent-work\projects\$safeProject\post-task-promotion.md"
}

$lines = @(
    '# Post-Task Promotion Helper',
    '',
    ('Generated: {0}' -f (Get-Date).ToString('s')),
    ''
)

if ($Project) {
    $lines += ('- project: `{0}`' -f $Project)
}
if ($Task) {
    $lines += ('- task: `{0}`' -f $Task)
}
if ($ClaimId) {
    $lines += ('- claim: `{0}`' -f $ClaimId)
}

$lines += @(
    '',
    '## Check Before Moving On',
    '',
    '- [ ] Did this work create a follow-on request?',
    '- [ ] Did this work expose a new open question?',
    '- [ ] Did this work answer a question worth tracing in `requests/resolved-questions.md`?',
    '- [ ] Did this work create or resolve a transaction worth recording in `transactions/`?',
    '- [ ] Did this work change short-term memory?',
    '- [ ] Did this work teach a mid-term lesson?',
    '- [ ] Did this work prove a durable long-term rule?',
    '- [ ] Did this work require a project overlay update?',
    '',
    '## Target Surfaces',
    '',
    '- requests: `B:\ohmic\agent-system\requests\`',
    '- transactions: `B:\ohmic\agent-system\transactions\`',
    '- memory: `B:\ohmic\agent-system\memory\`',
    '- project overlays: `B:\ohmic\agent-system\projects\`',
    '- resolved questions: `B:\ohmic\agent-system\requests\resolved-questions.md`'
)

$parent = Split-Path -Parent $OutFile
if ($parent) {
    New-Item -ItemType Directory -Force $parent | Out-Null
}
Set-Content -Path $OutFile -Value $lines -Encoding UTF8
Get-Content $OutFile
