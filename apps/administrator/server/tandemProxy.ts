export interface TandemStatusResponse {
  configured: boolean
  available: boolean
  mode: 'unconfigured' | 'configured'
  status_source: 'env' | 'probe'
  probe_state: 'unavailable' | 'reachable' | 'error'
  session_state: 'missing' | 'idle' | 'attached'
  base_url: string | null
  session_label: string | null
  active_target_label: string | null
  target_presets: Array<{
    preset_id: string
    display_label: string
    target_label: string
    target_kind?: string | null
    team_label?: string | null
    default_note?: string | null
  }>
  target_health: Array<{
    target_label: string
    status: 'unknown' | 'ready' | 'attention' | 'attached' | 'error'
    message?: string | null
  }>
  launch_url: string | null
  probe_message?: string | null
  message: string
}

function readOptionalEnv(name: string): string | null {
  const value = process.env[name]?.trim()
  return value ? value : null
}

function buildLaunchUrl(baseUrl: string, sessionLabel: string | null): string | null {
  try {
    const url = new URL(baseUrl)
    if (sessionLabel) {
      url.searchParams.set('sessionLabel', sessionLabel)
    }
    return url.toString()
  } catch {
    return null
  }
}

function readSessionState(): 'missing' | 'idle' | 'attached' {
  const value = readOptionalEnv('ADMINISTRATOR_TANDEM_SESSION_STATE')?.toLowerCase()
  if (value === 'attached') {
    return 'attached'
  }
  if (value === 'idle') {
    return 'idle'
  }
  return 'missing'
}

function readProbeUrl(): string | null {
  return readOptionalEnv('ADMINISTRATOR_TANDEM_STATUS_URL')
}

function coerceSessionState(value: unknown): 'missing' | 'idle' | 'attached' | null {
  if (typeof value !== 'string') {
    return null
  }
  const normalized = value.trim().toLowerCase()
  if (normalized === 'attached') {
    return 'attached'
  }
  if (normalized === 'idle') {
    return 'idle'
  }
  if (normalized === 'missing') {
    return 'missing'
  }
  return null
}

async function readProbeState(
  probeUrl: string
): Promise<
  | {
      status_source: 'probe'
      probe_state: 'reachable'
      session_state: 'missing' | 'idle' | 'attached'
      active_target_label: string | null
      available: boolean
      target_health: TandemStatusResponse['target_health']
      probe_message: string | null
    }
  | {
      status_source: 'env'
      probe_state: 'error'
      probe_message: string
    }
> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 3000)

  try {
    const response = await fetch(probeUrl, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      return {
        status_source: 'env',
        probe_state: 'error',
        probe_message: `Probe returned HTTP ${response.status}.`,
      }
    }

    const body = (await response.json()) as Record<string, unknown>
    const sessionState =
      coerceSessionState(body.session_state) ??
      coerceSessionState(body.sessionState) ??
      'idle'
    const activeTargetLabel =
      typeof body.active_target_label === 'string'
        ? body.active_target_label
        : typeof body.activeTargetLabel === 'string'
          ? body.activeTargetLabel
          : null
    const available =
      typeof body.available === 'boolean'
        ? body.available
        : sessionState === 'attached'
    const targetHealthRaw = Array.isArray(body.target_health)
      ? body.target_health
      : Array.isArray(body.targetHealth)
        ? body.targetHealth
        : []
    const targetHealth = targetHealthRaw
      .flatMap((entry) => {
        if (!entry || typeof entry !== 'object') {
          return []
        }
        const record = entry as Record<string, unknown>
        const targetLabel =
          typeof record.target_label === 'string'
            ? record.target_label
            : typeof record.targetLabel === 'string'
              ? record.targetLabel
              : null
        const statusValue =
          typeof record.status === 'string' ? record.status.trim().toLowerCase() : null
        const message =
          typeof record.message === 'string' ? record.message : null

        if (!targetLabel) {
          return []
        }

        const status: TandemStatusResponse['target_health'][number]['status'] =
          statusValue === 'ready' ||
          statusValue === 'attention' ||
          statusValue === 'attached' ||
          statusValue === 'error'
            ? statusValue
            : 'unknown'

        return [
          {
            target_label: targetLabel,
            status,
            message,
          },
        ]
      })
    const probeMessage =
      typeof body.message === 'string'
        ? body.message
        : `Live Tandem probe reached ${probeUrl}.`

    return {
      status_source: 'probe',
      probe_state: 'reachable',
      session_state: sessionState,
      active_target_label: activeTargetLabel,
      available,
      target_health: targetHealth,
      probe_message: probeMessage,
    }
  } catch (error) {
    return {
      status_source: 'env',
      probe_state: 'error',
      probe_message:
        error instanceof Error
          ? `Live Tandem probe failed: ${error.message}`
          : 'Live Tandem probe failed.',
    }
  } finally {
    clearTimeout(timeout)
  }
}

