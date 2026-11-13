import { formatOffenceLine, splitOffenceLines, readStoredOffences, ensureStoredOffences } from './offenceDetails'
import { htmlToPlainText } from './htmlToPlainText'
import ReportService from '../services/reportService'
import PreSentenceToDeliusService from '../services/preSentenceToDeliusService'
import type { OffenceDetails } from '../@types/preSentenceToDelius'

jest.mock('../../logger')

const apiOffences: OffenceDetails = {
  mainOffence: {
    date: '2026-05-17',
    mainCategory: { code: '030', description: 'Arson' },
    subCategory: { code: '03001', description: 'Allowing a chimney to be on fire' },
  },
  additionalOffences: [
    {
      date: '2026-09-08',
      mainCategory: { code: '080', description: 'Driving' },
      subCategory: { code: '08001', description: 'Driving after consuming alcohol or taking drugs' },
    },
    {
      date: '2026-09-09',
      mainCategory: { code: '080', description: 'Driving' },
      subCategory: { code: '08001', description: 'Driving after consuming alcohol or taking drugs' },
    },
  ],
}

describe('formatOffenceLine', () => {
  it('joins description and date with a hyphen', () => {
    expect(formatOffenceLine({ description: 'Theft from a shop', code: 'TH68001', date: '12/04/2024' })).toBe(
      'Theft from a shop - 12/04/2024'
    )
  })
})

describe('splitOffenceLines', () => {
  it('splits on newlines, trims, drops blanks and preserves order', () => {
    expect(splitOffenceLines('First - 01/01/2026\n\n  Second - 02/01/2026  \nThird - 03/01/2026\n')).toEqual([
      'First - 01/01/2026',
      'Second - 02/01/2026',
      'Third - 03/01/2026',
    ])
  })

  it('returns an empty array for non-strings and empty strings', () => {
    expect(splitOffenceLines(undefined)).toEqual([])
    expect(splitOffenceLines('')).toEqual([])
  })

  it('strips html markup within a line so stored text survives plain-text normalisation', () => {
    const lines = splitOffenceLines('One - 01/01/2026\n<strong>Two</strong> - 02/01/2026\nThree - 03/01/2026')

    expect(lines).toEqual(['One - 01/01/2026', 'Two - 02/01/2026', 'Three - 03/01/2026'])
    expect(htmlToPlainText(lines.join('\n'))).toBe('One - 01/01/2026\nTwo - 02/01/2026\nThree - 03/01/2026')
  })
})

describe('readStoredOffences', () => {
  it('returns null when no main offence is stored', () => {
    expect(readStoredOffences({})).toBeNull()
    expect(readStoredOffences({ mainOffence: '   ' })).toBeNull()
  })

  it('returns stored offences when a main offence exists', () => {
    expect(
      readStoredOffences({ mainOffence: 'Main - 01/01/2026', additionalOffences: 'A - 02/01/2026\nB - 03/01/2026' })
    ).toEqual({ mainOffence: 'Main - 01/01/2026', additionalOffences: ['A - 02/01/2026', 'B - 03/01/2026'] })
  })
})

describe('ensureStoredOffences', () => {
  let reportService: jest.Mocked<ReportService>
  let deliusService: jest.Mocked<PreSentenceToDeliusService>

  beforeEach(() => {
    reportService = { updateFieldValues: jest.fn().mockResolvedValue(null) } as unknown as jest.Mocked<ReportService>
    deliusService = {
      getOffences: jest.fn().mockResolvedValue(apiOffences),
    } as unknown as jest.Mocked<PreSentenceToDeliusService>
  })

  it('returns stored offences without calling the API when already stored', async () => {
    const result = await ensureStoredOffences(
      { mainOffence: 'Edited offence - 01/01/2026', additionalOffences: '' },
      'report-1',
      reportService,
      deliusService
    )

    expect(result).toEqual({ mainOffence: 'Edited offence - 01/01/2026', additionalOffences: [] })
    expect(deliusService.getOffences).not.toHaveBeenCalled()
    expect(reportService.updateFieldValues).not.toHaveBeenCalled()
  })

  it('fetches, persists and returns offences on first load', async () => {
    const result = await ensureStoredOffences({}, 'report-1', reportService, deliusService)

    expect(deliusService.getOffences).toHaveBeenCalledWith('report-1')
    expect(reportService.updateFieldValues).toHaveBeenCalledWith('report-1', [
      {
        pageName: 'edit-offences',
        questionId: 0,
        questionValue: 'mainOffence',
        answer: 'Allowing a chimney to be on fire - 17/05/2026',
      },
      {
        pageName: 'edit-offences',
        questionId: 1,
        questionValue: 'additionalOffences',
        answer:
          'Driving after consuming alcohol or taking drugs - 08/09/2026\nDriving after consuming alcohol or taking drugs - 09/09/2026',
      },
    ])
    expect(result).toEqual({
      mainOffence: 'Allowing a chimney to be on fire - 17/05/2026',
      additionalOffences: [
        'Driving after consuming alcohol or taking drugs - 08/09/2026',
        'Driving after consuming alcohol or taking drugs - 09/09/2026',
      ],
    })
  })

  it('returns null when nothing is stored and the API fails', async () => {
    deliusService.getOffences.mockRejectedValue(new Error('boom'))

    const result = await ensureStoredOffences({}, 'report-1', reportService, deliusService)

    expect(result).toBeNull()
    expect(reportService.updateFieldValues).not.toHaveBeenCalled()
  })

  it('propagates the error when persisting fetched offences fails', async () => {
    reportService.updateFieldValues.mockRejectedValue(new Error('save failed'))

    await expect(ensureStoredOffences({}, 'report-1', reportService, deliusService)).rejects.toThrow('save failed')
  })

  it('returns null when nothing is stored and no API service is provided', async () => {
    expect(await ensureStoredOffences({}, 'report-1', reportService)).toBeNull()
  })
})
