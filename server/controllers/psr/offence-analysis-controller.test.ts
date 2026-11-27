import { Request, Response } from 'express'
import OffenceAnalysisController from './offence-analysis-controller'
import ReportService from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { ReportOffences } from '../../@types/reportOffences'
import * as offenceSnapshot from '../../utils/offenceSnapshot'

jest.mock('../../services/reportService')
jest.mock('../../services/preSentenceToDeliusService')
jest.mock('../../../logger')
jest.mock('../../utils/offenceSnapshot')

describe('OffenceAnalysisController', () => {
  let controller: OffenceAnalysisController
  let mockReportService: jest.Mocked<ReportService>
  let mockPreSentenceToDeliusService: jest.Mocked<PreSentenceToDeliusService>
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let mockEnsureStoredOffences: jest.MockedFunction<typeof offenceSnapshot.ensureStoredOffences>

  const mockReport = {
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
    person: {
      id: 1,
      crn: 'X123456',
      createdAt: new Date(),
      createdBy: 'test-user',
      lastUpdatedBy: new Date(),
      isDeleted: false,
    },
  }

  const storedOffences: ReportOffences = {
    mainOffence: { description: 'Criminal damage to property', code: '03001', date: '2024-04-12' },
    additionalOffences: [
      { description: 'Assault on emergency worker', code: '02004', date: '2024-04-12' },
      { description: 'Possession of class A drugs', code: '06001', date: '2024-04-12' },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockReportService = new ReportService() as jest.Mocked<ReportService>
    mockPreSentenceToDeliusService = {
      getDefendantDetails: jest.fn(),
      getOffences: jest.fn(),
    } as unknown as jest.Mocked<PreSentenceToDeliusService>

    mockEnsureStoredOffences = offenceSnapshot.ensureStoredOffences as jest.MockedFunction<
      typeof offenceSnapshot.ensureStoredOffences
    >

    mockRequest = {
      params: { reportId: 'report-123' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session: {} as any,
      path: '/psr/report-123/offence-analysis',
      query: {},
    } as Partial<Request>

    mockResponse = {
      render: jest.fn(),
      redirect: jest.fn(),
      locals: {},
    } as Partial<Response>

    mockReportService.getReportById = jest.fn().mockResolvedValue(mockReport)

    controller = new OffenceAnalysisController(mockReportService, mockPreSentenceToDeliusService)
  })

  describe('beforeRender hook', () => {
    it('should build offencesData view model from stored offences and mark them available', async () => {
      mockEnsureStoredOffences.mockResolvedValue(storedOffences)

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockEnsureStoredOffences).toHaveBeenCalledWith(
        mockReport,
        mockReportService,
        mockPreSentenceToDeliusService
      )
      expect(mockPreSentenceToDeliusService.getOffences).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          data: expect.objectContaining({
            offencesData: {
              mainOffence: {
                description: 'Criminal damage to property',
                date: '12/04/2024',
              },
              additionalOffences: [
                {
                  description: 'Assault on emergency worker',
                  date: '12/04/2024',
                },
                {
                  description: 'Possession of class A drugs',
                  date: '12/04/2024',
                },
              ],
            },
            offencesAvailable: true,
          }),
        })
      )
    })

    it('should not call the Delius service directly when offences are already stored', async () => {
      mockEnsureStoredOffences.mockResolvedValue(storedOffences)

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getOffences).not.toHaveBeenCalled()
    })

    it('should mark offences unavailable when ensureStoredOffences returns null', async () => {
      mockEnsureStoredOffences.mockResolvedValue(null)

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          data: expect.objectContaining({
            offencesAvailable: false,
          }),
        })
      )
    })

    it('should work without PreSentenceToDeliusService injected', async () => {
      mockEnsureStoredOffences.mockResolvedValue(null)
      const controllerWithoutService = new OffenceAnalysisController(mockReportService)

      await controllerWithoutService.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockResponse.render).toHaveBeenCalled()
    })
  })

  describe('post method', () => {
    it('should re-render with validation errors when offencesUnderConsideration exceeds 20,000 characters', async () => {
      mockRequest.body = {
        offencesUnderConsideration: 'a'.repeat(20_001),
        offencesPattern: 'Pattern analysis',
      }

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockResponse.redirect).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          formValidation: expect.objectContaining({
            isValid: false,
            errors: expect.objectContaining({
              offencesUnderConsideration: 'Offences under consideration must be 20,000 characters or less',
            }),
          }),
        })
      )
    })
  })
})
