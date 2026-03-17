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
      selectedDestinationId: null,
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
    expect(useFilingPickerStore.getState().selectedDestinationId).toBe('customer_archive')
  })

  it('clears the filing model when no intake is selected', async () => {
    await useFilingPickerStore.getState().fetch(null)

    expect(useFilingPickerStore.getState()).toMatchObject({
      model: null,
      selectedDestinationId: null,
      loading: false,
      error: null,
    })
  })

  it('allows the selected filing destination to be changed locally', () => {
    useFilingPickerStore.setState({
      model: {
        intake_id: 'intake-1',
        overlay_context_id: 'overlay_default',
        default_destination_ids: ['customer_archive'],
        advanced_destination_ids: ['provider_reference'],
        destinations: [
          {
            filing_destination_id: 'customer_archive',
            display_label: 'Customer Archive',
            description: 'Default filing location',
            archive_marker_default: true,
            allowed_for_current_intake: true,
            status: 'active',
            selectable: true,
            disabled_reason: null,
            is_default: true,
            requires_advanced_flow: false,
          },
          {
            filing_destination_id: 'provider_reference',
            display_label: 'Provider Reference',
            description: 'Reference storage for provider history',
            archive_marker_default: false,
            allowed_for_current_intake: true,
            status: 'active',
            selectable: true,
            disabled_reason: null,
            is_default: false,
            requires_advanced_flow: true,
          },
        ],
      },
      selectedDestinationId: 'customer_archive',
      loading: false,
      error: null,
    })

    useFilingPickerStore.getState().setSelectedDestination('provider_reference')

    expect(useFilingPickerStore.getState().selectedDestinationId).toBe('provider_reference')
  })
})
