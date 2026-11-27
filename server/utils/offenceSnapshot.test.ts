import { ensureStoredOffences } from './offenceSnapshot'
import ReportService from '../services/reportService'
import PreSentenceToDeliusService from '../services/preSentenceToDeliusService'
import ReportDetails from '../repositories/entities/reportDetails'
import { ReportOffences } from '../@types/reportOffences'
import type { OffenceDetails } from '../@types/preSentenceToDelius'

jest.mock('../services/reportService')
jest.mock('../services/preSentenceToDeliusService')
jest.mock('../../logger')

describe('ensureStoredOffences', () => {
  let mockReportService: jest.Mocked<ReportService>
  let mockPreSentenceToDeliusService: jest.Mocked<PreSentenceToDeliusService>

  const storedOffences: ReportOffences = {
    mainOffence: { description: 'Stored offence', code: 'ST001', date: '2024-01-01' },
    additionalOffences: [],
  }

  const apiOffenceDetails: OffenceDetails = {
    mainOffence: {
      date: '2024-04-12',
      mainCategory: { code: '030', description: 'Criminal damage' },
      subCategory: { code: '03001', description: 'Criminal damage to property' },
    },
    additionalOffences: [
      {
        date: '2024-04-12',
        mainCategory: { code: '020', description: 'Violence' },
        subCategory: { code: '02004', description: 'Assault on emergency worker' },
      },
    ],
  }

  const fetchedOffences: ReportOffences = {
    mainOffence: { description: 'Criminal damage to property', code: '03001', date: '2024-04-12' },
    additionalOffences: [{ description: 'Assault on emergency worker', code: '02004', date: '2024-04-12' }],
  }

  const baseReport = {
    id: 'report-123',
    personId: 1,
    origin: '12345',
    reportType: 'PSR',
    status: 'NOT_STARTED',
    pages: [],
    createdAt: new Date(),
    createdBy: 'test-user',
    lastUpdatedBy: new Date(),
    isDeleted: false,
  } as unknown as ReportDetails

  beforeEach(() => {
    jest.clearAllMocks()

    mockReportService = new ReportService() as jest.Mocked<ReportService>
    mockPreSentenceToDeliusService = {
      getDefendantDetails: jest.fn(),
      getOffences: jest.fn(),
    } as unknown as jest.Mocked<PreSentenceToDeliusService>

    mockReportService.updateReportOffences = jest.fn()
  })

  it('returns stored offences without calling the API', async () => {
    const report = { ...baseReport, offences: storedOffences }

    const result = await ensureStoredOffences(report, mockReportService, mockPreSentenceToDeliusService)

    expect(result).toEqual(storedOffences)
    expect(mockPreSentenceToDeliusService.getOffences).not.toHaveBeenCalled()
    expect(mockReportService.updateReportOffences).not.toHaveBeenCalled()
  })

  it('fetches, persists and returns offences when none are stored', async () => {
    const report = { ...baseReport, offences: null }
    mockPreSentenceToDeliusService.getOffences.mockResolvedValue(apiOffenceDetails)
    mockReportService.updateReportOffences.mockResolvedValue({ ...report, offences: fetchedOffences })

    const result = await ensureStoredOffences(report, mockReportService, mockPreSentenceToDeliusService)

    expect(mockPreSentenceToDeliusService.getOffences).toHaveBeenCalledWith('report-123')
    expect(mockReportService.updateReportOffences).toHaveBeenCalledWith('report-123', fetchedOffences)
    expect(result).toEqual(fetchedOffences)
  })

  it('returns null when the API call fails', async () => {
    const report = { ...baseReport, offences: null }
    mockPreSentenceToDeliusService.getOffences.mockRejectedValue(new Error('API Error'))

    const result = await ensureStoredOffences(report, mockReportService, mockPreSentenceToDeliusService)

    expect(result).toBeNull()
    expect(mockReportService.updateReportOffences).not.toHaveBeenCalled()
  })

  it('returns null when no delius service is provided', async () => {
    const report = { ...baseReport, offences: null }

    const result = await ensureStoredOffences(report, mockReportService, undefined)

    expect(result).toBeNull()
    expect(mockReportService.updateReportOffences).not.toHaveBeenCalled()
  })

  it('returns fetched offences even when persisting the snapshot fails', async () => {
    const report = { ...baseReport, offences: null }
    mockPreSentenceToDeliusService.getOffences.mockResolvedValue(apiOffenceDetails)
    mockReportService.updateReportOffences.mockRejectedValue(new Error('DB Error'))

    const result = await ensureStoredOffences(report, mockReportService, mockPreSentenceToDeliusService)

    expect(result).toEqual(fetchedOffences)
  })
})
