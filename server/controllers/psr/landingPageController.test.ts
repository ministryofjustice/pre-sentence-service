import { Request, Response } from 'express'
import LandingPageController from './landingPageController'
import ReportService from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { ReportStatus } from '../../repositories/entities/reportDetails'

jest.mock('../../services/reportService')
jest.mock('../../services/preSentenceToDeliusService')
jest.mock('../../../logger')

describe('LandingPageController', () => {
  let controller: LandingPageController
  let mockReportService: jest.Mocked<ReportService>
  let mockPreSentenceToDeliusService: jest.Mocked<PreSentenceToDeliusService>
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>

  const baseReport = {
    id: 'report-123',
    personId: 1,
    origin: '12345',
    reportType: 'PSR',
    pages: [],
    createdAt: new Date(),
    createdBy: 'test-user',
    lastUpdatedBy: new Date(),
    isDeleted: false,
    person: {
      id: 1,
      crn: 'X123456',
      createdAt: new Date(),
      createdBy: 'test-user',
      lastUpdatedBy: new Date(),
      isDeleted: false,
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockReportService = new ReportService() as jest.Mocked<ReportService>
    mockPreSentenceToDeliusService = {
      getDefendantDetails: jest.fn(),
      getOffences: jest.fn(),
    } as unknown as jest.Mocked<PreSentenceToDeliusService>

    mockRequest = {
      params: { reportId: 'report-123' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session: {} as any,
      path: '/psr/report-123',
      query: {},
    } as Partial<Request>

    mockResponse = {
      render: jest.fn(),
      redirect: jest.fn(),
      locals: {},
    } as Partial<Response>

    controller = new LandingPageController(mockReportService, mockPreSentenceToDeliusService)
  })

  it('renders the start page when the report has not been started', async () => {
    mockReportService.getReportById = jest.fn().mockResolvedValue({
      ...baseReport,
      status: ReportStatus.NOT_STARTED,
    })

    await controller.get(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.render).toHaveBeenCalledWith(
      'psr/psr-start',
      expect.objectContaining({
        reportId: 'report-123',
      })
    )
    expect(mockResponse.redirect).not.toHaveBeenCalled()
  })

  it('redirects to defendant details when the report has already been started', async () => {
    mockReportService.getReportById = jest.fn().mockResolvedValue({
      ...baseReport,
      status: ReportStatus.STARTED,
    })

    await controller.get(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.redirect).toHaveBeenCalledWith('/psr/report-123/defendant-details')
    expect(mockResponse.render).not.toHaveBeenCalled()
  })
})