function readTargetPresets(): Array<{
  preset_id: string
  display_label: string
  target_label: string
  target_kind?: string | null
  team_label?: string | null
  default_note?: string | null
}> {
  const raw = readOptionalEnv('ADMINISTRATOR_TANDEM_TARGET_PRESETS')
  if (!raw) {
    return []
  }

  return raw
    .split('|')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry, index) => {
      const [presetId, displayLabel, targetLabel, targetKind, teamLabel, defaultNote] = entry
        .split(';')
        .map((part) => part?.trim() ?? '')
      return {
        preset_id: presetId || `preset-${index + 1}`,
        display_label: displayLabel || targetLabel || `Preset ${index + 1}`,
        target_label: targetLabel || displayLabel || `target-${index + 1}`,
        target_kind: targetKind || null,
        team_label: teamLabel || null,
        default_note: defaultNote || null,
      }
    })
}

export async function readTandemStatus(): Promise<TandemStatusResponse> {
  const baseUrl = readOptionalEnv('ADMINISTRATOR_TANDEM_BASE_URL')
  const probeUrl = readProbeUrl()
  const sessionLabel = readOptionalEnv('ADMINISTRATOR_TANDEM_SESSION_LABEL')
  const envSessionState = readSessionState()
  const envActiveTargetLabel = readOptionalEnv('ADMINISTRATOR_TANDEM_ACTIVE_TARGET_LABEL')
  const targetPresets = readTargetPresets()
  const configured = Boolean(baseUrl)

  if (!configured) {
    return {
      configured: false,
      available: false,
      mode: 'unconfigured',
      status_source: 'env',
      probe_state: probeUrl ? 'error' : 'unavailable',
      session_state: 'missing',
      base_url: null,
      session_label: sessionLabel,
      active_target_label: null,
      target_presets: targetPresets,
      target_health: [],
      launch_url: null,
      probe_message: probeUrl
        ? 'Tandem probe is configured but the base URL is not set.'
        : null,
      message:
        'Set ADMINISTRATOR_TANDEM_BASE_URL to expose the first Tandem handoff seam.',
    }
  }

  const launchUrl = configured ? buildLaunchUrl(baseUrl!, sessionLabel) : null
  let sessionState = envSessionState
  let activeTargetLabel = envActiveTargetLabel
  let available = sessionState === 'attached'
  let targetHealth: TandemStatusResponse['target_health'] = []
  let statusSource: 'env' | 'probe' = 'env'
  let probeState: 'unavailable' | 'reachable' | 'error' = probeUrl ? 'error' : 'unavailable'
  let probeMessage: string | null = probeUrl
    ? 'Live Tandem probe is configured but has not reported yet.'
    : null

  if (probeUrl) {
    const probe = await readProbeState(probeUrl)
    probeState = probe.probe_state
    probeMessage = probe.probe_message
    if (probe.status_source === 'probe') {
      statusSource = 'probe'
      sessionState = probe.session_state
      activeTargetLabel = probe.active_target_label
      available = probe.available
      targetHealth = probe.target_health
    }
  }

  return {
    configured: true,
    available,
    mode: 'configured',
    status_source: statusSource,
    probe_state: probeState,
    session_state: sessionState,
    base_url: baseUrl,
    session_label: sessionLabel,
    active_target_label: activeTargetLabel,
    target_presets: targetPresets,
    target_health: targetHealth,
    launch_url: launchUrl,
    probe_message: probeMessage,
    message:
      !launchUrl
        ? 'Tandem base is configured, but the launch URL is invalid. Fix ADMINISTRATOR_TANDEM_BASE_URL before operator handoff.'
        : statusSource === 'probe' && probeMessage
          ? probeMessage
          : sessionState === 'attached'
          ? `Tandem is attached${activeTargetLabel ? ` to ${activeTargetLabel}` : ''}. Open the live provider session from here.`
          : sessionState === 'idle'
            ? 'Tandem is configured and idle. Open the handoff to attach it to a live provider target.'
            : 'Tandem base is configured. Open Tandem from here while deeper session browsing and provider capture stay in the next slice.',
  }
}
