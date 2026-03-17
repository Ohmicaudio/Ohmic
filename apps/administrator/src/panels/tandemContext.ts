import type { AttachmentPreviewItem, IntakeQueueItem } from '@/types/intake'

export function buildTandemContextUrl(
  launchUrl: string | null,
  intake: IntakeQueueItem | null
): string | null {
  if (!launchUrl) {
    return null
  }

  if (!intake) {
    return launchUrl
  }

  try {
    const url = new URL(launchUrl)
    url.searchParams.set('intakeId', intake.intake_id)
    if (intake.title) {
      url.searchParams.set('intakeTitle', intake.title)
    }
    if (intake.routing_target) {
      url.searchParams.set('routingTarget', intake.routing_target)
    }
    return url.toString()
  } catch {
    return launchUrl
  }
}

export function buildTandemAttachmentReviewUrl(
  launchUrl: string | null,
  intake: IntakeQueueItem | null,
  attachment: AttachmentPreviewItem | null
): string | null {
  const contextualUrl = buildTandemContextUrl(launchUrl, intake)

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
