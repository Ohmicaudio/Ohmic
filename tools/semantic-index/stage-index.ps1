param(
    [ValidateSet('agent-bootstrap', 'core-docs', 'runtime', 'firmware', 'static', 'all')]
    [string]$Stage = 'core-docs',

    [string]$ChromaHost = 'localhost',
    [int]$Port = 8000,
    [switch]$DryRun
)

$toolRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$indexer = Join-Path $toolRoot 'indexer.py'
$bootstrapManifest = Join-Path $toolRoot 'agent-bootstrap-corpus.yaml'

if (-not (Test-Path $indexer)) {
    throw "Indexer not found: $indexer"
}

$stageRepos = @{
    'core-docs' = @('Ohmic')
    'runtime' = @('ohmic-audio-labs', 'cyd-remote')
    'firmware' = @('amplab-firmware')
    'static' = @('ohmic-audio-static-content')
}

function Run-Indexer {
    param(
        [string[]]$IndexerArgs
    )

    & python $indexer @IndexerArgs
    if ($LASTEXITCODE -ne 0) {
        throw "Indexer exited with code $LASTEXITCODE"
    }
}

if ($Stage -eq 'agent-bootstrap') {
    $indexerArgs = @('--manifest', $bootstrapManifest, '--host', $ChromaHost, '--port', $Port)
    if ($DryRun) {
        $indexerArgs += '--dry-run'
    }
    Run-Indexer -IndexerArgs $indexerArgs
    exit 0
}

if ($Stage -eq 'all') {
    foreach ($name in @('core-docs', 'runtime', 'firmware', 'static')) {
        Write-Output "== Stage: $name =="
        $indexerArgs = @('--host', $ChromaHost, '--port', $Port)
        foreach ($repo in $stageRepos[$name]) {
            $indexerArgs += @('--repo', $repo)
        }
        if ($DryRun) {
            $indexerArgs += '--dry-run'
        }
        Run-Indexer -IndexerArgs $indexerArgs
    }
    exit 0
}

$indexerArgs = @('--host', $ChromaHost, '--port', $Port)
foreach ($repo in $stageRepos[$Stage]) {
    $indexerArgs += @('--repo', $repo)
}
if ($DryRun) {
    $indexerArgs += '--dry-run'
}
Run-Indexer -IndexerArgs $indexerArgs
