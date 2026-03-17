import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useFilingPickerStore } from '@/store/filingPickerStore'
import { fetchFilingOptions } from '@/api/filing'

vi.mock('@/api/filing', () => ({
  fetchFilingOptions: vi.fn(),
}))

describe('filingPickerStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useFilingPickerStore.setState({
      model: null,
      loading: false,
      error: null,
    })
  })

  it('loads filing options for the selected intake item', async () => {
    vi.mocked(fetchFilingOptions).mockResolvedValue({
      intake_id: 'intake-1',
      overlay_context_id: 'overlay_default',
      default_destination_ids: ['customer_archive'],
      advanced_destination_ids: ['provider_reference'],
      destinations: [
        {
          filing_destination_id: 'customer_archive',
          display_label: 'Customer Archive',
          description: 'Default filing location for customer-facing intake',
          archive_marker_default: true,
          allowed_for_current_intake: true,
          status: 'active',
          selectable: true,
          disabled_reason: null,
          is_default: true,
          requires_advanced_flow: false,
        },
      ],
    })

    await useFilingPickerStore.getState().fetch('intake-1')

    expect(fetchFilingOptions).toHaveBeenCalledWith('intake-1')
    expect(useFilingPickerStore.getState().model?.destinations).toHaveLength(1)
  })

  it('clears the filing model when no intake is selected', async () => {
    await useFilingPickerStore.getState().fetch(null)

    expect(useFilingPickerStore.getState()).toMatchObject({
      model: null,
      loading: false,
      error: null,
    })
  })
})
