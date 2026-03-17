export interface TandemStatusResponse {
  configured: boolean
  available: boolean
  mode: 'unconfigured' | 'configured'
  session_state: 'missing' | 'idle' | 'attached'
  base_url: string | null
  session_label: string | null
  active_target_label: string | null
  target_presets: Array<{
    preset_id: string
    display_label: string
    target_label: string
  }>
  launch_url: string | null
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

function readTargetPresets(): Array<{
  preset_id: string
  display_label: string
  target_label: string
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
      const [presetId, displayLabel, targetLabel] = entry.split(';').map((part) => part?.trim() ?? '')
      return {
        preset_id: presetId || `preset-${index + 1}`,
        display_label: displayLabel || targetLabel || `Preset ${index + 1}`,
        target_label: targetLabel || displayLabel || `target-${index + 1}`,
      }
    })
}

export function readTandemStatus(): TandemStatusResponse {
  const baseUrl = readOptionalEnv('ADMINISTRATOR_TANDEM_BASE_URL')
  const sessionLabel = readOptionalEnv('ADMINISTRATOR_TANDEM_SESSION_LABEL')
  const sessionState = readSessionState()
  const activeTargetLabel = readOptionalEnv('ADMINISTRATOR_TANDEM_ACTIVE_TARGET_LABEL')
  const targetPresets = readTargetPresets()
  const configured = Boolean(baseUrl)

  if (!configured) {
    return {
      configured: false,
      available: false,
      mode: 'unconfigured',
      session_state: 'missing',
      base_url: null,
      session_label: sessionLabel,
      active_target_label: null,
      target_presets: targetPresets,
      launch_url: null,
      message:
        'Set ADMINISTRATOR_TANDEM_BASE_URL to expose the first Tandem handoff seam.',
    }
  }

  const launchUrl = configured ? buildLaunchUrl(baseUrl!, sessionLabel) : null
  const available = sessionState === 'attached'

  return {
    configured: true,
    available,
    mode: 'configured',
    session_state: sessionState,
    base_url: baseUrl,
    session_label: sessionLabel,
    active_target_label: activeTargetLabel,
    target_presets: targetPresets,
    launch_url: launchUrl,
    message:
      !launchUrl
        ? 'Tandem base is configured, but the launch URL is invalid. Fix ADMINISTRATOR_TANDEM_BASE_URL before operator handoff.'
        : sessionState === 'attached'
          ? `Tandem is attached${activeTargetLabel ? ` to ${activeTargetLabel}` : ''}. Open the live provider session from here.`
          : sessionState === 'idle'
            ? 'Tandem is configured and idle. Open the handoff to attach it to a live provider target.'
            : 'Tandem base is configured. Open Tandem from here while deeper session browsing and provider capture stay in the next slice.',
  }
}
