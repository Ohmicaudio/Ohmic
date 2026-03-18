import type { AttachmentPreviewItem, IntakeQueueItem } from '@/types/intake'
import type { AdministratorTandemTargetPreset } from '@/types/tandem'

export function buildTandemContextUrl(
  launchUrl: string | null,
  intake: IntakeQueueItem | null,
  preset: AdministratorTandemTargetPreset | null = null
): string | null {
  if (!launchUrl) {
    return null
  }

  try {
    const url = new URL(launchUrl)
    if (preset) {
      url.searchParams.set('targetPreset', preset.preset_id)
      url.searchParams.set('targetLabel', preset.target_label)
    }

    if (intake) {
      url.searchParams.set('intakeId', intake.intake_id)
      if (intake.title) {
        url.searchParams.set('intakeTitle', intake.title)
      }
      if (intake.routing_target) {
        url.searchParams.set('routingTarget', intake.routing_target)
      }
    }
    return url.toString()
  } catch {
    return launchUrl
  }
}

export function buildTandemAttachmentReviewUrl(
  launchUrl: string | null,
  intake: IntakeQueueItem | null,
  attachment: AttachmentPreviewItem | null,
  preset: AdministratorTandemTargetPreset | null = null
): string | null {
  const contextualUrl = buildTandemContextUrl(launchUrl, intake, preset)

  if (!contextualUrl || !attachment) {
    return contextualUrl
  }

  try {
    const url = new URL(contextualUrl)
    url.searchParams.set('attachmentId', attachment.asset_id)
    url.searchParams.set('previewRefId', attachment.preview_ref_id)
    if (attachment.preview_kind) {
      url.searchParams.set('previewKind', attachment.preview_kind)
    }
    if (attachment.fallback_label) {
      url.searchParams.set('attachmentLabel', attachment.fallback_label)
    }
    if (attachment.preview_url) {
      url.searchParams.set('previewUrl', attachment.preview_url)
    }
    return url.toString()
  } catch {
    return contextualUrl
  }
}
